

const baseUrl = 'http://localhost:3000';

export const getAllEvent = async (): Promise<any[]> => {
  const res = await fetch(`${baseUrl}/api/events`, { cache: 'no-store' });
  const events = await res.json();
  return events;
}
export const getSingleEvent = async (id:string): Promise<any[]> => {
  const res = await fetch(`${baseUrl}/api/events/${id}`, { cache: 'no-store' });
  const events = await res.json();
  return events;
}

export const addEvent = async (event: any): Promise<any> => {
  const res = await fetch(`${baseUrl}/api/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })
  const newEvent = await res.json();
  return newEvent;
}

export const editEvent = async ({formData,editId}:any): Promise<any> => {
  console.log("events==>>",formData)
  const res = await fetch(`${baseUrl}/api/events/${editId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  const updatedEvent = await res.json();
  return updatedEvent;
}

export const deleteEvent = async (id: string): Promise<void> => {
  const res = await fetch(`${baseUrl}/api/events/${id}`, {
    method: 'DELETE',
  })
  return await res.json()
}