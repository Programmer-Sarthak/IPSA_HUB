import { useState, useContext } from "react";
import { makeRequest } from "../../axios";
import "./update.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    username: user.username,
    bio: user.descr,
  });

  const { setCurrentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // Initialize useNavigate

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const mutation = useMutation({
    mutationFn: (userData) => makeRequest.put("/users", userData),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"]);
      setCurrentUser({ ...user, ...data });
    },
    onError: (error) => {
      console.error("Error updating user:", error);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();

    let coverUrl = cover ? await upload(cover) : user.coverPic;
    let profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  const deleteMutation = useMutation({
    mutationFn: () => makeRequest.delete(`/users/${user.userId}`),
    onSuccess: () => {
      navigate("/login");
      queryClient.invalidateQueries(["users"]);
      setCurrentUser(null); // Clear the current user from context
      setOpenUpdate(false); // Close the update modal
       // Redirect to the login page
    },
    onError: (error) => {
      console.error("Error deleting user:", error);
    },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={cover ? URL.createObjectURL(cover) : "/upload/" + user.coverPic}
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={profile ? URL.createObjectURL(profile) : "/upload/" + user.profilePic}
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            value={texts.username}
            name="username"
            onChange={handleChange}
          />
          <label>Bio</label>
          <input
            type="text"
            name="bio"
            value={texts.bio}
            onChange={handleChange}
          />
          <button onClick={handleClick}>Update</button>
        </form>
        <button className="close" onClick={() => setOpenUpdate(false)}>
          Close
        </button>
        <button className="delete" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default Update;
