'use client';
import { addComment } from '@/app/actions/addComment';
import { CommentUser } from '@/database/types/types';
import { Session } from 'next-auth';
import { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';

interface Props {
  episodeId: number;
  session: Session;
  setOptimisticComments: (comment: CommentUser) => void;
  parentId?: number;
  isReplying?: boolean;
  setIsReplying?: (isReplying: boolean) => void;
  showResponses?: boolean;
  setShowResponses?: (showResponses: boolean) => void;
}

const CommentFormTest = ({
  setOptimisticComments,
  episodeId,
  session,
  parentId,
  isReplying,
  setIsReplying,
  showResponses,
  setShowResponses,
}: Props) => {
  const [commentText, setCommentText] = useState('');

  return (
    <form
      action={async (formData) => {
        const commentText = formData.get('commentText');
        const spoiler = !formData.get('spoiler') ? false : true;
        setIsReplying && isReplying && setIsReplying(false);
        setOptimisticComments({
          comment_id: Math.random(),
          comment_text: commentText as string,
          episode_id: episodeId,
          user_id: session.user?.id!,
          name: session.user?.name!,
          image: session.user?.image!,
          create_date: new Date().toString(),
          update_date: new Date().toString(),
          spoiler: spoiler,
          parent_id: parentId || null,
        });
        setShowResponses && !showResponses && setShowResponses(true);
        const result = await addComment(formData);
        if (result?.error) {
          console.error(result.error);
        }
      }}
    >
      <TextareaAutosize
        maxLength={800}
        className="w-full rounded-lg resize-none p-2 outline-none bg-secondary overflow-hidden h-[112px]"
        minRows={4}
        placeholder={parentId ? 'Dodaj odpowiedź' : 'Dodaj komentarz'}
        name="commentText"
        aria-required
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <input type="hidden" name="episodeId" value={episodeId} />
      <input type="hidden" name="userId" value={session.user?.id} />
      <input type="hidden" name="parentId" value={parentId} />
      <div className="flex flex-col items-center gap-2 sm:flex-row flex-between mt-2">
        <div className="flex items-center">
          <Switch
            id="spoiler"
            name="spoiler"
            className="mr-1 data-[state=checked]:bg-accent data-[state=unchecked]:bg-secondary"
          />
          <Label htmlFor="spoiler">Spoiler</Label>
        </div>
        <div>
          <span className="font-bold">{commentText.length}</span>/800
        </div>
        <Button type='submit' variant={'outline'}>Dodaj</Button>
      </div>
    </form>
  );
};

export default CommentFormTest;
