import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'
import { prismaClient} from '@/lib/db' 

const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email("invalid email address"),
    intent: z.string().min(5)
})

export async function POST(
    req: NextRequest,
    context: { params: { joinCode: string } }
  ) {
    const { joinCode } = context.params;
   try { 
    const body = await req.json()  
    const name = body.name;
    const email = body.email;
    const intent = body.intent;

    const validate = userSchema.safeParse({
        name, email, intent
    })

    const startupCode = await prismaClient.startup.findUnique({
        where: {joinCode: joinCode}
    })

    if(!startupCode) {
        return NextResponse.json({
            messagge: "expired or invalid code"
        },{
            status: 404
        })
    }

    if(validate.success) {
        await prismaClient.betaUser.create({
           data: {
             startupId: startupCode.id, 
             username: name,
             email,
             intent
           }  
        })
        return NextResponse.json({
            message: "thank you for joining"
        }, {
            status: 200
        })
    } else {
        return NextResponse.json({
            message: "enter valid data"
        }, {   
            status: 400
        })
    }
 } catch(e) {
    console.log(e)
    return NextResponse.json({
        message: "some internal error occured"
    }, {
        status: 500
    })
 }  
}