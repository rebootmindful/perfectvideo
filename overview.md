# PerfectVideo — 发布状态板

> 对内状态板（对外门面见 README.md）。地图与地形同构：本文件随版本同步。

## 当前版本

- **0.3.0-scaffold**（VERSION / SKILL / README / evals 全链路一致）
- maturity: scaffold（核心闭环已验证；正式发版前复核 beta/stable）

## 定位

AI 视频唯一带锁的导演 OS：**跨镜不漂、合同自洽、真机可验。**
护城河三件：① 跨镜字面量焊接 + 首尾帧双锚（连戏 90→99%）② 出稿前七维逻辑审核 ③ NextShot 方向门禁。

## 已闭环

- 唯一 SKILL.md 入口 · lean + 29 references
- interface.yaml 触发面 + 排除边界（17 evals 用例）
- 输出契约（overview / shotlist / lock / primary / QC / footer）
- 红线 8 条贯穿（禁钩子 CTA）
- 承诺诚实（generic 主契约 + missing evidence）
- README 对齐：showcase 图已嵌、版本号同步、"证据在本地"声明、A0 编译器脚本注明
- 活体证据：18 真机 MP4（`outputs/`，gitignore 排除）· 江南两镜 29s（2026-08-09）

## 当前卡点（P1）

- **活体证据不在仓库可见层**：`outputs/` 被 gitignore，GitHub 访客看不到最强卖点。
  → 解法：提交 1 个精简 sample 成片进 `examples/showcase/` 并直链 README（进行中）

## 关键文件

- `PERFECTVIDEO-SPEC.md`（总规格）· `SKILL.md`（入口）
- `references/`（29 细则）· `schemas/visual-bible-lock.md`（Lock 字段契约）
- `examples/showcase/`（真机预览图 + sample 成片）
- `research/12-luban-audit-2026-08-09.md`（最新审计 · 93 分）

## 历史快照

- **0.2.0**：补齐审计 P1 三缺（negative-packs / model-constraints / voiceover-sync）+ 金样升级 → 见 `research/06-spec-delivery-audit.md`
- **0.2.9**：README 对齐落地（showcase 嵌图 / evals 版本号 / 证据声明 / scripts 注明）→ 见 `research/12-luban-audit-2026-08-09.md`
- **0.3.0**：A0 SinglePass 编译模式 + 自动编译器脚本 + 全链路同构审核修复（版本统一 / interface.yaml 补全 / outputs 工作空间清理）
