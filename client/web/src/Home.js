import { useEffect, useState } from "react"

const Home = () => {
    const [products, setProducts] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    const handleDelete = (id) => {
        fetch("http://localhost:8080/product/" + id, {
            method: "DELETE"
        }).then(() => fetchData())
    }

    const updateForm = (id) => {
        // nyisson meg egy fület
        
    }

    const fetchData = () => {
        fetch("http://localhost:8080/product")
        .then(res => {
            if (!res.ok)
                throw Error("Server error!")
            return res.json()
        })
        .then(data => {
            setProducts(data)
            setIsPending(false)
            setError(null)
        })
        .catch(err => {
            setError(err.message)
            setIsPending(false)
        })
    }

    const handleRefresh = () => {
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])
    
    return (
        <div className="home">
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            <div id="products">
                {products && products.map(product => (
                    <div id="product" key={product.id}>
                        {/*<p>{product.id} - {product.name} - {product.price}</p>
                        {<button onClick={() => handleDelete(product.id)}>Delete</button>*/}
                        <h2>{product.name}</h2>
                        <h3>{product.price}</h3>
                        <button onClick={() => updateForm(product.id)} className="btn btn-primary">Update</button>
                        <button onClick={() => handleDelete(product.id)}className="btn btn-danger">Delete</button>
                    </div>
                ))}
            </div>

        </div>
    )
}
 
export default Home;