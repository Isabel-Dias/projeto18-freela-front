import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function getToken() {
  const userToken = localStorage.getItem("token");
  return userToken;
}

export default function ServicesPage() {
  
  const [servicesList, setServicesList] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      alert("Sessão expirada, por favor faça login novamente");
      navigate("/");
    }

    axios.get(`${import.meta.env.VITE_API_URL}/services`, { headers: { authorization: `Bearer ${token}` }})
    .then((response) => {
      setServicesList(response.data)
    })
    .catch((error) => {
        if(error.status == 401) {
            alert("Sessão expirada, por favor faça login novamente");
            navigate("/");
            console.log(error)
        }
    })
  }, []);

  if(!servicesList) {
    return (
      <>
        <div>
          Nenhum serviço disponível no momento! 
        </div>
        <Link to="/addService" style={{textDecoration: "none", color: "black"}}>
        Mas você pode cadastrar o seu próprio aqui!
        </Link>
      </>
    )
  }
  
  return (
    <>
      <div style={{display: "flex"}}>
        {servicesList?.map(service => {
            return (
                <div key={service.service_id} style={{margin: "20px"}}>
                <img src={service.photo} alt="image" style={{height: "200px", width: "270px", borderRadius: "10px"}}/>
                <div>
                    {service.service}
                </div>
                <div>
                    R$ {service.price}
                </div>
                <div>
                    Cidade: {service.city} - {service.state}
                </div>
                <div>
                    Número de contato: {service.phoneNumber}
                </div>
                </div>
            )
        })}
      </div>
      <Link to="/addService" style={{textDecoration: "none", color: "black"}}>
        Adicionar Serviço
      </Link>
    </>
  );
}
