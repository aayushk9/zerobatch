import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'

const startupNameSchema = z.string()

function generateSlug(startupname: String) {
  return startupname
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// generate unique slug to ensure startup name duplicated are not created
function uniqueSlug(baseSlug: String) {
  let slug = baseSlug

  // find this slug in db if found increment by 1 and save it in db
  // else return slug
}

export async function POST(req: NextRequest) {

  try {
    const body = await req.json(); 
    const startupName = startupNameSchema.parse(body.startupName)

    const tempSlug = generateSlug(startupName);
    const slug = await uniqueSlug(tempSlug)

    return NextResponse.json({
      slugURL: `https://zerobatch.com/${tempSlug}`
    }, {
      status: 200
    }
    )
  } catch (e) {   
    console.log(e)
    return NextResponse.json({
      message: "please enter valid startup name"
    }, {
      status: 411
    })
  }
}

export function GET(req: NextRequest) {
  // render nothing as of now (planned)
  return NextResponse.json({
    msg: "Testing get request at startup route"
  })
}