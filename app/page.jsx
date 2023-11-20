import Post from "@/components/Post";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
const show = async () => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/post', {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
export default async function Page() {
  const { post } = await show();
  return (
    <>
      <div className="relative flex flex-col">
        <Link className='absolute top-4 right-0' href={`/addpost`}>
          <IoMdAdd size={40} />
        </Link>
        {post.map(e =>
          <Post key={e._id} id={e._id} email={e.email} name={e.name} img={e.img} title={e.title} content={e.content} />
        )}
      </div>
    </>
  )
}