interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return <div>{children}</div>;
}
