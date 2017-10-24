import React from 'react'
import { Component } from 'react'
import { Navbar } from 'react-bootstrap'

class Navigation extends Component{
    render(){
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Readable</a>
                    </Navbar.Brand>   
                    <Navbar.Toggle /> 
                </Navbar.Header>
            </Navbar>
        )
    }
}

export default Navigation