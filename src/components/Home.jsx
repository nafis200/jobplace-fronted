import Login from "./Login";
import useAuth from "./useAuth";


const Home = () => {
    const {users} = useAuth()
    return (
        <div>
          {
             !users?.email && <Login></Login>
          }
        </div>
    );
};

export default Home;