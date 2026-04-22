import { useEffect, useState } from "react";
import apiClient from "../api/axios";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      try {
        const response = await apiClient.get("/tasks");
        if (isMounted) {
          setTasks(response.data?.data || []);
        }
      } catch (error) {
        if (isMounted) {
          setMessage(error.response?.data?.message || "Could not fetch tasks.");
        }
      }
    };

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setMessage("Task title is required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await apiClient.post("/tasks", {
        title: title.trim(),
        description: description.trim(),
      });

      const createdTask = response.data?.data;
      if (createdTask) {
        setTasks((prev) => [createdTask, ...prev]);
      }

      setTitle("");
      setDescription("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not add task.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setMessage("");

    try {
      await apiClient.delete(`/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not delete task.");
    }
  };

  return (
    <section className="form-card">
      <h2>Dashboard</h2>

      <form onSubmit={handleAddTask}>
        <label htmlFor="task-title">Task title</label>
        <input
          id="task-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />

        <label htmlFor="task-description">Description (optional)</label>
        <input
          id="task-description"
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>

      {message && <p className="form-message">{message}</p>}

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="task-empty">No tasks yet.</p>
        ) : (
          tasks.map((task) => (
            <article key={task._id} className="task-item">
              <div>
                <h3>{task.title}</h3>
                {task.description ? <p>{task.description}</p> : null}
              </div>
              <button type="button" onClick={() => handleDeleteTask(task._id)}>
                Delete
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
