
import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import $ from 'jquery';

class Search extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	data: '',
	    	loading: false,
	    	error: false
	    };
	    this.handleKeyPress = this.handleKeyPress.bind(this);
	    this.handleUserClick = this.handleUserClick.bind(this);
	}

	renderUser(user){
		return(
		    <div onClick={this.handleUserClick}>
	    		<img className="userpic img-circle" 
	    			 src={user.avatar_url}
	    			 alt="user_avatar" 
	    			 title="details?"
	    		/>
	    		<h4> {user.name} </h4>
	    		<h4> {user.email} </h4>
		    </div>
		);
	}

	handleKeyPress(e){
		if(e.key === 'Enter'){

			// if empty username provided
			if(e.target.value === ''){
				this.setState({
					error: true
			    });
			    // exits
			    return false;
			}

			// shows loading until api returns data
			this.setState({
				data: '',
				loading: true,
				error: false
			});

			let url = `https://api.github.com/users/${e.target.value}`
		    $.getJSON(url, json => {
			    this.setState({
			    	data: json,
			    	loading: false,
			    	error: false
			    });
			}).fail( () => {
    			this.setState({
    				data: '',
			    	loading: false,
			    	error: true
			    });
  			});
		}
	}

	handleUserClick(){
		const path = `/user/${this.state.data.login}`;
		// redirects to ~/user/:username and also passes api data
		browserHistory.push({
			pathname: path,
			state: this.state.data
		});
	}

	render() {

		let user = this.state.data;
		
		return (
			<div className="text-center">
				
				{ /* input box to enter username */ }
			    <input type="text" 
			    	className="form-control inputsearch" 
			    	onKeyPress={ this.handleKeyPress }
			    	placeholder="enter_github_username" autoFocus
			    />
			   
			    { /* if error occured */ }
			    {this.state.error &&
			     <p className="error">
			     	Username not found. 
			     	Check username.
			     </p>
			 	}

			    { /* if data is loading */ }
			    {this.state.loading &&
			     <p>
			     	LOADING...
			     </p>
				}
			    
			    { /* if user data present, renderUser */ }
			    {user!== '' && this.renderUser(user)}

			</div>
		);
	}
}


export default Search;