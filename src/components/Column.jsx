import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { filterTask, filterOnSearch } from "../../utilities";

export default function Column({ column, filter, search, tasks = [] }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const filteredTasks = filterOnSearch(filterTask(tasks, filter), search);

  return (
    <div className="flex w-96 flex-col rounded-xl p-4 hover:shadow-md hover:shadow-gray-300 hover:bg-opacity-70 hover:bg-white min-h-screen sm:min-h-full mx-auto">
      <div className="">
        <h2 className="mb-4 font-semibold text-black shadow-lg p-2 inline-block rounded-lg bg-white">
          {column.title}
        </h2>
      </div>

      <div
        ref={setNodeRef}
        className="flex flex-1 flex-col gap-4 shadow-md shadow-gray-300 bg-blue-200 bg-opacity-20 border-x-2 rounded-xl p-2"
      >
        {filteredTasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}
