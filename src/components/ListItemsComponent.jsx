import React, { Component } from 'react';
import ItemService from '../services/ItemService';
import {InputGroup, FormControl, Button} from 'react-bootstrap';
import {faSearch, faTimes, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';



class ListItemsComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            items : [],
            search: ''
        }

        this.addItem = this.addItem.bind(this);
        this.editItem= this.editItem.bind(this);
        this.deleteItem= this.deleteItem.bind(this);
    }

    componentDidMount(){
        ItemService.getItems().then((res) => {
            this.setState({ items: res.data});
        });
    }

    addItem(){
        this.props.history.push('/add-items/add');
    }

    editItem(id){
        this.props.history.push(`/add-items/${id}`);
    }

    deleteItem(id){
        ItemService.deleteItem(id).then(res => {
            this.setState({items : this.state.items.filter(item => item.id !== id)});
        });
    }


    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    cancelSearch = () =>{
        this.setState({"search" : ''});

        ItemService.getItems().then((res) => {
            this.setState({ items: res.data});
        });
    }

    searchData = (event) => {
        ItemService.searchItem(this.state.search).then( res =>{
            this.setState({items: res.data});
        });
    }
    


    render() {
        const{search} = this.state;

        return (
            <div >
                
                <div style={{"float" : "left"}}>
                    <h2 className="text-center">Items List</h2>
                </div>
                <div >
                <InputGroup >
                    <FormControl placeholder='Filter: Material/ Category/ Color/ Provider' name='search' value={this.state.search} 
                    className='bg-white text-dark'
                    onChange={this.searchChange}/>
                   
                            <Button size='sm' variant='outline-info' type='button' onClick={this.searchData}>
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                            <Button size='sm' variant='outline-danger' type='button' onClick={this.cancelSearch}>
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>
                     
                </InputGroup>
                </div>
                
                    <div className="row">
                    <table className = "table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Color</th>
                                <th>Material</th>
                                <th>Counts</th>
                                <th>Price</th>
                                <th>Provider</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>

                        <tbody >
                            {
                                this.state.items.map(
                                    item =>
                                    <tr key = {item.id}>
                                        <td>{item.category}</td>
                                        <td>{item.color}</td>
                                        <td>{item.material}</td>
                                        <td>{item.counts}</td>
                                        <td>$ {item.price}</td>
                                        <td>{item.provider}</td>
                                        <td>
                                            <Button onClick={() => this.editItem(item.id)} size='sm' variant='outline-info' type='button'>
                                                <FontAwesomeIcon icon={faEdit}/>
                                            </Button>
                                            
                                        </td>
                                        <td>
                                            <Button onClick={() => this.deleteItem(item.id)} size='sm' className='btn btn-danger'>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <button className='btn btn-primary' onClick={this.addItem}> Add Item </button>
                    </div>
                

            </div>
        );
    }
}

export default ListItemsComponent;