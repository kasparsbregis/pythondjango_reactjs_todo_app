import { useState, useEffect } from 'react'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

function App() {
  const [tasks, setTasks] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchTasks = async () => {
    try {
      setError(null)
      const res = await fetch(`${API_URL}/api/tasks/`)
      if (!res.ok) throw new Error('Failed to fetch tasks')
      const data = await res.json()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (!newTitle.trim()) return
    try {
      const res = await fetch(`${API_URL}/api/tasks/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle.trim() }),
      })
      if (!res.ok) throw new Error('Failed to add task')
      const task = await res.json()
      setTasks((prev) => [task, ...prev])
      setNewTitle('')
    } catch (err) {
      setError(err.message)
    }
  }

  const toggleTask = async (task) => {
    try {
      const res = await fetch(`${API_URL}/api/tasks/${task.id}/`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      })
      if (!res.ok) throw new Error('Failed to update task')
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, completed: !t.completed } : t))
      )
    } catch (err) {
      setError(err.message)
    }
  }

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/tasks/${id}/`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete task')
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="app loading">Loading...</div>
  if (error) return <div className="app error">Error: {error}. Is the backend running on {API_URL}?</div>

  return (
    <div className="app">
      <h1>Todo</h1>
      <form onSubmit={addTask} className="add-form">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="What to do?"
          maxLength={200}
        />
        <button type="submit">Add</button>
      </form>
      <ul className="task-list">
        {tasks.length === 0 ? (
          <li className="empty">No tasks yet. Add one above.</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
              />
              <span>{task.title}</span>
              <button type="button" onClick={() => deleteTask(task.id)} className="delete">
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
