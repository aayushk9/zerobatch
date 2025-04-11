"use client"
import { Button } from "./ui/button"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"

 
export function Logout () {
   return <div>
      <Button variant="outline" onClick={() => signOut()} className="font-medium" size="sm">
          Logout
      </Button>
    </div>
}