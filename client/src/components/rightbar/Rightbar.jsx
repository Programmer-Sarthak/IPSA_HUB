import "./rightbar.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";

export const Rightbar = () => {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [dismissedUsers, setDismissedUsers] = useState([]);
  const queryClient = useQueryClient();

  // Ensure currentUser is defined before accessing userId
  const userId = currentUser ? currentUser.userId : null;

  // Use React Query to fetch suggested users
  const { data: suggestedUsers, isLoading, error } = useQuery({
    queryKey: ["suggestedUsers", userId, dismissedUsers],
    queryFn: () => {
      if (!userId) return Promise.reject(new Error("User ID is undefined"));
      return makeRequest.get(`/users/suggestions/${userId}`).then((res) => res.data);
    },
    staleTime: 5000,
    enabled: !!userId, // Only run query if userId is available
  });

  // Mutation for following a user
  const followMutation = useMutation({
    mutationFn: (followedUserId) =>
      makeRequest.post("/relationships", { userId: followedUserId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["suggestedUsers", userId]); // Invalidate and refetch suggestions
    },
  });

  // Handle dismiss
  const handleDismiss = (userId) => {
    setDismissedUsers((prev) => [...prev, userId]); // Add to dismissed users list
  };

  // Handle follow
  const handleFollow = (userId) => {
    followMutation.mutate(userId);
  };

  // Handle loading state
  if (isLoading) return <div>Loading...</div>;

  // Handle errors
  if (error) {
    console.error("Error fetching suggested users:", error.message);
    return <div>Error fetching suggested users: {error.message}</div>;
  }

  return (
    <div className={`rightbar ${darkMode ? "dark" : "light"}`}>
      <div className="container">
        {/* Suggested Users Section */}
        <div className="item">
          <span>Suggestions For You</span>
          {suggestedUsers && suggestedUsers.length > 0 ? (
            suggestedUsers
              .filter((user) => !dismissedUsers.includes(user.userId)) // Exclude dismissed users
              .map((user) => (
                <div className="user" key={user.userId}>
                  <div className="userInfo">
                    <img
                      src={`/upload/${user.profilePic}`}
                      className="suggestion-profile-pic"
                    />
                    <Link to={`/profile/${user.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <span>{user.username}</span> {/* Display the username */}
                    </Link>
                  </div>
                  <div className="buttons">
                    <button onClick={() => handleFollow(user.userId)}>Follow</button>
                    <button onClick={() => handleDismiss(user.userId)}>Dismiss</button>
                  </div>
                </div>
              ))
          ) : (
            <p>No suggested users available.</p> // Fallback if no suggestions
          )}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
