import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CSS/testimonials.css";

import arrowLeft from "../assets/photos/arrow-left.svg";
import arrowRight from "../assets/photos/arrow-right.svg";
import { FaStar } from "react-icons/fa";

function Testimonials() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_TESTIMONIALS}/get`)
      .then((res) => res.json())
      .then((res) => setContent(res.testimonials));
  }, []);

  return (
    <>
      <h2 className="testimonials-heading">Testimonials</h2>
      <div className="carousel-container">
        <Swiper
          modules={[EffectCoverflow, Navigation, Pagination]}
          navigation={{
            prevEl: ".button-prev",
            nextEl: ".button-next",
          }}
          pagination={{
            clickable: true,
          }}
          speed={1000}
          slidesPerView="auto"
          centeredSlides
          effect="coverflow"
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
        >
          {content.map((c) => (
            <SwiperSlide className="slide-inner">
              <div class="testimonial-card">
                <div class="testimonial-content">
                  <h2 class="profile-name">{c.name}</h2>
                  <div className="t-row">
                    <p class="date">{new Date(c.timestamp).toLocaleDateString("en-US")}</p>
                    <p class="rating">{c.rating}<FaStar className="star"/></p>
                  </div>
                  <p class="description">{c.text}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}

          {/* Navigation buttons */}
          <div className="button-prev">
            <img src={arrowLeft} alt="Previous slide" />
          </div>
          <div className="button-next">
            <img src={arrowRight} alt="Next slide" />
          </div>
        </Swiper>
      </div>
    </>
  );
}

export default Testimonials;
