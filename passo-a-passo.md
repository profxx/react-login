1 - Criar as páginas, Cadastro, Login e Listar
2 - Instalar o React Router Dom e importar as funções BrowserRouter, Route, Routes e Navigate no main.jsx
npm install react-router-dom
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

3 - Colocar no main.jsx os elementos do Router-DOM

    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Cadastro />}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,

4 - Usar o link para os usuários cadastrados, na página de cadastro
import { Link } from "react-router-dom"

<Link to="/login">Já tem uma conta? Faça o login</Link>

5 - Fazer o CSS pra deixar no seu gosto

6 - Ligar o backend com "node --watch server.js"

7 - Pegar os dados dos inputs-form \* Poderia ser usado a biblioteca react hook form também, mas faremos manualmente no html
importar o useRef
import { useRef } from "react"

    criar na função Cadastro um const nameRef = useRef(), emailRef = useRef(), passwordRef = useRef()
    Colocar nos inputs: ref={nameRef} e assim por diante.
    colocar onSubmit na tag form: Exemplo onSubmit={handleSubmit}

8 - Criar a função handleSubmit, no Cadastro

    Adicionar event como parâmetro do handleSubmit e colocar o event.preventDefault() -> evita reiniciar a tela, o que não queremos...

function Cadastro() {
const nameRef = useRef()
const emailRef = useRef()
const passwordRef = useRef()

    function handleSubmit(event) {
        event.preventDefault() // Evita atualizar a tela, apagando os dados
        console.log(nameRef.current.value, emailRef.current.value, passwordRef.current.value)
    }

    return (

9 - Enviar os dados para o backend usando o fetch ou o axios, usaremos o axios
npm install axios

10 - Criar a pasta services no src e o arquivo api.js (seguindo as melhores práticas)
LEMBRAR DE COLOCAR ASYNC na handleSubmit, pra poder acessar a api
Colocar depois: await api.post('/cadastro')

Fica assim:
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
            alert('Não foi possível cadastrar o usuário', err)
        }
    }


11 - Vai dar erro de CORS - segurança de servidor backend
* NO NODE - Para isso instale a biblioteca cors no backend!!
npm install cors

Depois ajusta o código no SERVER.JS
import express from 'express'
import publicRoutes from './routes/public.js'
import privateRoutes from './routes/private.js'
import cors from 'cors'

import auth from './middleware/auth.js'

const app = express()
app.use(express.json())
app.use(cors())
...

12 - Ajustar os dados do Login para fazer o navigate para o /listar-usuarios 
Ficará assim:
import Header from "../../components/Header"
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import { api } from "../../services/api";

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();

        // Aqui entra a lógica de autenticação
        try {
            const { data: token } = await api.post('/login', {
                email: emailRef.current.value, 
                password: passwordRef.current.value
            })
            // Guardar o token no LocalStorage, que ele mantem no navegador 
            localStorage.setItem('token', token) // O 'token' refere-se ao nome que queremos manipular no navegador, a key, e token é a nossa variável que renomeamos o data
            // Abaixo redirecionar a lista de usuários usando o Navigate do react-touter-dom
            navigate('/listar-usuarios')
        }
        catch(err){
            alert("Usuário ou senha inválidos")
            console.log(err)
        }
   
  };

    return (
        <div className="cadastro">
            <Header text="Sistema de Login" />

            <form className="cadastro-card" onSubmit={handleLogin}>
                <h2>Login</h2>
                <input ref={emailRef} type="email" placeholder="E-mail" required />
                <input ref={passwordRef} type="password" placeholder="Senha" required />
                <button>Entrar</button>
                <Link to="/">Não tem uma conta? Cadastre-se</Link>
            </form>
        </div>
    );
}

export default Login

13 - Ajustar a rota no AppRoutes para o ListarUsuarios, criar a page tb

14 - Criar a função loadUsers em ListarUsuarios e importar o useEffect que é chamado toda vez que a tela carrega - Isntalar a extensão do VSCode Simple React Snipets (aqui não autocompletou), para autocompletar a estrutura do useEffect
Lembra que no backend no auth.js ele espera que o token fique armazenado em headers.authorization por isso preciso tratar no useEffect na função loadUsers. 
Lembre também que esse token chama-se bearer token
Fazer também o useState para mostrar os dados
Testar: acpimentel@id.uff.br e senha: 123
Veja como ficou:





parei 48:00
