import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (!/[A-Z]/.test(password))
      errors.push("Falta pelo menos uma letra maiúscula.");
    if (!/[a-z]/.test(password))
      errors.push("Falta pelo menos uma letra minúscula.");
    if (!/[0-9]/.test(password)) errors.push("Falta pelo menos um número.");
    if (!/[!@#$%&]/.test(password))
      errors.push(
        "Falta pelo menos um caractere especial (!, @, #, $, % ou &)."
      );
    if (password.length < 8)
      errors.push("A senha deve ter no mínimo 8 caracteres.");
    return errors;
  };

  const handleRegister = () => {
    const newErrors: { [key: string]: string } = {};

    if (firstName.length === 0 || firstName.replace(/\s/g, "").length > 20) {
      newErrors.firstName =
        "Nome deve ter no máximo 20 caracteres sem espaços.";
    }
    if (lastName.length > 50) {
      newErrors.lastName = "Sobrenome deve ter no máximo 50 caracteres.";
    }
    if (!validateEmail(email)) {
      newErrors.email = "Email inválido. Exemplo: nome@dominio.com";
    }
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      newErrors.password = passwordErrors.join(" ");
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate("/profile");
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Primeiro Nome"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      {errors.firstName && <p>{errors.firstName}</p>}

      <input
        type="text"
        placeholder="Sobrenome"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      {errors.lastName && <p>{errors.lastName}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        type="password"
        placeholder="Criar Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && <p>{errors.password}</p>}

      <input
        type="password"
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

      <button onClick={handleRegister}>Criar Conta</button>
    </div>
  );
};

export default Register;
