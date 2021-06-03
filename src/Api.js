/* eslint-disable class-methods-use-this */
import axios from 'axios';

class Api {
  constructor(url) {
    this.url = url;
  }

  getNotes() {
    return axios.get(`${this.url}/notes`);
  }

  postNotes(data) {
    return axios.post(`${this.url}/notes`, data);
  }

  putNotes(id, data) {
    return axios.put(`${this.url}/notes/${id}`, data);
  }

  deleteNotes(id) {
    return axios.delete(`${this.url}/notes/${id}`);
  }

  getPeople() {
    return axios.get(`${this.url}/people`);
  }
}

export default Api;
