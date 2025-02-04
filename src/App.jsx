import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React, { Suspense, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { getDatabase, ref, get } from "firebase/database";

import Login from "./pages/Login";
import Loader from "./components/Loader";
const Root = React.lazy(() => import("./layout/Main"));
const Home = React.lazy(() => import("./pages/Home"));
const Project = React.lazy(() => import("./pages/Project"));

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { projectActions } from "./store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/:user",
    element: (
      <Suspense>
        <Root />
      </Suspense>
    ),
    children: [
      {
        path: "home",
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "dashboard/:view/:productName",
        element: (
          <Suspense>
            <Project />
          </Suspense>
        ),
        loader: async ({ params }) => {
          const { productName, view } = params;
          return { productName, view };
        },
      },
    ],
  },
]);

export default function App() {
  const [loading, setLoading] = useState(true);
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
      } finally {
        setLoading(false);
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
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) return <Loader />;

  return <RouterProvider router={router}></RouterProvider>;
}
