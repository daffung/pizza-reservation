import React from 'react';
import {Row,Col} from 'reactstrap'

const Main =props=>{
    return(
    <div className="image-background">
    <Row noGutters className="text-center align-items-center pizza-cta">
        <Col>
        <p className="looking-for-pizza">
            If you are looking for a great pizza
            <i className="fas fa-pizza-slice pizza-slice"></i>
        </p>
        <button className="book-table-btn " onClick={_=>{props.setPage(1)}}>Click here</button>
        </Col>
     </Row>
     <Row noGutters className="text-center big-img-container">
         <Col>
            <img src='/images/pizza.jpg'
            alt ='cafe'
            className='big-img'/>
         </Col>
     </Row>
        </div>
    )
}
export default Main