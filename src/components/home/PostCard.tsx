import React from "react";
import dp from "../../assets/user (1).jpg";
import post from "../../assets/posts.jpg";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { CiHeart } from "react-icons/ci";
import { IoIosShareAlt } from "react-icons/io";
import { BsChat } from "react-icons/bs";

const PostCard: React.FC = () => {
  return (
    <div className="w-full py-5 px-8 my-4 bg-white rounded-md">
      <div className=" flex flex-row items-center justify-between w-full">
        <div className=" flex flex-row items-center">
          <img src={dp} alt="" className=" w-14 h-14 rounded object-cover" />
          <div className=" ml-2.5">
            <p className=" font-semibold">Madhu Kiran</p>
            <p className=" text-sm text-slate-500">@WarrierMadhu</p>
          </div>
        </div>
        <BiDotsVerticalRounded className=" text-3xl" />
      </div>
      <div className="my-5">
        <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout.
          <span className=" ml-1 font-medium text-red-500">Read More</span>
        </p>
      </div>
      <div className="w-full h-72">
        <img
          src={post}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className=" flex flex-row items-center mt-8">
        <div className=" flex flex-row items-center mr-5">
          <CiHeart className=" text-2xl font-semibold mr-2" />
          <p className=" text-lg font-semibold">9.8K</p>
        </div>
        <div className=" flex flex-row items-center mr-5">
          <IoIosShareAlt className=" text-2xl font-semibold mr-2" />
          <p className=" text-lg font-semibold">8.6K</p>
        </div>
        <div className=" flex flex-row items-center mr-5">
          <BsChat className=" text-xl font-semibold mr-2" />
          <p className=" text-lg font-semibold">7.2K</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
