// hooks
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

// components
import Head from "next/head";
import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  YAxis,
  XAxis,
  ReferenceLine,
} from "recharts";

// utils
import api from "../services/api";
import isBrowser from "../utils/isBrowser";
import convertDate from "../utils/convertDate";

function Analyze() {
  // auth
  const router = useRouter();
  const { isAuth, Logout } = useAuth();
  const bearerToken = isBrowser() && localStorage.getItem("token");

  const [isLoading, setIsLoading] = useState(true);
  const [grades, setGrades] = useState([]);

  // redirect
  if (isBrowser() && !isAuth) {
    router.push("/login");
  }

  const totalGrade = grades.reduce((total, curr) => {
    return (total += curr.nota);
  }, 0);

  const sortedGrades =
    !isLoading &&
    grades.sort((a, b) => {
      return new Date(convertDate(a.envio) - new Date(convertDate(b.envio)));
    });

  // fetch all texts -> for each -> fetch grade and date
  useEffect(() => {
    api
      .get("Aluno/Redacoes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      })
      .then(({ data }) => {
        data.map((text) =>
          api
            .get(`Redacao/DadosRedacao?idRedacao=${text.id}`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: bearerToken,
              },
            })
            .then(({ data }) => {
              if (data.status !== "Corrigida") {
                return;
              }
              setGrades((oldState) => [
                ...oldState,
                {
                  // round the grade and remove time from the date
                  nota: Math.round(data.nota * 100) / 100,
                  envio: data.dataUpload.substring(0, 10),
                },
              ]);
            })
        );
        // received all responses -> stop loading
        setIsLoading(false);
      });

    return () => {
      // stops bugs on dev
      setGrades([]);
    };
  }, []);

  return (
    <>
      <Head>
        <title>WeGool | Análise</title>
        <meta name="description" content="Veja o gráfico de suas redações" />
      </Head>
      <main>
        <h1>
          Média total é: {!isLoading && (totalGrade / grades.length).toFixed(2)}
        </h1>

        <LineChart data={sortedGrades} width={900} height={500}>
          <Line type="monotone" dataKey="nota" strokeWidth={3} />
          <CartesianGrid strokeDasharray="3 3" />
          <YAxis type="number" domain={[0, 10]} />
          <XAxis dataKey="envio" />
          <ReferenceLine y={7} label="Média" stroke="red" />
          <Tooltip />
        </LineChart>
        <button onClick={Logout}>Sair</button>
      </main>
    </>
  );
}

export default Analyze;
