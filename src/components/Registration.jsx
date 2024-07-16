import useAuth from "./useAuth";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import useAxiospublic from "./hooks/useAxiospublic";
import Swal from "sweetalert2";

const Registration = () => {
  const axiosPublic = useAxiospublic();
  const { createUser} = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const info = {
        email:data.email,
        pin:data.pin
      }
    createUser(data.email, data.pin)
      .then((result) => {
        updateProfile(result.user, {
          displayName: data.name,
        })
          .then(() => {
            const userinfo = {
              name:data.name,
              phone:data.phone,
              email:data.email,
              pin:data.pin,
              status:"incomplete",
              role:"user",
              balanced:40

            };

            axiosPublic.post("/users", userinfo).then((res) => {
              if (res.data.insertedId) {
                Swal.fire({
                  title: "Good job!",
                  text: "Successfully registered!",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 2000,
                });
              }
            });
          })
          .catch(() => {});

          

      
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Registration failed");
      });
    reset();
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
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-600">Name field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  placeholder="Enter your 11-digit phone number"
                  name="phone"
                  className="input input-bordered"
                  pattern="^\d{11}$"
                  {...register("phone", {
                    required: true,
                    pattern: /^\d{11}$/,
                  })}
                />
                {errors.phone && (
                  <span className="text-red-600">
                    {errors.phone.type === "required" &&
                      "Phone number is required"}
                    {errors.phone.type === "pattern" &&
                      "Phone number must be 11 digits"}
                  </span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  name="email"
                  className="input input-bordered"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">PIN</span>
                </label>
                <div className="relative form-control">
                  <input
                    type="tel"
                    placeholder="Enter your 6-digit PIN"
                    className="input input-bordered"
                    name="pin"
                    pattern="^\d{6}$"
                    {...register("pin", {
                      required: true,
                      minLength: 6,
                      maxLength: 6,
                      pattern: /^\d{6}$/,
                    })}
                  />
                  {errors.pin?.type === "required" && (
                    <span className="text-red-600">PIN is required</span>
                  )}
                  {errors.pin?.type === "minLength" && (
                    <span className="text-red-600">
                      PIN mus be 6 digits
                    </span>
                  )}
                  {errors.pin?.type === "maxLength" && (
                    <span className="text-red-600">
                      PIN should be 6 digits long
                    </span>
                  )}
                  {errors.pin?.type === "pattern" && (
                    <p className="text-red-600">PIN must be exactly 6 digits</p>
                  )}
                </div>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
            </form>
            <div className="flex justify-end text-blue-600 underline mb-5 mr-4">
              <NavLink to="/login">Login</NavLink>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Registration;
