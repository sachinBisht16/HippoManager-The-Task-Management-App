import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { projectActions } from "../store";
import { uiActions } from "../store";

import { getTimeDetails } from "../../utilities";

export default function Home() {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.projects.user.name);

  const showCreateProject = useSelector((state) => state.ui.showCreateProject);
  const view = useSelector((state) => state.ui.viewMode);

  const [projectName, setProjectName] = useState("");

  const { day, month, date, greeting } = getTimeDetails();

  const createHandler = async () => {
    const id = Date.now();

    if (projectName.trim() !== "") {
      dispatch(projectActions.createProject({ projectName, projectId: id }));
      setProjectName(() => "");
      dispatch(uiActions.newProject());
      navigate(
        `/${userName.toLowerCase().split(" ").join("-")}/dashboard/${view}/` +
          `${projectName.toLowerCase()}`
      );
    }

    dispatch(projectActions.openProject({ id }));
  };

  const newProjectHandler = () => {
    dispatch(uiActions.newProject());
  };

  useEffect(() => {
    if (inputRef.current && showCreateProject) inputRef.current.focus();
  }, [showCreateProject]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex bg-red-300 text-white h-full">
        <main className="w-full bg-white text-black flex flex-col ">
          <h1 className="text-3xl font-semibold">Home</h1>
          <div className="mx-auto mt-10  text-center">
            <h3 className="text-3xl">
              {day}, {month} {date}
            </h3>
            <h1 className="text-5xl font-semibold">
              {/* Good Morning, {user.name.split(" ")[0]} */}
              {greeting}, Sachin
            </h1>
          </div>

          <div className="mx-auto bg-gray-200 rounded-full opacity-30 overflow-hidden mt-8">
            <img
              className="w-80 h-72"
              src="/assets/get-started.webp"
              alt="Get Started"
            />
          </div>
          <div className="mx-auto flex flex-col space-y-2 w-1/6 mt-10 ">
            <button
              onClick={newProjectHandler}
              className="border-2 bg-black text-white p-2 text-lg rounded-xl"
            >
              New Project
            </button>
            {showCreateProject && (
              <div className="flex flex-col space-y-2">
                <label htmlFor="project" className="font-semibold">
                  New Project
                </label>
                <input
                  ref={inputRef}
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  type="text"
                  placeholder="give your project a name"
                  className="border-2 p-2 rounded"
                />
                <button
                  onClick={createHandler}
                  className="border-2 bg-green-500 text-black p-2 text-base font-semibold rounded-xl"
                >
                  Create
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
