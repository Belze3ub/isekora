import Image from 'next/image';
import { Button } from './ui/button';
import { Emoji } from '@/database/types/types';

const EmojiPicker = ({ emojis }: { emojis: Emoji[] }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {emojis.map((emoji) => (
        <Button key={emoji.emoji_id} variant="ghost">
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
        </Button>
      ))}
    </div>
  );
};

export default EmojiPicker;
