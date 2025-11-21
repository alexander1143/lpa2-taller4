import { NextResponse } from "next/server"

// Base de datos simulada compartida con login
const users = new Map<string, { id: number; nombre: string; correo: string; password: string }>()
let nextUserId = 1

export async function POST(request: Request) {
  try {
    const { nombre, correo, password } = await request.json()

    // Validaciones
    if (!nombre || !correo || !password) {
      return NextResponse.json(
        { message: "Todos los campos son requeridos" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      )
    }

    // Verificar si el usuario ya existe
    if (users.has(correo)) {
      return NextResponse.json(
        { message: "El correo ya está registrado" },
        { status: 409 }
      )
    }

    // Crear nuevo usuario
    const newUser = {
      id: nextUserId++,
      nombre,
      correo,
      password, // En producción, hashear la contraseña
    }

    users.set(correo, newUser)

    // Generar token
    const token = Buffer.from(`${correo}:${Date.now()}`).toString("base64")

    // Retornar usuario sin contraseña
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      user: {
        ...userWithoutPassword,
        fecha_registro: new Date().toISOString(),
      },
      token,
      message: "Registro exitoso",
    })
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    )
  }
}
