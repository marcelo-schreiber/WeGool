import { useState, useEffect } from "react";
import api from "../services/api";
import isBrowser from "../utils/isBrowser";

function useApiData() {
  // fetch all texts -> for each -> fetch grade and date
  const bearerToken = isBrowser() && localStorage.getItem("token");
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("Aluno/Redacoes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: bearerToken,
        },
      });

      data.map(async (text) => {
        try {
          const { data } = await api.get(
            `Redacao/DadosRedacao?idRedacao=${text.id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: bearerToken,
              },
            }
          );

          if (data.status !== "Corrigida") return;

          const skills = data.macroCompetencias;
          // access last one and get the maximum grade then check if it's 0
          const isLastItemNull =
            skills[skills.length - 1]?.subCompetencias[
              skills[skills.length - 1].subCompetencias.length - 1
            ]?.pontosNota === 0;

          const grammarItemIndex = isLastItemNull ? 2 : 1;

          setGrades((oldState) => [
            ...oldState,
            {
              // round the grade and remove time from the date
              nota: Math.round(data.nota * 100) / 100,
              envio: data.dataUpload.substring(0, 10),
              nota_gramática: {
                // access grade from last item
                nota: skills[skills.length - grammarItemIndex]
                  ?.subCompetenciaSelecionada?.pontosNota,
                // acess max grade from last item
                máxima:
                  skills[skills.length - grammarItemIndex]?.subCompetencias[
                    skills[skills.length - grammarItemIndex].subCompetencias
                      .length - 1
                  ]?.pontosNota,
              },
            },
          ]);
        } catch (err) {
          console.error(err.message);
        }
      });
    } catch (err) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { grades, error, isLoading };
}

export default useApiData;
