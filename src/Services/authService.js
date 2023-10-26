import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebase-config";
import mockdata from "../data/mock-data.json";

// const email = localStorage.getItem("email");
const email = "alejandro_lo@santander.com.mx";

export const handleLogin = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("email", email);
  } catch (error) {
    console.error(error);
  }
};

const dataUser = mockdata.users.find(
  (user) => user.personal_info.email === email
);

export const getPersonalInfo = () => {
  if (dataUser) {
    return dataUser.personal_info;
  } else {
    console.log("El email no está en la base de datos");
  }
};

export const getCoursesData = () => {
  if (dataUser) {
    return dataUser.course_records;
  } else {
    console.log("El email no está en la base de datos");
  }
};

export const getLaborData = () => {
  if (dataUser) {
    return dataUser.labor_data;
  } else {
    console.log("El email no está en la base de datos");
  }
};

export const getSalaryData = () => {
  if (dataUser) {
    return dataUser.salary_compensation;
  } else {
    console.log("El email no está en la base de datos");
  }
};
