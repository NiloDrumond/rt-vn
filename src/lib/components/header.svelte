<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<div class="flex flex-row items-center gap-4">
	<a href="/">
		<span class="text-4xl text-fuchsia-700 font-bold">RT-VN</span>
	</a>
	<div class="flex-1" />
	<button>
		<Icon icon="carbon:user-avatar" class="text-gray-400" height={26} width={26} />
	</button>
	<a href="/vn">
		<button class="solid"><Icon icon="carbon:add-alt" />Criar Visual Novel</button>
	</a>
</div>
