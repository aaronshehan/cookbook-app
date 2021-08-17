import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Form} from 'react-bootstrap';
import FileBase64 from 'react-file-base64';
import DatabaseDriver from '../../database/DatabaseDriver';
import RecipePage from '../Recipe/Recipe';
import { Multiselect } from 'multiselect-react-dropdown';
import { Redirect } from 'react-router-dom';
import './Create.css'

const tag = [
    {value: 'pizza'},
    {value: 'pasta'},
    {value: 'soup'},
    {value: 'chicken'},
    {value: 'thai'},
    {value: 'mongolian'},
    {value: 'indian'},
    {value: 'spicy'},
    {value: 'sweet'},
    {value: 'sour'},
];

class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description:'',
            ingredients:'',
            directions:'',
            time:'',
            image: null,   
            tags:[],
            rating: 0,
            ratings: {
                googleId: [],
                rating: []
            }
        };
        this.onSelect = this.onSelect.bind(this);
    }
    
    onImageUpload(uploadResult) {
        this.setState({
            image: uploadResult.base64
        })
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };

    sendData = (e) => {
        DatabaseDriver.addRecipe(this.props.user.googleId, {
            'name': this.state.name,
            'description':this.state.description,
            'ingredients': this.state.ingredients,
            'directions': this.state.directions,
            'time': this.state.time,
            'tags':this.state.tags,
            'author': this.props.user.name,
            'image': this.state.image,
            'rating': this.state.rating,
            'ratings': this.state.ratings
        })
        alert("success");

        // let str = this.state.name.replace(/\s+/g, '-').toLowerCase();
        // <Route path="/recipe/check">
        //     <RecipePage/>
        // </Route>
    }

    Alertf = (e)=>{
        if( e === true){
            alert('Created')
        }
        else
        alert('fail')
    }


    onRemove = (e) => {
        // console.log(e)
    }
    
    onSelect = (e) => {
        const newArr=[];
        for(var i =0; i<e.length; i++){
            newArr.push(e[i].value);
        }
        this.setState({tags: newArr})
    }

    render() {
        return (
            <div>
                {this.props.user ?
                    <div className="d-flex justify-content-center">
                        <Form onSubmit={this.sendData} className="m-3 text-center card bg-dark p-3">
                            <h1>
                            <Form.Label>Create Recipe</Form.Label>
                            </h1>
                            <Form.Group>
                                <div style={{width: '20em'}}>
                                    <Form.Control required type ="text" name="name" value={this.state.title} onChange={this.handleChange} placeholder="Title"/>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div style={{width: '30em'}}>
                                    <Form.Control required as="textarea" name="description" value={this.state.description} onChange={this.handleChange} rows={3} placeholder="A little about your recipe"/>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div style={{width: '30em'}}>
                                    <Form.Control required as="textarea" name="ingredients" value={this.state.ingredients} onChange={this.handleChange} rows={3} placeholder="Ingredients"/>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div style={{width: '30em'}}>
                                    <Form.Control required as="textarea" name="directions" value={this.state.directions}onChange={this.handleChange} rows={5} placeholder="Directions"/>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div style={{width: '15em'}}>
                                    <Form.Control required name="time"  value={this.state.time} onChange={this.handleChange} placeholder="Time Taken"/>
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div className="text-dark bg-light" style={{width: '25em'}}>
                                    <Multiselect
                                        name="tags"
                                        selectionLimit ='3'
                                        placeholder="Tags"
                                        closeIcon="close"
                                        value={this.state.tags}
                                        displayValue="value" // Property name to display in the dropdown options
                                        options={tag} // Options to display in the dropdown
                                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                        onRemove={this.onRemove}
                                        onSelect={this.onSelect}
                                    />
                                </div>
                            </Form.Group>
                            <Form.Group>
                                <div style={{float: 'left'}}>
                                    <h style={{float: 'left'}}>Upload image of recipe</h><div></div>
                                    <FileBase64 required id="foodImg" label="Upload image of recipe" multiple={false} onDone={(f)=>this.onImageUpload(f)}/>
                                </div>
                            </Form.Group>
                            <input type ="submit" value = 'Create' className="bg-success" />
                        </Form>
                    </div>:
                    <Redirect to="/login"/>
                }
            </div>
            
        )
    }
}

//  Allow use of google profile information from redux
const mapStateToProps = (state) => ({
    user: state.usrReducer.user
})


export default connect(mapStateToProps)(Create);