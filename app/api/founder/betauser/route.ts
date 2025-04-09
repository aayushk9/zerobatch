import { NextRequest, NextResponse } from "next/server";
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma' 

export function GET(req: NextRequest) {
   const auth = await nexr
   return NextResponse.json({
    msg: "Testing get route at betauser route"
   })
}