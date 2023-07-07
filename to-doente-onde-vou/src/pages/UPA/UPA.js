import React, { useEffect, useState, useContext, useRef } from 'react';
import HealthUnitList from '../HealthUnitList/HealthUnitList';
import { StatusContext } from "../../App.js";
import "../../pages/Units.css";

import img_document from '../../assets/img/rg.png';
import SOSButton from '../../components/SOSButton/SOSButton';

function UPA() {
  const { status } = useContext(StatusContext);
  const [filteredList, setFilteredList] = useState();
  const [currentTime] = useState(new Date());
  const [isOpen ] = useState(true);

  const unit_list = useRef();

  useEffect(() =>{
    const filteredUnits = status.unitList.filter(unit => unit.type === "UPA");
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
          <h1 className="unit-title">UPA</h1>

          <div className='unit-about-container'>
            <h2>Unidade de Pronto Atendimento</h2>
            <hr/>
            <p className='unit-about-text'>
                Atendimento de urgências, emergências e prestamento dos primeiros socorros.
                Nela, são realizadas consultas, suturas, administrações de medicamentos,
                inalações e curativos. 
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
                <p>Todos os dias - 24h</p>

              </div>

              <h4 className={isOpen ? 'open' : 'closed'}>
                  {isOpen ? 'Aberto' : 'Fechado'}
              </h4>
          </div>

          <button className='list-units-button' onClick={showList}>Lista de UPA de São Carlos</button>

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

export default UPA