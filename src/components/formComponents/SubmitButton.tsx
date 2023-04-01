interface SubmitButtonProps {
  text: string;
  disabled?: boolean;
  type?: 'submit' | 'button';
}

export default function SubmitButton({ text, disabled = false, type = 'submit' }: SubmitButtonProps) {
  return (
    <button disabled={disabled} type={type} className='px-3 py-2 rounded-lg bg-lilac hover:bg-lilacHover'>
      {text}
    </button>
  );
}
