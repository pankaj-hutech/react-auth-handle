import React , {useEffect , useState} from "react";
import {  Navigate, useLocation} from "react-router-dom";
import Cookies from "universal-cookie"; 
  
const ProtectedRoute = ({children}) => {
    const cookie = new Cookies();
    const [accessToken , setAccessToken] = useState(cookie.get('accessToken'));
    const [isRefreshing , setIsRefreshing] = useState(false)
    const tokenExpireTime = cookie.get('expiresIn');
    const refershToken = cookie.get('refreshToken');
    const location = useLocation();

    const redirectToLogin = () => <Navigate state={{from : location}}  to={'/'} replace/>;

    const refreshAccessToken = async () => {
      if(refershToken){
      try{
            setIsRefreshing(true)
            cookie.set("accessToken" , null);
            cookie.set("refreshToken" , null);
            cookie.set('expiresIn' , null)
            const response = await fetch('http://localhost:8080/refreshAccessToken' , {
              method : "POST", 
              headers : {"Content-Type" : "application/json"},
              body : JSON.stringify({refershToken})
            })

            const responseData =  await response.json()
            const {accessToken ,refreshToken } = responseData;
            setAccessToken(accessToken)
            cookie.set("accessToken" , accessToken);
            cookie.set("refreshToken" , refreshToken);
            cookie.set('expiresIn' , JSON.stringify(new Date(Date.now() + 60 * 1000)))
            setIsRefreshing(false)
        }catch(err){
          redirectToLogin();
        }
      }
    }

    useEffect(() => {
      if(tokenExpireTime && new Date().getTime() > new Date(tokenExpireTime).getTime()){
        refreshAccessToken();
      }
    }, []);

    if (isRefreshing) {
      return <div>Refreshing...</div>;
    }

    if (!accessToken) {
      return redirectToLogin();
    }
   
  return children
}

export default ProtectedRoute;