import { useEffect, useState } from "react";
import { Colors } from "../configs/common";
import { fetchPoolCompany } from "../hooks/hooks";

export const usePinMaker = (company) => {
  const [pines, setPines] = useState([]);

  const mergePines = (oldPines, newData) => {
    return oldPines.map(oldPin => {
      const newPinData = newData.find(np => np.pool.id === oldPin.pool.id);
      if (newPinData) {
        oldPin.pool.stations.forEach((station, index) => {
          station.connectors = newPinData.pool.stations[index].connectors;
        });
      }
      return oldPin;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPoolCompany({ company });

        if (!data) return;

        const newPines = data
          .filter((x) => x.pool_latitude !== 0 && x.pool_longitude !== 0)
          .sort((a, b) => a.id - b.id)
          .map(processPinData);

        if (pines.length === 0) {
          setPines(newPines);
        } else {
          setPines(prevPines => mergePines(prevPines, newPines));
        }
      } catch (error) {
        console.error("There was an error:", error);
      }
    };

    const processPinData = (element) => {
      let availableConnectors = 0;
      let unAvailableConnectors = 0;
      let amountOfConnectors = 0;

      element.stations.forEach((station) => {
        amountOfConnectors += station.connectors.length;

        station.connectors.forEach((connector) => {
          if (["Available", "SuspendedEV", "SuspendedEVSE"].includes(connector.connector_status)) {
            availableConnectors++;
          } else if (["Offline", "Faulted", "Unavailable"].includes(connector.connector_status)) {
            unAvailableConnectors++;
          }
        });
      });

      let color;
      if (availableConnectors === amountOfConnectors) {
        color = Colors.PIN.ALL_AVAILABLE;
      } else if (unAvailableConnectors === amountOfConnectors) {
        color = Colors.PIN.UNAVAILABLE;
      } else if (availableConnectors > 0 && availableConnectors !== amountOfConnectors) {
        color = Colors.PIN.SOME_AVAILABLE;
      } else {
        color = Colors.PIN.NONE_AVAILABLE;
      }

      return {
        text: `${availableConnectors}/${amountOfConnectors}`,
        color,
        pool: element,
      };
    };

    fetchData(); // Call the function immediately
    const intervalId = setInterval(fetchData, 3000); // Repeat every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount

  }, [company]);

  return pines;
};