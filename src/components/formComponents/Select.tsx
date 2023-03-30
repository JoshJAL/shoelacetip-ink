interface Props {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; text: string }[];
}

export default function Select({ name, value, onChange, options }: Props) {
  return (
    <select
      name={name}
      id={name}
      className='p-2 text-lg border-2 rounded-lg outline-none cursor-pointer border-lilac'
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <option disabled={option.value === '' ? true : false} value={option.value} key={index}>
          {option.text}
        </option>
      ))}
    </select>
  );
}
