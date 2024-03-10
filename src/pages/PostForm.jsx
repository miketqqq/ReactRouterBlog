import { Form, Link } from "react-router-dom"

export function PostForm({
  users,
  isSubmitting = false,
  post = {},
  actionData = null,
}) {
  return (
    <>
      <div>{actionData}</div>
      <Form method="POST" className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={post.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select name="userId" id="userId" defaultValue={post.userId}>
              {users?.map((user) => {
                return (
                  <option key={user.id} value={user.id.toString()}>
                    {user.name}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="body">Body</label>
            <textarea name="body" id="body" defaultValue={post.body}></textarea>
          </div>
        </div>
        <div className="form-row form-btn-row">
          <Link className="btn btn-outline" to="./..">
            Cancel
          </Link>
          <button disabled={isSubmitting} className="btn">
            {isSubmitting ? "Loading" : "Save"}
          </button>
        </div>
      </Form>
    </>
  )
}
