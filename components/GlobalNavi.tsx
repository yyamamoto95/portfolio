import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
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
  const [activeNav, setActiveNav] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const currentPath = router.pathname.split("/")[1];
    const index = navList.findIndex(({ path }) => path === currentPath);
    setActiveNav(index);
  }, []);

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
            onClick={() => {
              setActiveNav(navi.id);
            }}
          >
            <Link href={`/${navi.path}`}>{navi.enName}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GlobalNavi;
