import { useRef } from "react";
import AddTaskModal from "./AddTaskModal";
import { projectActions } from "../store";
import { useDispatch, useSelector } from "react-redux";

export default function Navigation() {
  const createModalRef = useRef();
  const dispatch = useDispatch();
  const lastEntries = useSelector((state) => state.projects.lastEntries);
  const searchValue = useSelector((state) => state.projects.search);

  function openCreateModal() {
    dispatch(projectActions.clearTask(lastEntries));
    createModalRef.current.showModal();
  }

  function filterHandler(e) {
    const { name, value } = e.target;
    dispatch(projectActions.filterTask({ name, value }));
  }

  function searchHandler(e) {
    dispatch(projectActions.searchFilter(e.target.value));
  }

  return (
    <div className="mb-2">
      <AddTaskModal ref={createModalRef} />

      <nav className="flex flex-row gap-2 p-4">
        <div>
          <a
            href="#"
            className="flex items-center justify-center rounded-md  text-gray-600 font-medium hover:text-black m-auto"
            aria-label="Navigate to List section"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              className="mr-1  text-gray-600 hover:text-black"
            >
              <path
                d="M12.4106 5.59287H3.58887C3.3568 5.59287 3.13424 5.50068 2.97015 5.33659C2.80605 5.17249 2.71387 4.94993 2.71387 4.71787V3.58887C2.71387 3.3568 2.80605 3.13424 2.97015 2.97015C3.13424 2.80605 3.3568 2.71387 3.58887 2.71387H12.4106C12.6427 2.71387 12.8652 2.80605 13.0293 2.97015C13.1934 3.13424 13.2856 3.3568 13.2856 3.58887V4.71787C13.2853 4.94983 13.193 5.1722 13.029 5.33622C12.8649 5.50024 12.6426 5.59254 12.4106 5.59287ZM3.58887 3.46387C3.55572 3.46387 3.52392 3.47704 3.50048 3.50048C3.47704 3.52392 3.46387 3.55572 3.46387 3.58887V4.71787C3.46387 4.75102 3.47704 4.78281 3.50048 4.80626C3.52392 4.8297 3.55572 4.84287 3.58887 4.84287H12.4106C12.4438 4.84287 12.4756 4.8297 12.499 4.80626C12.5224 4.78281 12.5356 4.75102 12.5356 4.71787V3.58887C12.5356 3.55572 12.5224 3.52392 12.499 3.50048C12.4756 3.47704 12.4438 3.46387 12.4106 3.46387H3.58887ZM12.4106 13.2854H3.58887C3.3568 13.2854 3.13424 13.1932 2.97015 13.0291C2.80605 12.865 2.71387 12.6424 2.71387 12.4104V11.2814C2.71387 11.0493 2.80605 10.8267 2.97015 10.6626C3.13424 10.4986 3.3568 10.4064 3.58887 10.4064H12.4106C12.6426 10.4067 12.8649 10.499 13.029 10.663C13.193 10.827 13.2853 11.0494 13.2856 11.2814V12.4104C13.2856 12.6424 13.1934 12.865 13.0293 13.0291C12.8652 13.1932 12.6427 13.2854 12.4106 13.2854ZM3.58887 11.1564C3.55572 11.1564 3.52392 11.1695 3.50048 11.193C3.47704 11.2164 3.46387 11.2482 3.46387 11.2814V12.4104C3.46387 12.4435 3.47704 12.4753 3.50048 12.4988C3.52392 12.5222 3.55572 12.5354 3.58887 12.5354H12.4106C12.4438 12.5354 12.4756 12.5222 12.499 12.4988C12.5224 12.4753 12.5356 12.4435 12.5356 12.4104V11.2814C12.5356 11.2482 12.5224 11.2164 12.499 11.193C12.4756 11.1695 12.4438 11.1564 12.4106 11.1564H3.58887ZM12.4106 9.43912H3.58887C3.3568 9.43912 3.13424 9.34693 2.97015 9.18284C2.80605 9.01874 2.71387 8.79618 2.71387 8.56412V7.43512C2.71387 7.20305 2.80605 6.98049 2.97015 6.8164C3.13424 6.6523 3.3568 6.56012 3.58887 6.56012H12.4106C12.6426 6.56045 12.8649 6.65274 13.029 6.81676C13.193 6.98079 13.2853 7.20315 13.2856 7.43512V8.56412C13.2856 8.79618 13.1934 9.01874 13.0293 9.18284C12.8652 9.34693 12.6427 9.43912 12.4106 9.43912ZM3.58887 7.31012C3.55572 7.31012 3.52392 7.32329 3.50048 7.34673C3.47704 7.37017 3.46387 7.40197 3.46387 7.43512V8.56412C3.46387 8.59727 3.47704 8.62906 3.50048 8.65251C3.52392 8.67595 3.55572 8.68912 3.58887 8.68912H12.4106C12.4438 8.68912 12.4756 8.67595 12.499 8.65251C12.5224 8.62906 12.5356 8.59727 12.5356 8.56412V7.43512C12.5356 7.40197 12.5224 7.37017 12.499 7.34673C12.4756 7.32329 12.4438 7.31012 12.4106 7.31012H3.58887Z"
                fill="gray"
              />
            </svg>
            <span>List</span>
          </a>
        </div>

        <div>
          <a
            href=""
            className="flex items-center justify-center rounded-md  text-gray-600 font-medium hover:text-black m-auto"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="gray"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1"
            >
              <g opacity="0.6">
                <path
                  d="M12.3636 2H3.63636C3.20237 2 2.78616 2.1724 2.47928 2.47928C2.1724 2.78616 2 3.20237 2 3.63636V12.3636C2 12.7976 2.1724 13.2138 2.47928 13.5207C2.78616 13.8276 3.20237 14 3.63636 14H12.3636C12.7976 14 13.2138 13.8276 13.5207 13.5207C13.8276 13.2138 14 12.7976 14 12.3636V3.63636C14 3.20237 13.8276 2.78616 13.5207 2.47928C13.2138 2.1724 12.7976 2 12.3636 2ZM12.9091 12.3636C12.9091 12.5083 12.8516 12.647 12.7493 12.7493C12.647 12.8516 12.5083 12.9091 12.3636 12.9091H3.63636C3.4917 12.9091 3.35296 12.8516 3.25067 12.7493C3.14838 12.647 3.09091 12.5083 3.09091 12.3636V3.63636C3.09091 3.4917 3.14838 3.35296 3.25067 3.25067C3.35296 3.14838 3.4917 3.09091 3.63636 3.09091H12.3636C12.5083 3.09091 12.647 3.14838 12.7493 3.25067C12.8516 3.35296 12.9091 3.4917 12.9091 3.63636V12.3636ZM11.2727 4.72727V8.54545C11.2727 8.69012 11.2153 8.82886 11.113 8.93115C11.0107 9.03344 10.8719 9.09091 10.7273 9.09091C10.5826 9.09091 10.4439 9.03344 10.3416 8.93115C10.2393 8.82886 10.1818 8.69012 10.1818 8.54545V4.72727C10.1818 4.58261 10.2393 4.44387 10.3416 4.34158C10.4439 4.23929 10.5826 4.18182 10.7273 4.18182C10.8719 4.18182 11.0107 4.23929 11.113 4.34158C11.2153 4.44387 11.2727 4.58261 11.2727 4.72727ZM8.54545 4.72727V11.2727C8.54545 11.4174 8.48799 11.5561 8.38569 11.6584C8.2834 11.7607 8.14466 11.8182 8 11.8182C7.85534 11.8182 7.7166 11.7607 7.61431 11.6584C7.51201 11.5561 7.45455 11.4174 7.45455 11.2727V4.72727C7.45455 4.58261 7.51201 4.44387 7.61431 4.34158C7.7166 4.23929 7.85534 4.18182 8 4.18182C8.14466 4.18182 8.2834 4.23929 8.38569 4.34158C8.48799 4.44387 8.54545 4.58261 8.54545 4.72727ZM5.81818 4.72727V6.90909C5.81818 7.05375 5.76071 7.19249 5.65842 7.29479C5.55613 7.39708 5.41739 7.45455 5.27273 7.45455C5.12806 7.45455 4.98933 7.39708 4.88703 7.29479C4.78474 7.19249 4.72727 7.05375 4.72727 6.90909V4.72727C4.72727 4.58261 4.78474 4.44387 4.88703 4.34158C4.98933 4.23929 5.12806 4.18182 5.27273 4.18182C5.41739 4.18182 5.55613 4.23929 5.65842 4.34158C5.76071 4.44387 5.81818 4.58261 5.81818 4.72727Z"
                  fill="black"
                />
              </g>
            </svg>

            <span>Board</span>
          </a>
        </div>
      </nav>

      <div className="flex flex-row justify-between">
        <div className="flex gap-2">
          <label
            htmlFor="filter-category"
            className="text-sm font-medium text-gray-700 m-auto mx-5"
          >
            Filter By :
          </label>
          <select
            name="category"
            id="filter-category"
            className=" border-2 rounded-3xl text-xs h-7 m-auto"
            onChange={filterHandler}
          >
            <option value="category">Category</option>

            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
          <select
            name="dueDate"
            id="filter-due-date"
            className=" border-2 rounded-3xl text-xs h-7 m-auto"
            onChange={filterHandler}
          >
            <option value="dueDate">Due Date</option>
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>

        <div className="flex gap-4 my-auto mr-4">
          <input
            value={searchValue}
            onChange={searchHandler}
            type="search"
            id="search-task"
            className="p-2 h-9 rounded-3xl border-2 text-black border-gray-200 text-xs focus:border-purple-500 focus:outline-none m-auto"
            placeholder="Search tasks..."
          />

          <button
            onClick={openCreateModal}
            className="rounded-3xl px-8 outline-none text-white py-2 my-auto bg-purple-500 "
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
}
