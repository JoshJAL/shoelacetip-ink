interface Props {
  children: React.ReactNode;
}

export default function Blurb({ children }: Props) {
  return (
    <section className='py-4 my-4 text-xl font-semibold text-center rounded-lg px-7 bg-lightOlive text-zinc-900'>
      {children}
    </section>
  );
}
