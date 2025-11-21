"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Cancion } from "@/types"
import { Edit, Trash2, Plus, Search, Play } from "lucide-react"
import { SongDialog } from "./song-dialog"
import { useAudioPlayer } from "@/contexts/AudioPlayerContext"

export function SongsTable() {
  const [songs, setSongs] = useState<Cancion[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedSong, setSelectedSong] = useState<Cancion | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const { playSong } = useAudioPlayer()

  const fetchSongs = async (query = "") => {
    setLoading(true)
    try {
      const url = query ? `/api/canciones/buscar?titulo=${encodeURIComponent(query)}` : "/api/canciones"
      const res = await fetch(url)
      const data = await res.json()
      setSongs(data)
    } catch (error) {
      console.error("Error fetching songs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSongs()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchSongs(searchQuery)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta canción?")) return
    try {
      await fetch(`/api/canciones/${id}`, { method: "DELETE" })
      fetchSongs(searchQuery)
    } catch (error) {
      console.error("Error deleting song:", error)
    }
  }

  const handleEdit = (song: Cancion) => {
    setSelectedSong(song)
    setDialogOpen(true)
  }

  const handleCreate = () => {
    setSelectedSong(null)
    setDialogOpen(true)
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return "--:--"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Canciones</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button type="submit" variant="secondary">
              Buscar
            </Button>
          </form>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" /> Nueva
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Artista</TableHead>
              <TableHead className="hidden md:table-cell">Álbum</TableHead>
              <TableHead className="hidden sm:table-cell">Género</TableHead>
              <TableHead className="hidden sm:table-cell">Año</TableHead>
              <TableHead>Duración</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  Cargando...
                </TableCell>
              </TableRow>
            ) : songs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No se encontraron canciones
                </TableCell>
              </TableRow>
            ) : (
              songs.map((song) => (
                <TableRow key={song.id}>
                  <TableCell className="font-medium">{song.titulo}</TableCell>
                  <TableCell>{song.artista}</TableCell>
                  <TableCell className="hidden md:table-cell">{song.album}</TableCell>
                  <TableCell className="hidden sm:table-cell">{song.genero}</TableCell>
                  <TableCell className="hidden sm:table-cell">{song.anio}</TableCell>
                  <TableCell>{formatDuration(song.duracion)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => playSong(song)}
                        title="Reproducir"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(song)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(song.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <SongDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        song={selectedSong}
        onSave={() => fetchSongs(searchQuery)}
      />
    </div>
  )
}
