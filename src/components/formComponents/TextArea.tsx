interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  cols?: number;
  required?: boolean;
}

export default function TextArea({ name, value, onChange, rows = 6, required = false }: Props) {
  return (
    <textarea
      name={name}
      id={name}
      value={value}
      required={required}
      onChange={(e) => onChange(e)}
      rows={rows}
      className='block w-full p-2 text-lg border-2 rounded-lg outline-none border-lilac'
    />
  );
}
