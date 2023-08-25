import { useEffect, useState } from "react";
import { Colors } from "../configs/common";
import { usePool } from "../hooks/hooks";

export const usePinMaker = (company) => {
  const [pines, setPines] = useState([]);
  const { data } = usePool(company);

  useEffect(() => {
    let newPines = [];

    if (!data) return;

    data.forEach(element => {
      let color = '';
      let availableConnectors = 0;
      let unAvailableConnectors = 0;
      let amountOfConnectors = 0;

      element.stations.forEach(station => {
        amountOfConnectors += station.connectors.length;

        station.connectors.forEach(connector => {
          if (["Available", "SuspendedEV", "SuspendedEVSE"].includes(connector.connector_status)) {
            availableConnectors++;
          } else if (["Offline", "Faulted", "Unavailable"].includes(connector.connector_status)) {
            unAvailableConnectors++;
          }
        });
      });

      if (availableConnectors === amountOfConnectors) {
        color = Colors.PIN.ALL_AVAILABLE;
      } else if (unAvailableConnectors === amountOfConnectors) {
        color = Colors.PIN.UNAVAILABLE;
      } else if (availableConnectors > 0 && availableConnectors !== amountOfConnectors) {
        color = Colors.PIN.SOME_AVAILABLE;
      } else {
        color = Colors.PIN.NONE_AVAILABLE;
      }

      newPines.push({
        text: `${availableConnectors}/${amountOfConnectors}`,
        color,
        pool: element
      });
    });

    setPines(newPines);
  }, [data]);

  return pines;
};