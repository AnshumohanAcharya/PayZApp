import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DefaultLayout = (props) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const userMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-smile-line"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/login",
    },
  ];

  const AdminMenu = [
    {
      title: "Home",
      icon: <i className="ri-home-smile-line"></i>,
      onClick: () => navigate("/"),
      path: "/",
    },
    {
      title: "Users",
      icon: <i className="ri-group-3-line"></i>,
      onClick: () => navigate("/users"),
      path: "/users",
    },
    {
      title: "Transactions",
      icon: <i className="ri-bank-line"></i>,
      onClick: () => navigate("/transactions"),
      path: "/transactions",
    },
    {
      title: "Requests",
      icon: <i className="ri-hand-heart-line"></i>,
      onClick: () => navigate("/requests"),
      path: "/requests",
    },
    {
      title: "Logout",
      icon: <i className="ri-logout-box-line"></i>,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
      path: "/login",
    },
  ];

  const { user } = useSelector((state) => state.user);
  const menuToRender = user?.isAdmin ? AdminMenu : userMenu;

  return (
    <div className="flex p-[15px] h-screen gap-[15px]">
      <div className="bg-primary p-[15px] rounded-[3px] h-full flex items-center">
        <div className="flex flex-col gap-[15px]">
          {menuToRender.map((item) => {
            const isActive = item.path === window.location.pathname;
            return (
              <div
                className={`flex text-white gap-[15px] px-[5px] py-[10px] items-center cursor-pointer ${
                  isActive
                    ? "text-secondary"
                    : ""
                }`}
                key={item.title}
                onClick={item.onClick}
              >
                {item.icon}
                {!collapsed && (
                  <h1
                    className={`${isActive ? "text-secondary" : "text-white"}`}
                  >
                    {item.title}
                  </h1>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full">
        <div className="bg-primary p-[15px] rounded-[3px] w-full flex justify-between items-center">
          <div className="text-white text-[20px] cursor-pointer">
            {!collapsed ? (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            ) : (
              <i
                className="ri-menu-2-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
          </div>
          <div>
            <h1 className="text-xl text-white">PayZApp</h1>
          </div>
          <div>
            <h1 className="text-sm underline text-white">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </div>
        <div className="p-[15px] ">{props.children}</div>
      </div>
    </div>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
