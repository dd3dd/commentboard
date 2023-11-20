"use client";
import Image from "next/image";
import { signIn } from "next-auth/react";
export default function SignInBtn() {
  const signInEvt = () => {
    signIn("google");
  }
  return (
    <button
      onClick={signInEvt}
      className="flex items-center gap-4 shadow-xl rounded-lg pl-3"
    >
      <Image src="/google-logo.png" height={30} width={30} alt='googleLogo' />
      <span className="bg-blue-500 text-white px-4 py-3">
        Sign in with Google
      </span>
    </button>
  );
}
