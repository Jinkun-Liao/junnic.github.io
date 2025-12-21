# 原初中子星冷却示例

> 本文档演示了 Markdown 笔记的渲染、数学公式、代码高亮行号、以及交互式代码单元（JS 与 Python）。

## 数学示例

能量平衡可近似写为：$C_V \, \frac{dT}{dt} = - L_\nu(T)$。

其中中微子冷却光度的一个简化参数化：$$
L_\nu(T) = L_0 \left(\frac{T}{T_0}\right)^n
$$

令 $C_V$ 常数，$n>1$ 并设 $L_0, T_0$ 为常数。

## 普通代码高亮（有行号）

```python
# 这是普通代码块，会显示行号
import math

def cooling_luminosity(T, L0=1e40, T0=1e9, n=6):
    return L0 * (T/T0)**n

Ts = [1e9, 5e8, 1e8]
for T in Ts:
    print(T, cooling_luminosity(T))
```

## 交互式 JS 单元（js-run）

```js-run
// 在下方点击【运行】按钮后执行，并输出到旁边的输出区
function Lnu(T, L0=1e40, T0=1e9, n=6){
  return L0 * Math.pow(T/T0, n);
}
const Ts = [1e9, 5e8, 1e8];
Ts.map(T => ({T, Lnu: Lnu(T)}));
```

## 交互式 Python 单元（py-run）

```py-run
import math

def Lnu(T, L0=1e40, T0=1e9, n=6):
    return L0 * (T/T0)**n

Ts = [1e9, 5e8, 1e8]
[ (T, Lnu(T)) for T in Ts ]
```

## 结构化内容与锚点

### 简介

### 模型设定

### 结果展示

- 支持标题生成目录
- 支持代码复制与语言标签
- 支持数学公式
- 支持交互代码

