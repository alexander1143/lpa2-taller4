import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  return NextResponse.json(db.getUsuarios())
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const user = db.createUsuario(body)
    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    if (error.message === "Correo ya registrado") {
      return NextResponse.json({ error: error.message }, { status: 409 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
