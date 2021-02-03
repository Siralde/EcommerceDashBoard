import React from 'react';


function CrudElement({id, header, primaryDescription, secundaryDescription, img}) 
{
    return (
        <div>

            <div> {id} </div>

            <div> {header} </div>
            
            <div> {primaryDescription} </div>

            <div> {secundaryDescription} </div>

            <div>{img}</div>
        </div>
    )
};

export default CrudElement;