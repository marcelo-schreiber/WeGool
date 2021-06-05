// hooks
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';
import useInnerDimensions from '../hooks/useInnerDimensions';

// components
import Head from 'next/head';
import ReactLoading from 'react-loading';
import Image from 'next/image';
import Logo from '../components/Logo';

// styled
import * as S from '../styles/components/login';

// utils
import isBrowser from '../utils/isBrowser';

// toasts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const router = useRouter();
  const { width } = useInnerDimensions();
  const { isAuth, Login } = useAuth();

  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (isBrowser && isAuth) {
    router.push('/analyze');
    return null;
  }

  const reset = () => {
    setSenha('');
    setMatricula('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await Login(matricula, senha);
    reset();
  };

  return (
    <>
      <Head>
        <title>WeGool | Home</title>
        <meta name="description" content="Faça login e veja seus dados" />
      </Head>
      <main>
        {/* Left side */}
        <ToastContainer />
        <S.Wrapper>
          <S.LeftSideWrapper>
            <S.LogoPlacer>
              <Logo />
            </S.LogoPlacer>

            <S.Title>Log In</S.Title>
            <S.Subtitle>
              Não se preocupe, nenhum dado seu será gravado.
            </S.Subtitle>
            <form onSubmit={handleSubmit}>
              <S.Label htmlFor="matricula">Matricula</S.Label>
              <S.Input
                name="matricula"
                id="matricula"
                type="matricula"
                placeholder="12345678"
                minLength={6}
                maxLength={150}
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />

              <S.Label htmlFor="senha">Senha</S.Label>
              <S.Input
                name="senha"
                id="senha"
                type="password"
                minLength={6}
                maxLength={150}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />

              {isLoading ? (
                <S.Button>
                  <S.LoadingPlacer>
                    <ReactLoading
                      type="spin"
                      color="#fff"
                      width="29px"
                      height="29px"
                    />
                  </S.LoadingPlacer>
                </S.Button>
              ) : (
                <S.Button type="submit">Ver dados</S.Button>
              )}
            </form>
          </S.LeftSideWrapper>

          {/* Right side (only on big screens) */}
          {width >= 825 && (
            <S.RightContent>
              <S.GlassBackground></S.GlassBackground>
              <S.RightSideContentContainer>
                <Image
                  src="/Login.png"
                  width="470"
                  height="470"
                  alt="Guy logging in"
                />
                <S.RightSideContent>
                  <S.RightParagraphTitle>
                    Analize seus dados
                  </S.RightParagraphTitle>
                  <S.RightParagraphContent>
                    Veja seus fortes e fracos nas suas redações.
                  </S.RightParagraphContent>
                </S.RightSideContent>
              </S.RightSideContentContainer>
            </S.RightContent>
          )}
        </S.Wrapper>
      </main>
    </>
  );
}

export default Login;
