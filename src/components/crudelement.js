import React from 'react';
import Image from "../assets/images/conga1.png";
import Edit from "../assets/images/edit.png";
import Trash from "../assets/images/trash.png";
import Plus from "../assets/images/add.svg";

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
                    <img src={Edit} alt="Check" />
                </div>
            </div>
        </div>
    )
};


export function CreateElement({edit, setEdit}) 
{
    return (
        <div className="new_element">
            <img src={Plus} alt="Plus" onClick={ () => { setEdit(!edit) } } />
        </div>
    )
};

export function CrudElement({id, header, primaryDescription, secundaryDescription, img}) 
{
    return (
        <div className="crud_element">
            <img src={Image} alt="" />
            <div className="crud_element_body">
                <div>
                    <p>{header}</p> 
                    <img src={Image} alt="@some_lego_guy" />
                </div>

                <p>{primaryDescription} </p>
                <p>{secundaryDescription} </p>

                <div className="crud_element_interactions">    
                    <img src={Edit} alt="Edit" />
                    <img src={Trash} alt="Trash" />
                </div>
            </div>
        </div>
    )
};