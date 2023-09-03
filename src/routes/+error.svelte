<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	$: if (browser) {
		goto('/');
	}
</script>

<h2 class="text-red-500">Ocorreu um erro inesperado</h2>
