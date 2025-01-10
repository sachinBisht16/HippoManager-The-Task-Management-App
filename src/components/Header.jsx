import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { taskActions } from "../store";

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Sign out the user
      await signOut(auth);
      console.log("User successfully logged out");
      // Clear Redux or local state
      dispatch(taskActions.reset());
      // Redirect to login or home page
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="flex justify-between items-center pt-2 px-4 bg-white">
      <div className="flex items-center gap-2">
        <svg
          width="21"
          height="25"
          viewBox="0 0 21 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.66536 24.5837H15.332C17.9904 24.5837 20.1654 22.4087 20.1654 19.7503V6.45866C20.1654 4.04199 18.4737 2.10866 16.1779 1.74616C15.6945 0.900325 14.8487 0.416992 13.882 0.416992H7.11536C6.1487 0.416992 5.30287 0.900325 4.81953 1.74616C2.5237 2.10866 0.832031 4.04199 0.832031 6.45866V19.7503C0.832031 22.4087 3.00703 24.5837 5.66536 24.5837ZM6.8737 2.95449C6.8737 2.95449 6.99453 2.83366 7.11536 2.83366H14.0029L14.1237 2.95449V3.80033C14.1237 3.92116 14.0029 4.04199 13.882 4.04199H7.11536C6.99453 4.04199 6.8737 3.92116 6.8737 3.80033V2.95449ZM3.2487 6.45866C3.2487 5.49199 3.73203 4.76699 4.45703 4.28366V4.40449C4.45703 4.52533 4.57786 4.64616 4.57786 4.76699C4.57786 4.76699 4.57786 4.88783 4.6987 4.88783C4.6987 5.00866 4.81953 5.12949 4.81953 5.12949L4.94036 5.25033C4.94036 5.37116 5.0612 5.37116 5.18203 5.49199L5.30286 5.61283L5.54453 5.85449L5.66536 5.97533C5.7862 5.97533 5.7862 6.09616 5.90703 6.09616C5.90703 6.09616 6.02786 6.09616 6.02786 6.21699C6.1487 6.21699 6.26953 6.33783 6.39037 6.33783H6.5112C6.75286 6.45866 6.8737 6.45866 7.11536 6.45866H14.607C14.7279 6.45866 14.8487 6.45866 14.9695 6.33783C14.9695 6.33783 15.0904 6.33783 15.0904 6.21699C15.2112 6.21699 15.2112 6.09616 15.332 6.09616L15.4529 5.97533C15.5737 5.97533 15.5737 5.85449 15.6945 5.73366L15.8154 5.61283L16.057 5.37116L16.1779 5.25033C16.1779 5.12949 16.2987 5.12949 16.2987 5.00866C16.2987 5.00866 16.2987 4.88783 16.4195 4.88783C16.4195 4.76699 16.5404 4.64616 16.5404 4.52533V4.40449C17.2654 4.76699 17.7487 5.61282 17.7487 6.57949V19.8712C17.7487 21.2003 16.6612 22.2878 15.332 22.2878H5.66536C4.3362 22.2878 3.2487 21.2003 3.2487 19.8712V6.45866Z"
            fill="#2F2F2F"
          />
          <svg
            x="5"
            y="10"
            width="11"
            height="8"
            viewBox="0 0 11 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.8763 7.33301H4.29297C5.01797 7.33301 5.5013 6.84967 5.5013 6.12467C5.5013 5.39967 5.01797 4.91634 4.29297 4.91634H1.8763C1.1513 4.91634 0.667969 5.39967 0.667969 6.12467C0.667969 6.84967 1.1513 7.33301 1.8763 7.33301ZM1.8763 2.49967H9.1263C9.8513 2.49967 10.3346 2.01634 10.3346 1.29134C10.3346 0.566341 9.8513 0.0830078 9.1263 0.0830078H1.8763C1.1513 0.0830078 0.667969 0.566341 0.667969 1.29134C0.667969 2.01634 1.1513 2.49967 1.8763 2.49967Z"
              fill="#2F2F2F"
            />
          </svg>
        </svg>

        <h2 className="text-lg font-semibold">HippoManager</h2>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 p-2 text-black font-medium rounded hover:text-blue-600 ">
          <img
            src="/assets/profile-img.png"
            alt="Profile"
            className="h-6 w-6 rounded-2xl"
          />
          <h3 className="text-md">Sachin</h3>
        </button>
        <button
          onClick={() => handleLogout()}
          className="flex items-center text-black gap-2 p-2 bg-red-50 text-xs rounded-xl hover:bg-red-200 border-red-200 border-2"
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.40055 8.20313H10.5467C10.935 8.20313 11.2498 7.88832 11.2498 7.50001C11.2498 7.1117 10.935 6.79689 10.5467 6.79689H2.40055L3.30964 5.8878C3.58423 5.61321 3.58423 5.16804 3.30964 4.89344C3.03509 4.61885 2.58987 4.61885 2.31528 4.89344L0.206014 7.00276C0.189561 7.01921 0.173999 7.03646 0.15928 7.05446C0.152858 7.06229 0.14728 7.07059 0.141233 7.0786C0.133499 7.08891 0.12553 7.09899 0.118359 7.10973C0.111796 7.11952 0.106124 7.1297 0.100124 7.13973C0.0943588 7.14938 0.0883119 7.15881 0.0830151 7.16874C0.0774839 7.17906 0.0728433 7.18965 0.0678746 7.20015C0.0629996 7.21041 0.0578903 7.22054 0.0535309 7.23104C0.0493122 7.2413 0.0458435 7.25176 0.0421404 7.26216C0.0380623 7.27341 0.0337498 7.28452 0.0302811 7.29601C0.0271405 7.30641 0.0248436 7.31696 0.0222186 7.32751C0.0192655 7.33918 0.0159843 7.3508 0.0136405 7.36271C0.0112499 7.37485 0.00979681 7.38713 0.00806245 7.39937C0.00656246 7.40982 0.00454685 7.42013 0.0035156 7.43072C0.00126562 7.45341 9.37494e-05 7.47624 4.68747e-05 7.49902C4.68747e-05 7.49935 0 7.49972 0 7.50005C0 7.50038 4.68747e-05 7.50076 4.68747e-05 7.50108C9.37494e-05 7.52391 0.00126562 7.54669 0.0035156 7.56943C0.00454685 7.57988 0.00651558 7.59005 0.0079687 7.60041C0.00974994 7.61279 0.0112031 7.62516 0.0136405 7.63744C0.0159843 7.64926 0.0192186 7.66069 0.0221717 7.67227C0.0248436 7.68291 0.0271873 7.69365 0.0303748 7.70419C0.0337967 7.71549 0.0380623 7.72641 0.0419997 7.73747C0.0457966 7.74807 0.0492653 7.75871 0.0535778 7.76911C0.0578434 7.77943 0.062859 7.78932 0.0676402 7.79939C0.0727027 7.81013 0.0774839 7.82096 0.0831088 7.8315C0.0882651 7.84111 0.0941244 7.85025 0.0997025 7.85958C0.105843 7.86994 0.111702 7.88039 0.118452 7.89047C0.125296 7.90074 0.132937 7.91035 0.140296 7.92024C0.146671 7.92872 0.152577 7.93749 0.159374 7.94574C0.17339 7.9628 0.188249 7.97916 0.203764 7.99486C0.204514 7.99561 0.205124 7.99646 0.205874 7.99721L2.31524 10.1066C2.45258 10.2439 2.63248 10.3126 2.81244 10.3126C2.99234 10.3125 3.17234 10.2439 3.30959 10.1067C3.58418 9.83207 3.58418 9.3869 3.30964 9.11231L2.40055 8.20313Z"
              fill="black"
            />
            <path
              d="M14.2968 1.17188H5.39062C5.00231 1.17188 4.6875 1.48669 4.6875 1.875V4.68748C4.6875 5.07579 5.00231 5.3906 5.39062 5.3906C5.77893 5.3906 6.09374 5.07579 6.09374 4.68748V2.57812H13.5937V12.4219H6.09374V10.3124C6.09374 9.92413 5.77893 9.60932 5.39062 9.60932C5.00231 9.60932 4.6875 9.92413 4.6875 10.3124V13.125C4.6875 13.5133 5.00231 13.8281 5.39062 13.8281H14.2968C14.6851 13.8281 14.9999 13.5133 14.9999 13.125V1.875C14.9999 1.48669 14.6851 1.17188 14.2968 1.17188Z"
              fill="black"
            />
          </svg>

          <h2 className="text-md">Logout</h2>
        </button>
      </div>
    </header>
  );
}