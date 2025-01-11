# HippoManager - The Task Management App

HippoManager is a task management application designed to help users efficiently track and manage both personal and work-related tasks. With an intuitive interface and powerful features, this app provides a seamless experience for organizing daily tasks and staying on top of deadlines.

## Features

- **Create Tasks:** Add new tasks with a title, due date, and category (Work/Personal).
- **Task Tracking:** Manage tasks in different stages—Todo, In Progress, Done.
- **Task Filtering:** Filter tasks based on due dates (Today, Tomorrow, This Week, This Month) or by category (Work/Personal).
- **Search Functionality:** Search for tasks or projects using related terms from their titles.
- **Edit and Delete Tasks:** Edit task details after creation or delete tasks when no longer needed.
- **Views:** Switch between a board view and list view for better task visualization.
- **Google Sign-In:** Sign in with your Google account using Firebase Authentication.
- **Logout Feature:** Secure logout option to end your session.

## Technologies Used

- **React**
- **Firebase Authentication**
- **Tailwind CSS**
- **Firebase Firestore (for data storage)**

## Challenges Faced and Solutions Implemented

Building the project management app involved overcoming several challenges. One of the main difficulties was implementing drag-and-drop functionality. Using the 'react-dnd-kit' library, I had to manage conflicting events, particularly the edit and delete buttons on tasks being dragged. When dragging, **I detected the drag event and removed the buttons to prevent interference**. Additionally, clicking the edit or delete buttons was unintentionally triggering the drag event, causing glitches due to multiple renders of the task card. To resolve this, **I repositioned the buttons as sibling components at the top of the card, separating them from the task hierarchy. This change prevented the drag event from triggering during button interactions, leading to a smoother user experience for editing and deleting tasks.**


Another challenge was integrating Firebase for data management. While the integration itself was straightforward, syncing the app's state with the database on user login and reload was tricky. React middleware and managing authentication status effectively were crucial for fetching data and maintaining state sync. By using **Redux, along with Redux Toolkit and Thunks, I was able to streamline state management and middleware handling, making the entire process smoother.**


Overall, this project provided invaluable learning opportunities, enhancing my understanding of React and how Firebase integrates as the backend.

## Getting Started

### 1. Clone the Repository:
   - Open your terminal or command prompt.
   - Use the following command to clone the repository:
     ```bash
     git clone "https://github.com/sachinBisht16/HippoManager-The-Task-Management-App.git"
     ```

### 2. Navigate to the Project Directory:
   - Use the `cd` command to navigate to the project directory:
     ```bash
     cd HippoManager-The-Task-Management-App
     ```

### 3. Install Dependencies:
   - Run the following command to install the project's dependencies:
     ```bash
     npm install
     ```

### 4. Start the Development Server:
   - Run the following command to start the development server:
     ```bash
     npm run dev
     ```
     This will typically start a local server, allowing you to view and interact with the project in your web browser.
