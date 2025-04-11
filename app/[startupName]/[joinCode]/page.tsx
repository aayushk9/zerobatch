import { UserForm } from "@/components/userform"

export default function JoinPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Join the Waitlist</h1>
        <p className="text-muted-foreground mt-2">Get early access to this exciting startup</p>
      </div>
      <div className="bg-muted/50 p-6 rounded-lg border shadow-sm">
        <UserForm />
      </div>
    </div>
  )
}