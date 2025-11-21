import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request, { params }: { params: Promise<{ userId: string; cancionId: string }> }) {
  const { userId, cancionId } = await params
  try {
    const fav = db.addFavorito(Number.parseInt(userId), Number.parseInt(cancionId))
    return NextResponse.json(fav, { status: 201 })
  } catch (error: any) {
    if (error.message === "Favorito ya existe") {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 404 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ userId: string; cancionId: string }> }) {
  const { userId, cancionId } = await params
  const success = db.removeFavoritoSpecific(Number.parseInt(userId), Number.parseInt(cancionId))
  if (!success) return NextResponse.json({ error: "Favorito no encontrado" }, { status: 404 })
  return new NextResponse(null, { status: 204 })
}
