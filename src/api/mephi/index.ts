import { ApiCommon } from "../Common";
import { TResponse } from "../Common/types";
import {
  TQuestion,
  TQuestionDetails,
  TTest,
  TNewTest,
  TTestDetails,
  TVariantDetails
} from "./types";

export class MephiApiClass extends ApiCommon {
  public generateTest = <T = TNewTest>(data: TNewTest): TResponse<T> =>
    this.put<T, TNewTest>("/api/v1/generate-test", data);

  public getQuestions = <T = TQuestion[]>(): TResponse<T> =>
    this.get<T>("/api/v1/get-questions");

  public getQuestion = <T = TQuestionDetails>(id: string): TResponse<T> =>
    this.get<T>(`/api/v1/get-question/${id}`);

  public deleteQuestion = <T = null>(id: TQuestion["id"]): TResponse<T> =>
    this.delete<T>(`/api/v1/delete-question/${id}`);

  public editQuestionUsage = <T = TQuestion>(data: TQuestion): TResponse<T> =>
    this.put<T, TQuestion>("/api/v1/edit-question-usage", data);

  public addAnswer = <T = TQuestionDetails>(
    data: TQuestionDetails
  ): TResponse<T> => this.put<T, TQuestionDetails>("/api/v1/add-answer", data);

  public saveQuestion = <T = TQuestionDetails>(
    data: TQuestionDetails
  ): TResponse<T> =>
    this.put<T, TQuestionDetails>("/api/v1/save-question", data);

  public getTests = <T = TTest[]>(): TResponse<T> =>
    this.get<T>("/api/v1/get-tests");

  public getTest = <T = TTestDetails>(id: string): TResponse<T> =>
    this.get<T>(`/api/v1/get-test/${id}`);

  public deleteTest = <T = null>(id: TTest["id"]): TResponse<T> =>
    this.delete<T>(`/api/v1/delete-test/${id}`);

  public editTestUsage = <T = TTest>(data: TTest): TResponse<T> =>
    this.put<T, TTest>("/api/v1/edit-test-usage", data);

  public getVariant = <T = TVariantDetails>(
    testId: string,
    variantNumber: string
  ): TResponse<T> =>
    this.get<T>(`/api/v1/get-variant/${testId}/${variantNumber}`);
}

export const MephiApi = new MephiApiClass();
