import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { StatusContext } from "../../App.js";


import "./ConfirmButton.css"

function ConfirmButton() {
  const { status, setStatus } = useContext(StatusContext);
  const [currentTime] = useState(new Date());
  const [unitType, setUnitType] = useState("");
  const navigate = useNavigate();

  //pegando data atual
  const currentHours = currentTime.getHours();
  const currentDay = currentTime.getDay();

  const calculateRisk = () => {
    console.log("Calcular Risco!");
    let overallRisk = 4;
    
    console.log("Overall Risk: " + overallRisk);
    status.selectedSymptoms.forEach((symptom) => {
      console.log("Symptom Risk: " + symptom.risk);

      if (symptom.risk < overallRisk) {
        overallRisk = symptom.risk;
      }

      console.log("Overall Risk: " + overallRisk);
    });

    //        Tabela de Riscos
    //-----------------------------------
    //   1  |      Vermelho       | UPA
    //------|---------------------|------
    //   2  |      Laranja        | UPA
    //------|---------------------|------
    //   3  |      Amarelo        | UPA
    //------|---------------------|------
    //   4  |       Verde         | UBS
    //------|---------------------|------
    //   5  |        Azul         | UBS
    //-----------------------------------
    if (overallRisk > 3){

      //se for de noite ou madrugada
      if(currentHours < 7 || currentHours > 19){
        setUnitType("UPA");
      }else{
          //se for dim de semana
          if(currentDay === 0 || currentDay === 6){
            setUnitType("UPA");
          }else{
            setUnitType("UBS");
          }
      }
      setUnitType("UBS");

    }else{//se o risco for acima de amarelo
      setUnitType("UPA");
    }

  }

  useEffect(() => {
    if (unitType) {
      console.log("Alterou a unidade!");
      console.log(unitType);

      setStatus((prevStatus) => ({
        ...prevStatus,
        designatedUnitType: unitType,
        selectedSymptoms: [] //limpa os sintomas selecionados
      }));

      navigate('/ResultScreen');
    }
  }, [unitType]);
  
  return (
    <button className="confirm-button" onClick={calculateRisk}>
        Confirmar
    </button>
  )
}

export default ConfirmButton