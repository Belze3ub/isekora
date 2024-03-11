'use client'
import { CommentUser } from "@/database/types/types";
import { timeAgo } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaReply } from "react-icons/fa6";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CommentFormTest from "./CommentFormTest";
import { Button } from "./ui/button";

interface Props {
  comment: CommentUser;
  setOptimisticComments?: (comment: CommentUser) => void;
  episodeId: number;
  replies?: CommentUser[],
}

const CommentTest = ({
  comment,
  setOptimisticComments,
  episodeId,
  replies,
}: Props) => {
  const [timeAgoStr, setTimeAgoStr] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const [showResponses, setShowResponses] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const timeAgoStr = timeAgo(new Date(comment.create_date!)) || '';
    setTimeAgoStr(timeAgoStr);
  }, [comment]);

  const responses = replies
    ?.filter((reply) => reply.parent_id === comment.comment_id)
    .sort(
      (a, b) =>
        new Date(a.create_date!).getTime() - new Date(b.create_date!).getTime()
    );

  return (
    <div key={comment.comment_id} className="flex gap-3 overflow-hidden">
      <div className="relative w-[30px] h-[30px]  rounded-full overflow-hidden shrink-0">
        <Image
          src={comment.image}
          fill
          className="object-cover"
          alt={`${comment.name} avatar`}
        />
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex py-1 flex-wrap items-center">
          <div className="font-medium mr-2">{comment.name}</div>
          <div className="text-gray-400 text-sm">{timeAgoStr}</div>
        </div>
        <div
          className={`break-all ${
            comment.spoiler &&
            'blur-sm hover:blur-none transition-all duration-300'
          }`}
        >
          {comment.comment_text}
        </div>
        <div className="flex items-center gap-2">
          {!comment.parent_id && session?.user?.id && (
            <Button
              variant="ghost"
              className="rounded-full p-1"
              onClick={() => setIsReplying(!isReplying)}
            >
              <FaReply />
              <span className="ml-1">Odpowiedz</span>
            </Button>
          )}
        </div>
        {isReplying && session?.user?.id && (
          <div className="mt-5">
            {setOptimisticComments && (
              <CommentFormTest
                episodeId={episodeId}
                session={session}
                setOptimisticComments={setOptimisticComments}
                parentId={comment.comment_id}
                isReplying={isReplying}
                setIsReplying={setIsReplying}
                showResponses={showResponses}
                setShowResponses={setShowResponses}
              />
            )}
          </div>
        )}
        <div>
          {responses?.length !== 0 && replies && (
            <Button
              variant="default"
              className="rounded-full text-accent p-1 hover:bg-transparent"
              onClick={() => setShowResponses(!showResponses)}
            >
              {showResponses ? (
                <IoIosArrowUp size={20} />
              ) : (
                <IoIosArrowDown size={20} />
              )}
              <span className="ml-1">{`${responses?.length} odpowiedzi`}</span>
            </Button>
          )}
          {showResponses && (
            <div className="mt-5">
              {responses?.map((reply) => (
                <CommentTest
                  key={reply.comment_id}
                  comment={reply}
                  episodeId={episodeId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentTest