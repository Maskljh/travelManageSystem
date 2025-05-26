import { useEffect } from "react";
import * as echarts from 'echarts';
import './index.css'

const App = () => {
  useEffect(() => {
    // 初始化三个图表实例
    const chart1 = echarts.init(document.getElementById('main1'));
    const chart2 = echarts.init(document.getElementById('main2'));
    const chart3 = echarts.init(document.getElementById('main3'));

    // 第一个图表的配置
    const option1 = {
      title: {
        text: '柱状图示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    };

    // 第二个图表的配置
    const option2 = {
      title: {
        text: '折线图示例'
      },
      tooltip: {},
      legend: {
        data: ['温度']
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: '温度',
          type: 'line',
          data: [20, 22, 25, 23, 26, 28, 27]
        }
      ]
    };

    // 第三个图表的配置
    const option3 = {
      title: {
        text: '饼图示例'
      },
      tooltip: {},
      legend: {
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    };

    // 设置图表配置
    chart1.setOption(option1);
    chart2.setOption(option2);
    chart3.setOption(option3);

    // 添加窗口大小变化的监听器
    const handleResize = () => {
      chart1.resize();
      chart2.resize();
      chart3.resize();
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      chart1.dispose();
      chart2.dispose();
      chart3.dispose();
    };
  }, []); // 添加空依赖数组

  return (
    <div className="charts-container">
      <div id="main1"></div>
      <div id="main2"></div>
      <div id="main3"></div>
    </div>
  );
};

export default App;