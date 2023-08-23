import React from "react";
import Cookies from "universal-cookie";

const Profile = () => {
    const [userList , setUserList] = React.useState([]);
    const cookies = new Cookies()
    
    const getUserCall = async () => {
        try{
           
            const req = await fetch('http://localhost:8080/get-all-user' ,{
                headers: {Authentication: `Bearer ${cookies.get('accessToken')}`}
            });
            const data = await req.json();
             setUserList(data);
        }catch(err){
            console.log(err);
        }
    }


    React.useEffect(() => {
        getUserCall();
    } , []);

    return <ul>{userList.map(({email}) => <li key={email}>{email}</li>)}</ul>
}

export default Profile;