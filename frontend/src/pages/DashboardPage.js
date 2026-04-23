import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

function DashboardPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiRequest("/tasks");
      setTasks(data);
    } catch (err) {
      if (err.message.toLowerCase().includes("token")) {
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError("");
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();

    if (!cleanTitle) {
      setError("Task title is required");
      return;
    }

    try {
      await apiRequest("/tasks", {
        method: "POST",
        body: JSON.stringify({
          title: cleanTitle,
          description: cleanDescription,
        }),
      });
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await apiRequest(`/tasks/${taskId}`, { method: "DELETE" });
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleMarkCompleted = async (task) => {
    try {
      await apiRequest(`/tasks/${task._id}`, {
        method: "PUT",
        body: JSON.stringify({
          status: task.status === "Completed" ? "Pending" : "Completed",
        }),
      });
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="page">
      <div className="dashboard-header">
        <h2>Task Dashboard</h2>
        <button onClick={handleLogout} className="secondary-btn">
          Logout
        </button>
      </div>

      <div className="card">
        <h3>Create Task</h3>
        <form onSubmit={handleCreateTask} className="form">
          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
          <button type="submit">Add Task</button>
        </form>
      </div>

      <div className="card">
        <h3>My Tasks</h3>
        {loading && <p className="muted-text">Loading tasks...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && tasks.length === 0 && <p className="muted-text">No tasks yet.</p>}

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <div className="task-content">
                <p className={`task-title ${task.status === "Completed" ? "completed" : ""}`}>
                  <strong>{task.title}</strong>
                </p>
                {task.description && <p className="task-description">{task.description}</p>}
                <small
                  className={`status-badge ${
                    task.status === "Completed" ? "status-completed" : "status-pending"
                  }`}
                >
                  {task.status}
                </small>
              </div>
              <div className="task-actions">
                <button
                  type="button"
                  className="secondary-btn"
                  onClick={() => handleMarkCompleted(task)}
                >
                  {task.status === "Completed" ? "Mark Pending" : "Mark Completed"}
                </button>
                <button
                  type="button"
                  className="danger-btn"
                  onClick={() => handleDeleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DashboardPage;
