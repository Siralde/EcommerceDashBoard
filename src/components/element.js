import React, {useState} from 'react';
import Image from "../assets/images/conga1.png";
import Edit from "../assets/images/edit.png";
import Trash from "../assets/images/trash.png";
import Plus from "../assets/images/add.svg";
import Cancel from "../assets/images/cancel.png";
import Check from "../assets/images/check.png";

export function UpdateElement({id, header, primaryDescription, secundaryDescription, img, updateElement, url, setUpdate, products}) 
{
    
    const [allValues, setAllValues] = useState({
        id,
        full_name: header,
        email: primaryDescription,
        telephone: secundaryDescription,
        name: header,
        description: primaryDescription,
        price: secundaryDescription,
        img
    });

    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
    }

    return (
        <div className="crud_element">
            <form onSubmit={(event) => updateElement(event, url, id, allValues, setUpdate)}>
                <img src={Image} alt="" />
                <div className="crud_element_body">
                    <div>
                        <input 
                            name={products ? "name" : "full_name"}
                            defaultValue={header}
                            onChange={changeHandler}
                        /> 
                        <img src={Image} alt="@some_lego_guy" />
                    </div>
                    <div>
                        <input 
                            name={products ? "description" : "email"}
                            defaultValue={primaryDescription}
                            onChange={changeHandler}
                        />
                    </div>
                    <div>
                        <input 
                            name={products ? "price": "telephone" }
                            defaultValue={secundaryDescription}
                            onChange={changeHandler}
                        />
                    </div>
                    <div className="crud_element_interactions">    
                        <button type="submit"><img src={Check} alt="Check" /></button>
                        <img src={Cancel} alt="Cancel" onClick={() => setUpdate(false)}/>
                    </div>
                </div>
            </form>
        </div>
    )
};


export function CreateElement( {updateElement, products}) 
{
    const [update, setUpdate] = useState(false)

    return (
        <div>
            {update 
                ?
                <UpdateElement updateElement={updateElement} setUpdate={setUpdate} products={products}/>
                :
                (<div className="new_element">
                    <img src={Plus} alt="Plus" onClick={ () => { setUpdate(!update) } } />
                </div>
                )
            }
        </div>
    )
};

export function ReadElement({id, header, primaryDescription, secundaryDescription, img, updateElement, deleteElement, url, products}) 
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
                    setUpdate={setUpdate}
                    products={products}
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