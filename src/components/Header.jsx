export function Header(props) {
    const { todos } = props
    const openTodosLength = todos.filter(val => !val.complete).length
    const isTasksPlural = openTodosLength !== 1
    const taskOrTasks = isTasksPlural ? 'tasks' : 'task'

    return (
        <header>
            <h1 className="text-gradient">You have {openTodosLength} open {taskOrTasks}.</h1>
        </header>
    )
}