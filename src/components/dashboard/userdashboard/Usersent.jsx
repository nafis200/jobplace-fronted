import { NavLink } from "react-router-dom";

const Usersent = () => {
  return (
    <div className="hero min-h-screen bg-base-200  bg-[url('')] ">
    <div className="hero-content flex-col lg:flex-row">
      {<div className="mr-12 w-1/2">
        {/* <img src="https://i.ibb.co/T2cpBd5/888.jpg" alt="" /> */}
      </div> }
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
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
