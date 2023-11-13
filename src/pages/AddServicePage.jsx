import axios from "axios";
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function getToken() {
    const userToken = localStorage.getItem("token");
    return userToken;
}



export default function AddServicePage() {
    
    const [photo, setPhoto] = useState("")
    const [serviceName, setServiceName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [token, setToken] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        const userToken = getToken();

        if (!userToken) {
            alert("Sessão expirada, por favor faça login novamente");
            navigate("/");
        }

        setToken(userToken);

    }, []);

    function registerService(event) {
        event.preventDefault();

        const formattedPrice = price.replace(",", ".")
        const numericPrice = parseFloat(formattedPrice)
    
        const newService = {
            photo,
            serviceName,
            description,
            price: numericPrice
        }

        console.log(newService);
        console.log(token);
    
        axios.post(`${import.meta.env.VITE_API_URL}/services`, newService, { headers: { authorization: `Bearer ${token}` }})
        .then((response) => {
            alert("Serviço cadastrado com sucesso")
            navigate("/allServices")
        })
        .catch((error) => {
            if(error.response.status == 401) {
                alert("Sessão expirada, por favor faça login novamente");
                navigate("/");
            }
            if(error.response.status == 422) {
                alert("Formato inválido, cheque os dados inseridos");
            }
            console.log(error)
        })
    }

    return (
        <>
            <ServicesContainer>
                <form onSubmit={registerService}>
                    <input
                        value={photo}
                        onChange={(e) => setPhoto(e.target.value)}
                        placeholder="URL da foto do serviço"
                        type="url"
                        required
                    />

                    <input
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        placeholder="Nome do Serviço"
                        type="text"
                        required
                    />

                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição"
                        type="text"
                        required
                    />

                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Preço"
                        type="number"
                        required
                    />
                    <button type="submit">
                        Cadastrar
                    </button>
                </form>
                <Link to="/allServices" style={{textDecoration: "none", color: "black"}}>
                    Mudou de ideia? Volte para a tela de serviços aqui
                </Link>
            </ServicesContainer>
        </>
    )
}

const ServicesContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    input {
        margin-top: 10px;
    }
    button {
        margin: 10px;
    }
`