import React, { useEffect, useState, useContext } from 'react';
import "./HealthUnitCard.css";
import Button from '../Button/Button';
import { StatusContext } from "../../App.js";
import { useNavigate } from 'react-router-dom';

function HealthUnitCard({unit}) {
    const { setStatus } = useContext(StatusContext);
    const [currentTime] = useState(new Date());
    const [isOpen , setIsOpen] = useState(true);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const navigate = useNavigate();


    const selectUnit = () =>{
        setSelectedUnit(unit);
    }

    useEffect(() => {
        //se o usuario tiver selecionado a unidade
        if (selectedUnit) {
            //salva isso no local storage
            setStatus((prevStatus) => ({
                ...prevStatus,
                selectedUnit: selectedUnit
            }));
        
            return navigate('/GuidelineScreen');
        }
    }, [selectedUnit]);

    //pegando data atual
    const currentHours = currentTime.getHours();
    const currentMinutes = currentTime.getMinutes();
    const currentDay = currentTime.getDay();

    //logica para verificar se a unidade esta aberta ou nao
    useEffect(() =>{
        console.log("Curr day: " + currentDay);
        console.log("Curr hour: " + currentHours);
        console.log("Curr min: " + currentMinutes);
    
        //apenas a UBS possui funcionamento variavel
        if(unit.type === "UBS"){
            //verificar condicao depois -> estamos considerando que 
            //as 19:00 ja vai mostrar que esta fechado
            if(currentHours < 7 || (currentHours > 18)){
                setIsOpen(false);
            }else{
                //currentDay -> dia da semana
                //0 = domingo e 6 = sabado
                if(currentDay === 0 || currentDay === 6){
                    setIsOpen(false);
                }
            }
        }
    },[currentTime, unit.type]);

    return (
        <div className='unit-container'>
            <div className='unit-img-container'>
                <img src={unit.img}/>

            </div>

            <div className='unit-info-container'>
                <h2 className='unit-info-name'>{unit.name}</h2>
                <hr/>
                <p><span>Endereço:</span> {unit.address}</p>
                <p><span>Telefone:</span> {unit.phone}</p>
                <br/>
                <p><span>Horário de Funcionamento:</span></p>
                <div className='opening-hours-container'>
                    <p>{unit.openingHours}</p>
                    <h4 className={isOpen ? 'open' : 'closed'}>
                        {isOpen ? 'Aberto' : 'Fechado'}
                    </h4>
                </div>
            
                <div className='select-unit-button'>
                    <Button onClick={selectUnit} > Selecionar </Button>
                </div>
            </div>

        </div>
    )
}

export default HealthUnitCard