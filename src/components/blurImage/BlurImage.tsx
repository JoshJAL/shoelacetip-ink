import { useState } from 'react';

interface Props {
  alt: string;
  imageSource: string;
  additionalClassNames?: string;
}

export default function BlurImage({ alt, imageSource, additionalClassNames }: Props) {
  const [loading, setLoading] = useState(true);

  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <img
      alt={alt}
      src={imageSource}
      className={cn(
        `${additionalClassNames ? additionalClassNames : ''} duration-700 ease-in-out object-contain`,
        loading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'
      )}
      onLoad={() => setLoading(false)}
    />
  );
}
