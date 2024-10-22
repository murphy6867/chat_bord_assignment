"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { CommentIcon, LeftIcon } from "@/public/icons/types";
import { Textarea } from "../ui/textarea";
import { getRelativeTime } from "@/app/utilities/relativeTime";
// import { BACKEND_URL } from "@/lib/constants";

import type { SiglePost, Comment } from "./types";

interface SiglePostProps {
  post: SiglePost;
  isSession: boolean;
  postId: string;
  sessionUserId: string | null;
}

const SiglePostComponent: FC<SiglePostProps> = ({
  post,
  isSession,
  postId,
  sessionUserId,
}) => {
  const router = useRouter();
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [comment, setComment] = useState("");
  const [commentState, setCommentState] = useState<Comment[]>(post.comments);

  const openCommentHandler = () => {
    if (!isSession) {
      router.push("/signin");
    } else {
      setIsOpenComment((prev) => !prev);
    }
  };

  const cancelCommentHandler = () => {
    setIsOpenComment(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      try {
        const response = await fetch("http://localhost:8000/comment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            content: comment,
            userId: sessionUserId,
            postId: +postId,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          const newComment = {
            content: result.content,
            createdAt: result.createdAt,
            id: result.id,
            user: {
              id: result.userId,
              username:
                sessionUserId === result.userId
                  ? "YourUsername"
                  : "OtherUsername",
            },
          };

          setComment("");
          setIsOpenComment(false);

          setCommentState([newComment, ...commentState]);
        } else {
          console.error("Failed to submit comment");
        }
      } catch (error) {
        console.error("Error submitting comment", error);
      }
    }
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="p-6 flex flex-col gap-6 justify-center items-start">
        <div>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex w-10 h-10 bg-gray-300 rounded-full items-center text-center justify-center mb-10"
          >
            <Image
              src={LeftIcon}
              width={15}
              height={15}
              alt="Left Icon alt text"
            />
          </button>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div className="flex flex-row items-center gap-3">
              <h2 className="font-semibold text-lg">{post.user.username}</h2>
              <p className="text-gray-400 font-light text-sm">
                {getRelativeTime(post.createdAt)}
              </p>
            </div>
          </div>
          <span className="text-sm text-gray-700 bg-gray-200 py-1 px-3 rounded-2xl">
            {post.category.name}
          </span>
          <h3 className="text-xl font-semibold mb-2 mt-4">{post.title}</h3>
          <p className="text-gray-700">{post.content}</p>
          <div className="mt-4 flex flex-row gap-2">
            <Image
              src={CommentIcon}
              width={18}
              height={18}
              alt="Comment Icon"
            />
            <p className="text-base text-gray-400">
              {`${post._count.comments || 0} ${
                post._count.comments > 1 ? "Comments" : "Comment"
              }`}
            </p>
          </div>
        </div>

        <div className="w-full">
          {!isOpenComment && (
            <button
              onClick={openCommentHandler}
              className="w-36 border-2 border-green-500 rounded-xl py-2 px-2 font-semibold text-white bg-green-500 hover:bg-green-700"
            >
              Add Comment
            </button>
          )}
          {isOpenComment && (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full gap-3 "
            >
              <Textarea
                className="rounded-xl border-gray-200 shadow-none text-gray-600 font-light"
                placeholder="What's on your mind..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></Textarea>
              <div className="flex flex-row w-full justify-end gap-2">
                <button
                  type="button"
                  onClick={cancelCommentHandler}
                  className="w-20 md:w-28 border-2 border-green-500 rounded-xl py-2 px-2 font-semibold text-green-500 hover:bg-green-200 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-20 md:w-28 border-2 border-green-500 rounded-xl py-2 px-2 font-semibold text-white bg-green-500 hover:bg-green-700"
                >
                  Post
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="w-full">
          {commentState.map((comment) => (
            <div key={comment.id} className="flex flex-row w-[100%] gap-3 pb-7">
              <div className="w-[15%] sm:w-[10%] md:w-[13%] lg:max-w-[8%]">
                <div className="w-12 h-12 rounded-full bg-gray-300"></div>
              </div>
              <div className="w-[80%] sm:w-[95%] md:w-[90%] flex flex-col gap-2 pt-2">
                <div className="flex flex-row gap-3 items-center">
                  <h4 className="font-medium text-lg">
                    {comment.user.username}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {getRelativeTime(comment.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-base font-light">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiglePostComponent;
