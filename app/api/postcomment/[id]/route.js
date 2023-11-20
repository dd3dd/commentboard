import { connectMongoDB } from "@/lib/mongodb";
import PostComment from "@/models/postcomment";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    const postcomment = await PostComment.find({ postid: id });
    return NextResponse.json({ postcomment }, { status: 200 });
}
export async function DELETE(request, { params }) {
    const { id } = params;
    await connectMongoDB();
    await PostComment.deleteMany({ postid: id });
    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
}
