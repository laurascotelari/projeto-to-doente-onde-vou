import React, { useEffect, useState } from 'react';
import "./HealthUnitCard.css";

function HealthUnitCard({unit}) {
    const [currentTime] = useState(new Date());
    const [isOpen , setIsOpen] = useState(true);

    //pegando data atual
    const currentHours = currentTime.getHours();
    const currentDay = currentTime.getDay();

    //logica para verificar se a unidade esta aberta ou nao
    useEffect(() =>{
        console.log("Curr day: " + currentDay);
        //apenas a UBS possui funcionamento variavel
        if(unit.type === "UBS"){
            if(currentHours < 7 || currentHours > 19){
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
            </div>

        </div>
    )
}

export default HealthUnitCard