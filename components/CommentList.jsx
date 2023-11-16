import Comment from "./Comment";
import AddComment from "./AddComment";
import axios from "axios";
const show = async () => {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/comment`, {
            headers: {
                'Cache-Control': 'no-store',
            },
        });
        return response.data;

    } catch (error) {
        console.error(error);
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