'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function AddPostComment({ postid = '' }) {
    const { status, data: session } = useSession();
    const [comment, setComment] = useState('');
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment !== '') {
            try {
                const res = await fetch(`/api/postcomment`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        postid: postid,
                        email: session.user.email,
                        comment: comment,
                        img: session.user.image,
                        name: session.user.name
                    }),
                });
                if (res.ok) {
                    setComment('')
                    router.refresh();
                } else {
                    throw new Error("Failed to create a topic");
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    // console.log(comment)
    return (
        <>
            {status === 'authenticated' &&
                <form onSubmit={handleSubmit} className='flex' action="">
                    <div className="w-full flex shadow-md mb-4">
                        <input onChange={e => setComment(e.target.value)}
                            value={comment} className='p-2 w-full h-full' type="text" />
                    </div>
                </form>}
        </>
    )
}