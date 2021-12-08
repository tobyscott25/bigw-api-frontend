<script>
import _ from 'lodash'
import axios from 'axios'
import VueBarcode from 'vue-barcode';

export default {
	components: {
		'barcode': VueBarcode
	},
	data: function () {
		return {
			status: 0, // 0: Idle, 1: Typing/Loading, 2: Success, 3: Error
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
			},
			error: null
		}
	},
	watch: {
		keycode: function (new_keycode, old_keycode) {
			if (new_keycode != '') {
				this.status = 1 // Typing
				this.debouncedGetProduct()
			} else {
				this.status = 0 // Idle
			}
			
		}
	},
	created: function () {
		this.debouncedGetProduct = _.debounce(this.getProduct, 500)
	},
	methods: {
		getProduct: function () {
			this.status = 1 // Loading
			var vm = this
			axios.get(`https://api.bigw.com.au/api/products/v0/product/${this.keycode}`)
				.then(function (response) {

					let product = Object.entries(response.data.products)
					vm.product_data = product[0][1]

					vm.status = 2 // Success

				})
				.catch(function (error) {

					vm.status = 3 // Error
					// console.log(error.toJSON())

					if (error.response) {
						// The request was made and the server responded with a status code that falls out of the range of 2xx
						console.log(error.response)
						vm.error = error.response.data.errors[0].message
					} else if (error.request) {
						// `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
						console.log(error.request)
						vm.error = 'The request was made but no response was received. Disable CORS security in your browser.'
					} else {
						// Something happened in setting up the request that triggered an Error
						console.log('Unexpected error', error.message)
						vm.error = 'Unexpected Error'
					}
					
				})
		}
	}
}
</script>

<style lang="postcss">
#app {
	font-family: Montserrat;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
td {
	@apply px-5 py-1;
}
tr:nth-child(even) {
	/* background-color: #ccc; */
	@apply bg-blue-50;
}
</style>

