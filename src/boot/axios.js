import Vue from 'vue'
import axios from 'axios'

let APIUrl = 'http://127.0.0.1:8000';

Vue.prototype.$axios = axios.create({
  baseURL: APIUrl
});
