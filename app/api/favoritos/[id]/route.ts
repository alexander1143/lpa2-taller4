import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const fav = db.getFavorito(Number.parseInt(id))
  if (!fav) return NextResponse.json({ error: "Favorito no encontrado" }, { status: 404 })
  return NextResponse.json(fav)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const success = db.removeFavorito(Number.parseInt(id))
  if (!success) return NextResponse.json({ error: "Favorito no encontrado" }, { status: 404 })
  return new NextResponse(null, { status: 204 })
}
