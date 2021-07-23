import { useHistory, useParams } from "react-router-dom";

const ProductDetails = () => {
    /*const { id } = useParams()
    const url = "http://localhost:8080/product/" + id
    const { data: product, error, isPending } = useFetch(url);
    const history = useHistory()
    
    const handleClick = () => {
        const url = "http://localhost:8080/product/" + product.id
        console.log(url)
        fetch(url, {
            method: "DELETE"
        }).then(() => {
            history.push("/");
        })
    }

    return (
        <div className="product-details">
            { isPending && <div>Loading</div> }
            { error && <div>{ error }</div>}
            { product && (
                <article>
                    <h2>{ product.name }</h2>
                    <p>$ { product.price }</p>
                    <p>{ product.active === 1 ? product.active = "Available" : product.active = "Not available" }</p>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    );*/
}
 
export default ProductDetails;