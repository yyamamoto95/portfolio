import React from "react";

// 氏名のデザインフォントレイアウト
const myName = "Yudai Yamamoto";
const LogoNameLayout:React.FC = () => {
  return <span className="logoName">{myName}</span>;
};

export default LogoNameLayout;
