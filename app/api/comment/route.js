import { connectMongoDB } from "@/lib/mongodb";
import Comment from "@/models/comment";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { email, comment } = await request.json();
    await connectMongoDB();
    await Comment.create({ email, comment });
    return NextResponse.json({ message: "comment Registered" }, { status: 201 });
}
export async function GET() {
    await connectMongoDB();
    const comment = await Comment.find();
    return NextResponse.json({ comment });
}
