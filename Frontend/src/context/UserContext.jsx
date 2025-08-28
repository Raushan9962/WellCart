import React,{createContext} from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

export const UserDataContext = createContext()
 function UserContext({children}) {

{   let [userData, setUserData] = useState("");
    let {serverUrl} = useContext(authDataContext);
    
    const getCurrentUser =async () =>{
        try{
            let result =await axios.get(serverUrl+"/api/user/getCurrentUser",{withCredentials:true});
            setUserData(result.data);
            console.log(result.data);
        }
        catch(error){
              setUserData(null);
            console.log("get user error")
            return res.status(500).json({ message: `getCurrentUser error ${error}` })
        }
    }
    
    useEffect(() => {
        getCurrentUser();
    }, []);
    
    
    
    
    
    
    let value = { 
        userData,setUserData,
     };
}


    return (
        <UserDataContext.Provider value={value}>
            {children}
        </UserDataContext.Provider>
    )
}
export default UserContext