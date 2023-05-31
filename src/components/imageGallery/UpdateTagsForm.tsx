'use client';

import { Tag } from '@/types/tags';
import React, { useEffect, useState } from 'react';
import InputTextEmailPassword from '../formComponents/InputTextEmailPassword';
import Label from '../formComponents/Label';
import { updateTag1, updateTag2, updateTag3 } from '@/functions/tags';
import { Gallery } from '@/types/gallery';
import { updateGalleryTag } from '@/functions/gallery';

interface Props {
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
}

export default function UpdateTagsForm({ tags, setTags }: Props) {
  const [tag1, setTag1] = useState<string>('');
  const [tag2, setTag2] = useState<string>('');
  const [tag3, setTag3] = useState<string>('');
  const [ogTag1, setOgTag1] = useState<string>('');
  const [ogTag2, setOgTag2] = useState<string>('');
  const [ogTag3, setOgTag3] = useState<string>('');

  useEffect(() => {
    tags.map((tag) => {
      if (tag.id === 1) {
        setOgTag1(tag.tag_name);
        setTag1(tag.tag_name);
      }
      if (tag.id === 2) {
        setOgTag2(tag.tag_name);
        setTag2(tag.tag_name);
      }
      if (tag.id === 3) {
        setOgTag3(tag.tag_name);
        setTag3(tag.tag_name);
      }
    });
  }, [tags, setTag1, setTag2, setTag3]);

  const [submitting, setSubmitting] = useState<boolean>(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const newTag1 = await updateTag1(tag1);
    const newTag2 = await updateTag2(tag2);
    const newTag3 = await updateTag3(tag3);

    await updateGalleryTag(tag1, ogTag1);
    await updateGalleryTag(tag2, ogTag2);
    await updateGalleryTag(tag3, ogTag3);

    setOgTag1(tag1);
    setOgTag2(tag2);
    setOgTag3(tag3);

    setTags([newTag1[0], newTag2[0], newTag3[0]]);
  }

  return (
    <form
      className='flex flex-col'
      onSubmit={async (e) => {
        setSubmitting(true);
        await handleSubmit(e);
      }}
    >
      <Label htmlFor='tag1' text='Category Name 1:' />
      <InputTextEmailPassword name='tag1' onChange={(e) => setTag1(e.target.value)} value={tag1} />
      <Label htmlFor='tag2' text='Category Name 2:' />
      <InputTextEmailPassword name='tag2' onChange={(e) => setTag2(e.target.value)} value={tag2} />
      <Label htmlFor='tag3' text='Category Name 3:' />
      <InputTextEmailPassword name='tag3' onChange={(e) => setTag3(e.target.value)} value={tag3} />
      <div className='flex items-center justify-center w-full mt-5 text-lg'>
        <button
          type='submit'
          className='px-3 py-2 transition-all duration-200 ease-in-out rounded-lg bg-lilac hover:bg-lilacHover'
          onClick={() => {
            setSubmitting(true);
            setTimeout(() => {
              setSubmitting(false);
            }, 300);
          }}
        >
          {submitting ? 'Submitting...' : 'Update Category Names'}
        </button>
      </div>
    </form>
  );
}
