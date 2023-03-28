interface WormIconProps {
  fill?: string;
}

export default function WormIcon({ fill = 'currentColor' }: WormIconProps) {
  return (
    // Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 512 512'
      fill={fill}
      className='w-5 inline-block transition-transform group-hover:rotate-[20deg]'
    >
      <path d='M256 96c0-53 43-96 96-96h38.4C439.9 0 480 40.1 480 89.6V176v16V376c0 75.1-60.9 136-136 136s-136-60.9-136-136V296c0-22.1-17.9-40-40-40s-40 17.9-40 40V464c0 26.5-21.5 48-48 48s-48-21.5-48-48V296c0-75.1 60.9-136 136-136s136 60.9 136 136v80c0 22.1 17.9 40 40 40s40-17.9 40-40V192H352c-53 0-96-43-96-96zm144-8a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z' />
    </svg>
  );
}
