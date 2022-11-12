import {useEffect, useState} from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    };
    getData();
  }, [url]);
  return data;
};

export default useFetch;
