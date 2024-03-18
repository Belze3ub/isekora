'use client';
import { Comment, CommentUser } from '@/database/types/types';
import { Session } from 'next-auth';
import { useEffect, useOptimistic, useState } from 'react';
import CommentFormTest from './CommentFormTest';
import CommentList from './CommentList';
import supabase from '@/database/dbConfig';
import { fetchCommentById, fetchCommentsForEpisode } from '@/database/comment';

interface Props {
  initialComments: CommentUser[];
  episodeId: number;
  session: Session | null;
}

const Comments = ({ initialComments, episodeId, session }: Props) => {
  const [comments, setComments] = useState<CommentUser[]>(initialComments);
  // const [optimisticComments, setOptimisticComments] = useOptimistic(
  //   comments,
  //   (state, newComment: CommentUser) => {
  //     return [newComment, ...state];
  //   }
  // );
  useEffect(() => {
    const commentSubscription = supabase
      .channel('comment')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comment' },
        async () => {
          const newComments = await fetchCommentsForEpisode(episodeId);
          setComments(newComments);
          // const comment_id = (payload.new as Comment).comment_id;
          // const newComment = await fetchCommentById(comment_id);
          // // const newComment = payload.new as CommentUser
          // newComment &&
          //   setComments((prevComments) => [...prevComments, newComment]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(commentSubscription);
    };
  }, [episodeId]);

  const mainComments = comments
    ? comments?.filter((comment) => !comment.parent_id)
    : [];
  const replies = comments
    ? comments?.filter((comment) => comment.parent_id)
    : [];

  return (
    <>
      <h2 className="h2-bold text-center">
        Liczba komentarzy: {mainComments.length}
      </h2>
      {session?.user ? (
        <CommentFormTest
          episodeId={episodeId}
          session={session}
          // setOptimisticComments={setOptimisticComments}
        />
      ) : (
        <p className="text-center p-5">Zaloguj się aby dodać komentarz</p>
      )}
      <CommentList
        mainComments={mainComments}
        replies={replies}
        episodeId={episodeId}
        // setOptimisticComments={setOptimisticComments}
      />
    </>
  );
};

export default Comments;
