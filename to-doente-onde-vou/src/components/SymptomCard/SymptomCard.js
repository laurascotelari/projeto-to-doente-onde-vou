import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IconContext } from "react-icons";
import { BsFillCheckCircleFill, BsCircle } from "react-icons/bs";

import "./SymptomCard.css";

function SymptomCard({symptomType}) {
  const [showSymptom, setShowSymptom] = useState(false);
  const [checkSymptom, setCheckSymptom] = useState(false);

  const showListOfSymptoms = () => {
    setShowSymptom(!showSymptom);
  }
  const selectSymptom = (symptom) => {
    console.log("Symptom clicado: " + symptom.name);
    setCheckSymptom(!checkSymptom);
  }
  return (
    <section className='symptom-container'>

        <div className="title-container"  onClick={showListOfSymptoms}>
          <h3>{symptomType.name}</h3>
          <IconContext.Provider value={{ className: "shared-class", size: 30, color: "var(--light_gray)" }}>
            <IoIosArrowDown />
          </IconContext.Provider> 
        </div>

        { showSymptom ? 
        
          symptomType.symptoms.map((symptom) => (
              <div className="symptom-name-container" onClick={() => selectSymptom(symptom)}>
                <IconContext.Provider value={{ className: "shared-class", size: 18, color: "var(--purple)" }}>
                  
                  { checkSymptom ?
                    <BsFillCheckCircleFill />
                    :
                    <BsCircle />
                  }
                </IconContext.Provider> 

                <p>{symptom.name}</p>
              </div>
          ))

          : 
          <></>
      
        }
    </section>
  )
}

export default SymptomCard