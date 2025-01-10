import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import RootLayout from "./pages/RootLayout";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase"; // Your Firebase config
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
  // const userId = useSelector((state) => state.userID); // Replace with your state selector
  // console.log(userId);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        console.log(userId);
        const userRef = ref(getDatabase(), `users/${userId}`);
        const snapshot = await get(userRef);

        console.log(snapshot);

        if (snapshot.exists()) {
          console.log("if");
          const userData = snapshot.val();
          console.log("Fetched user data on refresh:", userData);

          // Update Redux store with user data
          dispatch(taskActions.retrieveData(userData));
        } else {
          console.log("No data found for this user.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("if", user);
        const userDetails = {
          name: user.displayName,
          id: user.uid,
          email: user.email,
        };
        // Dispatch userId to Redux
        dispatch(taskActions.updateUser(userDetails));

        // Fetch user data from Firebase
        fetchUserData(userDetails.id);
      } else {
        console.log("else");
        console.log("No user is logged in.");
        // Clear user data from Redux if needed
        dispatch(taskActions.reset());
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}
