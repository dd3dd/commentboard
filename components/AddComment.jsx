'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
export default function AddComment() {
    const { status, data: session } = useSession();
    const [comment, setComment] = useState('');
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (comment !== '') {
            try {
                const requestData = {
                    email: session.user.email,
                    comment: comment,
                    img: session.user.image,
                    name: session.user.name,
                };
                await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/comment`, requestData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                setComment('')
                router.refresh();

            } catch (error) {
                console.log(error);
            }
        }
    }
    // console.log(comment)
    return (
        <>
            {status === 'authenticated' &&
                <form onSubmit={handleSubmit} className='flex ' action="">
                    <div className="w-full flex shadow-md mb-4">
                        <input onChange={e => setComment(e.target.value)}
                            value={comment} className='p-2 w-full h-full' type="text" />
                        {/* <button type="submit" >a</button> */}
                    </div>
                </form>}
        </>
    )
}