
import { useQuery } from "@tanstack/react-query";
import useAxiospublic from "../../hooks/useAxiospublic";

const Agent = () => {
    const axiosPublic = useAxiospublic();
    


    const { data: userx = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            try {
                const res = await axiosPublic.get(`/cash`);
                return res.data;
            } catch (err) {
                console.error(err);
                throw err;
            }
        }
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }


    return (
        <div>
            <h2 className="text-2xl">Agent</h2>
            <pre>{JSON.stringify(userx, null, 2)}</pre>
        </div>
    );
};

export default Agent;