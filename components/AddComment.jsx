'use client';
import { useSession } from "next-auth/react";
export default function AddComment() {
    return (
        <form className='flex' action="">
            <div className="w-full flex shadow-md">
                <input className='p-2 w-full h-full' type="text" />
                <button >a</button>
            </div>
        </form>

    )
}