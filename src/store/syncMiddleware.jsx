import syncStateToFirebase from "./syncToDatabase";

const syncMiddleware = (store) => {
  let prevState = store.getState();

  return (next) => (action) => {
    const result = next(action);

    syncStateToFirebase(store, prevState);

    prevState = store.getState();

    return result;
  };
};

export default syncMiddleware;
