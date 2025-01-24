import { ref, set } from "firebase/database";
import { database } from "../firebase/firebase";

const syncStateToFirebase = (store, prevState) => {
  const state = store.getState();
  const currrentProjects = state.projects.projects;
  const previousProjects = prevState.projects.projects;

  if (currrentProjects !== previousProjects) {
    const dataRef = ref(database, `users/${state.projects.user.id}/projects`);

    set(dataRef, currrentProjects).catch((error) => {
      console.log("Error updating the firebase", error);
    });
  }
};

export default syncStateToFirebase;
