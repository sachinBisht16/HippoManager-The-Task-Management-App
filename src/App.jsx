import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import RootLayout from "./pages/RootLayout";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { getDatabase, ref, get } from "firebase/database";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard/board",
    element: <RootLayout />,
  },
]);

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const userRef = ref(getDatabase(), `users/${userId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();

          dispatch(taskActions.retrieveData(userData));
        } else {
          console.log("No data found for this user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDetails = {
          name: user.displayName,
          id: user.uid,
          email: user.email,
        };

        dispatch(taskActions.updateUser(userDetails));

        fetchUserData(userDetails.id);
      } else {
        dispatch(taskActions.reset());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}
