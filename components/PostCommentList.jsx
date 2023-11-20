import AddPostComment from "./AddPostComment";
import PostComment from "./PostComment";
const show = async (id) => {
    try {
        // console.log(session.user.image)
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/postcomment/${id}`, {
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

export default async function PostCommentList({ id = '', email = '' }) {
    const { postcomment } = await show(id);

    return (
        <div className="m-4">
            {postcomment.map(e =>
                <PostComment key={e._id} id={e._id} email={e.email} img={e.img} comment={e.comment} name={e.name} />
            )}
            <AddPostComment postid={id} email={email} />
        </div>
    )
}