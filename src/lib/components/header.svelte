<script lang="ts">
	import { browser } from '$app/environment';
	import { STORAGE_KEY } from '$lib/constants';
	import Icon from '@iconify/svelte';
	import { vnForm } from '../../routes/vn/store';

	let vnToContinue = false;

	$: if (browser) {
		vnToContinue = !!localStorage.getItem(STORAGE_KEY);
	}
	$: if (browser && $vnForm.initialized) {
		vnToContinue = true;
	}
	$: if (browser && !$vnForm.initialized) {
		vnToContinue = false;
	}
</script>

<div class="flex flex-row items-center gap-4">
	<a href="/">
		<span class="text-4xl text-fuchsia-700 font-bold">RT-VN</span>
	</a>
	<div class="flex-1" />
	{#if vnToContinue}
		<a href="/vn">
			<button class="solid"><Icon icon="carbon:continue" />Continuar Visual Novel</button>
		</a>
	{/if}
	<a href="/vn?create=true">
		<button class="solid"><Icon icon="carbon:add-alt" />Criar Visual Novel</button>
	</a>
</div>
