import { auth } from "../firebase/firebase";
import { signOut } from "firebase/auth";

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
  const viewMode = useSelector((state) => state.ui.viewMode);
  const showProjects = useSelector((state) => state.ui.showProjects);
  const showDeleteButtonIndex = useSelector(
    (state) => state.ui.deleteProjectButtonIndex
  );

  const currentProjectId = useSelector(
    (state) => state.projects.currentProject?.id
  );

  const deleteProjectHandler = (e, id) => {
    e.stopPropagation();

    if (currentProjectId && currentProjectId === id) {
      navigateToHome();
    }
    dispatch(projectActions.openProject());
    dispatch(projectActions.deleteProject({ id }));
  };

  const openProjectHandler = (id, projectName) => {
    dispatch(projectActions.openProject({ id }));
    navigate(`dashboard/${viewMode}/${projectName.toLowerCase()}`);
  };

  const toggleProjects = () => {
    dispatch(uiActions.toggleProjects());
  };

  const navigateToHome = () => {
    navigate(`/${userName.toLowerCase().split(" ").join("-")}/home`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User successfully logged out");

      dispatch(projectActions.reset());

      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const toggleDeleteProject = (index) => {
    dispatch(uiActions.toggleDeleteProjectButton({ index }));
  };

  return (
    <aside
      className={`z-10 w-1/6 min-w-[250px] md:relative absolute h-full md:h-auto bg-gray-800 flex-col space-y-2 opacity-90 md:opacity-100 
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
                className="cursor-pointer font-semibold text-sm px-2 py-1 hover:bg-gray-50 hover:bg-opacity-10  hover:rounded-lg w-full text-left flex gap-2 relative"
                onClick={() => openProjectHandler(project.id, project.name)}
                onMouseEnter={() => toggleDeleteProject(project.id)}
                onMouseLeave={() => toggleDeleteProject(null)}
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
                {project.id === showDeleteButtonIndex && (
                  <img
                    src="/assets/delete-project.webp"
                    alt="Delete-Project"
                    className="size-5 p-[2px] absolute rounded-full right-2 bg-gray-600"
                    onClick={(e) => deleteProjectHandler(e, project.id)}
                  />
                )}
              </li>
            ))}
          </ul>
        )}
      </ul>

      <footer className="absolute bottom-0 flex flex-col gap-2 w-full">
        <hr className="mx-4 mb-0" />
        <ul className="text-white mx-5 mt-2 space-y-1">
          <li className="flex items-center gap-2 p-2 text- font-medium rounded ">
            <img
              src="/assets/profile-img.webp"
              alt="Profile"
              className="h-7 w-7 rounded-2xl"
            />
            <h3 className="hover:text-gray-50 text-white">
              {userName
                .split(" ")
                .map((word) => word[0].toUpperCase() + word.slice(1))
                .join(" ")}
            </h3>
          </li>
          <li
            onClick={() => handleLogout()}
            className="flex justify-center items-center mx-auto text-black gap-2 py-2 bg-stone-400 text-sm font-semibold rounded-sm hover:opacity-80"
          >
            <svg
              viewBox="0 0 15 15"
              fill="none"
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.40055 8.20313H10.5467C10.935 8.20313 11.2498 7.88832 11.2498 7.50001C11.2498 7.1117 10.935 6.79689 10.5467 6.79689H2.40055L3.30964 5.8878C3.58423 5.61321 3.58423 5.16804 3.30964 4.89344C3.03509 4.61885 2.58987 4.61885 2.31528 4.89344L0.206014 7.00276C0.189561 7.01921 0.173999 7.03646 0.15928 7.05446C0.152858 7.06229 0.14728 7.07059 0.141233 7.0786C0.133499 7.08891 0.12553 7.09899 0.118359 7.10973C0.111796 7.11952 0.106124 7.1297 0.100124 7.13973C0.0943588 7.14938 0.0883119 7.15881 0.0830151 7.16874C0.0774839 7.17906 0.0728433 7.18965 0.0678746 7.20015C0.0629996 7.21041 0.0578903 7.22054 0.0535309 7.23104C0.0493122 7.2413 0.0458435 7.25176 0.0421404 7.26216C0.0380623 7.27341 0.0337498 7.28452 0.0302811 7.29601C0.0271405 7.30641 0.0248436 7.31696 0.0222186 7.32751C0.0192655 7.33918 0.0159843 7.3508 0.0136405 7.36271C0.0112499 7.37485 0.00979681 7.38713 0.00806245 7.39937C0.00656246 7.40982 0.00454685 7.42013 0.0035156 7.43072C0.00126562 7.45341 9.37494e-05 7.47624 4.68747e-05 7.49902C4.68747e-05 7.49935 0 7.49972 0 7.50005C0 7.50038 4.68747e-05 7.50076 4.68747e-05 7.50108C9.37494e-05 7.52391 0.00126562 7.54669 0.0035156 7.56943C0.00454685 7.57988 0.00651558 7.59005 0.0079687 7.60041C0.00974994 7.61279 0.0112031 7.62516 0.0136405 7.63744C0.0159843 7.64926 0.0192186 7.66069 0.0221717 7.67227C0.0248436 7.68291 0.0271873 7.69365 0.0303748 7.70419C0.0337967 7.71549 0.0380623 7.72641 0.0419997 7.73747C0.0457966 7.74807 0.0492653 7.75871 0.0535778 7.76911C0.0578434 7.77943 0.062859 7.78932 0.0676402 7.79939C0.0727027 7.81013 0.0774839 7.82096 0.0831088 7.8315C0.0882651 7.84111 0.0941244 7.85025 0.0997025 7.85958C0.105843 7.86994 0.111702 7.88039 0.118452 7.89047C0.125296 7.90074 0.132937 7.91035 0.140296 7.92024C0.146671 7.92872 0.152577 7.93749 0.159374 7.94574C0.17339 7.9628 0.188249 7.97916 0.203764 7.99486C0.204514 7.99561 0.205124 7.99646 0.205874 7.99721L2.31524 10.1066C2.45258 10.2439 2.63248 10.3126 2.81244 10.3126C2.99234 10.3125 3.17234 10.2439 3.30959 10.1067C3.58418 9.83207 3.58418 9.3869 3.30964 9.11231L2.40055 8.20313Z"
                fill="black"
              />
              <path
                d="M14.2968 1.17188H5.39062C5.00231 1.17188 4.6875 1.48669 4.6875 1.875V4.68748C4.6875 5.07579 5.00231 5.3906 5.39062 5.3906C5.77893 5.3906 6.09374 5.07579 6.09374 4.68748V2.57812H13.5937V12.4219H6.09374V10.3124C6.09374 9.92413 5.77893 9.60932 5.39062 9.60932C5.00231 9.60932 4.6875 9.92413 4.6875 10.3124V13.125C4.6875 13.5133 5.00231 13.8281 5.39062 13.8281H14.2968C14.6851 13.8281 14.9999 13.5133 14.9999 13.125V1.875C14.9999 1.48669 14.6851 1.17188 14.2968 1.17188Z"
                fill="black"
              />
            </svg>

            <h2 className="">Logout</h2>
          </li>
        </ul>
        <div className="flex items-center gap-4"></div>
      </footer>
    </aside>
  );
}
