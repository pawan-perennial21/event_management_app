// api/tasks/[id].ts

import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/connect";
import TaskModel from "@/models/task";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        method,
        query: { id },
    } = req;

    switch (method) {
        case "GET":
            try {
                const task = await TaskModel.findById(id);
                if (!task) {
                    res.status(404).json({ error: "Task not found" });
                    return;
                }
                res.status(200).json(task);
            } catch (error) {
                res.status(500).json({
                    error: "Internal Server Error",
                });
            }
            break;

        case "PUT":
            try {
                const updatedTask = await TaskModel.findByIdAndUpdate(
                    id,
                    req.body,
                    {
                        new: true,
                        runValidators: true,
                    }
                );
                if (!updatedTask) {
                    res.status(404).json({ error: "Task not found" });
                    return;
                }
                res.status(200).json(updatedTask);
            } catch (error) {
                res.status(500).json({
                    error: "Internal Server Error",
                });
            }
            break;

        case "DELETE":
            try {
                const deletedTask = await TaskModel.findByIdAndDelete(
                    id
                );
                if (!deletedTask) {
                    res.status(404).json({ error: "Task not found" });
                    return;
                }
                res.status(200).json({
                    message: "Task deleted successfully",
                });
            } catch (error) {
                res.status(500).json({
                    error: "Internal Server Error",
                });
            }
            break;

        default:
            res.status(405).json({ error: "Method Not Allowed" });
            break;
    }
};
