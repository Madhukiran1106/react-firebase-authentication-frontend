import React, { useState } from "react";
import banner from "../assets/painting.jpg";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FirebaseSignupAsync } from "../firebase/authentication.firebase";

interface FormData {
  password: string;
  confirmPassword: string;
  email: string;
}

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [cfmpasswordVisibility, setCFMPasswordVisibility] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validatePasswordLength = () => {
    const { password } = formData;
    if (password.length < 8) {
      setErrors((prev) => ({
        ...prev,
        password: "Password requires at least 8 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const validateConfirmPasswordMatch = () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate that all required fields are filled out
    const allFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );

    if (!allFieldsFilled) {
      alert("Please fill out all fields.");
      validateConfirmPasswordMatch();
      return;
    }

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      alert("Failed to Submit");
      return;
    }

    // Additional validation and form submission logic here
    console.log(formData);
    const result = await FirebaseSignupAsync(formData.email, formData.password);
    if (result.success) {
      navigate("/login");
    } else {
      console.log("Something went wrong!");
    }
  };
  return (
    <div className=" w-full h-screen flex flex-row items-center">
      <div className="hidden md:block h-full w-2/3 bg-red-50 relative">
        <img src={banner} alt="" className=" w-full h-full object-cover" />
        <div className="w-full h-full absolute p-14 bg-black top-0 left-0 bg-opacity-45">
          <p className="text-[44px] w-1/2 text-white font-black">
            Art is not what you see, but what you make others see.
          </p>
          <p className=" text-white text-2xl mt-8 font-medium">
            " - Edgar Degas "
          </p>
        </div>
      </div>
      <div className="h-full md:w-1/3 w-full flex flex-col items-center md:px-20 px-10 py-16 bg-white">
        <p className=" text-2xl font-bold">Welcome Back</p>
        <p className=" text-center my-4 text-gray-500">
          Log in to continue sharing your art and connecting with fellow
          creatives.
        </p>
        <div className="mt-4 w-full">
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
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block bg-slate-100 w-full pl-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email.length !== 0 && (
                <p className=" my-2 ml-2 text-red-600 text-xs">
                  {errors.email}
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
              <div className="mt-2">
                <div className="mt-2 flex flex-row items-center relative">
                  <input
                    id="password"
                    name="password"
                    type={passwordVisibility ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={validatePasswordLength}
                    required
                    className="block bg-slate-100 w-full pe-8 pl-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                {errors.password.length !== 0 && (
                  <p className=" my-2 ml-2 text-red-600 text-xs">
                    {errors.password}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <div className="mt-2 flex flex-row items-center relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={cfmpasswordVisibility ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="block bg-slate-100 w-full pe-8 pl-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6"
                  />
                  {cfmpasswordVisibility ? (
                    <LuEye
                      onClick={() => {
                        setCFMPasswordVisibility(false);
                      }}
                      className=" absolute right-2.5 hover:cursor-pointer"
                    />
                  ) : (
                    <LuEyeOff
                      onClick={() => {
                        setCFMPasswordVisibility(true);
                      }}
                      className=" absolute right-2.5 hover:cursor-pointer"
                    />
                  )}
                </div>
                {errors.confirmPassword.length !== 0 && (
                  <p className=" my-2 ml-2 text-red-600 text-xs">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-slate-950 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register Now
              </button>
            </div>
          </form>
        </div>
        <p className="flex flex-row items-center mt-10 text-center text-sm text-gray-500">
          Already have an account ?
          <p
            onClick={() => {
              navigate("/login");
            }}
            className="font-semibold cursor-pointer leading-6 ml-2.5 text-blue-600 hover:text-blue-500"
          >
            Sign-In here
          </p>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
