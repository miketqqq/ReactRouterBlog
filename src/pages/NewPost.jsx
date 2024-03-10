import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom"
import { fetchFakeApi } from "../utils/fetchFakeApi"
import { PostForm } from "./PostForm"

function NewPost() {
  const { users } = useLoaderData()
  const actionData = useActionData()

  const { state } = useNavigation()
  const isSubmitting = state === "submitting"

  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm
        users={users}
        actionData={actionData}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
async function loader({ request: { signal } }) {
  const users = await fetchFakeApi("/users", { signal })
  return { users }
}

async function action({ request }) {
  const formData = await request.formData()
  const title = formData.get("title")
  const userId = parseInt(formData.get("userId"))
  const body = formData.get("body")

  if (title === "" || userId === "" || body === "") return "please fill all"

  const post = await fetch("http://localhost:3000/posts", {
    method: "POST",
    signal: request.signal,
    body: JSON.stringify({ userId, title, body }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json())

  return redirect(`/posts/${post.id}`)
}
export const newPostRoute = {
  action,
  loader,
  element: <NewPost />,
}
