import { useLoaderData } from "react-router-dom"
import { fetchFakeApi } from "../utils/fetchFakeApi"
import { TodosSection } from "./TodosSection"

export function Todos() {
  const todos = useLoaderData()
  return (
    <>
      <TodosSection todos={todos} />
    </>
  )
}
async function loader({ request: { signal } }) {
  const path = "/todos"
  return fetchFakeApi(path, { signal })
}

export const todosRouter = {
  loader,
  element: <Todos />,
}
