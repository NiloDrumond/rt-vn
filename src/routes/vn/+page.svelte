<script lang="ts">
	import Textarea from '$lib/components/textarea.svelte';
	import { useChat, type Message } from 'ai/svelte';
	import { vnForm } from './store';
	import { nanoid } from 'ai';
	import {
		STORAGE_KEY,
		createSystemContent,
		sceneRegex,
		choice1Regex,
		choice2Regex,
		nextSystemContent,
		finishSystemContent
	} from '$lib/constants';
	import { onDestroy, onMount } from 'svelte';
	import Icon from '@iconify/svelte';
	import { get } from 'svelte/store';
	import { speak } from '$lib/tts';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	let loadingCreate = false;
	let hasFinished = false;

	const { messages, setMessages, isLoading, reload } = useChat({
		api: '/api/vn'
	});

	let create: null | string = null;
	$: create = $page.url.searchParams.get('create');

	let currentScene = '';
	let currentSceneLoaded = false;
	let choice1 = '';
	let choice2 = '';
	let currentLength = 1;

	$: if (create) {
		setMessages([]);
		loadingCreate = false;
		$vnForm.initialized = false;
		hasFinished = false;
		localStorage.removeItem(STORAGE_KEY);
		goto('/vn');
	}

	onMount(() => {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw) as Message[];
			setMessages(parsed);
			$vnForm.initialized = true;
			const lastMessage = parsed[parsed.length - 3];
			if (lastMessage.role === 'system' && lastMessage.content === finishSystemContent) {
				hasFinished = true;
			}
		}
	});
	let shouldReload = false;

	let downloadUrl: string;

	function getVNAsText() {
		let result = '';
		$messages.forEach((message) => {
			if (result.length === 0) {
				if (message.role === 'user') {
					result = `Descrição inicial: ${message.content}\n` + `\n----------\n\n`;
				}
			} else {
				if (message.role === 'assistant') {
					result += message.content + '\n';
				}
				if (message.role === 'user') {
					result += `Escolha feita: ${message.content}\n` + `\n----------\n\n`;
				}
			}
		});
		return result;
	}

	function prepareDownload() {
		const blob = new Blob([getVNAsText()], { type: 'text/plain' });
		downloadUrl = URL.createObjectURL(blob);
	}
	$: if (!$isLoading && $messages.length > 0) {
		localStorage.setItem(STORAGE_KEY, JSON.stringify($messages));
	}

	let audio: HTMLAudioElement | null = null;
	function stopAudio() {
		if (audio) {
			audio.pause();
			audio.remove();
		}
	}
	$: if (currentSceneLoaded) {
		const newAudio = speak(currentScene);
    stopAudio();
		audio = newAudio;
	}

	$: if ($messages.length > 0) {
		currentLength = $messages.filter((message) => message.role === 'assistant').length;
	}

	$: if (currentScene && !isLoading) {
		currentSceneLoaded = true;
	}

	$: if ($messages.length > 0) {
		let lastMessage = $messages[$messages.length - 1];
		if (lastMessage.role === 'assistant') {
			let sceneMatch = sceneRegex.exec(lastMessage.content);
			if (sceneMatch) {
				currentScene = sceneMatch[1].trim();
			}
			let choice1Match = choice1Regex.exec(lastMessage.content);
			if (choice1Match) {
				currentSceneLoaded = true;
				choice1 = choice1Match[1].trim();
			}
			let choice2Match = choice2Regex.exec(lastMessage.content);
			if (choice2Match) {
				choice2 = choice2Match[1].trim();
			}
		}
	}

	function onNextStep(choice: string) {
		if ($vnForm.finishStory) {
			setMessages([
				...get(messages),
				{ id: nanoid(), role: 'system', content: finishSystemContent },
				{ id: nanoid(), role: 'user', content: choice }
			]);
			shouldReload = true;
			hasFinished = true;
		} else {
			setMessages([
				...get(messages),
				{ id: nanoid(), role: 'system', content: nextSystemContent },
				{ id: nanoid(), role: 'user', content: choice }
			]);
			shouldReload = true;
			vnForm.set({ choiceText: '', customChoice: false, finishStory: false, initialized: true });
		}
		currentSceneLoaded = false;
    stopAudio();
	}

	let initialDescription = '';
	async function onCreate() {
		loadingCreate = true;
		setMessages([
			{ id: nanoid(), role: 'system', content: createSystemContent },
			{ id: nanoid(), role: 'user', content: initialDescription }
		]);
		shouldReload = true;
		loadingCreate = false;
		initialDescription = '';
		$vnForm.initialized = true;
	}

	$: if (shouldReload && $messages.length > 0) {
		reload();
		shouldReload = false;
	}

	onDestroy(() => {
		if (audio) {
			audio.pause();
		}
	});
</script>

{#if !$vnForm.initialized}
	<section class="flex flex-col items-center w-full h-full pt-40">
		<form class="flex flex-col gap-2" on:submit={onCreate}>
			<label for="initialDescription"> Descreva a história: </label>
			<Textarea
				bind:value={initialDescription}
				required
				disabled={loadingCreate}
				name="initialDescription"
				id="initialDescription"
				placeholder="Escreva o que quiser. Lugares, acontecimentos, personagens..."
			/>
			<button type="submit" disabled={loadingCreate} class="solid place-self-end bg-fuchsia-600"
				>{#if loadingCreate}
					Carregando...
				{:else}
					Criar!
				{/if}</button
			>
		</form>
	</section>
{:else}
	<section class="flex flex-col items-center w-full">
		<form class="flex flex-col max-w-[1000px] gap-8 w-full">
			<div
				class="bg-slate-300 border border-slate-400 dark:border-none dark:bg-gray-700 w-full rounded-xl flex flex-col relative p-8 gap-4"
			>
				<div class="absolute top-0 right-0 p-4"><p>Cena {currentLength}</p></div>
				<img
					class="max-w-full max-h-[30vh] object-contain"
					src="https://picsum.photos/720?image=29"
					alt="vn art"
				/>
				<p>{currentScene}</p>
			</div>

			{#if hasFinished}
				<div class="flex flex-row items-center gap-4 mx-auto">
					<p>Deseja baixar a visual novel?</p>
					<button disabled={$isLoading} on:click={prepareDownload} class="solid"
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
							disabled={$isLoading}
							maxlength={100}
							placeholder="Descreva sua escolha aqui..."
							required
							bind:value={$vnForm.choiceText}
						/>
						<button
							disabled={$isLoading}
							on:click={() => onNextStep($vnForm.choiceText)}
							class="solid h-fit"><Icon icon="carbon:send-alt" />Enviar escolha</button
						>
					</div>
				{:else}
					<div class="flex flex-wrap flex-row lg:flex-nowrap w-full gap-4">
						{#if choice1.length > 0}
							<button
								disabled={$isLoading}
								class="solid w-[50%]"
								on:click={() => onNextStep(choice1)}
							>
								{choice1}
							</button>
						{/if}
						{#if choice2.length > 0}
							<button
								disabled={$isLoading}
								class="solid w-[50%]"
								on:click={() => onNextStep(choice2)}>{choice2}</button
							>
						{/if}
					</div>
				{/if}
			{/if}
		</form>
	</section>
{/if}
