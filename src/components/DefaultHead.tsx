import Head from 'next/head';
import { useEffect, useState } from 'react';

interface DefaultHeadProps {
  title?: string;
  description?: string;
}

const defaultTitle = 'Shoelacetip Ink';
const defaultDescription = 'Get to know me and my work a little bit more, and if you like what you see, get in touch!';
const image = '../../public/images/siteImage.jpg';

export default function DefaultHead({ title = defaultTitle, description = defaultDescription }: DefaultHeadProps) {
  const [url, setUrl] = useState<string>('');
  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <Head>
      {/* Global Metadata */}
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width,initial-scale=1' />
      <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
      <link rel='manifest' href='/site.webmanifest' />
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
      <meta name='msapplication-TileColor' content='#00aba9' />
      <meta name='theme-color' content='#ffffff' />

      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      {/* Twitter */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={url} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={image} />
    </Head>
  );
}
