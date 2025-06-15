'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ id: 0, title: '', description: '', status: 'To Do' });
  const [editTask, setEditTask] = useState(null);

  // Fetch tasks
  useEffect(() => {
    axios.get('http://localhost:8000/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  // Add task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ id: 0, title: '', description: '', status: 'To Do' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Update task
  const handleUpdate = async (task) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/tasks/${task.id}`, task);
      setTasks(tasks.map(t => (t.id === task.id ? response.data : t)));
      setEditTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-5xl font-bold text-center text-purple-800 mb-10 tracking-tight">Task Manager</h1>

        {/* Task Form */}
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl mb-8 border border-purple-200">
          <h2 className="text-2xl font-semibold text-purple-800 mb-6">{editTask ? 'Edit Task' : 'Add Task'}</h2>
          <form onSubmit={(e) => {
            e.preventDefault();
            editTask ? handleUpdate({ ...editTask }) : handleSubmit(e);
          }} className="space-y-6">
            <input
              type="text"
              placeholder="Task Title"
              value={editTask ? editTask.title : newTask.title}
              onChange={(e) => editTask
                ? setEditTask({ ...editTask, title: e.target.value })
                : setNewTask({ ...newTask, title: e.target.value })}
              className="w-full p-4 border border-purple-200 rounded-xl text-gray-700 focus:ring-2 focus:ring-purple-400 focus:border-transparent placeholder:text-gray-400 bg-white/50"
              required
            />
            <textarea
              placeholder="Task Description"
              value={editTask ? editTask.description : newTask.description}
              onChange={(e) => editTask
                ? setEditTask({ ...editTask, description: e.target.value })
                : setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-4 border border-purple-200 text-gray-700 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent h-32 resize-none placeholder:text-gray-400 bg-white/50"
            />
            <select
              value={editTask ? editTask.status : newTask.status}
              onChange={(e) => editTask
                ? setEditTask({ ...editTask, status: e.target.value })
                : setNewTask({ ...newTask, status: e.target.value })}
              className="w-full p-4 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent text-gray-700 bg-white/50"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition duration-300 font-medium shadow-md hover:shadow-lg"
            >
              {editTask ? 'Update Task' : 'Add Task'}
            </button>
            {editTask && (
              <button
                type="button"
                onClick={() => setEditTask(null)}
                className="w-full bg-gray-100 text-gray-700 p-4 rounded-xl hover:bg-gray-200 transition duration-300 font-medium"
              >
                Cancel
              </button>
            )}
          </form>
        </div>

        {/* Task List */}
        <div>
          <h2 className="text-2xl font-semibold text-purple-800 mb-6">Tasks</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center bg-white/90 backdrop-blur-sm p-6 rounded-2xl">No tasks available.</p>
          ) : (
            <ul className="space-y-4">
              {tasks.map(task => (
                <li key={task.id} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-purple-100 hover:shadow-lg transition duration-300">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <h3 className="text-xl font-medium text-purple-800">{task.title}</h3>
                      <p className="text-gray-600">{task.description}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        task.status === 'To Do' ? 'bg-orange-100 text-orange-800' :
                        task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setEditTask(task)}
                        className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition duration-300 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="bg-pink-100 text-pink-700 px-4 py-2 rounded-lg hover:bg-pink-200 transition duration-300 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}