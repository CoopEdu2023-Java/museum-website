import React, {useEffect, useState} from 'react';
import styles from './index.module.css';
import {useNavigate, useParams} from 'react-router-dom';
import http from "../http";
function ExhibitionGallery() {
  const { competencyName,page } = useParams();

  const navigate = useNavigate();
  const [intro, setIntro] = useState();

  useEffect(() => {
    http.get(`/competencies/${page}`) .then((response) => {
      setIntro(response.data.data.intro);
    })
  }, []);
  return (
    <div className={styles.App}>
      <header className={styles.header}>
        <div className={styles.navigation}>
          <img className={styles.backButton} onClick={()=>{navigate('/catalog')}} src="/sign/back.svg" alt="Back"/>
          <h1 className={styles.ENHead}>Self Awareness</h1>
        </div>
        <div className={styles.mainText}>
          <h1 className={styles.CNHead}>{competencyName}</h1>
          <main className={styles.mainContent}>
            <p className={styles.text}>{intro}</p>
          </main>
        </div>

      </header>
      <footer>
        <img className={styles.menuButton} onClick={()=>{navigate('/catalog')}} src="/sign/menu.svg" alt={'menuButton'}/>
        <div className={styles.pictures}>
          <img className={styles.image1} src='/ExhibitionGallery/SelfAwareness1.png' alt={"artifact cover"}/>
          <img className={styles.image2} src='/ExhibitionGallery/SelfAwareness2.png' alt={"artifact cover"}/>
        </div>
      </footer>
      <img onClick={()=>{navigate(`/artifacts-gallery/${competencyName}/${page}`)}} className={styles.RightButton} src="/ExhibitionGallery/RightButton.png" alt={"RightButton"}/>


    </div>
  );
}

export default ExhibitionGallery;
