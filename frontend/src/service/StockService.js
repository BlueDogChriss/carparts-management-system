import axios from "axios";

export default class StockService {
  getStocks() {
    return axios.get("http://localhost:3001/api/stock").then(res => res.data);
  }

  saveStock(data) {
    return axios
      .post("http://localhost:3001/api/stock/add/part", data, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(res => res.data);
  }
}
