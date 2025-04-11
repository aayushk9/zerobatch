"use client"
import { useState } from "react"
import { Button } from "./ui/button"
import { RefreshCw, User } from "lucide-react"
import { Skeleton } from "./ui/skeleton"

type BetaUser = {
  id: string
  username: string
  email: string
  intent: string
}

type Startup = {
  startupName: string
  betaUsers: BetaUser[]
}

export function RenderUsers() {
  const [startups, setStartups] = useState<Startup[]>([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:3000/api/founder/betauser")
      const data = await res.json()
      setStartups(data.formatted)
    } catch (error) {
      console.error("Failed to fetch beta users:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Button onClick={fetchUsers} disabled={loading} className="w-full">
        {loading ? (
          <>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            Loading...
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Beta Users
          </>
        )}
      </Button>

      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : startups.length > 0 ? (
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {startups.map((startup) => (
            <div key={startup.startupName} className="border p-4 rounded-lg bg-background shadow-sm">
              <h3 className="font-bold text-lg border-b pb-2 mb-3">{startup.startupName}</h3>

              {startup.betaUsers.length === 0 ? (
                <p className="text-muted-foreground text-sm py-2">No beta users yet.</p>
              ) : (
                <ul className="space-y-2">
                  {startup.betaUsers.map((user) => (
                    <li
                      key={user.id}
                      className="flex flex-col items-start gap-1 text-sm py-2 px-3 rounded-md bg-muted/50 border border-muted"
                    >
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{user.username}</span>
                      </div>
                      <span className="pl-6 text-muted-foreground text-xs">{user.email}</span>
                      {user.intent && (
                        <span className="pl-6 text-[11px] italic text-muted-foreground">"{user.intent}"</span>
                      )}
                    </li>
                  ))}
                </ul>

              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          <p>No startups or beta users found.</p>
          <p className="text-sm mt-2">Click the button above to refresh.</p>
        </div>
      )}
    </div>
  )
}