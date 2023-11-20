'use client';
import Image from "next/image";
import { HiOutlineTrash } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import PostCommentList from "./PostCommentList";

export default function PostContent({ name = '', img = '', email = '', title = '', content = '', id = '' }) {
    const { status, data: session } = useSession();
    const [isEdit, setIsEdit] = useState(0);
    const [newTitle, setNewTitle] = useState(title);
    const [newContent, setNewContent] = useState(content);
    const router = useRouter();
    const handleEdit = () => {
        setIsEdit(1);
        setNewTitle(title);
    }
    const cancelEdit = () => {
        setIsEdit(0);
        setNewContent(content);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/post/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ newTitle, newContent }),
            });
            if (!res.ok) {
                throw new Error("Failed to update topic");
            }
            setIsEdit(0);
            router.push("/post");
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }
    const handleDelete = async () => {
        const confirmed = confirm("確定要刪除?");
        if (confirmed) {
            const res = await fetch(`/api/post/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.push("/post");
                router.refresh();
            }
        }
    }
    return (
        <div>
            <div className="flex items-center mt-4">
                <span>
                    <Image
                        className="rounded-full m-4"
                        src={img}
                        width={30}
                        height={30}
                        alt='profile'
                    />
                </span>
                <span className="font-bold text-lg text-blue-700">
                    {name}
                </span>
            </div>
            <div className="relative whitespace-pre">
                {isEdit === 0 && (
                    <>
                        <p className="flex m-4 font-bold text-4xl text-black">
                            {title}
                            {session?.user?.email === email &&
                                <>
                                    <button onClick={handleEdit} className="text-black absolute right-12">
                                        <FaRegEdit size={24} /> </button>
                                    <button onClick={handleDelete} className="text-red-400 absolute right-4">
                                        <HiOutlineTrash size={24} /> </button>
                                </>
                            }
                        </p>
                        <hr />
                        <p className="m-4 text-xl">
                            {content}
                        </p>
                        <hr />
                    </>
                )}
                {isEdit === 1 && (
                    <>
                        <form onSubmit={handleSubmit} action="">
                            <div className="relative flex items-center">
                                <input onChange={e => setNewTitle(e.target.value)}
                                    value={newTitle} className='flex m-4 font-bold text-4xl text-black' type="text" />
                                <button className='absolute right-4' onClick={cancelEdit}>
                                    <MdCancel size={24} />
                                </button>
                                <button className='absolute right-12 text-green-500' type="submit" >
                                    <FaCheck size={24} />
                                </button>
                            </div>
                            <textarea onChange={e => setNewContent(e.target.value)}
                                value={newContent} className="p-2 m-4 w-full text-xl"
                                cols="1" rows="10"></textarea>
                        </form>
                    </>
                )}

            </div>
            {/* <PostCommentList id={id} email={email} /> */}
        </div>
    )
}