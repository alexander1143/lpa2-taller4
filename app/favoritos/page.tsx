"use client"

import { FavoritesList } from "@/components/favorites/favorites-list"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function FavoritesPage() {
  return (
    <ProtectedRoute>
      <div className="p-8">
        <FavoritesList />
      </div>
    </ProtectedRoute>
  )
}
