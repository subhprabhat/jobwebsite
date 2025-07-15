import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from '../../../utils/constant.js'
import axios from 'axios'
import { toast } from "sonner"
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux'
import store from "../../../redux/store.js";
import { setLoading } from "../../../redux/authSlice.js";
// import { setLoading, setUser } from '../../../redux/authSlice.js'

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const {loading, user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };


const submitHandler = async(e)=>{
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName",input.fullName)
    formData.append("email",input.email)
    formData.append("phoneNumber",input.phoneNumber)
    formData.append("password",input.password)
    formData.append("role",input.role)
if(input.file){
  formData.append("file",input.file)
}
    try{
      dispatch(setLoading(true));
      // console.log("API Endpoint:", USER_API_END_POINT);
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      });
      if(res.data.success){
        navigate("/login");
        toast.success(res.data.message)
      }
    }
    catch (error) {
      console.log(error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Something went wrong");
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
}
finally{
  dispatch(setLoading(false))
}
    
  }

  
    useEffect(()=>{
      if(user){
        navigate("/")
      }
    })





  return (
    <div>
      <Navbar />
      <div className=" flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className=" w-1/2 border border-gray-600 rounded-md p-4 my-10">
          <h1 className=" font-bold text-xl mb-5">Signup</h1>

          <div>
            <Label>FullName</Label>
            <Input
              type="text"
              placeholder="Prabhat Ranjan"
              name="fullName"
              onChange={changeEventHandler}
              value={input.fullName}
            />
          </div>

          <div>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              placeholder="thesubhprabhat@gmail.com"
              onChange={changeEventHandler}
              value={input.email}
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <Input
              type="text"
              name="phoneNumber"
              placeholder="+917070818144"
              onChange={changeEventHandler}
              value={input.phoneNumber}
            />
          </div>

          <div>
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Enter pasword"
              onChange={changeEventHandler}
              value={input.password}
            />
          </div>

          <div className=" flex items-center justify-between">
            <RadioGroup
              defaultValue="comfortable"
              className=" flex items-center gap-4 my-5">
              <div className=" flex items-center space-x-2">
                {/* <RadioGroupItem value="default" id="r1"/> */}
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  id="r1"
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>

              <div className=" flex items-center space-x-2">
                {/* <RadioGroupItem value="comfortable" id="r2"/> */}
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  id="r2"
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className=" flex items-center gap-5">
              <Label>Profile</Label>
              <Input
                accept="image"
                type="file"
                onChange={changeFileHandler}
                className=" cursor-pointer"
              />
            </div>
          </div>

          {
            loading ? <Button className=" w-full my-4"><Loader2 className=" mr-2 w-4 h-4 animate-spin"/>Please Wait</Button>:<Button type="submit" className=" w-full my-5">
            Signup
          </Button>
          }

          {/* <Button type="submit" className=" w-full my-5">
            Signup
          </Button> */}
          <span className=" text-sm">
            Already have an Account ?{" "}
            <Link to="/login" className=" text-blue-600 text-sm">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;



















// Yaha se aage paste kiya gya hai 
