import { useState } from "react"


export default function AddServicePage() {
    const [serviceName, setServiceName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")

    return (
        <>
            <div>
                <form >
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
                        type="text"
                        required
                    />
                    <button type="submit">
                        Cadastrar
                    </button>
                </form>
            </div>
        </>
    )
}