import loginImg from "../assets/Logo2.jpg";
import  Template from "../components/core/Auth/Template";

const Signup = () => {
  return (
    <Template 
      title="Welcome Back"
      description1="Work Together. Achieve Together."
      description2="Building Connections, Creating Success."
      image={loginImg}
      formType="signup"
    />
  )
}

export default Signup