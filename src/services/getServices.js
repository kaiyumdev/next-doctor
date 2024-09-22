import axios from "axios";

export const getServices = async () => {
  try {
    const res = await axios.get(
      `https://next-doctor-zcd4.vercel.app/services/api/get-all`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getServicesDetails = async (id) => {
  try {
    const res = await axios.get(
      `https://next-doctor-zcd4.vercel.app/services/api/${id}`
    );
    return res.data;
  } catch (error) {
    return {};
  }
};
