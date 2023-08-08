// import { useState } from "react"
// import axios from "axios"

export default function LoginPage() {

//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   })

//   const [error, setError] = useState("")

//   const [user, setUser] = useState(getUser())
  
//   function login(user) {
//     setUser(user)
//   } 

//   function logout() {
//     localStorage.removeItem('token')
//     setUser(null)
//   }

//   function handleChange(e) {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   } 

//   function handleSubmit(e) {
//     e.preventDefault()

//     axios.post('/api/login', formData)
//       .then(res => {

//         let token = res.data
//         console.log(token)
//         localStorage.setItem("token", token)
        
//         onLogin(formData)
//       })
//       .catch(err => {
//         console.log(err.response.status)
//         console.log(err.message)
//         console.log(err.response.data)
        
//         setError(err.response.data.message)
//       })

//   }

//   return (
//     <section className="login-page">

//       <h1>login</h1>

//       {error && <p>{error}</p>}

//       <form onSubmit={handleSubmit} action="">
//         <label htmlFor="email">email</label>
//         <input onChange={handleChange} type="text" name="email" id="email" />

//         <label htmlFor="password">password</label>
//         <input onChange={handleChange} type="password" name="password" id="password" />

//         <button >login</button>

//       </form>

//     </section>
//   )
}
