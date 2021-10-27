import e from "cors"
import { useEffect, useState } from "react"
import { useHistory } from "react-router"

const Home = () => {
    const [products, setProducts] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const history = useHistory()

    const handleDelete = (id) => {
        fetch("http://localhost:8080/product/" + id, {
            method: "DELETE"
        }).then(() => fetchData())
    }

    const openProduct = (id) => {
        // nyisson meg egy fület
        history.push(`/product/${id}`)
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
            {isPending && <div>Loading...</div>}
            {error && <div>{ error }</div>}
            <div id="products">
                {products && products.map(product => (
                    <div id="product" key={product.id}>
                        <h2>{product.name}</h2>
                        <h3>{product.price}</h3>
                        <p>{ product.active === 1 ? "Available" : "Not available" }</p>
                        
                        <button onClick={() => handleDelete(product.id)}className="btn btn-danger">Delete</button>
                    </div>
                ))}
            </div>

        </div>
    )
}
 
export default Home;