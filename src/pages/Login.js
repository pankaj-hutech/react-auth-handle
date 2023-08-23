import React , {useState} from "react";
import Cookies from 'universal-cookie';



const Login = () => {
    const [user ,setUser] = useState({email : "" , password : "" })
    const cookies = new Cookies();

    const loginHandle =  async (e) => {
        e.preventDefault()
        try{
            const apiRequest = await fetch('http://localhost:8080/login' , {
                method : "POST", 
                headers: {
                "Content-Type": "application/json",
                },
                body : JSON.stringify(user)
            });
             const {accessToken , refreshToken} =  await apiRequest.json();
       
             if(accessToken){
                cookies.set("accessToken" , accessToken ,  {
                   expiresIn : '1m'
               })
               cookies.set('expiresIn' , JSON.stringify(new Date(Date.now() + 60 * 1000)))
                cookies.set("refreshToken" , refreshToken , {
                   expiresIn : '40m'
               })
            }
           
        }catch(err){
            alert(JSON.stringify(err))
        }

    }

    return (
            <div>
            <form onSubmit={loginHandle}>
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

export default Login;