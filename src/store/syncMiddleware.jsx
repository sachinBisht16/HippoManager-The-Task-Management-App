import syncStateToFirebase from "./syncToDatabase";

const syncMiddleware = (store) => {
  let prevState = store.getState(); // Store the previous state before any action

  return (next) => (action) => {
    const result = next(action); // Call next middleware or reducer

    // After the action is processed, compare the current state with the previous state
    syncStateToFirebase(store, prevState);

    // Update the previous state reference for the next action
    prevState = store.getState();

    return result;
  };
};

export default syncMiddleware;
