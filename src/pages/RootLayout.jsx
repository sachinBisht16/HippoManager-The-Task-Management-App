import { useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

import { projectActions } from "../store/index";

import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Column from "../components/Column";

export default function RootLayout() {
  const dispatch = useDispatch();

  const COLUMNS = useSelector((state) => state.projects.columns);
  const filter = useSelector((state) => state.projects.filterBy);
  const searchValue = useSelector((state) => state.projects.search);

  const currentProjectName = useLoaderData();
  const projects = useSelector((state) => state.projects.projects);

  let currentProject = useSelector((state) => state.projects.currentProject);

  if (Object.keys(currentProject).length === 0) {
    currentProject =
      projects.find((project) => project.name === currentProjectName) || {};
  }

  useEffect(() => {
    if (currentProject.id)
      dispatch(projectActions.openProject({ id: currentProject.id }));
  }, [projects, dispatch]);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    dispatch(projectActions.updateTask({ taskId, newStatus }));
  }

  return (
    <div className="flex flex-col h-screen">
      <Topbar />
      <div className="flex flex-1 flex-grow">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          <Header />
          <Navigation />
          <hr />
          <main className="p-4 flex h-full flex-1 bg-gray-50 border-2">
            <div className="flex gap-8">
              <DndContext onDragEnd={handleDragEnd}>
                {COLUMNS.map((column) => (
                  <Column
                    key={column.id}
                    column={column}
                    filter={filter}
                    search={searchValue}
                    tasks={currentProject.tasks?.filter(
                      (task) =>
                        task.status.toLowerCase().trim() ===
                        column.id.toLowerCase().trim()
                    )}
                  />
                ))}
              </DndContext>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
