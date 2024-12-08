import "./CSS/home.css"

const HomeCard = ({ detail }) => {
  return (
    <>
      <div className="card" key={detail._id}>
        <div className="card-content">
          <div className="card-front">
            <img src={detail.image} alt="Card Image" className="front-img" />
          </div>
          <div className="front-content">
            <h1 className="front-name">{detail.name}</h1>
            <p>Size: {detail.size} </p>
            <p>Status: {detail.available ? "Available" : "Unavailable"}</p>
          </div>
          <div className="card-back">
            <div className="back-name">{detail.name}</div>
            <div className="back-content">
              <p>Size: {detail.size} </p>
              <p>Price: &#8377;{detail.price} </p>
              <p>Description: {detail.descriptions}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeCard;
