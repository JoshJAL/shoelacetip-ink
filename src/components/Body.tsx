interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  return <div className='flex flex-col min-h-screen bg-lightOlive'>{children}</div>;
}
