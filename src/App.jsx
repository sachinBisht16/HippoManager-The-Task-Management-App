import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";

import Login from "./pages/Login";

const LazyLayout = React.lazy(() => import("./pages/RootLayout"));
import Home from "./pages/Home";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { getDatabase, ref, get } from "firebase/database";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { projectActions } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/dashboard/board/:productName",
    element: <LazyLayout />,
    loader: async ({ params }) => {
      const { productName } = params;
      return productName;
    },
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

          dispatch(projectActions.retrieveData(userData));
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

        dispatch(projectActions.updateUser(userDetails));

        fetchUserData(userDetails.id);
      } else {
        dispatch(projectActions.reset());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return <RouterProvider router={router}></RouterProvider>;
}
