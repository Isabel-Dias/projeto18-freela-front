import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import axios from "axios";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const navigate = useNavigate()

    function Login(event) {
        event.preventDefault();

        const data = {
            email,
            password,
        };

        axios.post(`${import.meta.env.VITE_API_URL}/signin`, data)
            .then((response) => {
                setToken(response.data);
                localStorage.setItem("token", response.data);
                navigate("/AllServices")
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    alert("Usuário não  registrado!")
                } else if (error.response.status === 422) {
                    alert("Todos os campos são obrigatórios!")
                } else {
                    alert(error.message);
                }
            })
    }


    return (
        <>
            <SignInContainer>
                <div>LogIn</div>
                <form onSubmit={Login}>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-mail"
                        type="email"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Senha"
                        type="password"
                    />
                    <button type="submit">
                        Entrar
                    </button>
                </form>
                <Link to="/SignUp" >
                    Ainda não tem uma conta? Cadastre-se
                </Link>
            </SignInContainer>
        </>
    )
}

const SignInContainer = styled.div`
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