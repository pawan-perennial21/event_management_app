"use client";

export default function EventDetails({ items }: any) {
    const {
        event: { title, date, time, description, location },
    } = items;

    const humanRedable = new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    const formattrdAddress = location?.replace(",", "\n");
    const dateObject = new Date(time);

    // Format the date and time according to the user's locale
    const formattedDateTime = dateObject.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC",
    });
    return (
        <div className='border rounded-lg overflow-hidden shadow-md p-6 m-4 bg-white'>
            <div className='flex flex-col'>
                <div className='mb-4'>
                    <h2 className='text-2xl font-semibold mb-4'>
                        {title}
                    </h2>
                    <div className='mb-2'>
                        <time className='text-gray-500'>
                            {humanRedable}
                        </time>
                    </div>
                    <div className="mb-1">
                        <address className='text-gray-500'>
                            {formattrdAddress}
                        </address>
                    </div>
                    <div className="mb-1">
                        <time className='text-gray-500'>
                            {formattedDateTime}
                        </time>
                    </div>
                    <div>
                        <p className='text-gray-500'>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
