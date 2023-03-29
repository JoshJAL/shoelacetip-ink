interface Props {
  type?: 'text' | 'email' | 'password';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputTextEmailPassword({ type = 'text', name, value, onChange }: Props) {
  return (
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={(e) => onChange(e)}
      className='p-2 text-lg border-2 rounded-lg outline-none border-lilac'
    />
  );
}
