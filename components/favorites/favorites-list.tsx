"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import type { Usuario, Favorito, Cancion } from "@/types"
import { Trash2, Music, Calendar } from "lucide-react"

export function FavoritesList() {
  const [users, setUsers] = useState<Usuario[]>([])
  const [selectedUser, setSelectedUser] = useState<string>("")
  const [favorites, setFavorites] = useState<(Favorito & { cancion?: Cancion })[]>([])
  const [loading, setLoading] = useState(false)
  const [songs, setSongs] = useState<Record<number, Cancion>>({})

  // Fetch users on mount
  useEffect(() => {
    fetch("/api/usuarios")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error fetching users:", err))

    // Fetch all songs to map details
    fetch("/api/canciones")
      .then((res) => res.json())
      .then((data: Cancion[]) => {
        const songMap = data.reduce((acc, song) => ({ ...acc, [song.id]: song }), {})
        setSongs(songMap)
      })
      .catch((err) => console.error("Error fetching songs:", err))
  }, [])

  // Fetch favorites when user selected
  useEffect(() => {
    if (!selectedUser) {
      setFavorites([])
      return
    }

    setLoading(true)
    fetch(`/api/favoritos/usuarios/${selectedUser}`)
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch((err) => console.error("Error fetching favorites:", err))
      .finally(() => setLoading(false))
  }, [selectedUser])

  const handleRemoveFavorite = async (cancionId: number) => {
    if (!confirm("¿Eliminar de favoritos?")) return

    try {
      await fetch(`/api/favoritos/usuarios/${selectedUser}/favoritos/${cancionId}`, {
        method: "DELETE",
      })
      // Refresh list
      const res = await fetch(`/api/favoritos/usuarios/${selectedUser}`)
      const data = await res.json()
      setFavorites(data)
    } catch (error) {
      console.error("Error removing favorite:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Favoritos</h2>
          <p className="text-muted-foreground">Gestiona las canciones favoritas por usuario</p>
        </div>
        <div className="w-full sm:w-64">
          <Select value={selectedUser} onValueChange={setSelectedUser}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar usuario" />
            </SelectTrigger>
            <SelectContent>
              {users.map((user) => (
                <SelectItem key={user.id} value={user.id.toString()}>
                  {user.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!selectedUser ? (
        <div className="text-center py-12 border rounded-lg bg-muted/10">
          <Music className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">Selecciona un usuario</h3>
          <p className="text-muted-foreground">Elige un usuario para ver sus canciones favoritas</p>
        </div>
      ) : loading ? (
        <div className="text-center py-12">Cargando favoritos...</div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/10">
          <p className="text-muted-foreground">Este usuario no tiene canciones favoritas</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((fav) => {
            const song = songs[fav.cancion_id]
            if (!song) return null

            return (
              <Card key={fav.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{song.titulo}</CardTitle>
                      <CardDescription>{song.artista}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive/90 -mr-2 -mt-2"
                      onClick={() => handleRemoveFavorite(fav.cancion_id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Music className="h-3 w-3" />
                      <span>{song.genero || "Sin género"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>{song.anio || "N/A"}</span>
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground/60">
                    Agregado el {new Date(fav.fecha_marcado).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
