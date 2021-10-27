import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [active, setActive] = useState()
    const [isPending, setIsPending] = useState()
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
        <div>
            <button className="btn btn-primary" onClick={history.goBack}>Back</button>
            <div id="product-details">
                <form>
                    <label htmlFor="inputName">Name</label><br />
                    <input type="text" id="inputName" value={name} onChange={(e) => setName(e.target.value)} /><br />

                    <label htmlFor="inputPrice">Price</label><br />
                    <input type="number" id="inputPrice" value={price} onChange={(e) => setPrice(e.target.value)} /><br />

                    <label htmlFor="inputActive">Activity</label>
                    <input type="checkbox" id="inputActive" onChange={(e) => setActive(e.target.checked)}/>
                    <br />

                    { !isPending && <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Add product</button> }
                    { isPending && <button className="btn btn-primary" type="submit" disabled>Adding product...</button> }
                </form>
            </div>
        </div>
    )
}
 
export default Create;