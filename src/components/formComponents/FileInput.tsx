interface FileInputProps {
  multiple?: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.RefObject<HTMLInputElement>;
}

export default function FileInput({ multiple, name, onChange, ref }: FileInputProps) {
  return (
    <input
      type={'file'}
      multiple={multiple ? true : false}
      name={name}
      id={name}
      onChange={(e) => onChange(e)}
      ref={ref}
      className='file:bg-lilac file:border-none file:px-2 file:py-2 file:rounded-lg file:hover file:hover:bg-lilacHover file:transition-all file:duration-200 file:ease-in-out file:cursor-pointer'
    />
  );
}
