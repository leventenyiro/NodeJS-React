import ProductList from './ProductList';
import useFetch from './useFetch';

const Home = () => {
    const {data: products, isPending, error} = useFetch("http://localhost:8080/product")
    //console.log(products)
    
    return (
        <div className="home">
            {error && <div>{ error }</div>}
            {isPending && <div>Loading...</div>}
            {products && <ProductList products={products} title="All products" />}
        </div>
    );
}
 
export default Home;