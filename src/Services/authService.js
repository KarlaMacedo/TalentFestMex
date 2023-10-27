import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase-config";

let userId
export const handleLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    const currentAuth = auth.currentUser;
    userId = auth.currentUser.uid
    localStorage.setItem("user-uid", currentAuth.uid);
    console.log("user en storage: ", localStorage.getItem("user-uid"));
  } catch (error) {
    console.error(error);
  }
};

console.log(userId);
const url = "https://mock-santander.glitch.me/"

export const logOut = () => {
  localStorage.clear();
}

/* 
 * Como alternativa, esta es la función que deben colocar en cada componente para manejar la promesa y evitar errores,
    los datos cambian según sea lo que necesiten, pero todo viene explicado en donde se necesita * 

  const getData = () => {
    return new Promise((resolve, reject) => {
      * aquí va la función get del servicio (como getPersonalInfo) *
        .then((data) => {
          * Aquí va la función en donde quieran aplicar la data, y lleva esa data como parámetro
          por ejemplo, si la función se llama showEmail, se vería así: showEmail(data) *
          resolve (data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
*/

export const getPersonalInfo = async () => {
  try {
    const res = await fetch(url + "personal_info/" + localStorage.getItem('user-uid'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    return data
  } catch (error) {
    console.log(error);
  }
};

export const getCourseRecords = async () => {
    try {
    const res = await fetch(url + "course_records/" + localStorage.getItem('user-uid'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getLaborData = async () => {
    return fetch(url + "labor_data/" + localStorage.getItem('user-uid'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        return data
      })
      .catch(error => {
        console.log('Error al cargar datos: ' + error);
      });
};


export const getTimeOff = () => {
  return new Promise((resolve, reject) => {
    fetch(url + "time_off/" + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject('Error al cargar datos: ' + error);
      });
  });
};

export const getSalaryCompensation = () => {
  return new Promise((resolve, reject) => {
    fetch(url + "salary_compensation/" + userId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        reject('Error al cargar datos: ' + error);
      });
  });
};
