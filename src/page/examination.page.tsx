import { Button, Modal } from "antd";
import Layout, { Content } from "antd/lib/layout/layout";
import List from "antd/lib/list";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getQuestion, submitExam } from "../api";
import MultipleChoice from "../component/multipleChoice.component";
import { PASS_SCORE, EXAM_TITLE, EXAM_DESCRIPTION } from "../constants/common";
import { IError, IMultipleChoiceProps, ISubmitExamResult } from "../interface/index";
import { multiChoiceSelectedState } from "../recoil/atoms/examFormAtoms";
import { userScore } from "../recoil/atoms/infoFormAtoms";
import { selectedCountState } from "../recoil/selectors/examFormSelectors";
import { usernameState } from "../recoil/selectors/infoFormSelectors";
import { useNavigate } from "react-router";
import stars from '../image/stars.png'
import sun from '../image/sun.png'

const Examination = () => {
  const selectedLength = useRecoilValue(selectedCountState);
  const [score, setScore] = useRecoilState(userScore);
  const username = useRecoilValue(usernameState);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [questions, setQuestions] = useState<IMultipleChoiceProps[]>([]);
  const answers = useRecoilValue(multiChoiceSelectedState);
  const promptText = score < PASS_SCORE ? '很遗憾您没有通过测验，请再接再厉！' : '恭喜您通过测验,请截图联系人事小姐姐' ;
  const promptImg = score < PASS_SCORE ? stars : sun;
  const examId = new URLSearchParams(location.search).get("inviteId");
  const userId = sessionStorage.getItem("userId");
  const tag = sessionStorage.getItem('tag');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if(!examId || !tag || !userId) {
      return error('无法提交');
    }
    submitExam(userId, examId, tag, answers).then((result: ISubmitExamResult) => {
      setScore(result.score);
      setIsModalVisible(true);
    }).catch((err: IError) => {
      error(err.message);
    })
  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function error(msg: string) {
    Modal.error({
      title: "提交失败！",
      content: (
        <div>
          <p>{msg}</p>
        </div>
      ),
    });
  }

  useEffect(() => {
    getQuestion(false, tag ? {tag} : {} ).then((list: IMultipleChoiceProps[]) => {
      const examList :IMultipleChoiceProps[] = [];
      while (examList.length < 10) {
        const num = Math.floor(Math.random() * list.length);
        if( examList.indexOf(list[num]) === -1 ){
          examList.push(list[num]);
        }
      }
      setQuestions(examList);
    })
  }, []);

  return (
    <Layout className="flex flex-col justify-center w-600 items-center padding-0-70 pb-10 bg-gradient-to-b from-cyan-100 to-blue-300 px-6">
      <Content className="bg-white px-10 mb-5 pt-10 pb-10 mt-10 rounded-lg">
        <Title level={2} className="text-3xl text-center text-blue-400">{`${tag}${EXAM_TITLE}`}</Title>
        <Title level={4} className="py-3 text-red-400">{EXAM_DESCRIPTION}</Title>
        <List split={false}>
          {questions.map((item: IMultipleChoiceProps, index: number) => {
            return (
              <MultipleChoice index={index} key={item.id} { ...item }></MultipleChoice>
            )
          })}
        </List>
        <Button
          className="block mx-auto"
          type="primary"
          onClick={handleSubmit}
          disabled={selectedLength < questions.length ? true : false}
        >
          提交试卷
        </Button>
        <Modal
          visible={isModalVisible}
          centered={true}
          footer={null}
          closable={false}
          onCancel={handleCancel}
          style={{ textAlign: "center" }}
          className="shadow-2xl"
        >
          <div className="flex flex-col justify-center">
            <h1 className='text-sm my-2'>Hi {username}</h1>
            <h1 style={{fontSize:'28px'}}>您的得分为：{score}分</h1>
            <img src={promptImg} className="w-48 mt-5 mb-10 mx-auto"/>
            <p className='align-center text-gray-400'>{promptText}</p>
            <button className='mx-auto mt-3 py-2 px-4 w-32 text-sm bg-green-300 rounded-sm text-white cursor-pointer border-transparent text-lg' onClick={()=> navigate('/') }>离开</button>
          </div>
        </Modal>
      </Content>
    </Layout>
  )
};

export default Examination;
