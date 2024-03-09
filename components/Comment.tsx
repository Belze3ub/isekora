'use client';
import { timeAgo } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';
import { CommentUser } from '@/database/types/types';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import CommentForm from './CommentForm';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';

interface Props {
  comment: CommentUser;
  children?: React.ReactNode;
}

const Comment = ({ comment, children }: Props) => {
  const [rendered, setRendered] = useState(false);
  const [reply, setReply] = useState<number[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    setRendered(true);
  }, []);

  const handleReply = (commentId: number) => {
    reply.includes(commentId)
      ? setReply(reply.filter((r) => r !== commentId))
      : setReply([...reply, commentId]);
  };

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
          <div className="text-gray-400 text-sm">
            {rendered ? (
              timeAgo(new Date(comment.update_date!))
            ) : (
              <Skeleton className="h-3 w-20" />
            )}
          </div>
        </div>
        <div
          className={`break-all ${
            comment.spoiler &&
            'blur-sm hover:blur-none transition-all duration-300'
          }`}
        >
          {comment.comment_text}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Button variant="ghost">
              <FaPlus />
            </Button>
            {!comment.parent_id && session?.user?.id && (
              <Button
                variant="ghost"
                className="rounded-full"
                onClick={() => handleReply(comment.comment_id)}
              >
                Odpowiedz
              </Button>
            )}
          </div>
          {reply.includes(comment.comment_id) && (
            <div className="mt-5">
              <CommentForm
                episodeId={comment.episode_id!}
                parentId={comment.comment_id}
                setReply={setReply}
              />
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Comment;
