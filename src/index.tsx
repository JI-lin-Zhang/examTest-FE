import "./styles/tailwind.css";
import "antd/dist/antd.min.css";
import routers from "./router";
import * as ReactDOM from 'react-dom/client';

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container as HTMLElement | DocumentFragment);
root.render(routers);
