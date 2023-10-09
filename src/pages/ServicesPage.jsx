import { useEffect } from "react"
import { Link } from "react-router-dom"

export default function ServicesPage() {


    return (
        <>
            <div>Services</div>
            <Link to="/addService">
                Adicionar Serviço
            </Link>
        </>
    )
}