import { useDispatch, useSelector } from "react-redux";

import { Outlet } from "react-router-dom";
import { uiActions } from "../store/index";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function RootLayout() {
  const dispatch = useDispatch();

  const toggleSidebarHandler = () => {
    dispatch(uiActions.toggleSidebar());
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Topbar toggleSidebar={toggleSidebarHandler} />

      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex flex-col flex-grow overflow-auto">
          <Header />
          <hr />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
