import { Gallery } from '@/types/gallery';
import supabase from '@/utils/supabase';

export const fetchGallery = async (setCurrentGalleryArray: React.Dispatch<React.SetStateAction<Gallery[]>>) => {
  let { data: gallery } = await supabase.from('gallery').select('*');
  if (!gallery) return;
  gallery = gallery?.sort((a, b) => a.id - b.id);
  setCurrentGalleryArray(gallery as Gallery[]);
};

export const deleteGalleryItem = async (id: number) => {
  let { data, error } = await supabase.from('gallery').delete().eq('id', id).select('*');
  if (error) console.error(error);
  if (!data) return;
  data = data?.sort((a, b) => a.id - b.id);
  return data as Gallery[];
};

export async function updateGalleryTag(newTag: string, ogTag: string) {
  const { data, error } = await supabase.from('gallery').update({ tag: newTag }).eq('tag', ogTag).select('*');

  if (error) console.error(error);

  return data as Gallery[];
}
