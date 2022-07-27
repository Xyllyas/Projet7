import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

async function signup(credentials) {
  return fetch(`http://localhost:3000/api/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(data => data.json())
}

function Signup({ signupOpen, setSignupOpen, setLoginOpen }) {
  const [email, setMail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [badMail, setbadMail] = useState(false)
  const [badPassword, setbadPassword] = useState(false)
  const [infoHidden, setInfoHidden] = useState(true)
  const [errorPassword, setErrorPassword] = useState(false)
  const [errorMail, setErrorMail] = useState(false)

  const regexMail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)
  const regexPassword = new RegExp(/^(?=.{8,}$)(?=(?:.*?[A-Z]){1})(?=.*?[a-z])(?=(?:.*?[0-9]){1}).*$/)


  function HandleMail(event) {
    if (regexMail.test(event.target.value)) {
      setMail(event.target.value)
      setbadMail(false)
    } else {
      setbadMail(true)
    }
  }


  function HandlePassword(event) {
    if (regexPassword.test(event.target.value)) {
      setPassword(event.target.value)
      setbadPassword(false)

    } else {
      setbadPassword(true)
      console.log(event.target.value.length);
    }
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (badPassword === true) {
      setErrorPassword(true)
    }
    if (badMail === true) {
      setErrorMail(true)
    }
    setTimeout(() => setErrorPassword(false), 1500)
    setTimeout(() => setErrorMail(false), 1500)

    if (badPassword === false && badMail === false) {
      const token = await signup({ email, password, name, lastName })
      localStorage.setItem('tokens', JSON.stringify(token));
      if (!token.message) {
        window.location.reload(true)
      }

    }

  }

  return signupOpen ? (<div className="app">
    <button className='btn-log' onClick={() => { setLoginOpen(true); setSignupOpen(false) }} >Connection</button>
    <div className="login-form">
      <h1 className="title">Inscription</h1>

      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Prénom</label>
          <input type="text" onChange={(e) => setName(e.target.value[0].toUpperCase() + e.target.value.slice(1))} required />
        </div>
        <div className="input-container">
          <label>Nom</label>
          <input type="text" onChange={(e) => setLastName(e.target.value[0].toUpperCase() + e.target.value.slice(1))} required />
        </div>
        <div className="input-container">
          <label>Email </label>
          <input type="text" className={errorMail === true ? 'inputInvalid' : null} onChange={HandleMail} required />
          {badMail && <p className='bad-value'>Adresse mail invalide</p>}
        </div>
        <div className="input-container password">
          <div className="inputPassword">
            <label>Mot de passe </label>
            <input type="password" className={errorPassword === true ? 'inputInvalid' : null} onChange={HandlePassword} required />
          </div>

          <div className="info">
            <span aria-label='info' tabIndex='0' onKeyDown={(e) => e.key === 'Enter' && infoHidden === true ? setInfoHidden(false) : setInfoHidden(true)} onClick={() => infoHidden === true ? setInfoHidden(false) : setInfoHidden(true)}>
              <FontAwesomeIcon icon={faCircleInfo} />
            </span>
          </div>
          {badPassword && infoHidden === true && <p className='bad-value'>Mot de passe invalide</p>}
          {infoHidden === false ? <p className='info-mdp'>Utilisez au moins huit caractères avec des lettres, des chiffres et des symboles</p> : null}

        </div>
        <div className="button-container">
          <input type="submit" onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  </div>
  ) : null
};

export default Signup;