# PerfectVideo 规格体检报告（research/08 · 2026-08-07）

**审计对象：** 全包 36 文件（SKILL / SPEC / 18 refs / schema / 2 examples / evals / interface / README / overview / VERSION）  
**方法：** 断链扫描 + 版本一致性 + 四件套覆盖矩阵 + evals 覆盖度  
**结论一句话：** **版本漂移 1 处；四件套「造好零件没装机」——schema/编译/交付/流程/模型约束 5 处未接入。**

---

## 1. ✅ 健康项（无需动）

| 检查 | 结果 |
|------|------|
| SKILL.md 引用 18 refs | ✅ 全部存在，无断链 |
| SPEC 引用 | ✅ 全部存在 |
| 版本一致性（VERSION/SKILL/interface/evals） | ✅ 0.2.0 |
| 包结构（yao 合规） | ✅ 唯一 SKILL.md 入口 |
| 金样命名（非 SKILL.md） | ✅ |

---

## 2. ❌ 发现的问题（按严重度排序）

### P0-1 版本漂移：内容已 0.2.1+，版本仍 0.2.0
- 实际内容：camera-moves + 四件套（native-audio/frame-reference/micro-motion/light-phase）已并入
- VERSION / SKILL / interface / README / overview 全部仍写 0.2.0
- **风险：** 用户/生态按版本号判断能力，会以为四件套不存在

### P0-2 四件套未接入核心链路（最严重）
| 文件 | 现状 | 应为 |
|------|------|------|
| `schemas/visual-bible-lock.md` | **0 命中**（无四件套字段） | 加 native_audio / light_phase / micro_motion / frame_ref |
| `references/workflow-s0-s12.md` | **0 命中** | S10 段加真声轨/微动/光相位 |
| `references/output-contract.md` | **0 命中** | 交付块加四件套 |
| `references/compile-modes.md` | **0 命中** | by_tool 加 H3 native audio / 首尾帧合同 |
| `references/model-constraints.md` | **0 命中** | 加 H3 native audio / Kling 3.0 能力 |
| `references/architecture-slots.md` | 1 命中（仅旧 light.timeline） | 加 native/micro 槽位 |

**根因：** 四件套是「孤立 refs」，SKILL/SPEC 只加了引用清单，但**编译产出、schema 字段、后台流程**没接。

### P1-1 evals 缺四件套触发用例
- 14 用例无 native audio / 微动 / 光相位 / 首尾帧触发
- **风险：** agent 不知道何时该启用四件套

### P1-2 SKILL 触发词缺四件套
- description 触发词无「真声/微动/光相位/首尾帧」

### P1-3 golden-b 四件套应用不完整
- 仅 4 处提及，未用新语法（真声轨/光相位/微动段）

### P2 README/overview 未提四件套
- 文档滞后于能力

---

## 3. 修复清单（本次执行）

- [x] VERSION → 0.2.1 + SKILL/interface/README 同步
- [x] schema 加四件套字段
- [x] workflow-s0-s12 加四件套步骤
- [x] output-contract 加四件套交付块
- [x] compile-modes 加 H3 native audio / 首尾帧
- [x] model-constraints 加 H3/Kling3 能力
- [x] architecture-slots 加槽位
- [x] evals 加 4 触发用例
- [x] SKILL 触发词扩展
- [x] golden-b 应用四件套语法

---

## 4. 结论

> 四件套是 skill 的「惊艳弹药」，但此前只造了仓库没上膛。  
> 本轮把弹药装进所有枪管（schema/编译/交付/流程/模型约束/触发），skill 从「有能力的文档」变成「会用能力的机器」。
