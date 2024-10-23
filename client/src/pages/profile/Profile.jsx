import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";
import Posts from "../../components/posts/Posts";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./profile.scss";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const navigate = useNavigate(); // Initialize useNavigate

  // UseQuery for user data
  const { isLoading, data, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => makeRequest.get("/users/find/" + userId).then((res) => res.data),
  });

  useEffect(() => {
    if (error && error.response && error.response.status === 403) {
      navigate("/"); // Redirect to home if 403 error
    }
  }, [error, navigate]);

  // UseQuery for relationship data
  const { isLoading: rIsLoading, data: relationshipData } = useQuery({
    queryKey: ["relationship", userId],
    queryFn: () => makeRequest.get("/relationships?followedUserId=" + userId).then((res) => res.data),
  });

  // UseMutation for following/unfollowing
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (following) => {
      if (following) {
        return makeRequest.delete("/relationships?userId=" + userId);
      }
      return makeRequest.post("/relationships", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["relationship", userId]);
    },
  });

  // Handle follow/unfollow
  const handleFollow = () => {
    mutation.mutate(relationshipData.includes(currentUser.userId));
  };

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
  };

  return (
    <div className="profile">
      {isLoading ? (
        "loading"
      ) : (
        <>
          <div className="images">
            <img src={"/upload/" + data.coverPic} alt="" className="cover" />
            <img src={"/upload/" + data.profilePic} alt="" className="profilePic" />
          </div>
          <div className="profileContainer">
            <div className="uInfo">
              <div className="left"></div>
              <div className="center">
                <span>{data.username}</span>
                <div className="info">
                  <div className="item"></div>
                </div>
                {rIsLoading ? (
                  "loading"
                ) : userId === currentUser.userId ? (
                  <button onClick={() => setOpenUpdate(true)}>Update</button>
                ) : (
                  <button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.userId) ? "Following" : "Follow"}
                  </button>
                )}
                <span className="yo">{data.descr}</span>
              </div>
              <div className="right">
                {userId === currentUser.userId && (
                  <div className={`dropdown-wrapper ${dropdownOpen ? 'active' : ''}`}>
                    <MoreVertIcon onClick={toggleDropdown} />
                    {dropdownOpen && (
                      <div className="dropdown">
                        <button onClick={handleLogout}>Logout</button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <Posts userId={userId} />
          </div>
        </>
      )}
      {openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data} />}
    </div>
  );
};

export default Profile;
