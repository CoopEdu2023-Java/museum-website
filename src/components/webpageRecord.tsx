import axios from "axios"
import { useEffect } from 'react';

const uploadRecord = async (type, id) => {
    const timestamp = new Date().toISOString();
    const secretId = id;
  
    try {
        const response = await axios.post('http://localhost:8080/api/click', {
            type,
            secretId,
            timestamp,
        }, {
            headers: {
                'X-Forwarded-For': '127.0.0.1',  // 模拟一个 IP 地址，或者动态获取
            },
        });
  
        if (response.status === 200) {
            console.log(`Webpage ${secretId} view at ${timestamp}`);
        } else {
            console.error('Failed to upload click data');
        }
    } catch (error) {
        console.error('Error uploading click data:', error);
    }
  };

const useUploadRecord = (type: string, id: string) => {
  useEffect(() => {
    const uploadData = async () => {
      if(localStorage.getItem("recordUploadedType") != type || localStorage.getItem("recordUploadedId") != id) {
        try {
        await uploadRecord(type, id); // 调用异步函数
        console.log(`Record with ID ${id} uploaded successfully`);
        localStorage.setItem('recordUploadedType', type);
        localStorage.setItem('recordUploadedId', id);
        } catch (error) {
          console.error('Error uploading record:', error);
        }
      }
      
    };

    uploadData(); // 调用上传逻辑
  }, [id]); // 依赖于 id
};
export default useUploadRecord;