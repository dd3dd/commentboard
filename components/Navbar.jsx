"use client";

import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status, data: session } = useSession();
  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      {status === 'unauthenticated' ? <span className="font-bold text-lg text-blue-700" >
        請先登入!!
      </span> :
        <span className="font-bold text-lg text-blue-700 flex " >
          <Image
            className="rounded-full"
            src={session?.user?.image}
            width={30}
            height={30}
          />
          <span className="ml-4">
            {session?.user?.email}
          </span>
        </span>
      }
      {status === "authenticated" && (
        <button
          onClick={() => signOut()}
          className="bg-slate-900 text-white px-6 py-2 rounded-md"
        >
          登出
        </button>
      )}
    </div>
  );
}
