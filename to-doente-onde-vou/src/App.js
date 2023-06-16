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
import NoPage from "./pages/NoPage.js";

// Criando contexto que mantem dados de usuario e repassa para componentes que necessitem dessa
// informacao.
export const StatusContext = createContext();

function App() {
  // Controle da aplicacao em geral. Aqui, tem os roteamentos e os contextos necessarios para o bom funcionamento
  // da navegacao pelo site.

  const generalSymptomsList = [
    {
      id: 1,
      name: "Falta de Ar",
    },
    {
      id: 2,
      name: "Sinais de Choque",
    },
    {
      id: 3,
      name: "Dor Intensa",
    },
    {
      id: 4,
      name: "Febre Alta > 39ºC",
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
      symptoms: generalSymptomsList
    },
    {
      id: 3,
      name: "Dores",
      symptoms: generalSymptomsList
    },
    {
      id: 4,
      name: "Náusea e Mal Estar",
      symptoms: generalSymptomsList
    }
];


    // LOGICA DE STATUS DO USUARIO -- IMPORTANTE!!!
  /*
    Type: controla se usuario esta deslogado, transiente ou logado. Se logado, se eh um cliente logado ou um admin logado;
    User: cada user tem um tipo (admin ou cliente), um nome de usuario e uma senha. Isso eh guardado em db.json.
    currProduct, cartList e orders: logica de carrinho e de produtos que cliente compra.
  */
    const [status, setStatus] = useState(() => {

      return {
        type: "loggedOut",
        user: null,
        symptomTypes: symptomTypeList
      };
  
    });
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
  
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StatusContext.Provider>
  );
}

export default App;
