import React,{ useEffect, useState, useRef} from 'react'
import {Button, Overlay, Spinner, Container, Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { updateSort } from '../redux/bookSlice';
import Header from './Header';




export default function List() {

    const target = useRef(null);
    const dispatch = useDispatch();
    const {book} = useSelector((state) => state);

    const [show, setShow] = useState(false);
    const [pagination, setPagination] = useState("hidden");
    const [currentPage, setCurrentPage] = useState(1);

    const count = (num) => {setCurrentPage(currentPage+num)}
    const increment = () =>{if(currentPage<pageNumbers.length){setCurrentPage(currentPage+1)}}
    const decrease = () => {if(currentPage>1){setCurrentPage(currentPage-1)}}
    const pageNumbers = [];
    const indexOfLast = currentPage * 5;
    const indexOfFirst = indexOfLast - 5;
    const bookList = book.bookList?.slice(indexOfFirst, indexOfLast);
    for (let i = 1; i <= Math.ceil(book.bookList?.length / 5); i++) {pageNumbers.push(i);} 

    useEffect(() => {
        setCurrentPage(1);
        book.bookList?.length>5 ? setPagination("visible"):setPagination("hidden");
    },[book.bookList]); 
    

return (<>
<Header/>
<Container>

    <Row>
        <Col lg={{span: 5, offset: 3 }}>
            {book.isFetching &&  <Spinner animation="border" size="sm" variant="primary" style={{float:"left"}}/> }
            {book.bookList?.length===0 &&  <div className='serchMessage'>"sorry book not found!"</div>} 
        </Col>

        <Col lg={{ span: 2, offset: 1  }}>
            <div id='orderBy' style={{visibility:book.bookList?.length>=2 ? "visible" : "hidden" }}>

                <Button  id='orderByBtn' variant="" ref={target} onClick={() => setShow(!show)}> <span>Order By</span></Button>
    
                <Overlay target={target.current}   show={show} placement="bottom">
                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                    <div className='orderBy'{...props}>
                        <button onClick={()=>{dispatch(updateSort({"keyword":book.search,"sort":"ASC"})) ; setShow(!show)}}>Name ascending</button>
                        <button onClick={()=>{dispatch(updateSort({"keyword":book.search,"sort":"DESC"})); setShow(!show)}}>Name descending</button>
                    </div>)}
                </Overlay>

            </div>
        </Col>
    </Row>

    <Row>
        <Col lg={{span: 6, offset: 3 }} id='list'>
                <div id='listTable'>
                    <table>
                        {bookList?.map((item,i) => { return (
                        <thead key={i}>
                        <tr>
                        <td sm={6} id='book'>{item?.book.toUpperCase() } </td>
                        <td sm={2} id='category'> {item?.category?.category}</td>
                        </tr> 
                        <tr>
                        <td sm={6} id='author'> {item?.author}</td> 
                        <td sm={2} id='publisher'>{item?.publisher} </td>
                        </tr> 
                        </thead>
                        )})}
                    </table>
                </div>
        </Col>
    </Row>

    <Row>
        <Col lg={{ span: 6, offset: 3  }} className="align-items-center">
        <div className="pagination" style={{visibility:pagination}}>
                
                <button  onClick={decrease}><span >Previous</span></button>
            
                <button  onClick={()=>count(-2)} style={{display:currentPage-2> 0 && currentPage===pageNumbers.length ?"block":"none"}}>
                    <span >{currentPage-2}</span>
                </button>

                <button  onClick={()=>count(-1)} style={{display: currentPage-1 > 0 ? "block":"none"}}>
                    <span >{currentPage-1}</span>
                </button>

                <button  onClick={()=>count(0)} style={{backgroundColor:"#2a4d93"}}>
                    <span style={{backgroundColor:"#2a4d93", color:"white"}}>{currentPage}</span>
                </button>

                <button  onClick={()=>count(+1)} style={{display:currentPage+1<=pageNumbers.length?"block":"none"}}>
                    <span >{currentPage+1}</span>
                </button>

                <button  onClick={()=>count(+2)} style={{display:currentPage+2<=pageNumbers.length && currentPage===1?"block":"none"}}>
                    <span >{currentPage+2}</span>
                </button>

                <button  onClick={increment}><span>Next</span></button>
            
            </div>

        </Col>
    </Row>

</Container>
</>
)
}
