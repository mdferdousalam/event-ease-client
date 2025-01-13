'use client';
import {loginUser} from '@/utils/actions/loginUser';
import { authOptions } from '@/utils/authOptions';
import { getServerSession } from 'next-auth';
import {useSession} from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useForm} from 'react-hook-form';
import toast, {Toaster} from 'react-hot-toast';

const LoginPage = async () => {
const {data: session, status} = useSession ();
  const router = useRouter ();

if (status === 'authenticated') {
  // User is authenticated
} else {
  // User is not authenticated
}

  const {register, handleSubmit, formState: {errors}} = useForm ();

  

  const onSubmit = async data => {
    try {
      const res = await loginUser (data);
      console.log (res);
      if (res.statusCode == 200) {
        toast.success ('Login successful!');
        localStorage.setItem ('accessToken', res.data.accessToken);
        router.push ('/dashboard');
      } else {
        toast.error (res.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error (err.message);
      throw new Error (err.message);
    }
  };

  return (
    <div className="my-10">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-center text-4xl mb-5">
        Login <span className="text-accent">Here</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Image
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?t=st=1710130697~exp=1710134297~hmac=f1b21d9c1823a0657d339c256a1c4ad8301168480e35b35aeba5106568a21010&w=740"
            width={500}
            height={200}
            alt="login page"
            className="w-full h-[85%]"
          />
        </div>

        <div className="card  bg-base-100">
          <form onSubmit={handleSubmit (onSubmit)} className="card-body">
            <div className="form-control mt-5">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register ('email')}
                placeholder="Email"
                className="input input-bordered focus:border-accent"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register ('password')}
                type="password"
                placeholder="Password"
                className="input input-bordered focus:border-accent"
                required
              />
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent btn-outline">
                Login
              </button>
            </div>
            <p className="text-center">
              Don&apos;t have an account?{' '}
              <Link className="text-accent" href="/register">
                Create an account
              </Link>
            </p>
          </form>
          {/* <p className="text-center">Or Sign Up Using</p>
          <div className="flex justify-center mb-10 mt-2">
            <button
              className="btn btn-circle "
              onClick={() =>
                signIn("google", {
                  callbackUrl:
                    "https://nextjs-authentication-starter-pack.vercel.app/dashboard",
                })
              }
            >
              <Image
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                width={50}
                height={50}
                alt="google logo"
              />
            </button>
            <button
              className="btn btn-circle"
              onClick={() =>
                signIn("github", {
                  callbackUrl:
                    "https://nextjs-authentication-starter-pack.vercel.app/dashboard",
                })
              }
            >
              <Image
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                width={35}
                height={35}
                alt="github logo"
              />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
