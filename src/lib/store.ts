import { derived, get, writable } from "svelte/store";
import type { VNState, VNStep } from "./types";
import { browser } from "$app/environment";

const STORAGE_KEY = 'vn-state'
function createProtoVNStore() {
  const store = writable<VNState | undefined>(undefined)
  const { subscribe, set, update } = store;

  function startVN(initialDescription: string, firstStep: VNStep) {
    set({ initialDescription, steps: [firstStep], selectedChoices: [] })
  }

  function loadVNState() {
    if (browser) {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as VNState;
        set(parsed);
      }
    }
  }

  loadVNState();
  return { subscribe, startVN, update }
}

export const protoVNStore = createProtoVNStore()

protoVNStore.subscribe((state) => {
  if (state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }
});

function createVNStore() {
  const store = derived(protoVNStore, ($protoVNStore) => {
    if (!$protoVNStore) {
      throw new Error()
    } return $protoVNStore
  })
  const { subscribe } = store;

  function nextStep(selectedChoice: string, newStep: VNStep) {
    protoVNStore.update((prev) => {
      if (!prev) throw new Error();
      return { ...prev, selectedChoices: [...prev.selectedChoices, selectedChoice], steps: [...prev.steps, newStep] }
    })
  }

  function getVNContext(selectedChoice: string): string {
    const state = get(store);
    let result = `Descrição inicial: ${state.initialDescription}\n`;
    const length = state.steps.length
    for (let i = 0; i < length; i++) {
      const num = i + 1;
      const step = state.steps[i];
      const choice = num === length ? selectedChoice : state.selectedChoices[i];
      result += (`Cena: ${step.scene}\n` + `Escolha 1: ${step.choice1}\n` + `Escolha 2: ${step.choice2}\n` + `Escolha feita: ${choice}\n`)
    }
    return result;
  }

  return { subscribe, nextStep, getVNContext }
}

export const vnStore = createVNStore();

