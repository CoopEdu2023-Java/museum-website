import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import styles from './index.module.css';
import { Typography } from '@douyinfe/semi-ui';

gsap.registerPlugin(Observer);

const Carousel3D = () => {
  const { Title, Text } = Typography;

  const carouselRef = useRef(null);
  const imagesRef = useRef([]);
  const progress = useRef({ value: 0 });

  // 使用 state 来存储 radius
  const [radius, setRadius] = useState(window.innerHeight * 0.25 + 182.5);

  useEffect(() => {
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
        
        // 修改透明度计算逻辑
        let opacity;
        if (normalizedY > 0.7) {  // 最前面的元素
          opacity = 1;
        } else if (normalizedY < -0.7) {  // 最后面的元素
          opacity = 0.05;
        } else {  // 中间的元素
          opacity = 0.2 + (normalizedY + 0.7) * 0.8;
        }
        
        // 修改缩放计算逻辑
        let scale;
        if (normalizedY > 0) {
          // 使用平方函数使中间部分变化更剧烈
          const scaleFactor = Math.pow(normalizedY, 2);  // 二次方使变化更明显
          scale = 0.3 + scaleFactor * 0.7;  // 0.3 到 1.0 的范围
        } else {
          scale = 0.3;  // 保持最小缩放
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
          fontFamily: 'HYQiHei_30s'  // 添加字体样式
        }} className={styles.back}>
          &lt; 返 回
        </Text>
      </div>
      <div className={styles.carouselContainer} ref={carouselRef}>
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className={styles.carouselImage}
            ref={(el) => (imagesRef.current[index] = el)}
          >
            {index + 1}
          </div>
        ))}
        <img src={'/月球.svg'} alt="发光月球" className={styles.moonImage} />
      </div>
    </>
  );
};

export default Carousel3D;