import React, {useState, useEffect, useCallback} from 'react';
import useFetch from '../customHooks/fetchHook';
import { LoadingElement, CreateElement, ReadElement } from '../components/element';

const URL = "http://localhost:3001/products/";


function ProductPageJ(){
  
    const [response, loading, hasError] = useFetch(URL)

    const [products, setProducts] = useState(response);

    useEffect( () => { setProducts(response) }, [response]);

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
                    setProducts( products.filter((prod) => {
                        return prod.id !==id
                    }))
                })
            })
            .catch(error => {console.log(error);
            })
        },
        [products]
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

                    products.some((product) => {
                    
                        if (product.id === id) 
                        {
                            index = products.indexOf(product);
                            return true;
                        }
                        else 
                        {
                            return false;
                        }
                    });
                    products[index] = data;
                    setProducts([...products]);
                    setUpdate(false);
                })
                .catch(error => {console.log(error);})
            }
            else
            {
                const lastProduct = products[products.length - 1]
                let newID;
                lastProduct ? newID = lastProduct.id + 1 : newID = 1;
                
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
                    setProducts([...products, data])
                    setUpdate(false);
                })
            }
        }
        ,
        [products]
    )
    
    return (
    
        <div className="flex-container">

        <CreateElement updateElement={updateElement} products={true}/>

    
        <>
            {loading ? 
                <LoadingElement/> 
                : 
                (hasError 
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
                                                updateElement={updateElement}
                                                url={URL}
                                                products={true}
                                            />
                                    )
                        :
                        <LoadingElement/>
                    )
                )
            }
        </>
    
        </div>
    )
}

export default ProductPageJ;
