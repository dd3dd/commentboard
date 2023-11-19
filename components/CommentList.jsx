import Comment from "./Comment";
import AddComment from "./AddComment";
const show = async () => {
    try {
        // console.log(session.user.image)
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/comment', {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }
        return res.json();
        // const { comment } = await res.json();
        // console.log(comment)
        // setMyComment(comment);
    } catch (error) {
        console.log(error);
    }
};

export default async function ShowComment() {
    const { comment } = await show();
    // const { status, data: session } = useSession();
    // const [myComment, setMyComment] = useState([]);

    // useEffect(() => {
    //     if (status === "authenticated") {
    //         show();
    //     }
    // }, [session])
    return (
        <div className="mt-12 h-80">
            {comment.map(e =>
                <Comment key={e._id} id={e._id} email={e.email} imgSrc={e.img} comment={e.comment} name={e.name} />
            )}
            <AddComment />
        </div>
    )
}