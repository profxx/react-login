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