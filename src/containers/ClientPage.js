import React from 'react';
import { Container } from 'semantic-ui-react';
import useFetch from '../customHooks/fetchHook';
import CrudElement from '../components/crudelement';

function ClientPage(props){

    const [response, loading, hasError] = useFetch("http://localhost:3001/clients/")
    
    return (
        <Container>
                Estas en Cliente CRUD de clientes 

   
    
        <>
            {loading ? 
                <div>Loading...</div> 
                : 
                (hasError 
                    ? 
                    <div>Error occured.</div> 
                    : 
                    (response ?
                        response.map(data => <CrudElement 
                                                id={data.id} 
                                                header={data.id} 
                                                primaryDescription={data.id}
                                                secundaryDescription={data.id}
                                                img={data.id}
                                            />
                                    )
                        :
                        <div>nose</div>
                    )
                )
            }
        </>
    
        </Container>
    )
}

export default ClientPage;