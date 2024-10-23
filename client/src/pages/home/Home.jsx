import "./home.scss"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"


export const Home = () => {
  return (
    
    <div className="home">
      <Share/>
      <Posts/>
    </div>
  )
}

export default Home