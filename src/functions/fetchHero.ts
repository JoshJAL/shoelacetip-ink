import { Hero } from '@/types/hero';
import supabase from '@/utils/supabase';
import { Dispatch, SetStateAction } from 'react';

export async function fetchHero(setHeroInformation: Dispatch<SetStateAction<Hero[]>>) {
  let { data, error } = await supabase.from('hero').select('*').eq('id', 1);
  setHeroInformation(data! as Hero[]);
}

export async function updateHero(bio: string, minimum_rate: string, hourly_rate: string, disclaimer: string) {
  bio = bio.trim();
  minimum_rate = minimum_rate.trim();
  hourly_rate = hourly_rate.trim();
  disclaimer = disclaimer.trim();
  const { error } = await supabase.from('hero').update({ bio, minimum_rate, hourly_rate, disclaimer }).eq('id', 1);

  if (error) {
    console.log(error);
  }
}
