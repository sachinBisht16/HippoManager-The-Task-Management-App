import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { filterTask, filterOnSearch } from "../../utilities";

export default function Column({ column, filter, search, tasks = [] }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const filteredTasks = filterOnSearch(filterTask(tasks, filter), search);

  const header_color =
    column.title === "To Do"
      ? "bg-red-400"
      : column.title === "Done"
      ? "bg-blue-400"
      : "bg-green-400";

  return (
    <div className="flex w-96 flex-col rounded-lg p-4 ">
      <div>
        <h2
          className={`mb-4 font-semibold text-neutral-100 p-2 inline-block rounded-md  ${header_color}`}
        >
          {column.title}
        </h2>
      </div>

      <div
        ref={setNodeRef}
        className="flex flex-1 flex-col gap-4 bg-gray-100 rounded-xl p-2"
      >
        {filteredTasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}
