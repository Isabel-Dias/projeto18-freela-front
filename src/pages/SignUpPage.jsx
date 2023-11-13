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
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const navigate = useNavigate()

    function registerUser(event) {
        event.preventDefault();

        const userData = {
            name,
            email,
            password,
            birthday,
            phoneNumber,
            city,
            state
        }

        if (Number(phoneNumber.length) < 9) {
            alert("O número de telefone deve ter no mínimo 9 dígitos")
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
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Cidade"
                        type="text"
                        required
                    />

                    <input
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Estado"
                        type="text"
                        required
                    />

                    <button type="submit">
                        Cadastrar
                    </button>

                </form>
                <Link to="/" style={{textDecoration: "none", color: "black"}}>
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