import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../../App.js";
import "./ResultScreen.css";

import { useNavigate } from 'react-router-dom';


function ResultScreen() {
    const { status, setStatus } = useContext(StatusContext);
    const navigate = useNavigate();
    const [location, setLocation] = useState(null);

    const getUserLocation = () =>{

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(locationSuccess, locationError);

        }else{
            alert("Geolocalização não suportada");
        }

    }

    const locationSuccess = (position) =>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        alert(`Latitude: ${latitude}, Longitude: ${longitude}`);

        setLocation({
            lat: latitude,
            long: longitude
        });

        return navigate('/HealthUnitList');

    }
    const locationError = () =>{
        alert("Não foi possível acessar a geolocalização");
    }

    useEffect(() =>{

        if(!status.designatedUnitType){
            return navigate('/Sintomas');
        }

    }, [status.designatedUnitType]);

    return (
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
    )
}

export default ResultScreen