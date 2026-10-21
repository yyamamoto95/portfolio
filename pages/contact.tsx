import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout/Layout';
import ContentLayout from '../components/Layout/ContentLayout';
import LinkLayout from '../components/Layout/LinkLayout';
import styles from '../styles/Contact.module.scss';
import React from 'react';
import emailIcon from '../public/images/email-icon01.png'

const links = [
  {
    name: 'GitHub',
    url: 'https://github.com/YUDAI1995',
    img: '/images/github-icon01.png',
  },
  {
    name: 'Wantedly',
    url: 'https://www.wantedly.com/id/yyam1103',
    img: '/images/wantdly-icon01.png',
  },
];
const email = 'y.yama991103@gmail.com';
const Contact = () => {
  const [copyed, setCopyed] = React.useState(false);
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(email).then(
      () => {
        setTimeout(() => {
          setCopyed(false);
        }, 500);
      },
      (err) => {
        console.error('[Error] Could not copy text: ', err);
      }
    );
  };

  const isClickEmail = (e) => {
    if (e.target.innerHTML === email) {
      setCopyed(true);
    } else {
      setCopyed(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Contact | Yudai Yamamoto</title>
        <meta name='description' content='連絡先について掲載しております' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ContentLayout title='Contact'>
        <div className={styles.contentWrapper} onClick={isClickEmail}>
          <div className='email'>
            <p className={styles.text}>ご連絡はEmailよりお願いいたします。</p>
            <div className={styles.emailWrapper}>
              <span className={styles.emailIcon}>
                <Image
                  src={emailIcon}
                  className={styles.icon}
                  alt='E-mail'
                  width={64}
                  height={48}
                />
              </span>
              <p
                className={`${styles.emailAddress} emailAddress`}
                onClick={copyEmailToClipboard}
              >
                {email}
              </p>
              <p className={styles.clipBoard}>
                <span
                  className={styles.copy}
                  style={{ display: copyed ? 'none' : 'block' }}
                >
                  Copy
                </span>
                <span style={{ display: copyed ? 'block' : 'none' }}>
                  Copyed!
                </span>
              </p>
              <style jsx>{`
                .copyed .emailAddress {
                  color: #ffffff;
                  background-color: #00a885;
                }
              `}</style>
            </div>
          </div>
          <section id='test' className={styles.linkSection}>
            <h3 className={styles.subTitle}>Link</h3>
            <ul className={styles.linkList}>
              {links.map((link, index) => (
                <li className={`${styles.list} arrowIcon`} key={index}>
                  <LinkLayout
                    url={link.url}
                    name={link.name}
                    imgSrc={link.img}
                    imgWidth={64}
                    imgHeight={64}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </ContentLayout>
    </Layout>
  );
};

export default Contact;
