"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Link2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function Startup() {
  const [startupName, setStartupName] = useState("")
  const [slugURL, setSlugURL] = useState("")
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateLink = async () => {
    if (!startupName.trim()) {
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/founder/startup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startupName,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        setSlugURL(data.slugURL)
      } else {
        console.error("Failed to generate link")
      }
    } catch (error) {
      console.error("Error generating link:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (slugURL) {
      navigator.clipboard.writeText(slugURL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="startup-name">Startup Name</Label>
        <Input
          id="startup-name"
          type="text"
          placeholder="Enter your startup name"
          value={startupName}
          onChange={(e) => setStartupName(e.target.value)}
        />
      </div>

      <Button onClick={generateLink} disabled={!startupName.trim() || loading} className="w-full">
        {loading ? "Generating..." : "Generate Link"}
      </Button>

      {slugURL && (
        <div className="mt-4 space-y-2">
          <Label>Your Startup Link</Label>
          <div className="flex gap-2">
            <div className="flex-1 p-2 border rounded-md bg-muted/50 text-sm truncate flex items-center">
              <Link2 className="h-4 w-4 mr-2 flex-shrink-0" />
              <span className="truncate">{slugURL}</span>
            </div>
            <Button variant="outline" size="icon" onClick={copyToClipboard} title="Copy to clipboard">
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          {copied && (
            <Alert className="bg-primary/10 border-primary/20">
              <AlertDescription className="text-xs">Link copied to clipboard!</AlertDescription>
            </Alert>
          )}

          <p className="text-xs text-muted-foreground mt-2">
            Bookmark and share this link with potential beta users to collect signups.
          </p>
        </div>
      )}
    </div>
  )
}