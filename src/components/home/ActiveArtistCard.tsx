import React from "react";
import banner from "../../assets/posts (1).jpg";
import user from "../../assets/user (2).jpg";

const ActiveArtistCard: React.FC = () => {
  return (
    <div className="my-2.5 w-full h-36 relative rounded-xl overflow-hidden">
      <img src={banner} alt="" className="w-full h-full object-cover" />
      <div className=" absolute top-0 left-0 bg-black bg-opacity-25 w-full h-full flex flex-col items-start justify-end">
        <div className=" relative text-white flex flex-row items-center mb-4 ml-4">
          <div className=" relative">
            <div className=" absolute -right-1 -top-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white "></div>
            <img
              src={user}
              alt=""
              className=" w-12 h-12 rounded-lg object-cover border-2 border-white"
            />
          </div>
          <div>
            <p className=" ml-3 font-medium">Madhi Kiran</p>
            <p className=" text-sm ml-3">@KillerMadhu</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveArtistCard;
