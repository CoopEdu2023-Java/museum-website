import styles from './index.module.css';
import {Typography} from "@douyinfe/semi-ui";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

const EndPage = ({ isVisible }) => {
  const { Text } = Typography;
  const { competencyName } = useParams();
  const navigate = useNavigate();


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
            {competencyName}This is the end of this section
          </Text>
        </div>
        <img
          src="/EndPage/next.svg"
          alt="continue"
          className={styles.next}
          onClick={() => {
            navigate("/epilogue");
          }}
        />
      </div>
    </div>
  );
};

export default EndPage;
