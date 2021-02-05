
export const DeleteProduct = `mutation DeleteProduct($id: ID!){
  deleteProduct(id:$id){
    id
  }
}`;

export const UpdateProduct = `mutation updateProduct($id: ID!, $productInputModel: ProductInputModel!){
  updateProduct(id:$id, productInputModel: $productInputModel){
    id
    name
    description
    price
    image
  }
}`;

export const CreateProduct = `mutation createProduct($productInputModel: ProductInputModel!){
  createProduct(productInputModel: $productInputModel){
    id
    name
    description
    price
    image
  }
}`;
