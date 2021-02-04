import React, {useState} from 'react';
import Image from "../assets/images/conga1.png";
import Edit from "../assets/images/edit.png";
import Trash from "../assets/images/trash.png";
import Plus from "../assets/images/add.svg";
import Cancel from "../assets/images/cancel.png";
import Check from "../assets/images/check.png";

export function UpdateElement({id, header, primaryDescription, secundaryDescription, img, updateElement, url, cancelUpdate}) 
{
    return (
        <div className="crud_element">
            <img src={Image} alt="" />
                <div className="crud_element_body">
                <div>
                    <input defaultValue={header}></input> 
                    <img src={Image} alt="@some_lego_guy" />
                </div>
                <input defaultValue={primaryDescription}></input>
                <input defaultValue={secundaryDescription}></input>

                <div className="crud_element_interactions">    
                    <img src={Check} alt="Check" onClick={()=> updateElement(url, id)} />
                    <img src={Cancel} alt="Cancel" onClick={() => cancelUpdate(false)}/>
                </div>
            </div>
        </div>
    )
};


export function CreateElement( {updateElement}) 
{
    const [update, setUpdate] = useState(false)

    return (
        <div>
            {update 
                ?
                <UpdateElement updateElement={updateElement} cancelUpdate={setUpdate}/>
                :
                (<div className="new_element">
                    <img src={Plus} alt="Plus" onClick={ () => { setUpdate(!update) } } />
                </div>
                )
            }
        </div>
    )
};

export function ReadElement({id, header, primaryDescription, secundaryDescription, img, updateElement, deleteElement, url}) 
{

    const [update, setUpdate] = useState(false)

    return (
        <div>
            {update 
                ?
                <UpdateElement
                    id={id} 
                    header={header} 
                    primaryDescription={primaryDescription}
                    secundaryDescription={secundaryDescription}
                    img={id}
                    updateElement={updateElement}
                    url={url}
                    cancelUpdate={setUpdate}
                />  
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
                            <img src={Trash} alt="Trash" onClick={() => deleteElement(url, id)}/>
                        </div>
                    </div>
                </div>)
            }
        </div>
    )
};