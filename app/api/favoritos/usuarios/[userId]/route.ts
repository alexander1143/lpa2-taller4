import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const { userId } = await params
  const user = db.getUsuario(Number.parseInt(userId))
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
  return NextResponse.json(db.getFavoritosByUser(Number.parseInt(userId)))
}
