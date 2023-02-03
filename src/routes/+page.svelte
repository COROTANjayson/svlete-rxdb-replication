<script>
	// @ts-nocheck
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	// import { GraphQLReplicator } from '$lib/rxdb/graphQlReplicator';
	// import { db } from '$lib/rxdb/db/createDB';
	// import { replicationState } from '$lib/rxdb/replicationState';

	export let data;
	let heroes = data.heroes;
	$: rxHeroes = data.rxHeroes;
	$: offline = data.offline;
	// console.log(rxHeroes)
	$: {
		console.log(offline);
	}
	$: isUpdate = false;
	$: contact = {
		id: '',
		name: '',
		color: ''
	};
	$: {
		console.log(contact);
	}
	// $: {
	// 	if (!data.heroes) heroes = data.heroes;
	// }
	const handleFormResp = () => {
		// @ts-ignore

		return ({ result }) => {
			contact = {
				id: '',
				name: '',
				color: ''
			};

			isUpdate = false;
			invalidateAll();
		};
	};
</script>

<main>
	{#if offline}
		<div class="bg-red-200 text-center p-3">Offline</div>
	{/if}

	<div class="flex flex-col justify-center items-center ">
		<div class="text-4xl mb-10 mt-4">Heroes</div>
		<form
			class="w-full max-w-lg  form mb-10 "
			use:enhance={handleFormResp}
			method="POST"
			action={isUpdate ? `?/updateHero&id=${contact.id}` : '?/createHero'}
		>
			<!-- svelte-ignore missing-declaration -->
			<div class="grid grid-cols-2 gap-4  ">
				<div class="flex flex-col text-sm mb-2 ">
					<label for="todo" class="mb-2 ml-1 text-gray-800 "> Hero </label>
					<input
						type="text"
						required
						name="name"
						placeholder="Hero Name"
						bind:value={contact.name}
						class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg "
					/>
				</div>
				<div class="flex flex-col text-sm mb-2">
					<label for="todo" class="mb-2 ml-1 text-gray-800 ">Color</label>
					<input
						type="text"
						required
						placeholder="Color"
						name="color"
						bind:value={contact.color}
						class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg "
					/>
				</div>
			</div>
			{#if isUpdate}
				<button class=" w-full btn btn-primary mt-4 py-2 px-4"> Update Hero</button>
			{:else}
				<button class=" w-full btn btn-primary mt-4 py-2 px-4"> Create Hero</button>
			{/if}
		</form>
		<div class="border rounded w-5/6">
			<div class=" w-full flex flex-col justify-center items-center">
				<div>Server</div>
				<div
					class="w-full flex flex-row justify-center items-center mb-4 p-3 bg-blue-200 font-bold text-1xl"
				>
					<div class="basis-1/2">ID</div>
					<div class="basis-1/4">Color</div>
					<div class="basis-1/4">Hero Name</div>
					<div class="basis-1/4">Update</div>
				</div>
				{#each heroes as hero}
					<div class="w-full flex flex-row justify-center items-center p-3">
						<div class="basis-1/2">{hero.id}</div>
						<div class="basis-1/4">{hero.color}</div>
						<div class="basis-1/4">{hero.name}</div>
						<div class="basis-1/4">
							<button
								class="btn btn-primary"
								on:click={() => {
									contact = hero;
									isUpdate = true;
								}}>Update</button
							>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="border rounded w-5/6 mt-4">
			<div class=" w-full flex flex-col justify-center items-center">
				<div>RXDB</div>
				<div
					class="w-full flex flex-row justify-center items-center mb-4 p-3 bg-blue-200 font-bold text-1xl"
				>
					<div class="basis-1/2">ID</div>
					<div class="basis-1/4">Color</div>
					<div class="basis-1/4">Hero Name</div>
				</div>
				{#each rxHeroes as hero}
					<div class="w-full flex flex-row justify-center items-center p-3">
						<div class="basis-1/2">{hero.id}</div>
						<div class="basis-1/4">{hero.color}</div>
						<div class="basis-1/4">{hero.name}</div>
						<div class="basis-1/4">
							<button
								class="btn btn-primary"
								on:click={() => {
									contact = hero;
									isUpdate = true;
								}}>Update</button
							>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</main>
