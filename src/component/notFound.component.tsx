import foursvg from "../image/404.svg";  //这里应该是你自己的svg图标路径
import meteor from "../image/meteor.svg";
import astronaut from "../image/astronaut.svg";
import spaceship from "../image/spaceship.svg";
import { useNavigate } from "react-router";
import { isLogin } from "../util";

const NotFoundPage = () => {
  const navigate = useNavigate()

  const onClick = () => {
    if (isLogin()) {
      navigate('/admin')
    }else{
      navigate('/')
    }
  }

  return (
    <div className="h-screen m-0 bg-fixed bg-gradient-to-b from-blue-900  to-purple-900 overflow-hidden">
      <div className="h-full bg-[url('../image/mars.svg')] bg-no-repeat bg-bottom bg-cover absolute inset-x-0 bottom-0 h-27 h-[27vh]"></div>
      <img src={foursvg} className="absolute inset-x-0 top-[16vh] w-[30vh] mx-auto"/>
      <img src={meteor} className="absolute right-[2vh] top-[16vh]"/>
      <p className="text-white font-semibold text-center mt-[31vh] text-6xl">Oh no!!</p>
      <p className="text-white font-normal text-center text-4xl mt-[-1vh] mb-[9vh]">
        {"页面未找到或者请求一个不再在这里的页面。"}
      </p>
      <div className="text-center">
        <a className="text-center bg-opacity-0 px-6 py-3 rounded-sm text-white border-2 border-white hover:bg-white hover:text-purple-500" onClick={onClick}>返回</a>
      </div>
      <img src={astronaut} className="absolute top-[18vh] left-[10vh] h-[30vh] animate-floats"/>
      <img src={spaceship} className="absolute bottom-[15vh] right-[24vh]"/>
    </div>
  )
};

export default NotFoundPage;
