import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { filterTask, filterOnSearch } from "../../utilities";

export default function Row({ column, filter, search, tasks = [] }) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const filteredTasks = filterOnSearch(filterTask(tasks, filter), search);

  return (
    <div className="flex w-full flex-col rounded-sm p-2 flex-grow hover:shadow-md hover:shadow-gray-300 hover:bg-opacity-70 hover:bg-white ">
      <div>
        <h2
          className="mb-4 font-semibold text-black shadow-lg p-2 inline-block 
        rounded-lg bg-white"
        >
          {column.title}
        </h2>
      </div>

      <div
        ref={setNodeRef}
        className="flex flex-1 flex-col gap-0 shadow-md shadow-gray-300 bg-blue-200 bg-opacity-20 border-x-2 rounded-sm p-2 w-full mx-auto"
      >
        {filteredTasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}
