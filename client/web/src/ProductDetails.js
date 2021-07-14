import { useParams } from "react-router-dom";
import useFetch from "./useFetch";

const ProductDetails = () => {
    const { id } = useParams()
    const url = "http://localhost:8080/product/" + id
    console.log(url)
    const { data: product, error, isPending } = useFetch(url);
    
    return (
        <div className="product-details">
            { isPending && <div>Loading</div> }
            { error && <div>{ error }</div>}
            { product && (
                <article>
                    <h2>{ product.name }</h2>
                    <p>$ { product.price }</p>
                    <p>{ product.active === 1 ? product.active = "Available" : product.active = "Not available" }</p>
                </article>
            )}
        </div>
    );
}
 
export default ProductDetails;