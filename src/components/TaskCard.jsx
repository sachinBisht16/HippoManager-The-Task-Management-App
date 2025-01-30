import { useDraggable } from "@dnd-kit/core";
import { useState, useEffect, useRef } from "react";
import { projectActions } from "../store";
import { useDispatch } from "react-redux";
import EditTask from "./EditTask";
import { formatDate } from "../../utilities";

export function TaskCard({ task }) {
  const editModalRef = useRef();
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);

  useEffect(() => {
    function closeOptions(e) {
      if (optionsRef.current && !optionsRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    }
    document.addEventListener("click", closeOptions);

    return () => {
      document.removeEventListener("click", closeOptions);
    };
  }, [showOptions]);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const optionHandler = () => {
    setShowOptions((prevValue) => !prevValue);
  };

  const deleteHandler = () => {
    dispatch(projectActions.deleteTask({ id: task.id }));
  };

  const editHandler = () => {
    dispatch(projectActions.editHandler({ id: task.id }));
  };

  const openEditModal = () => {
    editModalRef.current.showModal();
  };

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const formattedDueDate = formatDate(task.dueDate);

  return (
    <>
      <EditTask ref={editModalRef} task={task} />
      <div className="relative flex w-full h-28 mx-auto">
        {!isDragging && (
          <div
            ref={optionsRef}
            className="flex flex-col absolute right-2 top-2"
          >
            <button
              onClick={optionHandler}
              className="flex space-x-1 justify-between cursor-pointer items-center w-6 h-6 p-0 ml-auto focus:outline-none"
            >
              <div className="w-1 rounded h-1 bg-black"></div>
              <div className="w-1 rounded h-1 bg-black"></div>
              <div className="w-1 rounded h-1 bg-black"></div>
            </button>
            <ul
              className={`dropdown-menu flex flex-col justify-center text-base rounded-md p-1 bg-pink-50 ${
                !showOptions && "hidden"
              }`}
            >
              <li>
                <button onClick={openEditModal}>
                  <img src="" alt="" />
                  Edit
                </button>
              </li>
              <li>
                <button onClick={deleteHandler} className="text-red-600">
                  <img src="" alt="" />
                  Delete
                </button>
              </li>
            </ul>
          </div>
        )}

        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className={`cursor-grab rounded-lg box-border w-72 h-28 bg-white p-3 shadow-sm hover:shadow-md flex flex-col justify-between outline-none ${
            isDragging && "fixed"
          }`}
          style={style}
        >
          <div className="flex justify-between">
            <h3
              className={`font-medium text-black ${
                task.status.toLowerCase() === "done" && "line-through"
              }`}
            >
              {task.title}
            </h3>
          </div>

          <div className="flex justify-between text-gray-500 text-xs">
            <h4>{formattedDueDate}</h4>
            <h4>{task.category}</h4>
          </div>
        </div>
      </div>
    </>
  );
}
