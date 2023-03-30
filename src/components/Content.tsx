interface ContentProps {
  children: React.ReactNode;
  additionalClasses?: string;
}

export default function Content({ children, additionalClasses }: ContentProps) {
  return (
    <article className={`px-5 mx-auto max-w-6xl text-zinc-900 ${additionalClasses ? additionalClasses : ''}`}>
      {children}
    </article>
  );
}
