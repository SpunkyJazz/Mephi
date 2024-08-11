import { ApiCommon } from "../Common";
import { TResponse } from "../Common/types";
import {
  TQuestion,
  TQuestionDetails,
  TTest,
  TTestDetails,
  TVariantDetails
} from "./types";

export class MephiApiClass extends ApiCommon {
  public getQuestions = <T = TQuestion[]>(): TResponse<T> =>
    this.get<T>("/api/v1/get-questions");

  public getQuestion = <T = TQuestionDetails>(id: string): TResponse<T> =>
    this.get<T>(`/api/v1/get-question/${id}`);

  public getTests = <T = TTest[]>(): TResponse<T> =>
    this.get<T>("/api/v1/get-tests");

  public getTest = <T = TTestDetails>(id: string): TResponse<T> =>
    this.get<T>(`/api/v1/get-test/${id}`);

  public getVariant = <T = TVariantDetails>(
    testId: string,
    variantNumber: string
  ): TResponse<T> =>
    this.get<T>(`/api/v1/get-variant/${testId}/${variantNumber}`);
}

export const MephiApi = new MephiApiClass();
