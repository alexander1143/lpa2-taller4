export interface Usuario {
  id: number
  nombre: string
  correo: string
  fecha_registro: string
}

export interface Cancion {
  id: number
  titulo: string
  artista?: string
  album?: string
  duracion?: number // en segundos
  anio?: number
  genero?: string
  audio_url?: string // URL del archivo de audio
  fecha_creacion: string
}

export interface Favorito {
  id: number
  usuario_id: number
  cancion_id: number
  fecha_marcado: string
}

export interface CreateUsuarioDto {
  nombre: string
  correo: string
}

export interface UpdateUsuarioDto {
  nombre?: string
  correo?: string
}

export interface CreateCancionDto {
  titulo: string
  artista?: string
  album?: string
  duracion?: number
  anio?: number
  genero?: string
  audio_url?: string
}

export interface UpdateCancionDto extends Partial<CreateCancionDto> {}
