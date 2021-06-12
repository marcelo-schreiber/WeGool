// hooks
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";

// components
import Head from "next/head";
import Header from "../components/Header";
import {
  LineChart,
  AreaChart,
  Area,
  Line,
  CartesianGrid,
  Tooltip,
  YAxis,
  XAxis,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from "recharts";
import * as S from "../styles/components/analyze";

// utils
import api from "../services/api";
import isBrowser from "../utils/isBrowser";
import {
  calculateMean,
  sumGrades,
  movingAverage,
  sortByDate,
  sortByGrade,
} from "../utils/calculations";

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

              const comp = data.macroCompetencias;
              // access last one and get the maximum grade then check if it's 0
              const isLastItemNull =
                comp[comp.length - 1]?.subCompetencias[
                  comp[comp.length - 1].subCompetencias.length - 1
                ]?.pontosNota === 0;

              const accessPortugueseItem = isLastItemNull ? 2 : 1;

              setGrades((oldState) => [
                ...oldState,
                {
                  // round the grade and remove time from the date
                  nota: Math.round(data.nota * 100) / 100,
                  envio: data.dataUpload.substring(0, 10),
                  nota_gramática: {
                    // access grade from last item
                    nota: comp[comp.length - accessPortugueseItem]
                      ?.subCompetenciaSelecionada?.pontosNota,
                    // acess max grade from last item
                    máxima:
                      comp[comp.length - accessPortugueseItem]?.subCompetencias[
                        comp[comp.length - accessPortugueseItem].subCompetencias
                          .length - 1
                      ]?.pontosNota,
                  },
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

  // calculations
  const sortedGradesByDate = sortByDate(grades);
  const sortedGradesByPerformance = sortByGrade(grades.slice()); // make copy so 'grade' state doesn't change
  const onlyPortugueseGrades = grades.map(
    ({ nota_gramática }) => nota_gramática
  );

  const mean = calculateMean(sumGrades(grades), grades.length); // mean = total / size
  const lastThreeDaysMean = movingAverage(sortedGradesByDate.slice(), 3);

  const bestGrade = sortedGradesByPerformance[grades.length - 1]?.nota;
  const worstGrade = sortedGradesByPerformance[0]?.nota;

  return (
    <S.GradientBg>
      <Head>
        <title>WeGool | Análise</title>
        <meta name="description" content="Veja o gráfico de suas redações" />
      </Head>
      <Header />
      <main>
        <S.CalculationsContainer>
          {!isLoading && (
            <S.List>
              <li>
                Média: <S.Value>{mean}</S.Value>
              </li>
              <li>
                Média móvel (3 dias): <S.Value>{lastThreeDaysMean}</S.Value>
              </li>
              <li>
                Melhor nota: <S.Value>{bestGrade}</S.Value>
              </li>
              <li>
                Pior nota: <S.Value>{worstGrade}</S.Value>
              </li>
            </S.List>
          )}
          <S.QuitButton onClick={Logout}>Sair</S.QuitButton>
        </S.CalculationsContainer>
        <S.ChartTitle>Notas</S.ChartTitle>
        <ResponsiveContainer width="97%" height={375}>
          <LineChart data={sortedGradesByDate}>
            <Line
              type="monotone"
              dataKey="nota"
              name="Nota"
              strokeWidth={3}
              stroke="#6D41A1"
            />
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis type="number" domain={[0, 10]} />
            <XAxis dataKey="envio" />
            <ReferenceLine
              y={7}
              label="Média"
              strokeWidth={3}
              stroke="#BF0404"
              strokeDasharray="3 3"
            />
            <Tooltip labelFormatter={() => "Notas"} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
        <S.ChartTitle>Competência: gramática</S.ChartTitle>
        <ResponsiveContainer width="97%" height={375}>
          <AreaChart data={onlyPortugueseGrades}>
            <Area
              type="monotone"
              name="Nota atingida"
              dataKey="nota"
              strokeWidth={3}
              stroke="#3D71BF"
              fill="#3D71BF"
            />
            <Area
              type="monotone"
              dataKey="máxima"
              name="Máxima"
              strokeWidth={3}
              stroke="#6D41A1"
              fill="#6D41A1"
              strokeDasharray="3 3"
            />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis type="number" />
            <XAxis dataKey="envio" />
            <Tooltip labelFormatter={() => "Gramática"} />
          </AreaChart>
        </ResponsiveContainer>
      </main>
    </S.GradientBg>
  );
}

export default Analyze;
