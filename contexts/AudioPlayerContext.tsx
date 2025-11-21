"use client"

import React, { createContext, useContext, useState, useRef, useEffect } from "react"
import type { Cancion } from "@/types"

interface AudioPlayerContextType {
  currentSong: Cancion | null
  isPlaying: boolean
  volume: number
  currentTime: number
  duration: number
  playSong: (song: Cancion) => void
  togglePlay: () => void
  setVolume: (volume: number) => void
  seekTo: (time: number) => void
  playNext: () => void
  playPrevious: () => void
  queue: Cancion[]
  addToQueue: (song: Cancion) => void
  clearQueue: () => void
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined)

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentSong, setCurrentSong] = useState<Cancion | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolumeState] = useState(0.7)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [queue, setQueue] = useState<Cancion[]>([])
  
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.volume = volume
    }

    const audio = audioRef.current

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)
    const handleDurationChange = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      playNext()
    }

    audio.addEventListener("timeupdate", handleTimeUpdate)
    audio.addEventListener("durationchange", handleDurationChange)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate)
      audio.removeEventListener("durationchange", handleDurationChange)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  const playSong = (song: Cancion) => {
    if (!audioRef.current) return

    // Por ahora usamos una URL de ejemplo. Deberás agregar el campo 'audio_url' a tu modelo
    const audioUrl = `https://www.soundhelix.com/examples/mp3/SoundHelix-Song-${(song.id % 16) + 1}.mp3`
    
    audioRef.current.src = audioUrl
    audioRef.current.load()
    audioRef.current.play().then(() => {
      setCurrentSong(song)
      setIsPlaying(true)
    }).catch((error) => {
      console.error("Error playing audio:", error)
    })
  }

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true))
    }
  }

  const setVolume = (newVolume: number) => {
    setVolumeState(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const playNext = () => {
    if (queue.length > 0) {
      const [nextSong, ...rest] = queue
      setQueue(rest)
      playSong(nextSong)
    }
  }

  const playPrevious = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }

  const addToQueue = (song: Cancion) => {
    setQueue((prev) => [...prev, song])
  }

  const clearQueue = () => {
    setQueue([])
  }

  return (
    <AudioPlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        volume,
        currentTime,
        duration,
        playSong,
        togglePlay,
        setVolume,
        seekTo,
        playNext,
        playPrevious,
        queue,
        addToQueue,
        clearQueue,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  )
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext)
  if (context === undefined) {
    throw new Error("useAudioPlayer must be used within an AudioPlayerProvider")
  }
  return context
}
