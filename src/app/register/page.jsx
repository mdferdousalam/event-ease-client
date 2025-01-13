"use client";

import { registerUser } from "@/utils/actions/registerUser";
import { authOptions } from "@/utils/authOptions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {toast, Toaster} from 'react-hot-toast';

const RegisterPage =async () => {

  const session = await getServerSession(authOptions);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  if (session) router.push("/dashboard");

  const onSubmit = async (data) => {
    // console.log(data);
    const status = "allowed"
    const role = "normalUser"

    //add status and role into data
    data.status = status
    data.role = role
    try {
      const res = await registerUser(data);

      if (res.statusCode === 200) {
        // Display success message
        toast.success(res.message || 'Registration successful!');
        router.push("/login");
      } else {
        //display error message
        toast.error(res.message || 'Registration failed!');
      }

    } catch (err) {
      console.error(err.message);
      //display error message 
      
   toast.error (err.message || 'Something went wrong. Please try again.');

      throw new Error(err.message);
    }
  };

  return (
    <div className="my-10">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-center text-4xl mb-5">
        Register <span className="text-accent">Now</span>
      </h1>
      

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center">
        <div>
          <Image
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?t=st=1710081713~exp=1710085313~hmac=f637c194f1f143e63a84950cbf978997453777c872adf4aebbbecdaa445601a1&w=740"
            width={500}
            height={200}
            alt="login page"
            className="w-full h-[85%]"
          />
        </div>

        

        <div className="card  bg-base-100">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body py-3">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register("name")}
                placeholder="Your Name"
                className="input input-bordered focus:border-accent"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your valid Email"
                className="input input-bordered focus:border-accent"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="input input-bordered focus:border-accent"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent btn-outline">
                Register
              </button>
            </div>
            <p className="text-center">
              Already have an account?
              <Link className="text-accent" href="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;