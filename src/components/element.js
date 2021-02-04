import React, {useState} from 'react';
import Image from "../assets/images/conga1.png";
import Edit from "../assets/images/edit.png";
import Trash from "../assets/images/trash.png";
import Plus from "../assets/images/add.svg";
import Cancel from "../assets/images/cancel.png";
import Check from "../assets/images/check.png";

export function UpdateElement() 
{
    return (
        <div className="crud_element">
            <img src={Image} alt="" />
                <div className="crud_element_body">
                <div>
                    <input></input> 
                    <img src={Image} alt="@some_lego_guy" />
                </div>

                <input></input>
                <input></input>

                <div className="crud_element_interactions">    
                    <img src={Check} alt="Check" />
                    <img src={Cancel} alt="Check" />
                </div>
            </div>
        </div>
    )
};


export function CreateElement() 
{
    const [update, setUpdate] = useState(false)


    return (
        <div>

            {update 
                ?
                <UpdateElement/>
                :
                (<div className="new_element">
                    <img src={Plus} alt="Plus" onClick={ () => { setUpdate(!update) } } />
                </div>
                )
            }
        </div>
    )
};

export function ReadElement({id, header, primaryDescription, secundaryDescription, img}) 
{

    const [update, setUpdate] = useState(false)

    return (
        <div>

            {update 
                ?
                <UpdateElement/>
                :
                (<div className="crud_element">
                    <img src={Image} alt="" />
                    <div className="crud_element_body">
                        <div>
                            <p>{header}</p> 
                            <img src={Image} alt="@some_lego_guy" />
                        </div>

                        <p>{primaryDescription} </p>
                        <p>{secundaryDescription} </p>

                        <div className="crud_element_interactions">  
                        
                            <img src={Edit} alt="Edit" onClick={() => setUpdate(!update)}/>
                            <img src={Trash} alt="Trash"/>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
};