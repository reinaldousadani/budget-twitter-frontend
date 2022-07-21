import React from "react";
import { BsTwitter } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin } from "../api/sessionApi";

const LoginScreen = () => {
  const qc = useQueryClient();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation(signin, {
    onSuccess: (data) => {
      console.log("success: ", data);
      qc.invalidateQueries(["user"]);
    },
    onError: (err) => console.log(err),
  });

  const onSubmit = (data) => {
    mutation.mutate({
      username: data.userName,
      password: data.password,
    });
  };

  return (
    <div className="w-full p-6 flex flex-col gap-6">
      <BsTwitter className="text-5xl mb-4" />
      <h1 className="text-5xl leading-relaxed">Happening now</h1>
      <h2 className="text-2xl">Join Twotter today.</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <input
          {...register("userName", { required: true })}
          className="border border-[#333639] px-4 py-2 rounded-xl lg:max-w-lg"
          placeholder="Username"
        />
        {errors.userName && (
          <p className="text-red-700">Username is required.</p>
        )}
        <input
          {...register("password", { required: true, minLength: 6 })}
          className="border border-[#333639] px-4 py-2 rounded-xl lg:max-w-lg"
          placeholder="Password"
          type="password"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-700">Password is required.</p>
        )}
        {errors.password?.type === "minLength" && (
          <p className="text-red-700">
            Password needs to be at least 6 characters.
          </p>
        )}
        <button className="bg-blue-600 px-4 py-2 rounded-xl lg:max-w-sm">
          Sign-In
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;
