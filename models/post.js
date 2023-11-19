import mongoose, { Schema, models } from "mongoose";

const post = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            required: true,
        }

    },
    { timestamps: true }
);

const Post = models.Post || mongoose.model("Post", post);
export default Post;
