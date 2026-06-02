import React from 'react'
import "../auth.form.scss"
import "../../../styles/button.scss"
import { Link ,useNavigate } from 'react-router'

const Login = () => {

    const handleSubmit = (e) =>{
        e.preventDefault();
    }
  return (
    <main>
        <div className="form-container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='email' placeholder='Enter email address' />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' placeholder='Enter password' />
                </div>

                <button className='button primary-button'>Login</button>
            </form>

            <p>Don't have an account? <Link to={'/register'}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login
