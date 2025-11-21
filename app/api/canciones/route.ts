import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = Number.parseInt(searchParams.get("limit") || "100")
  return NextResponse.json(db.getCanciones(limit))
}

export async function POST(request: Request) {
  const body = await request.json()
  const song = db.createCancion(body)
  return NextResponse.json(song, { status: 201 })
}
