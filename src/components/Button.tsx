interface ButtonProps {
  text: string;
  onClick?: () => void;
  danger?: boolean;
  type?: 'submit' | 'button';
  additionalClasses?: string;
}

export default function Button({ text, onClick, danger = false, type, additionalClasses }: ButtonProps) {
  return (
    <button
      type={type ? type : 'button'}
      className={
        danger
          ? `px-3 py-2 rounded-lg bg-red-400 hover:bg-red-600 transition-all ease-in-out duration-200 ${
              additionalClasses ? additionalClasses : ''
            }`
          : `px-3 py-2 rounded-lg bg-lilac hover:bg-lilacHover transition-all ease-in-out duration-200 ${
              additionalClasses ? additionalClasses : ''
            }`
      }
      onClick={onClick ? onClick : (e) => e.preventDefault()}
    >
      {text}
    </button>
  );
}
