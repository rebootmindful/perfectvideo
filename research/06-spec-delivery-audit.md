# PerfectVideo — 规格落实审计（逐文件核对）

**审计日期：** 2026-08-06  
**审计对象：** `PERFECTVIDEO-SPEC.md` v0.1.2 + 全部 references / schemas / examples / evals / interface / README  
**方法：** 通读工作区全部 md，SPEC §13 P0/P1/P2 逐项对照实际文件存在性与内容完整性。  
**结论一句话：** **P0 全部落实到文档级；P1 大部分已落地，3 项未做；P2 全部未做（符合设计，属计划内）。** 没有发现「写了没做」的 P0 债，但有 2 处版本漂移已当场修复 + 若干可标注的「半成品」状态。

---

## 1. 逐文件存在性核对

| 路径 | 存在 | 内容完整 | 备注 |
|------|------|----------|------|
| `SKILL.md` | ✅ | ✅ | 0.1.2；U 步流程 + 红线 + S 后台映射 |
| `agents/interface.yaml` | ✅ | ✅ | 0.1.2；intent/triggers/boundaries/evidence |
| `PERFECTVIDEO-SPEC.md` | ✅ | ✅ | 0.1.2 |
| `VERSION` | ✅ | ✅ | 0.1.2 |
| `README.md` | ✅ | ✅ | 0.1.2；问数契约链接 |
| `references/user-facing-flow.md` | ✅ | ✅ | 主交互契约 |
| `references/workflow-s0-s12.md` | ✅ | ✅ | U→S 后台映射 |
| `references/architecture-slots.md` | ✅ | ✅ | 槽位 + 9 铁律 |
| `references/consistency-protocol.md` | ✅ | ✅ | 五层叠甲摘要 |
| `references/compile-modes.md` | ✅ | ✅ | A/B/C + by_tool + 诚实保证 |
| `references/material-constitution.md` | ✅ | ⚠️ 半 | 5 预设框架，缺「全文金样」 |
| `references/master-cinematography.md` | ✅ | ⚠️ 半 | 8 完整卡 + 13 候选名单；短语模板未齐 |
| `references/boundaries-and-qc.md` | ✅ | ✅ | 画面/脚本/交互三层闸门 |
| `references/platform-and-overview.md` | ✅ | ✅ | 双时长 + 平台表 |
| `references/output-contract.md` | ✅ | ✅ | 8 段交付契约 |
| `schemas/visual-bible-lock.md` | ✅ | ✅ | 0.1.2（本次修漂移） |
| `examples/golden-a-single15.md` | ✅ | ✅ | P0 金样 |
| `evals/trigger_cases.json` | ✅ | ✅ | 0.1.2；13 用例含 ux-001 |
| `research/00–05` | ✅ | ✅ | 证据底稿 |
| `scripts/` | ❌ 无 | — | 计划内 P2（diff 校验） |
| `LICENSE` | ❌ 无 | — | yao 可选；README 未声明许可 |

**本次修复：** schema 头部 `v0.1.1 → v0.1.2`（版本漂移）。

---

## 2. SPEC §13 P0 逐项核对

| P0 项 | SPEC 自述 | 实际 | 判定 |
|-------|-----------|------|------|
| 1 范围宣言（艺术导演 + 禁钩子） | ✅ | SPEC §0 + SKILL 红线 + interface.exclusions | ✅ 落实 |
| 2 Lock/Bible 契约 | ✅ | schema + consistency-protocol | ✅ |
| 3 字面量焊接规则 | ✅ | consistency-protocol + boundaries | ✅ |
| 4 材质预设框架 | ✅ | material-constitution 5 预设 | ✅ 框架；全文金样 P1 |
| 5 三模式编译 | ✅ | compile-modes A/B/C | ✅ |
| 6 overview+shotlist+双时长+三轨 | ✅ | output-contract + schema + platform | ✅ |
| 7 generic 主契约诚实化 | ✅ | compile-modes 保证边界 | ✅ |
| 8 golden A 示例 | ✅ | examples/golden-a-single15.md | ✅ |
| 9 用户问数契约 U0–U6 | ✅ | user-facing-flow + SKILL | ✅ |
| 10 SKILL 运行时执行 | 文档级 | agent 遵守；无脚本闸门 | ⚠️ 运行时未实测 |

**P0 无欠账。** 唯一悬而未决：运行时有效性 = missing evidence（SPEC 已诚实标注）。

---

## 3. P1 逐项核对（4 项已落 / 3 项未做）

| P1 项 | 实际状态 | 判定 |
|-------|----------|------|
| by_tool 深适配 | compile-modes 有轻适配要点表；无 seedance/kling/MJ 完整金样 | ⚠️ 半落 |
| 名家短语库齐套 | 8 卡签名可编码；冲突表 3 例；短语模板/transforms 未齐 | ⚠️ 半落 |
| VO 与画面同步细则 | output-contract 有情绪/节奏标注；无专项「VO≠抢画」细则文件 | ⚠️ 半落 |
| bridge 导入（Photo→Video） | schema 有字段映射注释级；无正式导入流程 | ⚠️ 半落 |
| negative 题材包 | material 有 forbidden；**无按题材负面包文件**（奇观/真人/产品） | ❌ 未做 |
| 平台/模型硬约束表 | platform 表有；**无按模型（Seedance/可灵）字数千帧限制表** | ❌ 未做 |
| 视频向 anti-slop 词表 | boundaries 有原则；**无具体禁词清单文件** | ❌ 未做 |

**3 项明确未做：** negative 题材包 · 模型硬约束表 · anti-slop 词表。

