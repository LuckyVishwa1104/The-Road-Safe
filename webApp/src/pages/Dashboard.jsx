
import { useEffect, useState } from "react"
import axios from "axios"
import { Card } from "./Card"
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loader from "./Loader";
import { FiLogOut } from "react-icons/fi";

export const Dashboard = () => {
  let cnt = 1;
  const [data, setData] = useState(null);
  const [filter, setFilter] = useState("");
  const [adminName, setAdminName] = useState("0");
  const [adminLast, setAdminLast] = useState("0");
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);


  // Fetch complaints from server
  const fetchComplaints = async () => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/bulk?filter=${filter}`
      );
      setData(response.data.success);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [filter]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === 'undefined') {
      navigate("/signin");
    } else {
      try {
        const decodedToken = jwtDecode(token);
        setAdminName(decodedToken.firstName);
        setAdminLast(decodedToken.lastName);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };

  // Function to delete a complaint
  const deleteComplaint = async (id) => {
    try {
      const response = await axios.post('http://127.0.0.1:3000/deleteComplaint', {
        id: id,
      });

      if (response.status === 200) {
        // Remove the deleted complaint from state
        setData((prevData) => prevData.filter(complaint => complaint._id !== id));
      } else {
        console.error("Error deleting complaint:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  return (
    <div className="bg-blue-200/20">
      <div id="navbar" className="mb-5 shadow-lg shadow-gray-300/50  flex justify-between rounded-md sticky top-0 bg-white z-10">
        <div className="flex flex-row justify-center h-full ml-4 ">
          <div className="mt-3.5  ">
            <input onChange={(e) => {
              setFilter(e.target.value)
            }} type="text" placeholder="Search Complaints..." className="px-2 py-1 border rounded border-slate-500 w-40 sm:w-56 md:w-72 lg:w-96 xl:w-900" />
          </div>
        </div>
        <div className="flex">
          <div className="ml-5 flex flex-col justify-center h-full mr-2 uppercase">
            <b> {adminName} {adminLast}</b>
          </div>
          <div className="mb-1.5 mt-1.5 rounded-full h-12 w-12 bg-yellow-200/50 flex justify-center mt-1 mr-4">
            <div className="flex flex-col justify-center h-full text-xl uppercase">
              <b> {adminName[0]}{adminLast[0]}</b>
            </div>
          </div>
          <div className="flex flex-col justify-center h-full mr-3 cursor-pointer" onClick={handleLogout}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <FiLogOut size={24} />
            {isHovered && (
              <span className="absolute transform -translate-x-1/2 -translate-y-full mt-28 px-2 py-1 ml-1.5 bg-black text-white text-sm rounded-md shadow-lg">
                Logout
              </span>
            )}
          </div>
        </div>
      </div>
      {data ? (
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          {data.map((complaint, index) => (
            <div key={index}>
              <Card
                count={cnt++}
                id={complaint._id}
                location={complaint.location}
                category={complaint.category}
                description={complaint.description}
                createdAt={complaint.createdAt}
                updatedAt={complaint.updatedAt}
                image={complaint.objectUrl}
                statusData={complaint.status}
                email={complaint.email}
                deleteComplaint={deleteComplaint}
              />
            </div>
          ))}
        </div>
      ) : (
        <Loader />
      )}
      <br />
      <br />
    </div>
  );
};