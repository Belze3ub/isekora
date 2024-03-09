'use client';

import supabase from '@/database/dbConfig';
import { CommentUser, Emoji } from '@/database/types/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Comment from './Comment';
import { Button } from './ui/button';

interface Props {
  comments: CommentUser[];
  emojis: Emoji[];
}

const RealTimeComments = ({ comments, emojis }: Props) => {
  const [showRes, setShowRes] = useState<number []>([]);
  const router = useRouter();
  useEffect(() => {
    const channel = supabase
      .channel('realtime comments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comment',
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  const toggleShowRes = (commentId: number) => {
    showRes.includes(commentId)
      ? setShowRes(showRes.filter((s) => s !== commentId))
      : setShowRes([...showRes, commentId]);
  }

  const getResponses = (commentId: number) =>
    comments.filter((c) => c.parent_id === commentId);
  
  return (
    <div className="flex flex-col gap-5">
      {comments
        .filter((comment) => !comment.parent_id)
        .map((comment) => (
          <Comment comment={comment} key={comment.comment_id} emojis={emojis}>
            {getResponses(comment.comment_id).length !== 0 && (
              <div>
                <Button
                  variant="ghost"
                  className="rounded-full text-accent"
                  onClick={() => toggleShowRes(comment.comment_id)}
                >
                  {showRes.includes(comment.comment_id) ? (
                    <IoIosArrowUp size={20} />
                  ) : (
                    <IoIosArrowDown size={20} />
                  )}
                  <span className="ml-1">{`${
                    getResponses(comment.comment_id).length
                  } odpowiedzi`}</span>
                </Button>
                {showRes.includes(comment.comment_id) && (
                  <div className="mt-2 ml-5">
                    {getResponses(comment.comment_id).map((comm) => (
                      <Comment
                        key={comm.comment_id}
                        comment={comm}
                        emojis={emojis}
                      />
                      // <p key={comm.comment_id}>{comm.comment_id}</p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Comment>
        ))}
    </div>
  );
};

export default RealTimeComments;
