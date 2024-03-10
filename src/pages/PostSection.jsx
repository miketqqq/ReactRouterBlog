import { Link } from "react-router-dom"

export function PostSection({ posts }) {
  return (
    <>
      <div className="card-grid">
        {posts?.map((post) => {
          return (
            <div key={post.id} className="card">
              <div className="card-header">{post.title}</div>
              <div className="card-body">
                <div className="card-preview-text">{post.body}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`/posts/${post.id.toString()}`}>
                  View
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
