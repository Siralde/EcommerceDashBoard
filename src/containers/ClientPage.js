import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import useFetch from '../customHooks/fetchHook';
import { ReadElement, CreateElement, UpdateElement } from '../components/element';

function ClientPage(){

    const [response, loading, hasError] = useFetch("http://localhost:3001/clients/")
    
    return (
        <Container>
            
            <CreateElement/>
            
            {loading 
                ? 
                <div>Loading...</div> 
                : 
                (hasError 
                    ? 
                    <div>Error occured.</div> 
                    : 
                    (response 
                        ?
                        response.map((data, index) => {              
                            return (
                                <ReadElement 
                                    key={index}
                                    id={data.id} 
                                    header={data.full_name} 
                                    primaryDescription={data.email}
                                    secundaryDescription={data.telephone}
                                    img={data.id}
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