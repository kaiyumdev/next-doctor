// SignUpForm.js
"use client";
import React from "react";

const SignUpForm = () => {
  const handleSignUp = async (event) => {
    event.preventDefault();
    const newUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup/api`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "content-type": "application/json",
      },
    });
    if (resp.status === 200) {
      event.target.reset();
    }
  };

  return (
    <form onSubmit={handleSignUp} action="">
      <label htmlFor="email">Name</label> <br />
      <input
        type="text"
        name="name"
        placeholder="your name"
        className="mt-3 w-full input input-bordered"
      />
      <br /> <br />
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
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
