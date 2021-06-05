// hooks
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '../hooks/useAuth';

// utils
import api from '../services/api';
import isBrowser from '../utils/isBrowser';

function Analyze() {
  const router = useRouter();
  const [data, setData] = useState({});
  const { isAuth, Logout } = useAuth();

  if (isBrowser() && !isAuth) {
    router.push('/');
  }

  useEffect(() => {
    isAuth &&
      api
        .get('/Aluno/ObterDetalhesCorrecao?idredacao=121964', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token'),
          },
        })
        .then((res) => setData(res.data));
  }, []);

  console.log(data);

  return (
    <>
      <Head>
        <title>Redação</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button onClick={Logout}>sair</button>
    </>
  );
}

export default Analyze;
