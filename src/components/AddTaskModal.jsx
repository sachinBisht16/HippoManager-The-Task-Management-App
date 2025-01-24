import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectActions } from "../store";
import { generateRandomId } from "../../utilities";

const AddTaskModal = forwardRef(function AddTaskModal({}, ref) {
  const dispatch = useDispatch();
  const latestEntries = useSelector((state) => state.projects.latestEntries);
  const currentProjectId = useSelector(
    (state) => state.projects.currentProject.id
  );

  const addTaskHandler = (e) => {
    e.preventDefault();

    const id = generateRandomId();
    dispatch(
      projectActions.newTask({
        ...latestEntries,
        id,
        projectId: currentProjectId,
      })
    );
    ref.current.close();
  };

  function categoryHandler(e) {
    const category = e.target.innerHTML.toLowerCase().trim();
    dispatch(projectActions.setEntries({ name: "category", value: category }));
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(projectActions.setEntries({ name, value }));
  };

  return (
    <dialog
      ref={ref}
      className="w-[70%] h-[60%] max-w-[600px] p-6 rounded-lg shadow-lg overflow-auto box-border"
    >
      <form action="" onSubmit={addTaskHandler} className="">
        <div className="">
          <header className="flex justify-between items-center border-b-2">
            <h1 className="text-xl font-semibold">Create Task</h1>
            <button
              type="button"
              className="text-3xl text-gray-500 hover:text-gray-800 focus:outline-none"
              onClick={() => ref.current.close()}
            >
              ×
            </button>
          </header>

          <input
            required
            value={latestEntries.title}
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="Task title"
            className="border-2 border-gray-300 w-full mt-4 p-1 rounded-lg text-sm focus:outline-none bg-slate-100"
          />

          <div className="mt-4 border-2 border-gray-300 rounded-lg relative">
            <textarea
              required
              value={latestEntries.description}
              name="description"
              onChange={handleChange}
              maxLength="3000"
              placeholder="Description"
              className="w-full h-24 bg-slate-100 border-gray-300 p-1 rounded-lg text-sm focus:outline-none"
            />
            <div className="flex justify-between items-center mt-2 absolute rounded-lg bottom-0 w-full bg-slate-100">
              <div className="flex space-x-2 p-1 bg-slate-100 ">
                <button className="text-gray-500 hover:text-gray-800 text-sm">
                  B
                </button>
                <button className="text-gray-500 hover:text-gray-800 text-sm">
                  I
                </button>
                <button className="text-gray-500 hover:text-gray-800 text-sm">
                  U
                </button>
              </div>
              <span className="text-gray-500 text-xs p-1 bg-slate-100">
                {latestEntries.description.length}/3000 characters
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-lg flex justify-between m-auto">
            <div className="flex flex-col items-left">
              <label htmlFor="category" className="block text-gray-700 text-xs">
                Task Category
              </label>
              <div className="space-x-2 mt-2 flex">
                <button
                  type="button"
                  onClick={categoryHandler}
                  className={`border-2 border-gray-300 px-6 py-1 rounded-2xl text-xs font-semibold ${
                    latestEntries.category === "work"
                      ? "bg-purple-600 border-none text-white"
                      : ""
                  }`}
                  required
                >
                  Work
                </button>
                <button
                  type="button"
                  onClick={categoryHandler}
                  className={`border-2 border-gray-300 px-6 py-1 rounded-2xl text-xs font-semibold ${
                    latestEntries.category === "personal"
                      ? "bg-purple-600 text border-none text-white"
                      : ""
                  }`}
                  required
                >
                  Personal
                </button>
              </div>
            </div>
            <div className=" flex flex-col justify-between text-xs m-auto gap-1">
              <label htmlFor="dueDate" className="">
                Due On
              </label>

              <input
                name="dueDate"
                value={latestEntries.dueDate}
                onChange={handleChange}
                type="date"
                required
                className="border-2 px-2 py-1 rounded-lg focus:outline-none"
              />
            </div>
            <div className=" flex flex-col justify-between text-xs">
              <label htmlFor="status" className="">
                Task Status
              </label>
              <select
                name="status"
                value={latestEntries.status}
                onChange={handleChange}
                id="status"
                required
                className="border-2 px-2 py-1 rounded-lg focus:outline-none"
              >
                <option value="">Select</option>
                <option value="todo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="done">Done</option>
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
              <span className="underline text-blue-600">Update</span>
            </button>
            <input
              id="fileInput"
              type="file"
              // onchange="handleFileChange(event)"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

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
        </div>
      </form>
    </dialog>
  );
});

export default AddTaskModal;
