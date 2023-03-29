export type Testimonial = {
  id: number;
  created_at: string;
  text: string;
  first_name: string | null;
  last_name: string | null;
  affiliation: string;
  image: string;
};
