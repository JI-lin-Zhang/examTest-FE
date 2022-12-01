import { BrowserRouter, useRoutes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AuthProvider, useAuth } from "./authProvider";
import Dashboard from "./page/dashboard/dashboard.page";
import ExamManage from "./page/dashboard/examManage.page";
import Home from "./page/dashboard/home.page";
import User from "./page/dashboard/user.page";
import Examination from "./page/examination.page";
import HandlePage from "./page/handle.page";
import Information from "./page/information.page";

const basicRoutes = [
  {
    path: '/',
    element: <Information/>
  },
  {
    path: '/test',
    element: <Examination/>
  },
  {
    path: '*',
    element: <HandlePage/>
  },
];

export const adminRoutes = {
  path:'/admin',
  element: (
    <Dashboard/>
  ),
  children: [
    {
      path:'',
      element:<Home/>
    },
    {
      path:'user',
      element:<User/>
    },
    {
      path:'examManage',
      element:<ExamManage/>
    }
  ]
};

function Routes () {

  const context = useAuth();

  if(!context.isLogin){
    return useRoutes(basicRoutes);
  }

  return useRoutes([...basicRoutes, adminRoutes]);
}

const routers = (
  <RecoilRoot>
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  </RecoilRoot>
);

export default routers;
