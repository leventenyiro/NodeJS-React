import { useEffect, useState } from "react"
//import ProductList from "./ProductList"
import useFetch from "./useFetch"

const Home = () => {
    const { data: prod, isPending, error } = useFetch("http://localhost:8080/product")
    const [products, setProducts] = useState(null)
    if (prod && products == null)
        setProducts(prod)

    const handleDelete = (id) => {
        fetch("http://localhost:8080/product/" + id, {
            method: "DELETE"
        }).then(() => {
            const newProducts = products.filter(product => product.id !== id)
            setProducts(newProducts)
        })
    }

    useEffect(() => {}, [products])
    
    return (
        <div className="home">
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {/*products && <ProductList products={products} handleDelete={handleDelete}/>*/}
            {products && products.map(product => (
                <div key={product.id}>
                    <p>{product.id} - {product.name} - {product.price}</p>
                    {<button onClick={() => handleDelete(product.id)}>Delete</button>}
                </div>
            ))}
        </div>
    )
}
 
export default Home;