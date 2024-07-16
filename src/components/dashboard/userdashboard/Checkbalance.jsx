

import useAuth from "../../useAuth";
import useAxiospublic from "../../hooks/useAxiospublic";
import { useQuery } from "@tanstack/react-query";

const Checkbalance = () => {
    const {users} = useAuth()
  const axiosPublic = useAxiospublic()
  const { data: userx = [], isLoading, refetch} = useQuery({
    queryKey: ['menu'],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(`/users/${users?.email}`);
        return res.data;
      } catch (err) {
        console.error(err);
        return []; 
      }
    }
  });
  if (isLoading) {
    return <div>Loading...</div>; 
  }
    return (
        <div>
            <h2 className="text-2xl text-center">Your balanced: {userx?.balanced}</h2>
        </div>
    );
};

export default Checkbalance;