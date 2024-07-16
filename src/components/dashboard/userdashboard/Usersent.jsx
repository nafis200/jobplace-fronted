import useAuth from "../../useAuth";
import { useEffect, useState } from "react";
import useAxiospublic from "../../hooks/useAxiospublic";

const Usersent = () => {
  const {users} = useAuth()
  const [flag,setFlag] = useState(false)
  const axiosPublic = useAxiospublic()
  const sentmoney = (event)=>{
    event.preventDefault();
    const form = event.target;
    const phone = form.phone.value;
    const password = form.password.value;
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
              <span className="label-text">Email</span>
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
