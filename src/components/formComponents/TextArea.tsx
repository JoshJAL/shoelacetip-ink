interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  cols?: number;
}

export default function TextArea({ name, value, onChange, rows = 6, cols = 75 }: Props) {
  return (
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={(e) => onChange(e)}
      rows={rows}
      cols={cols}
      className='p-2 text-lg border-2 rounded-lg outline-none border-lilac'
    />
  );
}
