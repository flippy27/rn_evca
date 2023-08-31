import CCS1 from "../components/icons/CCS1";
import CCS2 from "../components/icons/CCS2";
import GBT_DC from "../components/icons/GBT_DC";
import Tipo1 from "../components/icons/Tipo1";
import Tipo2 from "../components/icons/Tipo2";
import CHAdeMO from "../components/icons/CHAdeMO";
import { COMPANY, LANGUAGE } from "./global";

//COLORS

const COMPANY_COLORS = () => {
  let com_col;
  if (COMPANY == "2f9d6954-0b90-48c3-a659-62d19f5aa4a3") {
    com_col = {
      PRIMARY: "#375484",
      PRIMARY_DARK: "#1C355E",
      PRIMARY_DISABLED: "#1C355E80",

      SECONDARY: "#FFF",
      SECONDARY_DARK: "#1C355E10",
      SECONDARY_DISABLED: "#FFF",

      PRIMARY_DISABLED: "#1C355E10",

      COMPANY_LOGO: "dhemax",
    };
  } else if (COMPANY == "23ad7a11-0e23-40bc-be90-11ee80019d88") {
    com_col = {
      PRIMARY: "#FF5484",
      PRIMARY_DARK: "#FF355E",
      PRIMARY_DISABLED: "#FF355E80",

      SECONDARY: "#FFF",
      SECONDARY_DARK: "#FF355E10",
      SECONDARY_DISABLED: "#FFF",

      PRIMARY_DISABLED: "#FF355E10",

      COMPANY_LOGO: "copec",
    };
  } else if (COMPANY == "6dae7536-27c3-4c10-9a49-ff303e7d925f") {
    com_col = {
      PRIMARY: "#005484",
      PRIMARY_DARK: "#00355E",
      PRIMARY_DISABLED: "#00355E80",

      SECONDARY: "#FFF",
      SECONDARY_DARK: "#00355E10",
      SECONDARY_DISABLED: "#FFF",

      PRIMARY_DISABLED: "#00355E10",

      COMPANY_LOGO: "copec",
    };
  }
  return com_col;
};

export const Colors = {
  COMPANY: COMPANY_COLORS(),
  APP: {
    LIGHT_GRAY: "#F5F5F5",
    DARK_GRAY: "#393737",
    CARD_GRAY: "#C7C7C7",
    PLACEHOLDER_LIGHT_GRAY: "#BFBFBF",
    INPUT_BACKGROUND: "#E5E5E5",
  },
  PIN: {
    ALL_AVAILABLE: "#2EB85E",
    SOME_AVAILABLE: "#3DAAFA",
    NONE_AVAILABLE: "#FAA220",
    UNAVAILABLE: "#FA5852",
  },
};
export const texts = {
  COMPANY: {
    WELCOME: "Hola",
  },
};

export const Connector = ({ name }) => {
  if (name == "Tipo 1") {
    return <Tipo1 />;
  } else if (name == "Tipo 2" || name == "IEC Tipo 2") {
    return <Tipo2 />;
  } else if (name == "CCS1") {
    return <CCS1 />;
  } else if (name == "CCS2" || name == "CCS Combo 2") {
    return <CCS2 />;
  } else if (name == "GB/T_DC") {
    return <GBT_DC />;
  } else if (name == "CHAdeMO") {
    return <CHAdeMO />;
  }
};

