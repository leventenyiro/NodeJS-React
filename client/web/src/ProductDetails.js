import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams()
    const url = "http://localhost:8080/product/" + id
    //const { data: product, error, isPending } = useFetch(url);
    const [product, setProduct] = useState(null)
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)
    const history = useHistory()

    const fetchData = () => {
        fetch(url)
        .then(res => {
            if (!res.ok)
                throw Error("Server error!")
            return res.json()
        })
        .then(data => {
            setProduct(data)
            setIsPending(false)
            setError(null)
        })
        .catch(err => {
            setError(err.message)
            setIsPending(false)
        })
    }
    
    const handleDelete = () => {
        const url = "http://localhost:8080/product/" + product.id
        console.log(url)
        fetch(url, {
            method: "DELETE"
        }).then(() => {
            history.push("/");
        })
    }

    useEffect(() => {
        fetchData()
    })

    return (
        <div id="product-details">
            { isPending && <div>Loading</div> }
            { error && <div>{ error }</div>}
            { product && (
                <article>
                    <h2>{ product.name }</h2>
                    <p>{ product.price } Ft</p>
                    <p>{ product.active === 1 ? product.active = "Available" : product.active = "Not available" }</p>
                    <button onClick={handleDelete}>Delete</button>
                </article>
            )}
        </div>
    );
}
 
export default ProductDetails;