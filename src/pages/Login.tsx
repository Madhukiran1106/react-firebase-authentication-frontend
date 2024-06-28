import React, { FormEvent, useState } from "react";
import banner from "../assets/banner.jpg";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FirebaseLoginAsync } from "../firebase/authentication.firebase";

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.username) {
      setUsernameError("Username is required.");
      return;
    }
    if (!formData.password) {
      setPasswordError("Password is required.");
      return;
    }
    console.log(formData);
    try {
      const result = await FirebaseLoginAsync(
        formData.username,
        formData.password
      );
      if (result.success) {
        const { uid, email, stsTokenManager } = result.data;
        localStorage.setItem("user", JSON.stringify({ uid, email }));
        localStorage.setItem("accessToken", stsTokenManager.accessToken);
        navigate("/");
        setUsernameError("");
        setPasswordError("");
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <div className=" w-full h-screen flex flex-row items-center">
      <div className="hidden md:block h-full w-2/3 bg-red-50 relative">
        <img src={banner} alt="" className=" w-full h-full object-cover" />
        <div className="w-full h-full absolute p-14 bg-black top-0 left-0 bg-opacity-45">
          <p className="text-[44px] w-1/2 text-white font-black">
            Photography is the story I fail to put into words.
          </p>
          <p className=" text-white text-2xl mt-8 font-medium">
            " - Destin Sparks "
          </p>
        </div>
      </div>
      <div className="h-full md:w-1/3 w-full flex flex-col items-center md:px-20 px-10 py-16 bg-white">
        <p className=" text-2xl font-bold">Welcome Back</p>
        <p className=" text-center my-4 text-gray-500">
          Log in to continue sharing your art and connecting with fellow
          creatives.
        </p>
        <div className="mt-10 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value });
                    setUsernameError("");
                  }}
                  required
                  className="block bg-slate-100 w-full pl-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                />
              </div>
              {usernameError?.length !== 0 && (
                <p className=" my-2 ml-2 text-red-600 text-xs">
                  {usernameError}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2 flex flex-row items-center relative">
                <input
                  id="password"
                  name="password"
                  type={passwordVisibility ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => {
                    setPasswordError("");
                    setFormData({ ...formData, password: e.target.value });
                  }}
                  required
                  className="block bg-slate-100 w-full pl-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
                {passwordVisibility ? (
                  <LuEye
                    onClick={() => {
                      setPasswordVisibility(false);
                    }}
                    className=" absolute right-2.5 hover:cursor-pointer"
                  />
                ) : (
                  <LuEyeOff
                    onClick={() => {
                      setPasswordVisibility(true);
                    }}
                    className=" absolute right-2.5 hover:cursor-pointer"
                  />
                )}
              </div>
              {passwordError?.length !== 0 && (
                <p className=" my-2 ml-2 text-red-600 text-xs">
                  {passwordError}
                </p>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
        <p className="flex flex-row items-center mt-10 text-center text-sm text-gray-500">
          Not a member?
          <p
            onClick={() => {
              navigate("/signup");
            }}
            className="font-semibold cursor-pointer leading-6 ml-2.5 text-blue-600 hover:text-blue-500"
          >
            Register here
          </p>
        </p>
      </div>
    </div>
  );
};

export default Login;
