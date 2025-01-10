import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskActions } from "../store";
import { formatMilliseconds } from "../../utilities";

const EditTask = forwardRef(function EditTask({ task }, ref) {
  const { createdOn, movedOn, movedFrom } = useSelector(
    () => task.activityData
  );

  const [updatedTask, setUpdatedTask] = useState(task);
  const dispatch = useDispatch();

  const updateTaskHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const saveTaskHandler = (e) => {
    e.preventDefault();
    dispatch(taskActions.editTask(updatedTask));
    ref.current.close();
  };

  return (
    <dialog
      onSubmit={saveTaskHandler}
      ref={ref}
      className="p-6 max-w-7xl h-4/6 rounded-md bg-white shadow-lg"
    >
      <form action="" className="space-y-6 h-full flex flex-col">
        <header className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800">Edit Task</h2>
          <button
            type="button"
            onClick={() => ref.current.close()}
            aria-label="Close"
            className="text-lg text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            ✕
          </button>
        </header>
        <hr />

        <div className="flex h-4/6">
          <main className="w-3/5 pr-4 space-y-4 overflow-y-auto">
            <input
              value={updatedTask.title}
              onChange={updateTaskHandler}
              type="text"
              name="title"
              placeholder="Task Title"
              className="border-2 border-gray-300 w-full mt-4 p-1 rounded-lg text-sm focus:outline-none bg-slate-100"
              required
            />
            <div className=" border-2 relative border-gray-300 rounded-lg bg-slate-100 text-xs">
              <textarea
                required
                value={updatedTask.description}
                onChange={updateTaskHandler}
                maxLength="3000"
                name="description"
                placeholder="Description"
                className="w-full h-24 bg-slate-100 border-gray-300 p-1 rounded-lg text-sm focus:outline-none"
              />
              <div className="flex justify-between items-center mt-2 absolute bottom-0 z-10 w-full rounded-lg">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    className="text-gray-500 hover:text-gray-800"
                  >
                    U
                  </button>
                </div>
                <span className="text-gray-500">
                  {task.description.length}/3000 characters
                </span>
              </div>
            </div>

            <div className=" rounded-lg flex text-xs justify-between m-auto">
              <div className="flex flex-col justify-between">
                <label htmlFor="category" className="block text-gray-700">
                  Task Category
                </label>
                <div className="space-x-2 mt-2">
                  <button
                    type="button"
                    className={`border-2 border-gray-300 px-4 py-1 font-semibold rounded-2xl hover:bg-gray-200 ${
                      updatedTask.category === "work"
                        ? "bg-purple-600 hover:bg-purple-500 text-white"
                        : ""
                    }`}
                  >
                    Work
                  </button>
                  <button
                    type="button"
                    className={`border-2 border-gray-300 px-4 font-semibold py-1 rounded-2xl hover:bg-gray-200 ${
                      updatedTask.category === "personal"
                        ? "bg-purple-600 hover:bg-purple-500 text-white"
                        : ""
                    }`}
                  >
                    Personal
                  </button>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <label htmlFor="dueDate" className="text-gray-700 text-xs">
                  Due On
                </label>
                <input
                  value={updatedTask.dueDate}
                  onChange={updateTaskHandler}
                  name="dueDate"
                  type="date"
                  required
                  className="w-full border-2 border-gray-300 text-xs mt-2 p-1 rounded-lg focus:outline-none"
                />
              </div>

              <div className="flex flex-col justify-between">
                <label htmlFor="status" className="text-gray-700 text-xs">
                  Task Status
                </label>
                <select
                  value={updatedTask.status.toLowerCase()}
                  onChange={updateTaskHandler}
                  name="status"
                  id="status"
                  required
                  className="w-full border-2 text-xs border-gray-300 mt-2 p-1 rounded-lg focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="todo">To Do</option>
                  <option value="inprogress">In Progress</option>
                  <option value="done">DONE</option>
                </select>
              </div>
            </div>

            <div className="relative  flex flex-col mt-4 gap-1">
              <label htmlFor="">Attachment</label>
              <button
                // onclick="document.getElementById('fileInput').click()"
                className="px-4 py-2  text-black border-2 bg-slate-100 rounded-md hover:bg-blue-600 transition"
              >
                Drop your files here or
                <span className="underline text-blue-600"> Update</span>
              </button>
              <input
                id="fileInput"
                type="file"
                // onchange="handleFileChange(event)"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </main>

          <aside className="w-2/5  space-y-2 ">
            <h3 className="text-lg font-semibold text-gray-800">Activity</h3>
            <div className="mt-4 space-y-2 bg-gray-100 h-full p-4 border-t-2 border-t-gray-400">
              <div>
                <p>You created this task</p>
                <p className="text-sm text-gray-500">
                  {formatMilliseconds(createdOn)}
                </p>
              </div>
              {movedOn && (
                <div>
                  <p>
                    You changed the status from {movedFrom.toLowerCase()} to{" "}
                    {task.status.toLowerCase()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatMilliseconds(movedOn)}
                  </p>
                </div>
              )}
              <div>
                <p>You uploaded a file</p>
                <p className="text-sm text-gray-500">Date</p>
              </div>
            </div>
          </aside>
        </div>
        <hr />
        <footer className="mt-6 flex justify-end space-x-4 w-full">
          <button
            type="button"
            onClick={() => ref.current.close()}
            className="px-8 py-2 rounded-3xl bg-white border-2 hover:text-gray-700 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-500 px-8 py-2 rounded-3xl text-white hover:text-gray-400"
          >
            Add Task
          </button>
        </footer>
      </form>
    </dialog>
  );
});

export default EditTask;
