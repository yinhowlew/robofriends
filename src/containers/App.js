import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
// import { robots } from './robots';
import './App.css';
import { setSearchField, requestRobots } from '../action'

// tell me what state i need to listen to and send down as prop
const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}  

// tell me what props i should listen to that are actions that need to get dispatched
const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}  // return an object
}  // similar to onSearchChange function originally


class App extends Component {
	// constructor() {
	// 	super()
	// 	this.state = {
	// 		robots: [],
	// 		// searchfield: ''
	// 	}
	// }

	componentDidMount() {
		this.props.onRequestRobots();
		// fetch('https://jsonplaceholder.typicode.com/users')
		// 	.then(response=> response.json())
		// 	.then(users => this.setState({ robots: users}));
	}

	// onSearchChange = (event) => {
	// 	this.setState({ searchfield: event.target.value })
	// }

	render() {
		// change this.state.searchfield to this.props.searchField? and destructure
		// const { robots } = this.state;
		const { searchField, onSearchChange, robots, isPending } = this.props;

		const filteredRobots = robots.filter(robot => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		if (isPending === true) {
			return <h1>Loading</h1>
		} else {
			return (
				<div className='tc'>
					<h1 className='f1'>RoboFriends</h1>
					<SearchBox searchChange={onSearchChange}/>
					<Scroll>
						<ErrorBoundary>
							<CardList robots={filteredRobots}/>
						</ErrorBoundary>
					</Scroll>
				</div>
			);		
		}
	}
}
// connect is gonna run the 2 functions and pass down prop to App
export default connect(mapStateToProps, mapDispatchToProps)(App);

