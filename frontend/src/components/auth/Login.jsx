import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import axios from 'axios'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from "../../../redux/authSlice.js";
import store from "../../../redux/store.js";
import { Loader2 } from "lucide-react";






const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const {loading,user} = useSelector( store => store.auth)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };


const submitHandler = async(e)=>{
    e.preventDefault();
    try{
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`,input,{
        headers:{
          "Content-Type":"application/json"
        },
        withCredentials:true
      });
      if(res.data.success){
        dispatch(setUser(res.data.user))
        navigate("/");
        toast.success(res.data.message)
      }
    }catch(error){
  console.log(error);
  toast.error(error.response.data.message)
  
    }finally{
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

      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-600 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Login</h1>

          <div>
            <Label htmlFor="name">Email</Label>
            <Input
              type="email"
              placeholder="thesubhprabhat@gmail.com"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>

          <div>
            <Label htmlFor="email">Password</Label>
            <Input
              type="password"
              placeholder="Enter password"
              name="password"
              value={input.password}
              onChange={changeEventHandler}
            />
          </div>
          <div className=" flex items-center justify-between mt-5">
            <RadioGroup
              defaultValue="comfortable"
              className=" flex items-center gap-4 my-5">
              <div className=" flex items-center space-x-2">
                {/* <RadioGroupItem value="default" id="r1" /> */}
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
                {/* <RadioGroupItem value="comfortable" id="r2" /> */}
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
          </div>
          {
            loading ? <Button className=" w-full my-4"><Loader2 className=" mr-2 w-4 h-4 animate-spin"/>Please Wait</Button>:<Button type="submit" className=" w-full my-5">
            Login
          </Button>
          }


          
          <span className=" text-sm">
            Don't have an account ?{" "}
            <Link to="/signup" className=" text-blue-600 text-sm">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
