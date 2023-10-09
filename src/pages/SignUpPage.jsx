import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function SignUpPage() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [birthday, setBirthday] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [estate, setEstate] = useState("")
    const navigate = useNavigate()

    function registerUser(event) {
        event.preventDefault();

        const userData = {
            name,
            email,
            password,
            birthday,
            phoneNumber,
            address,
            city,
            estate
        }

        if (Number(phoneNumber.length) < 9) {
            alert("O número de telefone deve ter no mínimo 9 dígitos")
        }

        if (estate.length != 2) {
            alert("O estado deve ser informado no formato de sigla")
        }

        axios.post(`${import.meta.env.VITE_API_URL}/signup`, userData)
            .then((response) => {
                alert("Conta criada com sucesso")
                navigate("/")
            })
            .catch((error) => {
                if (error.response.status === 422) {
                    alert("Informações incompletas ou incorretas. Por favor verifique os dados inseridos")
                } else if (error.response.status === 409) {
                    alert("Email ou telefone já cadastrados")
                } else {
                    alert(error.message);
                }
            })
    }

    return (
        <>
            <SignUpContainer>
                <form onSubmit={registerUser}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nome"
                        type="text"
                        required
                    />

                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                        type="email"
                        required
                    />

                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        type="password"
                        required
                    />

                    <input
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        placeholder="Data de Nascimento (dd/mm/aaaa)"
                        type="text"
                        required
                    />

                    <input
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Número de telefone"
                        type="number"
                        required
                    />

                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Rua, número e bairro"
                        type="text"
                        required
                    />

                    <input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Cidade"
                        type="text"
                        required
                    />

                    <input
                        value={estate}
                        onChange={(e) => setEstate(e.target.value)}
                        placeholder="Estado (Sigla)"
                        type="text"
                        required
                    />

                    <button type="submit">
                        Cadastrar
                    </button>

                </form>
                <Link to="/">
                    Já tem uma conta? Entre aqui!
                </Link>
            </SignUpContainer>
        </>
    )
}

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }
    input {
        margin: 10px;
        width: 250px;
    }
`