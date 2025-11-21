import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const song = db.getCancion(Number.parseInt(id))
  if (!song) return NextResponse.json({ error: "Canción no encontrada" }, { status: 404 })
  return NextResponse.json(song)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const song = db.updateCancion(Number.parseInt(id), body)
  if (!song) return NextResponse.json({ error: "Canción no encontrada" }, { status: 404 })
  return NextResponse.json(song)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const success = db.deleteCancion(Number.parseInt(id))
  if (!success) return NextResponse.json({ error: "Canción no encontrada" }, { status: 404 })
  return new NextResponse(null, { status: 204 })
}
