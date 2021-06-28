import { useState, useEffect } from "react";
import api from "../services/api";
import isBrowser from "../utils/isBrowser";

function useApiData() {
  // fetch all texts -> for each -> fetch grade and date
  const bearerToken = isBrowser() && localStorage.getItem("token");
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const header = {
    headers: {
      "Content-Type": "application/json",
      Authorization: bearerToken,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("Aluno/Redacoes", header);

      data.map(async (text) => {
        try {
          const { data } = await api.get(
            `Redacao/DadosRedacao?idRedacao=${text.id}`,
            header
          );

          if (data.status !== "Corrigida") return;

          const skills = data.macroCompetencias;
          const lastSkill = skills[skills.length - 1]; // can be invalid (== 0)

          // access last one and get the maximum grade then check if it's 0 (invalid)
          const isLastItemNull =
            lastSkill.subCompetencias[lastSkill.subCompetencias.length - 1]
              ?.pontosNota === 0;

          const grammarItemIndex = skills.length - (isLastItemNull ? 2 : 1);
          const grammarItem = skills[grammarItemIndex];

          setGrades((oldState) => [
            ...oldState,
            {
              // round the grade and remove time from the date
              nota: Math.round(data.nota * 100) / 100,
              envio: data.dataUpload.substring(0, 10),
              nota_gramática: {
                // access grade from last item (grammar)
                nota: grammarItem?.subCompetenciaSelecionada?.pontosNota,
                // acess max grade
                máxima:
                  grammarItem?.subCompetencias[
                    grammarItem.subCompetencias.length - 1
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

  return { grades, isLoading };
}

export default useApiData;
