// 'use client';

// import { CommentEmoji } from '@/database/types/types';
// import { Toggle } from './ui/toggle';
// import Image from 'next/image';
// import { useEffect, useState } from 'react';
// import supabase from '@/database/dbConfig';
// import { useRouter } from 'next/navigation';
// import { useSession } from 'next-auth/react';

// interface Props {
//   commentEmojis: CommentEmoji[];
//   commentId: number;
// }

// const RealTimeEmojis = ({ commentEmojis, commentId }: Props) => {
//   const [selectedEmojis, setSelectedEmojis] = useState<number[]>([]);
//   const {data: session} = useSession();
//   const router = useRouter();
//   useEffect(() => {
//     const channel = supabase
//       .channel('realtime comment emojis')
//       .on('postgres_changes', {
//         event: '*',
//         schema: 'public',
//         table: 'comment_emoji',
//       }, () => {
//         router.refresh();
//       }).subscribe();
//       return () => {
//         supabase.removeChannel(channel)
//       }
//   }, [router]);

//   useEffect(() => {
//     const fetchSelectedEmojis = async () => {
//       const { data: selectedEmojis, error } = await supabase
//         .from('comment_emoji')
//         .select('emoji_id')
//         .eq('comment_id', commentId)
//         .eq('user_id', session?.user?.id!);
//       if (error) {
//         console.error('Error fetching selected emojis', error.message);
//       } else {
//         console.log(selectedEmojis);
//         setSelectedEmojis(
//           selectedEmojis
//             .map((e) => e.emoji_id)
//             .filter((id): id is number => id !== null)
//         );
//       }
//     };
//     fetchSelectedEmojis();
//   }, []);

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
//     } else {
//       setSelectedEmojis([...selectedEmojis, emojiId]);
//       await supabase.from('comment_emoji').insert([
//         {
//           comment_id: commentId,
//           emoji_id: emojiId,
//           user_id: session?.user?.id,
//         },
//       ]);
//     }
//   }
  
//   return (
//     <div>
//       {commentEmojis.map((commentEmoji) => (
//         <Toggle
//           key={commentEmoji.emoji_id}
//           onClick={() => toggleEmoji(commentEmoji.emoji_id)}
//           // className={`${selectedEmojiId === commentEmoji.emoji_id && ''}`}
//           aria-pressed={
//             selectedEmojis.includes(commentEmoji.emoji_id) ? true : false
//           }
//           data-state={`${
//             selectedEmojis.includes(commentEmoji.emoji_id) ? 'on' : 'off'
//           }`}
//         >
//           {commentEmoji.emoji_image_url ? (
//             <Image
//               src={commentEmoji.emoji_image_url}
//               alt={commentEmoji.emoji_description || ''}
//               width={30}
//               height={30}
//             />
//           ) : (
//             <span>{commentEmoji.emoji_character}</span>
//           )}
//         </Toggle>
//       ))}
//     </div>
//   );
// };

// export default RealTimeEmojis;
