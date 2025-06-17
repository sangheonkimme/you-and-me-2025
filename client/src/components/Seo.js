import Head from 'next/head';

export default function Seo() {
  return (
    <Head>
      <meta name='description' content='RealTime Chatting Room' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta property='og:type' content='website' />
      <meta property='og:url' content='https://you-and-me-seven.vercel.app/' />
      <meta property='og:title' content='RealTime Chat' />
      <meta
        property='og:image'
        content='https://user-images.githubusercontent.com/117249829/227150001-44959fc5-dab4-445d-afd1-d59f854f16a2.png'
      />
      <meta property='og:description' content='RealTime Chatting Room' />
      <meta property='og:site_name' content='RealTime-Chat' />
      <meta property='og:locale' content='ko_KR' />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='630' />

      <link rel='icon' href='/favicon.ico' />
      <title>RealTime-Chat</title>
    </Head>
  );
}
