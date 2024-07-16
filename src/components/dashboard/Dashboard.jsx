import { useQuery } from "@tanstack/react-query";
import useAxiosSexure from "../hooks/useAxiosSexure";
import useAuth from "../useAuth";
import { NavLink, Outlet } from "react-router-dom";



const Dashboard = () => {
    const {users} = useAuth()
    const axiosSecure = useAxiosSexure()
    const {data: userx = []} = useQuery({
        queryKey:['menu'],
        queryFn:async()=>{
            const res = await axiosSecure.get(`/users/${users?.email}`)
            return res.data
        } 
    })
    console.log(userx)
   
    return (
        <div>
            <div className="flex">
            {/* side bar */}
            <div className="w-64 min-h-screen bg-blue-600 text-white">
            <ul className="menu p-4">
            <li><NavLink to='/dashboard/wellcome'>your profile</NavLink></li>
               <div className="divider divider-neutral"></div>
              <li> <NavLink to='/'>Home</NavLink> </li>
            </ul>
           
            </div>
            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;