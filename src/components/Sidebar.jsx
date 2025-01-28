import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { projectActions } from "../store";
import { uiActions } from "../store";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.projects);
  const userName = useSelector((state) => state.projects.user.name);
  const showSidebar = useSelector((state) => state.ui.showSidebar);
  const showProjects = useSelector((state) => state.ui.showProjects);

  const openProjectHandler = (id, projectName) => {
    dispatch(projectActions.openProject({ id }));
    navigate("dashboard/board/" + `${projectName.toLowerCase()}`);
  };

  const toggleProjects = () => {
    dispatch(uiActions.toggleProjects());
  };

  const navigateToHome = () => {
    navigate(`/${userName.toLowerCase().split(" ").join("-")}/home`);
  };

  return (
    <aside
      className={`z-10 w-1/6 min-w-[250px] md:relative fixed h-full md:h-auto bg-gray-800 flex-col space-y-2 opacity-90 md:opacity-100 
        ${showSidebar ? "hidden md:flex" : "flex md:hidden"}`}
    >
      <ul className="text-white mx-5 mt-2 space-y-1">
        <li
          onClick={navigateToHome}
          className="cursor-pointer font-semibold text-sm px-2 py-1 hover:bg-gray-50 hover:bg-opacity-10 hover:rounded-lg w-full text-left flex gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100"
            height="100"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M3 12L12 3l9 9v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8z" />
            <path d="M9 21V12h6v9" />
          </svg>
          Home
        </li>
      </ul>
      <hr className="mx-4" />
      <ul className="text-white mx-5 mt-2">
        <li
          onClick={toggleProjects}
          className="cursor-pointer font-semibold text-sm px-2 py-1 hover:bg-gray-50 hover:bg-opacity-10  hover:rounded-lg w-full text-left flex gap-2 justify-between"
        >
          <span className="flex gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="100"
              height="100"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M6 2H18a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
              <path d="M6 2v16h12V2" />
            </svg>

            <p>Projects</p>
          </span>
          <button className="flex items-center justify-center text-white hover:bg-gray-700 transition-all">
            {showProjects ? (
              <span
                className="w-2 h-2 bg-transparent border-t-4 border-r-4 border-gray-300"
                style={{ transform: "rotate(135deg)" }}
              ></span>
            ) : (
              <span className="w-2 h-2 bg-transparent border-t-4 border-r-4 border-gray-300 -rotate-45"></span>
            )}
          </button>
        </li>
        {showProjects && (
          <ul className="font-semibold text-sm py-2 space-y-1 pl-6">
            {projects.map((project) => (
              <li
                key={project.id}
                className="cursor-pointer font-semibold text-sm px-2 py-1 hover:bg-gray-50 hover:bg-opacity-10  hover:rounded-lg w-full text-left flex gap-2"
                onClick={() => openProjectHandler(project.id, project.name)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="50"
                  height="50"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3"
                >
                  <path d="M3 4h12l3 3v13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
                </svg>

                <p>{project.name}</p>
              </li>
            ))}
          </ul>
        )}
      </ul>
    </aside>
  );
}
