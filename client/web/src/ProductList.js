import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap'

const ProductList = ({ products, title }) => {
    return (
        <div className="product-list">
            <h2>{ title }</h2>
            { products.map((product) =>
                <div className="product-preview" key={ product.id }>
                    {/*<Link to={`/product/${ product.id }`}>
                        <h2>{ product.name }</h2>
                        <p>$ { product.price }</p>
                        <p>{ product.active === 1 ? product.active = "Available" : product.active = "Not available" }</p>
            </Link>*/}
                    <Row>
                        <Col><h2>{ product.name }</h2></Col>
                        <Col><p>$ { product.price }</p></Col>
                        <Col><p>{ product.active === 1 ? product.active = "Available" : product.active = "Not available" }</p></Col>
                    </Row>
                    
                    
                </div>
            )}
        </div>
    );
}
 
export default ProductList;