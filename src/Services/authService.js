import axios from 'axios';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";

let userId;
export const handleLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const currentAuth = auth.currentUser;
    userId = auth.currentUser.uid;
    localStorage.setItem("user-uid", currentAuth.uid);
    console.log("user en storage: ", localStorage.getItem("user-uid"));
  } catch (error) {
    console.error(error);
  }
};

console.log(userId);
const url = "https://mock-santander.glitch.me/";

export const logOut = () => {
  localStorage.clear();
};

export const getPersonalInfo = async () => {
  try {
    const res = await fetch(
      url + "personal_info/" + localStorage.getItem("user-uid"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourseRecords = async () => {
  try {
    const res = await fetch(
      url + "course_records/" + localStorage.getItem("user-uid"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLaborData = async () => {
  return fetch(url + "labor_data/" + localStorage.getItem("user-uid"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log("Error al cargar datos: " + error);
    });
};

export const getTimeOff = () => {
  return new Promise((resolve, reject) => {
    fetch(url + "time_off/" + localStorage.getItem("user-uid"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject("Error al cargar datos: " + error);
      });
  });
};

export const getSalaryCompensation = () => {
  return new Promise((resolve, reject) => {
    fetch(url + "salary_compensation/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject("Error al cargar datos: " + error);
      });
  });
};

export const updateTimeOff = (form) => {
  console.log(form);
  const api = url + "time_off/" + localStorage.getItem("user-uid")
  axios.put(api, form, {
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(response => {
      console.log('Datos enviados con éxito:', response.data);
      localStorage.removeItem("timeOffData")
      localStorage.setItem("timeOffData", JSON.stringify(response.data))
      console.log("así se ve el storage ", localStorage.getItem("timeOffData"));
    })
    .catch(error => {
      console.error('Error al enviar datos:', error);
    });
};

export const getHolidaysInfo = async (userId) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://mock-santander.glitch.me/time_off',
    headers: {}
  };

  return axios.request(config)
    .then((response) => {
      const holidayData = response.data
      console.log( holidayData.find(object => object.id === userId));
      return holidayData.find(object => object.id === userId)
    })
    .catch((error) => {
      console.log(error);
    });
}
