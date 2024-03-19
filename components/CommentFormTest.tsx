'use client';
import { addComment } from '@/app/actions/addComment';
import { CommentUser } from '@/database/types/types';
import { Session } from 'next-auth';
import { useRef, useState, useTransition } from 'react';
// import TextareaAutosize from 'react-textarea-autosize';
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
import { useController, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { CommentSchema, Inputs } from '@/schemas/CommentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Loader2 } from 'lucide-react';
import { AutosizeTextarea } from './ui/AutosizeTextarea';
import { toast, useToast } from './ui/use-toast';

interface Props {
  episodeId: number;
  session: Session;
  // setOptimisticComments: (comment: CommentUser) => void;
  parentId?: number;
  isReplying?: boolean;
  setIsReplying?: (isReplying: boolean) => void;
  showResponses?: boolean;
  setShowResponses?: (showResponses: boolean) => void;
}

const CommentFormTest = ({
  // setOptimisticComments,
  episodeId,
  session,
  parentId,
  isReplying,
  setIsReplying,
  showResponses,
  setShowResponses,
}: Props) => {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // const [_, startTransition] = useTransition();

  const onSubmit = async (data: Inputs) => {
    setIsSubmitting(true);
    if (setIsReplying && isReplying) {
      setIsReplying(false);
    }
    // startTransition(() => {
    //   setOptimisticComments({
    //     comment_id: Math.random(),
    //     comment_text: data.commentText,
    //     episode_id: data.episodeId,
    //     user_id: data.userId,
    //     name: session.user?.name!,
    //     image: session.user?.image!,
    //     create_date: new Date().toString(),
    //     update_date: new Date().toString(),
    //     spoiler: data.spoiler || false,
    //     parent_id: data.parentId || null,
    //   });
    // })
    if (setShowResponses && !showResponses) {
      setShowResponses(true);
    }

    try {
      await addComment(data);
      toast({
        title: 'Dodałeś nowy komentarz',
        // description: error.message,
      });
      form.reset();
      setIsSubmitting(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast({
          title: 'Ups, coś poszło nie tak...',
          description: error.message,
          variant: 'destructive',
        });
      }
      setIsSubmitting(false);
    }

    // const result = await addComment(data);
    // if (result?.error) {
    //   console.error(result.error);
    //   toast({
    //     title: 'Ups, coś poszło nie tak...',
    //     description: result.error,
    //     variant: 'destructive',
    //   });
    //   setIsSubmitting(false);
    // } else {
    //   form.reset();
    //   setIsSubmitting(false);
    // }
  };

  const commentText = form.watch('commentText');
  // const {
  //   field: { ref, ...field },
  // } = useController({
  //   name: 'commentText',
  //   control: form.control,
  //   defaultValue: '',
  // });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="commentText"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder={`${
                    parentId ? 'Dodaj odpowiedź...' : 'Dodaj komentarz...'
                  }`}
                  className="w-full rounded-xl resize-none p-3 focus-visible:ring-0 bg-secondary min-h-[112px]"
                  {...field}
                  maxLength={800}
                />

                {/* <AutosizeTextarea
                  placeholder={`${
                    parentId ? 'Dodaj odpowiedź...' : 'Dodaj komentarz...'
                  }`}
                  className="w-full rounded-xl resize-none p-3 focus-visible:ring-0 bg-secondary min-h-[112px]"
                  {...field}
                  minHeight={112}
                  // value={commentText}
                  // onChange={(e) => setCommentText(e.target.value)}
                  onInput={field.onChange}
                  maxLength={800}
                  ref={ref}
                /> */}
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
        <div className="flex flex-col items-center mt-2 gap-2 xs:flex-row justify-between">
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
                <FormLabel
                  htmlFor="spoiler"
                  className="text-base"
                  style={{ marginTop: 0 }}
                >
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
          <Button type="submit" variant={'outline'} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Dodawanie...
              </>
            ) : (
              'Dodaj'
            )}
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
