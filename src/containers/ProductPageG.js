import React, {useState, useEffect, useCallback} from 'react';
import { listProducts } from '../graphql/queries';
import {
  DeleteProduct,
  UpdateProduct,
  CreateProduct,
} from '../graphql/mutations';
import { LoadingElement, CreateElement, ReadElement } from '../components/element';


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
  
  const updateElement = useCallback(
    (event, url, id, data, setUpdate) => {
      event.preventDefault();
      
      let updatedProduct = {};
      updatedProduct.name = data.name;
      updatedProduct.description = data.description;
      updatedProduct.price = data.price;

      console.log(data)

      fetch('http://localhost:9002/graphql', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          query: UpdateProduct,
          variables: {
            id: id,
            productInputModel: updatedProduct,
          },
        }),
      })
        .then((res) => {
          res.json().then((data) => {
            let index = -1;

            products.some((prod) => {
              if (prod.id === id) {
                index = products.indexOf(prod);
                return true;
              } else {
                return false;
              }
            });

            updatedProduct.id = id;
            updatedProduct.img = data.img;
            //ALWAYS GONNA FIND AN INDEX THAT MATCHES.
            products[index] = updatedProduct;
            setProducts([...products]);
            setUpdate(false);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [products],
  );
  
  const createElement = useCallback(
    (event, url, id, data, setUpdate) => {
      event.preventDefault();

      let newProduct = {};
      newProduct.name = data.name;
      newProduct.description = data.description;
      newProduct.price = data.price;
      console.log(newProduct)

      fetch('http://localhost:9002/graphql', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
          query: CreateProduct,
          variables: {
            productInputModel: newProduct ,
          },
        }),
      })
        .then((res) => {
          res.json().then((pro) => {
            newProduct.id = pro.data.createProduct.id;
            newProduct.img = pro.data.createProduct.img;
            
            console.log(pro.data.createProduct);
            setProducts([...products, newProduct]);
            setUpdate(false);
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [products],
  );


    
  return (
    <div className="flex-container">

      <CreateElement updateElement={createElement} products={true}/>

      <>
          {allValues.loading ? 
              <LoadingElement/>
              : 
              (allValues.hasError 
                  ? 
                  <div>Error occured.</div> 
                  : 
                  (products ?
                      products.map( (data, index) => <ReadElement 
                                              key={index}
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

export default ProductPageG;