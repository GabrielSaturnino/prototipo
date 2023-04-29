import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

export default function Home() {

  const handleLogin = e => {
    e.preventDefault();
    const data = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    }
    const result = validate(data);
  }

  const handleSignIn = e => {
    e.preventDefault();
    const data = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    }
    const result = validate(data);
  }

  const validate = item => {
    if (item.email.length < 7) return "email inválido"
    if (item.password.length < 5) return "senha inválida";
    return "Sucesso";
  }

  return (
    <div className="container">
      <div className="auth">
        <form onSubmit={handleLogin}>
          <fieldset>
            <label htmlFor="email">Email:</label>
            <input id='email' type="email" name="email" required />
            <label htmlFor="password">Senha:</label>
            <input id='password' type="password" name="password" required />
            <button type='submit'>Entrar</button>
          </fieldset>
        </form>
      </div>

      <div className="auth">
        <form method='POST' onSubmit={handleSignIn}>
          <fieldset>
            <label htmlFor="email-signIn">Email:</label>
            <input id='email-signIn' type="email" name="email" required />
            <label htmlFor="password-signIn">Senha:</label>
            <input id='password-signIn' type="password" name="password" required />
            <button type='submit'>Cadastrar</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}