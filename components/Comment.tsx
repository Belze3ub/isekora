'use client';
import supabase from '@/database/dbConfig';
import { CommentEmoji, CommentUser } from '@/database/types/types';
import { timeAgo } from '@/lib/utils';
import { Session } from 'next-auth';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import CommentForm from './CommentForm';
import EmojiPicker from './EmojiPicker';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Toggle } from './ui/toggle';

interface Props {
  comment: CommentUser;
  replies?: CommentUser[];
  session: Session | null;
}

const Comment = ({ comment, replies, session }: Props) => {
  const [isReplying, setIsReplying] = useState<Boolean>(false);
  const [showResponses, setShowResponses] = useState<Boolean>(false);
  const [selectedEmojis, setSelectedEmojis] = useState<number[]>([]);
  const [commentEmojis, setCommentEmojis] = useState<CommentEmoji[]>([]);
  const router = useRouter();
  const responses = replies?.filter(
    (reply) => reply.parent_id === comment.comment_id
  );

  useEffect(() => {
    const fetchSelectedEmojis = async () => {
      const { data: selectedEmojis, error } = await supabase
        .from('comment_emoji')
        .select('emoji_id')
        .eq('comment_id', comment.comment_id)
        .eq('user_id', session?.user?.id!);
      if (error) {
        console.error('Error fetching selected emojis', error.message);
      } else {
        setSelectedEmojis(
          selectedEmojis
            .map((e) => e.emoji_id)
            .filter((id): id is number => id !== null)
        );
      }
    };
    fetchSelectedEmojis();
  }, [comment, session]);

  useEffect(() => {
    const channel = supabase
      .channel('realtime comment_emoji')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comment_emoji',
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  useEffect(() => {
    const fetchEmojis = async () => {
      const { data, error } = await supabase.rpc('fetch_emojis_for_comment', {
        com_id: comment.comment_id,
      });
      if (error) {
        console.error(error);
      } else {
        setCommentEmojis(data);
      }
    };
    fetchEmojis();
  }, [comment]);

  useEffect(() => {
    const channel = supabase
      .channel('realtime comments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'comment',
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  async function toggleEmoji(emojiId: number) {
    const isSelected = selectedEmojis.includes(emojiId);
    if (isSelected) {
      setSelectedEmojis(selectedEmojis.filter((id) => id !== emojiId));
      await supabase
        .from('comment_emoji')
        .delete()
        .eq('emoji_id', emojiId)
        .eq('comment_id', comment.comment_id)
        .eq('user_id', session?.user?.id!);
      router.refresh();
    } else {
      setSelectedEmojis([...selectedEmojis, emojiId]);
      await supabase.from('comment_emoji').insert([
        {
          comment_id: comment.comment_id,
          emoji_id: emojiId,
          user_id: session?.user?.id,
        },
      ]);
      router.refresh();
    }
  }

  return (
    <div key={comment.comment_id} className="flex gap-3 overflow-hidden">
      <div className="relative w-[30px] h-[30px]  rounded-full overflow-hidden shrink-0">
        <Image
          src={comment.image}
          fill
          className="object-cover"
          alt={`${comment.name} avatar`}
        />
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <div className="flex py-1 flex-wrap items-center">
          <div className="font-medium mr-2">{comment.name}</div>
          <div className="text-gray-400 text-sm">
            {timeAgo(new Date(comment.create_date!))}
          </div>
        </div>
        <div
          className={`break-all ${
            comment.spoiler &&
            'blur-sm hover:blur-none transition-all duration-300'
          }`}
        >
          {comment.comment_text}
        </div>
        <div>
          <div className="flex items-center gap-2">
            {commentEmojis.map((commentEmoji) => (
              <Toggle
                key={commentEmoji.emoji_id}
                onClick={() => toggleEmoji(commentEmoji.emoji_id)}
                aria-pressed={
                  selectedEmojis.includes(commentEmoji.emoji_id) ? true : false
                }
                data-state={`${
                  selectedEmojis.includes(commentEmoji.emoji_id) ? 'on' : 'off'
                }`}
              >
                {commentEmoji.emoji_image_url ? (
                  <>
                    <Image
                      src={commentEmoji.emoji_image_url}
                      alt={commentEmoji.emoji_description || ''}
                      width={20}
                      height={20}
                    />
                    <span className="ml-1">{commentEmoji.count}</span>
                  </>
                ) : (
                  <span>{commentEmoji.emoji_character}</span>
                )}
              </Toggle>
            ))}
            <Popover>
              <PopoverTrigger>
                <FaPlus />
              </PopoverTrigger>
              <PopoverContent className="p-1">
                <EmojiPicker commentId={comment.comment_id} />
              </PopoverContent>
            </Popover>
            {!comment.parent_id && session?.user?.id && (
              <Button
                variant="ghost"
                className="rounded-lg p-0"
                onClick={() => setIsReplying(!isReplying)}
              >
                Odpowiedz
              </Button>
            )}
          </div>
          {isReplying && (
            <div className="mt-5">
              <CommentForm
                episodeId={comment.episode_id!}
                parentId={comment.comment_id}
                setIsReplying={setIsReplying}
                setShowResponses={setShowResponses}
              />
            </div>
          )}
          <div>
            {responses?.length !== 0 && replies && (
              <Button
                variant="default"
                className="rounded-full text-accent p-0 hover:bg-transparent"
                onClick={() => setShowResponses(!showResponses)}
              >
                {showResponses ? (
                  <IoIosArrowUp size={20} />
                ) : (
                  <IoIosArrowDown size={20} />
                )}
                <span className="ml-1">{`${responses?.length} odpowiedzi`}</span>
              </Button>
            )}
            {showResponses && (
              <div className="mt-5">
                {responses?.map((reply) => (
                  <Comment
                    key={reply.comment_id}
                    comment={reply}
                    session={session}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
