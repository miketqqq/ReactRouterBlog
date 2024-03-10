import {
  Navigate,
  Outlet,
  createBrowserRouter,
  useNavigation,
} from "react-router-dom"
import { NavBar } from "./NavBar"

import { postsRouter } from "./pages/Posts"
import { postRouter } from "./pages/Post"
import { newPostRoute } from "./pages/NewPost"
import { EditPostRoute } from "./pages/EditPost"

import { usersRouter } from "./pages/Users"
import { userRouter } from "./pages/User"
import { todosRouter } from "./pages/Todos"

import { ErrorPage } from "./pages/ErrorPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import "./styles.css"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/posts" /> },
      {
        path: "posts",
        children: [
          { index: true, ...postsRouter },
          {
            path: ":postId",
            children: [
              { index: true, ...postRouter },
              { path: "edit", ...EditPostRoute },
            ],
          },
          { path: "new", ...newPostRoute },
        ],
      },
      {
        path: "users",
        children: [
          { index: true, ...usersRouter },
          { path: ":userId", ...userRouter },
        ],
      },

      { path: "todos", ...todosRouter },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
])

function NavLayout() {
  const { state } = useNavigation()
  return (
    <>
      <NavBar />
      {state === "loading" ? <div className="loading-spinner"></div> : null}
      <div className={state === "loading" ? "container loading" : "container"}>
        <Outlet />
      </div>
    </>
  )
}
