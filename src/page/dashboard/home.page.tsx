import { Card, Table } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getExamPersonInWeek, getQuestion, getUser } from "../../api";
import Charts from "../../component/charts.component";
import { IMultipleChoiceProps, ISubmitExamPerson, IUserInfo, IUserResults } from "../../interface";
import CrownFilled from "@ant-design/icons/lib/icons/CrownFilled";
import { QUESTION_TYPE } from "../../constants/common";
import { questionAtomState, rankAtomState, submitExamPersonAtomState } from "../../recoil/atoms/homeAtoms";
import { isEmpty } from "lodash";

interface IEchartData {
  name: string;
  value: number;
}

export default function Home() {
  const [rank, setRank] = useRecoilState(rankAtomState);
  const [questions, setQuestions] = useRecoilState(questionAtomState);
  const [submitExamPerson, setSubmitExamPerson] = useRecoilState(submitExamPersonAtomState);
  const [questionTypeData, setQuestionTypeData] = useState<IEchartData[]>([])
  const columnsStyle = 'bg-white text-center text-gray-400 font-bold leading-6 border-none';

  const answerOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    xAxis: {
      type: 'category',
      axisTick: {
        length: 6,
        alignWithLabel: true
      },
      data: submitExamPerson.map(item => item.day.slice(5))
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: submitExamPerson.map(item => item.num),
        type: 'line'
      }
    ]
  };

  const examTypeOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'examType',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          normal: {
            formatter: '{b}:{c}' + '个' + '\n\r' + '({d}%)',
            show: false,
            position: 'center'
          },
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        formatter: "{d}%",
        data: questionTypeData
      }
    ]
  };

  const columns = [
    {
      title: '名次',
      dataIndex: 'index',
      key: 'ranking',
      className: columnsStyle,
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'name',
      className: columnsStyle,
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      className: columnsStyle,
    },
    {
      title: '总用时',
      dataIndex: 'spendTime',
      key: 'spendTime',
      className: columnsStyle,
    },
  ];

  const rankingColor = (index: number) => {
    if (index == 1) {
      return '#FFDD55';
    } else if (index == 2) {
      return '#DDDDDD';
    }
    return '#AA7700';
  }

  const ranking = (index: number) => {
    if (index <= 3) {
      return <CrownFilled style={{ fontSize: '24px', color: rankingColor(index) }} />
    }
    return index
  }

  const dataSource = rank.map((user: IUserInfo, index: number) => {
    return {
      index: ranking(index + 1),
      key: user.id,
      username: user.username,
      address: user.address,
      score: user.score ? user.score + '分' : '',
      spendTime: user.score && moment(user.updateAt).diff(user.createAt, 'minutes') + '分钟',
    }
  })

  useEffect(() => {
    if (isEmpty(rank)) {
      getUser().then((userData: IUserResults) => {
        const newUser = userData.list.filter(item => item.score).sort((a, b) => {
          if (a.score === b.score) {
            return moment(a.updateAt).diff(a.createAt) - moment(b.updateAt).diff(b.createAt);
          }
          return b.score - a.score;
        });
        setRank(newUser.slice(0, 6));
      })
    }
    if (isEmpty(submitExamPerson)) {
      getExamPersonInWeek().then((data: ISubmitExamPerson[]) => {
        setSubmitExamPerson(data);
      });
    }
    if (isEmpty(questions)) {
      getQuestion(false)
        .then((list: IMultipleChoiceProps[]) => {
          setQuestions(list)
        })
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(questions)) {
      const questionArray: IEchartData[] = [];
      QUESTION_TYPE.map((type) => {
        const question = questions.filter((item) => type.value === item.tag);
        if (question.length > 0) {
          questionArray.push({
            name: type.value,
            value: question.length
          });
        }
      })
      setQuestionTypeData(questionArray);
    }
  }, [questions])

  return (
    <Card>
      <Card.Grid >
        <Card className="border-none">
          <Title level={4} className="text-1xl text-left text-black ">答题人数</Title>
          <Charts key={'answerCharts'} option={answerOption} style={{ width: '100%', height: '400px' }} />
        </Card>
      </Card.Grid>
      <Card.Grid >
        <Card className="border-none">
          <Title level={4} className="text-1xl text-left text-black ">题型分布</Title>
          <Charts key={'accuracyCharts'} option={examTypeOption} style={{ width: '100%', height: '400px' }} />
        </Card>
      </Card.Grid>
      <Card.Grid style={{ maxHeight: '485px', minHeight: '485px' }}>
        <Card className="border-none">
          <Title level={4} className="text-1xl text-left text-black ">排行榜</Title>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Card>
      </Card.Grid>
    </Card>
  )
}
