import Radio, { RadioChangeEvent } from "antd/lib/radio";
import Space from "antd/lib/space";
import Typography from "antd/lib/typography";
import { numToChar } from "../util";
import { IMultipleChoiceProps } from "../interface/index";
import { useRecoilState } from "recoil";
import { List } from "antd";
import { multiChoiceSelectedState } from "../recoil/atoms/examFormAtoms";

interface IMultipleChoiceOwnProps {
  index: number;
}

type IMultipleChoice = IMultipleChoiceProps & IMultipleChoiceOwnProps;

const MultipleChoice = (multipleChoice: IMultipleChoice) => {
  const { id, title, choices, index } = multipleChoice;
  const [multiChoiceSelected, setMultiChoiceSelected] = useRecoilState(multiChoiceSelectedState);

  const onSelectOption = (evt: RadioChangeEvent) => {
    const selected = evt.target.value;
    const selectedObj = { questionId: id, answer: selected };
    setMultiChoiceSelected([...multiChoiceSelected.filter(i => i.questionId !== id), selectedObj]);
  }

  return (
    <List.Item className="block">
      <Typography>{`${index+1}、${title}`}</Typography>
      <Radio.Group className="mt-2" onChange={onSelectOption}>
        <Space direction="vertical">
          {choices.map((item, index) => {
            return (
              <Radio value={index} key={index}>
                {`${numToChar(index)}. ${item}`}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </List.Item>
  )
};

export default MultipleChoice;
