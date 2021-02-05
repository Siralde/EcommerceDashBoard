import React, {useState, useEffect, useCallback} from 'react';
import { Container } from 'semantic-ui-react';
import { listProducts } from '../graphql/queries';
import {
  DeleteProduct,
  UpdateProduct,
  CreateProduct,
} from '../graphql/mutations';
import { CreateElement, ReadElement } from '../components/element';


function ProductPageG(props){
    
    const [products, setProducts] = useState();
    
    const [allValues, setAllValues] = useState({
        loading: false,
        hasError: '' ,
    });
    

    const getProducts = () => {
        setAllValues({loading:true})

        fetch('http://localhost:9002/graphql', {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify({
            query: listProducts,
          }),
        }).then((res) =>
          res.json().then((data) => {
            setProducts(data.data.listProducts);
            setAllValues({loading:false})

          }),
        ).catch( err => setAllValues({loading:false, hasError:err}));
    }; 

    useEffect( () => { getProducts() }, []);


    const deleteElement = useCallback(
        (url, id) => {
          fetch('http://localhost:9002/graphql', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({
              query: DeleteProduct,
              variables: {id: id},
            }),
          })
            .then((res) => {
              res.json().then((data) => {
                setProducts(
                  products.filter((product) => {
                    return product.id !== id;
                  }),
                );
              });
            })
            .catch((error) => {
              console.log(error);
            });
        },
        [products],
    );
    
        

    
    return (
        <Container>

        {/* <CreateElement updateElement={updateElement} products={true}/> */}

    
        <>
            {allValues.loading ? 
                <div>Loading...</div> 
                : 
                (allValues.hasError 
                    ? 
                    <div>Error occured.</div> 
                    : 
                    (products ?
                        products.map(data => <ReadElement 
                                                key={data.id}
                                                id={data.id} 
                                                header={data.name} 
                                                primaryDescription={data.description}
                                                secundaryDescription={data.price}
                                                img={data.img}
                                                deleteElement={deleteElement}
                                                // updateElement={updateElement}
                                                url={URL}
                                                products={true}
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