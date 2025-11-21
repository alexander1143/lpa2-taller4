"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Music, Heart, Activity } from "lucide-react"

export function StatsCards() {
  const [stats, setStats] = useState({
    users: 0,
    songs: 0,
    favorites: 0,
  })

  useEffect(() => {
    Promise.all([
      fetch("/api/usuarios").then((res) => res.json()),
      fetch("/api/canciones").then((res) => res.json()),
      fetch("/api/favoritos").then((res) => res.json()),
    ])
      .then(([users, songs, favorites]) => {
        setStats({
          users: users.length,
          songs: songs.length,
          favorites: favorites.length,
        })
      })
      .catch(console.error)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Usuarios</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.users}</div>
          <p className="text-xs text-muted-foreground">Usuarios registrados</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Canciones</CardTitle>
          <Music className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.songs}</div>
          <p className="text-xs text-muted-foreground">En la biblioteca</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Favoritos</CardTitle>
          <Heart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.favorites}</div>
          <p className="text-xs text-muted-foreground">Marcados por usuarios</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Estado API</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">Online</div>
          <p className="text-xs text-muted-foreground">Sistema operativo</p>
        </CardContent>
      </Card>
    </div>
  )
}
