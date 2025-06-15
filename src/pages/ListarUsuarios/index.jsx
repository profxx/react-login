import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import { api } from '../../services/api';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function ListarUsuarios() {
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem('token');
        navigate('/login');
    }

    useEffect(() => {
        async function loadUsers() {
            try {
                const token = localStorage.getItem('token');
                const {
                    data: { users },
                } = await api.get('/listar-usuarios', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAllUsers(users);
                console.log('Usuários carregados:', users);
            } catch (err) {
                console.error('Erro ao carregar usuários:', err.response?.data || err.message);

                // Se o status for 401 ou 403, token inválido/expirado — desloga e redireciona
                if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    alert('Sua sessão expirou. Faça login novamente.');
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        }

        loadUsers();
    }, []);

    return (
        <div className="listar-usuarios">

            <Header text="Lista de Usuários" />

            <div className="container-tabela">
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>E-mail</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers?.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default ListarUsuarios;
