import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function getToken() {
    const userToken = localStorage.getItem("token");
    return userToken;
}

export default function ServiceDetailsPage() {
    const params = useParams();
    const { id } = params;
    const [serviceData, setServiceData] = useState([])
    const token = getToken();
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/services/${id}`, { headers: { authorization: `Bearer ${token}` }})
        .then((response) => {
            setServiceData(response.data[0])
        })
        .catch((error) => {
            if(error.status == 401) {
                alert("Sessão expirada, por favor faça login novamente");
                navigate("/");
            }
        })
    }, []);
    
    return (
        <>
        <div>
            <img src={serviceData.photo} alt="image" style={{height: "200px", width: "270px", borderRadius: "10px"}}/>
            <div>
                {serviceData.service}
            </div>
            <div>
                Descrição: {serviceData.description}
            </div>
            <div>
                R$ {serviceData.price}
            </div>
            <div>
                Provedor: {serviceData.provider}
            </div>
            <div>
                Telefone para contato: {serviceData.phoneNumber}
            </div>
            <div>
                {serviceData.city} - {serviceData.state}
            </div>
        </div>
        </>
    )
}