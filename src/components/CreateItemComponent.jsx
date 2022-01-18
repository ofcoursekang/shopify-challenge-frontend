import React, { Component } from 'react';
import ItemService from '../services/ItemService';
import {Button, Card} from 'react-bootstrap';
import {faSave, faSlash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class CreateItemComponent extends Component {
    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            category: '',
            color: '',
            material: '',
            counts: '',
            price: '',
            provider: ''
        }

        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.changeColorHandler = this.changeColorHandler.bind(this);
        this.changeMaterialHandler = this.changeMaterialHandler.bind(this);
        this.changeCountsHandler = this.changeCountsHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.changeProviderHandler = this.changeProviderHandler.bind(this);


        this.saveOrUpdateItem = this.saveOrUpdateItem.bind(this);

    }

    componentDidMount(){

        if(this.state.id === 'add'){
            return
        }else{
            ItemService.getItemById(this.state.id).then((res) => {
                let item = res.data;
                this.setState({category: item.category, color: item.color, material: item.material, 
                    counts: item.counts, price: item.price, provider: item.provider});
            });
        }
        
    }

    changeCategoryHandler= (event) => {
        this.setState({category: event.target.value});
    }
    changeColorHandler= (event) => {
        this.setState({color: event.target.value});
    }
    changeMaterialHandler= (event) => {
        this.setState({material: event.target.value});
    }
    changeCountsHandler= (event) => {
        this.setState({counts: event.target.value});
    }
    changePriceHandler= (event) => {
        this.setState({price: event.target.value});
    }
    changeProviderHandler= (event) => {
        this.setState({provider: event.target.value});
    }


    
    cancel(){
        this.props.history.push('/items');
    }

   
    saveOrUpdateItem = (e) =>{
        e.preventDefault();
        let item = {category: this.state.category, color: this.state.color, material: this.state.material, 
        counts: this.state.counts, price: this.state.price, provider: this.state.provider};
        console.log('item => ' + JSON.stringify(item));


        if(this.state.id === 'add'){
            ItemService.createItem(item).then(res => {
                this.props.history.push('/items');
            });
        }else{
            ItemService.updateItem(item, this.state.id).then( res => {
                this.props.history.push('/items');
            });
        }
       
    }

    getTitle(){
        if(this.state.id === 'add'){
            return <h3 className='text-center'>Add Item</h3>
        }else{
            return <h3 className='text-center'>Update Item</h3>
        }
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-mid-3'>
                            {
                                this.getTitle()
                            }
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>Category :</label>
                                        <input placeholder='category' name='category' className='form-control'
                                            value={this.state.category} onChange={this.changeCategoryHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Color :</label>
                                        <input placeholder='color' name='color' className='form-control'
                                            value={this.state.color} onChange={this.changeColorHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Material :</label>
                                        <input placeholder='material' name='material' className='form-control'
                                            value={this.state.material} onChange={this.changeMaterialHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Counts :</label>
                                        <input placeholder='00' name='counts' className='form-control'
                                            value={this.state.counts} onChange={this.changeCountsHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Price $ :</label>
                                        <input placeholder='$ 0.00' name='price' className='form-control'
                                            value={this.state.price} onChange={this.changePriceHandler}/>
                                    </div>
                                    <div className='form-group'>
                                        <label>Provider :</label>
                                        <input placeholder='provider' name='provider' className='form-control'
                                            value={this.state.provider} onChange={this.changeProviderHandler}/>
                                    </div>
                                    <div style={{"float" : "right"}}>
                                        <Button onClick={this.saveOrUpdateItem} size='sm' variant='success' type='submit'>
                                                <FontAwesomeIcon icon={faSave} /> Save
                                        </Button>{' '}
                                        <Button onClick={this.cancel.bind(this)} size='sm' variant='info' type='button' className='btn btn-danger'>
                                                <FontAwesomeIcon icon={faSlash} /> Cancel
                                        </Button>
                                    </div>
                                </form>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateItemComponent;