import { Form, Input, Button, Typography, Select } from "antd";
import { QUESTION_TYPE } from "../constants/common";
import { IChangedValuesType, IRegisterFormProps, ItemsTypeArray } from "../interface";

interface IFormInformationProps {
  onFinish: (values: IRegisterFormProps) => void;
  labelCol: number;
  wrapperCol: number;
  onValuesChange: (changedValues: IChangedValuesType, allValues: IRegisterFormProps) => void;
  disable: boolean;
  formValidation: ItemsTypeArray[];
}

const { Option } = Select;

export default function FormInformation(props: IFormInformationProps) {
  const {
    onFinish,
    formValidation,
    labelCol,
    wrapperCol,
    onValuesChange,
    disable,
  } = props;
  const { Title } = Typography;
  return (
    <div>
      <Title level={3} className="text-center font-semibold text-2xl pt-8 pb-6">基本信息</Title>
      <Form
        name="basic"
        labelCol={{ span: labelCol }}
        wrapperCol={{ span: wrapperCol }}
        onFinish={onFinish}
        autoComplete="off"
        onValuesChange={onValuesChange}
      >
        {formValidation.map((num: ItemsTypeArray, index: number) => {
          return (
            <Form.Item
              key={index}
              label={num.label}
              name={num.name}
              rules={num.rule}
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 19 }}
            >
              <Input
                placeholder={num.placeholder}
                prefix={num.icon.prefix}
                style={{ minWidth: 200 }}
              />
            </Form.Item>
          );
        })}
        <Form.Item name="job" label="岗位" rules={[{ required: true }]} labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
          <Select
            placeholder="请选择你要面试的岗位"
            allowClear
          >
            {QUESTION_TYPE.map(item => <Option value={item.value} key={item.value}>{item.name}</Option>)}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }} style={{textAlign:'center'}}>
          <Button type="primary" htmlType="submit" disabled={disable}>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
