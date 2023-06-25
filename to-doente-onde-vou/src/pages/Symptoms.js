import React, { useContext } from "react";
import SymptomCard from '../components/SymptomCard/SymptomCard';
import { StatusContext } from "../App.js";

import "./Symptoms.css"
import ConfirmButton from "../components/ConfirmButton/ConfirmButton";

function Symptoms() {
  const { status, setStatus } = useContext(StatusContext);
  

  return (
    <div className="content-container">
        <h1>O que você está sentindo?</h1>

        <div className="symptom-types-container">
          {status.symptomTypes.map((symptomType) => (
              <SymptomCard symptomType={symptomType} />
          ))}

        </div>
        <div className="confirm-button-container">
          <ConfirmButton />
        </div>
    </div>
  )
}

export default Symptoms