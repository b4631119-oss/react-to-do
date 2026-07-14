import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"

import { useState, useEffect } from 'react'

function App() {


  const [todos, setTodos] = useState([
    { id: 'default-todo', input: 'Hello! Add your first todo!', complete: true }
  ])
  const [selectedTab, setSelectedTab] = useState('Open')

  function handleAddTodo(newTodo) {
    const newTodoList = [...todos, { id: Date.now().toString(), input: newTodo, complete: false }]
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleCompleteTodo(id) {
    let newTodoList = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, complete: true }
      }
      return todo
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

 

  function handleDeleteTodo(id) {
    let newTodoList = todos.filter(todo => todo.id !== id)
    setTodos(newTodoList)
    handleSaveData(newTodoList)
  }

  function handleSaveData(currTodos) {
    localStorage.setItem('todo-app', JSON.stringify({ todos: currTodos }))
  }

  useEffect(() => {
    if (!localStorage || !localStorage.getItem('todo-app')) { return }
    let db = JSON.parse(localStorage.getItem('todo-app'))
    
    // Ensure all loaded todos have a unique ID (handles legacy data)
    const normalizedTodos = db.todos.map((todo, idx) => {
      if (!todo.id) {
        return { ...todo, id: `${Date.now()}-${idx}` }
      }
      return todo
    })
    
    setTodos(normalizedTodos)
  }, [])

  return (
    <>
      <Header todos={todos} />
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} todos={todos} />
      <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos} />
      <TodoInput handleAddTodo={handleAddTodo} />
    </>
  )
}

export default App
