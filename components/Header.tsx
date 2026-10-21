import GlobalNavi from "./GlobalNavi";
import Link from "next/link";
import styles from "./styles/Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={`${styles.header}`}>
      <div className={`${styles.headerWrapper} inner`}>
        <h1 className={styles.headerTitle}>
          <Link href="/" passHref  className="logoName">
            Yudai Yamamoto
          </Link>
        </h1>
        <GlobalNavi />
      </div>
    </header>
  );
};

export default Header;
