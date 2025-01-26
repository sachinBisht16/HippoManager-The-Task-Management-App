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
    <div className="flex flex-col h-screen">
      <Topbar toggleSidebar={toggleSidebarHandler} />

      <div className="flex flex-1 flex-grow">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Header />
          <hr />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
