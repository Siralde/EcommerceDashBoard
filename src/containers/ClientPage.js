import React, { useCallback, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import useFetch from '../customHooks/fetchHook';
import { ReadElement, CreateElement, UpdateElement } from '../components/element';

const URL = "http://localhost:3001/clients/";

function ClientPage(){

    // async function deleteElement(url = '') {
    //     const response = await fetch(url, {
    //       method: 'DELETE', 
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //     });


    //     console.log(response.json());
    //     return response.json(); // parses JSON response into native JavaScript objects
    // }
    
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
        (url, id) => {

            console.log("Update");
            // fetch(url+id, {
            //     method: 'DELETE', 
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            // .then((res) => {
            //     res.json().then((data) => {
            //         setClients( clients.filter((client) => {
            //             return client.id !==id
            //         }))
            //     })
            // })
            // .catch(error => {console.log(error);
            // })
        }
        ,
        [clients]
    )

    return (
        <Container>
            
            <CreateElement updateElement={updateElement}/>
            
            {loading 
                ? 
                <div>Loading...</div> 
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
                        <div>Loading</div>
                    )
                ) 
            }
        </Container>
    )
}

export default ClientPage;