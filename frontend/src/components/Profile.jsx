import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {Contact, Mail, Pen } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';


// const skills = ["HTML", "CSS", "JAVASCRIPT", "REACT", "MONGODB", "EXPRESS"];
const isResume = true;


const Profile = () => {
  useGetAppliedJobs();
  const [open,setOpen] = useState(false)
  const {user} = useSelector(store=>store.auth);

  return (
    <div>
        <Navbar/>
        <div className=' max-w-5xl mx-auto bg-white border border-gray-500 rounded-2xl my-5 p-8'>
          <div className=' flex justify-between'>
            <div className=' flex items-center gap-4'>
              <Avatar>
                <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZ584acfWMPuHP7nRm1z5_Yt5zLmKyGrANsQ&s" />
              </Avatar>
              <div>
                <h1 className=' font-medium text-xl'>{user?.fullName}</h1>
                <p>{user?.profile?.bio}</p>
              </div>
              <Button variant="outline" className="text-right" onClick={()=> setOpen(true)}><Pen/></Button>
            </div>
            

            </div>
            <div className=' my-5'>

              <div className=' flex items-center gap-3  '>
                <Mail/>
                <span>{user?.email}</span>
              </div>

              <div className=' flex items-center gap-3 my-2'>
                <Contact/>
                <span>{user?.phoneNumber}</span>
              </div>
          </div>
          <div className=' my-5'>
            <h1>Skills</h1>
            <div className=' flex items-center gap-1'>
            {
              user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
            }
            </div>
          </div>
          <div className=' grid w-full max-w-sm items-center gap-1.5'>
            <Label className=" text-md font-bold">Resume</Label>
            {
              isResume ? <a target="blank" href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
            }
            
          </div>
        </div>
        <div className=' max-w-4xl mx-auto bg-white rounded-2x'>
          <h1 className=' font-bold text-lg mx-auto bg-white rounded-2xl'>Applied Jobs</h1>
          <AppliedJobTable/>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
    </div>
  )
}

export default Profile