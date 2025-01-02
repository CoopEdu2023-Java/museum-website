import { Tabs } from '@douyinfe/semi-ui';
import React, { useState } from 'react';
import './ExhibitionGallery.css'; // Global CSS

function ExhibitionGallery() {
  const [contentText, setContentText] = useState('描述信息部分');

  // 按钮点击事件处理
  const handleBack = () => {
    console.log('Back button clicked');
  };

  const handleNext = () => {
    console.log('Next button clicked');
  };

  const handleSubmit = () => {
    console.log('Submit button clicked');
  };

  return (
    <div className="App">
      
      <header className="header">
        <div className='navigation'>
          <button className="backButton" onClick={handleBack} >
            <img src="20241202-135001.png" alt="Back" />
          </button>
          <h1 className='enghead'>Self Awarness</h1>
        </div>

        <div className='maintext'>
          <h1 className='CNhead'>自我认知</h1>
          <main className="mainContent">
            <p>学习者可以观察自然，了解社会和生活，探索、体验和欣赏艺术的魅力，积极参与艺术活动，用有组织有意义的语言表达思想，用视觉和听觉的媒介和技术创造形象，用现代媒介和数字媒体技术再现和表达世界，在艺术世界中寻求真善美。。here is the content</p>
          </main>
        </div>

      </header>

      

      {/* Footer Section */}
      <footer className="footer">
        <button className="menuButton" onClick={handleSubmit}>
        <img src="20241202-135609.png" alt="Menu" />
        </button>

        <div className='pictures'>
          <img className='image1' src='/20241128-210250.png'/>
          <img className='image2' src='/20241128-210307.png'/>
        </div>
      </footer>
    </div>
  );
}

export default ExhibitionGallery;
