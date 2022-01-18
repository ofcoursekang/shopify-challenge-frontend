import React, { Component } from 'react';

class HeaderComponent extends Component {
    constructor(props){
        super(props)

        this.state = {

        }
    }
    
    
    render() {
        return (
            <div>
                <header className='flex flex-vertical-center'>
                    <div className='navbar flex flex-horizontal-center navbar-dark bg-dark'>
                   
                        <a href = "/">  Furniture Item Tracking Management  </a>
                     
                    </div>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;