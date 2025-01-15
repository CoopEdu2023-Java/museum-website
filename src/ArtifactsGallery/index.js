import React, {useEffect, useState} from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./test.css";
import useUploadRecord from "./webpageRecord";
import { Pagination } from "swiper/modules";
import {useNavigate, useParams} from "react-router-dom";
import EndPage from "../EndPage";
import ArtifactModal from "../ArtifactModal";
import http from "../http";

const generateRandomColors = (count) => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return Array.from({ length: count }, () => getRandomColor());
};

const SwiperComponent = () => {
  const navigate = useNavigate();
  const [isEnd, setIsEnd] = useState(false);
  const { competencyName, page } = useParams();
  const [showArtifact,  setShowArtifact] = useState('');
  const [artifacts, setArtifacts] = useState([]);
  // const slidesData = [
  //   "Artifact's Name 1",
  //   "Artifact's Name 2",
  //   "Artifact's Name 3",
  //   "Artifact's Name 4",
  //   "Artifact's Name 5",
  //   "Artifact's Name 6",
  //   "Artifact's Name 7",
  //   "Artifact's Name 8",
  // ];

  useEffect(()=>{
    http.get( `/artifacts/get?competency=${competencyName}`)
      .then(response => {
        setArtifacts(response.data.data);
      })
      .catch(error => {
        console.log(error)
      });
  },[])

  useEffect(() => {
    console.log(isEnd)
  }, [isEnd]);

  const [colors] = useState(() => generateRandomColors(artifacts.length));
  useUploadRecord("webpage", "Galary");
  const handleLeftButtonClick = () => {
    navigate(`/exhibition-gallery/${competencyName}/${page}`);
  };
  const handleRightButtonClick = () => {
    navigate("/catalog");
  };

  return (
    <div className="swiper-container">
      <img
        className="top-left-button"
        src="/sign/back.svg"
        alt="Left Button"
        onClick={handleLeftButtonClick}
      />

      <img
        className="top-right-button"
        src="/sign/menu.svg"
        alt="Right Button"
        onClick={handleRightButtonClick}
      />

      <Swiper
        loop={false}
        slidesPerView={5}
        initialSlide={0}
        loopAdditionalSlides={2}
        spaceBetween={80}
        speed={800}
        mousewheel={true}
        freeMode={false}
        centeredSlides={true}
        pagination={true}
        modules={[Pagination]}
        onSlideChange={(swiper) => {
          if (swiper.isEnd) {
            setIsEnd(true); // 滑动到最后一页
          } else {
            setIsEnd(false);
          }
        }}
      >
        {artifacts.map((data, index) => (
          <SwiperSlide
            key={index}
            className={`swiper-slide ${isEnd ? "shift-left" : "shift-right"}` }
            style={{
              backgroundColor: colors[index], // 固定的颜色
              borderWidth: "10px",
              borderStyle: "solid",
              borderColor: "black",
              opacity: 0.8,
            }}
            onClick={()=>{
              setShowArtifact(index)
            }}
          >
            <div className="text-box">{data.title}</div>
          </SwiperSlide>
        ))}
      </Swiper>

      <ArtifactModal isOpen={showArtifact} setIsOpen={setShowArtifact}/>

      <EndPage
        isVisible={isEnd}
      />
    </div>
  );
};

export default SwiperComponent;
