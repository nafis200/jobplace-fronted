import useAxiospublic from "../../hooks/useAxiospublic";
import useAuth from "../../useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
const Adminpermit = () => {
  const { users } = useAuth();
  const axiosPublic = useAxiospublic();
  const [count, setCount] = useState("all");
  let role = "all";
  const fetchUserData = async () => {
    try {
      const res = await axiosPublic.get(`/admin/${role}`);
      return res.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const {
    data: userx = [],
    error,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ["menu", users?.email],
    queryFn: fetchUserData
  });
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleMakeAdmin = (user) => {};

  const handleMakeSurveyor = (user) => {
    axiosPublic.patch(`/admined/${user.email}`, {}).then(() => {
      Swal.fire({
        icon: "success",
        title: "yaa...",
        text: "you are agent",
        footer: "Add 10000 taka user account"
      });
      refetch();
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/feedback/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
      }
    });
  };

  const Search = () => {
    role = count;
    refetch()
  };

  return (
    <div>
      <div className="flex justify-center mx-auto p-4">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs rounded-3xl"
          onChange={(e) => setCount(e.target.value)}
        />
        <button
          onClick={Search}
          className="btn btn-active btn-primary ml-2 rounded-2xl"
        >
          Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userx?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role === "admin" && <p>I am Admin</p>}</td>
                <td>{user.role === "agent" && <p>I am Agent</p>}</td>
                <td>
                  {user.role == "user" && (
                    <div className="space-x-2 space-y-2">
                      <button
                        onClick={() => handleMakeSurveyor(user)}
                        className="btn btn-primary"
                      >
                        {" "}
                        make Agent
                      </button>
                    </div>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-ghost btn-lg"
                    onClick={() => handleDeleteUser(user)}
                  >
                    <FaTrashAlt className="text-red-600"></FaTrashAlt>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminpermit;
