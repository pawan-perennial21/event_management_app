import React from "react";

export default function Loading() {
    return (
        <div className='flex justify-center items-center mt-4'>
            <div className='animate-spin rounded-full border-t-4 border-blue-700 border-solid h-12 w-12'></div>
        </div>
    );
}