export const tra = (view, text_id) => {
  const ln = LANGUAGE;
  const return_item = [
    {
      lang: "en",
      views: [
        {
          view: "welcome",
          data: [
            { text_id: "correo", text: "Enter your email" },
            { text_id: "placeholder", text: "hello@dhemax.com" },
            { text_id: "siguiente", text: "Next" },
            { text_id: "saltar", text: "Skip login" },
          ],
        },
        {
          view: "signin",
          data: [
            { text_id: "correo", text: "Enter your email" },
            { text_id: "contra1", text: "Enter your password" },
            { text_id: "contra2", text: "Confirm your password" },
            { text_id: "acepto1", text: "I agree with the" },
            { text_id: "acepto2", text: "terms and conditions" },
            { text_id: "siguiente", text: "Next" },
          ],
        },
        {
          view: "login",
          data: [
            { text_id: "correo", text: "Enter your email" },
            { text_id: "contra1", text: "Enter your password" },
            {
              text_id: "hemos",
              text: "We have detected that you are already registered",
            },
            { text_id: "porfavor", text: "Please enter your password" },
            { text_id: "siguiente", text: "Next" },
          ],
        },
        {
          view: "bottomtab",
          data: [
            { text_id: "historial", text: "Record" },
            { text_id: "mapa", text: "Map" },
            { text_id: "config", text: "Config." },
          ],
        },
        {
          view: "backbar",
          data: [
            { text_id: "agregar", text: "Add new card" },
            { text_id: "a", text: "at" },
            { text_id: "ubicacion", text: "from your location" },
          ],
        },
        {
          view: "map",
          data: [
            { text_id: "filtrar", text: "Filter available" },
            { text_id: "todos", text: "All" },
          ],
        },
        {
          view: "pool_det",
          data: [
            { text_id: "llegar", text: "How to get there" },
            { text_id: "disponible", text: "Available" },
            { text_id: "ocupado", text: "Busy" },
            { text_id: "nodisponible", text: "Unavailable" },
          ],
        },
        {
          view: "historial",
          data: [
            { text_id: "historial", text: "Record" },
            { text_id: "fecha", text: "MM/DD/YY" },
            { text_id: "tiempocarga", text: "Charge time" },
          ],
        },
        {
          view: "startcharge",
          data: [
            { text_id: "iniciar", text: "Start charge" },
            { text_id: "cargacurso", text: "Charge in progress" },
            { text_id: "min", text: "min" },
            { text_id: "detener", text: "Stop charge" },
            { text_id: "tiempocargando", text: "Time charging" },
            {
              text_id: "seguro",
              text: "Are you sure you want to stop the charge?",
            },
            { text_id: "si", text: "Yes" },
            { text_id: "no", text: "No" },
            { text_id: "finalizada", text: "Charge finalized!" },
            { text_id: "tiempocarga", text: "Charge time" },
            { text_id: "comprobante", text: "Close voucher" },
            {
              text_id: "infobox",
              text: "There was an error starting the charger",
            },
          ],
        },
        {
          view: "config",
          data: [
            { text_id: "titulo", text: "Configuration" },
            { text_id: "metodo", text: "Payment method" },
            { text_id: "cerrar", text: "Logout" },
          ],
        },
        {
          view: "metodopago",
          data: [
            { text_id: "titulo", text: "Payment method" },
            { text_id: "cambiar", text: "Change" },
            { text_id: "agregar", text: "Add new card" },
          ],
        },
        {
          view: "agregartarjeta",
          data: [
            { text_id: "titulo", text: "Add new card" },
            { text_id: "nombre", text: "Full name" },
            { text_id: "numero", text: "Card number" },
            { text_id: "fecha", text: "Card expiry date" },
            { text_id: "codigo", text: "Security code" },
            { text_id: "boton", text: "Add card" },
          ],
        },
        {
          view: "ayuda",
          data: [
            { text_id: "titulo", text: "States" },
            { text_id: "todos", text: "All" },
            { text_id: "algunos", text: "Some" },
            { text_id: "ninguno", text: "None" },
            { text_id: "fuera", text: "Service" },
            { text_id: "servicio", text: "unavailable" },
            { text_id: "disponibilidad", text: "Availability" },
            { text_id: "conectores", text: "Connectors" },
            { text_id: "estacion", text: "in station" },
            { text_id: "disponibles", text: "available" },
          ],
        },
      ],
    },
    {
      lang: "es",
      views: [
        {
          view: "welcome",
          data: [
            { text_id: "correo", text: "Ingresa tu correo" },
            { text_id: "placeholder", text: "hola@dhemax.com" },
            { text_id: "siguiente", text: "Siguiente" },
            { text_id: "saltar", text: "Saltar inicio de sesión" },
          ],
        },
        {
          view: "signin",
          data: [
            { text_id: "correo", text: "Enter your email" },
            { text_id: "contra1", text: "Ingresa tu contraseña" },
            { text_id: "contra2", text: "Confirma tu contraseña" },
            { text_id: "acepto1", text: "Acepto los" },
            { text_id: "acepto2", text: "términos y condiciones" },
            { text_id: "siguiente", text: "Siguiente" },
          ],
        },
        {
          view: "login",
          data: [
            { text_id: "correo", text: "Ingresa tu correo" },
            { text_id: "contra1", text: "Ingresa tu contraseña" },
            {
              text_id: "hemos",
              text: "Hemos detectado que ya estas registrado.",
            },
            { text_id: "porfavor", text: "Por favor ingresa tu contraseña" },
            { text_id: "siguiente", text: "Siguiente" },
          ],
        },
        {
          view: "bottomtab",
          data: [
            { text_id: "historial", text: "Historial" },
            { text_id: "mapa", text: "Mapa" },
            { text_id: "config", text: "Config." },
          ],
        },
        {
          view: "backbar",
          data: [
            { text_id: "agregar", text: "Agregar nueva tarjeta" },
            { text_id: "a", text: "a" },
            { text_id: "ubicacion", text: "de tu ubicación" },
          ],
        },
        {
          view: "map",
          data: [
            { text_id: "filtrar", text: "Filtrar disponibles" },
            { text_id: "todos", text: "Ver todos" },
          ],
        },
        {
          view: "pool_det",
          data: [
            { text_id: "llegar", text: "Cómo llegar" },
            { text_id: "disponible", text: "Disponible" },
            { text_id: "ocupado", text: "Ocupado" },
            { text_id: "nodisponible", text: "No disponible" },
          ],
        },
        {
          view: "historial",
          data: [
            { text_id: "historial", text: "Historial" },
            { text_id: "fecha", text: "DD/MM/YY" },
            { text_id: "tiempocarga", text: "Tiempo de carga" },
          ],
        },
        {
          view: "startcharge",
          data: [
            { text_id: "iniciar", text: "Iniciar carga" },
            { text_id: "cargacurso", text: "Carga en curso" },
            { text_id: "min", text: "min" },
            { text_id: "detener", text: "Detener carga" },
            { text_id: "tiempocargando", text: "Tiempo cargando" },
            { text_id: "seguro", text: "¿Estás seguro de detener la carga?" },
            { text_id: "si", text: "Si" },
            { text_id: "no", text: "No" },
            { text_id: "finalizada", text: "¡Carga finalizada!" },
            { text_id: "tiempocarga", text: "Tiempo de carga" },
            { text_id: "comprobante", text: "Cerrar comprobante" },
            {
              text_id: "infobox",
              text: "Hubo un error intentando iniciar carga",
            },
          ],
        },
        {
          view: "config",
          data: [
            { text_id: "titulo", text: "Configuración" },
            { text_id: "metodo", text: "Método de pago" },
            { text_id: "cerrar", text: "Cerrar sesión" },
          ],
        },
        {
          view: "metodopago",
          data: [
            { text_id: "titulo", text: "Método de pago" },
            { text_id: "cambiar", text: "Cambiar" },
            { text_id: "agregar", text: "Agregar nueva tarjeta" },
          ],
        },
        {
          view: "agregartarjeta",
          data: [
            { text_id: "titulo", text: "Agregar tarjeta nueva" },
            { text_id: "nombre", text: "Nombre completo" },
            { text_id: "numero", text: "Número de tarjeta" },
            { text_id: "fecha", text: "Fecha vencimiento" },
            { text_id: "codigo", text: "Código de seguridad" },
            { text_id: "boton", text: "Agregar tarjeta" },
          ],
        },
        {
          view: "ayuda",
          data: [
            { text_id: "titulo", text: "Estados" },
            { text_id: "todos", text: "Todos" },
            { text_id: "algunos", text: "Algunos" },
            { text_id: "ninguno", text: "Ninguno" },
            { text_id: "fuera", text: "Fuera de" },
            { text_id: "servicio", text: "Servicio" },
            { text_id: "disponibilidad", text: "Disponibilidad" },
            { text_id: "conectores", text: "Conectores" },
            { text_id: "estacion", text: "en la estación" },
            { text_id: "disponibles", text: "disponibles" },
          ],
        },
      ],
    },
  ];
  const ln_item = return_item.find((x) => {
    return x.lang == ln;
  });

  const cur_view = ln_item.views.find((x) => {
    return x.view == view;
  });

  const item = cur_view.data.find((x) => {
    return x.text_id == text_id;
  });
  if (!item) {
    return "FIXEAME " + cur_view + " " + text_id;
  }
  return item.text;
};
