import React, { Component } from "react";
import axios from "axios";
import './Style.css';
import {Card,Table,InputGroup,FormControl,Button,} from "react-bootstrap";
import {faList,faStepBackward,faFastBackward,faStepForward,faFastForward,faSearch,faTimes,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class ListeTaskExecution extends Component {
         
    constructor(props){
        super(props);
        this.state = {
          taskExecutions: [],
          search : '',
          currentPage : 1,
          taskExecutionsPerpage : 5,
          sortToggle : true
        };
    }
sortData = () => {
    this.setState(state => ({
        sortToggle : !state.sortToggle
    }));
    this.findAll(this.state.currentPage);
};
    componentDidMount() {
        this.findAll(this.state.currentPage);
      }
      findAll(currentPage) {
          currentPage -= 1;
        let sortDir = this.state.sortToggle ? "asc" : "desc";
          axios.get("http://localhost:8080/api/taskExecutions?pageNumber="+currentPage+"&pageSize="+this.state.taskExecutionsPerpage+"&sortBy=id&sortDir="+sortDir)
        .then(response => response.data)
        . then((data) =>{
        this.setState({ 
            taskExecutions: data.content,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            currentPage: data.number + 1
        });
    });
};
changePage = (event) => {
    let targetPage = parseInt(event.target.value);
    if(this.state.search){
        this.searchData(targetPage);
     } else {
      this.findAll(targetPage);
     }
      this.setState({
      [event.target.name]: targetPage,
    });
  };
firstPage = () => {
    let firstPage = 1 ;
    if (this.state.currentPage > firstPage) {
        if(this.state.search){
            this.searchData(firstPage);
         } else {
        this.findAll(firstPage);
    }}
  };

  prevPage = () => {
    let prevPage = 1 ;
    if (this.state.currentPage > prevPage) {
        if(this.state.search){
            this.searchData(this.state.currentPage - prevPage);
         } else {
        this.findAll(this.state.currentPage - prevPage);
    }}
  };

  lastPage = () => {
    let condition = Math.ceil(this.state.totalElements / this.state.taskExecutionsPerpage);
    if (
      this.state.currentPage < condition ) {
        if(this.state.search){
            this.searchData(condition);
         } else {
        this.findAll(condition);
    }}
  };

  nextPage = () => {
    if (this.state.currentPage < Math.ceil(this.state.totalElements / this.state.taskExecutionsPerpage) ) {
        if(this.state.search){
            this.searchData(this.state.currentPage + 1);
         } else {
        this.findAll(this.state.currentPage + 1);
    }
  }
};
  searchChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  cancelSearch = () => {
    this.setState({ search: "" });
    this.findAll(this.state.currentPage);
  };
  searchData = (currentPage) => {
    currentPage -= 1;
    axios.get("http://localhost:8080/rest/taskExecutions/search/"+this.state.search+"?page="+currentPage +"&size=" +
          this.state.taskExecutionsPerpage)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          taskExecutions: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
        });
    });
};
render () {
    const {taskExecutions, currentPage, totalPages,search} = this.state;
    return (
        <div>
            <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
              <div style={{"float" : "left"}}>
              <FontAwesomeIcon icon={faList} /> TaskExecution Liste
              </div>
              <div style={{ "float" : "right" }}>
              <InputGroup size="sm">
                <FormControl
                  placeholder="Search"
                  name="search"
                  value={search}
                  className={"info-border bg-dark text-white"}
                  onChange={this.searchChange}
                />
                <InputGroup.Append>
                  <Button
                    size="sm"
                    variant="outline-info"
                    type="button"
                    onClick={this.searchData}
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                 <Button
                    size="sm"
                    variant="outline-danger"
                    type="button"
                    onClick={this.cancelSearch}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </Button> 
                </InputGroup.Append>
              </InputGroup>
            </div>
              </Card.Header>
          <Card.Body>
            <Table bordered hover striped variant="dark">
                <thead>
                    <tr>
                  <th onClick={this.sortData}> TaskConfigName <div  className={this.state.sortToggle ? 
                           "arrow arrow-up" : "arrow arrow-down"} ></div></th>
                           <th onClick={this.sortData}> DurationInSeconds <div  className={this.state.sortToggle ? 
                           "arrow arrow-up" : "arrow arrow-down"} ></div></th>
                   <th onClick={this.sortData}> Status <div  className={this.state.sortToggle ? 
                           "arrow arrow-up" : "arrow arrow-down"} ></div></th>
                           <th onClick={this.sortData}> TransportedFiles <div  className={this.state.sortToggle ? 
                           "arrow arrow-up" : "arrow arrow-down"} ></div></th>
                  <th onClick={this.sortData}> Message <div  className={this.state.sortToggle ? 
                           "arrow arrow-up" : "arrow arrow-down"} ></div></th>
                 <th onClick={this.sortData}> EmailErrorSent <div  className={this.state.sortToggle ? 
                           "arrow arrow-up" : "arrow arrow-down"} ></div></th>
                 <th onClick={this.sortData}> StartDate <div  className={this.state.sortToggle ? 
                           "arrow arrow-up" : "arrow arrow-down"} ></div></th>
                 <th onClick={this.sortData}> EndDate <div  className={this.state.sortToggle ? 
                           "arrow arrow-up" : "arrow arrow-down"} ></div></th>
                 <th onClick={this.sortData}> InProgressCopyDetected <div  className={this.state.sortToggle ? 
                           "arrow arrow-up" : "arrow arrow-down"} ></div></th>
                 <th onClick={this.sortData}> NbrCheckInProgressCopy <div  className={this.state.sortToggle ? 
                           "arrow arrow-up" : "arrow arrow-down"} ></div></th>
                  </tr>
              </thead>
              <tbody>
                        {taskExecutions.length === 0 ?
                  <tr align="center">
                    <td colSpan="7"> TaskExecutions Available</td>
                  </tr> : 
               taskExecutions.map( 
                   (taskExecution) => (
                    <tr key= {taskExecution.id}>
                       <td>{taskExecution.taskConfigName}</td>
                      <td>{taskExecution.durationInSeconds}</td>
                      <td>{taskExecution.status}</td>
                      <td>{taskExecution.transportedFiles}</td>
                      <td>{taskExecution.message}</td>
                      <td>{taskExecution.emailErrorSent}</td>
                      <td>{taskExecution.startDate}</td>
                      <td>{taskExecution.endDate}</td>
                      <td>{taskExecution.inProgressCopyDetected}</td>
                      <td>{taskExecution.nbrCheckInProgressCopy}</td>
                      </tr>
               )
         )  }

       </tbody>
       </Table>
          </Card.Body>
           {taskExecutions.length > 0 ? (
              <Card.Footer>
                <div style={{ "float" : "left" }}>
                  Showing Page {currentPage} of {totalPages}
                </div>
                <div style={{ "float" : "right" }}>
                  <InputGroup size="sm">
                    <InputGroup.Prepend>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === 1 ? true : false}
                        onClick={this.firstPage}
                      >
                        <FontAwesomeIcon icon={faFastBackward} /> First
                      </Button>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === 1 ? true : false}
                        onClick={this.prevPage}
                      >
                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                      </Button>
                    </InputGroup.Prepend>
                    <FormControl
                      className={"page-num bg-dark"}
                      name="currentPage"
                      value={currentPage}
                      onChange={this.changePage}
                    />
                    <InputGroup.Append>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === totalPages ? true : false}
                        onClick={this.nextPage}
                      >
                        <FontAwesomeIcon icon={faStepForward} /> Next
                      </Button>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === totalPages ? true : false}
                        onClick={this.lastPage}
                      >
                        <FontAwesomeIcon icon={faFastForward} /> Last
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Card.Footer> 
              ) : null}              
          </Card>

      </div>

    );
  }
}
export default ListeTaskExecution;