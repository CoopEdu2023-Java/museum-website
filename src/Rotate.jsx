import { useEffect, useState } from 'react';

export const Rotate = ({ rotate = true, children, reverse = false }) => {
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (!node) return;

    const resizeObserver = new ResizeObserver(() => {
      setWidth(node.offsetWidth);
      setHeight(node.offsetHeight);
    });

    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, [node]);

  return (
    <div
      ref={setNode}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'absolute',
          transformOrigin: 'top left',
          ...(rotate ? {
            width: height,
            height: width,
            ...(reverse ? {
              rotate: '-90deg',
              top: '100%',
            } : {
              rotate: '90deg',
              left: '100%',
            })
          } : {
            width: rotate ? height : width,
            height: rotate ? width : height,
          })
        }}
      >
        {children}
      </div>
    </div>
  );
};
