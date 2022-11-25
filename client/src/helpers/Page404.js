import { useNavigate } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';



export default function Page404() {

  const navigate = useNavigate();

  return (
    <Container className="page-404">
      <h1 className='title-404'>404</h1>
      <p className='fw-bold text-muted'>Seems there is nothing here</p>
      <Button variant="outline-primary" size='sm' className="align-self-center mx-auto mb-5" onClick={() => navigate(`/`)}>Back to Home</Button>
    </Container>
  )
}