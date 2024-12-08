import photo from "../assets/photos/WhatsApp Image 2024-10-12 at 14.47.40_4f9cd0ae.jpg";
import "./CSS/about.css";

const About = () => {
  return (
    <>
      <div className="about-content">
        <img src={photo} alt="Artistic representation" className="about-image" />
        <div className="overlay"></div>
        <div className="content-container">
          <div className="heading">
            <h1>About</h1>
          </div>
          <div className="content-text">
            <p>
              Welcome to Kayra Crafty, where creativity meets inspiration! Our
              mission is to showcase the beauty of art in all its forms,
              offering a platform for artists, art lovers, and collectors to
              connect and celebrate the world of visual expression. Founded by a
              group of passionate art enthusiasts, we believe that art has the
              power to transform lives, evoke emotions, and tell stories without
              words. Whether you're an artist looking to share your work or an
              art admirer seeking unique pieces, Kayra is a vibrant community
              that nurtures creativity and encourages artistic growth. Our
              website features a diverse range of artworks, from contemporary
              paintings and digital illustrations to sculptures and photography.
              We strive to promote both emerging and established artists,
              providing them with a space to shine and connect with a global
              audience. Join us on this artistic journey as we explore the
              endless possibilities of imagination and celebrate the timeless
              beauty of art.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
