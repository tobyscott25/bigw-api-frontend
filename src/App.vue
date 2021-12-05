<script>
import _ from 'lodash'
import axios from 'axios'

export default {
	data: function () {
		return {
			keycode: null,
			product_data: {
				name: '',
				assets: {
					images: [{
						sources: [{
							url: '',
						}]
					}]
				}
			}
		}
	},
	watch: {
		keycode: function (newQuestion, oldQuestion) {
			this.product_data = 'Typing...'
			this.debouncedGetProduct()
		}
	},
	created: function () {
		this.debouncedGetProduct = _.debounce(this.getProduct, 500)
	},
	methods: {
		getProduct: function () {
			this.product_data = 'Loading...'
			var vm = this
			axios.get(`https://api.bigw.com.au/api/products/v0/product/${this.keycode}`)
				.then(function (response) {

					let product = Object.entries(response.data.products)
					vm.product_data = product[0][1]

				})
				.catch(function (error) {

					console.log(error.config)
					console.log(error.toJSON())

					if (error.response) {
						vm.product_data = `Error: ${error.response.status}`
						// The request was made and the server responded with a status code that falls out of the range of 2xx
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						vm.product_data = 'The request was made but no response was received'
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
						console.log(error.request);
					} else {
						vm.product_data = 'Unexpected Error'
						// Something happened in setting up the request that triggered an Error
						console.log('Unexpected error', error.message);
					}
					
				})
		}
	}
}
</script>

<style>
#app {
	font-family: Montserrat;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>

<template>
<div id="app" class="h-screen flex flex-col text-center">
	<div class="bg-blue-400 text-white p-5">
		<div class="font-bold">Article Number</div>
		<input type="number" v-model="keycode" class="text-black rounded mt-3 px-3 py-2">
	</div>

	<div class="flex-grow max-w-screen-md mx-auto">

		<div class="flex items-center">

			<img alt="Product image" :src="`https://bigw.com.au${product_data.assets.images[0].sources[0].url}`" class="shadow-lg rounded">
			<div class="text-left ml-5">
				<div class="text-2xl">{{ product_data.name }}</div>
				<div>{{ product_data.code }}</div>
			</div>
			
		</div>

		<div>
			{{ product_data }}
		</div>


	</div>
	
	<div class="bg-blue-400 text-white p-5">
		<span class="font-bold">This project is not affiliated with BIG W or Woolworths Limited in any way.</span>
	</div>
</div>
</template>