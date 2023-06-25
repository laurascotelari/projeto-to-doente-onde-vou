import React, { useContext } from "react";
import { StatusContext } from "../../App.js";
import HealthUnitCard from "../../components/HealthUnitCard/HealthUnitCard.js";
import "./HealthUnitList.css";

function HealthUnitList() {
    const { status, setStatus } = useContext(StatusContext);

    return (
        <div className="unit-list-container">
            {status.unitList.map((unit) => (
                <HealthUnitCard unit={unit} />
            ))}
        </div>
    )
}

export default HealthUnitList