<template>
<div id="app" class="min-h-screen flex flex-col bg-blue-50">
	<div class="bg-blue-400 text-white p-5 text-center">
		<div class="font-bold">Article Number</div>
		<input type="text" v-model="keycode" class="text-black rounded mt-3 px-3 py-2">
	</div>

	<div class="flex-grow max-w-screen-md mx-auto">

		<div v-if="this.status == 0">
			<div class="text-2xl my-5">Enter an Article Number!</div>
		</div>

		<div v-if="this.status == 1">
			<div class="text-2xl my-5">Typing/Loading...</div>
		</div>

		<div v-if="this.status == 2">
			<div class="flex items-center my-10">
				<img alt="Product image" :src="`https://bigw.com.au${product_data.assets.images[0].sources[0].url}`" class="shadow-lg rounded w-96">
				<div class="ml-5">
					<div class="text-2xl">{{ product_data.name }}</div>
					<div>EAN: {{ product_data.information.ean }}</div>
					<div>{{ product_data.listingStatus }}</div>
					<barcode :value="product_data.information.ean" format="ean13" displayValue="false" background="transparent" width="2" height="80"></barcode>
					
				</div>
			</div>

			<div class="my-10">
				<div class="text-2xl">Description</div>
				<div class="my-5">{{ product_data.information.description }}</div>
				<div v-html="product_data.information.summary" class="my-5"></div>
			</div>

			<div class="my-10">
				<div class="text-2xl">Information</div>
				<table class="bg-white rounded mx-auto my-5 p-5 w-full shadow-lg">
					<tr>
						<td>manufacturerAid:</td>
						<td>{{ product_data.information.manufacturerAid }}</td>
					</tr>
					<tr>
						<td>shippingWeight:</td>
						<td>{{ product_data.information.shippingWeight }}</td>
					</tr>
					<tr>
						<td>cubicWeight:</td>
						<td>{{ product_data.information.cubicWeight }}</td>
					</tr>
					<tr>
						<td>dsvVendorId:</td>
						<td>{{ product_data.information.dsvVendorId }}</td>
					</tr>
					<tr>
						<td>logisticType:</td>
						<td>{{ product_data.information.logisticType }}</td>
					</tr>
					<tr>
						<td>brand:</td>
						<td>{{ product_data.information.brand }}</td>
					</tr>
					<tr>
						<td>displayDeliveryFee:</td>
						<td>{{ product_data.information.displayDeliveryFee }}</td>
					</tr>
					<tr>
						<td>rating:</td>
						<td>{{ product_data.information.rating }}</td>
					</tr>

					<tr>
						<td>isBundleProduct:</td>
						<td>{{ product_data.isBundleProduct }}</td>
					</tr>
					<tr>
						<td>isPreOrder:</td>
						<td>{{ product_data.isPreOrder }}</td>
					</tr>
					<tr>
						<td>isTokenProduct:</td>
						<td>{{ product_data.isTokenProduct }}</td>
					</tr>
					<tr>
						<td>isDSVProduct:</td>
						<td>{{ product_data.isDSVProduct }}</td>
					</tr>
					<tr>
						<td>isDeliverable:</td>
						<td>{{ product_data.isDeliverable }}</td>
					</tr>
					<tr>
						<td>isLaybyEnabled:</td>
						<td>{{ product_data.isLaybyEnabled }}</td>
					</tr>
					<tr>
						<td>isHomeDeliveryOnly:</td>
						<td>{{ product_data.isHomeDeliveryOnly }}</td>
					</tr>
					<tr>
						<td>isOnlineOnly:</td>
						<td>{{ product_data.isOnlineOnly }}</td>
					</tr>
					<tr>
						<td>isInStoreOnly:</td>
						<td>{{ product_data.isInStoreOnly }}</td>
					</tr>
					<tr>
						<td>isSearchableOnly:</td>
						<td>{{ product_data.isSearchableOnly }}</td>
					</tr>
					<tr>
						<td>isBaseProduct:</td>
						<td>{{ product_data.isBaseProduct }}</td>
					</tr>
					<tr>
						<td>isVariant:</td>
						<td>{{ product_data.isVariant }}</td>
					</tr>
					<tr>
						<td>isExpressDelivery:</td>
						<td>{{ product_data.isExpressDelivery }}</td>
					</tr>
					<tr>
						<td>isDCOnly:</td>
						<td>{{ product_data.isDCOnly }}</td>
					</tr>
					<tr>
						<td>isCollectable:</td>
						<td>{{ product_data.isCollectable }}</td>
					</tr>
				</table>
			</div>
			
			<div class="my-10">
				<div class="text-2xl">Specifications</div>
				<table class="bg-white rounded mx-auto my-5 p-5 w-full shadow-lg">
					<tr v-for="spec in product_data.information.specifications" :key="spec.name">
						<td>{{ spec.name }}</td>
						<td>{{ spec.description }}</td>
					</tr>
				</table>
			</div>

			<div class="my-10">
				<div class="text-2xl">Categories</div>
				<table class="bg-white rounded mx-auto my-5 p-5 w-full shadow-lg">
					<tr v-for="item in product_data.categories" :key="item.code">
						<td>{{ item.name }}</td>
						<!-- <td>{{ item.name }} ({{ item.code }})</td> -->
					</tr>
				</table>
			</div>

			<div class="my-10">
				<div class="text-2xl">Collections</div>
				<table class="bg-white rounded mx-auto my-5 p-5 w-full shadow-lg">
					<tr v-for="item in product_data.collections" :key="item.code">
						<td>{{ item.name }}</td>
						<!-- <td>{{ item.name }} ({{ item.code }})</td> -->
					</tr>
				</table>
			</div>

			<div class="my-10">
				<div class="text-2xl">Attributes</div>
				<div class="my-5">{{ product_data.attributes }}</div>
			</div>

		</div>

		<div v-if="this.status == 3">
			<div class="text-2xl my-5">{{ error }}</div>
		</div>

	</div>
	
	<div class="bg-blue-400 text-white p-5 text-center">
		<span class="font-bold">This project is not affiliated with BIG W or Woolworths Limited in any way.</span>
	</div>
</div>
</template>