'use client';

import supabase from '@/database/dbConfig';
import { CommentUser } from '@/database/types/types';
import { timeAgo } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from './ui/skeleton';

interface Props {
  comments: CommentUser[];
}

const RealTimeComments = ({ comments }: Props) => {
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);
  const router = useRouter();
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
  return (
    <div className='flex flex-col gap-5'>
      {comments.map((comment) => (
        <div key={comment.comment_id} className="flex gap-3 overflow-hidden">
          <div className="relative w-[30px] h-[30px]  rounded-full overflow-hidden shrink-0">
            <Image
              src={comment.image}
              fill
              className="object-cover"
              alt={`${comment.name} avatar`}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex py-1 flex-wrap items-center">
              <div className="font-medium mr-2">{comment.name}</div>
              <div className="text-gray-400 text-sm">
                {rendered ? (
                  timeAgo(new Date(comment.update_date!))
                ) : (
                  <Skeleton className='h-3 w-20' />
                )}
              </div>
            </div>
            <div className=" break-all">{comment.comment_text}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RealTimeComments;
