import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Posts = ({ userId }) => {
  const { isLoading, error, data: posts } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => makeRequest.get(`/posts?userId=${userId}`).then((res) => res.data),
  });
  console.log()

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error loading posts!</div>;
  // Rendering posts
  return (
    <div className="posts">
      {Array.isArray(posts) && posts.map(post => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
};

export default Posts;
