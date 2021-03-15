import React from 'react';
import {Row,Col} from 'reactstrap'
const Thankyou =_=>{
    return(
        <div><Row noGutters className="text-center">
            <Col>
            <p className="thanks-header">Thank you</p>
            <i className="fas fa-pizza-slice thank-you-pizza"></i>
            <p className="subtext">
                You should receive an email with your reservation!
            </p>
            </Col>
            </Row></div>
    )
}
export default Thankyou