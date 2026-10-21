import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./styles/GlobalNavi.module.scss";

const navList = [
  {
    id: 0,
    enName: "Home",
    path: "",
  },
  {
    id: 1,
    enName: "About",
    path: "about",
  },
  {
    id: 2,
    enName: "Works",
    path: "works",
  },
  {
    id: 3,
    enName: "Contact",
    path: "contact",
  },
];

const GlobalNavi: React.FC = () => {
  const router = useRouter();

  // 有効なナビ項目は state にせず、現在のパスの第1セグメントから描画のたびに導出する。
  // 該当なし（404 など）の場合は -1 となり、どの項目も有効にならない。
  const currentPath = router.pathname.split("/")[1];
  const activeNav = navList.findIndex(({ path }) => path === currentPath);

  return (
    <>
      <ul className={styles.grobalnavList}>
        {navList.map((navi) => (
          <li
            key={navi.id}
            className={
              activeNav === navi.id
                ? `${styles.navListItem} isActive`
                : styles.navListItem
            }
          >
            <Link href={`/${navi.path}`}>{navi.enName}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GlobalNavi;
