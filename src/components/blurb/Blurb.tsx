interface Props {
  children: React.ReactNode;
  additionalClasses?: string;
}

export default function Blurb({ children, additionalClasses }: Props) {
  return (
    <section
      className={`py-4 my-4 text-xl font-semibold text-center rounded-lg px-7 bg-lightOlive text-zinc-900 ${
        additionalClasses ? additionalClasses : ''
      }`}
    >
      {children}
    </section>
  );
}
