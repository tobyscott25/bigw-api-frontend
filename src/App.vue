<script>
export default {
	data: function () {
		return {
			keycode: null
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

		<div class="flex items-center bg-green-50">

			<img alt="Product image" src="./assets/logo.png" class="shadow-lg rounded">
			<div class="text-left ml-5">
				<div class="text-2xl">Product name</div>
				<div>{{ keycode }}</div>
			</div>
			
		</div>


	</div>
	
	<div class="bg-blue-400 text-white p-5">
		<span class="font-bold">This project is not affiliated with BIG W or Woolworths Limited in any way.</span>
	</div>
</div>
</template>