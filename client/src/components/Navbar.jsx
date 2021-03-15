import React from 'react';
import {Navbar,NavbarBrand} from 'reactstrap'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>{
    return(
        <Navbar color='light' light expand="md">
            <NavbarBrand className='nav-brand' onClick={_=>{
                console.log('Clicked!')
                props.setPage(0)
            }}>Pizza Cabin</NavbarBrand>
            
        </Navbar>
        
        
    )
}
