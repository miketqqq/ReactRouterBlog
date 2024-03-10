import { useRouteError } from "react-router-dom"
import { NavBar } from "../NavBar"

const ENV = import.meta.env.VITE_ENV

export function ErrorPage() {
  const error = useRouteError()
  return (
    <>
      <NavBar />
      <h1>This is error page</h1>
      {ENV !== "PRD" && (
        <div>
          {error.message} {error.stack} {error.data}
        </div>
      )}
    </>
  )
}
