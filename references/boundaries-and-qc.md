# 边界与 QC 闸门

## 产品边界

| 做 | 不做 |
|----|------|
| 艺术导演对话、Bible、时间码、分镜表、overview | 批量 API 执行 |
| NextShot 连戏 | URL 复刻 |
| generic/多工具画面提示词 | 运镜词库大全 |
| 可选艺术旁白/字幕 | **钩子 / CTA / 带货逼单文案** |
| 材质宪法 / 群像舞台 | 静帧写真主循环（PerfectPhoto） |

## 画面/连戏闸门

- [ ] Bible 冻结，`bible_version` 已记  
- [ ] LOCK 与上一镜字符级一致（首镜除外）  
- [ ] 无「同上/略/同前」  
- [ ] 未混写一镜到底 与 `Shot N:`  
- [ ] 主花销唯一  
- [ ] beats 密度合理（约 2–3s 一焦点）  
- [ ] 帽饰独立；道具有归属  
- [ ] spatial key_elements 未丢  
- [ ] diegetic_audio ≥2（可弱）  
- [ ] 负面包：题材包已选并焊接进【负面】段（`references/negative-packs.md`）  
- [ ] anti-slop：通用禁词必带（`references/negative-packs.md`）  

## 运镜闸门（camera-moves 联动）

- [ ] **单主运镜**：1 基础 + 1 签名（未叠加 2 个签名）  
- [ ] 签名运镜：度数/高度/次数**写死**（如 `180°` `1.5m` `1 次完整路径`）  
- [ ] C 档签名 ↔ 预算：`identity` 预算未放行 C 档；`motion` 才允许强签名  
- [ ] C 档 + 大师：**大师签名优先**，未叠加两条签名  
- [ ] 时间码节拍与运镜分段对齐（如 0-5s 缓推→5-10s 环绕→10-15s 落幅抬升）  
- [ ] 运镜词带速度（`slow/fast/gentle`），无裸 `camera moves`  
- [ ] 组合命中安全表，未命中危险组合（cliptrend）

## 惊艳四件套闸门（P1.5）

**C 真声轨（`native-audio.md`）：**
- [ ] 真声轨存在（基底 + 事件 + 情绪 ≥2 层）；事件声与节拍对齐
- [ ] 无「BGM/配乐」字样；声数克制（2–4 个）；native audio 模型必用真声轨

**B 首尾帧/参考图（`frame-reference-contract.md`）：**
- [ ] 参考方案声明（A 首尾帧 / B 多参考图 / 无）
- [ ] `@人物` 与 `@环境` 分离未混传；文字锁未因参考图省略
- [ ] NextShot 链：上镜尾帧 = 下镜首帧
- [ ] **@槽位绑定已声明**（有参考图时）；槽位名全局唯一；prompt 引用与槽位一致
- [ ] **素材准备清单已给**（`asset-checklist.md`）；用户无素材已标注纯文生降级

**D 微动节拍（`micro-motion.md`）：**
- [ ] 每拍 ≤1 事件型微动；微动在「画面」段、运镜在「运镜」段未混写
- [ ] 微动物理化（无「有质感/生动」空转词）；事件微动与主运镜未同拍爆发

**E 光相位（`light-phase.md`）：**
- [ ] 光相位 3 段（基线/变奏/落幅）；单向推进未回跳
- [ ] 光动物理化；无硬闪/无跳变/无无来源光

**景别地基（`shot-scale.md`）：**
- [ ] 每拍 `scale` 已填（EWS/LS/FS/MS/MCU/CU/ECU）
- [ ] 景别弧线单向或 V 型，无乱跳
- [ ] 景别与运镜联动（近景无大环绕、大远景无手持）

**执行度对账（`post-shot-review.md`）：**
- [ ] 真机后对账已填（task_id 记录）；执行度 <3/5 已切逐拍或降级
- [ ] 下镜 prompt 已按对账修正（未带旧 prompt 继续）

## 脚本层闸门（P0）

- [ ] `video_overview` 齐全（title/platform/aspect/双时长/style/audience/path/no_cta）  
- [ ] model vs target 逻辑：target>model ⇒ chain，无超长单提示词幻觉  
- [ ] aspect 与 lock/prompt 一致  
- [ ] shotlist 非空；时间码可理解、可加总  
- [ ] path.visual ⇒ VO/字幕 N/A；path.vo ⇒ 二者非空  
- [ ] **CTA/钩子扫描通过**（禁：关注、点赞、看到最后、链接在简介、赶快抢 等）  
- [ ] `prompts.primary` 非空  
- [ ] 若声明 by_tool，pending 须标明  
- [ ] footer 复核提示已附  
- [ ] negative 包 = 基础包 + 题材包（见 `references/negative-packs.md`）  
- [ ] anti-slop 扫描命中 <2（词表同 negative-packs §5）  

## 交互闸门（U 步契约）

- [ ] 全程只出现 U0–U6 / 冻结 / U+（旁白）/ NextShot delta 类提问  
- [ ] **未**把 S5 预算 / S6 模式 / S8 morph / S10 光声 单独问出口  
- [ ] 首片交付前「等待用户回答」轮数 ≤10；超过已用默认出锁定卡  
- [ ] 开场预告过问数（约 7～8）  
- [ ] 意图编译未做成逐维勾选问卷  
- [ ] U1 规格为打包一问；U3 ≤2 轮；U5 未逐秒逼问  

## Invariant 用户改动

| 请求 | 动作 |
|------|------|
| 换装/帽/脸/道具外观 | 🚫 或 bible_update |
| 换场景 | 断链 |
| 换材质 | 断链 |
| 要钩子/CTA | 🚫 红线说明 |
| 合法景别运镜动作 | ✅ delta |

## 声明纪律

- maturity: scaffold  
- runtime: missing_evidence  
- 禁止 world-class / 万能直贴完成声明  

## 失败话术

指明铁律 + 1–2 最小修复（减拍 / 改 C / 降密度 / 补锁 / 去掉 CTA 要求）。
