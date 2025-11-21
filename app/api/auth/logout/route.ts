import { NextResponse } from "next/server"

export async function POST() {
  // En una aplicación real, invalidarías el token en el servidor
  return NextResponse.json({
    message: "Sesión cerrada exitosamente",
  })
}
