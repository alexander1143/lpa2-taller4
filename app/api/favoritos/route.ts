import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  return NextResponse.json(db.getFavoritos())
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const fav = db.addFavorito(body.usuario_id, body.cancion_id)
    return NextResponse.json(fav, { status: 201 })
  } catch (error: any) {
    if (error.message === "Favorito ya existe") {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }
    return NextResponse.json({ error: error.message }, { status: 404 })
  }
}
