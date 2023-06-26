import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../App.js";
import { getDistance, findNearest } from 'geolib';
import HealthUnitList from '../HealthUnitList/HealthUnitList';

import "./ResultScreen.css";

import { useNavigate } from 'react-router-dom';


function ResultScreen() {
    const { status, setStatus } = useContext(StatusContext);
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);
    const [nearestLocation, setNearestLocation] = useState(null);

    const getUserLocation = () =>{

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError);

        }else{
            alert("Geolocalização não suportada");
        }
    }


    const locationSuccess = (position) =>{
        const userLat = position.coords.latitude;
        const userLong = position.coords.longitude;

        //Apenas para testes
        
        //UBS Vila Nery
        /*const userLat = -22.010318995262825;
        const userLong = -47.87149784815159;*/

        //UBS BotaFogo
        /*const userLat = -22.026661604076;
        const userLong = -47.91170491419172;*/

        //UBS Vila Isabel
        /*const userLat = -22.04355182186076;
        const userLong = -47.89198065554294;*/

        //UBS Cruzeiro do Sul
        /*const userLat = -22.044058241111408;
        const userLong = -47.88739238117056;*/

        //UPA Vila Prado
        /*const userLat = -22.03518009259666;
        const userLong = -47.89463413709031;*/
        
        //UPA Cidade Aracy
        /*const userLat = -22.0548204254841;
        const userLong = -47.91480755985185;*/
        
        //UPA Santa Felicia
        /*const userLat = -21.995810146004665;
        const userLong = -47.91817084668899;*/

        setLocation({
            latitude: userLat,
            longitude: userLong
        });

    }
    const locationError = () =>{
        alert("Não foi possível acessar a geolocalização");
    }

    useEffect(() =>{
        console.log("Location atualizada: " + location);
        console.log(location);
        if(location){

            //filtrando a lista de unidades para pegar apenas as unidades 
            //com o tipo correto (apenas UPAs ou apenas UBSs)
            const filteredUnits = status.unitList.filter(unit => unit.type === status.designatedUnitType);

            //lista so com as posicoes de cada unidade (latitude e longitude)
            const unitPositions = filteredUnits.map(unit => unit.position);
    
            //localizacao mais proixma
            const nearest = findNearest({latitude: location.latitude, longitude: location.longitude }, unitPositions, 1);
            
            //apenas a unidade cuja latitude e longitude foi considerada a mais proxima
            const nearestUnit = filteredUnits.filter(unit => unit.position === nearest);
            console.log(nearestUnit[0]);
            
            setNearestLocation(nearestUnit);
        }

    }, [location]);

    useEffect(() =>{

        if(!status.designatedUnitType){
            return navigate('/Sintomas');
        }

    }, [status.designatedUnitType]);

    useEffect(() =>{
        console.log("Unidade mais proxima");
        console.log(nearestLocation);

    }, [nearestLocation]);

    return (
        <>
        {nearestLocation ?

            <div className='list-container'>

                <div className='title-list-container'>
                    <h2>Você deve se dirigir à: </h2>
                </div>
                {
                //condicao que garante que a lista so sera passada quando estiver com o valor correto 
                nearestLocation && <HealthUnitList filteredList={nearestLocation} />
                }
            </div>
            :
            <>
            {status.designatedUnitType ?
                <div className="result-container">
                    <h1>Você deve se dirigir a uma:</h1>
                    <h1 className="result-title">{status.designatedUnitType}</h1>
                    <button className="option-button"> Já sei para qual {status.designatedUnitType} devo ir</button>
                    <button className="option-button" onClick={getUserLocation}> Não sei, preciso de uma sugestão</button>
                
                </div>

                :
                <div className="result-container">
                    <h1>Informe seus sintomas primeiro!</h1>
                </div>
            }
        
            </>
        }
        </>
    )
}

export default ResultScreen