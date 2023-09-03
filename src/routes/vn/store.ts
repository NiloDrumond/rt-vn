import type { VNForm } from "$lib/types";
import { writable } from "svelte/store";

export const vnForm = writable<VNForm>({ choiceText: '', customChoice: false, finishStory: false });
