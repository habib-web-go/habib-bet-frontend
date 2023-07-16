"use client";
import Warning from "@/app/components/Warning";
import useUser from "@/app/hook/useUser";
import { register } from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface FormValues {
  username: string;
  password: string;
}

export default function Register() {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    password: "",
  });

  const { registerUser, loading, error, user } = useUser();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [router, user]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    registerUser(formValues);
  };

  return (
    <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
      {createPortal(<Warning error={error} />, document?.body)}
      <div className="flex flex-col">
        <div>
          <h2 className="text-4xl text-black">Get started!</h2>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mt-4 space-y-6">
          <label
            className="block mb-3 text-sm font-medium text-gray-600"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="block w-full px-6 py-3 text-black bg-white border border-gray-200 appearance-none rounded-xl placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            placeholder="username"
            name="username"
            onChange={(e) => {
              setFormValues({ ...formValues, username: e.target.value });
            }}
          />

          <label
            className="block mb-3 text-sm font-medium text-gray-600"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="block w-full px-6 py-3 text-black bg-white border border-gray-200 appearance-none rounded-xl placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            placeholder="**********"
            type="password"
            name="password"
            onChange={(e) => {
              setFormValues({ ...formValues, password: e.target.value });
            }}
          />

          {loading ? (
            <span className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black">
              Loading
            </span>
          ) : (
            <button
              className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
              type="submit"
            >
              Register
            </button>
          )}

          <Link href={"/login"} className="text-blue-700">
            You do have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
