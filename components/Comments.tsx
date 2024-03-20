'use client';
import { fetchCommentsForEpisode } from '@/database/comment';
import supabase from '@/database/dbConfig';
import { CommentUser } from '@/database/types/types';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

interface Props {
  initialComments: CommentUser[];
  episodeId: number;
  session: Session | null;
}

const Comments = ({ initialComments, episodeId, session }: Props) => {
  const [comments, setComments] = useState<CommentUser[]>(initialComments);
  useEffect(() => {
    const commentSubscription = supabase
      .channel('comment')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'comment' },
        async () => {
          const newComments = await fetchCommentsForEpisode(episodeId);
          setComments(newComments);
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
        <CommentForm episodeId={episodeId} session={session} />
      ) : (
        <p className="text-center p-5">Zaloguj się aby dodać komentarz</p>
      )}
      <CommentList
        mainComments={mainComments}
        replies={replies}
        episodeId={episodeId}
      />
    </>
  );
};

export default Comments;
