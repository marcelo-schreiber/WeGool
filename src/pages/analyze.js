import React from "react";

// hooks
import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import useApiData from "../hooks/useApiData";

// components
import Head from "next/head";
import Header from "../components/Header";
import * as Chart from "recharts";
import * as S from "../styles/components/analyze";

// utils
import isBrowser from "../utils/isBrowser";
import * as Calc from "../utils/calculations";

function Analyze() {
  // auth
  const router = useRouter();
  const { isAuth, Logout } = useAuth();
  const { grades, isLoading } = useApiData();

  // redirect
  if (isBrowser() && !isAuth) router.push("/login");

  if (isLoading) return null;

  // calculations
  const sortedGradesByDate = Calc.sortByDate(grades);
  const sortedGradesByPerformance = Calc.sortByGrade(grades.slice()); // make copy so 'grade' state doesn't change
  const grammarGrades = grades.map((i) => i.nota_gramática);

  const mean = Calc.mean(Calc.sumGrades(grades), grades.length);
  const lastThreeDaysMean = Calc.movingAverage(sortedGradesByDate.slice(), 3);
  const { deviation } = Calc.varianceAndDeviation(grades, mean);

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
              <li>
                Desvio padrão: <S.Value>{deviation}</S.Value>
              </li>
            </S.List>
          )}
          <S.QuitButton onClick={Logout}>Sair</S.QuitButton>
        </S.CalculationsContainer>
        <S.ChartTitle>Notas</S.ChartTitle>
        <Chart.ResponsiveContainer width="97%" height={375}>
          <Chart.LineChart data={sortedGradesByDate}>
            <Chart.Line
              type="monotone"
              dataKey="nota"
              name="Nota"
              strokeWidth={3}
              stroke="#6D41A1"
            />
            <Chart.CartesianGrid strokeDasharray="3 3" />
            <Chart.YAxis type="number" domain={[0, 10]} />
            <Chart.XAxis dataKey="envio" />
            <Chart.ReferenceLine
              y={7}
              label="Média"
              strokeWidth={3}
              stroke="#BF0404"
              strokeDasharray="3 3"
            />
            <Chart.Tooltip wrapperStyle={{ fontSize: "12px" }} />
            <Chart.Legend />
          </Chart.LineChart>
        </Chart.ResponsiveContainer>
        <S.ChartTitle>Competência: gramática</S.ChartTitle>
        <Chart.ResponsiveContainer width="97%" height={375}>
          <Chart.AreaChart data={grammarGrades}>
            <Chart.Area
              type="monotone"
              name="Nota atingida"
              dataKey="nota"
              strokeWidth={3}
              stroke="#3D71BF"
              fill="#3D71BF"
            />
            <Chart.Area
              type="monotone"
              dataKey="máxima"
              name="Máxima"
              strokeWidth={3}
              stroke="#6D41A1"
              fill="#6D41A1"
              strokeDasharray="3 3"
            />
            <Chart.Legend />
            <Chart.CartesianGrid strokeDasharray="3 3" />
            <Chart.YAxis type="number" />
            <Chart.XAxis dataKey="envio" />
            <Chart.Tooltip
              labelFormatter={() => "Gramática"}
              wrapperStyle={{ fontSize: "12px" }}
            />
          </Chart.AreaChart>
        </Chart.ResponsiveContainer>
      </main>
    </S.GradientBg>
  );
}

export default Analyze;
