import AdminJobs from "./components/admin/AdminJob";
import AdminJob from "./components/admin/AdminJob";
import Applicants from "./components/admin/Applicants";
import Companies from "./components/admin/Companies";
import CompanyCreate from "./components/admin/CompanyCreate";
import CompanySetup from "./components/admin/CompanySetup";
import PostJob from "./components/admin/PostJob";
import ProtectedRoute from "./components/admin/ProctectedRoute";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Browse from "./components/Browse";
import Home from "./components/Home";
import JobDescription from "./components/JobDescription";
import Jobs from "./components/Jobs";
import Profile from "./components/Profile";
import Navbar from "./components/shared/Navbar"
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

const appRouter = createBrowserRouter([
{
  path:"/",
  element:<Home/>
},
{
  path:"/login",
  element:<Login/>
},
{
  path:"/signup",
  element:<Signup/>
},
{
  path:"/jobs",
  element:<Jobs/>
},
{
  path:"/description/:id",
  element:<JobDescription/>
},
{
  path:"/browse",
  element:<Browse/>
},
{
  path:"/profile",
  element:<Profile/>
},

// Admin ke liye yaha se start hoga 

// {
//   path:"/admin/companies",
//   element:<Companies/>
// },
// {
//   path:"/admin/companies/create",
//   element:<CompanyCreate/>
// },
// {
//   path:"/admin/companies/:id",
//   element:<CompanySetup/>
// },
// {
//   path:"/admin/jobs",
//   element:<AdminJob/>
// },
// {
//   path:"/admin/jobs/create",
//   element:<PostJob/>
// },
// {
//   path:"/admin/jobs/:id/applicants",
//   element:<Applicants/>
// },

{
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:"admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:"admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },

])



function App() {
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
