import "./CSS/home.css";
import "../Button/CSS/button.css";
import { useEffect, useState } from "react";
import HomeCard from "./HomeCard";

const Home = () => {
  const [arts, setArts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/crafts/get")
      .then((res) => res.json())
      .then((res) => {
        console.log(res.crafts)
        setArts(res.crafts)});
  }, []);

  return (
    <>
      <h1 className="text">Our creative outputs in the realm of art</h1>
      <div className="card-grid">
        {arts.map((art) => (
          <>
            {art.details.map((detail) => (
              <HomeCard key={art._id} detail={detail} />
            ))}
          </>
        ))}
      </div>

      <div className="h-btn">
        <button class="home-btn">
          <div class="home-text-container">
            <span class="home-text">View More</span>
            <span class="home-text">View More</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default Home;
