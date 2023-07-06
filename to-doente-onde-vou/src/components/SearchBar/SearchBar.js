import React, { useState } from "react";
import './SearchBar.css';
import { IconContext } from "react-icons";
import { BiSearchAlt2 } from "react-icons/bi";

function SearchBar({handleSearch, emptyInput}) {
    const [inputData, setInputData] = useState("");

    const handleInputChange = (e) => {
        setInputData(e.target.value);

        if(e.target.value === ""){
            emptyInput();
        }
    };


    const handleSearchClick = () => {
        handleSearch(inputData);
    };
    
    return ( 
        <div className="search-container">
            <div className="search-container-child">
                <div className="search-input-container">
                    <input
                        onChange={handleInputChange}
                        value={inputData}
                        className="search-input"
                        type="text" 
                    />
                    <div className="search-icon-container">
                        <IconContext.Provider 
                            value={{ className: "search-icon", size: 30 }}>
                            <BiSearchAlt2 onClick={handleSearchClick}/>
                        </IconContext.Provider> 
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SearchBar