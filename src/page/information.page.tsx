import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { inviteExam, register } from "../api";
import FormInformation from "../component/formInformation.component";
import { REGISTER_FORM } from "../constants/common";
import { formValidation } from "../data/formValidation";
import {
  ItemsTypeArray,
  IChangedValuesType,
  IRegisterFormProps,
  IUserInfo,
  IError
} from "../interface/index";
import { basicInfoState } from "../recoil/atoms/infoFormAtoms";

function Information() {
  const [disable, setDisable] = useState<boolean>(true);
  const [basicInfo, setBasicInfo] = useRecoilState<IRegisterFormProps>(basicInfoState);
  const navigate = useNavigate();

  const onFinish = () => {
    register(basicInfo).then((userInfo: IUserInfo) => {
      sessionStorage.setItem('userId', userInfo.id || '');
      sessionStorage.setItem('tag', basicInfo.job || '');
      inviteExam(userInfo.id, basicInfo.job ?? '').then((inviteId: string) => {
        success(inviteId);
      }).catch((err: IError) => {
        error(err.message);
      })
    }).catch((err: IError) => {
      error(err.message);
    })
  };

  const onValuesChange = (
    changedValues: IChangedValuesType,
    allValues: IRegisterFormProps
  ) => {
    setBasicInfo(allValues);
  };

  useEffect(() => {
    const valueObject: string[] = [];
    if (!basicInfo || Object.values(basicInfo).some((item) => !item)) return;
    formValidation.forEach((item: ItemsTypeArray) => {
      Object.keys(basicInfo).forEach((key: string) => {
        if (
          item.name == key &&
          item.rule[1].pattern.test(basicInfo[key as REGISTER_FORM])
        ) {
          valueObject.push(key);
        }
      });
      valueObject.length === formValidation.length
        ? setDisable(false)
        : setDisable(true);
    });
  }, [formValidation, basicInfo]);

  function success(data: string) {
    Modal.success({
      title: "信息输入成功！",
      content: (
        <div>
          <p>即将进入面试题, 祝您好运!</p>
        </div>
      ),
      onOk() {
        navigate(`test?inviteId=${data}`)
      },
    });
  }

  function error(msg: string) {
    Modal.error({
      title: "信息输入失败！",
      content: (
        <div>
          <p>{msg}</p>
        </div>
      ),
    });
  }

  return (
    <div className=" w-full h-full flex justify-center items-center bg-[url('../image/bg.png')] bg-no-repeat bg-cover">
      <div className=" px-10  bg-white bg-opacity-50  w-auto h-auto flex justify-center justify-around items-center ">
        <FormInformation
          onFinish={onFinish}
          formValidation={formValidation}
          labelCol={4}
          onValuesChange={onValuesChange}
          wrapperCol={14}
          disable={disable}
        />
      </div>
    </div>
  );
}

export default Information;
