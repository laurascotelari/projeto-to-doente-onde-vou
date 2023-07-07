import React, { useContext } from 'react';
import { StatusContext } from "../../App.js";
import img_document from '../../assets/img/rg.png';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import "./GuidelineScreen.css";
import SOSButton from '../../components/SOSButton/SOSButton.js';

function GuidelineScreen() {
    const { status, setStatus } = useContext(StatusContext);
    const navigate = useNavigate();

    const goToLandingPage = () =>{
        return navigate('/');
    }

    return (
        <div className='guideline-container'>
            <div className='unit-guideline-container'>
                <div className='unit-img-container'>
                    <img src={status.selectedUnit.img}/>
                </div>

                <div className='unit-info-container'>
                    <h2 className='unit-info-name'>{status.selectedUnit.name}</h2>
                    <hr/>
                    <p><span>Endereço:</span> {status.selectedUnit.address}</p>
                    <p><span>Telefone:</span> {status.selectedUnit.phone}</p>
                    <br/>
                </div>
            </div>

            <p className='guideline-text'> Agora é só se dirigir à {status.selectedUnit.type} acima e passar pela triagem, 
                porém não se esqueça de levar: 
            </p>

            <div className='documents-container'>
            <img src={img_document}/>

            <ul>
                <li>Documento com Foto</li>
                <li>Comprovante de Endereço</li>
            </ul>

            </div>
            <div className='button-guideline-container'>
                <Button onClick={goToLandingPage}> Finalizar </Button>

            </div>

            <SOSButton />

        </div>
    );
}

export default GuidelineScreen