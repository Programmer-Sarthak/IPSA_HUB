import "./share.scss";
import Image from "../../assets/img.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { makeRequest } from "../../axios";

const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const upload = async () => {
    if (!file) return null;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data; // Return the uploaded filename
    } catch (err) {
      console.error("File upload error:", err);
      return null;
    }
  };

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return makeRequest.post('/posts', newPost);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['posts']);
      setDesc(""); 
      setFile(null);
    },
    onError: (error) => {
      console.error('Error creating post:', error);
    },
  });

  const handleClick = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const imgUrl = await upload();
    

    mutation.mutate({ desc, img: imgUrl });
    setIsUploading(false);
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img 
              src={currentUser.profilePic ? `/upload/${currentUser.profilePic}` : "/path/to/default/profile.png"} 
              alt="" 
            />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
          </div>
          <div className="right">
            {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
            />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleClick} disabled={isUploading}>
              {isUploading ? "Sharing..." : "Share"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
