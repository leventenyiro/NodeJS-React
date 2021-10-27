import { useState } from "react";
import { useHistory } from "react-router";
import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'

const Create = () => {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [active, setActive] = useState();
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const product = { name, price, active };

        setIsPending(true);

        fetch('http://localhost:8080/product', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        }).then(() => {
            setIsPending(false);
            history.push("/");
        })        
    }

    return (
        <div className="create">
            <Container>
            <h2>Add new product</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control 
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="number"
                            min="0"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}        
                        />
                    </Form.Group>
                    
                    <Form.Group>
                        <Form.Label>Active:</Form.Label>
                        <Form.Control
                            as="select"
                            value={active}
                            onChange={(e) => setActive(e.target.value)}
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </Form.Control>
                    </Form.Group>

                    { !isPending && <button variant="primary" type="submit">Add product</button> }
                    { isPending && <button variant="primary" type="submit" disabled>Adding product...</button> }
                    
                    
                </Form>
            </Container>

        </div>
    )
}
 
export default Create;