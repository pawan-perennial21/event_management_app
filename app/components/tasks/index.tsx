"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";

const TasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({
        title: "",
        description: "",
        date: "",
        isCompleted: false,
        isImportant: false,
    });

    const fetchTasks = async () => {
        try {
            const response = await axios.get("/api/tasks");
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

  const createTask = async () => {
    console.log("newTask", newTask);
        try {
            await axios.post("/api/tasks", newTask);
            setNewTask({
                title: "",
                description: "",
                date: "",
                isCompleted: false,
                isImportant: false,
            });
            fetchTasks(); // Refresh the task list after creating a new task
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []); // Fetch tasks on component mount

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map((task: any) => (
                    <li key={task?._id}>{task?.title}</li>
                ))}
            </ul>

            <h2>Create New Task</h2>
            <div>
                <label>Title:</label>
                <Input
                    type='text'
                    value={newTask.title}
                    onChange={(e) =>
                        setNewTask({
                            ...newTask,
                            title: e.target.value,
                        })
                    }
                />
            </div>
            <div>
                <label>Description:</label>
                <Input
                    type='text'
                    value={newTask.description}
                    onChange={(e) =>
                        setNewTask({
                            ...newTask,
                            description: e.target.value,
                        })
                    }
                />
            </div>
            <div>
                <label>Date:</label>
                <Input
                    type='date'
                    value={newTask.date}
                    onChange={(e) =>
                        setNewTask({
                            ...newTask,
                            date: e.target.value,
                        })
                    }
                />
            </div>
            <div>
                <label>Is Completed:</label>
                <Input
                    type='checkbox'
                    checked={newTask.isCompleted}
                    onChange={(e) =>
                        setNewTask({
                            ...newTask,
                            isCompleted: e.target.checked,
                        })
                    }
                />
            </div>
            <div>
                <label>Is Important:</label>
                <Input
                    type='checkbox'
                    checked={newTask.isImportant}
                    onChange={(e) =>
                        setNewTask({
                            ...newTask,
                            isImportant: e.target.checked,
                        })
                    }
                />
            </div>
            <button onClick={createTask}>Create Task</button>
        </div>
    );
};

export default TasksPage;
