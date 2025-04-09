import { NextRequest, NextResponse } from "next/server"
import { z } from 'zod'

const userSchema = z.object({
    name: z.string().min(1),
    email: z.string().email("invalid email address"),
    intent: z.string().min(5)
})

export async function POST (req: NextRequest) {   
   try { 
    const body = await req.json()  
    const name = body.name;
    const email = body.email
    const intent = body.email

    const validate = userSchema.safeParse({
        name, email, intent
    })

    if(validate.success) {
        // store in db
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