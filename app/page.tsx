"use client"
import { useEffect, useState } from "react";

interface GPTResponse {
  role: string;
  content: string;

}
interface Chat {
  title: string[],
  role: string,
  content: string
}
export default function Home() {
  const [value, setValue] = useState('');
  const [message, setMessage] = useState<GPTResponse | null>(null);
  const [currentTitle, setCurrentTitle] = useState<string[]>([])
  const [previousChats, setPreviousChats] = useState<Chat[]>([])

  const handleSubmit = () => {
    fetch('http://localhost:3001/', {
      method: 'POST',
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-type": "application/json",
      }
    })
      .then((res) => res.json()) // Corrected typo here
      .then((data) => {
        // Assuming 'data' has the expected structure
        console.log(data.completion)
        setMessage(data.completion);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        // Handle errors as needed
      });
  };
  useEffect(() => {
    if (currentTitle.length === 0 && message && value) {
      setCurrentTitle([value]);
    }
    if (currentTitle && message && value) {
      setPreviousChats(prevChats => (
        [...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value
        }, {
          title: currentTitle,
          role: message.role,
          content: message.content
        }]
      ))

    }

  }, [message, currentTitle])

  console.log(currentTitle)
  console.log(previousChats)
  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="w-1/5 bg-black p-4 text-white h-screen flex flex-col flex-start">
        <button className="border text-white px-8 py-2 ml-2 rounded">+New Chat</button>
      </div>

      {/* Main Section */}
      <div className="w-4/5 p-4 bg-gray-900 h-screen flex flex-col justify-end">
        {/* List Item Section */}
        {previousChats.map(chat => <div className=" h-screen ">
          <div className="flex flex-row items-start gap-5 mb-4 mx-10 p-4 bg-gray-700 text-white rounded-lg">
            <p className="text-lg font-bold px-2 py-0.5 bg-gray-600 rounded align-center">{chat?.role}</p>
            <p className="text-lg  ">
              {chat?.content}
            </p>
          </div>
        </div>)}



        {/* Input and Button Section */}
        <div className="flex items-center justify-center mb-4">
          <input
            value={value}
            type="text"
            className="border border-gray-300 rounded-lg p-4 w-2/4 bg-gray-900 text-white focus:outline-none"
            placeholder="Message chatGPT ..."
            onChange={(e) => { setValue(e.target.value) }}
          />
          <button className="bg-gray-700 text-white px-4 py-2 ml-2 rounded" onClick={handleSubmit}>
            {">"}
          </button>
        </div>

        {/* Footer Section */}
        <div className="flex justify-center text-white text-sm">
          ChatGPT can make mistakes. Consider checking important information.
        </div>
      </div>

    </div>
  );

}
