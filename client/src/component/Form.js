import React,{useState,useEffect} from 'react'
import { Form,Button,Modal,Placeholder,Container,Row,Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getSelect, messageDelete, postNewRecord } from '../redux/bookSlice';
import Header from './Header';


export default function AddForm() {

const dispatch=useDispatch();
const {book} = useSelector((state) => state);

const initialstate={book:"",category:"",author:"",publisher:""};
const [record, setRecord] = useState(initialstate);

const onChange=(e)=>{setRecord({...record,[e.target.name]: e.target.value})}

const OnClick=(e)=>{
    e.preventDefault()
    dispatch(postNewRecord(record));
    setRecord(initialstate);
    setTimeout(() => dispatch(messageDelete()),5000 );
};

const [show, setShow] = useState(false);
const [modalName, setModalName] = useState("");
const [modalValue, setModalValue] = useState("");

const handleModal = (par) =>{ setShow(true); setModalName(par)};
const handleSave = () =>{ setShow(false);setRecord({...record,[modalName]:modalValue}) }
const onChangeModal = (e) =>{setModalValue(e.target.value) };

useEffect(() => {dispatch(getSelect())}, [])
useEffect(() => {}, [book.message])



return (
    <>
    <Header/>

    <Container id='form'>

        <Row>
            <Col  md="10" sm="10" xs="10" lg={{span: 5, offset: 2 }}>

                <Form  onSubmit={OnClick}>
                <table>
                    <tbody>

                        <tr>
                            <td colSpan={2}>
                                <Form.Label  htmlFor="book">Book</Form.Label>
                            </td> 
                        </tr>

                        <tr>
                            <td>
                                <Form.Control required type="text" placeholder="Book name" value={record.book} id='book' name='book'  onChange={onChange}/>
                            </td>
                        </tr>



                        <tr> 
                            <td colSpan={2}>
                                <Form.Label htmlFor="category">Category</Form.Label>
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Form.Select  required size="sm" id='category' name='category'  onChange={onChange}  value={record.category}>
                                <option >{record.category}</option>
                                {
                                book.selectList!==""  && book.selectList.Category?.map((item,i)=>item!=="" &&<option key={i}>{item}</option>)
                                }
                                </Form.Select>  
                            </td> 
                            <td className="d-flex align-items-end flex-column">
                                <Button className="p-0 ps-2 pe-2" onClick={()=>handleModal("category")} >...</Button>
                            </td>
                        </tr>
                            
                            
                            
                        <tr>
                            <td colSpan={2}> 
                                <Form.Label htmlFor="Author">Author</Form.Label>
                            </td> 
                        </tr>
                            
                        <tr>
                            <td> 
                                <Form.Select required size="sm" id='Author' name='author'  onChange={onChange} value={record.author}>
                                <option >{record.author}</option>
                                {
                                book.selectList!==""  && book.selectList.Author?.map((item,i)=>item!=="" &&<option key={i}>{item}</option>)
                                }
                                </Form.Select>  
                            </td>
                            <td className="d-flex align-items-end flex-column">
                                <Button className="p-0 ps-2 pe-2" onClick={()=>handleModal("author")}>...</Button>
                            </td>
                        </tr>
                            
                            
                            
                        <tr>
                            <td colSpan={2}> 
                                <Form.Label htmlFor="publisher">Publisher</Form.Label>
                            </td>
                        </tr>
                            
                        <tr>
                            <td> 
                                <Form.Select required size="sm" id='publisher' name='publisher'  onChange={onChange} value={record.publisher}  >
                                <option >{record.publisher}</option>
                                {
                                book.selectList!==""  && book.selectList.Publisher?.map((item,i)=>item!=="" &&<option key={i}>{item}</option>)
                                }
                                </Form.Select>
                            </td>
                            <td className="d-flex align-items-end flex-column">
                                <Button className="p-0 ps-2 pe-2" onClick={()=>handleModal("publisher")}>...</Button>
                            </td>
                        </tr>
                            
                            
                            
                        <tr>
                            <td colSpan={2}>
                                <Button className='mt-3 p-0 addButton' type='submit' >
                                    {
                                    book.isFetching ? 
                                    <Placeholder  xs={12}  bg="primary" > <span>Add</span> </Placeholder> :
                                    <div><span>Add</span></div> 
                                    } 
                                </Button>
                            </td> 
                        </tr>
                                
                        <tr>
                            <td colSpan={2}>
                                {
                                book.message!=="" && <div className='AddMessage' style={{backgroundColor: book.loading?"#66CC99":"#CC3300"}}>
                                <span>{book.message}</span></div>
                                }
                            </td> 
                        </tr>
                            
                            
                    </tbody>
                </table>
                </Form>

            </Col>
        </Row>
                            
        <Modal show={show} onHide={ ()=>{setShow(false)}} >
            <Modal.Header closeButton><Modal.Title>Enter {modalName} Name</Modal.Title></Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" ><Form.Control type="text" autoFocus onChange={onChangeModal}/></Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setShow(false)}}>Close</Button>
                <Button variant="primary" onClick={()=>handleSave(modalName)} >Save</Button>
            </Modal.Footer>
        </Modal>

    </Container>
</>
)
}
