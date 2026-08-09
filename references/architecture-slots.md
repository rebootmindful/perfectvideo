# 架构槽位（题材无关）

样本「流体雕塑」只教槽位与顺序。

## 槽位表

| 字段 | 含义 | 冻结 |
|------|------|------|
| `video_overview.*` | 标题/平台/画幅/双时长/受众/风格/path | S0 末 |
| `world.summary` | 世界一句话 | S1 |
| `world.elements[]` | 场景砖 | S1 |
| `world.laws[]` | 法则 | S1 |
| `material.constitution` | 材质宪法 | **S2** |
| `rhythm.meta` | 呼吸元 | S2–S4 |
| `stage.composition` / `blocking[]` | 舞台 | S4 |
| `timeline.beats[]` | 时间码事件 | S7 |
| `timeline.morph_chain` | 材质转化 | S8 |
| `world.environment_motion` | 世界驱动 | S8 |
| `camera.contract` | 运镜（含签名/组合） | S9 |
| `lighting.timeline[]` | 光相位 | S10 |
| `light_phase` | base→variation→resolve 单向演进（E） | S10 |
| `diegetic_audio.anchors[]` | 画面内声文字锚（老模型） | S10 |
| `diegetic_audio.native_*` | 真声轨三幕（H3/Kling3，C） | S10 |
| `micro_motion.beats[]` | 微动节拍（每拍≤1，D） | S10 |
| `frame_ref.scheme` | 首尾帧/多参考图方案（B） | S9–S10 |
| `voiceover[]` | 旁白（path.vo） | S10 |
| `subtitles[]` | 字幕（path.vo） | S10 |
| `rhythm.rules` | 节奏禁区 | S10 |
| `tech.spec` | 可降权 | 编译 |
| `negatives.pack` | 负面 | 编译 |
| `shotlist[]` | 分镜交付表 | S7 写 / S11 定 |

## 铁律

1. 先宪法后动作  
2. 统一材质语言优先  
3. 焦点接力  
4. 世界可驱动  
5. 运镜合同不混  
6. 节奏禁区同权  
7. **diegetic ≠ voiceover ≠ subtitles**；真声轨三幕（native_scene/event/emotion）  
8. **model_clip ≠ target_edit**  
9. **无 CTA 结构驱动**  
10. **惊艳四件套**：真声轨 · 首尾帧/参考图 · 微动节拍 · 光相位（静默代填，不占问数）  
