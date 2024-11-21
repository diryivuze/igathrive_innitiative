import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Help from './pages/Help';
import Experience from './pages/Experience';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import Students from './pages/Students';
import QandA from './pages/QandA';
import Logout from './pages/Logout';
import Mentor from './pages/Mentors';
import NewCourses from './pages/NewCourses';
import StudentDash from './pages/StudentDash';
import StudentChat from './pages/StudentChat';
import Progress from './pages/Progress';
import Relaxation from './pages/Relaxation';
import Completed from './pages/Completed';
import StudentSettings from './pages/StudentSettings';
import MentorDash from './pages/MentorDash';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin-dashboard",
    element: <Dashboard />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/features",
    element: <Features />,
  },
  {
    path: "/help",
    element: <Help />,
  },
  {
    path: "/experience",
    element: <Experience />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/courses",
    element: <Courses />,
  },
  {
    path: "/students",
    element: <Students />,
  },
  {
    path: "/admin-iquiries",
    element: <QandA />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/mentors",
    element: <Mentor />,
  },
  {
    path: "/new-courses",
    element: <NewCourses />,
  },
  {
    path: "/student-dashboard",
    element: <StudentDash />,
  },
  {
    path: "/student-chat",
    element: <StudentChat />,
  },
  {
    path: "/progress-courses",
    element: <Progress />,
  },
  {
    path: "/completed-courses",
    element: <Completed />,
  },
  {
    path: "/gamming",
    element: <Relaxation />,
  },
  {
    path: "/settings",
    element: <StudentSettings />,
  },
  {
    path: "/mentor-dashboard",
    element: <MentorDash />,
  },
], {
  future: {
    v7_startTransition: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
    v7_relativeSplatPath: true
  }
});

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: '#4CAF50',
              color: 'white',
            },
          },
          error: {
            style: {
              background: '#EF4444',
              color: 'white',
            },
          },
          duration: 3000,
        }}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
