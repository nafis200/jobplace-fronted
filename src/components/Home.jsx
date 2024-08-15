import Card from "./Card";
import Login from "./Login";
import useAuth from "./useAuth";


const Home = () => {
    const {users} = useAuth()
    return (
        <div>
          {
             !users?.email && <Login></Login>
          }
          {
             users?.email && <Card></Card>
          }
        </div>
    );
};

export default Home;