import { useDispatch } from "react-redux";

import { Outlet } from "react-router-dom";
import { uiActions } from "../store/index";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Main() {
  const dispatch = useDispatch();

  const toggleSidebarHandler = () => {
    dispatch(uiActions.toggleSidebar());
  };

  return (
    <div className="flex flex-col h-screen">
      <Topbar toggleSidebar={toggleSidebarHandler} />

      <div className="flex flex-grow h-full overflow-auto relative">
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
