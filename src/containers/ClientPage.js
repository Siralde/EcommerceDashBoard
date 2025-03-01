import React, { useCallback, useEffect, useState } from 'react';
import useFetch from '../customHooks/fetchHook';
import { LoadingElement, ReadElement, CreateElement } from '../components/element';

const URL = "http://localhost:3001/clients/";

function ClientPage(){
    
    const [response, loading, hasError] = useFetch(URL)

    const [clients, setClients] = useState(response);

    useEffect( () => { setClients(response) }, [response]);

    const deleteElement = useCallback(
        (url, id) => {
            fetch(url+id, {
                method: 'DELETE', 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                res.json().then((data) => {
                    setClients( clients.filter((client) => {
                        return client.id !==id
                    }))
                })
            })
            .catch(error => {console.log(error);
            })
        },
        [clients]
    )
    
    const updateElement = useCallback(
        
        (event, url, id, data, setUpdate) => {
            event.preventDefault();

            if(id)
            {
                fetch(url+id, {
                    method: 'PUT', 
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then((res) => {

                    let index = -1;

                    clients.some((client) => {
                    
                        if (client.id === id) 
                        {
                            index = clients.indexOf(client);
                            return true;
                        }
                        else 
                        {
                            return false;
                        }
                    });
                    clients[index] = data;
                    setClients([...clients]);
                    setUpdate(false);
                })
                .catch(error => {console.log(error);})

            }
            else
            {
                const lastClient = clients[clients.length - 1]
                let newID;
                lastClient ? newID = lastClient.id + 1 : newID = 1;
                
                data.id = newID;
                fetch(URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                }).then(response => response.json())
                .then(json => {
                    console.log(json);                    
                    setClients([...clients, data])
                    setUpdate(false);
                })
            }
        }
        ,
        [clients]
    )

    return (
        <div className="flex-container">
            
            <CreateElement updateElement={updateElement}/>
            
            {loading 
                ? 
                <LoadingElement/>
                :
                (hasError 
                    ? 
                    <div>Error occured.</div> 
                    : 
                    (clients 
                        ?
                        clients.map((data, index) => {              
                            return (
                                <ReadElement 
                                    key={index}
                                    id={data.id} 
                                    header={data.full_name} 
                                    primaryDescription={data.email}
                                    secundaryDescription={data.telephone}
                                    img={data.id}
                                    deleteElement={deleteElement}
                                    updateElement={updateElement}
                                    url={URL}
                                />
                            )
                        })
                        :
                        <LoadingElement/>
                    )
                ) 
            }
        </div>
    )
}

export default ClientPage;