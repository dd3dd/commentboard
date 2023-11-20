import { connectMongoDB } from "@/lib/mongodb";
import Post from "@/models/post";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, title, content, img, name } = await request.json();
    await connectMongoDB();
    await Post.create({ email, title, content, img, name });
    return NextResponse.json({ message: "Post Registered" }, { status: 201 });
}
export async function GET() {
    await connectMongoDB();
    const post = await Post.find();
    return NextResponse.json({ post });
}