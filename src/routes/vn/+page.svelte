<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';
	import { vnStore } from '$lib/store';
	import type { VNStep, NextResponse } from '$lib/types';
	import axios from 'axios';
	import Icon from '@iconify/svelte';
	import { vnForm } from './store';
	let currentStep: VNStep;
	$: currentStep = $vnStore.steps[$vnStore.steps.length - 1];
	let hasFinished: boolean;
	$: hasFinished = !currentStep.choice1 && !currentStep.choice2;
	let loading = false;

	async function handleSubmit(choiceNum?: number) {
		let choice = '';
		if (choiceNum === 1 && currentStep.choice1) {
			choice = currentStep.choice1;
		} else if (choiceNum === 2 && currentStep.choice2) {
			choice = currentStep.choice2;
		} else {
			choice = $vnForm.choiceText;
		}
		const vnContext = vnStore.getVNContext(choice);
		loading = true;
		const response = await axios.post<NextResponse>('/api/vn/next', {
			choice,
			vnContext,
			finish: $vnForm.finishStory
		});
		loading = false;
		if (response.status === 200) {
			vnStore.nextStep(choice, response.data);
		}
	}
	let downloadUrl: string;
	function prepareDownload() {
		const blob = new Blob([vnStore.getVNAsText()], { type: 'text/plain' });
		downloadUrl = URL.createObjectURL(blob);
	}
</script>

<section class="flex flex-col items-center w-full">
	<form class="flex flex-col max-w-[1000px] gap-8 w-full">
		<div class="bg-gray-700 w-full rounded-xl flex flex-col relative p-8 gap-4">
			<div class="absolute top-0 right-0 p-4"><p>Cena {$vnStore.steps.length}</p></div>
			<img
				class="max-w-full max-h-[30vh] object-contain"
				src="https://picsum.photos/720?image=29"
				alt="vn art"
			/>
			<p>{currentStep.scene}</p>
		</div>

		{#if hasFinished}
			<div class="flex flex-row items-center gap-4 mx-auto">
				<p>Deseja baixar a visual novel?</p>
				<button on:click={prepareDownload} class="solid"
					><a href={downloadUrl} download="visualnovel.txt">Baixar em .txt</a></button
				>
			</div>
		{:else}
			<div class="flex flex-row gap-8">
				<label>
					<input
						bind:checked={$vnForm.finishStory}
						name="end-story"
						class="w-5 h-5 cursor-pointer mr-1"
						type="checkbox"
					/>
					Terminar a história após essa escolha?
				</label>
				|
				<label>
					<input
						name="custom-option"
						bind:checked={$vnForm.customChoice}
						class="w-5 h-5 cursor-pointer mr-1"
						type="checkbox"
					/>
					Criar sua própria escolha?
				</label>
			</div>
			{#if $vnForm.customChoice}
				<div class="place-self-center flex flex-row items-start gap-2">
					<Textarea
						disabled={loading}
						maxlength={100}
						placeholder="Descreva sua escolha aqui..."
						required
						bind:value={$vnForm.choiceText}
					/>
					<button disabled={loading} on:click={() => handleSubmit()} class="solid h-fit"
						><Icon icon="carbon:send-alt" />Enviar escolha</button
					>
				</div>
			{:else}
				<div class="flex flex-wrap flex-row lg:flex-nowrap w-full gap-4">
					{#if currentStep.choice1}
						<button disabled={loading} class="solid" on:click={() => handleSubmit(1)}>
							{currentStep.choice1}
						</button>
					{/if}
					{#if currentStep.choice2}
						<button disabled={loading} class="solid" on:click={() => handleSubmit(2)}
							>{currentStep.choice2}</button
						>
					{/if}
				</div>
			{/if}
		{/if}
	</form>
</section>
