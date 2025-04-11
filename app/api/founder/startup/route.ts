import { prismaClient } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { nanoid } from 'nanoid'
 
const startupNameSchema = z.string().min(1)

function generateSlug(startupname: string) {
  return startupname
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function uniqueSlug(baseSlug: string) : Promise<string> {
  let slug = baseSlug
  let count = 1

  while(true){
  const existing = await prismaClient.startup.findUnique({
    where: {slug}
  })

  if(!existing){
    return slug
  }
  
  slug = `${baseSlug}-${count}`
  count++
}
}

export async function POST(req: NextRequest) {
 try {
  const session = await getServerSession(authOptions)

  
  if(!session?.user.id) {
    return NextResponse.json({
      message: "unauthenticated"
    }, {
      status: 403
    })  
  } 

    const body = await req.json(); 
    const startupName = body.startupName;

    const validate = startupNameSchema.parse(startupName)

    const tempSlug = generateSlug(startupName);
    const slug = await uniqueSlug(tempSlug)
    const joinCode = nanoid(8)

    await prismaClient.startup.create({
      data: {
        userId: session.user.id,
        startupName,
        slug,
        joinCode
      }
    })
    console.log(slug)
    return NextResponse.json({ 
      slugURL: `http://localhost:3000/${slug}/${joinCode}` 
    }, {
      status: 200
    }
    ) 
  } catch (e) {   
    console.log(e)
    return NextResponse.json({
      message: "please enter valid data"
    }, {
      status: 411
    })
  }
}