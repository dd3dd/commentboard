'use client';
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

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
            console.log(comment)
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
        <div className="mt-12 h-80">
            {status === 'authenticated' && myComment.map(e =>
                <Comment imgSrc={e.img} comment={e.comment} name={e.name} />
            )}
            <AddComment />
        </div>
    )
}