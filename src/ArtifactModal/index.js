import React, {useEffect, useState} from 'react';
import http from '../http';
import styles from './index.module.css'
import {List, Typography} from "@douyinfe/semi-ui";

function ArtifactModal({isOpen, setIsOpen}){
  const [artifact, setArtifact] = useState({})
  const { Text } = Typography;

  useEffect(() => {
    http.get(`/artifacts/${isOpen}/get`).then((response) => {
      console.log(response.data.data);
      setArtifact(response.data.data);
    })
      .catch(error => {
        console.log(error)
      });
  }, [isOpen]);
  useEffect(()=>{
    console.log(isOpen)
  },[isOpen])
  return (
    isOpen !== '' ?
        <div
          className={styles.artifactModalContainer}
          style={{
            position: 'fixed',
            height: '100%',
            width: '100%',
            zIndex: 100,
          }}
        >
          <img
            src="/sign/back-icon.svg"
            alt={"返回"}
            className={styles.backIcon}
            onClick={() => setIsOpen('')}
          />
          <div className={styles.artifactModal}>
            <img className={styles.img} src={`http://43.140.225.61:1919${artifact.avatarUrlThumb}`} alt={"作品封面"}/>
            <div className={styles.rightSide}>
              <Text className={styles.title}>{artifact.title}</Text>
              <div className={styles.description}>
                <div className={styles.author}>
                  <List
                    dataSource={artifact.userList}
                    className={styles.userList}
                    renderItem={item => (
                      <List.Item
                        main={
                          <div className={styles.user}>
                            <img style={{width: '60px', height: '60px'}}
                                 src={`http://43.140.225.61:1919${item.avatarUrl}`} alt={`${item.defaultName}的美照`}/>
                            {
                              item.type === "instructor" ?
                                <Text style={{color: 'white', fontFamily: 'HYQiHei_25s'}}>导师/Instructor</Text> :
                                <Text style={{color: 'white', fontFamily: 'HYQiHei_25s'}}>作者/Author</Text>
                            }
                            <Text style={{color: 'white', fontFamily: 'HYQiHei_25s'}}>{item.defaultName}</Text>
                          </div>
                        }
                      />
                    )}
                  />
                </div>
                <div className={styles.artifactDescription}>
                  <Text className={styles.introTitle}>作品介绍</Text>
                  <Text className={styles.intro}>{artifact.intro}</Text>
                </div>
              </div>
            </div>
          </div>
        </div>
  : <></>
  );
}

export default ArtifactModal;