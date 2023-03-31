import { Hero } from '@/types/hero';
import supabase from '@/utils/supabase';
import { Dispatch, SetStateAction } from 'react';

export async function fetchHero(setHeroInformation: Dispatch<SetStateAction<Hero[]>>) {
  let { data } = await supabase.from('hero').select('*').eq('id', 1);
  setHeroInformation(data! as Hero[]);
}

export async function updateHero(bio: string, disclaimer: string) {
  bio = bio.trim();
  disclaimer = disclaimer.trim();
  const { error } = await supabase.from('hero').update({ bio, disclaimer }).eq('id', 1);

  if (error) {
    console.log(error);
  }
}
