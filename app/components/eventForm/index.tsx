// EventForm.js
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EventForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        image: "",
        isFeatured: false,
    });

    const router = useRouter();

    const handleChange = (e: {
        target: { name: any; value: any };
    }) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: {
        preventDefault: () => void;
    }) => {
        e.preventDefault();
        try {
            console.log("formData",formData)
            const response = await axios.post(
                "http://localhost:3000/api/events",
                formData
            );
            if (response.status === 200) {
                console.log("IN",response)
                router.push("/")
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md'
        >
            <Label>Title</Label>
            <Input
                // label="Title"
                name='title'
                value={formData.title}
                onChange={handleChange}
                className='mb-4'
            />
            <Label>Description</Label>
            <Textarea
                // label="Description"
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='mb-4'
            />
            <Label>Location</Label>
            <Input
                name='location'
                value={formData.location}
                onChange={handleChange}
                className='mb-4'
            />
            {/* <Label>Date</Label>
            <Input
                type='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                className='mb-4'
            /> */}
            <Input
                // label="Image"
                type='file'
                title='Image'
                name='image'
                value={formData.image}
                onChange={handleChange}
                className='mb-4'
            />
            <Button
                type='submit'
                className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'
            >
                Submit
            </Button>
        </form>
    );
};

export default EventForm;
