"use client"

import { SongsTable } from "@/components/songs/songs-table"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function SongsPage() {
  return (
    <ProtectedRoute>
      <div className="p-8">
        <SongsTable />
      </div>
    </ProtectedRoute>
  )
}
