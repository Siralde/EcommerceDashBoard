import React, {useState} from 'react';
import ProductImage from "../assets/images/conga1.png";
import ProfileImage from "../assets/images/profile.png";
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
                <img src={products ? ProductImage : ProfileImage} alt="" />
                <div className="crud_element_body">
                    <div>
                        <input 
                            name={products ? "name" : "full_name"}
                            placeholder={products ? "Name" : "Full Name"}
                            defaultValue={header}
                            onChange={changeHandler}
                            required
                        /> 
                        <img src={products ? ProductImage : ProfileImage}  alt="@some_lego_guy" />
                    </div>
                    <div>
                        <input 
                            name={products ? "description" : "email"}
                            placeholder={products ? "Description" : "Email"}
                            defaultValue={primaryDescription}
                            onChange={changeHandler}
                            required
                        />
                    </div>
                    <div>
                        <input 
                            name={products ? "price": "telephone" }
                            placeholder={products ? "Price": "Telephone" }
                            defaultValue={secundaryDescription}
                            onChange={changeHandler}
                            require
                        />
                    </div>
                    <div className="crud_element_interactions" style={styling}>    
                        <button type="submit" style={mySummitButton}><img src={Check} alt="Check" /></button>
                        <img src={Cancel} alt="Cancel" onClick={() => setUpdate(false)}/>
                    </div>
                </div>
            </form>
        </div>
    )
};

const mySummitButton = {
    color: "inherit",
    background: "none",
    border: "none",
    padding: "0",
    font: "inherit",
    cursor: "pointer",
    outline: "inherit"
};

const styling = {
    marginTop: "3px"
}

export function CreateElement( {updateElement, products}) 
{
    const [update, setUpdate] = useState(false)

    return (
        <>
            {update 
                ?
                <UpdateElement updateElement={updateElement} setUpdate={setUpdate} products={products}/>
                :
                (<div className="new_element">
                    <img src={Plus} alt="Plus" onClick={ () => { setUpdate(!update) } } />
                </div>
                )
            }
        </>
    )
};

export function ReadElement({id, header, primaryDescription, secundaryDescription, img, updateElement, deleteElement, url, products}) 
{

    const [update, setUpdate] = useState(false)

    return (
        <>
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
                    <img src={products ? ProductImage : ProfileImage}  alt="" />
                    <div className="crud_element_body">
                        <div>
                            <p>{header}</p> 
                            <img src={products ? ProductImage : ProfileImage}  alt="@some_lego_guy" />
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
        </>
    )
};

export function LoadingElement({id, header, primaryDescription, secundaryDescription, img, updateElement, deleteElement, url, products}) 
{
    return (
        <div className="new_element">
            <img className="spinning" src={Plus} alt="Plus" />
        </div>
    )
};