import React, { Component } from 'react';

class NewUser extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit}>
                    <input
                        type="text"
                        user="newUser"
                        value={this.props.value}
                        onChange={this.props.handleChange}
                        placeholder="New User"
                        autoFocus
                        autoComplete='off'
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        )
    }
}

export default NewUser;