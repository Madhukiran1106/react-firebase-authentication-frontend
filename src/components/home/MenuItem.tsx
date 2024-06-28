import React from "react";

interface HomepageMenuItemProps {
  title: string;
  icon: () => React.ReactNode;
}

const HomepageMenuItem: React.FC<HomepageMenuItemProps> = ({ icon, title }) => {
  return (
    <div className=" flex flex-row items-center py-4 text-gray-600 font-medium">
      <div className=" mr-5">{icon()}</div>
      <p>{title}</p>
    </div>
  );
};

export default HomepageMenuItem;
