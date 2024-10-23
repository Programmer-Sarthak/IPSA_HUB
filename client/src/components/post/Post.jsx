import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useState, useContext } from "react";
import moment from "moment";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const { isLoading: loadingLikes, data: likes = [] } = useQuery({
    queryKey: ["likes", post.id],
    queryFn: () => makeRequest.get(`/likes?postId=${post.id}`).then((res) => res.data || []),
  });

  const { isLoading: loadingComments, data: comments = [] } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => makeRequest.get(`/comments?postId=${post.id}`).then((res) => res.data || []),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (liked) => {
      return liked ? makeRequest.delete(`/likes?postId=${post.id}`) : makeRequest.post("/likes", { postId: post.id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["likes", post.id]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => makeRequest.delete(`/posts/${post.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleLike = () => {
    const liked = likes.some((like) => like.userid === currentUser.id);
    mutation.mutate(liked);
  };

  const handleDelete = () => {
    deleteMutation.mutate();
    setMenuOpen(false);
  };

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={`/upload/${post.profilePic}`} alt="" />
            <div className="details">
              <Link to={`/profile/${post.userId}`} style={{ textDecoration: "none", color: "inherit" }}>
                <span className="name">{post.username}</span>
              </Link>
              <span className="date">{moment(post.createdAt).fromNow()}</span>
            </div>
          </div>
          <div className="horizon">
            <MoreHorizIcon onClick={() => setMenuOpen((prev) => !prev)} />
            {menuOpen && post.userId === currentUser.userId && (
              <div className="menu">
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
          </div>
        </div>
        <div className="content">
          {post.desc && <p>{post.desc}</p>}
          {post.img && <img src={`/upload/${post.img}`} alt="" />}
        </div>
        <div className="info">
        <div className="item">
  {loadingLikes ? "Loading..." : (
    likes.some((like) => like.userid === currentUser.id) ? 
    <FavoriteOutlinedIcon className="favoriteIcon liked" onClick={handleLike} /> : 
    <FavoriteBorderOutlinedIcon className="favoriteIcon" onClick={handleLike} />
  )}
  {likes.length} likes
</div>

          <div className="item" onClick={() => setCommentOpen((prev) => !prev)}>
            <TextsmsOutlinedIcon />
            {comments.length} comments
          </div>
        </div>
        {commentOpen && <Comments postId={post.id} />}
      </div>
    </div>
  );
};

export default Post;
