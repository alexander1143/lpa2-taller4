"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Usuario, Cancion } from "@/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentActivity() {
  const [recentUsers, setRecentUsers] = useState<Usuario[]>([])
  const [recentSongs, setRecentSongs] = useState<Cancion[]>([])

  useEffect(() => {
    fetch("/api/usuarios")
      .then((res) => res.json())
      .then((data: Usuario[]) => {
        // Sort by date desc and take top 5
        const sorted = [...data]
          .sort((a, b) => new Date(b.fecha_registro).getTime() - new Date(a.fecha_registro).getTime())
          .slice(0, 5)
        setRecentUsers(sorted)
      })

    fetch("/api/canciones")
      .then((res) => res.json())
      .then((data: Cancion[]) => {
        const sorted = [...data]
          .sort((a, b) => new Date(b.fecha_creacion).getTime() - new Date(a.fecha_creacion).getTime())
          .slice(0, 5)
        setRecentSongs(sorted)
      })
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Canciones Recientes</CardTitle>
          <CardDescription>Últimas canciones agregadas a la biblioteca</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {recentSongs.map((song) => (
              <div key={song.id} className="flex items-center">
                <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                  {song.titulo.substring(0, 2).toUpperCase()}
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{song.titulo}</p>
                  <p className="text-sm text-muted-foreground">
                    {song.artista} • {song.genero}
                  </p>
                </div>
                <div className="ml-auto font-medium text-xs text-muted-foreground">
                  {new Date(song.fecha_creacion).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Nuevos Usuarios</CardTitle>
          <CardDescription>Usuarios registrados recientemente</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{user.nombre.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">{user.nombre}</p>
                  <p className="text-sm text-muted-foreground">{user.correo}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
