import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Registered from "../images/galerySharp.png";

export const Card = ({ id, email, location, category, description, createdAt, updatedAt, image, statusData, count, deleteComplaint }) => {
  const [status, setStatus] = useState('Update Status');
  const [updateDate, setUpdateDate] = useState(updatedAt);
  const [imageLoaded, setImageLoaded] = useState(false);

  const defaultImage = Registered;

  useEffect(() => {
    const updateStatusInBackend = async () => {
      try {
        const response = await fetch('https://the-road-safe-backend.vercel.app/updateStatus', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: id,
            status: status,
          }),
        });

        const data = await response.json();
        setUpdateDate(data.success.updatedAt);
      } catch (error) {
        console.error("Error updating complaint details:", error);
      }
    };

    if (status !== 'Update Status') {
      updateStatusInBackend();
    }
  }, [status, id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div style={{ padding: 10, display: "flex", flexDirection: "row", justifyContent: "flex-center", border: "2px", borderRadius: "5px", borderBlockColor: "#ffffff" }}>
      <div style={{ padding: 50, paddingLeft: 20, paddingRight: 20, paddingTop: 30, backgroundColor: "white", width: 340, background: "white", alignItems: "center", justifyContent: "center", borderRadius: "7px" }} className="shadow-md">
        <div className="font-bold bg-yellow-400 relative p-3 rounded-lg flex justify-between items-center">
          <span>Complaint no. - {count}</span>
          <button
            onClick={() => deleteComplaint(id)}
            className="bg-transparent border-none cursor-pointer transform transition-transform duration-200 hover:scale-125 text-black hover:text-red-700"
          >
            <FaTrashAlt size={20} />
          </button>
        </div>
        <br></br>
        <div className="relative w-full h-40">
          {/* Show the default image until the actual image loads */}
          <img
            src={defaultImage}
            alt="Loading"
            className={`${imageLoaded ? 'hidden' : 'block animate-blink'}`}
            style={{ width: '300px', height: '180px', borderRadius: '7px' }} />
          <img
            src={image}
            alt="Complaint"
            onLoad={handleImageLoad}
            className={`${imageLoaded ? 'block' : 'hidden'}`}
            style={{ width: '300px', height: '180px', borderRadius: '7px' }}
          />
        </div>
        <br></br>
        <h3>Email: {email}</h3>
        <p>Location: {location}</p>
        <p>Category: {category.join(", ")}</p>
        <p>Description: {description}</p>
        <p>Created At: {new Date(createdAt).toLocaleString()}</p>
        <p>Updated At: {new Date(updateDate).toLocaleString()}</p>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-center", alignItems: "center", paddingTop: "10px" }}>
          <p style={{ paddingRight: "10px" }}>Status :</p>
          <select value={status} onChange={handleStatusChange} style={{ padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }} className="cursor-pointer">
            {statusData === "Update Status" ? (
              <>
                <option disabled hidden value="Update Status">{statusData}</option>
                <option value="Inprocess">Inprocess</option>
                <option value="Completed">Completed</option>
              </>
            ) : statusData === "Completed" ? (
              <>
                <option value="Completed">{statusData}</option>
                <option value="Inprocess">Inprocess</option>
              </>
            ) : (
              <>
                <option value="Inprocess">Inprocess</option>
                <option value="Completed">Completed</option>
              </>
            )}
          </select>

        </div>
      </div>
    </div>
  );
};
