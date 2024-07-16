
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
            <h2 className="text-2xl">{userx.length}</h2>
        </div>
    );
};

export default Balance;
