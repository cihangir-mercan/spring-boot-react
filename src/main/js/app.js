'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {todos: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/todos'}).done(response => {
			this.setState({todos: response.entity._embedded.todos});
		});
	}

	render() {
		return (
			<div>
				<TodoList todos={this.state.todos}/>	
				<h2>REST: /api/todos</h2>
			</div>
		)
	}
}
// end::app[]

// tag::todo-list[]
class TodoList extends React.Component{
	render() {
		var todos = this.props.todos.map(todo =>
			<Todo key={todo._links.self.href} todo={todo}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>Description</th>
						<th>End Date</th>
						<th>Is Completed?</th>
					</tr>
					{todos}
				</tbody>
			</table>
		)
	}
}
// end::todo-list[]

// tag::todo[]
class Todo extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.todo.description}</td>
				<td>{this.props.todo.endDate}</td>
				<td>{this.props.todo.isCompleted}</td>
			</tr>		
		)
	}
}
// end::todo[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]
