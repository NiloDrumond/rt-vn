<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

  export let value = ''
	export let maxlength = 200;

	type $$Props = HTMLTextareaAttributes & { maxlength?: number; value?: string };
</script>

<div class="relative w-fit">
	<textarea
		class="peer h-32 p-2 bg-slate-300 border-slate-400 dark:bg-gray-700 border dark:border-gray-500 rounded-xl w-[480px] disabled:opacity-40"
		bind:value={value}
		{maxlength}
		{...$$restProps}
	/>
	<div class="absolute bottom-2 right-2 text-sm peer-disabled:opacity-40">
		{value.length}/{maxlength}
	</div>
</div>
