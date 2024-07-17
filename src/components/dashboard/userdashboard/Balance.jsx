
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../useAuth";
import useAxiospublic from "../../hooks/useAxiospublic";

const Balance = () => {
    const { users } = useAuth();
    const axiosPublic = useAxiospublic();

    const { data: userx = [], isLoading } = useQuery({
        queryKey: ['menu', users?.email],
        queryFn: async () => {
            if (!users?.email) {
                return [];
            }
            try {
                const res = await axiosPublic.get(`/item/${users.email}`);
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
            <h2 className="text-2xl text-center">{userx.length}</h2>
            <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>to</th>
              <th>email</th>
              <th>Method</th>
              <th>Money</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userx.map((it) => (
              <tr key={it._id}>
                <td>{it.to}</td>
                <td>{it.email}</td>
                <td>{it.method}</td>
                <td>{it.money}</td>
                <td>{it.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default Balance;
