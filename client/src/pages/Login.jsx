import loginImg from "../assets/Logo2.jpg";
import  Template from "../components/core/Auth/Template";

const Login = () => {
  return (
    <Template 
      title="Welcome Back"
      description1="Work Together. Achieve Together."
      description2="Building Connections, Creating Success."
      image={loginImg}
      formType="login"
    />
  )
}

export default Login
