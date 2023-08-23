import React , {useState} from "react";

const Signup = () => {
    const [user ,setUser] = useState({email : "" , password : "" })

    const signupSubmitFunctions =  async (e) => {
        e.preventDefault()
        const apiRequest = await fetch('http://localhost:8080/signup' , {
            method : "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body : JSON.stringify(user)
        });

    }

    return (
        <div>
            <form onSubmit={signupSubmitFunctions}>
                <label>Email</label>
                <input 
                 type="email" 
                 onChange={(e) => {
                   setUser((pre) => ({...pre , email : e.target.value}))
                }}
                />
                <label>Password</label>
                <input 
                 type="password" 
                  onChange={(e) => {
                   setUser((pre) => ({...pre , password : e.target.value}))
                }}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>    
    )
}

export default Signup;