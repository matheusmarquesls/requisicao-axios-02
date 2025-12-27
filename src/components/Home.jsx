import { useEffect, useState } from "react";
import { api } from "../provider/api";

function Home() {

    const [listarUsuario, setListarUsuario] = useState([]);
      const [formData, setFormData] = useState({
        nome: '',
        idade: '',
        telefone: '',
      });
      const [editId, setEditId] = useState(null);

      useEffect(() => {
        exibir();
      }, []);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

      const exibir = () => {
        api.get('/usuarios').then((response) => {
          setListarUsuario(response.data);
        }).catch((error) => {
          console.error('Erro ao listar usuários:', error);
        });
      };

      const cadastrar = () => {
        if (!formData.nome || !formData.idade || !formData.telefone) {
          alert('Por favor, preencha todos os campos');
          return;
        }

        api
          .post('/usuarios', {
            nome: formData.nome,
            idade: parseInt(formData.idade),
            telefone: formData.telefone,
          })
          .then((response) => {
            console.log(response.data);
            exibir();
            resetForm();
          })
          .catch((error) => {
            console.error('Erro ao cadastrar usuário:', error);
          });
      };

      const editar = (id, usuario) => {
        setFormData({
          nome: usuario.nome,
          idade: usuario.idade.toString(),
          telefone: usuario.telefone,
        });
        setEditId(id);
      };

      const salvarEdicao = () => {
        if (!formData.nome || !formData.idade || !formData.telefone) {
          alert('Por favor, preencha todos os campos');
          return;
        }

        api
          .put(`/usuarios/${editId}`, {
            nome: formData.nome,
            idade: parseInt(formData.idade),
            telefone: formData.telefone,
          })
          .then((response) => {
            console.log(response);
            exibir();
            resetForm();
            setEditId(null);
          })
          .catch((error) => {
            console.error('Erro ao editar usuário:', error);
          });
      };

      const deletar = (id) => {
        api
          .delete(`/usuarios/${id}`)
          .then((response) => {
            console.log(response.data);
            exibir();
          })
          .catch((error) => {
            console.error('Erro ao deletar usuário:', error);
          });
      };

      const resetForm = () => {
        setFormData({
          nome: '',
          idade: '',
          telefone: '',
        });
      };

      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">
            {editId ? 'Editar Usuário' : 'Cadastrar Usuário'}
          </h1>
          <div className="mb-6">
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              placeholder="Nome"
              className="border p-2 mr-2 mb-2 w-full"
            />
            <input
              type="number"
              name="idade"
              value={formData.idade}
              onChange={handleInputChange}
              placeholder="Idade"
              className="border p-2 mr-2 mb-2 w-full"
            />
            <input
              type="text"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              placeholder="Telefone"
              className="border p-2 mr-2 mb-2 w-full"
            />
            <div>
              {editId ? (
                <>
                  <button
                    onClick={salvarEdicao}
                    className="bg-blue-500 text-white p-2 rounded mr-2"
                  >
                    Salvar
                  </button>
                  <button
                    onClick={() => {
                      resetForm();
                      setEditId(null);
                    }}
                    className="bg-gray-500 text-white p-2 rounded"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={cadastrar}
                  className="bg-green-500 text-white p-2 rounded"
                >
                  Cadastrar
                </button>
              )}
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">Lista de Usuários</h2>
          <div className="grid gap-4">
            {listarUsuario.map((usuario) => (
              <div
                key={usuario.id}
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold">{usuario.nome}</h3>
                  <p>Idade: {usuario.idade}</p>
                  <p>Telefone: {usuario.telefone}</p>
                </div>
                <div>
                  <button
                    onClick={() => editar(usuario.id, usuario)}
                    className="bg-yellow-500 text-white p-2 rounded mr-2"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => deletar(usuario.id)}
                    className="bg-red-500 text-white p-2 rounded"
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
}
export default Home;