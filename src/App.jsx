import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDrag } from '@use-gesture/react';

import { useOrientation } from './useOrientation';
import DeclarationPage from './DeclarationPage';
import { SimplePage } from './SimplePage';
import { SwiperPage } from './SwiperPage';
import { Rotate } from './Rotate';

export default function App() {
  const isLandscape = useOrientation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swiperPageState, setSwiperPageState] = useState({ canSwipeRight: false });
  const pages = [
    <DeclarationPage isLandscape={isLandscape} />,
    <SwiperPage key={2} id={2} rotate={!isLandscape} onStateChange={setSwiperPageState} />,
    <SimplePage key={3} id={3} />
  ];
  const ref = useRef(null);

  const handleSwipe = (type, direction) => {
    console.log(type, direction);
    if (direction === 'left' && currentIndex < pages.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (direction === 'right' && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
    setDragX(0);
  };

  const swiperPageBind = useDrag(({ down, movement: [mx], elapsedTime }) => {
    setIsDragging(down);
    console.log(mx);
    const swipeThreshold = 100;
    const tx = Math.min(Math.max(mx * 0.5, -100), 0);
    if (down) {
      setDragX(tx);
    } else {
      if (Math.abs(tx) >= swipeThreshold && elapsedTime > 300) {
        setCurrentIndex(2);
      }
      setDragX(0);
    }
  }, {
    // bounds: { right: 0, left: -100 }, might be a bug
    transform: ([x, y]) => (isLandscape ? [x, y] : [y, -x]),
    enabled: swiperPageState.canSwipeRight
  });

  const bind = useDrag(
    ({ down, movement: [mx], swipe: [swipeX, swipeY] }) => {
      setIsDragging(down);
      console.log(mx);
      if (down) {
        setDragX(mx);
      } else {
        console.log(currentIndex);
        const longSwipeThreshold = ref.current.offsetWidth * 0.5;

        const swipe = isLandscape ? swipeX : swipeY;
        if (swipe !== 0) {
          const direction = swipe > 0 ? 'right' : 'left';
          handleSwipe('short', direction);
        } else if (Math.abs(mx) > longSwipeThreshold) {
          const direction = mx > 0 ? 'right' : 'left';
          handleSwipe('long', direction);
        } else {
          setDragX(0);
        }
      }
    },
    {
      transform: ([x, y]) => (isLandscape ? [x, y] : [y, -x]),
    }
  );

  const binders = [bind, swiperPageBind, bind];

  return (
    <Rotate rotate={!isLandscape}>
      <div className='full'>
        <AnimatePresence>
          {[-1, 0, 1].map((offset) => {
            const pageIndex = currentIndex + offset;
            const isMain = offset === 0;
            const binder = binders[pageIndex] || (() => { });
            return (
              <motion.div
                key={pageIndex}
                className="full"
                style={{ touchAction: 'none' }}
                initial={{ x: `calc(${offset} * 100% + ${dragX}px)` }}
                animate={{ x: `calc(${offset} * 100% + ${dragX}px)` }}
                transition={
                  isDragging
                    ? { type: false }
                    : { type: 'spring', stiffness: 300, damping: 30 }
                }
                {...binder()}
              >
                <div className="full" ref={isMain ? ref : null}>
                  {/* see https://github.com/motiondivision/motion/issues/2263 */}
                  {pages[pageIndex] /* may be out of bound */}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </Rotate>
  );
}
