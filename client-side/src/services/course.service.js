import axios from 'axios';

let API_URL = 'http://localhost:8765/api/course/service/';

class CourseService {

  createTransaction(transaction) {
    return axios.post(API_URL + 'enroll', JSON.stringify(transaction),
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  filterTransactions(userId) {
    return axios.post(API_URL + 'user', userId,
    {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  filterStudents(courseId) {
    return axios.post(API_URL + 'students', courseId,
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  allCourses() {
    return axios.post(API_URL,
    {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  popularCourses() {
    return axios.get(API_URL + 'popular',
  {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

  filterCourses(text) {
    return axios.post(API_URL + "filter", text,
    {headers: {"Content-Type":"application/json; charset=UTF-8"}});
  }

}

export default new CourseService();
