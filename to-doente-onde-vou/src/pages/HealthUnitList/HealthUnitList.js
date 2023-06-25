import React, { useContext, useEffect } from "react";
import { StatusContext } from "../../App.js";
import HealthUnitCard from "../../components/HealthUnitCard/HealthUnitCard.js";
import "./HealthUnitList.css";

function HealthUnitList({filteredList}) {
    const { status, setStatus } = useContext(StatusContext);

    useEffect(() => {
        console.log(filteredList);
    }, [filteredList]);

    return (
        <div className="unit-list-container">
            {filteredList.map((unit) => (
                <HealthUnitCard unit={unit} />
            ))}
        </div>
    )
}

export default HealthUnitList