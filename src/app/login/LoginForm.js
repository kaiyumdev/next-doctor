// LoginForm.js
"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const path = searchParams.get("redirect");

  const handleLogin = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const resp = await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: path ? path : "/",
    });
  };

  return (
    <form onSubmit={handleLogin} action="">
      <label htmlFor="email">Email</label> <br />
      <input
        type="text"
        name="email"
        placeholder="your email"
        className="mt-3 w-full input input-bordered"
      />
      <br /> <br />
      <label htmlFor="password">Password</label> <br />
      <input
        type="password"
        name="password"
        placeholder="your password"
        className="w-full mt-3 input input-bordered"
      />
      <br />
      <button type="submit" className="w-full btn btn-primary mt-12 text-lg">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
