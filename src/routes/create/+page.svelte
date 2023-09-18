<script lang="ts">
	import { goto } from '$app/navigation';

	import Textarea from '$lib/components/textarea.svelte';
	import { VNStore } from '$lib/store';

	let initialDescription = '';
	let loading = false;

	async function onSubmit() {
		loading = true;
		await VNStore.get().startVN(initialDescription);
		loading = false;
		goto('/vn');
	}
</script>

<section class="flex flex-col items-center w-full h-full pt-40">
	<form class="flex flex-col gap-2" on:submit={onSubmit}>
		<label for="initialDescription"> Descreva a história: </label>
		<Textarea
			bind:value={initialDescription}
			required
			disabled={loading}
			name="initialDescription"
			id="initialDescription"
			placeholder="Escreva o que quiser. Lugares, acontecimentos, personagens..."
		/>
		<button type="submit" disabled={loading} class="solid place-self-end bg-fuchsia-600"
			>{#if loading}
				Carregando...
			{:else}
				Criar!
			{/if}</button
		>
	</form>
</section>
