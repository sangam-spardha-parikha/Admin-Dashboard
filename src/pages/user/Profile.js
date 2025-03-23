import { useState } from "react";
import { useAuth } from "./../../context/AuthContext";
import { updateProfile } from "./../../api/auth";
import Sidebar from "../../layout/Sidebar";

const Profile = () => {
  const { user, handleLogout } = useAuth();
  const [profile, setProfile] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updateProfile(profile);
      alert("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      alert("Update failed!");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4  text-white">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="p-6 w-100">
        <h2 className="text-xl font-bold">Profile</h2>
        {isEditing ? (
          <div>
            <input type="text" name="name" value={profile.name} onChange={handleChange} className="block border p-2 w-full mb-2" />
            <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="block border p-2 w-full mb-2" />
            <button onClick={handleUpdate} className="bg-green-500 text-white p-2">Save</button>
            <button onClick={() => setIsEditing(false)} className="ml-2 bg-gray-500 text-white p-2">Cancel</button>
          </div>
        ) : (
          <div>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
           
            <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white p-2">Edit Profile</button>
            <button onClick={handleLogout} className="ml-2 bg-red-500 text-white p-2">Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
