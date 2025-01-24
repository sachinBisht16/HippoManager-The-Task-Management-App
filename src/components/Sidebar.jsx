import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { projectActions } from "../store";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const projects = useSelector((state) => state.projects.projects);

  const openProjectHandler = (id, projectName) => {
    dispatch(projectActions.openProject({ id }));
    navigate("/dashboard/board/" + `${projectName}`);
  };

  const navigateToHome = () => {
    navigate("/home");
  };

  return (
    <aside className="w-1/6 relative bg-gray-800 flex flex-col">
      <ul className="text-white mx-5">
        <li>
          <button
            onClick={navigateToHome}
            className="font-semibold text-lg p-2 hover:bg-black"
          >
            Home
          </button>
        </li>
        <li className="p-2 rounded-lg text-left">
          <button className=" hover:bg-black font-semibold text-lg">
            Projects
          </button>
          <ul className="font-semibold text-base pl-2 py-2 space-y-2">
            {projects.map((project) => (
              <li
                className="bg-black rounded opacity-50 text-white p-1"
                key={project.id}
              >
                <button
                  onClick={() => openProjectHandler(project.id, project.name)}
                  className="px-2 w-full"
                >
                  {project.name}
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </aside>
  );
}
