# 交互式示例：滑块与图形

> 本笔记展示滑块参数、Plotly 图表、可折叠练习等交互组件。

## 滑块控制（JS）

```js-run
// 使用 RUN_CTX 创建滑块并动态更新输出
const container = RUN_CTX.out; // 输出区域作为容器
container.innerHTML = '';
const label = document.createElement('div');
label.textContent = 'n（幂指数） = 6';
const slider = document.createElement('input');
slider.type = 'range';
slider.min = '1';
slider.max = '10';
slider.value = '6';
slider.oninput = () => {
  label.textContent = `n（幂指数） = ${slider.value}`;
};
container.append(label, slider);
```

## Plotly 图表（JS）

```js-run
// 加载中提示 + 绘制图表
RUN_CTX.out.textContent = 'Loading Plotly…';
async function ensurePlotly(){
  if(!window.Plotly){
    await new Promise(resolve => {
      const s = document.createElement('script');
      s.src = 'https://cdn.plot.ly/plotly-2.27.0.min.js';
      s.onload = resolve;
      s.onerror = resolve; // 宽容处理，避免卡住
      document.body.appendChild(s);
    });
  }
}
await ensurePlotly();
RUN_CTX.out.textContent = 'Rendering chart…';
const el = document.createElement('div');
RUN_CTX.out.innerHTML = '';
RUN_CTX.out.appendChild(el);
const x = [1e9, 5e8, 1e8];
const y = x.map(T => 1e40 * Math.pow(T/1e9, 6));
await Plotly.newPlot(el, [{x, y, mode:'lines+markers', name:'Lnu'}], {title:'Neutrino Cooling Luminosity', margin:{t:30}});
'Plotly chart ready';
```

## 可折叠练习

<details>
  <summary>练习：推导温度随时间衰减的幂律近似</summary>
  <p>提示：对 $C_V \, dT/dt = - L_\nu(T)$ 使用分离变量，设 $L_\nu = L_0 (T/T_0)^n$。</p>
</details>
