import * as React from "react";
import * as echarts from "echarts";

/**
 * 参数列表
 * key: string; 唯一值
 * option: object | null; 图表数据
 * style: {
 *      width: string; 图表宽度
 *      height: string; 图表高度
 * };
 * className?: string; 图表CSS样式类名称
 * onRender?(instance): void; 图表回调函数返回图表实例
 */

interface ChartProps {
  key: string;
  option: Record<string, unknown> | null;
  style: {
    width: string;
    height: string;
  };
  className?: string;

  onRender?: (instance: React.ReactNode) => void;
}

const Chart = (props: ChartProps): React.ReactElement => {
  // 挂载节点
  const chartDom = React.useRef<any>();
  const instance = React.useRef<any>();
  // 加载状态
  function showLoading(_instance: {
    showLoading: (
      arg0: string,
      arg1: {
        text: string;
        color: string;
        textColor: string;
        maskColor: string;
        zlevel: number;
      }
    ) => void;
  }): void {
    _instance.showLoading("default", {
      text: "",
      color: "#c23531",
      textColor: "#000000",
      maskColor: "rgba(255, 255, 255, 0.8)",
      zlevel: 0,
    });
  }
  // 生命钩子函数
  type Callback = () => void;
  React.useEffect((): Callback => {

    // 获取实例对象
    instance.current =
      echarts.getInstanceByDom(chartDom.current) ||
      echarts.init(chartDom.current);

    // 大小自适应
    const resize = (): void => instance.current.resize();
    window.removeEventListener("resize", resize);
    window.addEventListener("resize", resize);

    // 默认加载状态
    showLoading(instance.current);

    // 销毁并清除状态
    return (): void => {
      echarts.dispose(instance.current);
      window.removeEventListener("resize", resize);
    };
  }, [chartDom]);

  React.useEffect(() => {
    // 默认加载状态
    showLoading(instance.current);

    // 渲染图表
    if (props.option) {
      if (instance.current) {
        instance.current.hideLoading();
        instance.current.setOption(props.option);
      }
    }

    // 回调函数返回实例
    if (props.onRender) props.onRender(instance.current);
  }, [props]);
  // 返回组件
  return (
    <div ref={chartDom} style={props.style} className={props.className}></div>
  );
};

// 导出组件模块
export default Chart;
