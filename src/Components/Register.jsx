import React, {useState} from "react";
import { useNavigate , Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios"
const Register = () => {
   const [name , setName] = useState("");
   const [email , setEmail] = useState("");
   const [password , setPassword] = useState("");
   const [error , setError] = useState("");
   const navigate = useNavigate();

   const handleSubmit = (e) => {
      e.preventDefault();
      axios.post("http://localhost:3000/register" , {name , email , password})
      .then((res) => {
         if(res.data.success) {
            navigate("/login")
         }else{
            setError(res.data.message)
         }
      })
      .catch(err => setError("Server Error , Please try again later"))
   }
   return (
      <div className="d-flex justify-content-center align-items-center vh-100 flex-column">
         <h1>Register</h1>
         <form action="" method="post" className="" onSubmit={handleSubmit}>
            <label htmlFor="name" className="form-label">
               <strong>
                  Name
               </strong>
            </label>
            <input 
               type="text" 
               name="name" 
               placeholder="Enter Name" 
               autoComplete="off"
               onChange={(e)=>setName(e.target.value)}
               required
               className="form-control rounded-5 border-2 border-black w-100"
            />
            <label htmlFor="email" className="form-label">
               <strong>
                  Email
               </strong>
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
               <strong>
                  Password
               </strong>
            </label>
            <input 
               type="password" 
               name="password" 
               onChange={(e)=> setPassword(e.target.value)}
               minLength={8}
               className="form-control rounded-5 border-2 border-black"
               placeholder="Enter Password"
            />
            {error && <p className="text-center text-danger">{error}</p>}
            <input type="submit" value="Register" className="btn btn-dark mt-3 rounded-3 "/>
         </form>
         <div>
            <p className="text-start mt-3">Already have an account?</p>
            <Link to="/login" className="btn btn-default border w-100 bg-light rounded-3 text-decoration-none">Login</Link>
         </div>
      </div>
   )
}

export default Register;