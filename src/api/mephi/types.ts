export type TNewTest = {
  name: string;
  variants: number;
  questions: number;
  minutes: number;
  usage: boolean;
  // themes:
  // TODO Добавить темы
};

export type TTheme = {
  title: string;
  value: string;
  key: string;
  children: TTheme[];
};

export type TTest = {
  id: number;
  name: string;
  variants: number;
  questions: number;
  minutes: number;
  usage: boolean;
};

export type TTestDetails = {
  id: number;
  name: string;
  variants: TVariant[];
};

export type TVariant = {
  id: number;
  number: number;
};

export type TVariantDetails = {
  id: number;
  number: number;
  questions: TQuestion[];
};

export type TQuestion = {
  id: number;
  theme: string;
  identifier: number;
  text: string;
  complexity: number;
  usage: boolean;
};

export type TQuestionDetails = {
  id: number;
  text: string;
  complexity: number | null;
  answers: answer[];
};

export type answer = {
  id: number;
  text: string;
  correctness: boolean;
};

export type TOpenTests = {
  id: number;
  name: string;
};

export type TTestPassing = {
  name: string;
  questions: TQuestionDetails[];
};
