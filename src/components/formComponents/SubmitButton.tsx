interface SubmitButtonProps {
  text: string;
}

export default function SubmitButton({ text }: SubmitButtonProps) {
  return (
    <button type='submit' className='px-3 py-2 rounded-lg bg-lilac hover:bg-lilacHover'>
      {text}
    </button>
  );
}
