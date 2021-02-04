import React from 'react';
import { Container } from 'semantic-ui-react';
import useFetch from '../customHooks/fetchHook';
import { ReadElement } from '../components/element';

function ProductPageG(props){
  
    const [response, loading, hasError] = useFetch("http://localhost:3001/products/")
    
    return (
        <Container>
                Estas en Product CRUD de clientes 

   
    
        <>
            {loading ? 
                <div>Loading...</div> 
                : 
                (hasError 
                    ? 
                    <div>Error occured.</div> 
                    : 
                    (response ?
                        response.map(data => <ReadElement 
                                                key={data.id}
                                                id={data.id} 
                                                header={data.name} 
                                                primaryDescription={data.description}
                                                secundaryDescription={data.price}
                                                img={data.img}
                                            />
                                    )
                        :
                        <div>Loading</div>
                    )
                )
            }
        </>
    
        </Container>
    )
}

export default ProductPageG;