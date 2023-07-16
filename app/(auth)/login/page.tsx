"use client";
import Warning from "@/app/components/Warning";
import useUser from "@/app/hook/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface FormValues {
  username: string;
  password: string;
}

export default function Login() {
  const router = useRouter();

  const {
    user,
    loading: authenticating,
    error: authError,
    loginUser,
  } = useUser();

  const [formValues, setFormValues] = useState<FormValues>({
    username: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user, router]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    loginUser(formValues);
  };

  return (
    <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
      {createPortal(<Warning error={authError} />, document.body)}
      <div className="flex flex-col">
        <div>
          <h2 className="text-4xl text-black">Login to continue...</h2>
        </div>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mt-4 space-y-6">
          <label
            className="block mb-3 text-sm font-medium text-gray-600"
            htmlFor="name"
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
            htmlFor="company"
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

          {authenticating ? (
            <span className="block mb-5 items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black">
              Loading
            </span>
          ) : (
            <button
              className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
              type="submit"
            >
              Login
            </button>
          )}

          <Link href={"/register"} className="text-blue-700">
            You do not have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
