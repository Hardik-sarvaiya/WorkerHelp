import { FcGoogle } from "react-icons/fc";
import { useSelector } from "react-redux";

//import frameImg from "../../../assets/"
import frameImg from "../../../assets/Logo2.jpg";
import Image from "../../../assets/LoginPhoto/pattern.png";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function Template({ title, description1, description2, image, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12">
          <div className="mx-auto w-11/12 max-w-[450px] md:mx-0">
            <h1 className="text-[1.875rem] text-4xl lg:text-4xl font-extrabold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-900">
              {title}
            </h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
              <span className="text-gray-100">{description1}</span>{" "}
              <span
                className="font-edu-sa font-bold
              italic text-blue-200"
              >
                {description2}
              </span>
            </p>
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
          <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0">
          
            <img
              src={Image}
              alt="pattern"
              width={558}
              height={504}
              loading="lazy"
              className="rounded-xl shadow-2xl border border-gray-200"
            />
            <img
              src={frameImg}
              alt="Students"
              width={558}
              height={504}
              loading="lazy"
              className="absolute -top-0.5 right-4 z-10 rounded-xl shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
