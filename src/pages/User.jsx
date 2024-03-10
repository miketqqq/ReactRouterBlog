import { useLoaderData } from "react-router-dom"
import { fetchFakeApi } from "../utils/fetchFakeApi"
import { PostSection } from "./PostSection"
import { TodosSection } from "./TodosSection"

function User() {
  const { todos, posts, user } = useLoaderData()

  return (
    <>
      <div className="mb-4">
        <h1 className="page-title">{user.name}</h1>
        <div className="page-subtitle">{user.email}</div>
        <div>
          <b>Company:</b> {user.company.name}
        </div>
        <div>
          <b>Website:</b> {user.website}
        </div>
        <div>
          <b>Address:</b>{" "}
          {Object.values(user.address)
            .filter((item) => typeof item !== "object")
            .join(", ")}
        </div>
      </div>
      <PostSection posts={posts} />
      <TodosSection todos={todos} />
    </>
  )
}

async function loader({ request: { signal }, params: { userId } }) {
  const todos = fetchFakeApi(`/todos/?userId=${userId}`, { signal })
  const posts = fetchFakeApi(`/posts/?userId=${userId}`, { signal })
  const user = fetchFakeApi(`/users/${userId}`, { signal })
  return { todos: await todos, posts: await posts, user: await user }
}

export const userRouter = {
  loader,
  element: <User />,
}
