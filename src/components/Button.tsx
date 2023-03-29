interface ButtonProps {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: ButtonProps) {
  return (
    <button
      type='submit'
      className='px-3 py-2 rounded-lg bg-lilac hover:bg-lilacHover'
      onClick={onClick ? onClick : (e) => e.preventDefault()}
    >
      {text}
    </button>
  );
}
