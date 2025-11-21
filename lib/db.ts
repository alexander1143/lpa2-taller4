import type { Usuario, Cancion, Favorito } from "@/types"

// In-memory store for development
// In a real app, this would be a database connection

class MockDB {
  private usuarios: Usuario[] = [
    { id: 1, nombre: "Admin User", correo: "admin@example.com", fecha_registro: new Date().toISOString() },
    { id: 2, nombre: "Demo User", correo: "demo@example.com", fecha_registro: new Date().toISOString() },
  ]
  private canciones: Cancion[] = [
    {
      id: 1,
      titulo: "Bohemian Rhapsody",
      artista: "Queen",
      album: "A Night at the Opera",
      duracion: 354,
      anio: 1975,
      genero: "Rock",
      fecha_creacion: new Date().toISOString(),
    },
    {
      id: 2,
      titulo: "Imagine",
      artista: "John Lennon",
      album: "Imagine",
      duracion: 183,
      anio: 1971,
      genero: "Pop",
      fecha_creacion: new Date().toISOString(),
    },
    {
      id: 3,
      titulo: "Billie Jean",
      artista: "Michael Jackson",
      album: "Thriller",
      duracion: 294,
      anio: 1982,
      genero: "Pop",
      fecha_creacion: new Date().toISOString(),
    },
    {
      id: 4,
      titulo: "Smells Like Teen Spirit",
      artista: "Nirvana",
      album: "Nevermind",
      duracion: 301,
      anio: 1991,
      genero: "Grunge",
      fecha_creacion: new Date().toISOString(),
    },
    {
      id: 5,
      titulo: "Hotel California",
      artista: "Eagles",
      album: "Hotel California",
      duracion: 390,
      anio: 1976,
      genero: "Rock",
      fecha_creacion: new Date().toISOString(),
    },
  ]
  private favoritos: Favorito[] = [
    { id: 1, usuario_id: 1, cancion_id: 1, fecha_marcado: new Date().toISOString() },
    { id: 2, usuario_id: 1, cancion_id: 3, fecha_marcado: new Date().toISOString() },
  ]

  // Usuarios
  getUsuarios() {
    return this.usuarios
  }
  getUsuario(id: number) {
    return this.usuarios.find((u) => u.id === id)
  }
  createUsuario(data: Omit<Usuario, "id" | "fecha_registro">) {
    if (this.usuarios.some((u) => u.correo === data.correo)) throw new Error("Correo ya registrado")
    const newUser: Usuario = { ...data, id: this.usuarios.length + 1, fecha_registro: new Date().toISOString() }
    this.usuarios.push(newUser)
    return newUser
  }
  updateUsuario(id: number, data: Partial<Omit<Usuario, "id" | "fecha_registro">>) {
    const index = this.usuarios.findIndex((u) => u.id === id)
    if (index === -1) return null
    this.usuarios[index] = { ...this.usuarios[index], ...data }
    return this.usuarios[index]
  }
  deleteUsuario(id: number) {
    const index = this.usuarios.findIndex((u) => u.id === id)
    if (index === -1) return false
    this.usuarios.splice(index, 1)
    // Cleanup favorites
    this.favoritos = this.favoritos.filter((f) => f.usuario_id !== id)
    return true
  }

  // Canciones
  getCanciones(limit = 100) {
    return this.canciones.slice(0, limit)
  }
  getCancion(id: number) {
    return this.canciones.find((c) => c.id === id)
  }
  searchCanciones(query: { titulo?: string; artista?: string; genero?: string }) {
    return this.canciones.filter((c) => {
      if (query.titulo && !c.titulo.toLowerCase().includes(query.titulo.toLowerCase())) return false
      if (query.artista && !c.artista?.toLowerCase().includes(query.artista.toLowerCase())) return false
      if (query.genero && !c.genero?.toLowerCase().includes(query.genero.toLowerCase())) return false
      return true
    })
  }
  createCancion(data: Omit<Cancion, "id" | "fecha_creacion">) {
    const newSong: Cancion = { ...data, id: this.canciones.length + 1, fecha_creacion: new Date().toISOString() }
    this.canciones.push(newSong)
    return newSong
  }
  updateCancion(id: number, data: Partial<Omit<Cancion, "id" | "fecha_creacion">>) {
    const index = this.canciones.findIndex((c) => c.id === id)
    if (index === -1) return null
    this.canciones[index] = { ...this.canciones[index], ...data }
    return this.canciones[index]
  }
  deleteCancion(id: number) {
    const index = this.canciones.findIndex((c) => c.id === id)
    if (index === -1) return false
    this.canciones.splice(index, 1)
    // Cleanup favorites
    this.favoritos = this.favoritos.filter((f) => f.cancion_id !== id)
    return true
  }

  // Favoritos
  getFavoritos() {
    return this.favoritos
  }
  getFavorito(id: number) {
    return this.favoritos.find((f) => f.id === id)
  }
  getFavoritosByUser(userId: number) {
    return this.favoritos.filter((f) => f.usuario_id === userId)
  }
  addFavorito(userId: number, cancionId: number) {
    if (!this.getUsuario(userId) || !this.getCancion(cancionId)) throw new Error("Usuario o Canción no encontrada")
    if (this.favoritos.some((f) => f.usuario_id === userId && f.cancion_id === cancionId))
      throw new Error("Favorito ya existe")

    const newFav: Favorito = {
      id: this.favoritos.length + 1,
      usuario_id: userId,
      cancion_id: cancionId,
      fecha_marcado: new Date().toISOString(),
    }
    this.favoritos.push(newFav)
    return newFav
  }
  removeFavorito(id: number) {
    const index = this.favoritos.findIndex((f) => f.id === id)
    if (index === -1) return false
    this.favoritos.splice(index, 1)
    return true
  }
  removeFavoritoSpecific(userId: number, cancionId: number) {
    const index = this.favoritos.findIndex((f) => f.usuario_id === userId && f.cancion_id === cancionId)
    if (index === -1) return false
    this.favoritos.splice(index, 1)
    return true
  }
}

// Singleton instance for dev
// In production/serverless this might reset, but works for demo
const globalForDb = globalThis as unknown as { db: MockDB }
export const db = globalForDb.db || new MockDB()
if (process.env.NODE_ENV !== "production") globalForDb.db = db
