// import { useContext } from "react";
// import { AuthContext } from "./components/Authprovider";
import useAuth from "./useAuth";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import useAxiospublic from "./hooks/useAxiospublic";
import Swal from 'sweetalert2'
const Login = () => {
  // const {signInUser} = useContext(AuthContext)
  const axiosPublic = useAxiospublic()
  const [errors,setErrors] = useState("")
  const { signInUser, signIngoogle } = useAuth();
  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then((result) => {
        Swal.fire({
          title: `Good job!${result.user.email}`,
          text: "Successfully login!",
          icon: "success",
          showConfirmButton: false,
          timer: 2000
        });
        setErrors('')
      })
      .catch((error) => {
        setErrors(' ')
        setErrors("email password should be match",error);
        toast.error("email password should be match");
      });
  };
  const handlegoogle = () => {
    signIngoogle()
      .then((result) => {
        setErrors(' ')
        const userinfo = {
          name:result.user.displayName,
          email:result.user.email
       }
       axiosPublic.post('/users',userinfo)
       .then(res => {
           if(res.data.insertedId){
            Swal.fire({
              title: "Good job!",
              text: "Successfully register!",
              icon: "success",
              showConfirmButton: false,
              timer: 2000
            });

           }
       }) 

      })
  };

  
  return (
    <>
      <div className="hero min-h-screen bg-base-200  bg-[url('')] ">
        <div className="hero-content flex-col lg:flex-row">
          {<div className="mr-12 w-1/2">
            {/* <img src="https://i.ibb.co/T2cpBd5/888.jpg" alt="" /> */}
          </div> }
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-5xl font-bold text-center mt-5">Login now!</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
              <div className="flex justify-end text-blue-600 underline">
                <NavLink to="/signup">Register</NavLink>
              </div>
            </form>
            
            <div className="space-y-2 mb-5 ml-4">
              <div className="form-control mt-1">
                <button
                  onClick={handlegoogle}
                  className="btn  font-bold bg-slate-300 w-3/4 ml-7"
                >
                  <span> 
                    <FaGoogle className="text-2xl"></FaGoogle>
                  </span>
                  login with google
                </button>

                <p className="text-center text-red-500">{errors}</p>
              </div>

           </div>


          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
};

export default Login;