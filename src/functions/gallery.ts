import { Gallery } from '@/types/gallery';
import supabase from '@/utils/supabase';

export const fetchGallery = async (setCurrentGalleryArray: React.Dispatch<React.SetStateAction<Gallery[]>>) => {
  let { data: gallery } = await supabase.from('gallery').select('*');
  setCurrentGalleryArray(gallery as Gallery[]);
};

export const deleteGalleryItem = async (id: number) => {
  let { data, error } = await supabase.from('gallery').delete().eq('id', id).select('*');
  if (error) console.log(error);
  return data as Gallery[];
};
