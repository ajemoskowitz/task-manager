import { useState, useEffect, useCallback } from 'react'
import './App.css'

type Status = 'pending' | 'in_progress' | 'completed'
type Priority = 'low' | 'medium' | 'high'

interface Task {
  id: number
  title: string
  description: string | null
  status: Status
  priority: Priority
  created_at: string
  updated_at: string
}

const STATUSES: Status[] = ['pending', 'in_progress', 'completed']
const PRIORITIES: Priority[] = ['low', 'medium', 'high']

function label(s: string) {
  return s.replace('_', ' ')
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPriority, setFilterPriority] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [error, setError] = useState('')

  const fetchTasks = useCallback(async () => {
    const params = new URLSearchParams({ limit: '100' })
    if (filterStatus) params.set('status', filterStatus)
    if (filterPriority) params.set('priority', filterPriority)
    const res = await fetch(`/tasks?${params}`)
    setTasks(await res.json())
  }, [filterStatus, filterPriority])

  useEffect(() => { fetchTasks() }, [fetchTasks])

  async function createTask(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    const res = await fetch('/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description: description || undefined, priority }),
    })
    if (!res.ok) {
      const data = await res.json()
      setError(data.detail ?? 'Failed to create task')
      return
    }
    setTitle('')
    setDescription('')
    setPriority('medium')
    fetchTasks()
  }

  async function updateStatus(id: number, status: Status) {
    await fetch(`/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchTasks()
  }

  async function deleteTask(id: number) {
    await fetch(`/tasks/${id}`, { method: 'DELETE' })
    fetchTasks()
  }

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
      </header>

      <section className="card">
        <h2>New Task</h2>
        <form onSubmit={createTask} className="create-form">
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            placeholder="Description (optional)"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
            {PRIORITIES.map(p => <option key={p} value={p}>{label(p)}</option>)}
          </select>
          <button type="submit">Add Task</button>
        </form>
        {error && <p className="error">{error}</p>}
      </section>

      <section className="filters">
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map(s => <option key={s} value={s}>{label(s)}</option>)}
        </select>
        <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
          <option value="">All priorities</option>
          {PRIORITIES.map(p => <option key={p} value={p}>{label(p)}</option>)}
        </select>
      </section>

      <section className="task-list">
        {tasks.length === 0 && <p className="empty">No tasks yet.</p>}
        {tasks.map(task => (
          <div key={task.id} className={`task priority-${task.priority}`}>
            <div className="task-top">
              <span className="task-title">{task.title}</span>
              <span className={`badge status-${task.status}`}>{label(task.status)}</span>
            </div>
            {task.description && <p className="task-desc">{task.description}</p>}
            <div className="task-bottom">
              <select
                value={task.status}
                onChange={e => updateStatus(task.id, e.target.value as Status)}
              >
                {STATUSES.map(s => <option key={s} value={s}>{label(s)}</option>)}
              </select>
              <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
