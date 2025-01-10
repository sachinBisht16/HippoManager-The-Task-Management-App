import { ref, set } from "firebase/database";
import { database } from "../firebase/firebase";

const syncStateToFirebase = (store, prevState) => {
  const state = store.getState();
  const currrentTasks = state.tasks;
  const previousTasks = prevState.tasks;

  if (currrentTasks !== previousTasks) {
    const dataRef = ref(database, `users/${state.user.id}/tasks`);

    set(dataRef, currrentTasks).catch((error) => {
      console.log("Error updating the firebase", error);
    });
  }
};

export default syncStateToFirebase;
