import React from "react";

// components
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import * as S from "../styles/components/home";

// hooks
import useAuth from "../hooks/useAuth";
import { useRouter } from "next/router";

// utils
import isBrowser from "../utils/isBrowser";

const Home = () => {
  // auth
  const router = useRouter();
  const { isAuth } = useAuth();

  if (isBrowser() && isAuth) {
    router.push("/analyze");
  }

  return (
    <S.GradientBg>
      <Head>
        <title>WeGool | Home</title>
      </Head>
      <Header />
      <S.ContentContainer>
        <S.MainSlogan>Visualização de dados das suas redações</S.MainSlogan>
        <S.SideText>
          Sua matricula e senha não sairam de seu computador, <br /> você pode
          ver o{" "}
          <S.GithubLink
            href="https://github.com/marcelo-schreiber/"
            target="_blank"
          >
            <u>código fonte</u>
          </S.GithubLink>{" "}
          no GitHub.
        </S.SideText>
        <S.BtnsContainer>
          <Link href="/login">
            <S.StartedBtn>Fazer Login</S.StartedBtn>
          </Link>
        </S.BtnsContainer>
      </S.ContentContainer>
    </S.GradientBg>
  );
};

export default Home;
