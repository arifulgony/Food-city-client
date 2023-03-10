import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import ProductCart from './../../ProductsCart/ProductCart';
import Modal from '../../ProductsCart/Modal/Modal'


const ProductCard = () => {
  const [catagory, setCatagory] = useState();
  const [modal, setModal] = useState(null);
  const { filter } = useContext(AuthContext);

  const {data: Produc} = useQuery({
    queryKey: ["Produc"],
    queryFn: async () => {
      try {
        const res = await fetch(" https://food-city-server.vercel.app/allProducts", {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (error) {}
    },
  });

  useEffect(() => {
    
          if(filter === "Chicken"){
              const filter = Produc?.filter((item)=>item.category === "Chicken")
              setCatagory(filter)
          }
          if(filter === "Curry"){
              const filter = Produc?.filter((item)=>item.category === "Curry")
              setCatagory(filter)
          }
          

          if(filter === "Rice"){
              const filter = Produc?.filter((item)=>item.category === "Rice")
              setCatagory(filter)
          }
          if(filter === "Fish"){
            const filter = Produc?.filter((item)=>item.category === "Fish")
            setCatagory(filter)
        }
        if(filter === "Fruits"){
          const filter = Produc?.filter((item)=>item.category === "Fruits")
          setCatagory(filter)
      }
      if(filter === "Icecreams"){
        const filter = Produc?.filter((item)=>item.category === "Icecreams")
        setCatagory(filter)
    }      if(filter === "Soft Drinks"){
        const filter = Produc?.filter((item)=>item.category === "Soft Drinks")
        setCatagory(filter)
    }
  }, []);
  // console.log(catagory)


  return (
    <div className="px-5 my-10">
      <div className="grid gap-6 grid-cols-4 md:grid-cols-4 lg:grid-cols-5">
        {catagory?.map((singleCourse, i) => (
          <ProductCart
            key={singleCourse._id}
            singleCourse={singleCourse}
            setModal={setModal}
          ></ProductCart>
        ))}
      </div>
      { modal &&
        <Modal 
      modal={modal}
      setModal={setModal}
      ></Modal>
      }
    </div>
  );
};

export default ProductCard;