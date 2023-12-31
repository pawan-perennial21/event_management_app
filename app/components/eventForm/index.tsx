"use client";
import { addEvent, editEvent } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { eventSchema } from "@/lib/validation";
import { EventFormValues } from "@/types/interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

interface EventFormProps {
    formDataItem: {
        event: EventFormValues;
    };
    isEdit: boolean;
}
const EventForm = ({ formDataItem, isEdit }: EventFormProps) => {
    const router = useRouter();

    function formatDate(inputDateString: string) {
        const inputDate = new Date(inputDateString);

        const day = inputDate
            .getUTCDate()
            .toString()
            .padStart(2, "0");
        const month = (inputDate.getUTCMonth() + 1)
            .toString()
            .padStart(2, "0");
        const year = inputDate.getUTCFullYear();

        return `${year}-${month}-${day}`;
    }

    const originalDate = new Date(formDataItem?.event?.time);

    const formattedTime = originalDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        hour12: false,
        minute: "2-digit",
        timeZone: "UTC",
    });
    const formattedDate = formatDate(formDataItem?.event?.date);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<EventFormValues>({
        defaultValues: {
            title: formDataItem?.event?.title || "",
            description: formDataItem?.event?.description || "",
            location: formDataItem?.event?.location || "",
            date: formattedDate || "",
            time: formattedTime || "",
        },
        resolver: zodResolver(eventSchema),
    });

    const onSubmit: SubmitHandler<EventFormValues> = async (
        dataValue
    ) => {
        const response = isEdit
            ? await editEvent({
                  dataValue,
                  editId: formDataItem?.event._id,
              })
            : await addEvent(dataValue);
        if (response.status === 200) {
            router.push("/");
            router.refresh();
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md'
        >
            <Input
                {...register("title")}
                placeholder='Title'
                className='mb-4'
            />

            {errors.title?.message && (
                <p className='text-red-500 -mt-2 mb-2'>
                    {errors.title?.message}
                </p>
            )}
            <Textarea
                {...register("description")}
                className='mb-4'
                placeholder='Description'
            />
            {errors.description?.message && (
                <p className='text-red-500 -mt-2 mb-2'>
                    {errors.description?.message}
                </p>
            )}
            <Input
                {...register("location")}
                className='mb-4'
                placeholder='Location'
            />
            {errors.location?.message && (
                <p className='text-red-500 -mt-2 mb-2'>
                    {errors.location?.message}
                </p>
            )}

            <Input
                type='date'
                {...register("date")}
                className='mb-4'
                placeholder='Date'
            />
            {errors.date?.message && (
                <p className='text-red-500 -mt-2 mb-2'>
                    {errors.date?.message}
                </p>
            )}

            <Input
                type='time'
                {...register("time")}
                className='mb-4'
                placeholder='Time'
            />
            {errors.time?.message && (
                <p className='text-red-500 -mt-2 mb-2'>
                    {errors.time?.message}
                </p>
            )}
            <Button
                type='submit'
                className='bg-blue-900 hover:bg-blue-900 text-white px-4 py-2 rounded-md mt-4'
            >
                {isEdit ? "Update" : "Submit"}
            </Button>
        </form>
    );
};

export default EventForm;
