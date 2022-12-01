import { Breadcrumb, Layout } from "antd";
import { Content, Footer, Header } from "antd/lib/layout/layout";
import { Outlet, useLocation, useNavigate } from "react-router";
import { IMenuList } from "../../interface";
import HeaderNav from "../../component/headerNav.page";
import { COMPANY_NAME } from "../../constants/common";
import { Link } from "react-router-dom";

const breadcrumbNameMap: Record<string, string> = {
  "/admin": "Admin",
  "/admin/user": "User",
  "/admin/examManage": "ExamManage",
};

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });

  const breadcrumbItems = [<Breadcrumb.Item key="home"></Breadcrumb.Item>].concat(extraBreadcrumbItems);

  const menuList: IMenuList[] = [
    {
      key: "/admin",
      label: "首页",
      onClick: () => {
        navigate("/admin");
      },
    },
    {
      key: "/admin/user",
      label: "用户管理",
      onClick: () => {
        navigate("/admin/user");
      },
    },
    {
      key: "/admin/examManage",
      label: "试题管理",
      onClick: () => {
        navigate("/admin/examManage");
      },
    },
  ];
  return (
    <div className="h-full">
      <Layout className="h-auto min-h-full">
        <Header>
          <HeaderNav menuList={menuList} />
        </Header>
        <Content className="px-10 overflow-y-auto">
          <Breadcrumb className="my-5" separator='>'>{breadcrumbItems}</Breadcrumb>
          <div className="bg-white">
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>{COMPANY_NAME}</Footer>
      </Layout>
    </div>
  );
}

export default Dashboard;
