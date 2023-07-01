import React from 'react';
import "./sos_button.css";


import { useNavigate } from 'react-router-dom';

function SOS_Button() {

    const navigate = useNavigate();
    const goSOS = () => {
        //Desativar botão do SOS

        //Colocar divs  na frente 
    }


    return (
        <div id="sos_button">

            <button id="container_sos_button" /* onClick={goSOS} */ >SOS</button>

        </div>
    )

}




export default SOS_Button