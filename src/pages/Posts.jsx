import { Form, Link, useLoaderData } from "react-router-dom"
import { fetchFakeApi } from "../utils/fetchFakeApi"
import { PostSection } from "./PostSection"

//https://reactrouter.com/en/main/start/tutorial#synchronizing-urls-to-form-state
function Posts() {
  const { posts, users } = useLoaderData()

  return (
    <>
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <Link className="btn btn-outline" to="/posts/new">
            New
          </Link>
        </div>
      </h1>
      <Form className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" />
          </div>
          <div className="form-group">
            <label htmlFor="userId">Author</label>
            <select type="search" name="userId" id="userId">
              <option value="">Any</option>
              {users?.map((user) => {
                return (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                )
              })}
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>
      <PostSection posts={posts} />
    </>
  )
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams
  const query = searchParams.get("query")
  const userId = searchParams.get("userId")

  let queryUrl = "/posts?"
  if (query !== "" && query !== null) {
    queryUrl += `q=${query}&`
  }
  if (!(userId === "" || userId === "0" || userId === null)) {
    queryUrl += `userId=${userId}`
  }
  console.log(queryUrl)

  const posts = await fetchFakeApi(queryUrl, { signal })
  const users = await fetchFakeApi("/users", { signal })

  return { posts, users }
}

async function action({ request }) {
  const formData = await request.formData()
  const query = formData.get("query")
  const userId = formData.get("userId")

  let url = new URL("http://localhost:3000/posts")
  url.searchParams.append("q", query).append("userId", userId)
  console.log(url)

  const posts = fetch(url, {
    signal: request.signal,
  }).then((res) => res.json())

  return await posts
}

export const postsRouter = {
  action,
  loader,
  element: <Posts />,
}
