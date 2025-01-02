import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Rotate } from './Rotate';

export const SwiperPage = ({ id, onStateChange, rotate }) => {
  return (
    <Rotate rotate={rotate} reverse>
      <Swiper
        slidesPerView={3}
        centeredSlides
        className="full"
        style={{ background: id % 2 === 0 ? 'lightblue' : 'lightgreen' }}
        onActiveIndexChange={swiper => {
          onStateChange({ canSwipeRight: swiper.isEnd });
        }}
        direction={rotate ? 'vertical' : 'horizontal'}
      >
        {[1, 2, 3, 4].map(slideId =>
          <SwiperSlide key={slideId}>
            <Rotate rotate={rotate}>
              <div className="full page">Page {id} slide {slideId}</div>
            </Rotate>
          </SwiperSlide>
        )}
      </Swiper>
    </Rotate>
  );
};
