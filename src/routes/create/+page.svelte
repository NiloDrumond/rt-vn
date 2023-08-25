<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';
</script>

<section class="flex flex-col items-center w-full h-full pt-40">
	<form action="?/create" method="POST" class="flex flex-col gap-2">
		<label for="story-context"> Descreva a história: </label>
		<Textarea
			required
			name="story-context"
			id="story-context"
			placeholder="Escreva o que quiser. Lugares, acontecimentos, personagens..."
		/>
		<button type="submit" class="solid place-self-end bg-fuchsia-600">Criar!</button>
	</form>
</section>
