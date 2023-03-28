interface ContentProps {
  children: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return <article className={`px-5 mx-auto max-w-6xl text-zinc-900`}>{children}</article>;
}
