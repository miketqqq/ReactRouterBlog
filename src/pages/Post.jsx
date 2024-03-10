import { Link, useLoaderData } from "react-router-dom"
import { fetchFakeApi } from "../utils/fetchFakeApi"

export function Post() {
  const { comments, post, userName } = useLoaderData()
  return (
    <>
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" to={`/posts/${post.id}/edit`}>
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${post.userId}`}>{userName}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments?.map((comment) => {
          return (
            <div key={comment.id} className="card">
              <div className="card-body">
                <div className="text-sm mb-1">{comment.email}</div>
                {comment.body}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

async function loader({ request: { signal }, params }) {
  const comments = fetchFakeApi(`/posts/${params.postId}/comments`, { signal })
  const post = await fetchFakeApi(`/posts/${params.postId}`, { signal })
  const user = await fetchFakeApi(`/users/${post.userId}`, { signal })

  return { comments: await comments, post, userName: user.name }
}

export const postRouter = {
  loader,
  element: <Post />,
}
