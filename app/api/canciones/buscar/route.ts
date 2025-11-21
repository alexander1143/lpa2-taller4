import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = {
    titulo: searchParams.get("titulo") || undefined,
    artista: searchParams.get("artista") || undefined,
    genero: searchParams.get("genero") || undefined,
  }
  return NextResponse.json(db.searchCanciones(query))
}
