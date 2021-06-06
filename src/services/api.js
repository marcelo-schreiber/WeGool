import axios from "axios";

const api = axios.create({
  baseURL: "https://redacao.cursopositivo.com.br/api",
});

export default api;
