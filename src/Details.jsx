import { useRef, useEffect } from 'react'
import './Details.css'

function App() {
  const textRef = useRef(null);
  const thumbRef = useRef(null);

  useEffect(() => {
    const textElement = textRef.current;
    const thumbElement = thumbRef.current;

    const updateThumbPosition = () => {
      const scrollTop = textElement.scrollTop;
      const scrollHeight = textElement.scrollHeight;
      const clientHeight = textElement.clientHeight;

      const thumbHeight = (clientHeight / scrollHeight) * clientHeight;
      const thumbTop = (scrollTop / scrollHeight) * clientHeight;

      thumbElement.style.height = `${thumbHeight}px`;
      thumbElement.style.top = `${thumbTop}px`;
    };

    const handleThumbDrag = (e) => {
      const startY = e.clientY;
      const startScrollTop = textElement.scrollTop;
      const clientHeight = textElement.clientHeight;
      const scrollHeight = textElement.scrollHeight;

      const onMouseMove = (moveEvent) => {
        const deltaY = moveEvent.clientY - startY;
        const newScrollTop = startScrollTop + (deltaY / clientHeight) * scrollHeight;
        textElement.scrollTop = newScrollTop;
        updateThumbPosition();
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);

      e.preventDefault();
    };

    textElement.addEventListener("scroll", updateThumbPosition);
    thumbElement.addEventListener("mousedown", handleThumbDrag);

    updateThumbPosition();

    return () => {
      textElement.removeEventListener("scroll", updateThumbPosition);
      thumbElement.removeEventListener("mousedown", handleThumbDrag);
    };
  }, []);

  return (
    <>

      <div className="back-button">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 27L7 18.5L6 17.5L7 16.5L15.5 8L17 9.5L10 16.5H30V18.5H10L17 25.5L15.5 27Z" fill="#FF6A3B" />
        </svg>
      </div>
      <div className="menu-button">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="12" y="8.5" width="18" height="2" fill="white" />
          <circle cx="7.5" cy="9.5" r="1.5" fill="white" />
          <rect x="12" y="16.5" width="18" height="2" fill="white" />
          <rect x="12" y="24.5" width="18" height="2" fill="white" />
          <circle cx="7.5" cy="17.5" r="1.5" fill="white" />
          <circle cx="7.5" cy="25.5" r="1.5" fill="white" />
        </svg>
      </div>
      <div className="preview">
        <img src="src\image\preview.png" alt="PA preview" />
      </div>
      <p className="title">
        游行:第三幅 The Parade: No.3
      </p>
      <div className="avatar">
        <img src="src\image\ok.jpg" alt="author"></img>
        <img src="src\image\ok.jpg" alt="teacher"></img>
      </div>
      <p className="author-title">
        作者/Author<br />
        Alexandra Sima<br />
        司马明芳
      </p>
      <p className="teacher-title">
        导师/Instrutor<br />
        Ryan 杨博宇
      </p>
      <p className="grade-infomation">
        2023届-9年级 <span id="en">Grade 9</span><br />
        用户体验设计 <span id="en">User Experience Design</span>
      </p>
      <p className="author-description-title">
        作者介绍
      </p>
      <p className="author-description">
        我是司马明芳，一个又讨人厌又讨人喜欢的傲娇混合体。<br />
        I am Alexandra, a mixture of obnoxious and endearing.
      </p>
      <p className="work-description-title">
        作品介绍
      </p>
      <div className="work-description">
        <div id="text-container">
          <p id="text" ref={textRef}>
            这是“游行”系列绘画的第三幅作品。故事发生在一次盛大的“状元”游行中。“状元”头戴状元帽，身穿校服，系着绶带，骑在马上，身后的起重机在操纵着她。这幅作品展示了“状元”苏醒的瞬间。通过这一系列的绘画，我想表达的是在父母操纵和成绩至上意识形态的教育下，青少年的意识觉醒。<br />
            <br />
            <i id="en">This painting is the third installment in the "Parade" series, depicting a grand procession where a "champion" adorned with a champion cap, school uniform, and ribbons rides on a horse while being guided by a crane. The artwork captures the moment of awakening for this champion. Through this series of paintings, my intention is to convey the emergence of teenagers' consciousness amidst parental manipulation and an emphasis on achievement.</i>
          </p>
          <div id="custom-scrollbar">
            <div className="scroll-thumb" ref={thumbRef}></div>
          </div>
        </div>
      </div>

    </>
  )
}

export default App
