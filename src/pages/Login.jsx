import { useNavigate } from "react-router-dom";

import { auth, googleProvider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";

import { database } from "../firebase/firebase";
import { ref, set, push, get } from "firebase/database";

import { taskActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = {
        name: result.user.displayName,
        id: result.user.uid,
        email: result.user.email,
      };
      dispatch(taskActions.updateUser(user));

      const userRef = ref(database, `users/${user.id}`);

      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        dispatch(taskActions.retrieveData(userData));

        navigate("/dashboard/board");
      } else {
        await set(userRef, {
          name: result.user.displayName,
          email: result.user.email,
          tasks: [],
        });

        navigate("/dashboard/board");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="h-screen bg-pink-100 flex">
      <div className="w-1/2 relative flex m-auto">
        <div className="flex flex-col gap-2 p-20 mx-auto w-3/4">
          <h1 className="text-5xl text-purple-900 w-full flex gap-5 font-semibold">
            <svg
              width="35"
              height="60"
              viewBox="0 0 23 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.65694 27.4429H16.5685C19.5691 27.4429 22.0242 24.9878 22.0242 21.9871V6.98377C22.0242 4.25589 20.1147 2.07358 17.5232 1.6644C16.9776 0.709639 16.0229 0.164062 14.9317 0.164062H7.29367C6.20251 0.164062 5.24775 0.709639 4.70218 1.6644C2.11069 2.07358 0.201172 4.25589 0.201172 6.98377V21.9871C0.201172 24.9878 2.65627 27.4429 5.65694 27.4429ZM7.02088 3.02834C7.02088 3.02834 7.15727 2.89194 7.29367 2.89194H15.0681L15.2045 3.02834V3.9831C15.2045 4.11949 15.0681 4.25589 14.9317 4.25589H7.29367C7.15727 4.25589 7.02088 4.11949 7.02088 3.9831V3.02834ZM2.92905 6.98377C2.92905 5.89261 3.47463 5.07425 4.29299 4.52867V4.66507C4.29299 4.80146 4.42939 4.93786 4.42939 5.07425C4.42939 5.07425 4.42939 5.21064 4.56578 5.21064C4.56578 5.34704 4.70218 5.48343 4.70218 5.48343L4.83857 5.61983C4.83857 5.75622 4.97497 5.75622 5.11136 5.89261L5.24775 6.02901L5.52054 6.3018L5.65694 6.43819C5.79333 6.43819 5.79333 6.57458 5.92972 6.57458C5.92972 6.57458 6.06612 6.57459 6.06612 6.71098C6.20251 6.71098 6.33891 6.84737 6.4753 6.84737H6.61169C6.88448 6.98377 7.02088 6.98377 7.29367 6.98377H15.7501C15.8865 6.98377 16.0229 6.98377 16.1593 6.84737C16.1593 6.84737 16.2957 6.84737 16.2957 6.71098C16.4321 6.71098 16.4321 6.57458 16.5685 6.57458L16.7049 6.43819C16.8413 6.43819 16.8413 6.3018 16.9776 6.1654L17.114 6.02901L17.3868 5.75622L17.5232 5.61983C17.5232 5.48343 17.6596 5.48343 17.6596 5.34704C17.6596 5.34704 17.6596 5.21064 17.796 5.21064C17.796 5.07425 17.9324 4.93786 17.9324 4.80146V4.66507C18.7508 5.07425 19.2963 6.02901 19.2963 7.12016V22.1235C19.2963 23.6238 18.0688 24.8514 16.5685 24.8514H5.65694C4.1566 24.8514 2.92905 23.6238 2.92905 22.1235V6.98377Z"
                fill="#7B1984"
              />

              <svg
                width="50"
                height="40"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                x="7"
                y="10"
              >
                <path
                  d="M2.02214 8.25884H4.75003C5.56839 8.25884 6.11397 7.71327 6.11397 6.8949C6.11397 6.07654 5.56839 5.53096 4.75003 5.53096H2.02214C1.20378 5.53096 0.658203 6.07654 0.658203 6.8949C0.658203 7.71327 1.20378 8.25884 2.02214 8.25884ZM2.02214 2.80308H10.2058C11.0242 2.80308 11.5697 2.2575 11.5697 1.43914C11.5697 0.620772 11.0242 0.0751953 10.2058 0.0751953H2.02214C1.20378 0.0751953 0.658203 0.620772 0.658203 1.43914C0.658203 2.2575 1.20378 2.80308 2.02214 2.80308Z"
                  fill="#7B1984"
                />
              </svg>
            </svg>
            HippoManager
          </h1>
          <p className="text-lg">
            Stremline your workflow and track progress effortlessly <br />
            with our all-in-one task management app.
          </p>

          <button
            onClick={signInWithGoogle}
            className="bg-black gap-4 flex text-white rounded-lg w-full py-4 px-6 text-3xl mt-7 justify-center"
          >
            <svg
              className="my-auto"
              width="30"
              height="30"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M21.2088 10.8997C21.2088 10.0457 21.1395 9.42259 20.9895 8.77637H11.2383V12.6306H16.962C16.8467 13.5885 16.2235 15.031 14.8387 16.0003L14.8193 16.1293L17.9024 18.5178L18.1161 18.5391C20.0778 16.7273 21.2088 14.0616 21.2088 10.8997Z"
                  fill="#4285F4"
                />
                <path
                  d="M11.2371 21.0554C14.0412 21.0554 16.3954 20.1322 18.1149 18.5397L14.8375 16.0009C13.9605 16.6125 12.7834 17.0395 11.2371 17.0395C8.49061 17.0395 6.15957 15.2278 5.32862 12.7236L5.20682 12.734L2.00091 15.2151L1.95898 15.3316C3.66687 18.7243 7.17501 21.0554 11.2371 21.0554Z"
                  fill="#34A853"
                />
                <path
                  d="M5.32704 12.7228C5.10779 12.0766 4.9809 11.3842 4.9809 10.6687C4.9809 9.95322 5.10779 9.26085 5.31551 8.61462L5.3097 8.47699L2.06362 5.95605L1.95741 6.00657C1.25351 7.41446 0.849609 8.99545 0.849609 10.6687C0.849609 12.342 1.25351 13.9229 1.95741 15.3308L5.32704 12.7228Z"
                  fill="#FBBC05"
                />
                <path
                  d="M11.2371 4.29906C13.1873 4.29906 14.5028 5.14147 15.2529 5.84545L18.1841 2.98354C16.3839 1.31026 14.0412 0.283203 11.2371 0.283203C7.17501 0.283203 3.66687 2.61424 1.95898 6.00695L5.31708 8.615C6.15957 6.11085 8.49061 4.29906 11.2371 4.29906Z"
                  fill="#EB4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_68_3649">
                  <rect
                    width="20.3682"
                    height="20.8434"
                    fill="white"
                    transform="translate(0.849609 0.283203)"
                  />
                </clipPath>
              </defs>
            </svg>
            <h2 className="my-auto">Continue with Google</h2>
          </button>
        </div>
      </div>
      <div className="parent w-1/2  relative">
        <div>
          <div className="border-2 h-full w-full border-pink-300 rounded-full absolute top-10 left-[40px] z-1"></div>
          <div className="border-2 h-4/5 w-4/5 border-pink-300 rounded-full absolute top-[480px] left-[540px] transform -translate-x-1/2 -translate-y-1/2 z-2 "></div>
          <div className="border-2 h-1/2 w-1/2 border-pink-300 rounded-full absolute top-[500px] left-[500px] transform -translate-x-1/2 -translate-y-1/2 z-4"></div>
        </div>
        <img
          src="/assets/home.png"
          alt="image"
          className="absolute top-28 right-[-330px] h-4/5 w-full rounded-xl"
        />
      </div>
    </div>
  );
}
