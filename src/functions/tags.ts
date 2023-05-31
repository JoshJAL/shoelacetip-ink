import { Tag } from '@/types/tags';
import supabase from '@/utils/supabase';

export async function getTags() {
  const { data, error } = await supabase.from('tags').select('*');
  if (error) console.error(error);
  return data as Tag[];
}

export async function updateTag1(newTagName: string) {
  const { data, error } = await supabase.from('tags').update({ tag_name: newTagName }).eq('id', 1).select('*');

  if (error) console.error(error);

  return data as Tag[];
}

export async function updateTag2(newTagName: string) {
  const { data, error } = await supabase.from('tags').update({ tag_name: newTagName }).eq('id', 2).select('*');

  if (error) console.error(error);

  return data as Tag[];
}

export async function updateTag3(newTagName: string) {
  const { data, error } = await supabase.from('tags').update({ tag_name: newTagName }).eq('id', 3).select('*');

  if (error) console.error(error);

  return data as Tag[];
}
