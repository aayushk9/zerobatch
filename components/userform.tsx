"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { useParams } from "next/navigation"
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export function UserForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [intent, setIntent] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const params = useParams()
  const joinCode = params?.joinCode as string

  const handleSubmit = async () => {
    if (!joinCode) {
      setError("No join code found in URL")
      return
    }

    if (!name.trim() || !email.trim() || !intent.trim()) {
      setError("Please fill out all fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      const res = await fetch(`http://localhost:3000/api/user/${joinCode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          intent,
        }),
      })

      if (res.ok) {
        setSuccess(true)
        setName("")
        setEmail("")
        setIntent("")
      } else {
        const data = await res.json()
        setError(data.message || "Failed to join waitlist")
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="mx-auto bg-green-100 rounded-full p-2 w-16 h-16 flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold">Thank You!</h3>
        <p className="text-muted-foreground">Your request has been submitted successfully.</p>
        <p className="text-sm text-muted-foreground">We'll be in touch when early access is available.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Aayush"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            placeholder="aayushk.dev@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="intent">Why are you interested?</Label>
          <Textarea
            id="intent"
            placeholder="I'm interested because..."
            value={intent}
            onChange={(e) => setIntent(e.target.value)}
            rows={4}
            required
          />
          <p className="text-xs text-muted-foreground">Tell the founders why you're excited about their product</p>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={loading || !name.trim() || !email.trim() || !intent.trim()}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Join Waitlist"
        )}
      </Button>
    </div>
  )
}