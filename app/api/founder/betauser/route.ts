import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
   return NextResponse.json({
    msg: "Testing get route at betauser route"
   })
}