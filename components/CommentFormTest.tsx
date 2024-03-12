'use client';
import { addComment } from '@/app/actions/addComment';
import { CommentUser } from '@/database/types/types';
import { Session } from 'next-auth';
import { useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CommentSchema, Inputs } from '@/schemas/CommentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { AutosizeTextarea } from './ui/AutosizeTextarea';

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

  const form = useForm<Inputs>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      commentText: '',
      spoiler: false,
      episodeId: episodeId,
      userId: session.user?.id,
      parentId: parentId,
    },
  });

  const onSubmit = async (data: Inputs) => {
    form.reset();
    setIsReplying && isReplying && setIsReplying(false);
    setOptimisticComments({
      comment_id: Math.random(),
      comment_text: data.commentText,
      episode_id: data.episodeId,
      user_id: data.userId,
      name: session.user?.name!,
      image: session.user?.image!,
      create_date: new Date().toString(),
      update_date: new Date().toString(),
      spoiler: data.spoiler || false,
      parent_id: data.parentId || null,
    });
    setShowResponses && !showResponses && setShowResponses(true);
    const result = await addComment(data);
    if (result?.error) {
      console.error(result.error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="commentText"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                {/* <Textarea
                  placeholder={`${
                    parentId ? 'Dodaj odpowiedź...' : 'Dodaj komentarz...'
                  }`}
                  className="w-full rounded-xl resize-none p-3 focus-visible:ring-0 bg-secondary min-h-[112px]"
                  {...field}
                /> */}
                <AutosizeTextarea
                  placeholder={`${
                    parentId ? 'Dodaj odpowiedź...' : 'Dodaj komentarz...'
                  }`}
                  className="w-full rounded-xl resize-none p-3 focus-visible:ring-0 bg-secondary min-h-[112px]"
                  {...field}
                  minHeight={112}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  maxLength={800}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="episodeId"
          render={() => (
            <FormItem>
              <FormControl>
                <Input type="hidden" name="episodeId" value={episodeId} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={() => (
            <FormItem>
              <FormControl>
                <Input type="hidden" name="userId" value={session.user?.id} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentId"
          render={() => (
            <FormItem>
              <FormControl>
                <Input type="hidden" name="parentId" value={parentId} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex-between mt-2">
          <FormField
            control={form.control}
            name="spoiler"
            render={({ field }) => (
              <FormItem className="flex items-center">
                <FormControl>
                  <Switch
                    id="spoiler"
                    name="spoiler"
                    className="mr-1 data-[state=checked]:bg-accent data-[state=unchecked]:bg-secondary"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel htmlFor="spoiler" className="text-base mt-0">
                  Spoiler
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <span className="font-bold">{commentText.length}</span>/
            <span>800</span>
          </div>
          <Button type="submit" variant={'outline'}>
            Dodaj
          </Button>
        </div>
      </form>
    </Form>

    // <form
    //   action={async (formData) => {
    //     const commentText = formData.get('commentText');
    //     const spoiler = !formData.get('spoiler') ? false : true;
    //     setIsReplying && isReplying && setIsReplying(false);
    //     setOptimisticComments({
    //       comment_id: Math.random(),
    //       comment_text: commentText as string,
    //       episode_id: episodeId,
    //       user_id: session.user?.id!,
    //       name: session.user?.name!,
    //       image: session.user?.image!,
    //       create_date: new Date().toString(),
    //       update_date: new Date().toString(),
    //       spoiler: spoiler,
    //       parent_id: parentId || null,
    //     });
    //     setShowResponses && !showResponses && setShowResponses(true);
    //     const result = await addComment(formData);
    //     if (result?.error) {
    //       console.error(result.error);
    //     }
    //   }}
    // >
    //   <TextareaAutosize
    //     maxLength={800}
    //     className="w-full rounded-lg resize-none p-2 outline-none bg-secondary overflow-hidden h-[112px]"
    //     minRows={4}
    //     placeholder={parentId ? 'Dodaj odpowiedź' : 'Dodaj komentarz'}
    //     name="commentText"
    //     aria-required
    //     value={commentText}
    //     onChange={(e) => setCommentText(e.target.value)}
    //   />
    //   <input type="hidden" name="episodeId" value={episodeId} />
    //   <input type="hidden" name="userId" value={session.user?.id} />
    //   <input type="hidden" name="parentId" value={parentId} />
    //   <div className="flex flex-col items-center gap-2 sm:flex-row flex-between mt-2">
    //     <div className="flex items-center">
    //       <Switch
    //         id="spoiler"
    //         name="spoiler"
    //         className="mr-1 data-[state=checked]:bg-accent data-[state=unchecked]:bg-secondary"
    //       />
    //       <Label htmlFor="spoiler">Spoiler</Label>
    //     </div>
    //     <div>
    //       <span className="font-bold">{commentText.length}</span>/800
    //     </div>
    //     <Button type='submit' variant={'outline'}>Dodaj</Button>
    //   </div>
    // </form>
  );
};

export default CommentFormTest;
