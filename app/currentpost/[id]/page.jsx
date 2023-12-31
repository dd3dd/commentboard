import PostCommentList from "@/components/PostCommentList";
import PostContent from "@/components/PostContent";

const getPostById = async (id) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topic");
        }
        return res.json();
    } catch (error) {
        console.log(error);
    }
};
export default async function Page({ params }) {
    const { id } = params;
    const { post } = await getPostById(id);
    const { name, img, email, title, content } = post;

    return (
        <div>
            <PostContent content={content} name={name} img={img} email={email} title={title} id={id} />
            <PostCommentList id={id} email={email} />
        </div>
    );
}
