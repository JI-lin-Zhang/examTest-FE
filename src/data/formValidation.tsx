import { ItemsTypeArray } from "../interface";
import {
  WhatsAppOutlined,
  UserOutlined,
  MailOutlined,
} from "@ant-design/icons";

export const formValidation: ItemsTypeArray[] = [
  {
    label: "姓名",
    name: "username",
    icon: {
      prefix: <UserOutlined style={{ color: "rgba(0,0,0,.45)" }} />,
    },
    placeholder: "请输入你的姓名",
    rule: [
      { required: true, message: "请输入你的名字!" },
      {
        pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/,
        message: "请输入你的名字!",
      },
      { max: 20, message: "请输入字符7-20位字符!" },
      { min: 2, message: "输入的字符需要大于等于2位!" },
    ],
  },
  {
    label: "电话",
    name: "phone",
    icon: {
      prefix: <WhatsAppOutlined style={{ color: "rgba(0,0,0,.45)" }} />,
    },
    placeholder: "请输入你的电话",
    rule: [
      { required: true, message: "请输入你的电话!" },
      {
        pattern: new RegExp(/^(?:(?:\+|00)86)?1[3-9]\d{9}$/),
        message: "请输入正确的电话号码!",
      },
      { max: 11, message: "输入号码不能超过11位!" },
      { min: 11, message: "输入号码不能少于11位!" },
    ],
  },
  {
    label: "邮箱",
    name: "email",
    icon: {
      prefix: <MailOutlined style={{ color: "rgba(0,0,0,.45)" }} />,
    },
    placeholder: "请输入你的邮箱",
    rule: [
      { required: true, message: "请输入你的邮箱!" },
      {
        pattern:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "请输入邮箱的正确格式!",
      },
      { max: 1000, message: "输入邮箱不能超过1000位!" },
      { min: 3, message: "输入邮箱不能少于3位!" },
    ],
  },
];
