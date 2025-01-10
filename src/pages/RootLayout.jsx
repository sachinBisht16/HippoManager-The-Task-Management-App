import { useDispatch, useSelector } from "react-redux";
import { Column } from "../components/Column";
import { DndContext } from "@dnd-kit/core";

import { taskActions } from "../store/index";

import Header from "../components/Header";
import Navigation from "../components/Navigation";

export default function RootLayout() {
  const tasks = useSelector((state) => state.tasks);
  const COLUMNS = useSelector((state) => state.columns);
  const filter = useSelector((state) => state.filterBy);
  const searchValue = useSelector((state) => state.search);
  const dispatch = useDispatch();

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    dispatch(taskActions.updateTask({ taskId, newStatus }));
  }

  return (
    <div className="h-full flex flex-col flex-1 min-h-screen">
      <Header />
      <Navigation />
      <hr />
      <main className="p-4 flex h-full flex-1">
        <div className="flex gap-8 bg-white">
          <DndContext onDragEnd={handleDragEnd}>
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                filter={filter}
                search={searchValue}
                tasks={tasks?.filter(
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
  );
}
