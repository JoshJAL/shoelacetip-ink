import supabase from '@/utils/supabase';
import { Hero } from '@/types/hero';
import { Dispatch } from 'react';
import { SetStateAction } from 'react';

export async function fetchHero(setHeroInformation: Dispatch<SetStateAction<Hero>>) {
  const { data, error } = await supabase.from('hero').select('*');
  if (error) {
    console.log(error);
  } else {
    if (!data) return;
    setHeroInformation(data[0] as unknown as Hero);
  }
}
