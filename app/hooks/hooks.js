import { useState, useEffect, useCallback } from 'react';
const API_URL = 'https://evca.dev.dhemax.link/api/v1/';
const QA_URL="https://evca.qa.dhemax.link/api/v1/"
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

export const fetchConnectorsStatus = (connectorIds) => {
  return new Promise((resolve, reject) => {
    let formBody = [];
    for (let id of connectorIds) {
      const encodedKey = encodeURIComponent("connectorsIds");
      const encodedValue = encodeURIComponent(id);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch(`${API_URL}connector/states`, {
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

export const useMobileChargeHistory = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMobileChargeHistory = useCallback(() => {
    setLoading(true);

    fetch(`${API_URL}pools/history/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
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
  }, [fetchMobileChargeHistory]);
  return { data, loading, error };
};

export const checkUser = (companyId, email) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}auth/exists/${companyId}/${email}`, {
      method: "GET",
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
export const usePool = (company) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsePool = useCallback(() => {
    setLoading(true);

    // Form the endpoint URL with company parameter
    fetch(`${QA_URL}pools/?company=${company}`)
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
  }, [company]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchUsePool();

      const intervalId = setInterval(() => {
        fetchUsePool();
      }, 10000); // Regular interval of 10 seconds

      return () => {
        clearInterval(intervalId);
      };

    }, 0); // Initial delay of 3 seconds

    return () => {
      clearTimeout(timeoutId);
    };

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
          throw new Error("Network response was not ok");
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

export const startCharge = (equipo, pistola, corrienteMaxima, user_id) => {
  return new Promise((resolve, reject) => {
    const dataToSend = {
      equipo: equipo,
      pistola: pistola,
      corrienteMaxima: corrienteMaxima,
      user_id: user_id,
    };

    fetch(`${API_URL}pools/commands/startCharge`, {
      method: "POST",
      body: JSON.stringify(dataToSend), // Convert object to JSON string
      headers: {
        "Content-Type": "application/json", // Use JSON content type
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status > 499) {
          throw new Error("Server error");
        }
        console.log("start response", response);
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
export const stopCharge = (equipo, pistola) => {
  return new Promise((resolve, reject) => {
    const dataToSend = {
      equipo: equipo,
      pistola: pistola,
    };

    fetch(`${API_URL}pools/commands/stopCharge`, {
      method: "POST",
      body: JSON.stringify(dataToSend), // Convert object to JSON string
      headers: {
        "Content-Type": "application/json", // Use JSON content type
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status > 499) {
          throw new Error("Server error");
        }
        console.log("start response", response);
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

export const fetchPoolCurrent = ({ connector_id }) => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}pools/current/${connector_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Although typically unnecessary for GET, added for consistency
        Authorization: `Bearer ${token}`,
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
