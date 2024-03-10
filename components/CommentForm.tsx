'use client';
import { Button } from './ui/button';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import supabase from '@/database/dbConfig';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { z } from 'zod';
import TextareaAutosize from 'react-textarea-autosize';
import { useRouter } from 'next/navigation';

const commentSchema = z.object({
  commentText: z
    .string()
    .min(1, 'Komentarz nie może być pusty')
    .max(800, 'Komentarz nie może mieć więcej niż 800 znaków'),
});

interface Props {
  episodeId: number;
  parentId?: number;
  setIsReplying?: (isReplying: Boolean) => void;
  setShowResponses?: (showResponse: Boolean) => void;
}

const CommentForm = ({
  episodeId,
  parentId,
  setIsReplying,
  setShowResponses,
}: Props) => {
  const router = useRouter();
  const [commentText, setCommentText] = useState('');
  const [spoiler, setSpoiler] = useState(false);
  const [error, setError] = useState('');
  const { data: session } = useSession();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // console.log(spoiler)
    const result = commentSchema.safeParse({ commentText });
    if (!result.success) {
      setError(result.error.errors[0].message);
      console.error(result.error);
      return;
    }
    const { data, error } = await supabase.from('comment').insert([
      {
        episode_id: episodeId,
        user_id: session?.user?.id,
        comment_text: commentText,
        spoiler: spoiler,
        parent_id: parentId,
      },
    ]);
    if (error) {
      console.error(error);
      setError(error.message);
    } else {
      setCommentText('');
      setSpoiler(false);
      setError('');
      setIsReplying && setIsReplying(false);
      setShowResponses && setShowResponses(true);
      router.refresh();
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextareaAutosize
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        maxLength={800}
        className="w-full rounded-lg resize-none p-2 outline-none bg-secondary overflow-hidden h-[112px]"
        minRows={4}
        placeholder={parentId ? 'Dodaj odpowiedź' : 'Dodaj komentarz'}
      />
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex flex-col items-center gap-2 sm:flex-row flex-between mt-2">
        <div className="flex items-center">
          <Switch
            id="spoiler"
            className="mr-1 data-[state=checked]:bg-accent data-[state=unchecked]:bg-secondary"
            checked={spoiler}
            onCheckedChange={setSpoiler}
          />
          <Label htmlFor="spoiler">Spoiler</Label>
        </div>
        <div>
          <span className="font-bold">{commentText.length}</span>/800
        </div>
        <Button type="submit" className="bg-accent">
          Dodaj
        </Button>
      </div>
    </form>
  );
};

export default CommentForm;
