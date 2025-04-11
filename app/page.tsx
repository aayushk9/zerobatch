import Image from "next/image";
import { LandingPage } from '@/components/landing-page'
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions)

  if(session) {
    redirect("/dashboard")
  }
  return (
    <div>
      <LandingPage/> 
    </div>
  );  
}