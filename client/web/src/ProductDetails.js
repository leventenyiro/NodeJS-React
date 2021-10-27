import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams()
    const url = "http://localhost:8080/product/" + id
    const [name, setName] = useState(null)
    const [price, setPrice] = useState(null)
    const [active, setActive] = useState(null)
    const [disabled, setDisabled] = useState(true)
    
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
            setName(data.name)
            setPrice(data.price)
            setActive(data.active)
            setIsPending(false)
            setError(null)
        })
        .catch(err => {
            setError(err.message)
            setIsPending(false)
        })
    }

    const handleOpenUpdate = () => {
        setDisabled(false)

        let btnUpdate = document.querySelector('#btnUpdate')
        btnUpdate.innerHTML = 'Save'

        //btnUpdate.removeEventListener('click', handleOpenUpdate)
        //btnUpdate.addEventListener('click', handleUpdate)
    }

    const handleUpdate = () => {
        setDisabled(true)

        document.querySelector('#btnUpdate').innerHTML = 'Update'

        const product = { name , price, active };

        setIsPending(true);

        fetch(url, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        }).then((res) => {
            if (!res.ok)
                throw Error("Server error!")
            return res.json()
        }).then(() => {
            setIsPending(false)
        }).catch(err => {
            setError(err.message)
        })
    }
    
    const handleDelete = () => {
        fetch(url, {
            method: "DELETE"
        }).then(res => {
            if (!res.ok)
                throw Error("Server error!")
            return res.json()
        }).then(() => {
            history.goBack()
        }).catch(err => {
            setError(err.message)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <button className="btn btn-primary" onClick={history.goBack}>Back</button>
            <div id="product-details">
                { isPending && <div>Loading</div> }
                { error && <div>{ error }</div>}
                { product && (
                    <article>
                        <label htmlFor="inputName">Name</label><br />
                        <input type="text" id="inputName" value={name} onChange={(e) => setName(e.target.value)} disabled={disabled} /><br />

                        <label htmlFor="inputPrice">Price</label><br />
                        <input type="number" id="inputPrice" value={price} onChange={(e) => setPrice(e.target.value)} disabled={disabled} /><br />

                        <label htmlFor="inputActive">{active === 1 ? "Active" : "Inactive"}</label>
                        <input type="checkbox" id="inputActive" checked={active} onChange={(e) => setActive(e.target.value)} disabled={disabled}/>
                        <br />

                        <button className="btn btn-primary" onClick={disabled ? handleOpenUpdate : handleUpdate} id="btnUpdate">Update</button>
                        <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                    </article>
                )}
            </div>
        </div>
    );
}
 
export default ProductDetails;