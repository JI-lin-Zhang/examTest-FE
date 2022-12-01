import { ReactNode } from "react";

export interface IError {
  message: string;
}

export interface ICallback {
  session_state: string;
  code: string;
}

export interface IMultipleChoiceProps {
  id: string;
  title: string;
  choices: string[];
  answer: number;
  tag?: string;
}

export interface IAddQuestion extends Omit<IMultipleChoiceProps, 'id'> {
  id?: string
}

export interface ItemsTypeArray {
  label: string;
  name: string;
  placeholder: string;
  icon: { prefix?: ReactNode; suffix?: ReactNode };
  rule: [
    { required: boolean; message: string },
    { pattern: RegExp; message: string },
    { max: number; message: string },
    { min: number; message: string }
  ];
}

export interface IErrorInfo {
  error: string;
  name: string;
  warnings: string[];
}
export interface IChangedValuesType {
  [value: string]: string;
}

export interface IMultiChoiceSelected {
  questionId: string;
  answer: number;
}

export interface IResultResponse extends IMultiChoiceSelected {
  received: number;
}

export interface ISubmitExamResult {
  exam: IResultResponse;
  score: number;
}

export interface IRegisterFormProps {
  username: string;
  phone: string;
  email: string;
  job?: string;
}

export interface IExamResults {
  id: string;
  email: string;
  phone: string;
  score: string;
  examineeId: string;
  choosedChoices: string[];
  tag: string;
  createAt: string;
}

export interface IUserInfo extends IRegisterFormProps {
  id: string;
  createAt: string;
  gender: string;
  updateAt: string;
  address: string;
  score: number;
  exams: IExamResults[]
}

export interface IUserResults {
  list: IUserInfo[],
  totalCount: number
}

export interface IMenuList {
  key: string;
  label: string;
  onClick?: () => void;
  children?: IMenuList[];
}

export interface IUserSearchType {
  id?: string;
  username?: string;
  phone?: number;
}
export interface IResultProps {
  label: string;
  color: string;
}
export interface IUserDataSource {
  index: number,
  key: string,
  username: string,
  email: string,
  address: string,
  phone: string,
  createAt: string,
  score: string,
  spendTime: string,
  result: IResultProps
}
export interface ISubmitExamPerson {
  day: string;
  num: number;
}

export interface ISearchQuestion {
  id?: string;
  tag?: string;
  title?: string
}

export interface TokenSet {
  access_token?: string;

  token_type?: string;

  id_token?: string;

  refresh_token?: string;

  expires_in?: number;

  expires_at?: number;

  session_state?: string;

  scope?: string;
}
