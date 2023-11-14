'use client';
import { useSession } from "next-auth/react";

export default function ShowComment() {
    const { status, data: session } = useSession();
    if (status === "authenticated") {
        console.log(session)
    }
    return (
        <div>
            {/* {session.user.email} */}
        </div>
    )
}