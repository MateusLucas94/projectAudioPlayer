import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../services/userAPI";
import Carregando from "../components/Carregando";
import logo from "../assets/img/logo.png";
import "../css/indexHeader.css";

const Header: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setCarregando(true);
    setErro(null);

    const usuarioCriado = await createUser({ email, senha });
    setCarregando(false);

    if (!usuarioCriado || !email || !senha) {
      setErro("Senha ou email inválidos.");
      return;
    }

    setUsuario(email);
    navigate("/search");
  };

  return (
    <header className="header-container" data-testid="header-component">
      <div className="header-greeting">
        <img src={logo} alt="Logo" className="header-logo" />
        {/* {usuario ? <p>Bem-vindo, {usuario}!</p> : <p>Olá, Novo Player!</p>} */}
      </div>
      <img src={logo} alt="Logo" className="header-logo" />
      <div className="header-login">
        <div className="login-inputs">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="login-email-input"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            data-testid="login-password-input"
          />
          {carregando && <Carregando />}
          {erro && <p className="error-message">{erro}</p>}
        </div>
        <div className="login-buttons">
          <button onClick={handleLogin} data-testid="login-submit-button">
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            data-testid="register-button"
          >
            Cadastrar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
