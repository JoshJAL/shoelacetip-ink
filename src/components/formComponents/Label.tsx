interface LabelProps {
  text: string;
  htmlFor: string;
}

export default function Label({ text, htmlFor }: LabelProps) {
  return <label className='py-4 text-xl font-semibold' htmlFor={htmlFor}>{text}</label>;
}
