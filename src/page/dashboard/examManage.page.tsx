import React, { useEffect, useState } from "react";
import { Table, Input, Form, Space, Button, Modal, Radio, message, Select } from "antd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IMultipleChoiceProps } from "../../interface";
import { multiChoiceExamManageState } from "../../recoil/atoms/examFormAtoms";
import { numToChar } from "../../util";
import { addQuestion, getQuestion, deleteQuestion, updateQuestion } from "../../api";
import DeletePopButton from "../../component/deletePopButton.component";
import SearchEngine from "../../component/searchEngine.component";
import { SEARCH_EXAM_TYPE } from "../../constants/common";
import { QUESTION_TYPE } from "../../constants/common";
import { isEmpty } from "lodash";

const ExamManage = () => {
  const examList = useRecoilValue(multiChoiceExamManageState);
  const setExamList = useSetRecoilState(multiChoiceExamManageState);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentSelectedRow, setCurrentSelectedRow] =
    useState<IMultipleChoiceProps>({
      id: "",
      answer: 0,
      choices: ["", ""],
      title: "",
      tag: "",
    });
  const [dialogVisible, setDialogVisible] = useState(false); //  弹窗显示
  const [mode, setMode] = useState("view");
  const [searchTypeName, setSearchTypeName] = useState("tag");
  const [tagValue, setTagValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);


  useEffect(() => {
    const params = {
      ...(searchTerm && { [searchTypeName]: searchTerm }),
      ...(tagValue && { tag: tagValue }),
    };
    getQuestion(true, params)
      .then((list: IMultipleChoiceProps[]) => {
        setExamList(list);
      })
      .catch(() => {
        message.error("操作失败，请刷新重试！");
      });
  }, [searchTerm, searchTypeName, tagValue]);

  const initial = () => {
    setCurrentIndex(-1);
    setCurrentSelectedRow({
      id: "",
      answer: 0,
      choices: ["", ""],
      title: "",
      tag: "",
    });
    setMode("view");
    setDialogVisible(false);
  };

  const handleTagChange = (tagValue: string) => {
    setTagValue(tagValue);
  }
  // edit Button
  const handleEdit = (record: IMultipleChoiceProps, index: number) => {
    setCurrentIndex(index);
    setDialogVisible(true);
    setMode("edit");
    setCurrentSelectedRow(record);
  };

  const onChangeExam = (key: string, value: string, index?: number) => {
    if (key === "choices" && index) {
      const newOptions = [...currentSelectedRow.choices];
      newOptions.splice(index - 1, 1, value);
      setCurrentSelectedRow({
        ...currentSelectedRow,
        [key]: newOptions,
      });
    } else {
      setCurrentSelectedRow({
        ...currentSelectedRow,
        [key]: value,
      });
    }
  };

  // delete
  const handleDelete = (id: string[] ) => {
    deleteQuestion(id)
      .then(() => {
        const newExam = examList.filter((exam) => id.every((item)=> item !== exam.id));
        setExamList(newExam);
        message.success("删除成功");
      })
      .catch(() => {
        message.error("删除失败");
      });
  };
  // 添加表格Button
  const handleAdd = () => {
    setMode("add");
    setDialogVisible(true);
  };
  // 添加选项
  const addOption = () => {
    setCurrentSelectedRow({
      ...currentSelectedRow,
      choices: [...currentSelectedRow.choices, ""],
    });
  };
  // 提示信息
  const confirmPromptMessage = () => {
    const hint = {
      title: "题目不能为空",
      option: "有选项内容不能为空",
      tag: "标签不能为空"
    };
    if (!currentSelectedRow.title) {
      message.error(hint.title);
    } else if (!currentSelectedRow.tag){
      message.error(hint.tag);
    } else if (currentSelectedRow.choices.some((option: string) => !option)) {
      message.error(hint.option);
    } else {
      handleConfirm();
    }
  };
  // 提交
  const handleConfirm = () => {
    if (mode === "edit") {
      const newExam = [...examList];
      updateQuestion(currentSelectedRow)
        .then(() => {
          newExam.splice(currentIndex, 1, currentSelectedRow);
          message.success("编辑成功");
          setExamList(newExam);
          initial();
        })
        .catch(() => {
          message.error("编辑失败");
        });
    } else {
      addQuestion(currentSelectedRow)
        .then((question: IMultipleChoiceProps) => {
          setExamList([...examList, question]);
          message.success("添加成功");
          initial();
        })
        .catch(() => {
          message.error("添加失败");
        });
    }
  };
  // search
  const selectOnChange = (value: string) => {
    setSearchTypeName(value);
  };
  const inputOnChange = (value: string) => {
    setSearchTerm(value);
  };
  // checkbox
  const rowSelection = {
    selectedQuestions,
    onChange: (newSelectedRowKeys:  React.Key[])=>{
      setSelectedQuestions(newSelectedRowKeys as string[]);
    },
  };

  const columns = [
    {
      title: "No",
      width: "5%",
      key: "index",
      dataIndex: "index",
      render: (_: unknown, record: IMultipleChoiceProps) => {
        const recordIndex =  examList.findIndex(item => item.id === record.id) + 1;
        return recordIndex;
      },
    },
    {
      title: "标签",
      dataIndex: "tag",
      key: "tag",
      width: "5%",
    },
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "15%",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      width: "20%",
    },
    {
      title: "选项",
      dataIndex: "choices",
      key: "choices",
      width: "30%",
      render: (choices: string[]) => {
        return choices?.map((item: string, index: number) => {
          return <p key={index}>{`${numToChar(index)}、${item}`}</p>;
        });
      },
    },
    {
      title: "答案",
      dataIndex: "answer",
      key: "answer",
      width: "5%",
      render: (answer: number) => {
        return numToChar(answer);
      },
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: "15%",
      render: (_: unknown, record: IMultipleChoiceProps, index: number) => {
        return (
          <span>
            <Button
              type="primary"
              onClick={() => handleEdit(record, index)}
              className="mr-2 my-2"
              ghost
            >
              编 辑
            </Button>
            <DeletePopButton
              message="删除"
              onConfirm={() => handleDelete([record.id])}
            />
          </span>
        );
      },
    },
  ];

  return (
    <div className="p-10">
      <div className="flex items-center justify-end mb-2">
        <label>标签：</label>
        <Select className="w-24 mr-2" defaultValue={'All'} onChange={handleTagChange}>
          <Select.Option value="">All</Select.Option>
          {QUESTION_TYPE.map((item, index:number)=>{
            return <Select.Option key={index} value={item.value}>{item.name}</Select.Option>
          })}
        </Select>
        <Space direction="vertical" className="mr-2">
          <SearchEngine
            selectOnChange={selectOnChange}
            inputOnChange={inputOnChange}
            categories={SEARCH_EXAM_TYPE}
            defaultValue
          />
        </Space>
        <Button onClick={handleAdd} type="primary">
          添加 +
        </Button>
        <DeletePopButton message="批量删除" className="ml-2" onConfirm={() => handleDelete(selectedQuestions)} disabled={isEmpty(selectedQuestions)} />
      </div>
      <Table
        dataSource={examList}
        columns={columns}
        rowKey={(r) => r.id}
        rowClassName="editable-row"
        rowSelection={rowSelection}
        pagination={{
          total: examList.length,
          defaultPageSize: 10,
        }}
      />
      <Modal
        title="题目编辑"
        centered
        visible={dialogVisible}
        okText={"确定"}
        cancelText={"取消"}
        onOk={confirmPromptMessage}
        onCancel={initial}
        width={600}
      >
        <Form autoComplete="off">
          <Form.Item label="title" labelCol={{ span: 3, offset: 0 }}>
            <Input
              value={currentSelectedRow.title}
              onChange={(e) => {
                onChangeExam("title", e.target.value);
              }}
              placeholder="请输入题目"
            />
          </Form.Item>
          <Form.Item label="tag" labelCol={{ span: 3, offset: 0 }}>
            <Select
              onChange={(value: string) => onChangeExam("tag", value)}
              value={currentSelectedRow.tag}
            >
              {QUESTION_TYPE.map(item => <Select.Option value={item.value} key={item.value}>{item.name}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            label="choices"
            labelCol={{ span: 3, offset: 0 }}
            className="flex "
          >
            <Button type="primary" onClick={addOption}>
              添加
            </Button>
            <Radio.Group
              className="flex flex-col w-full"
              value={currentSelectedRow.answer}
            >
              {currentSelectedRow.choices.map((item: string, index: number) => {
                return (
                  <Radio
                    key={index}
                    value={index}
                    onChange={(e) => onChangeExam("answer", e.target.value)}
                    className="mx-0 flex items-center "
                  >
                    <Input.TextArea
                      placeholder="请输入选项内容"
                      autoSize={{ minRows: 1, maxRows: 4 }}
                      key={index}
                      id={index.toString()}
                      className="mt-2 w-96"
                      style={{ resize: "none" }}
                      value={item}
                      onChange={(e) =>
                        onChangeExam("choices", e.target.value, index + 1)
                      }
                    />
                  </Radio>
                );
              })}
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ExamManage;
