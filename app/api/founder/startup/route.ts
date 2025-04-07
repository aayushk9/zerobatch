import { NextRequest, NextResponse } from "next/server";

export function POST(req:NextRequest){
    // accept the startup name from frontend and acccording to startup name postfix it and generate link
    //  as localhost:3000/startupname (zerobatch.com/startupname)
  return NextResponse.json({
    msg: "Testing post request"
  })
}

export function GET(req:NextRequest) {
  // render nothing as of now (planned)
  return NextResponse.json({
    msg: "Testing get request at startup route"
  })
}