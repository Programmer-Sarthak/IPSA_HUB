import "./leftbar.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios"; // Adjust this based on your axios instance path

export const Leftbar = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  // Ensure currentUser is defined before accessing userId
  const userId = currentUser ? currentUser.userId : null;

  // Use React Query to fetch user data
  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => {
      if (!userId) return Promise.reject(new Error("User ID is undefined"));
      return makeRequest.get(`/users/find/${userId}`).then((res) => res.data);
    },
    staleTime: 5000, // Optional: Data will be fresh for 5 seconds
    enabled: !!userId, // Only run query if userId is available
  });

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle errors
  if (error) {
    console.error("Error fetching user data:", error.message);
    return <div>Error fetching user data: {error.message}</div>; // Display the error message
  }

  return (
    <div className={`leftbar ${darkMode ? "dark" : "light"}`}>
      <div className="container">
        {/* User Profile Section */}
        <div className="item">
          {user ? (
            <>
              <img
                src={`/upload/${user.profilePic || 'defaultProfilePic.png'}`} // Use a default image if profilePic is not set
                alt="Profile Picture"
                className="profile-picture"
              />
              <div className="profile-bio">
                <h2>{user.username}</h2> {/* Display the user's username */}
                <p className="bio-description">{user.descr || "No bio available"}</p> {/* Display user's bio or a fallback */}
              </div>
            </>
          ) : (
            <p>User not found.</p>
          )}
        </div>

        {/* Uncomment the following section for Latest Activities */}
        {/* 
        <div className="item">
          <span>Latest Activities</span>
          {/* Your activity section can go here */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Leftbar;
