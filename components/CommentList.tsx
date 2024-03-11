import { CommentUser } from "@/database/types/types"
import CommentTest from "./CommentTest";

interface Props {
  mainComments: CommentUser[];
  replies: CommentUser[];
  episodeId: number;
  setOptimisticComments: (comment: CommentUser) => void;
}

const CommentList = ({
  mainComments,
  replies,
  episodeId,
  setOptimisticComments,
}: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {mainComments.map((comment) => (
        <CommentTest
          key={comment.comment_id}
          comment={comment}
          episodeId={episodeId}
          setOptimisticComments={setOptimisticComments}
          replies={replies}
        />
      ))}
    </div>
  );
};

export default CommentList