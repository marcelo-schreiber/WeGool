import React from "react";

import Link from "next/link";

import * as S from "./styles";

const Logo = () => {
  return (
    <Link href="/">
      <S.LogoContainer>
        <svg
          width="75"
          height="75"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M128 0.889648L85.7566 128.179L50.7738 73.4421L72.3594 82.8027L128 0.889648Z"
            fill="#6D41A1"
          />
          <path
            d="M58.5869 83.3464L49.0347 72.6317L66.2287 80.0854L58.5869 83.3464Z"
            fill="#3D71BF"
          />
          <path
            d="M0 1.05371L45.2086 127.536L79.2309 72.4437L57.8115 82.0241L0 1.05371Z"
            fill="#3D71BF"
          />
        </svg>

        <S.Title>WeGool</S.Title>
      </S.LogoContainer>
    </Link>
  );
};

export default Logo;
