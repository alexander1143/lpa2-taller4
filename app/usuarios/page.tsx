"use client"

import { UsersTable } from "@/components/users/users-table"
import { ProtectedRoute } from "@/components/auth/protected-route"

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <div className="p-8">
        <UsersTable />
      </div>
    </ProtectedRoute>
  )
}
