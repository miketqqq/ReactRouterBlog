import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom"
import { fetchFakeApi } from "../utils/fetchFakeApi"
import { PostForm } from "./PostForm"

function EditPost() {
  const { users, post } = useLoaderData()
  const actionData = useActionData()

  const { state } = useNavigation()
  const isSubmitting = state === "submitting"

  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm
        users={users}
        actionData={actionData}
        post={post}
        isSubmitting={isSubmitting}
      />
    </>
  )
}

async function loader({ request: { signal }, params }) {
  const post = fetchFakeApi(`/posts/${params.postId}`, { signal })
  const users = fetchFakeApi(`/users/`, { signal })
  return { users: await users, post: await post }
}

async function action({ request, params }) {
  const formData = await request.formData()
  const title = formData.get("title")
  const userId = parseInt(formData.get("userId"))
  const body = formData.get("body")
  const postId = params.postId

  if (title === "" || userId === "" || body === "") return "please fill all"

  console.log({ title, userId, body }, postId)
  const post = await fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PUT",
    body: JSON.stringify({ userId, title, body }),
    headers: { "Content-Type": "application/json" },
    signal: request.signal,
  }).then((res) => res.json())

  return redirect(`/posts/${postId}`)
}

export const EditPostRoute = {
  loader,
  action,
  element: <EditPost />,
}
