import React from 'react';
import Area from "../Area/Area";

function Areas({areas}) {
    return ( 
        <div>
            {areas.map((area) => (
                <Area area={area}/>
            ))}
        </div>
     );
}

export default Areas