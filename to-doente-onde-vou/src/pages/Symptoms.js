import React, { useContext } from "react";
import SymptomCard from '../components/SymptomCard/SymptomCard'
import { StatusContext } from "../App.js";

import "./Symptoms.css"

function Symptoms() {
  const { status, setStatus } = useContext(StatusContext);
  return (
    <div>
        <h1>O que você está sentindo?</h1>

        {status.symptomTypes.map((symptomType) => (
                    
            <SymptomCard symptomType={symptomType} />
        ))}

        
    </div>
  )
}

export default Symptoms