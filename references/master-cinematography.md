# 名家运镜库（矩阵驱动 · v0.1 可发布版）

同构 PerfectPhoto `master-cinematography`：**增强基运镜，不是写影评。** 冲突则拦截。

> **搭配使用：** 基础运镜 / 三档意图 / 签名惊艳运镜（螺旋升巡、推拉变焦、前景穿梭等）见 `camera-moves.md`。  
> **规则：** 选 C 档签名 + 大师 → **大师签名优先**，不叠加两条签名运镜。

## 卡字段（强制）

```text
id
signature_moves[]          # 可写进 prompt 的硬描述
enhances_base_moves[]      # 推/拉/摇/移/跟/环绕/手持/固定…
conflicts_with[]           # 导演或运镜
budget_bias                # identity|motion|scene_density 偏好
transition_signature       # 签名转场
prompt_append_templates[]  # 追加短语（可直接贴进 prompt）
forbidden[]
```

## 可用导演卡（8 完整 · 其余 13 候选待补卡）

| 导演 | 签名用法 | 预算偏置 | 增强基运镜 | 冲突 | 追加短语模板 |
|------|----------|----------|------------|------|--------------|
| 希区柯克 | dolly zoom、主观窥视、紧张推近 | identity/motion | 推、固定 | 小津固定 | `slow dolly push toward {subject}, subject's face fills frame, background compresses` |
| 斯皮尔伯格 | 人脸推近揭示、staging oner、地平线权威 | identity | 推、跟、固定 | 韦斯平面化 | `single take, camera slowly approaches face, subject framed against horizon` |
| 迈克尔·贝 | 环绕追、低角速度感、爆炸前压镜（慎用） | motion | 环绕、跟、低角 | 小津、韦斯 | `low-angle orbit around {subject}, fast whip pan between subjects, motion energy` |
| 诺兰 | IMAX 体量、时间压力、实用光冷静 | motion/identity | 固定、推 | 手持晃 | `static wide with deep perspective, practical light, time pressure via slow dolly` |
| 王家卫 | 手持狭廊、广角贴脸、抽帧拖影、门框窥视 | identity | 手持、摇、固定 | 韦斯平面化 | `handheld in narrow corridor, wide-angle close face, slight step-printing motion blur` |
| 库布里克 | 对称中央、单向长走廊、冷静推 | scene/identity | 固定、推 | 随机甩镜 | `centered symmetry, one-point perspective corridor, unidirectional slow push` |
| 韦斯·安德森 | 水平滑轨、平面表格构图、精准横移 | scene_density | 横移、固定 | 手持、环绕 | `horizontal tracking, flat tableau composition, precise lateral move, frontal framing` |
| 姜文 | 手持冲撞、戏剧停顿、烟尘光 | motion | 手持、跟 | 库布里克对称 | `handheld aggressive approach, sudden dramatic hold, dust in volumetric light` |

## 扩展候选（13 · 分期补卡；未补卡前不承诺可用）

张艺谋（色块剧场/tableau）、黑泽明（天气演员/轴线群像）、小津（榻榻米固定低机）、奉俊昊（垂直权力仰俯）、杜可风（广角贴脸霓虹）、斯科塞斯（长跟踪）、卡隆（浸没 oner）、PTA（长镜调度）、伊纳里图（伪一镜多线）、芬奇（匀速精密）、维伦纽瓦（负空间慢推）、塔伦蒂诺（后备箱仰角等）、赖特（特写蒙太奇节奏）、威尔斯（极端深焦低角）、林奇（锁定超现实）。

> ⚠️ 未补卡的导演：**不推荐输出**；用户要求时先提示「该卡待补，建议改用 8 完整卡」。

## 冲突表（增强→拦截）

| 选择 | 用户又要 | 处理 |
|------|----------|------|
| 小津（候选） | 低角高速环绕 | 拦截：改固定/榻榻米 或 换贝/斯皮尔伯格 |
| 韦斯 | 手持剧烈晃 | 拦截：横移平面 或 换姜文/王家卫 |
| 库布里克 | 随机甩镜花活 | 拦截：单向冷静推 |
| 王家卫 | 平面表格构图 | 拦截：狭廊手持 或 换韦斯 |
| 迈克尔·贝 | 长镜静止沉思 | 拦截：降速/换库布里克 |

## 建议卡输出

```text
意图 · 预算主花销 · 模式 A/B/C · 导演主/备 ·
基运镜 → 增强 · 本镜只做一事 · 下一镜合法 delta · 风险
```

## 状态

- v0.1 可发布：**8 完整卡可用**；13 候选仅名单。  
- 完整短语模板 = 追加短语列（可直贴 prompt）；transforms 与多镜覆盖表待 P1.1 补。
- 证据：公开电影摄影常识综合；片例参数为风格化近似，非调色拷贝。
