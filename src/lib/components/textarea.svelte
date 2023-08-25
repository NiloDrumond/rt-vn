<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let text = '';
	export let maxlength = 200;

	type $$Props = HTMLTextareaAttributes & { maxlength?: number };
</script>

<div class="relative w-fit">
	<textarea
		class="h-32 p-2 bg-gray-700 border border-gray-500 rounded-xl w-[480px]"
		bind:value={text}
		{maxlength}
		{...$$restProps}
	/>
	<div class="absolute bottom-2 right-2 text-sm">
		{text.length}/{maxlength}
	</div>
</div>
