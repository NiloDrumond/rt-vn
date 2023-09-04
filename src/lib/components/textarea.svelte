<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

  export let value = ''
	export let maxlength = 200;

	type $$Props = HTMLTextareaAttributes & { maxlength?: number; value?: string };
</script>

<div class="relative w-fit">
	<textarea
		class="h-32 p-2 bg-gray-700 border border-gray-500 rounded-xl w-[480px]"
		bind:value={value}
		{maxlength}
		{...$$restProps}
	/>
	<div class="absolute bottom-2 right-2 text-sm">
		{value.length}/{maxlength}
	</div>
</div>
