import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import moment from "moment";

const Comments = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(null); // Store the ID of the comment to delete

  const { isLoading, error, data } = useQuery({
    queryKey: ['comments', postId], 
    queryFn: () => 
      makeRequest.get("/comments?postId=" + postId).then((res) => res.data),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const response = await makeRequest.post('/comments', newComment);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] }); 
    },
    onError: (error) => {
      console.error('Error creating Comment:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (commentId) => {
      return makeRequest.delete("/comments/" + commentId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: (error) => {
      console.error('Error deleting comment:', error);
    },
  });

  const handleDelete = (commentId) => {
    deleteMutation.mutate(commentId);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (!desc.trim()) {
      console.error("Comment description cannot be empty!");
      return;
    }
    
    mutation.mutate({ desc, postId });
    setDesc("");  
  };


  return (
    <div className="comments">
      <div className="write">
        <img src={"/upload/" + currentUser.profilePic} alt="" />
        <input
          type="text"
          placeholder="write a comment"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleClick}>Send</button>
      </div>
      {error
        ? "Something went wrong"
        : isLoading
        ? "loading"
        : data.map((comment) => (
            <div className="comment" key={comment.id}>
              <img src={"/upload/" + comment.profilePic} alt="" />
              <div className="info">
                <span>{comment.username}</span>
                <p>{comment.desc}</p>
              </div>
              <span className="date">
                {moment(comment.createdAt).fromNow()}
              </span>
              
              {comment.userid === currentUser.userId && ( 
  <div className="horizon">
    <MoreHorizIcon onClick={() => setMenuOpen(menuOpen === comment.id ? null : comment.id)} />
    {menuOpen === comment.id && (
      <div className="menu">
        <button onClick={() => handleDelete(comment.id)}>Delete</button>
      </div>
    )}
  </div>
)}
            </div>
          ))}
    </div>
  );
};

export default Comments;
