import { DndContext } from "@dnd-kit/core";

import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Navigation from "../components/Navigation";
import Column from "./Column";
import { projectActions } from "../store";

export default function Project() {
  const currentProjectName = useLoaderData();
  const dispatch = useDispatch();

  const COLUMNS = useSelector((state) => state.projects.columns);
  const filter = useSelector((state) => state.projects.filterBy);
  const searchValue = useSelector((state) => state.projects.search);
  const projects = useSelector((state) => state.projects.projects);
  let currentProject = useSelector((state) => state.projects.currentProject);

  if (Object.keys(currentProject).length === 0) {
    currentProject =
      projects.find(
        (project) =>
          project.name.toLowerCase() === currentProjectName.toLowerCase()
      ) || {};
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
    <div className="relative flex-grow flex flex-col overflow-auto">
      <Navigation />
      <main className="flex flex-col flex-grow p-4 sm:flex-row gap-4 border-2 overflow-y-auto bg-gray-50">
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
      </main>
    </div>
  );
}
