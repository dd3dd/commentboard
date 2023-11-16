'use client';
import { HiOutlineTrash } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";

export default function Comment({ id = '', email = '', imgSrc = '', comment = '', name = '' }) {
    const { status, data: session } = useSession();
    const [isEdit, setIsEdit] = useState(0);
    const [newComment, setNewComment] = useState(comment);
    const router = useRouter();

    const handleDelete = async () => {

        const confirmed = confirm("確定要刪除?");
        if (confirmed) {
            try {
                await axios.delete(`${process.env.NEXT_PUBLIC_URL}/api/comment?id=${id}`);
                router.refresh();
            } catch (error) {
                console.log(error);
            }

        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_URL}/api/comment?id=${id}`, {
                newComment: newComment,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setIsEdit(0);
            router.refresh();

        } catch (error) {
            console.error(error);
        }
    }
    const handleEdit = () => {
        setIsEdit(1);
        setNewComment(comment);
    }
    const cancelEdit = () => {
        setIsEdit(0);
        setNewComment(comment);
    }
    // console.log(process.env.NEXT_PUBLIC_URL)
    return (
        <div className="relative h-12 flex justify-start items-center shadow-md my-4">
            <Image
                className="rounded-full m-4"
                src={imgSrc}
                width={30}
                height={30}
                alt='profile'
            />

            <div className="w-24">
                <p className="font-bold text-lg text-blue-700 ">{name}</p>
                <p >{comment}</p>
                {/* <p className="">{newComment}</p> */}
            </div>

            {session?.user?.email === email && isEdit === 0 &&
                <>
                    <button onClick={handleEdit} className="text-black absolute right-12">
                        <FaRegEdit size={24} /> </button>
                    <button onClick={handleDelete} className="text-red-400 absolute right-4">
                        <HiOutlineTrash size={24} /> </button>
                </>
            }
            {session?.user?.email === email && isEdit === 1 &&
                <>
                    <form onSubmit={handleSubmit} className='w-full' action="">
                        <div className="ml-2 w-10/12 h-full flex ">
                            <input onChange={e => setNewComment(e.target.value)}
                                value={newComment} className='p-2 w-full h-full' type="text" />
                            <button className='ml-4 text-green-500' type="submit" >
                                <FaCheck size={24} />
                            </button>
                        </div>
                    </form>
                    <button className='mr-4' onClick={cancelEdit}>
                        <MdCancel size={24} />
                    </button>
                </>
            }


        </div >
    )
}