---

## 4. P2 逐项核对（全部未做，计划内）

| P2 项 | 状态 |
|-------|------|
| scripts/lock_diff.py | ❌ 未做（文档闸门代偿） |
| 真链实测漂移清单 | ❌ 未做（missing evidence 自认） |
| auvideo handoff schema | ❌ 未做 |
| 拒稿话术库 | ❌ 未做（boundaries 有原则，无话术库） |
| evals 全套（blind/打包/governance） | ❌ 未做（yao §9.2 明确 P0 不做） |

---

## 5. 三处「写了没完全落实」的半成品（建议下轮处理）

1. **名家库「≥16」vs 实际 8 卡**  
   SPEC §7.1 写「库规模目标 ≥16 导演卡」；文件实际只有 8 完整卡 + 13 候选名单（无卡）。  
   **风险：** README/触发面会让用户以为 16 位可用。  
   **建议：** 状态写明「8 可用 / 16 目标 / 候选 13 待补卡」，避免过度承诺。

2. **材质宪法 5 预设是「框架」不是「金样」**  
   每个预设约 4 条要点，缺流体雕塑样本级别的**全文 Constitution 段**。  
   **建议：** P1 每个预设补一段可直接焊接的 `material.constitution` 全文（10–20 行）。

3. **negative 题材包 / anti-slop 词表缺失**  
   QC 闸门引用它们但文件不存在——**闸门指向空**。  
   **建议：** 新增 `references/negative-packs.md`（奇观/真人/产品/对白 4 包 + 通用禁词）。

---

## 6. 一致性抽查（跨文件同构）

| 检查点 | 结果 |
|--------|------|
| 版本 0.1.2 全链路（VERSION/SKILL/SPEC/interface/evals/README/schema） | ✅ 已统一（本次修 schema） |
| U 步契约：SKILL ↔ user-facing-flow ↔ SPEC §4 ↔ QC 交互闸门 | ✅ 一致 |
| 红线：SKILL ↔ SPEC §1.3 ↔ interface.exclusions ↔ evals neg-005 | ✅ 一致 |
| 双时长：SPEC ↔ platform ↔ schema ↔ compile-modes ↔ golden | ✅ 一致 |
| 三轨音频：SPEC §10 ↔ schema ↔ output-contract | ✅ 一致 |
| 保真措辞：SPEC §8.1 ↔ compile-modes 保证边界 | ✅ 一致 |
| golden 与 schema/QC 对齐（visual/N/A/no CTA） | ✅ 一致 |
| 金样不被误发现（examples 不叫 SKILL.md） | ✅ |

---

## 7. 结论与下一步建议

**审计结论：**  
- P0 文档级全部落实；无 P0 债  
- P1 完成 4/7；未做 3 项（negative 包、模型硬约束表、anti-slop 词表）  
- P2 全部未做（计划内）  
- 已修复 1 处版本漂移（schema 0.1.1→0.1.2）

**建议下一步（按性价比）：**

| 优先级 | 动作 | 产出 |
|--------|------|------|
| P1-1 | 补 `references/negative-packs.md` | 4 题材包 + 通用禁词（QC 指向不再落空） |
| P1-2 | 材质宪法补全文金样段 | 5 段可焊接 constitution |
| P1-3 | 名家库 8 卡补短语模板 + 状态行 | 消除「16 可用」错觉 |
| P1-4 | 模型硬约束表（Seedance/可灵 15s 上限、帧率、字数千帧） | 防平台翻车 |
| P2-1 | scripts/lock_diff.py | diff 闸门脚本化 |
| 实测 | 装 `~/.workbuddy/skills` 真跑 2 条对话（visual / vo） | 运行时证据从 missing → 可引用 |

---

## 8. 二次复核（0.2.0 发布前 · 2026-08-06 22:1x）

P1 三缺已全部补齐并落地为文件：

| 原缺口 | 新落点 | 状态 |
|--------|--------|------|
| negative 题材包 + anti-slop 词表 | `references/negative-packs.md` | ✅ |
| 模型/平台硬约束表 | `references/model-constraints.md` | ✅ |
| 材质宪法全文金样（5 套可焊接） | `references/material-constitution.md` | ✅ |
| 名家 8 卡短语模板 + 冲突表 + 状态行 | `references/master-cinematography.md` | ✅ |
| VO 与画面同步细则 | `references/voiceover-sync.md` | ✅ |
| SPEC §13 P1 标记为已落实；包树更新 | `PERFECTVIDEO-SPEC.md` | ✅ |
| 版本全链路 0.2.0 | VERSION/SKILL/interface/README/SPEC | ✅ |

### 发布就绪检查（0.2.0）

- [x] `SKILL.md` 唯一入口 · lean + references 下沉  
- [x] `agents/interface.yaml` 中立元数据  
- [x] 触发面 + 排除边界（evals 13 用例）  
- [x] 输出契约：overview/shotlist/lock/primary/QC/footer  
- [x] 金样非 `SKILL.md`（避免误发现）  
- [x] 红线贯穿（禁钩子 CTA）  
- [x] 承诺诚实（generic 主契约 + missing evidence 标注）  
- [x] 全链路版本一致 0.2.0  
- [ ] **发布前最后一关：装 `~/.workbuddy/skills` 真跑 visual + vo 各一条**（当前运行时证据仍 missing）  

### 遗留（发布后迭代 · 非阻塞）

- scripts/lock_diff.py（P2）  
- by_tool 深适配金样（P2）  
- bridge 正式导入流程（P2）  
- 真链漂移实测（P2）  
- auvideo handoff schema（P2）
