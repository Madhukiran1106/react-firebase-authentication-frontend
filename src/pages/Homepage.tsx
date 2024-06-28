import React from "react";
import HomepageMenuItem from "../components/home/MenuItem";
import {
  IoHomeOutline,
  IoNotificationsOutline,
  IoStorefrontOutline,
  IoChatbubbleEllipsesOutline,
  IoWalletOutline,
  IoPersonOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { RiStarSmileLine } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import PostCard from "../components/home/PostCard";
import ActiveArtistCard from "../components/home/ActiveArtistCard";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";

type menuItemsType = {
  title: string;
  icon: () => React.ReactNode;
};

const menuItems: menuItemsType[] = [
  {
    title: "Home",
    icon: function (): React.ReactNode {
      return <IoHomeOutline />;
    },
  },
  {
    title: "Notifications",
    icon: function (): React.ReactNode {
      return <IoNotificationsOutline />;
    },
  },
  {
    title: "Shop",
    icon: function (): React.ReactNode {
      return <IoStorefrontOutline />;
    },
  },
  {
    title: "Conversation",
    icon: function (): React.ReactNode {
      return <IoChatbubbleEllipsesOutline />;
    },
  },
  {
    title: "Wallet",
    icon: function (): React.ReactNode {
      return <IoWalletOutline />;
    },
  },
  {
    title: "Subscription",
    icon: function (): React.ReactNode {
      return <RiStarSmileLine />;
    },
  },
  {
    title: "My Profile",
    icon: function (): React.ReactNode {
      return <IoPersonOutline />;
    },
  },
  {
    title: "Settings",
    icon: function (): React.ReactNode {
      return <IoSettingsOutline />;
    },
  },
];
const Homepage: React.FC = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  
  return (
    <div className=" h-screen w-full flex flex-row items-center bg-[#F5F5F5]">
      <div className="w-1/5 h-full p-5">
        {/* left side bar */}
        <div className="w-full py-4 px-8 justify-center bg-white rounded-md">
          <p className=" font-bold text-2xl">Relu</p>
        </div>
        <div className="w-full min-h-max px-8 py-4 justify-center bg-white rounded-md my-4">
          {menuItems.map((item) => (
            <HomepageMenuItem
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
          {!isLoggedIn() ? (
            <button
              onClick={() => {
                navigate("/signup");
              }}
              className=" mt-20 w-full py-2 text-white font-medium text-lg bg-slate-950 rounded-md"
            >
              Sign Up
            </button>
          ) : (
            <div
              onClick={logout}
              className=" text-red-600 cursor-pointer mt-20 mb-8 flex flex-row items-center"
            >
              <IoMdLogOut className=" mr-4" />
              <p>Log out</p>
            </div>
          )}
        </div>
      </div>
      <div className="w-2/3 h-full py-5 px-8 overflow-y-scroll scrollbar-hide ">
        {/* content  */}
        <div className="w-full py-5 px-8 flex flex-row items-center justify-between bg-white rounded-md">
          <div className="flex flex-row items-center">
            <IoSearchOutline />
            <input
              type="text"
              placeholder="Search here..."
              className=" ml-2.5"
            />
          </div>
          <div className="flex flex-row items-center">
            <VscSettings /> <p>Filters</p>
          </div>
        </div>
        <PostCard />
        <PostCard />
      </div>
      <div className="w-1/5 h-full py-5 px-5 ">
        {/* right side bar*/}
        <div className="py-5 text-white cursor-pointer px-8 flex flex-row items-center justify-center bg-[#88C2BB] text-xl font-medium rounded-md ">
          <p>Best Seller</p>
        </div>
        <div className="text-sm flex flex-row items-center my-4">
          <p className=" font-semibold mr-5">Artists</p>
          <p className=" text-slate-500">Photographers</p>
        </div>
        <div className=" h-[80%] w-full overflow-y-scroll scrollbar-hide">
          <ActiveArtistCard />
          <ActiveArtistCard />
          <ActiveArtistCard />
          <ActiveArtistCard />
          <ActiveArtistCard />
        </div>
        <div className=" flex flex-row items-center justify-evenly text-xs">
          <p>Privacy </p>
          <p>Terms of Service</p>
          <p>Cookie Notice</p>
        </div>
      </div>
    </div>
  );
};

function isLoggedIn() {
  const user = localStorage.getItem("user");
  const accessToken = localStorage.getItem("accessToken");
  if (user && accessToken) {
    try {
      const parsedUser = JSON.parse(user);
      if (parsedUser.uid && parsedUser.email) {
        console.log("Logged In");
        return true;
      }
    } catch (error) {
      console.error("Failed to parse user object from localStorage:", error);
    }
  }
  console.log("Logged Out");
  return false;
}

export default Homepage;
