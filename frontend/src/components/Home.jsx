import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJob from './LatestJob'
import Footer from './Footer'
import useGetAllJobs from '@/hooks/useGetAllJobs' // ✅ Import the hook here
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from '../../redux/store'

const Home = () => {
  useGetAllJobs(); // ✅ Use hook here once
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();


    useEffect(()=>{
    if(user?.role === "recruiter"){
      navigate("/admin/companies")
    } 
  });

  return (
    <div>
        <Navbar/>
        <HeroSection/>
        <CategoryCarousel/>
        <LatestJob/>
        <Footer/>

    </div>
  )
}

export default Home