import axios from "axios";

export default class CarService {
  authenticate(data) {
    return axios
      .post("http://localhost:3001/api/user/login", data)
      .then(res => res.data);
  }
  register(data) {
    return axios
      .post("http://localhost:3001/api/user/register", data)
      .then(res => res.data);
  }
}
