import { DndContext } from "@dnd-kit/core";

import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Navigation from "../components/Navigation";
import Column from "../components/Column";
import Row from "../components/Row";
import { projectActions, uiActions } from "../store";

export default function Project() {
  const loaderData = useLoaderData();
  const dispatch = useDispatch();

  const COLUMNS = useSelector((state) => state.projects.columns);
  const filter = useSelector((state) => state.projects.filterBy);
  const searchValue = useSelector((state) => state.projects.search);
  const projects = useSelector((state) => state.projects.projects);
  let currentProject = useSelector((state) => state.projects.currentProject);

  const view = useSelector((state) => state.ui.viewMode);

  if (currentProject && Object.keys(currentProject).length === 0) {
    currentProject =
      projects.find(
        (project) =>
          project.name.toLowerCase() === loaderData.productName.toLowerCase()
      ) || {};
  }

  useEffect(() => {
    dispatch(uiActions.updateView({ view: loaderData.view }));
  }, []);

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

  const projectContainerStyles =
    view === "list"
      ? "flex flex-col h-full border-2 p-4 overflow-auto min-w-[1500px]  bg-gray-50"
      : "flex flex-col flex-grow p-4 sm:flex-row gap-4 border-2 overflow-y-auto bg-gray-50";

  // checking if project exist
  if (!currentProject) {
    return null;
  }

  return (
    <div className="relative flex-grow flex flex-col overflow-auto">
      <Navigation />
      <main className={projectContainerStyles}>
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) =>
            loaderData.view === "board" ? (
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
            ) : (
              <Row
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
            )
          )}
        </DndContext>
      </main>
    </div>
  );
}
