import React, { useEffect, useContext, useState } from "react";
import { StatusContext } from "../../App.js";
import SearchBar from '../../components/SearchBar/SearchBar'
import Areas from "../../components/Areas/Areas";
import Button from "../../components/Button/Button";
import HealthUnitList from '../HealthUnitList/HealthUnitList';
import "./ListAreaScreen.css"; 

function ListAreaScreen() {
    const { status, setStatus } = useContext(StatusContext);
    const [filteredList, setFilteredList] = useState();
    const [selectedArea, setSelectedArea] = useState(null);

    const areas = [
        //lista pre-definida de livros
        {
            id: 1,
            name: 'Parque Arnold Schimidt',
            UBS: 'UBS Sta Paula Dr. Arsenio Agnesine',
            UPA: 'UPA da Santa Felícia',
        },
        {
            id: 2,
            name: 'Cidade Aracy',
            UBS: "UBS Aracy Ernesto Pereira Lopes",
            UPA: "UPA do Cidade Aracy",
        },
        {
            id: 3,
            name: 'Vila Boa Vista 1',
            UBS: 'UBS Redenção Dr. Lauro Corsi',
            UPA: 'UPA da Vila Prado',
        },
        {
            id: 4,
            name: 'Jardim Botafogo 1',
            UBS: 'UBS Botafogo Valeria De Cibelli',
            UPA: 'UPA da Vila Prado',
        },
        {
            id: 5,
            name: 'Jardim Botafogo 1',
            UBS: 'UBS Botafogo Valeria De Cibelli',
            UPA: 'UPA da Vila Prado',
          }
    ];
  
    const [areaList, setAreaList] = useState(areas);
  
    const handleSearch = (searched_word) => {
      console.log("App.jsx -> handleSearch: " + searched_word);
      const match_areaList = searchArea(searched_word);
      setAreaList(match_areaList);
    };
  
    const emptyInput = () => {
      setAreaList(areas);
    };
  
    const searchArea = (keyword) => {
      const searchTerm = keyword.toLowerCase()
      //retorna o array, porem apenas com os livros que 'batem' com o que foi pedido
      return areas.filter(value => {
        //itera por todos os objetos do array de livros e so retorna os que dao match com
        //a palavra buscada
        return (value.name.toLowerCase().includes(searchTerm));
      });
    };

    const showUnit = () => {
      setSelectedArea(areaList[0]);
    };

    useEffect(() =>{
      
      if(selectedArea){
        let condition = selectedArea.UBS;
  
        if(status.designatedUnitType === "UPA"){
          condition = selectedArea.UPA;
        }
        setFilteredList(status.unitList.filter(unit => unit.name === condition));
      }

    }, [selectedArea]);

  return (
        <>
        {
          //condicao que garante que a lista so sera passada quando estiver com o valor correto 
          filteredList ?
            <HealthUnitList filteredList={filteredList} />
          :
          <div className="list-area-container">
            <div className="search-area-container">
              <h1>Selecione o Bairro em que mora:</h1>
              <SearchBar handleSearch={handleSearch} emptyInput={emptyInput}/>
              <div className="area-list-container">
                <Areas areas={areaList} />
              </div>
              <Button onClick={showUnit}> Continuar </Button>
            </div>
          </div>
        }
        </>
    
  )
}

export default ListAreaScreen