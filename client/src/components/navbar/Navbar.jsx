import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axios"; // Adjust this based on your axios instance path

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // UseQuery to fetch user data
  const { data: userData } = useQuery({
    queryKey: ["user", currentUser.userId],
    queryFn: () => makeRequest.get(`/users/find/${currentUser.userId}`).then(res => res.data),
  });

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value) {
      try {
        const res = await makeRequest.get(`/users/search?query=${value}`);
        setSearchResults(res.data);
      } catch (err) {
        console.error("Search error:", err);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Reset search query and results when a user is clicked
  const handleUserClick = () => {
    setQuery('');
    setSearchResults([]); // Clear the search results when a user is clicked
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>IPSA HUB</span>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="home"><HomeOutlinedIcon /></div>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}

        <div className="search">
          <SearchOutlinedIcon />
          <input 
            type="text" 
            placeholder="Search..." 
            value={query} 
            onChange={handleSearch} 
          />
          {searchResults.length > 0 && (
            <div className="search-results">
              <ul>
                {searchResults.map((user) => (
                  <li key={user.userId}>
                    <Link 
                      to={`/profile/${user.userId}`} 
                      onClick={handleUserClick} // Call function to clear query and results
                    >
                      <img
                      src={`/upload/${user.profilePic}`}
                      className="suggestion-profile-pic"
                    />
                      {user.username}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="right">
        <div className="user">
          <Link to={`/profile/${currentUser.userId}`}>
            <PersonOutlinedIcon />
          </Link>

          <Link to={`/profile/${currentUser.userId}`} style={{ textDecoration: "none" }}>
            <img src={`/upload/${userData?.profilePic}`} alt="" />
            <span>{userData?.username}</span>
          </Link>
        </div>  
      </div>
    </div>
  );
};

export default Navbar;
