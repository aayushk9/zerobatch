"use client"
import { signIn, signOut, useSession } from 'next-auth/react'

export function HomePage () {
    const session = useSession();
    return <div>
        <div className="flex justify-between">
            <div>
                zerobatch
            </div>
            <div>
                {session.data?.user && <button className='m-2 p-2 bg-blue-400' onClick={() => signOut()}>logout</button>}
                {!session.data?.user && <button className='m-2 p-2 bg-blue-400' onClick={() => signIn()}>signin with google</button>}  
            </div>
        </div>
    </div>
}