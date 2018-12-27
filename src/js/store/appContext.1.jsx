import React from "react";
import getState from "./store.js";

export const Context = React.createContext(null);

const Store = PassedComponent => {
	class StoreWrapper extends React.Component {
		constructor(props) {
			super(props);
			this.state = getState(this);
		}

		componentDidMount() {
			fetch(
				"https://wordpress-alfredoc.c9users.io/wp-json/sample_api/v1/product/",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						username: "AlfredoC",
						password: "Kanon555"
					})
				}
			)
				.then(res => res.json())
				.then(data => {
					let store = this.state.store;
					store.productsWP = data;
					this.setState({ store });
					console.log("testing...", this.state.store.productsWP);
				})
				.catch(err => {
					alert(err);
				});
		}

		render() {
			return (
				<Context.Provider value={this.state}>
					<PassedComponent {...this.props} />
				</Context.Provider>
			);
		}
	}
	return StoreWrapper;
};

export default Store;
