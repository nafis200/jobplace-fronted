import { useQuery } from "@tanstack/react-query";
import useAxiospublic from "../../hooks/useAxiospublic";
import useAuth from "../../useAuth";

const Agentbalanced = () => {
  const axiosPublic = useAxiospublic();
  const {users} = useAuth()
  const fetchUserData = async () => {
    try {
      const res = await axiosPublic.get(`/agent`);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const { data: userx = [],error, isLoading} = useQuery({
    queryKey: ["menu",users?.email],
    queryFn: fetchUserData
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>to</th>
              <th>email</th>
              <th>Method</th>
              <th>Money</th>
              <th>charge</th>
            </tr>
          </thead>
          <tbody>
            {userx?.map((it) => (
              <tr key={it._id}>
                <td>{it.customar}</td>
                <td>{it.agent}</td>
                <td>{it.method}</td>
                <td>{it.money}</td>
                <td>{it.charge}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agentbalanced;
