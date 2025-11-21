import { NextResponse } from "next/server"

// Base de datos simulada (en producción usarías una DB real)
const users = new Map<string, { id: number; nombre: string; correo: string; password: string }>()

export async function POST(request: Request) {
  try {
    const { correo, password } = await request.json()

    // Validaciones básicas
    if (!correo || !password) {
      return NextResponse.json(
        { message: "Correo y contraseña son requeridos" },
        { status: 400 }
      )
    }

    // Buscar usuario
    const user = users.get(correo)

    if (!user || user.password !== password) {
      return NextResponse.json(
        { message: "Credenciales inválidas" },
        { status: 401 }
      )
    }

    // Generar token simple (en producción usa JWT)
    const token = Buffer.from(`${correo}:${Date.now()}`).toString("base64")

    // Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: {
        ...userWithoutPassword,
        fecha_registro: new Date().toISOString(),
      },
      token,
      message: "Inicio de sesión exitoso",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    )
  }
}
