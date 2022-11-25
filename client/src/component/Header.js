import React,{ useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getList, listDelete } from '../redux/bookSlice';
import { Container, Row, Col } from 'react-bootstrap';
import Logo from './Logo';
import "../App.css"



export default function Header() {
const dispatch=useDispatch()


const navigate = useNavigate();
const [visib, setVisib] = useState(true)
const [search, setSearch] = useState("")
const onChange=(e)=>{ setSearch(e.target.value)}

useEffect(() => {
  window.location.pathname==="/form"&&setVisib(false)
  window.location.pathname==="/list"&&setVisib(true)
}, [])


return (
  <Container>
  <Row >

    <Col xs="10" className='col-md-2 col-lg-2 col-sm-4'>
      <Logo/> 
    </Col>

    <Col xs="12" lg={{span: 7, offset: 1 }}   className='col-md-8 col-sm-9 align-items-center mt-3' style={{display:visib?"block":"none"}}>  
        <div  id='search'>
            <input onChange={onChange} value={search}  placeholder='Search'/>
            <button type="button" onClick={()=>{
              if(search!==""){dispatch(getList({"keyword":search})); search!=="" && navigate("/list")}
              else{dispatch(listDelete())}}}>
              Search 
            </button>
        </div>
    </Col>

    <Col  xs="10" style={{display:!visib?"block":"none"}} className="mt-3 col-lg-8 col-md-4 col-sm-4">
        <button id='returnPage' onClick={()=>{navigate("/");setVisib(true)} }>
          <span>Return to List Page</span>
        </button>
    </Col>

    <Col  xs="4" style={{display:visib?"block":"none"}} className="col-lg-2 col-md-2 col-sm-3 mt-3">
      <button type="button" id='addNewButton' onClick={()=>{navigate("/form");setVisib(false);setSearch("")} } >
          Add new record
      </button>

      
    </Col>

  </Row>      
</Container>

)}
