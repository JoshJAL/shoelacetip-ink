import { Artist } from '@/types/artist';
import supabase from '@/utils/supabase';

export async function getArtistPageData(setArtistInformation: React.Dispatch<React.SetStateAction<Artist[]>>) {
  let { data: artist } = await supabase.from('artist').select('*');
  setArtistInformation(artist! as Artist[]);
}

export async function updateArtistPageData(bio: string, headshot?: string) {
  bio = bio.trim();
  headshot = headshot?.trim();
  if (headshot) {
    const { data, error } = await supabase.from('artist').update({ bio, headshot }).eq('id', 1);
  }
  const { data, error } = await supabase.from('artist').update({ bio }).eq('id', 1);
}
