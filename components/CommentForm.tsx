'use client';
import { addComment } from '@/app/actions/addComment';
import { CommentSchema, Inputs } from '@/schemas/CommentSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { Session } from 'next-auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

interface Props {
  episodeId: number;
  session: Session;
  parentId?: number;
  isReplying?: boolean;
  setIsReplying?: (isReplying: boolean) => void;
  showResponses?: boolean;
  setShowResponses?: (showResponses: boolean) => void;
}

const CommentForm = ({
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

  const onSubmit = async (data: Inputs) => {
    setIsSubmitting(true);
    if (setIsReplying && isReplying) {
      setIsReplying(false);
    }
    if (setShowResponses && !showResponses) {
      setShowResponses(true);
    }

    try {
      await addComment(data);
      toast({
        title: 'Dodałeś nowy komentarz',
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
  };

  const commentText = form.watch('commentText');

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
  );
};

export default CommentForm;
