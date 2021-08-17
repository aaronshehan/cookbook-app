import React, { Component } from 'react';
import DatabaseDriver from '../../database/DatabaseDriver';
import ReactList from 'react-list';
import CardComponent from'../../components/card';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './Discover.css';

class Discover extends Component {
    constructor() {
        super();
        this.state = {
            recipes: [],
            user: null
        }

        this.getRecipes = this.getRecipes.bind(this);
        this.renderItem = this.renderItem.bind(this);
    }

    componentDidMount() {
        if (this.state.user !== this.props.user) {
            this.setState({ user: this.props.user }, () => {
                this.getRecipes();
            }) 
        }
    }

    async getRecipes() {
        const data = await DatabaseDriver.getNRandomRecipes(this.state.user.googleId, 10);    // Gets recipes from a user
        this.setState({ recipes: data })
    }

    renderItem(index, key) {
        return (
            <div key={key}>
                <CardComponent 
                    recipe={this.state.recipes[index]}
                    user={this.state.user}
                />                 
            </div>
        )
    }

    render() {
        console.log(localStorage.getItem('loggedIn'))
        return (
            <div>
                {this.props.user ?
                    <div className="list">
                        <ReactList
                            itemRenderer={this.renderItem}
                            length={this.state.recipes.length}
                            type='uniform'
                        />
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

export default connect(mapStateToProps)(Discover);