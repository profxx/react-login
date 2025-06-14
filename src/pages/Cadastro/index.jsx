import { Link } from "react-router-dom"
import './styles.css'
import Header from "../../components/Header"
import { useRef } from "react"
import { api } from "../../services/api"

function Cadastro() {
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    async function handleSubmit(event) {
        event.preventDefault() // Evita atualizar a tela, apagando os dados

        try {
            await api.post('/cadastro', {
                name: nameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value
            })
            alert('Usuário Cadastrado com Sucesso')
        }
        catch(err){
            alert('Não foi possível cadastrar o usuário')
            console.log("Erro: ", err)
        }
    }

    return (
        <div className="cadastro">
            <Header text="Sistema de Cadastro" />

            <form className="cadastro-card" onSubmit={handleSubmit}>
                <h2>Cadastro</h2>
                <input ref={nameRef} type="text" name="" id="" placeholder="Nome" required />
                <input ref={emailRef} type="email" name="" id="" placeholder="E-mail" required />
                <input ref={passwordRef} type="password" name="" id="" placeholder="Senha" required />
                <button>Cadastrar</button>
                <Link to="/login">Já tem uma conta? Faça o login</Link>
            </form>


        </div>
    )
}
export default Cadastro