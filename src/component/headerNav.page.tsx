import { Menu } from "antd"
import { useLocation } from "react-router";
import { IMenuList } from "../interface";


interface IHeaderNavProps {
  menuList: IMenuList[],
}

export default function HeaderNav(props: IHeaderNavProps) {
  const { menuList } = props;
  const { pathname } = useLocation();
  return (
    <>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[pathname]}
        selectedKeys={[pathname]}
        items={menuList}
      />
    </>
  )
}
