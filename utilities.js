export function generateRandomId() {
  const digits = "0123456789";
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let randomId = "";

  // Add 3 random digits
  for (let i = 0; i < 3; i++) {
    randomId += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  // Add 2 random letters (both lowercase and uppercase)
  for (let i = 0; i < 2; i++) {
    randomId += letters.charAt(Math.floor(Math.random() * letters.length));
  }

  return randomId;
}

export function formatDate(date) {
  const currentDate = new Date();
  const targetDate = new Date(date);

  if (date === new Date().toISOString().split("T")[0]) {
    return "Today";
  }

  const tomorrow = new Date(currentDate);
  tomorrow.setDate(currentDate.getDate() + 1);
  if (
    targetDate.toISOString().split("T")[0] ===
    tomorrow.toISOString().split("T")[0]
  ) {
    return "Tomorrow";
  }

  return date;
}

export function filterTask(tasksArray, filterBy) {
  let newTasks = structuredClone(tasksArray); // Deep clone to avoid modifying original array
  for (let key in filterBy) {
    newTasks = newTasks.filter((task) => {
      if (key === "dueDate") {
        const currentDate = new Date();
        const targetDate = new Date(task[key]);

        if (filterBy[key] === "today") {
          // Check if due date is today
          return targetDate.toDateString() === currentDate.toDateString();
        } else if (filterBy[key] === "tomorrow") {
          // Check if due date is tomorrow
          const tomorrow = new Date(currentDate);
          tomorrow.setDate(currentDate.getDate() + 1);
          return targetDate.toDateString() === tomorrow.toDateString();
        } else if (filterBy[key] === "week") {
          // Check if due date is within this week
          const startOfWeek = new Date(currentDate);
          startOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Start of the week (Sunday)
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)
          return targetDate >= startOfWeek && targetDate <= endOfWeek;
        } else if (filterBy[key] === "month") {
          // Check if due date is within this month
          const startOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
          );
          const endOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          ); // Last day of the month
          return targetDate >= startOfMonth && targetDate <= endOfMonth;
        }
      }

      // For other keys, match the value or allow null as a wildcard
      return task[key] === filterBy[key] || filterBy[key] === null;
    });
  }

  return newTasks;
}

export function filterOnSearch(tasksArray, searchValue) {
  const value = searchValue.toLowerCase().trim();
  return tasksArray.filter((task) => task.title.toLowerCase().includes(value));
}

export function formatMilliseconds(ms) {
  const date = new Date(ms);
  const options = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleString("en-US", options).replace(",", " at");
}
