<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';
	import axios from 'axios';
	import type { CreateResponse } from '$lib/types';
	import { protoVNStore } from '$lib/store';
	import { goto } from '$app/navigation';

	let initialDescription = '';

	async function onSubmit() {
		const response = await axios.post<CreateResponse>('/api/vn/create', { initialDescription });
		if (response.status === 200) {
			protoVNStore.startVN(initialDescription, response.data);
      goto('/vn')
		}
	}
</script>

<section class="flex flex-col items-center w-full h-full pt-40">
	<form class="flex flex-col gap-2" on:submit={onSubmit}>
		<label for="initialDescription"> Descreva a história: </label>
		<Textarea
			bind:value={initialDescription}
			required
			name="initialDescription"
			id="initialDescription"
			placeholder="Escreva o que quiser. Lugares, acontecimentos, personagens..."
		/>
		<button type="submit" class="solid place-self-end bg-fuchsia-600">Criar!</button>
	</form>
</section>
