import { useState, useEffect, useCallback } from 'react';
const API_URL = 'https://evca.dev.dhemax.link/api/v1/';
const token= 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQ3ZjhjMWY2LWVkNGQtNGIzMC04YjFhLWM0YTYzZjZmZmI4YSIsImVtYWlsIjoibWFyaWEuc2FhdmVkcmFAZGhlbWF4LmNvbSIsImlhdCI6MTY5MjkyMzgxNCwiZXhwIjoxNjk1NTE1ODE0fQ.9XLDS6wC_H-MHN8fMUKF1mVqSlJYVrmqj3ju_SIOvfc'

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

export const useConnectorsStatus = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchConnectorsStatus = useCallback((connectorIds) => {
    setLoading(true);
    const dataToSend = {
        connectorsIds: connectorIds
    };

    fetch(`${API_URL}connector/states`, {
      method: "POST",
      body: JSON.stringify(dataToSend), // Stringify the JSON object
      headers: {
        "Content-Type": "application/json",  // Update the content type to JSON
      },
    })
    .then((response) => {
      if (response.status > 499) {
        throw new Error("Server error");
      }
      return response.json();
    })
    .then((responseJson) => {
      setData(responseJson.data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });
  }, []);

  return { data, loading, error, fetchConnectorsStatus };
};


export const useMobileChargeHistory = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMobileChargeHistory = useCallback(() => {
    setLoading(true);

    fetch(`${API_URL}pools/history/${id}`, { 
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })
    .then((response) => {
      if (response.status > 499) {
        throw new Error("Server error");
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
  }, [id]);

  useEffect(() => {
    fetchMobileChargeHistory();
  }, []);  // Use an empty dependency array to run only on the first render

  return { data, loading, error };
};

export const checkUser = (companyId, email) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}auth/exists/${companyId}/${email}`, {
      method: 'GET',
    })
    .then((response) => {
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
export const usePool = (company) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchUsePool = useCallback(() => {
    setLoading(true);

    // Form the endpoint URL with company parameter
    fetch(`${API_URL}pools/?company=${company}`)
    .then((response) => {
      if (response.status > 499) {
        throw new Error("Server error");
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
  }, []); 

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchUsePool(company);
    }, 10000); //Time

    return () => clearInterval(intervalId); 
  }, [fetchUsePool]);

  return { data, loading, error };
};

export const loginUser = (companyId, email, password) => {
  return new Promise((resolve, reject) => {
    const dataToSend = { companyId, email, password };
    let formBody = [];

    for (let key in dataToSend) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(`${API_URL}auth/login`, {
      method: "POST",
      body: formBody,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
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