<script>
	import Textarea from '$lib/components/textarea.svelte';
	import Icon from '@iconify/svelte';
	let customOption = false;
</script>

<section class="flex flex-col items-center w-full">
	<form class="flex flex-col max-w-[1200px] gap-8">
		<div class="bg-gray-700 w-full rounded-xl flex flex-col relative p-8 gap-4">
			<div class="absolute top-0 right-0 p-4"><p>Cena 1</p></div>
			<img
				class="max-w-full max-h-[30vh] object-contain"
				src="https://picsum.photos/720?image=29"
				alt="vn art"
			/>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus iure quo temporibus
				perferendis aliquam nisi a saepe enim tempore? Nostrum ducimus tempore ipsum minus,
				perspiciatis nisi itaque nemo tempora nobis? Lorem, ipsum dolor sit amet consectetur
				adipisicing elit. Corporis quae earum magni odio deserunt ratione provident saepe! Eveniet
				voluptates molestias quis corporis quo quisquam est ducimus assumenda. Totam, harum et.
			</p>
		</div>

		<div class="flex flex-row gap-8">
			<label>
				<input name="end-story" class="w-5 h-5 cursor-pointer" type="checkbox" />
				Terminar a história após essa escolha?
			</label>
			|
			<label>
				<input name="custom-option" bind:checked={customOption} class="w-5 h-5 cursor-pointer" type="checkbox" />
				Criar sua própria escolha?
			</label>
		</div>
		{#if customOption}
			<div class="place-self-center flex flex-row items-start gap-2">
				<Textarea maxlength={100} placeholder="Descreva sua escolha aqui..." required />
				<button class="solid h-fit"><Icon icon="carbon:send-alt" />Enviar escolha</button>
			</div>
      {:else}

		<div class="flex flex-wrap flex-row lg:flex-nowrap w-full gap-4">
			<button class="solid"
				>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti adipisci accusamus rem
				laboriosam, esse corporis non ea consectetur aut nihil molestias ad nemo id exercitationem
				suscipit quis, nam atque similique?</button
			>

			<button class="solid"
				>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident consectetur, saepe
				sint, in ipsam inventore quasi qui distinctio natus praesentium laborum, tempore blanditiis?
				Velit, ipsa perferendis praesentium veniam libero deserunt.</button
			>
		</div>
		{/if}
	</form>
</section>
