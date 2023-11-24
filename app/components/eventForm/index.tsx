"use client";
import { addEvent, editEvent } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";

const EventForm = ({ formDataItem, isEdit }: any) => {
    const router = useRouter();
    function formatDate(inputDateString: string) {
        const inputDate = new Date(inputDateString);

        const day = inputDate
            .getUTCDate()
            .toString()
            .padStart(2, "0");
        const month = (inputDate.getUTCMonth() + 1)
            .toString()
            .padStart(2, "0"); // Months are zero-indexed
        const year = inputDate.getUTCFullYear();

        return `${year}-${month}-${day}`;
    }

    const originalDate = new Date(formDataItem.event.time);

    const formattedTime = originalDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
        timeZone: "UTC",
    });

    const formattedDate = formatDate(formDataItem.event.date);
    const [formData, setFormData] = useState<any>({
        title: formDataItem?.event?.title,
        description: formDataItem?.event?.description,
        location: formDataItem?.event?.location,
        date: formattedDate,
        time: formattedTime,
    });
    const [formErrors, setFormErrors] = useState<any>({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
    });


    const validateForm = () => {
        const errors: any = {};

        // Title validation
        if (!formData.title.trim()) {
            errors.title = "Title is required";
        }

        // Description validation
        if (!formData.description.trim()) {
            errors.description = "Description is required";
        }

        // Location validation
        if (!formData.location.trim()) {
            errors.location = "Location is required";
        }

        // Date validation
        if (!formData.date.trim()) {
            errors.date = "Date is required";
        }

        // Time validation
        if (!formData.time.trim()) {
            errors.time = "Time is required";
        }

        setFormErrors(errors);

        // Return true if there are no errors, indicating the form is valid
        return Object.values(errors).every((error) => !error);
    };

    const handleChange = (e: {
        target: { name: any; value: any };
    }) => {
        const { name, value } = e.target;
        setFormData((prevData: any) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (
        e
    ) => {
        e.preventDefault();
        if (validateForm()) {
            const response = isEdit
                ? await editEvent({
                      formData,
                      editId: formDataItem?.event._id,
                  })
                : await addEvent(formData);
            console.log("responseresponseresponse", response);
            if (response.status === 200) {
                router.refresh();
                router.push("/");
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md'
        >
            <Label>Title</Label>
            <Input
                name='title'
                value={formData.title}
                onChange={handleChange}
                className='mb-2'
            />
            {formErrors.title && (
                <p className='text-red-500 text-sm'>
                    {formErrors.title}
                </p>
            )}
            <Label>Description</Label>
            <Textarea
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='mb-2'
            />
            {formErrors.description && (
                <p className='text-red-500 text-sm'>
                    {formErrors.description}
                </p>
            )}
            <Label>Location</Label>
            <Input
                name='location'
                value={formData.location}
                onChange={handleChange}
                className='mb-2'
            />
            {formErrors.location && (
                <p className='text-red-500 text-sm'>
                    {formErrors.location}
                </p>
            )}
            <Label>Date</Label>
            <Input
                type='date'
                name='date'
                value={formData.date}
                onChange={handleChange}
                className='mb-2'
            />
            {formErrors.date && (
                <p className='text-red-500 text-sm'>
                    {formErrors.date}
                </p>
            )}
            <Label>Time</Label>
            <Input
                type='time'
                name='time'
                value={formData.time}
                onChange={handleChange}
                className='mb-2'
            />
            {formErrors.time && (
                <p className='text-red-500 text-sm'>
                    {formErrors.time}
                </p>
            )}
            <Button
                type='submit'
                className='bg-blue-900 hover:bg-blue-900 text-white px-4 py-2 rounded-md mt-4'
            >
                {isEdit ? "Update" : "Submit"}
            </Button>
        </form>
        // <form
        //     onSubmit={handleSubmit}
        //     className='max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md'
        // >
        //     {["title", "description", "location", "date", "time"].map(
        //         (field) => (
        //             <div key={field} className='mb-4'>
        //                 <Label>
        //                     {field.charAt(0).toUpperCase() +
        //                         field.slice(1)}
        //                 </Label>
        //                 <Input
        //                     type={
        //                         field === "date"
        //                             ? "date"
        //                             : field === "textarea"
        //                             ? "textarea"
        //                             : field === "time"
        //                             ? "time"
        //                             : "text"
        //                     }
        //                     name={field}
        //                     value={formData[field]}
        //                     onChange={handleChange}
        //                     className='mb-4'
        //                 />
        //                 <div className='text-red-500 text-sm'>
        //                     {formErrors[field]}
        //                 </div>
        //             </div>
        //         )
        //     )}
        //     <Button
        //         type='submit'
        //         className='bg-blue-900 hover:bg-blue-900 text-white px-4 py-2 rounded-md mt-4'
        //     >
        //         {isEdit ? "Update" : "Submit"}
        //     </Button>
        // </form>
    );
};

export default EventForm;
