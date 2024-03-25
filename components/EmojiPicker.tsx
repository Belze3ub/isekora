// 'use client'
// import supabase from '@/database/dbConfig';
// import { CommentEmoji, CommentUser, Emoji } from '@/database/types/types';
// import { useSession } from 'next-auth/react';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import { Toggle } from './ui/toggle';
// import { useRouter } from 'next/navigation';

// interface Props {
//   commentId: number;
// }

// const EmojiPicker = ({ commentId }: Props) => {
//   const [emojis, setEmojis] = useState<Emoji[]>([]);
//   const [selectedEmojis, setSelectedEmojis] = useState<(number) []>([]);
//   const {data: session} = useSession();
//   const router = useRouter();
//   useEffect(() => {
//     fetchEmojis();
//     fetchSelectedEmojis();
//   }, []);

//   const fetchEmojis = async () => {
//     const { data: emojis, error } = await supabase.from('emoji').select('*');
//     if (error) {
//       console.error('Error fetching emojis from emoji table', error.message);
//     } else {
//       setEmojis(emojis);
//     }
//   };

//   const fetchSelectedEmojis = async () => {
//     const { data: selectedEmojis, error } = await supabase
//       .from('comment_emoji')
//       .select('emoji_id')
//       .eq('comment_id', commentId)
//       .eq('user_id', session?.user?.id!);
//     if (error) {
//       console.error('Error fetching selected emojis', error.message);
//     } else {
//       console.log(selectedEmojis)
//       setSelectedEmojis(
//         selectedEmojis
//           .map((e) => e.emoji_id)
//           .filter((id): id is number => id !== null)
//       );
//     }
//   };

//   async function toggleEmoji(emojiId: number) {
//     const isSelected = selectedEmojis.includes(emojiId);
//     if (isSelected) {
//       setSelectedEmojis(selectedEmojis.filter((id) => id !== emojiId));
//       await supabase
//         .from('comment_emoji')
//         .delete()
//         .eq('emoji_id', emojiId)
//         .eq('comment_id', commentId)
//         .eq('user_id', session?.user?.id!);
//       router.refresh();
//     } else {
//       setSelectedEmojis([...selectedEmojis, emojiId]);
//       await supabase
//         .from('comment_emoji')
//         .insert([
//           {
//             comment_id: commentId,
//             emoji_id: emojiId,
//             user_id: session?.user?.id,
//           },
//         ]);
//         router.refresh();
//     }
//   }
  
//   return (
//     <div className="grid grid-cols-3 gap-2">
//       {emojis.map((emoji) => (
//         <Toggle
//           key={emoji.emoji_id}
//           onClick={() => toggleEmoji(emoji.emoji_id)}
//           aria-pressed={selectedEmojis.includes(emoji.emoji_id) ? true : false}
//           data-state={`${
//             selectedEmojis.includes(emoji.emoji_id) ? 'on' : 'off'
//           }`}
//         >
//           {emoji.emoji_image_url ? (
//             <Image
//               src={emoji.emoji_image_url}
//               alt={emoji.emoji_description || ''}
//               width={20}
//               height={20}
//             />
//           ) : (
//             <span>{emoji.emoji_character}</span>
//           )}
//         </Toggle>
//       ))}
//     </div>
//   );
// };

// export default EmojiPicker;
