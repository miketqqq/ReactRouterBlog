export function TodosSection({ todos }) {
  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todos?.map((todo) => {
          return (
            <li
              key={todo.id}
              className={todo.completed ? "strike-through" : ""}
            >
              {todo.title}
            </li>
          )
        })}
      </ul>
    </>
  )
}
