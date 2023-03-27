interface ContentProps {
  children: React.ReactNode;
}

export default function Content({ children }: ContentProps) {
  return <article className={`px-8 mx-auto max-w-3xl`}>{children}</article>;
}
