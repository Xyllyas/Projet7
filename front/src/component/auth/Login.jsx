import React, { useState } from "react";

async function loginUser(credentials) {
  return fetch(`http://localhost:3000/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())

}
//  data.json()
export default function Login({ loginOpen, setSignupOpen, setLoginOpen }) {
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')

  const regex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  const [goodMail, setGoodMail] = useState(false)
  const [message, setMessage] = useState("")




  function HandleMail(event) {
    if (regex.test(event.target.value)) {
      setMail(event.target.value)
      setGoodMail(false)
    } else {
      setGoodMail(true)
    }
  }


  const handleSubmit = async event => {
    event.preventDefault();
    const token = await loginUser({ email, password })

    localStorage.setItem('tokens', JSON.stringify(token));
    const message = JSON.parse(localStorage.getItem('tokens'))

    if (message.message) {
      setMessage(message)
    } else {
      window.location.reload(true)
    }


  };

  return loginOpen ? (
    <div className="app">
      <button className="btn-log" onClick={() => { setSignupOpen(true); setLoginOpen(false) }}>Inscription</button>
      <div className="login-form">
        <h1 className="title">Connection</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Email </label>
            <input type="text" name="uname" onChange={HandleMail} required />
          </div>
          <div className="input-container">
            <label>Mot de passe </label>
            <input type="password" name="pass" onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="button-container">
            {message.message && <p>{message.message}</p>}
            <input type="submit" disabled={goodMail} onSubmit={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  ) : null
}
