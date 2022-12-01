import { message, Table, Tag } from "antd";
import { isEmpty } from "lodash";
import moment from "moment";
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil";
import { deleteUser, getUser } from "../../api";
import DeletePopButton from "../../component/deletePopButton.component";
import SearchEngine from "../../component/searchEngine.component";
import { PASS_SCORE, SEARCH_USER_TYPES } from "../../constants/common";
import { IUserDataSource, IResultProps, IUserInfo, IUserResults } from "../../interface";
import { userAtomState } from "../../recoil/atoms/userAtoms";

export default function User() {
  const [users, setUsers] = useRecoilState(userAtomState);
  const [currentSelect, setCurrentSelect] = useState<string[]>([]);
  const [searchTypeName, setSearchTypeName] = useState('username')
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    getUser(
      searchTerm ? {
        [searchTypeName]: searchTerm
      } : {}
    ).then((userData:IUserResults) => {
      setUsers(userData.list);
    })
  }, [searchTerm, searchTypeName])

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setCurrentSelect(selectedRowKeys as string[]);
    },
  };

  const handleDelete = (id: string[]) => {
    deleteUser(id).then(() => {
      const newUsers = users.filter(user => id.every((item) => item !== user.id))
      setUsers(newUsers);
      setCurrentSelect([]);
      message.success('操作成功！');
    }).catch((err) => {
      message.error('操作失败！');
      console.error(err);
    })
  };
  const dataSource: IUserDataSource[] = users.map((user: IUserInfo, index: number) => {
    const result = () => {
      if (!user.score) {
        return {
          label: '未提交',
          color: 'blue'
        };
      }
      return user.score >= PASS_SCORE ?
        {
          label: '通过',
          color: 'green'
        } :
        {
          label: '未通过',
          color: 'red'
        };
    }
    return {
      index: index + 1,
      key: user.id,
      username: user.username,
      email: user.email,
      address: user.address,
      phone: user.phone,
      createAt: moment(user.createAt).format('YYYY-MM-DD HH:mm:ss'),
      score: user.score ? user.score + '分' : '',
      spendTime: user.score ? moment(user.updateAt).diff(user.createAt, 'minutes') + '分钟' : '',
      result: result(),
      tags: user.exams.map((item) => {
        return item.tag
      })
    }
  })

  const columns = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: '姓名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: '做题用时',
      dataIndex: 'spendTime',
      key: 'spendTime',
      sorter: {
        compare: (a: IUserDataSource, b: IUserDataSource) => initializeSortData(a.spendTime, 2) - initializeSortData(b.spendTime, 2),
        multiple: 2
      },
    },
    {
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      sorter: {
        compare: (a: IUserDataSource, b: IUserDataSource) => initializeSortData(a.score, 1) - initializeSortData(b.score, 1),
        multiple: 1
      },
    },
    {
      title: '岗位',
      dataIndex: 'tags',
      key: 'tags',
    },
    {
      title: '结果',
      dataIndex: 'result',
      key: 'result',
      render: (result: IResultProps) => (
        <>
          <Tag color={result.color}>{result.label}</Tag>
        </>
      )
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (item: IUserDataSource) => {
        return <DeletePopButton message="删除" onConfirm={() => handleDelete([item.key])} />
      },
    },
  ]
  const initializeSortData = (sortData: string, cutOut: number) => {
    return Number(sortData.substring(0, sortData.length - cutOut))
  }


  return (
    <div className="text-right p-10">
      <SearchEngine
        inputOnChange={setSearchTerm}
        selectOnChange={setSearchTypeName}
        categories={SEARCH_USER_TYPES}
        defaultValue
      />
      <DeletePopButton message="批量删除" onConfirm={() => handleDelete(currentSelect)} disabled={isEmpty(currentSelect)} className={'mb-2 ml-4'} />
      <Table
        rowSelection={{
          type: 'checkbox',
          ...rowSelection
        }}
        {...{ dataSource, columns }}
      />
    </div>
  )
}
