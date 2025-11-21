import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = db.getUsuario(Number.parseInt(id))
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
  return NextResponse.json(user)
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await request.json()
  const user = db.updateUsuario(Number.parseInt(id), body)
  if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
  return NextResponse.json(user)
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const success = db.deleteUsuario(Number.parseInt(id))
  if (!success) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
  return new NextResponse(null, { status: 204 })
}
