import { Component } from "react";

class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	componentDidCatch(error) {
		this.setState({ error });
		this.props.errorCallback();
	}

	render() {
		if (this.state.error) return null;
		return this.props.children;
	}
}

export default ErrorBoundary;
