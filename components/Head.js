import Head from 'next/head'

export default ({ title, description }) =>
  <Head>
    <meta charset='utf-8' />
    <title>{title}</title>
    <meta name='description' content={description} />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <link rel='shortcut icon' href='/static/favicon.ico' />

  </Head>
