import React from 'react';
import "./Home.css";


import { useNavigate } from 'react-router-dom';
import heart_icon from "../../assets/icon/heart_icon.png";

function Home() {
  const navigate = useNavigate();
  const click_in = () =>{
    return navigate ('/Sintomas');
  
  }

  return (
    <div id="Home">

      <section id="Title">
        
        <div id="image_container">
          <img id="image_heart" src = {heart_icon}></img>
        </div>
        <p id="title_text">

          <p id="title_text_1"> To doente, </p>
          <p id="title_text_2"> Onde vou </p>

        </p>

      </section>



      <button id="button_in" onClick={click_in} >Entrar</button>



    </div>
    )
}




export default Home