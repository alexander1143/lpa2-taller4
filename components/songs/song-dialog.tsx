"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Cancion, CreateCancionDto } from "@/types"

interface SongDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  song?: Cancion | null
  onSave: () => void
}

export function SongDialog({ open, onOpenChange, song, onSave }: SongDialogProps) {
  const [formData, setFormData] = useState<CreateCancionDto>({
    titulo: "",
    artista: "",
    album: "",
    duracion: 0,
    anio: new Date().getFullYear(),
    genero: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    if (song) {
      setFormData({
        titulo: song.titulo,
        artista: song.artista || "",
        album: song.album || "",
        duracion: song.duracion || 0,
        anio: song.anio || new Date().getFullYear(),
        genero: song.genero || "",
      })
    } else {
      setFormData({
        titulo: "",
        artista: "",
        album: "",
        duracion: 0,
        anio: new Date().getFullYear(),
        genero: "",
      })
    }
    setError("")
  }, [song, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const url = song ? `/api/canciones/${song.id}` : "/api/canciones"
      const method = song ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Error al guardar canción")
      }

      onSave()
      onOpenChange(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{song ? "Editar Canción" : "Nueva Canción"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="titulo" className="text-right">
              Título
            </Label>
            <Input
              id="titulo"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="artista" className="text-right">
              Artista
            </Label>
            <Input
              id="artista"
              value={formData.artista}
              onChange={(e) => setFormData({ ...formData, artista: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="album" className="text-right">
              Álbum
            </Label>
            <Input
              id="album"
              value={formData.album}
              onChange={(e) => setFormData({ ...formData, album: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genero" className="text-right">
              Género
            </Label>
            <Select value={formData.genero} onValueChange={(value) => setFormData({ ...formData, genero: value })}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Seleccionar género" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Rock">Rock</SelectItem>
                <SelectItem value="Pop">Pop</SelectItem>
                <SelectItem value="Jazz">Jazz</SelectItem>
                <SelectItem value="Classical">Clásica</SelectItem>
                <SelectItem value="Electronic">Electrónica</SelectItem>
                <SelectItem value="Hip Hop">Hip Hop</SelectItem>
                <SelectItem value="Grunge">Grunge</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="anio" className="text-right">
              Año
            </Label>
            <Input
              id="anio"
              type="number"
              value={formData.anio}
              onChange={(e) => setFormData({ ...formData, anio: Number.parseInt(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="duracion" className="text-right">
              Duración (s)
            </Label>
            <Input
              id="duracion"
              type="number"
              value={formData.duracion}
              onChange={(e) => setFormData({ ...formData, duracion: Number.parseInt(e.target.value) })}
              className="col-span-3"
            />
          </div>
          {error && <p className="text-sm text-destructive col-span-4 text-center">{error}</p>}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
