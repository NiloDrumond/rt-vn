export type VNStep = {
  scene: string;
  choice1?: string;
  choice2?: string;
}

export type VNState = {
  initialDescription: string;
  steps: VNStep[];
  selectedChoices: string[];
}

export type NextRequest = {
  vnContext: string;
  finish: boolean;
  choice: string;
}

export type NextResponse = VNStep;

export type CreateRequest = {
  initialDescription: string;
}

export type CreateResponse = VNStep;

export type VNForm = {
  customChoice: boolean;
  choiceText: string;
  finishStory: boolean;
}


