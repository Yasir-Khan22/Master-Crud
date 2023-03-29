import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, control } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query";

function Add() {

  const navigate = useNavigate();

  // Yup Schema is defined Here.
  const Schema = yup.object().shape({
    name: yup.string().required("Name Field is required."),
    email: yup.string().email().max(255).required("Email is required."),
    phone: yup.number().typeError("Field must be a number")
      .required()
  })

  // useForm function/hook is used with the following properties.
  const { register, handleSubmit, formState: { errors }
  } = useForm({ resolver: yupResolver(Schema) });

  // useMutation Hook called.
  const { mutate } = useMutation(
    (data) => axios.post("http://localhost:3010/users", data),
    {
      onSuccess: () => {
        navigate("/");
      },
    }
  );

  function onSubmit(data) {
    // axios.post("http://localhost:3010/users", data).then(navigate("/"));
    // console.log("add component onsubmit occured");
    mutate(data);
  }

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h2 className="text-2xl font-bold">ADD USER</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[50%] h-full flex flex-col mt-2">

        <input
          className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
          type="text"
          placeholder="Enter your name"
          {...register("name")}
        />

        {/* <Controller
          control={control}
          name="test"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Checkbox
              onBlur={onBlur} // notify when input is touched
              onChange={onChange} // send value to hook form
              checked={value}
              inputRef={ref}
            />
          )}
        /> */}

        <span className="text-sm text-red-700">
          {errors?.name?.message}
        </span>

        <input
          className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
          type="email"
          placeholder="Enter your email"
          {...register("email")}
        />

        <span className="text-sm text-red-700">
          {errors?.email?.message}
        </span>

        <input
          className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
          type="phone"
          placeholder="Enter your phone no."
          {...register("phone")}
        />

        <span className="text-sm text-red-700">
          {errors?.phone?.message}
        </span>

        <button
          className="bg-teal-600 outline-none font-bold border text-white border-zinc-400 py-4 pl-4 mt-4"
          type="submit">
          ADD USER
        </button>
      </form>
    </div>
  );
}

export default Add;
