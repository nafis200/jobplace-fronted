import useAuth from "../../useAuth";

const Wellcome = () => {
  const { users } = useAuth();
  return (
    <div>
      <h2 className="text-2xl text-center">Wellcome to your dashboard</h2>
      <h2 className="text text-center mt-2">
        Your name is {users?.displayName}
      </h2>
      <h2 className="text text-center mt-2">Your email is {users?.email} </h2>
    </div>
  );
};

export default Wellcome;
