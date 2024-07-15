import { useContext } from "react";
import { AuthContext } from "./Authprovider";
import { Navigate, useLocation } from "react-router";


const Privateroute = ({children}) => {
    const {users,loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
        return <span className="loading loading-spinner text-error lg:text-4xl md:text-3xl text-2xl lg:ml-[700px] md:ml-[400px] ml-[200px] mt-10"></span>
    }
    if(users?.email){
         return children
    }
    return (
        <Navigate state={location.pathname} to="/login" replace></Navigate>
    );
};

export default Privateroute;