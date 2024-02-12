import { NextResponse } from "next/server";

export async function GET(request) {
  let data = {
    message: "API route is working!",
  };
  return NextResponse.json(data, { status: 201 });
}
