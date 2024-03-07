'use client';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import supabase from '@/database/dbConfig';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import {z} from 'zod';

const commentSchema = z.object({
  commentText: z.string().min(1, 'Komentarz nie może być pusty').max(800, 'Komentarz nie może mieć więcej niż 800 znaków')
})

const CommentForm = ({ episodeId }: { episodeId: number }) => {
  const [commentText, setCommentText] = useState('');
  const { data: session } = useSession();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = commentSchema.safeParse({commentText})
    if (!result.success) {
      console.error(result.error)
      return;
    }
    const { data, error } = await supabase.from('comment').insert([
      {
        episode_id: episodeId,
        user_id: session?.user?.id,
        comment_text: commentText,
      },
    ]);
    if (error) {
      console.error(error);
    } else {
      setCommentText('');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <div className="flex-between mt-2">
        <div className="flex items-center">
          <Switch
            id="spoiler"
            className="mr-1 data-[state=checked]:bg-accent data-[state=unchecked]:bg-secondary"
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
