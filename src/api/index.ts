import {
  IRegisterFormProps,
  IUserInfo,
  IUserSearchType,
  ISearchQuestion,
  ISubmitExamPerson,
  IAddQuestion,
  IMultipleChoiceProps,
  IMultiChoiceSelected,
  ISubmitExamResult,
  ICallback,
  TokenSet,
  IUserResults
} from "../interface";
import { deleteAction, get, post, put } from "./service";



/**
 *  keycloak Action
 * @param params
 * @returns
 */
export const auth = () => {
  return get<string>("/auth");
};

export const callback = (params: ICallback) => {
  return get<TokenSet>("/callback", params);
};


/**
 *
 * User Action
 * 用户 api
 */
export const getUser = (params?: IUserSearchType) => {
  return get<IUserResults>("/user", params)
}

export const register = (data: IRegisterFormProps) => {
  const registerData = { ...data };
  delete registerData.job;
  return post<IUserInfo>("/user", registerData);
};

export const deleteUser = (id: string | string[]) => {
  return deleteAction<string>("/user", { id });
};

export const getExamPersonInWeek = () => {
  return get<ISubmitExamPerson[]>("/user/week");
};

/**
 *
 * Exam Action
 * 考试 api
 *
 */
export const inviteExam = (examineeId: string, tag: string) => {
  return post<string>("/exam", { examineeId, tag })
};

export const submitExam = (examineeId: string, inviteId: string, tag: string, answers: IMultiChoiceSelected[]) => {
  return post<ISubmitExamResult>("/exam/submit", { examineeId, inviteId, tag, answers });
};

/**
 *
 * Question Action
 * 试题 api
 *
 */
export const getQuestion = (includeAnswer: boolean, params?: ISearchQuestion) => {
  const includeObj = { include: "answer" };
  const paramsObj = {
    ...(includeAnswer && includeObj),
    ...(params && params),
  }
  return get<IMultipleChoiceProps[]>("/question", paramsObj);
};

export const addQuestion = (data: IAddQuestion) => {
  delete data.id;
  return post<IMultipleChoiceProps>("/question", data);
};

export const deleteQuestion = (id: string[]) => {
  return deleteAction("/question", { id });
};

export const updateQuestion = (data: IMultipleChoiceProps) => {
  return put("/question", data);
};
