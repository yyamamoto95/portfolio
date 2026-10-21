import Head from 'next/head';
import styles from '../styles/About.module.scss';
import Layout from '../components/Layout/Layout';
import ContentLayout from '../components/Layout/ContentLayout';

const content = [
    { title: '名前', description: '山本 祐大' },
    { title: '生年月日', description: '1995年11月12日' },
    { title: '出身地', description: '千葉県柏市' },
    { title: '趣味', description: '映画・音楽鑑賞' },
];
const About = () => {
    return (
        <>
            <Head>
                <title>About | Yudai Yamamoto</title>
                <meta name='description' content='概要です' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Layout>
                <ContentLayout title='About'>
                    <section className={styles.aboutSection}>
                        <dl className={styles.contentList}>
                            {content.map((item, index) => (
                                <div
                                    key={index}
                                    className={styles.contentWrapper}
                                >
                                    <dt className={styles.title}>
                                        {item.title}
                                    </dt>
                                    <dd className={styles.description}>
                                        {item.description}
                                    </dd>
                                </div>
                            ))}
                        </dl>
                        <div className={styles.profile}>
                            <p>
                                法政大学情報科学部 2019年卒業。
                                <br />
                                現在、SaaS製品の開発に携わっておりバックエンドとフロントエンド開発を担当しています。
                            </p>
                        </div>
                    </section>
                </ContentLayout>
            </Layout>
        </>
    );
};

export default About;
