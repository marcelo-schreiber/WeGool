import { useState, useEffect } from "react";
import api from "../services/api";
import isBrowser from "../utils/isBrowser";

function useApiData() {
  // fetch all texts -> for each -> fetch grade and date
  const bearerToken = isBrowser() && localStorage.getItem("token");
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

              const skills = data.macroCompetencias;
              // access last one and get the maximum grade then check if it's 0
              const isLastItemNull =
                skills[skills.length - 1]?.subCompetencias[
                  skills[skills.length - 1].subCompetencias.length - 1
                ]?.pontosNota === 0;

              const accessGrammarItem = isLastItemNull ? 2 : 1;

              setGrades((oldState) => [
                ...oldState,
                {
                  // round the grade and remove time from the date
                  nota: Math.round(data.nota * 100) / 100,
                  envio: data.dataUpload.substring(0, 10),
                  nota_gramática: {
                    // access grade from last item
                    nota: skills[skills.length - accessGrammarItem]
                      ?.subCompetenciaSelecionada?.pontosNota,
                    // acess max grade from last item
                    máxima:
                      skills[skills.length - accessGrammarItem]
                        ?.subCompetencias[
                        skills[skills.length - accessGrammarItem]
                          .subCompetencias.length - 1
                      ]?.pontosNota,
                  },
                },
              ]);
            })
        );
      });
    setIsLoading(false);

    return () => {
      // stops bugs on dev
      setGrades([]);
    };
  }, []);

  return [grades, isLoading];
}

export default useApiData;
