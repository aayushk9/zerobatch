import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { Logout } from "@/components/logout"
import { Startup } from "@/components/startup"
import { RenderUsers } from "@/components/render-users"

export default async function Dashboard() {
  const session = await getServerSession()

  if (!session) {
    redirect("/")
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <h2 className="text-xl text-muted-foreground">Welcome back, {session.user.name}</h2>
        </div>
        <div>
          <Logout />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-6">
          <div className="bg-muted/50 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Create a Startup Link</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate a unique link for your startup that you can share with potential beta users.
            </p>
            <Startup />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-muted/50 p-6 rounded-lg border">
            <h3 className="text-xl font-semibold mb-4">Beta Users</h3>
            <p className="text-sm text-muted-foreground mb-4">
              View all the beta users who have signed up for your startups.
            </p>
            <RenderUsers />
          </div>
        </div>
      </div>
    </div>
  )
}