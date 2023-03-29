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

export async function updateHero(bio: string, minimum_rate: string, hourly_rate: string, disclaimer: string) {
  const { error } = await supabase.from('hero').update({ bio, minimum_rate, hourly_rate, disclaimer }).eq('id', 1);

  if (error) {
    console.log(error);
  }
}
