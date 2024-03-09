'use client'
import supabase from '@/database/dbConfig';
import { CommentUser, Emoji } from '@/database/types/types';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { Toggle } from './ui/toggle';

interface Props {
  emojis: Emoji[];
  comment: CommentUser;
}

const EmojiPicker = ({emojis, comment}: Props) => {
  const {data: session} = useSession();
  const [selectedEmoji, setSelectedEmoji] = useState<number>();

  const handleEmojiSelect = async (emoji: Emoji) => {
    if (selectedEmoji === emoji.emoji_id) {
      const { error } = await supabase
        .from('comment_emoji')
        .delete()
        .eq('user_id', session?.user?.id!)
        .eq('comment_id', comment.id)
        .eq('emoji_id', emoji.emoji_id);

      if (error) {
        console.error(
          'Error deleting emoji from comment_emoji table',
          error.message
        );
      } else {
        setSelectedEmoji(undefined); // Reset the selected emoji
      }
    } else {
      const { data, error } = await supabase.from('comment_emoji').insert([
        {
          user_id: session?.user?.id,
          comment_id: comment.comment_id,
          emoji_id: emoji.emoji_id,
        },
      ]);

      if (error) {
        console.error(
          'Error inserting emoji to comment_emoji table',
          error.message
        );
      } else {
        setSelectedEmoji(emoji.emoji_id); // Set the selected emoji
      }
    }
  }
  
  return (
    <div className="grid grid-cols-3 gap-2">
      {emojis.map((emoji) => (
        <Toggle
          key={emoji.emoji_id}
          onClick={() => handleEmojiSelect(emoji)}
          className={`${selectedEmoji === emoji.emoji_id && ''}`}
          aria-pressed={selectedEmoji === emoji.emoji_id ? true : false}
          data-state={`${selectedEmoji === emoji.emoji_id ? 'on' : 'off'}`}
        >
          {emoji.emoji_image_url ? (
            <Image
              src={emoji.emoji_image_url}
              alt={emoji.emoji_description || ''}
              width={30}
              height={30}
            />
          ) : (
            <span>{emoji.emoji_character}</span>
          )}
        </Toggle>
      ))}
    </div>
  );
};

export default EmojiPicker;
