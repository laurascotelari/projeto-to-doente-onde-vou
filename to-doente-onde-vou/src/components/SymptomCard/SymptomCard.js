import React, { useState, useContext } from "react";
import { StatusContext } from "../../App.js";

import { IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";
import { BsFillCheckCircleFill, BsCircle } from "react-icons/bs";

import "./SymptomCard.css";

function SymptomCard({symptomType}) {
  const { status, setStatus } = useContext(StatusContext);

  const [showSymptom, setShowSymptom] = useState(false);
  const [selectedSymptoms, setselectedSymptoms] = useState([]);

  const showListOfSymptoms = () => {
    setShowSymptom(!showSymptom);
  }
  const selectSymptom = (symptom) => {
    let updatedList = status.selectedSymptoms;
    //caso a pessoa ja tenha selecionado e queira retirar a selecao
    if(selectedSymptoms.includes(symptom.name)){
      updatedList = selectedSymptoms.filter((sym) => sym !== symptom.name);
      
      setselectedSymptoms(updatedList);

    }else{
      //adicionando o sintoma a lista

      updatedList = [...updatedList, symptom]
      setselectedSymptoms([...selectedSymptoms, symptom.name] );
    }

    setStatus((prevStatus) => ({
      ...prevStatus,
      selectedSymptoms: updatedList
    }));
  }


  return (
    <section className='symptom-type-container'>

        <div className="title-container"  onClick={showListOfSymptoms}>
          <h3>{symptomType.name}</h3>
          <IconContext.Provider value={{ className: "shared-class", size: 30, color: "var(--light_gray)" }}>
            <IoIosArrowDown />
          </IconContext.Provider> 
        </div>

        <div className='symptom-container'>
        { showSymptom ? 
          symptomType.symptoms.map((symptom) => (
              <div className="symptom-name-container" onClick={() => selectSymptom(symptom)}>
                <IconContext.Provider value={{ className: "shared-class", size: 18, color: "var(--purple)" }}>
                  
                  {selectedSymptoms.includes(symptom.name)  ? (
                    <BsFillCheckCircleFill />
                  ) : (
                    <BsCircle />
                  )}
                </IconContext.Provider> 

                <p>{symptom.name}</p>
              </div>
          ))

          : 
          <></>
        }
        </div>
    </section>
  )
}

export default SymptomCard