import axios from "axios";
import {useEffect} from "react";

const uploadRecord = async (id) => {
  const timestamp = new Date().toISOString();
  const artifactId = id;

  try {
    const response = await axios.post(
      "http://localhost:8080/artifact/like",
      {
        artifactId,
        timestamp,
      },
      {
        headers: {
          "X-Forwarded-For": "127.0.0.1", // 模拟一个 IP 地址
        },
      }
    );

    if (response.status === 200) {
      console.log(`Webpage ${artifactId} view at ${timestamp}`);
    } else {
      console.error("Failed to upload click data");
    }
  } catch (error) {
    console.error("Error uploading click data:", error);
  }
};

const useSubmitLike = (artifactId) => {
  useEffect(() => {
    uploadRecord(artifactId);
  }, [artifactId]);
};

export default useSubmitLike;