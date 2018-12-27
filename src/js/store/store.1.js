const getState = scope => {
	return {
		store: {
			totalcart: [],
			cart: [],
			products: [
				{
					code: "000001",
					category: "0",
					title: "Elite Type-C USB 3.1 Flash",
					description_short:
						"Get the most out of the Type-C port on your new computer or mobile device. Experience USB 3.1 SuperSpeed technology with transfer speeds up to 130MB/s.",
					description:
						"Get the most out of the Type-C port on your new computer or mobile device. Experience USB 3.1 SuperSpeed technology with transfer speeds up to 130MB/sec! It is ideal for for easily storing and quickly transferring all your large documents, high-resolution photos, HD videos, and other digital content. Not only does PNY's new Elite Type-C USB 3.1 Flash Drive offer the same ease-of-use and plug-and-play capabilities as previous generations of USB technologies, it is also compatible with the newest Type-C host devices on the market. PNY's Elite Type-C USB 3.1 Flash Drive is designed with convenience and portability in mind. Because there is no up or down orientation, the Type-C USB is easier to use than ever before. Best of all, it is compatible across different operating systems such as iOS, Android, Windows, and Google, making USB Type-C a truly universal connection. This Elite Type-C USB 3.1 Flash Drive is small in size, but big on performance!",
					inventory: 55,
					qty: 1,
					price: 129.99,
					images: [
						"/000001-1.png",
						"/000001-2.png",
						"/000001-3.png",
						"/000001-4.png",
						"/000001-5.png"
					],
					review: 5,
					other: ""
				}
			],
			productshome: [
				{
					title: "The best products",
					background: "white",
					initial: "white"
				}
			],
			authToken: "",
			validated: "",
			contact: [
				{
					dummy1: "super-E-store",
					dummy2: "Contact us",
					caddress: "627 SW 27th Ave",
					ccity: "Miami",
					cstate: "FL",
					czip: "33135",
					cphone1: "786-999-9999",
					cphone2: "305-888-8888"
				}
			],
			categories: [
				{
					code: 0,
					description: "Flash Drives"
				},
				{
					code: 1,
					description: "Flash Cards"
				},
				{
					code: 2,
					description: "Solid State Drives"
				},
				{
					code: 3,
					description: "DRAM Memory"
				}
			],
			tax: 7,
			shipping: 10
		},

		actions: {
			/* Find Product */

			addToCart: product => {
				let store = scope.state.store;
				store.cart.push({
					code: product.code,
					image: product.image1,
					title: product.title,
					qty: product.qty,
					price: product.price,
					subtotal: product.price * product.qty
				});

				var wkSubtotal = 0;
				for (var i = 0; i < store.cart.length; i++) {
					wkSubtotal = wkSubtotal + store.cart[i].subtotal;
				}

				var wkTax = (wkSubtotal * store.tax) / 100;

				store.totalcart = [];

				store.totalcart.push({
					subtotal: wkSubtotal.toFixed(2),
					tax: wkTax.toFixed(2),
					shipping: store.shipping.toFixed(2),
					grandtotal: (wkSubtotal + wkTax + store.shipping).toFixed(2)
				});

				scope.setState({ store });
				return;
			},

			addToCartOriginal: product => {
				let store = scope.state.store;
				store.cart.push({
					code: product.code,
					image: product.image1,
					title: product.title,
					description: product.description_short,
					qty: product.qty,
					price: product.price,
					subtotal: product.price * product.qty
				});
				scope.setState({ store });
				return;
			},

			getTotals: product => {
				let store = scope.state.store;
				let totals = [0, 0, 0, 0];
				let i = 0;
				for (i = 0; i < store.cart.length; i++) {
					totals[0] = totals[0] + store.cart.subtotal[i];
				}
				alert(totals[0]);
				totals[1] = 0;
				totals[2] = 0;
				totals[3] = totals[0] + totals[1] + totals[2] + totals[3];
				return totals;
			},

			getProductsByToken: tokenID => {
				let store = scope.state.store;
				let eventArray = store.products.filter(item => {
					let postitle = item.title
						.toUpperCase()
						.indexOf(tokenID.toUpperCase());

					let poscode = item.code.indexOf(tokenID);

					if (postitle !== -1 || poscode !== -1) {
						return item;
					}
				});

				return eventArray;
			},

			getProducts: categoryID => {
				let store = scope.state.store;
				let eventArray = store.products.filter(item => {
					if (item.category == categoryID) {
						return item;
					}
				});

				return eventArray;
			},

			getCart: productID => {
				let store = scope.state.store;
				let tempcode = store.cart.filter(item => {
					if (item.code !== "") {
						return item;
					}
				});
				return tempcode;
			},

			getDetails: productID => {
				let store = scope.state.store;
				let tempcode = store.products.filter(item => {
					if (item.code == productID) {
						return item;
					}
				});
				return tempcode;
			},

			getCategoryDescription: categoryCode => {
				let store = scope.state.store;
				let eventArray = store.categories.filter(item => {
					if (item.code == categoryCode) {
						return item;
					}
				});

				return eventArray;
			},

			findProduct: productID => {
				let store = scope.state.store;
				if (store.products !== []) {
					let product = store.products.filter((item, index) => {
						if (item.code === productID) {
							return item;
						}
					});

					if (product[0] !== undefined) {
						return product[0].title, product[0].description;
					}
				}
			}
		}
	};
};

export default getState;
