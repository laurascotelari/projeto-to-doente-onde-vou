import React from 'react';
import "./Area.css";

function Area({area}) {
    return (
        <>
            <div className="area-container">
                <h3>{area.name}</h3> 
            </div>
        </> 
     );
}

export default Area