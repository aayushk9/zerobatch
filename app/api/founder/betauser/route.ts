import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/db"

export async function GET() {

   try {
      const session = await getServerSession(authOptions);

      if (!session?.user.id) {
         return NextResponse.json({
            message: "unauthorized"
         }, {
            status: 403
         })
      }

      const founder = await prismaClient.user.findUnique({
         where: { email: session.user.email }
      })

      if (!founder) {
         return NextResponse.json({
            message: "founder not found"
         }, {
            status: 404
         })
      }

      // find startup linked to the founder
      const startups = await prismaClient.startup.findMany({
         where: {
            userId: founder.id
         },
         include: { 
            betaUsers: true 
         }
      })

      if (startups.length == 0) {
         return NextResponse.json({
            message: "No startup found"
         }, {
            status: 400
         })
      }

      const formatted = startups.map(startup => ({
         startupName: startup.startupName,
         betaUsers: startup.betaUsers
       }));

      return NextResponse.json({ formatted }, { status: 200 })

   } catch (e) {
      console.log(e)
      return NextResponse.json({
         message: "some internal error occured"
      }, {
         status: 500
      })
   }
}