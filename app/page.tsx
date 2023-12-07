"use client"
import { useState } from "react";

interface BackendResponse {
  role: string;
  content: string;
  // Add other properties if needed
}
export default function Home() {
  const [message, setMessage] = useState('');
  const [backendResponse, setBackendResponse] = useState<BackendResponse | null>(null);


  const handleSubmit = () => {
    fetch('http://localhost:3000/', {
      method: 'POST',
      body: JSON.stringify({
        message: message
      }),
      headers: {
        "Content-type": "application/json",
      }
    })
    .then((res) => res.json()) // Corrected typo here
    .then((data) => {
      // Assuming 'data' has the expected structure
      console.log(data.completion)
      setBackendResponse(data.completion);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      // Handle errors as needed
    });
  };

  return (
    <div className="flex h-screen">
    {/* Sidebar Section */}
    <div className="w-1/5 bg-black p-4 text-white h-screen">
      {/* Sidebar content goes here */}
      Sidebar
    </div>

    {/* Main Section */}
    <div className="w-4/5 p-4 bg-gray-900 h-screen flex flex-col justify-end">
      
      <div className=" flex items-center justify-center mb-4 ">
        
        <input
          type="text"
          className="  border border-gray-300 rounded p-4 w-2/4 bg-gray-900 text-white  focus:outline-none "
          placeholder="Message chatGPT ..."
        />
        <button className=" bg-gray-700 text-white px-4 py-2 ml-2 rounded">
          {">"}
        </button>
      </div>

      <div className="flex justify-center text-white text-sm">ChatGPT can make mistakes. Consider checking important information.</div>
    </div>
  </div>
  );
}
