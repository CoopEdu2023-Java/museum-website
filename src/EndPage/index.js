import styles from './index.module.css';
import {Typography} from "@douyinfe/semi-ui";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const EndPage = ({ isVisible }) => {
  const { Text } = Typography;
  const [isLastCompetency, setIsLastCompetency] = useState(false);
  const { competencyName, page } = useParams();
  const [ nextName, setNextName ] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const storedCompetencies = JSON.parse(localStorage.getItem('competencies'));
    if (storedCompetencies.length - Number(page) === 0) {
      console.log(111)
      setIsLastCompetency(true);
    } else {
      setIsLastCompetency(false);
      setNextName(storedCompetencies[Number(page)].name);
    }
  }, []);

  return (
    <div className={isVisible ? styles.endPage : styles.hidden}>
      <div className={styles.head}>
        <Text style={{
          color: 'white',
          fontFamily: 'Platform-regular'
        }} className={styles.ENHead}>
          Self Awareness
        </Text>
        <div className={styles.HeadText}>
          <Text style={{
            fontSize: '40px',
            color: 'white',
            fontFamily: 'HYQiHei_80s'
          }}>
            {competencyName}部分观览结束
          </Text>
          <Text style={{
            fontSize: '20px',
            color: 'white',
            fontFamily: 'Platform-bold'
          }}>
            This is the end of this section
          </Text>
        </div>
        <img
          src={isLastCompetency ? "/EndPage/end.svg" : "/EndPage/next.svg"}
          alt="continue"
          className={styles.next}
          onClick={() => {
            navigate(isLastCompetency ? "/epilogue": `/exhibition-gallery/${nextName}/${Number(page)+1}`);
          }}
        />
      </div>
    </div>
  );
};

export default EndPage;
