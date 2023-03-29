import supabase from '@/utils/supabase';

export async function fetchCurrentImages(setCurrentImages: (value: React.SetStateAction<string[]>) => void) {
  let { data: carousel, error } = await supabase.from('carousel').select('*');
  if (error) {
    console.log(error);
  } else {
    if (!carousel) carousel = [];
    setCurrentImages(carousel[0].slides);
  }
}
