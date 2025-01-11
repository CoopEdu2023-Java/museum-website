import React from 'react';
import {Typography, Image} from '@douyinfe/semi-ui';
import styles from './index.module.css'
import {useNavigate} from "react-router-dom";

function Epilogue(){
  const {Title} = Typography
  const navigate = useNavigate();

  const handleRightButtonClick = () => {
    navigate("/catalog");
  };
  return (
    <div className={styles.contentbox}>
      <div className={styles.leftSide}>
        <Title className={styles.end}
               style={{fontSize: '32px', whiteSpace: 'nowrap', fontFamily: "HYQiHei_80s"}}>结语</Title>
        <Title className={styles.end}
               style={{fontSize: '24px', whiteSpace: 'nowrap', fontFamily: "Platform-Bold"}}>Epilogue</Title>
        <p className={styles.text}>「作品精神」在探月深入人心，每一位探月师生，都将学习和工作中所经历的项目看作是自己的作品，用心地去创作、打磨。据不完全统计，每学年由探月学习者创造的作品数量可达到
          2000 份以上。
          在每一个学年末尾的期末成果展上，你会看到近乎所有学部的学习者作品，共同总结并庆祝一个学年以来每个个体的收获与成长；在探月所倡导的表现性评价体系中，老师所设计的学科项目和任务，都将指向学习者最终所创造的
          Artifact, 其对应的中文就是「作品」。The concept of "work spirit" is deeply ingrained in the culture of lunar
          exploration, where every teacher and student involved in lunar exploration treats their learning and work
          experiences as their own creations, meticulously crafting and refining them. According to incomplete
          statistics, the number of works created by learners at Moonshot can reach more than 2000 per academic year. At
          the end-of-year exhibition held at the close of each school year, you will see the works of nearly all
          learners from the various departments, summarizing and celebrating the individual achievements and growth of
          the past academic year; in the performance-based assessment system advocated by Moonshot, the subject projects
          and tasks designed by teachers are all aimed at the final creations of the learners, known as Artifacts, which
          in Chinese is referred to as "works."</p>
      </div>
      <p className={styles.back} onClick={()=>navigate('/home-page')} style={{fontFamily: 'HYQiHei_25s'}}>返回首页> </p>
      <img
        className={styles.menu}
        src="/sign/menu.svg"
        alt="Right Button"
        onClick={handleRightButtonClick}
      />
      <Image className={styles.moon} preview={false} width={400} height={400} src="/Epilogue/moon.png"/>
    </div>
  );
};

export default Epilogue;
