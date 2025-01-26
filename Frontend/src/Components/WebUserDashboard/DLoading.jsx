import Spinner from 'react-bootstrap/Spinner';

function DLoading() {
  return(
    <>
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
    <Spinner animation="grow" />
    </div>
    </>

  )
}

export default DLoading;