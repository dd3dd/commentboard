"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const { status, data: session } = useSession();

    const [title, setTitle] = useState("");
    const [postContent, setPostContent] = useState("");

    const router = useRouter();


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !postContent) {
            alert("Title and Content are required.");
            return;
        }
        try {
            const res = await fetch("/api/post", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    email: session.user.email,
                    title: title,
                    content: postContent,
                    img: session.user.image,
                    name: session.user.name
                }),
            });

            if (res.ok) {
                router.push('/')
                router.refresh();
            } else {
                throw new Error("Failed to create a topic");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <>
            {status === 'authenticated' && (
                <>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        <input
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            className="border border-slate-500 px-4 py-2"
                            type="text"
                            placeholder="Post Title"
                        />
                        <textarea onChange={e => setPostContent(e.target.value)} className='border border-slate-500 p-2'
                            name="" id="" cols="30" rows="10" placeholder="Post Content">
                        </textarea>
                        <button
                            type="submit"
                            className="bg-green-600 font-bold text-white mb-4 py-3 px-6 w-fit"
                        >
                            新增貼文
                        </button>
                    </form>
                    <Link className="bg-red-600  font-bold text-white py-3 px-6 w-fit"
                        href={`/`}>
                        取消
                    </Link>
                </>
            )}

        </>
    );
}
