
import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
	
	render() {
		return (

			<div>

				<Link to={`${process.env.PUBLIC_URL}/`}>
					<h3 className="apptitle"> Github Api SPA </h3>
				</Link>

				{this.props.children}

			</div>

		);
	}
}


export default App;