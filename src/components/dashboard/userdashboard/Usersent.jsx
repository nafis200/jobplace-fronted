import useAuth from "../../useAuth";
import { useState } from "react";
import useAxiospublic from "../../hooks/useAxiospublic";
import { useQuery } from "@tanstack/react-query";
const Usersent = () => {
  const {users} = useAuth()
  const [flag,setFlag] = useState(false)
  const axiosPublic = useAxiospublic()
  const [taka,setTaka] = useState(0);
    const { data: userx = [], isLoading} = useQuery({
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
      const {balanced} = userx

  const sentmoney = (event)=>{
    event.preventDefault();
    const form = event.target;
    const phone = form.phone.value;
    const password = form.password.value;
    const money = form.money.value 
    const email = users?.email
    const info = {
      email : email,
      pin: password
    }
    async function loginUser(info) {
      try {
        const res = await axiosPublic.post('/loginuser', info);
        setFlag(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    }
       loginUser(info)
  }
  return (
    <div className="hero min-h-screen bg-base-200  bg-[url('')] ">
    <div className="hero-content flex-col lg:flex-row">
      {<div className="mr-12 w-1/2">
        {/* <img src="https://i.ibb.co/T2cpBd5/888.jpg" alt="" /> */}
      </div> }
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form  onSubmit={sentmoney} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="number"
              placeholder="phone number"
              className="input input-bordered"
              name="phone"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Money</span>
            </label>
            <input
              type="number"
              placeholder="sent amount"
              className="input input-bordered"
              name="money"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">pin</span>
            </label>
            <input
              type="tel"
              placeholder="pin number"
              className="input input-bordered"
              name="password"
              required
            />
            
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Sent money</button>
          </div>
          
        </form>
      </div>
    </div>
  </div>
  );
};

export default Usersent;
