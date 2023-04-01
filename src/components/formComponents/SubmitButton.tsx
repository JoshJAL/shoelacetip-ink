interface SubmitButtonProps {
  text: string;
  disabled?: boolean;
}

export default function SubmitButton({ text, disabled = false }: SubmitButtonProps) {
  return (
    <button disabled={disabled} type='submit' className='px-3 py-2 rounded-lg bg-lilac hover:bg-lilacHover'>
      {text}
    </button>
  );
}
