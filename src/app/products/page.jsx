//Una via para consultar la base de datos
/*
import {conn} from "@/libs/mysql"

async function loadProducts(){
    const result = await conn.query('SELECT * FROM product');
    console.log(result);
}
function ProductsPage() {
    loadProducts();
  return (
    <div className="text-white">ProductsPage</div>
  )
}

export default ProductsPage
*/

import ProductCard from "@/components/ProductCard";
import axios from "axios";

async function loadProducts(){
    const {data} = await axios.get('http://localhost:3000/api/products');
    //console.log(res);
    return data;
}

async function ProductsPage(){
    const products = await loadProducts();
    //console.log(products);
    
    return  <div className="grid gap-4 grid-cols-4">
        {products.map(product => (
            <ProductCard product = {product} key = {product.id}/>
        ))}
    </div>;
}

export default ProductsPage;