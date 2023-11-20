import mongoose, { Schema, models } from "mongoose";

const postComment = new Schema(
    {
        postid: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        img: {
            type: String,
            require: true,
        },
        name: {
            type: String,
            require: true,
        }
    },
    { timestamps: true }
);

const PostComment = models.PostComment || mongoose.model("PostComment", postComment);
export default PostComment;
