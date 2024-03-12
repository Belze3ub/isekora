'use client';
import { CommentUser } from '@/database/types/types';
import { Session } from 'next-auth';
import { useOptimistic } from 'react';
import CommentFormTest from './CommentFormTest';
import CommentList from './CommentList';

interface Props {
  comments: CommentUser[];
  episodeId: number;
  session: Session | null;
}

const Comments = ({ comments, episodeId, session }: Props) => {
  const [optimisticComments, setOptimisticComments] = useOptimistic(
    comments,
    (state, newComment: CommentUser) => {
      return [newComment, ...state];
    }
  );

  const mainComments = optimisticComments
    ? optimisticComments?.filter((comment) => !comment.parent_id)
    : [];
  const replies = optimisticComments
    ? optimisticComments?.filter((comment) => comment.parent_id)
    : [];

  return (
    <>
      <h2 className='h2-bold text-center'>
        Liczba komentarzy: {mainComments.length}
      </h2>
      {session?.user ? (
        <CommentFormTest
          episodeId={episodeId}
          session={session}
          setOptimisticComments={setOptimisticComments}
        />
      ) : (
        <p className="text-center p-5">Zaloguj się aby dodać komentarz</p>
      )}
      <CommentList
        mainComments={mainComments}
        replies={replies}
        episodeId={episodeId}
        setOptimisticComments={setOptimisticComments}
      />
    </>
  );
};

export default Comments;
