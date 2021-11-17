import e from "cors";
import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [active, setActive] = useState('')
    const [image, setImage] = useState('')
    const [isPending, setIsPending] = useState()
    const history = useHistory();

    const handleSubmit = (e) => {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('active', active)
        formData.append('image', image)

        setIsPending(true);

        fetch('http://localhost:8080/product', {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        }).then(() => {
            setIsPending(false);
            history.push("/");
        })        
    }

    const handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={history.goBack}>Back</button>
            <div id="product-details">
                <form>
                    <label htmlFor="inputName">Name</label><br />
                    <input type="text" id="inputName" value={name} onChange={(e) => setName(e.target.value)} required /><br />

                    <label htmlFor="inputPrice">Price</label><br />
                    <input type="number" id="inputPrice" value={price} onChange={(e) => setPrice(e.target.value)} required /><br />

                    <label htmlFor="inputActive">Activity</label>
                    <input type="checkbox" id="inputActive" onChange={(e) => setActive(e.target.checked)}/><br />

                    <label htmlFor="inputImage">Image</label>
                    <input type="file" id="inputImage" onChange={(e) => setImage(e.target.files[0])}/>
                    <br />

                    { !isPending && <button className="btn btn-primary" type="submit" onClick={handleSubmit}>Add product</button> }
                    { isPending && <button className="btn btn-primary" type="submit" disabled>Adding product...</button> }
                </form>
            </div>
        </div>
    )
}
 
export default Create;