import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Logout } from "@/components/logout";
import { Startup } from "@/components/startup";
import { RenderUsers } from "@/components/render-users";

export default async function Dashboard() {
    const session = await getServerSession();

    if (!session) {
        redirect("/")
    }

    return <div>
        <div className="flex justify-between">
            <div>
                <h2>Welcome back, {session.user.name}</h2>
            </div>
            <div>
                <Logout />
            </div>
        </div>
        <div>
            <p>(Note: if you have created any startup link already it's beta users will be get render at beta users page)</p>
            <Startup />
            <RenderUsers/>
        </div>
    </div>
}