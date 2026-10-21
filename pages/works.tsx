import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import WorkList from '../components/WorkList';

const Works = () => {
  return (
    <Layout>
      <Head>
        <title>Works | Yudai Yamamoto</title>
        <meta name='description' content='制作物を掲載しております' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <WorkList />
    </Layout>
  );
};

export default Works;
