import { connectMongoDB } from "@/lib/mongodb";
import PostComment from "@/models/postcomment";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { postid, email, comment, img, name } = await request.json();
    await connectMongoDB();
    await PostComment.create({ postid, email, comment, img, name });
    return NextResponse.json({ message: "comment Registered" }, { status: 201 });
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await PostComment.findByIdAndDelete(id);
    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
}
export async function PUT(request) {
    const id = request.nextUrl.searchParams.get("id");
    const { postid, email, newComment: comment, img, name } = await request.json();
    await connectMongoDB();
    await PostComment.findByIdAndUpdate(id, { postid, email, comment, img, name });
    return NextResponse.json({ message: "Comment updated" }, { status: 200 });
}
