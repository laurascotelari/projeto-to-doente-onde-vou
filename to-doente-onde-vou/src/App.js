// Para o roteamento e a navegacao entre paginas...
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Hooks de contexto, de estado e de efeito colateral para manipulacao das paginas...
import { createContext, useState, useEffect } from 'react';

// -- Importando paginas/pages e componentes para controle de navegacao pelo site --

// A barra de navegacao sempre esta presente no site. Deve-se renderizar o que estiver
// abaixo dela (com o <Outlet />).
import Navbar from "./components/Navbar/Navbar.js";

import './App.css';

// Paginas do site
import Symptoms from "./pages/Symptoms.js";
import UPA from "./pages/UPA.js";
import UBS from "./pages/UBS.js";

// Criando contexto que mantem dados de usuario e repassa para componentes que necessitem dessa
// informacao.
export const StatusContext = createContext();

function App() {
  // Controle da aplicacao em geral. Aqui, tem os roteamentos e os contextos necessarios para o bom funcionamento
  // da navegacao pelo site.

  //lista de sintomas gerais
  const generalSymptomsList = [
    {
      id: 1,
      name: "Falta de Ar",
      risk: 1
    },
    {
      id: 2,
      name: "Sinais de Choque",
      risk: 1
    },
    {
      id: 3,
      name: "Dor Intensa",
      risk: "orange"
    },
    {
      id: 4,
      name: "Febre Alta (maior que 39ºC)",
      risk: "orange"
    },
    {
      id: 5,
      name: "Dor Moderada",
      risk: 2
    },
    {
      id: 6,
      name: "Febre Moderada(entre 38ºC e 39ºC)",
      risk: 2
    },
    {
      id: 7,
      name: "Dor Leve",
      risk: 3
    },
    {
      id: 8,
      name: "Febre Baixa(entre 37,5ºC e 37,9ºC)",
      risk: 3
    }
  ];

  //lista de sintomas respiratorios
  const respiratorySymptomsList = [
    {
      id: 1,
      name: "Estridor",
      risk: 1
    },
    {
      id: 2,
      name: "Dispneia de Início súbito após trauma",
      risk: "orange"
    },
    {
      id: 3,
      name: "Dispneia moderada",
      risk: 2
    },
    {
      id: 4,
      name: "Nariz entupido com secreção amarelada",
      risk: 3
    },
    {
      id: 5,
      name: "Tosse persistente",
      risk: 3
    }
  ];

  //lista de sintomas respiratorios
  const abdominalPainSymptomsList = [
    {
      id: 1,
      name: "Hemorragia",
      risk: 1
    },
    {
      id: 2,
      name: "Trauma abdominal",
      risk: 1
    },
    {
      id: 3,
      name: "Sangramento intenso",
      risk: "orange"
    },
    {
      id: 4,
      name: "Perda de líquido esverdeado espesso",
      risk: 1
    },
    {
      id: 5,
      name: "Sangramento moderado",
      risk: 2
    }
  ];

  //lista de sintomas de nausea e mal estar
  const nauseaSymptomsList = [
    {
      id: 1,
      name: "Vômitos com sinais de desidratação",
      risk: 2
    },
    {
      id: 2,
      name: "Vômitos frequentes sem desidratação",
      risk: 3
    }
  ];

  const symptomTypeList = [
    {
      id: 1,
      name: "Sintomas Gerais",
      symptoms: generalSymptomsList
    },
    {
      id: 2,
      name: "Sintomas Respiratórios",
      symptoms: respiratorySymptomsList
    },
    {
      id: 3,
      name: "Dores",
      symptoms: abdominalPainSymptomsList
    },
    {
      id: 4,
      name: "Náusea e Mal Estar",
      symptoms: nauseaSymptomsList
    }
];


  // LOGICA DE STATUS DO USUARIO -- IMPORTANTE!!!

  const [status, setStatus] = useState(() => {
    // Fornece 'memoria' ao site - permite atualizar pagina e ter dados mantidos ate clicar em sair.
    const storedStatus = localStorage.getItem("status"); 

    return {
      type: "loggedOut",
      user: null,
      symptomTypes: symptomTypeList,
      selectedSymptoms: [],
      risk: null
    };
  
  });

    
  useEffect(() => {
    localStorage.setItem("status", JSON.stringify(status));
  }, [status]);



  // Visualizando status do usuario
  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <StatusContext.Provider
      value={{
        status,
        setStatus
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Symptoms />} />
            <Route path="UBS" element={<UBS />} />
            <Route path="UPA" element={<UPA />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StatusContext.Provider>
  );
}

export default App;
