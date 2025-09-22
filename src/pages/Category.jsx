import { TiThSmallOutline } from "react-icons/ti";
import { MdOutlineFreeBreakfast, MdOutlineFoodBank } from "react-icons/md";
import { TbSoup } from "react-icons/tb";
import { CiBowlNoodles } from "react-icons/ci";
import { GiFullPizza, GiHamburger } from "react-icons/gi";

export const categories = [
  {
    id: 1,
    name: "All",
    Icon: (
      <TiThSmallOutline className="w-12 h-12 md:w-16 md:h-16 text-green-600 
        bg-gradient-to-tr from-green-100 to-green-200 p-3 rounded-2xl shadow-lg 
        hover:scale-110 hover:shadow-2xl transition-transform duration-500 ease-in-out" />
    )
  },
  {
    id: 2,
    name: "Breakfast",
    Icon: (
      <MdOutlineFreeBreakfast className="w-12 h-12 md:w-16 md:h-16 text-yellow-600 
        bg-gradient-to-tr from-yellow-100 to-yellow-200 p-3 rounded-2xl shadow-lg 
        hover:scale-110 hover:shadow-2xl transition-transform duration-500 ease-in-out" />
    )
  },
  {
    id: 3,
    name: "Soups",
    Icon: (
      <TbSoup className="w-12 h-12 md:w-16 md:h-16 text-orange-600 
        bg-gradient-to-tr from-orange-100 to-orange-200 p-3 rounded-2xl shadow-lg 
        hover:scale-110 hover:shadow-2xl transition-transform duration-500 ease-in-out" />
    )
  },
  {
    id: 4,
    name: "Pasta",
    Icon: (
      <CiBowlNoodles className="w-12 h-12 md:w-16 md:h-16 text-red-500 
        bg-gradient-to-tr from-red-100 to-red-200 p-3 rounded-2xl shadow-lg 
        hover:scale-110 hover:shadow-2xl transition-transform duration-500 ease-in-out" />
    )
  },
  {
    id: 5,
    name: "Main Course",
    Icon: (
      <MdOutlineFoodBank className="w-12 h-12 md:w-16 md:h-16 text-blue-600 
        bg-gradient-to-tr from-blue-100 to-blue-200 p-3 rounded-2xl shadow-lg 
        hover:scale-110 hover:shadow-2xl transition-transform duration-500 ease-in-out" />
    )
  },
  {
    id: 6,
    name: "Pizza",
    Icon: (
      <GiFullPizza className="w-12 h-12 md:w-16 md:h-16 text-pink-600 
        bg-gradient-to-tr from-pink-100 to-pink-200 p-3 rounded-2xl shadow-lg 
        hover:scale-110 hover:shadow-2xl transition-transform duration-500 ease-in-out" />
    )
  },
  {
    id: 7,
    name: "Burger",
    Icon: (
      <GiHamburger className="w-12 h-12 md:w-16 md:h-16 text-purple-600 
        bg-gradient-to-tr from-purple-100 to-purple-200 p-3 rounded-2xl shadow-lg 
        hover:scale-110 hover:shadow-2xl transition-transform duration-500 ease-in-out" />
    )
  }
];

export default categories;
