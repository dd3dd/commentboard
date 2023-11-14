'use client';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function ShowComment() {
    const { status, data: session } = useSession();
    const [myComment, setMyComment] = useState([]);
    const show = async () => {
        try {
            // console.log(session.user.image)
            const res = await fetch(`http://localhost:3000/api/comment`, {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch topics");
            }
            const { comment } = await res.json();
            setMyComment(comment);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        if (status === "authenticated") {
            show();
        }
    }, [status])
    return (
        <div className="mt-12">
            {status === 'authenticated' && myComment.map(e =>
                <div className="flex justify-between items-center shadow-md">
                    <img src={e.img} alt="profileImage" />
                    {e.comment}
                </div>
            )}
        </div>
    )
}