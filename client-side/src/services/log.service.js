import axios from 'axios';

let API_URL = 'http://localhost:8765/api/log/service/';

class LogService {

  createLog(log) {
    return axios.post(API_URL + 'create', JSON.stringify(log),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  getSummaryOfCourse(courseId) {
    return axios.post(API_URL + 'summary', courseId,
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  getIpClient() {
    return axios.get('http://api.ipify.org?format=json');
  }

}

export default new LogService();
