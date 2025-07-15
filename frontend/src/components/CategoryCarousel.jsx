import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../../redux/jobSlice";

const category = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Redux Toolkit",
    "Express.js",
    "MongoDB",
    "Node.js",
    "C++",
    "DSA",
    "Tailwind CSS",
    "Material UI",
    "Bootstrap",
    "RESTful APIs",
    "MySQL",
    "Git/GitHub",
    "Postman",
    "Hopscotch",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query)=>{
      dispatch(setSearchedQuery(query))
      navigate("/browse");
    }

  return (
    <div>
      <Carousel className=" w-full max-w-xl mx-auto my-20 ">
        <CarouselContent>
        {
            category.map((cat, index)=>(
                <CarouselItem className='md-basis-1/2 lg-basis-1/3' key={index}>
                    <Button
                    onClick={()=>searchJobHandler(cat)}
                     variant="outline" className=" rounded-full">{cat}</Button>
                </CarouselItem>

            ))
        }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
