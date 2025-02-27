import api from "./api";

class UserService {
  async signIn(email, password) {
    return api.post("/signin", { email, password });
  }

  async list() {
    return api.get("/users");
  }

  async get(id) {
    return api.get(`/users/${id}`);
  }

  async create(data) {
    return api.post("/users", data);
  }

  async update(id, data) {
    return api.put(`/users/${id}`, data);
  }

  async delete(id) {
    return api.delete(`/users/${id}`);
  }
}

export default new UserService();
