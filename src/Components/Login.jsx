import React, { useState } from 'react'
import { useNavigate  , Link} from 'react-router-dom'
import axios from 'axios'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error , setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:3000/login', { email, password })
      .then((result) => {
        console.log(result)
        if (result.data.success) {
          navigate('/home')
        }else{
         setError(result.data.message);
        }
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-label">
          <strong>Email</strong>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control rounded-5 border-2 border-black"
        />
        <label htmlFor="password" className="form-label">
          <strong>Password</strong>
        </label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='current-password'
          minLength={8}
          className="form-control rounded-5 border-2 border-black"
          placeholder="Enter Password"
        />
        {error && <p className='text-danger text-center' >{error}</p>}
        <input
          type="submit"
          value="Login"
          className="btn btn-dark mt-2 rounded-3 align-middle"
        />
      </form>
      <p className='mt-2'>don't have an account?</p>
      <Link to="/register" className='btn btn-default'>Register</Link>
    </div>
  )
}

export default Login
