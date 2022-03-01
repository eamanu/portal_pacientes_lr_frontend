import axios from "axios";

export default async function institutionsServices(tokenUser) {
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${tokenUser}`,
    }
  });
  try {
    const result = await authAxios.get(`/institutions/all`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
}