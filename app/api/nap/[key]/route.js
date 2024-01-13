import { NextResponse, NextRequest } from "next/server";
import { getNap, setNap } from "./NapResult";

export async function GET(req, key) {
  const val = JSON.parse(await getNap(key.params.key));

  return NextResponse.json(val);
}

export async function POST(req) {
  const body = await req.json();
  const { key, title, airport } = body;

  const val = JSON.stringify({ title, airport });

  setNap(key, val);

  return NextResponse.json({
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
