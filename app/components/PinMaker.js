import { Colors } from "../configs/common";
import { fetchPoolData } from "../hooks/hooks";

export const pinMaker = (company) => {
  return fetchPoolData(company)
    .then(data => {
      let newPines = [];

      if (!data) return [];

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
      console.log(newPines,'before');
      return newPines;
    });
};