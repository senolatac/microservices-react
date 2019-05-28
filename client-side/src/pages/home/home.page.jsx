import React from 'react';
import UserService from '../../services/user.service';
import CourseService from '../../services/course.service';
import {User} from '../../models/user';
import {Transaction} from '../../models/transaction';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      errorMessage: '',
      infoMessage: '',
      currentUser: new User(),
      searchText: ''
    };
  }

  componentDidMount(){
    UserService.currentUser.subscribe(data => {
      this.setState({
        currentUser: data
      });
    });

    this.searchAll();
  }

  searchAll(){
    this.setState({
      courses: {loading: true}
    });

    CourseService.allCourses().then(courses => {
      this.setState({courses: courses.data});
    });
  }

  searchPopular() {
    this.setState({
      courses: {loading: true}
    });

    CourseService.popularCourses().then(courses => {
      this.setState({courses: courses.data});
    });
  }

  handleChange(e) {
    var {name, value} = e.target;
    this.setState({searchText: value});
  }

  searchWithText() {
    this.setState({
      courses: {loading: true}
    });

    var text = this.state.searchText;

    CourseService.filterCourses(text).then(courses => {
      this.setState({courses: courses.data});
    });
  }

  enroll(course) {
    if(!this.state.currentUser){
      this.setState({errorMessage: "To enroll a course, you should sign in."});
      return;
    }

    var transaction = new Transaction(this.state.currentUser.id, course);
    CourseService.createTransaction(transaction).then(data => {
      this.setState({infoMessage: "You enrolled the course successfully."});
    }, error => {
      this.setState({errorMessage: "Unexpected error occurred."});
    });
  }

  detail(course) {
    localStorage.setItem('currentCourse', JSON.stringify(course));
    this.props.history.push('/detail/' + course.id);
  }

  render() {
    const {courses, infoMessage, errorMessage} = this.state;
    return (
      <div className="col-md-12">
        {infoMessage &&
          <div className="alert alert-success">
            <strong>Successfull! </strong> {infoMessage}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        {errorMessage &&
          <div className="alert alert-danger">
            <strong>Error! </strong> {errorMessage}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        }
        <div>
          <div className="input-group"  style={{marginTop: 5}}>

            <div className="input-group-prepend">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
              aria-haspopup="true" aria-expanded="false"  style={{height: 38}}>
                Filter
              </button>
              <div className="dropdown-menu">
                <a className="dropdown-item" onClick={() => this.searchPopular()}>Popular</a>
                <div role="separator" className="dropdown-divider"></div>
                <a className="dropdown-item" onClick={() => this.searchAll()}>All</a>
              </div>
            </div>

            <input type="text" className="form-control col-4"
            name="searchText" value={this.state.searchText}
            placeholder="Search courses..."
            aria-describedby="basic-addon1"
            onChange={(e)=>this.handleChange(e)}
            onKeyUp={() => this.searchWithText()}/>
            <div className="input-group-append">
              <button className="btn btn-secondary" style={{height: 38}} type="button" onClick={()=>this.searchWithText()}>Search</button>
            </div>

          </div>
        </div>

        {courses.loading && <em> Loading courses...</em>}
        {courses.length &&
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Course Title</th>
                <th scope="col">Author</th>
                <th scope="col">Detail</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) =>
                <tr key={course.id}>
                  <th scope="row">{index + 1}</th>
                  <td>{course.title}</td>
                  <td>{course.author}</td>
                  <td><button className="btn btn-info" onClick={()=>this.detail(course)}>Detail</button></td>
                  <td><button className="btn btn-success" onClick={()=>this.enroll(course)}>Enroll</button></td>
                </tr>
              )
              }
            </tbody>
          </table>
        }

      </div>
    );
  }

}
