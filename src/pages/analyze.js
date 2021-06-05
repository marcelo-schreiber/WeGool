// hooks
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

// utils
import api from "../services/api";
import isBrowser from "../utils/isBrowser";

function Analyze() {
  const router = useRouter();
  const [data, setData] = useState({});
  const { isAuth, Logout } = useAuth();

  if (isBrowser() && !isAuth) {
    router.push("/");
  }

  useEffect(() => {
    isAuth &&
      api
        .get("/Aluno/ObterDetalhesCorrecao?idredacao=121964", {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => setData(res.data));
  }, []);

  console.log(data);

  return (
    <>
      <Head>
        <title>WeGool | análise</title>
        <meta name="description" content="Veja os gráficos de suas redações" />
      </Head>

      <button onClick={Logout}>Sair</button>
    </>
  );
}

export default Analyze;
