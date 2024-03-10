import { Link, useLoaderData } from "react-router-dom"
import { fetchFakeApi } from "../utils/fetchFakeApi"

function Users() {
  const users = useLoaderData()

  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users?.map((user) => {
          return (
            <div key={user.id} className="card">
              <div className="card-header">{user.name}</div>
              <div className="card-body">
                <div>{user.company.name}</div>
                <div>{user.website}</div>
                <div>{user.email}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={user.id.toString()}>
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

async function loader({ request: { signal } }) {
  const path = "/users"
  return await fetchFakeApi(path, { signal })
}

export const usersRouter = {
  loader,
  element: <Users />,
}
