import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [active, setActive] = useState('levi');
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
            <h2>Add new product</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label>Price:</label>
                <input
                    type="number"
                    min="0"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}        
                />

                <label>Active:</label>
                <select
                    value={active}
                    onChange={(e) => setActive(e.target.value)}
                >
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
                </select>
                { !isPending && <button>Add product</button> }
                { isPending && <button disabled>Adding product...</button> }
            </form>
        </div>
    )
}
 
export default Create;