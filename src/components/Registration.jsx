
import useAuth from "./useAuth";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import useAxiospublic from "./hooks/useAxiospublic";
import Swal from 'sweetalert2'
import { FaGoogle } from "react-icons/fa";
const Registration = () => {

  const axiosPublic = useAxiospublic()
  
  const [showpass, setShowpass] = useState(false);
  const { createUser } = useAuth();
  const { signIngoogle } = useAuth();

  const handlegoogle = () => {
    signIngoogle()
      .then((result) => {
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: data.name,
          photoURL: data.image
        })
          .then(() => {
            const userinfo = {
              name: data.name,
              email: data.email
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
          .catch(() => {});
          console.log(result.user)
      })
      .catch((error) => {
        console.log(error);
        toast.error("not register");
      });
      reset()

  };

  return (
    <div>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="lg:text-5xl md:text-3xl text-2xl font-bold">
              Register now!
            </h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-600">name field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">imageLink</span>
                </label>
                <input
                  type="text"
                  placeholder="imageurl"
                  name="image"
                  className="input input-bordered"
                  {...register("image", { required: true })}
                />
                {errors.image && (
                  <span className="text-red-600">image field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative form-control">
                  <input
                    type={showpass ? "text" : "password"}
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern: /^(?=.*[a-z])(?=.*[A-Z]).+$/
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <span className="text-red-600">password is required</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-600">
                      Password should be six character
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-600">
                      Password less tahn 20 character
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className="text-red-600">
                      Password must have one Uppercase one lower case.
                    </p>
                  )}
                  <span
                    className="absolute top-2 right-2 lg:right-4"
                    onClick={() => setShowpass(!showpass)}
                  >
                    {showpass ? (
                      <FaEye className="text-3xl"></FaEye>
                    ) : (
                      <FaEyeSlash className="text-3xl"></FaEyeSlash>
                    )}
                  </span>
                  
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
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

                
              </div>

           </div>
            
           <div className="flex justify-end text-blue-600 underline mb-5 mr-4">
                {" "}
                <NavLink to="/login">Login</NavLink>{" "}
              </div>

          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Registration;