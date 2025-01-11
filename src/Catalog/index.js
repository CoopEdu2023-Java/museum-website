import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import styles from './index.module.css';
import { Typography } from '@douyinfe/semi-ui';
import {useNavigate} from "react-router-dom";
import http from '../http';

gsap.registerPlugin(Observer);

const Carousel3D = () => {
  const { Title, Text } = Typography;

  const carouselRef = useRef(null);
  const imagesRef = useRef([]);
  const progress = useRef({ value: 0 });
  const [radius, setRadius] = useState(window.innerHeight * 0.5 + 80);
  const [competencies, setCompetencies] = useState([]);
  const navigate = useNavigate();

  const getCompetencies = async () => {
    try {
      const res = await http.get('/competencies');
      const data = res.data.isEmpty ? [1, 2, 3, 4, 5, 6, 7, 8, 9] : res.data.data;
      localStorage.setItem('competencies', JSON.stringify(data));
      return data;
    } catch (error) {
      console.error('Error fetching competencies:', error);
      return [1, 2, 3, 4, 5];
    }
  };

  useEffect(() => {
    getCompetencies().then(res => {setCompetencies(res)}).then(()=>{console.log(competencies)})

    const updateRadius = () => {
      setRadius(window.innerHeight * 0.5 + 80);
    };
    updateRadius();

    // 监听窗口变化
    window.addEventListener('resize', updateRadius);

    return () => {
      window.removeEventListener('resize', updateRadius);
    };
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    const images = imagesRef.current;

    Observer.create({
      target: carousel,
      type: 'wheel,pointer',
      onPress: () => {
        carousel.style.cursor = 'grabbing';
      },
      onRelease: () => {
        carousel.style.cursor = 'grab';
      },
      onChange: (self) => {
        gsap.killTweensOf(progress.current);
        const p = self.event.type === 'wheel' ? self.deltaY * -0.001 : self.deltaX * 0.01;
        gsap.to(progress.current, {
          duration: 0.5,
          ease: 'power1.out',
          value: `+=${p}`,
          overwrite: true,
        });
      },
    });
    const animate = () => {
      images.forEach((image, index) => {
        const theta = index / images.length - progress.current.value;
        const x = -Math.sin(theta * Math.PI * 2) * radius;
        const y = Math.cos(theta * Math.PI * 2) * radius;

        const normalizedY = y / radius;
        
        let opacity;
        if (normalizedY > 0.7) {
          opacity = 1;
        } else if (normalizedY < -0.7) {
          opacity = 0.05;
        } else {  // 中间的元素
          opacity = 0.2 + (normalizedY + 0.7) * 0.8;
        }
        
        let scale;
        if (normalizedY > 0) {
          const scaleFactor = Math.pow(normalizedY, 2);
          scale = 0.3 + scaleFactor * 0.7;
        } else {
          scale = 0.3;
        }
        image.style.transform = `translate3d(${x}px, 0px, ${y}px) rotateX(20deg) rotateZ(15deg) scale(${scale})`;
        image.style.opacity = opacity;
        image.style.zIndex = Math.round(y);
        image.style.visibility = 'visible';
      });
    };

    gsap.ticker.add(animate);

    return () => {
      gsap.ticker.remove(animate);
    };
  }, [radius]);

  return (
    <>
      <div className={styles.leftSide}>
        <div style={{
          marginLeft: '28px',
          marginTop: '24px',
          zIndex: '9'
        }}>
          <Title style={{
            color: 'white',
            fontFamily: 'HYQiHei_80s'
          }}>
            目录
          </Title>
          <Title style={{
            color: 'white',
            fontFamily: 'Platform-Blot'
          }}>
            Content
          </Title>
        </div>


        <Text style={{
          color: 'white',
          fontFamily: 'HYQiHei_25s'  // 添加字体样式
        }} className={styles.back}
          onClick={() => navigate('/declaration')}>
          &lt; 返 回
        </Text>
      </div>
      <div className={styles.carouselContainer} ref={carouselRef}>
        {[...Array(competencies.length)].map((_, index) => (
          <div
            key={index}
            className={styles.carouselImage}
            ref={(el) => (imagesRef.current[index] = el)}
            onClick={()=>{
              navigate(`/exhibition-gallery/${competencies[index].name}/${competencies[index].id}`);
            }}
          >
            {competencies[index].name}
          </div>
        ))}
        <img src={'/Catalog/月球.svg'} alt="发光月球" className={styles.moonImage} />
      </div>
    </>
  );
};

export default Carousel3D;