
import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import $ from 'jquery';

class User extends Component {

	constructor(props){
		super(props);
		this.state = {
			repos: {}
		};
	}

	componentDidMount() {
		let url = `https://api.github.com/users/${this.props.params.username}/repos`
	    $.getJSON(url, json => {
		    this.setState({
		    	repos: json
		    });
		});
	}

	render() {

		// gets api data passes in Seach.js
		let data = this.props.location.state;

		// if repos data is present, generate repos list (in repositories var)
		if( !($.isEmptyObject(this.state.repos) )){
			var repositories = this.state.repos.map( (obj, index) =>
				<p key={index}> 
					<a target="_blank" 
					   href={obj.html_url}> {index+1}. {obj.name}</a> 
				</p>
			);
		}
		

		return (
			<div>

				<Collapsible trigger="Profile" open={true}>
					<img className="pic img-circle" 
						 src={data.avatar_url}
						 alt="user_avatar" 
					/>
			       <p>{data.name} , {data.location}</p>
			       <p>{data.email}</p>
			       <p>{data.bio}</p>
			       <p> 
				       	<a target="_blank" href={data.html_url}>
				       	Github Profile
				       	</a> 
			       </p>
			       <p> 
				       	<a target="_blank" href={data.blog}>
				       	{data.blog}
				       	</a>
			       </p>
			       <p>{data.followers} followers, {data.following} following</p>
			       <p>{data.public_repos} Repos</p>
			    </Collapsible>

			    <Collapsible trigger="List Repos">
			       { /* if repos data present render repos */ }
			       { !($.isEmptyObject(this.state.repos) ) && repositories }
			    </Collapsible>

			</div>
		);
	}
}


export default User;