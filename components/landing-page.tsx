"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export  function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="text-xl">zerobatch</span>
        </Link>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Connect with early users for your startup
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  The easiest way to collect and manage beta user requests for your startup
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                
                  <>
                    <Button
                      className="w-full gap-2 bg-white text-black hover:bg-gray-100"
                      size="lg"
                      onClick={() => signIn("google")}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M1.2 12C1.2 6.5 5.8 2 11.3 2c2.7 0 5.2 1 7 2.7l-2.1 2.1C14.8 5.4 13.1 4.8 11.3 4.8c-4 0-7.2 3.2-7.2 7.2s3.2 7.2 7.2 7.2c4 0 6.8-2.8 6.8-6.8 0-.6-.1-1.2-.2-1.8H11v2.9h8.7c.4 2.1-.5 4.8-2.1 6.3-1.4 1.4-3.3 2.2-5.5 2.2-5.5 0-10-4.5-10-10z" />
                      </svg>
                      Sign up with Google
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      No credit card required. Start collecting beta requests in minutes.
                    </p>
                  </>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted/50 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How it works</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">For founders, by dev</h2>
                <p className="text-muted-foreground md:text-xl">
                  We built the tool we wished we had when launching our own startups. Simple, effective, and no
                  unnecessary features.
                </p>
                <ul className="grid gap-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Sign in with Google in seconds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Generate a unique signup link for your startup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Share on X, LinkedIn, or anywhere else</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Collect and manage beta user requests</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 zerobatch. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}