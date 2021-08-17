import React, { Component } from 'react';
import { Card } from "react-bootstrap";
import {MdSave, MdChatBubbleOutline} from 'react-icons/md'
import StarRating from 'react-awesome-stars-rating';
import DatabaseDriver from '../database/DatabaseDriver'
import './card.css'

class CardComponent extends Component {
    constructor() {
        super();
        this.state = {
            changeStar: true,
            saved: false    // Keep the saved recipes in redux (get from back-end) and check if the current recipe_id matches one that is in the saved array. If it is, change the saved icon to blue and add it the recipe_id to database
        }

        this.handleChange = this.handleChange.bind(this)
        this.saveRecipe = this.saveRecipe.bind(this)
        this.unSaveRecipe = this.unSaveRecipe.bind(this)
    }

    async componentDidMount() {
        let savedRecipeIds = await DatabaseDriver.getUsersSavedRecipes(this.props.user.googleId)

        for (let i = 0; i < savedRecipeIds.length; i++) {
            if (savedRecipeIds[i] === this.props.recipe._id.$oid) {
                this.setState({ saved: true })
                break
            }
        }

        for (let i = 0; i < this.props.recipe.ratings.googleId.length; i++) {
            if (this.props.user.googleId === this.props.recipe.ratings.googleId[i]) {
                this.setState({ changeStar: false })
                break
            }
        }
    }

    handleChange = (value) => {
        if (this.state.changeStar) {
            this.setState({ changeStar: false })
            this.props.recipe.ratings.googleId.push(this.props.user.googleId)
            this.props.recipe.ratings.rating.push(value)

            DatabaseDriver.updateRecipe({
                'recipe_id': this.props.recipe._id.$oid,
                'ratings': {
                    'googleId': this.props.recipe.ratings.googleId,
                    'rating': this.props.recipe.ratings.rating
                }
            })
        }
    }

    saveRecipe() {
        this.setState({ saved: true })
        console.log("Saved recipe in database")
        DatabaseDriver.save(this.props.user.googleId, this.props.recipe._id.$oid)
    }

    unSaveRecipe() {
        this.setState({ saved: false })
        console.log("Unsaved recipe in database")
        DatabaseDriver.unsave(this.props.user.googleId, this.props.recipe._id.$oid)
    }

    render() {
        return (
            <Card className="m-3">
                <Card.Header className="p-0 text-center bg-secondary">
                    <h className="text-dark font-weight-bold h3">{this.props.recipe.name}</h>
                    <h className="p-2 float-top">
                        <StarRating 
                            size={20}
                            isHalf={false}
                            value={this.props.recipe.rating}
                            isEdit={this.state.changeStar}
                            onChange={this.handleChange}
                        />
                    </h>
                    {this.state.saved ?
                        <button
                            className="float-right"
                            style={{
                                color: 'blue',
                                backgroundColor: 'transparent',
                                borderColor: 'transparent'
                            }}
                            onClick={this.unSaveRecipe}
                        >
                            <MdSave size={32}/>
                        </button>: 
                        <button
                            className="float-right"
                            style={{
                                color: 'black',
                                backgroundColor: 'transparent',
                                borderColor: 'transparent'
                            }}
                            onClick={this.saveRecipe}
                        >
                            <MdSave size={32}/>
                        </button>
                    }
                </Card.Header>
                    <Card.Body class="table-primary">
                        <Card.Img class="card-img-left" src={this.props.recipe.image}/>
                        <Card.Text className="mt-2 text-dark">{this.props.recipe.description}</Card.Text>
                        <div class="d-flex justify-content-around text-dark">
                            <div class='one font-weight-bold'>Ingredients 
                                <div class="box font-weight-normal">
                                    {this.props.recipe.ingredients}
                                </div>
                            </div>
                            <div class='two font-weight-bold'>Info
                                <div class="box font-weight-normal">
                                    <b>Time Taken:</b> {this.props.recipe.time}
                                </div>
                            </div>
                            <div class='three font-weight-bold'>Directions
                                <div class="box font-weight-normal">
                                    {this.props.recipe.directions}
                                </div>
                            </div>
                        </div>
                        <a href="#" class="nav-link text-primary float-left"><MdChatBubbleOutline/>Comments</a>
                        <a href="#" class="btn btn-primary btn-sm float-right p-2" id="right-panel-link">Recipe Page</a>
                        {this.props.recipe.tags.map((item, index) => ( 
                            <a href="#" key={index} class= "float-right p-1" style={{ color: 'blue'}}>#{item}</a>
                        ))}
                </Card.Body>
                <Card.Footer class="p-0 bg-secondary">
                    <h class="text-light font-weight-bold">Made by:</h>
                    <a href="#" style={{paddingLeft: 8, color: 'blue'}}>{this.props.recipe.author}</a> 
                    <h class="text-dark font-weight-bold h5 float-right">Created: {this.props.recipe.date_added}</h>
                </Card.Footer>
            </Card>
        )
    }
}

export default CardComponent;