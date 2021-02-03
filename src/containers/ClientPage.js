import React, { useState } from 'react';
import { Container } from 'semantic-ui-react';
import useFetch from '../customHooks/fetchHook';
import { CrudElement, CreateElement, UpdateElement } from '../components/crudelement';




function ClientPage(props){

    const [response, loading, hasError] = useFetch("http://localhost:3001/clients/")

    const [edit, setEdit] = useState(false)
    
    return (
        <Container>
            Estas en Cliente CRUD de clientes 


            { edit 
                ? 
                <UpdateElement/>
                : 
                <CreateElement edit={edit} setEdit={setEdit}/>
            }

            {loading 
                ? 
                <div>Loading...</div> 
                : 
                (hasError 
                    ? 
                    <div>Error occured.</div> 
                    : 
                    (response ?
                        response.map(data => <CrudElement 
                                                key={data.id}
                                                id={data.id} 
                                                header={data.full_name} 
                                                primaryDescription={data.email}
                                                secundaryDescription={data.telephone}
                                                img={data.id}
                                            />
                                    )
                        :
                        <div>Loading</div>
                    )
                )
            }
        
    
        </Container>
    )
}

export default ClientPage;