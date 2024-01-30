import axios from "axios";

export default class PartService {
  getParts() {
    return axios.get("http://localhost:3001/api/part").then(res => res.data);
  }

  savePart(data) {
    return axios
      .post("http://localhost:3001/api/part", data, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(res => res.data);
  }

  updatePart(data, partId) {
    return axios
      .put(`http://localhost:3001/api/part/${partId}`, data, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(res => res.data);
  }

  deletePart(partId) {
    return axios
      .delete(`http://localhost:3001/api/part/${partId}`, {
        headers: { Authorization: localStorage.getItem("token") }
      })
      .then(res => res.data);
  }
}
