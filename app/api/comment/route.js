import { connectMongoDB } from "@/lib/mongodb";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, comment, img, name } = await request.json();
    await connectMongoDB();
    await Comment.create({ email, comment, img, name });
    return NextResponse.json({ message: "comment Registered" }, { status: 201 });
}
export async function GET() {
    await connectMongoDB();
    const comment = await Comment.find();
    return NextResponse.json({ comment });
}
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Comment.findByIdAndDelete(id);
    return NextResponse.json({ message: "Comment deleted" }, { status: 200 });
}
