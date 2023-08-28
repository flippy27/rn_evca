import { useEffect, useState } from "react";
import { Colors } from "../configs/common";
import { fetchPoolCompany } from "../hooks/hooks"; // Replace with the path to your fetchPoolCompany function

export const usePinMaker = (company) => {
  const [pines, setPines] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetchPoolCompany({ company })
        .then((data) => {
          let newPines = [];
          if (!data) return;
          //chequeo que tenga latitudes y longitudes
          data = data.filter((x) => {
            return x.pool_latitude != 0 && x.pool_longitude != 0;
          });
          data.forEach((element) => {
            let color = "";
            let availableConnectors = 0;
            let unAvailableConnectors = 0;
            let amountOfConnectors = 0;

            element.stations.forEach((station) => {
              amountOfConnectors += station.connectors.length;

              station.connectors.forEach((connector) => {
                if (
                  ["Available", "SuspendedEV", "SuspendedEVSE"].includes(
                    connector.connector_status
                  )
                ) {
                  availableConnectors++;
                } else if (
                  ["Offline", "Faulted", "Unavailable"].includes(
                    connector.connector_status
                  )
                ) {
                  unAvailableConnectors++;
                }
              });
            });

            if (availableConnectors === amountOfConnectors) {
              color = Colors.PIN.ALL_AVAILABLE;
            } else if (unAvailableConnectors === amountOfConnectors) {
              color = Colors.PIN.UNAVAILABLE;
            } else if (
              availableConnectors > 0 &&
              availableConnectors !== amountOfConnectors
            ) {
              color = Colors.PIN.SOME_AVAILABLE;
            } else {
              color = Colors.PIN.NONE_AVAILABLE;
            }

            newPines.push({
              text: `${availableConnectors}/${amountOfConnectors}`,
              color,
              pool: element,
            });
          });

          setPines(newPines);
        })
        .catch((error) => {
          // Handle errors here if needed, for instance, you might want to log them
          console.error("There was an error:", error);
        });
    };

    fetchData(); // Call immediately

    const intervalId = setInterval(fetchData, 3000); // Call every 3 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on component unmount
    };
  }, [company]); // Make sure to re-run the effect if `company` changes

  return pines;
};
