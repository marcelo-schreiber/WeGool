import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import * as S from './styles';

const Logo = () => {
  return (
    <Link href="/">
      <S.LogoContainer>
        <Image src="/Logo.svg" alt="Logo WeGool" width="75" height="75" />

        <S.Title>WeGool</S.Title>
      </S.LogoContainer>
    </Link>
  );
};

export default Logo;
