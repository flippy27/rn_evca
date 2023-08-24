import { useState, useEffect } from 'react';

const API_URL = 'https://evca.dev.dhemax.link/api/v1/';

export const registerUser = (companyId, email, password) => {
  return new Promise((resolve, reject) => {
    const dataToSend = { companyId, email, password };
    let formBody = [];

    for (let key in dataToSend) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(`${API_URL}auth/login/register`, {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => {
        console.log("response", response.status);
        if (response.status > 499) {
          throw new Error("Server error");
        }
        return response.json();
      })
      .then((responseJson) => {
        resolve(responseJson);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const checkUser = (companyId, email) => {
  console.log(companyId,email);
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}auth/exists/${companyId}/${email}`, {
      method: 'GET',
    })
    .then((response) => {
      console.log('response',response.status);
      if (response.status > 499){
        throw new Error('Server error');
      }
      return response.json();
      
     
    })
    .then((responseJson) => {
      resolve(responseJson);
    })
    .catch((error) => {
      reject(error);
    });
  });
};
export const useLoginUser = (companyId, email, password) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loginUser = () => {
      const dataToSend = { companyId, email, password };
      let formBody = [];

      for (let key in dataToSend) {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch(`${API_URL}auth/login`, {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseJson) => {
        console.log(responseJson); // Log the data here
        setData(responseJson);
        setLoading(false);
      })
    };

    loginUser();
  }, [companyId, email, password]); // the effect will run every time `company`, `email`, or `password` changes


  return { data, loading, error };
};

export const useRegisterUser = (companyId, email, password) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const registerUser = () => {
      const dataToSend = { companyId, email, password };
      let formBody = [];

      for (let key in dataToSend) {
        const encodedKey = encodeURIComponent(key);
        const encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');

      fetch(`${API_URL}auth/login/register`, {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((responseJson) => {
        setData(responseJson);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
    };

    registerUser();
  }, [companyId, email, password]); 

  return { data, loading, error };
};