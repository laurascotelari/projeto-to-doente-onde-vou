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
        
        //UBS Vila Nery
        /*const userLat = -22.010318995262825;
        const userLong = -47.87149784815159;*/

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
            //pegando uma lista so com as posicoes de cada unidade (latitude e longitude)
            const unitPositions = status.unitList.map(unit => unit.position);
    
            //localizacao mais proixma
            const nearest = findNearest({latitude: location.latitude, longitude: location.longitude }, unitPositions, 1);
      
            const nearestUnit = status.unitList.filter(unit => unit.position === nearest);
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