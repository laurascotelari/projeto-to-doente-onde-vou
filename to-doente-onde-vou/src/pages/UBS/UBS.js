import React, { useEffect, useState, useContext, useRef } from 'react';
import HealthUnitList from '../HealthUnitList/HealthUnitList';
import { StatusContext } from "../../App.js";
import "../../pages/Units.css";

import img_document from '../../assets/img/rg.png';
import SOSButton from '../../components/SOSButton/SOSButton';

function UBS() {
  const { status } = useContext(StatusContext);
  const [filteredList, setFilteredList] = useState();
  const [currentTime] = useState(new Date());
  const [isOpen , setIsOpen] = useState(true);

  const unit_list = useRef();

  //pegando data atual
  const currentHours = currentTime.getHours();
  const currentDay = currentTime.getDay();

  //logica para verificar se a unidade esta aberta ou nao
  useEffect(() =>{

    if(currentHours < 7 || currentHours > 19){
      setIsOpen(false);
    }else{
      //currentDay -> dia da semana
      //0 = domingo e 6 = sabado
      if(currentDay === 0 || currentDay === 6){
        setIsOpen(false);
      }
    }
      
  },[currentDay, currentHours]);

  useEffect(() =>{
    const filteredUnits = status.unitList.filter(unit => unit.type === "UBS");
    setFilteredList(filteredUnits);
  }, [status.unitList]);

  useEffect(() => {
    console.log(filteredList);
  }, [filteredList]);

  const showList = () => {
    unit_list.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div>
      <div className='unit-type-container'>
        <div className='general-info-container'>
          <h1 className="unit-title">UBS</h1>

          <div className='unit-about-container'>
            <h2>Unidade Básica de Saúde</h2>
            <hr/>
            <p className='unit-about-text'>
                Responsável por atender pacientes em regime de não urgência, ou
                através de consulta marcada previamente. Engloba serviços como 
                ginecologia, obstetrícia, pediatria, odontologia e enfermagem. 
            </p>
          </div>

        </div>

        <h3>Documentos exigidos</h3>
        <div className='documents-container'>
          <img src={img_document}/>

          <ul>
            <li>Documento com Foto</li>
            <li>Comprovante de Endereço</li>
          </ul>

        </div>

        <div className='container-hours-button'>

          <div className='opening-hours-container'>

              <div>
                <h3>Horário de Funcionamento:</h3>
                <p>Seg. à Sex. das 7h-19h</p>

              </div>

              <h4 className={isOpen ? 'open' : 'closed'}>
                  {isOpen ? 'Aberto' : 'Fechado'}
              </h4>
          </div>

          <button className='list-units-button' onClick={showList}>Lista de UBS de São Carlos</button>

        </div>
      </div>

      <div className='list-container' ref={unit_list}>
        {
          //condicao que garante que a lista so sera passada quando estiver com o valor correto 
          filteredList && <HealthUnitList filteredList={filteredList} />
        }
      </div>
      <SOSButton />
    </div>
  )
}

export default UBS