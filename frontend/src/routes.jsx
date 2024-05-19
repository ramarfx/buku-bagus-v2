import { createBrowserRouter } from "react-router-dom";
import Login from "./page/Login";
import App from "./App";
import Register from "./page/Register";
import Home from "./page/Home";
import BookDetail from "./page/Book/BookDetail";
import BookAdd from "./page/Book/BookAdd";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/register",
                element: <Register />,
            },

            //books
            {
                path: "/book/:id",
                element: <BookDetail />,
            },
            {
                path: "/book/add",
                element: <BookAdd />,
            },
        ],
    },
]);

export default router;
