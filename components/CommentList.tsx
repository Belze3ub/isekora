import { CommentUser } from '@/database/types/types';
import Comment from './Comment';

interface Props {
  mainComments: CommentUser[];
  replies: CommentUser[];
  episodeId: number;
}

const CommentList = ({ mainComments, replies, episodeId }: Props) => {
  return (
    <>
      {mainComments.length !== 0 && (
        <div className="flex flex-col gap-5 mt-5">
          {mainComments.map((comment) => (
            <Comment
              key={comment.comment_id}
              comment={comment}
              episodeId={episodeId}
              replies={replies}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CommentList;
