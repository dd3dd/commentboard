import Post from "@/components/Post";

const show = async () => {
    try {
        // console.log(session.user.image)
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
        <div className="flex flex-wrap">
            {post.map(e =>
                <Post key={e._id} id={e._id} email={e.email} img={e.img} title={e.title} content={e.content} />
            )}
        </div>
    )
}