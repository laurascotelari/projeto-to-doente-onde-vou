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
import UPA from "./pages/UPA/UPA.js";
import UBS from "./pages/UBS/UBS.js";
import ConfirmButton from './components/ConfirmButton/ConfirmButton.js';
import ResultScreen from './pages/ResultScreen/ResultScreen.js';
import HealthUnitList from './pages/HealthUnitList/HealthUnitList.js';


//imagens (mudar depois)
import img_ubs_parque_delta from "../src/assets/img/ubs_parque_delta.jpg";
import img_ubs_santa_felicia from "../src/assets/img/ubs_santa_felicia.jpg"
import img_ubs_santa_paula from "../src/assets/img/ubs_santa_paula.jpg"

// Criando contexto que mantem dados de usuario e repassa para componentes que necessitem dessa
// informacao.
export const StatusContext = createContext();

function App() {
  // Controle da aplicacao em geral. Aqui, tem os roteamentos e os contextos necessarios para o bom funcionamento
  // da navegacao pelo site.

  //lista de sintomas ------------------------------------------
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
//------------------------------------------

//lista de unidades-----------------------------
const unitList = [
  {
    id:1,
    name: "UBS Aracy Ernesto Pereira Lopes",
    address: "R. Sebastião Lemos, 426",
    CEP: "13573-108",
    phone: "(16) 3366-1444",
    email: "Aracy.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_parque_delta,
    type: "UBS"
  },
  {
    id:2,
    name: "UBS Redenção Dr. Lauro Corsi",
    address: "R Desembargador Julio De Faria, 1700",
    CEP: "13574-250",
    phone: "(16) 3371-1327",
    email: "Redencao.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_parque_delta,
    type: "UBS"
  },
  {
    id: 3,
    name: "UBS Botafogo Valeria De Cibelli",
    address: "Av Jose Pereira Lopes, 1650",
    CEP: "13547-300",
    phone: "(16) 13547-300",
    email: "Redencao.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_parque_delta,
    type: "UBS"
  },
  {
    id: 4,
    name: "UBS Santa Felícia Dr. Benjamim L Osores",
    address: "R Joaquim Augusto Ribeiro De Souza, 40",
    CEP: "13563-330",
    phone: "(16) 3371-2984",
    email: "Santafelicia.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_santa_felicia,
    type: "UBS"
  },
  {
    id: 5,
    name: "UBS Sta Paula Dr. Arsenio Agnesine",
    address: "R Luis Saia, 44",
    CEP: "13564-010",
    phone: "(16) 3371-3089",
    email: "Santafelicia.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_santa_paula,
    type: "UBS"
  },
  {
    id: 6,
    name: "UBS Parque Delta Dr. Luiz Maia",
    address: "R Pedro Cavarette, 151",
    CEP: "113564-490",
    phone: "(16) 3361-4677",
    email: "Santafelicia.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_parque_delta,
    type: "UBS"
  },
  {
    id: 7,
    name: "UBS Cruzeiro Do Sul Dr. Dante Erbolato",
    address: "R Basilio Dibbo, 1055",
    CEP: "13572-060",
    phone: "(16) 3375-3433",
    email: "Vilaisabel.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_parque_delta,
    type: "UBS"
  },
  {
    id: 8,
    name: "UBS Vila Isabel Rosana Cecato Lahr",
    address: "R Vicente De Carvalho, 566",
    CEP: "13570-593",
    phone: "(16) 3368-1516",
    email: "Vilaisabel.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_parque_delta,
    type: "UBS"
  },
  {
    id: 9,
    name: "UBS Azulville Dr. Romeu De Cresci",
    address: "R Madre Marie Blanche, 1021",
    CEP: "13571-000",
    phone: "(16) 3368-1110",
    email: "Vilaisabel.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_parque_delta,
    type: "UBS"
  },
  {
    id: 10,
    name: "UBS São José Dr. Luiz Valentie De Oliveira",
    address: "Av Araraquara, 1199",
    CEP: "13566-770",
    phone: "(16) 3361-4675",
    email: "Saojose.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_parque_delta,
    type: "UBS"
  },
  {
    id: 11,
    name: "UBS Vila Nery Dr. Wilson Pozzi",
    address: "R Da Imprensa, 410",
    CEP: "13569-007",
    phone: "(16) 3371-5806",
    email: "Saojose.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_parque_delta,
    type: "UBS"
  },
  {
    id: 12,
    name: "UBS Fagá Dr. Viriato Fernandes Nunes",
    address: "R João Lourenço, 44",
    CEP: "13568-250",
    phone: "(16) 3371-8039",
    email: "Saojose.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Seg. à Sex. 7h-19h",
    img: img_ubs_parque_delta,
    type: "UBS"
  },
  {
    id: 13,
    name: "UPA da Vila Prado",
    address: "Avenida Grécia, 229",
    CEP: null,
    phone: "(16) 3371-2100",
    email: null,
    openingHours: "Todos os dias - 24h",
    img: img_ubs_parque_delta,
    type: "UPA"
  },
  {
    id: 14,
    name: "UPA do Cidade Aracy",
    address: "Rua Reinaldo Pizzani, 357",
    CEP: "13573-228",
    phone: "(16) 3375-1645",
    email: "Aracy.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Todos os dias - 24h",
    img: img_ubs_parque_delta,
    type: "UPA"
  },
  {
    id: 15,
    name: "UPA da Santa Felícia",
    address: "Rua João Navarro Siquerolli, S/N",
    CEP: "13568-250",
    phone: "(16) 3374-1865",
    email: "Santafelicia.Ares@Saocarlos.Sp.Gov.Br",
    openingHours: "Todos os dias - 24h",
    img: img_ubs_parque_delta,
    type: "UPA"
  }
//-------------------------------------------


];


  // LOGICA DE STATUS DO USUARIO -- IMPORTANTE!!!

  const [status, setStatus] = useState(() => {
    // Fornece 'memoria' ao site - permite atualizar pagina e ter dados mantidos ate clicar em sair.
    const storedStatus = localStorage.getItem("status"); 

    return {
      type: "loggedOut",
      user: null,
      symptomTypes: symptomTypeList,
      unitList: unitList,
      selectedSymptoms: [],
      designatedUnitType: null,
      risk: null
    };
  
  });

    
  useEffect(() => {
    localStorage.setItem("status", JSON.stringify(status));
  }, [status]);



  // Visualizando status do usuario
  useEffect(() => {
    console.log("App.js: visualizando status");
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
            <Route path="/Sintomas" index element={<Symptoms />} />
            <Route path="/UBS" element={<UBS />} />
            <Route path="/UPA" element={<UPA />} />
            <Route path="/ResultScreen" element={<ResultScreen />} />
            <Route path="/HealthUnitList" element={<HealthUnitList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StatusContext.Provider>
  );
}

export default App;
