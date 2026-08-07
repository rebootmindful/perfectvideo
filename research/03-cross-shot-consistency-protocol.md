# PerfectVideo 跨镜一致性协议

**日期：** 2026-08-06  
**问题：** 如何保证人物、衣服/帽子、道具、环境、氛围、物品等到下一 shot 仍一致——像 PerfectPhoto / NextShot 那样？  
**答案一句话：**  
**不靠模型记忆，靠「Visual Bible 冻结 + 字面量焊接 + 变体白名单 + 出镜 diff 拦截 + 参考图双锚 + 断链显式」。**

---

## 0. PerfectPhoto 已经验过什么

| 机制 | PerfectPhoto / NextShot 怎么做 | 结果 |
|------|--------------------------------|------|
| 人物锁定 | 脸/妆/服抽成「身份证」，每个变体**整块字面量植入**，禁止写「同上」 | 组图衣服色不漂 |
| NextShot 锁定域 | `character / clothing / products / atmosphere / imaging / lighting` 每镜复制 | 跨镜身份稳定 |
| 字面量焊接 | 输出前**字符级 diff**，不一致就拦截改回 | Agent 偷懒简化会被抓 |
| 变体隔离 | 只改景别/机位/运镜/动作/前景，变体 ≤15% 字数 | 不会顺手改衣服 |
| Invariant 拦截 | 「换成红衣服」→ 禁止或确认更新锁定域 | 用户改锁定有意识 |
| 背景陷阱 | `lock.scene` **禁止简化**（实战：三桌客人消失） | 环境细节不丢 |
| 道具归属 | `character_props` 绑到人（女侠双刀，不是「场景有两把刀」） | 道具不漂移到别人手 |
| 参考图定位 | 参考图 = 风格锚，**不是细节锁**；细节仍靠文本 | 传参考仍要全文锁定 |
| 图片链 | 上镜尾帧图 → 本镜参考 / 视频首帧 | 视觉连续 |

PerfectVideo **完整继承这套**，再扩展视频专属层（材质宪法、世界锁、15s 链式、首尾帧）。

---

## 1. 一致性分层模型（五层叠加）

跨镜一致不是单一技巧，是五层叠甲：

```
L1 Visual Bible（镜前冻结）     ← 生产中途禁止重生
L2 Literal Weld（字面量焊接）   ← 每镜拷贝，禁止「同上/略」
L3 Delta Whitelist（变体白名单） ← 只准动这几项
L4 Visual Anchor（视觉双锚）     ← 文本锁 + 参考图/尾帧
L5 Runtime QC（出镜闸门）        ← diff / 归属 / 比例 / 预算
```

缺一层都会漂。最常见翻车：

- 只有 L4 参考图、没有 L2 文本 → 帽子/纹样仍漂  
- 只有 L2、Agent 擅自摘要场景 → 背景人消失  
- 允许改动作时顺带改衣服描述 → 锁定域被污染  

---

## 2. L1 · Visual Bible（镜前冻结）

### 2.1 开拍前必须锁定的 Bible 条目

| Bible 条目 | 字段 | 内容要求 | 可变性 |
|------------|------|----------|--------|
| 人物身份 | `lock.characters[]` | 脸型气质、发型、妆锚、体态、**明确成年**；可选 identity_anchors（痣、耳坠） | 不可改（断链除外） |
| 服装/帽饰 | `lock.wardrobe[]` | 上衣/下装/外套/鞋 + **帽子/头饰单独字段** + 颜色材质 | 外观不可改；褶皱状态可随动作 |
| 持有道具 | `lock.character_props[]` | **归属到人**：谁持什么、持法/默认态 | 位置/开合随动作；颜色花纹不可改 |
| 场景道具 | `lock.props[]` | 独立物件外观 + 默认位置 | 位置可动；外观锁定 |
| 环境空间 | `lock.spatial` | 完整场景原文（三层+关键元素列表），`key_elements[].anchor=true` | **禁止简化** |
| 材质宪法 | `lock.material` | 全片统一材质语言（PerfectVideo 扩展） | 全局锁 |
| 氛围 | `lock.atmosphere` | 色调/颗粒/情绪基线一句 | 不可改 |
| 成像 | `lock.imaging` | 设备/胶片/CG 背书 | 不可改 |
| 光线基线 | `lock.lighting` | 主光方向、色温、光比基线 | 基线锁；时间线可在「仍由同一动机光源」内相位变化 |
| 色彩命题 | `lock.color` | 主色域 / 次色域 / 唯一强调色 | 不可改（强调色物体必须在 props 里） |

### 2.2 冻结仪式（同构 PerfectPhoto 人物锁定）

1. 组装 Bible → 给用户看「结构化锁定卡」  
2. 用户确认 / 微调  
3. 一旦确认：  
   - 写入 `ProjectState.bible_version`  
   - **任何生成不再重新描写**这些字段，只允许从 Bible **整段拷贝**  
4. 中途想变好看 → 默认拒绝；要么本镜后 `break_chain`，要么显式 `bible_update` + 全后续重基线  

**禁止：** 每镜重新「发挥」人物外貌描述（attention drift 的根源）。

---

## 3. L2 · 字面量焊接（Literal Weld）

### 3.1 规则

每输出一镜 prompt（静帧或视频）：

1. 从 `NextShotContext.lock.*` **整段复制**进模板  
2. **禁止**写「同上」「同前」「略」「延续上一镜人物」  
3. 场景 `lock.spatial.full_text` 再长也全文拷贝（PerfectPhoto 背景陷阱）  
4. 帽子不在 clothing 里糊一句 → 必须有独立 token，例如：  
   `帽饰：米色宽檐草帽，帽带米白棉绳，无logo`  
   每镜原样出现  

### 3.2 焊接模板（每镜开头固定）

```text
【锁定域 · 与 Shot {N-1} 字符级一致 · 禁止改写】
人物：{lock.characters 全文}
服装：{lock.wardrobe 全文}
帽饰：{lock.hat 全文或并入 wardrobe 的 hat 字段}
人物道具：{lock.character_props 全文 · 含归属}
场景道具：{lock.props 外观全文}
环境：{lock.spatial.full_text 全文 · 禁止摘要}
材质宪法：{lock.material 全文}
氛围：{lock.atmosphere}
成像：{lock.imaging}
光线基线：{lock.lighting}
色彩命题：{lock.color}

【变体域 · 仅允许下列字段变化】
景别 / 机位 / 运镜 / 动作焦点 / 前景遮挡 / 本镜 morph 相位 / 声画瞬时事件
```

### 3.3 输出后 diff（硬闸）

```
for field in LOCK_FIELDS:
  if prompt.lock[field] != previous.lock[field]:  # 字符级
    BLOCK → 回写 previous 版本再交付
```

Agent **不得**因「太长」删环境句。可压缩只发生在 `compile.mode=compact` 的**专门编译器**，且 compact 版仍须保留：人物+衣帽+道具 ID 外观+环境 key_elements 列表。

---

## 4. L3 · 变体白名单（Delta Whitelist）

### 4.1 默认可变

| Delta | 允许 | 不允许顺带改 |
|-------|------|----------------|
| 景别 | ✅ | 衣服颜色 |
| 机位 | ✅ | 脸型 |
| 运镜 | ✅ | 材质宪法 |
| 动作 | ✅ 身体逻辑 / 道具互动 | 道具外观（蓝纹变红纹） |
| 前景 | ✅ 临时遮挡 | 永久改变环境 key_elements |
| morph 相位 | ✅ 若 Bible 允许世界/材质演化 | 随机换材质系统 |
| 瞬时光效 | ⚠️ 仅同一光源动机内的相位 | 换一套主光方案 |

### 4.2 位置 vs 外观（道具铁律）

| 属性 | 规则 |
|------|------|
| 外观（色/花纹/材质/logo） | 锁定域，Invariant |
| 位置 / 开合 / 被谁持有 | 可随 `action` 变，但必须写在动作句，且 `products[].interaction` 更新 |
| 归属 | `女侠：双刀` 绑定人；禁止「场景中有两把刀」 |

### 4.3 环境：两种锁，勿混

| 模式 | 环境怎么锁 | 何时用 |
|------|------------|--------|
| **同场景连戏** | `lock.spatial` 全文不变；只改景别看到的裁切 | NextShot 默认 |
| **切场景** | **断链**或新 bible.setting；不是改一句背景 | 用户明确换空间 |

「从书房推到阳台」≠ delta.background —— 走 Invariant 评估 → 断链 / 新 setting 板。

---

## 5. L4 · 视觉双锚（文本锁 + 图/帧）

### 5.1 参考图角色分离（seedance 式）

| 角色 | 用途 | 不做什么 |
|------|------|----------|
| Identity ref `@人` | 脸/发型/衣帽整体锚 | 不推断「这镜可以换装」 |
| Prop ref `@物` | 产品/帽子/关键道具外观 | 不替代文本归属句 |
| Environment ref `@景` | 空间结构/主光 | 不自动带上上一镜临时道具位移 |
| Start frame | 上镜尾帧 = 本镜视频起点 | 不是细节锁定的唯一来源 |
| End frame（可选 FLF） | 尾状态 | 中间仍靠 lock 文本 |

**硬规则（PerfectPhoto 实战）：**  
> 参考图 ≠ 细节锁。传了首帧/参考，**锁定域文本仍须逐字完整。**

### 5.2 视频生成推荐链路

```
Bible 定稿
  → Shot0 静帧（可选 Identity/Env/Prop 多参考）
  → Shot0 视频（首帧=静帧）
  → 导出尾帧
  → Shot1 静帧（参考=Shot0 尾帧 + Identity 原图，勿用退化输出当唯一身份）
  → Shot1 视频（首帧=Shot0 尾帧 或 Shot1 静帧）
  → …
```

**每 2–3 镜用原始 Identity 再锚定一次**（seedance allocation：系列链式会漂，要 re-anchor）。

### 5.3 图片链断了怎么办

| 状态 | 行为 |
|------|------|
| 有上镜图 | 必须作参考 + 文本锁双开 |
| 无上镜图 | ⚠️ 提示「仅文本锁，一致性变弱」；不阻塞推导 |
| 用户禁用参考 | 尊重；仍强制文本锁 + diff |

---

## 6. L5 · Runtime QC（交付前闸门）

合并 PerfectPhoto 8 检 + 视频扩展：

| # | 检查 | 失败动作 |
|---|------|----------|
| 1 | 锁定域 vs 上镜 **字符级 diff** | 拦截回写 |
| 2 | `key_elements` 凡 `anchor:true` 均出现 | 补全 |
| 3 | `identity_anchors` 全出现 | 补全 |
| 4 | `character_props` 归属句全在 | 补全 |
| 5 | 帽饰字段存在且未被省略 | 补全 |
| 6 | 变体仅白名单字段 | 删除非法改写 |
| 7 | 变体字数比 ≤15%（静帧）/ 视频侧 lock 段不被压扁 | 警告或重编 |
| 8 | 动作中的 `@prop_id` 均在 Bible | 拦截 |
| 9 | 运镜与光线副作用已映射确认 | 追问或标注 |
| 10 | budget：本镜未同时强要完美脸+大动作+密世界 | 拆镜建议 |
| 11 | 无「同上」类偷懒词 | 展开为字面量 |
| 12 | anti-slop：无 cinematic/氛围感空词 | 删改 |

---

## 7. Invariant 拦截话术表（扩展帽/环境/材质）

| 用户说 | 处理 | 话术要点 |
|--------|------|----------|
| 帽子换成黑色贝雷 | 🚫 | 帽饰在锁定域；确认则 bible 更新+后续全改 |
| 衣服改红 | 🚫 | 同 NextShot 服装拦截 |
| 换脸 | 🚫 | 建议断链新方案 |
| 道具换色 | 🚫 | 外观锁；可改握法/位置 |
| 背景换阳台 | ⚠️ | 新场景→断链或新 setting |
| 改光线风格 | ⚠️ | lighting 基线锁；确认重定基线 |
| 换材质体系（流体→机械） | 🚫 | material 宪法级；必须断链 |
| 人手里多把刀 | ⚠️ | 查 character_props；新增要入 Bible |
| 环境少写两句省字 | 🚫 | 禁止简化 anchor 环境 |

---

## 8. PerfectVideo Context 数据结构（跨镜唯一真相源）

```yaml
# ProjectState — 跨会话/跨镜真相源
bible_version: "v1"
lock:
  characters:
    - id: heroine
      text: "瓜子脸，清冷气质，明确成年，黑色齐肩直发，清透裸妆"
      identity_anchors:
        - "左眉尾小痣"
  wardrobe:
    - char: heroine
      text: "白色真丝衬衫，深灰高腰阔腿裤，简约银链"
      hat: "米色宽檐草帽，帽带米白棉绳，无logo"   # 帽子独立
  character_props:
    - char: heroine
      props: "右手提竹篮，篮内白雏菊"
  props:
    - id: coffee_cup
      appearance: "白瓷杯，杯身两道蓝纹，金描边"
      default_position: "木托盘上"
  spatial:
    full_text: "……完整场景原文……"   # 禁止摘要
    key_elements:
      - { name: "窗+纱帘", side: left, anchor: true }
      - { name: "旧木书架", side: right, anchor: true }
  material: "……材质宪法全文……"
  atmosphere: "……"
  imaging: "……"
  lighting: "……"
  color: "主色域…；唯一强调色…"

# 每镜可变
shot:
  index: 2
  duration_s: 5
  scene_size: 近景
  angle: 平视
  movement: 慢推
  action: "低头，右手轻扶草帽檐"
  # 仅互动可改位置，外观不变：
  prop_states:
    - id: coffee_cup
      position: "仍在托盘，未手持"
  morph_phase: null

history:
  - { index: 0, prompt: "...", image: "path/to/shot0.png", last_frame: "..." }
  - { index: 1, prompt: "...", image: "...", last_frame: "..." }
```

**派生规则：**  
新 prompt = `copy(lock) + apply(transform_matrix, shot.delta) + action`  
**绝不** = `rewrite(everything from scratch)`  

---

## 9. 分镜三模式各自怎么锁

| 模式 | 一致性策略 |
|------|------------|
| **Single15** | 单 prompt 内全程 lock 一次；时间码只改焦点/微动，不改衣帽外貌 |
| **MultiShot-in-one** | 同一生成内 Shot1/2/3 **共享同一段 lock 前缀**；只在 Shot 体改景别动作；写「全程保持同一人物服装环境」 |
| **NextShot Chain** | 每镜重焊 lock；上镜 last_frame 作下镜 start；每 2–3 镜 Identity re-anchor |

---

## 10. 与「同感觉」相关的易混点

| 维度 | 锁什么 | 不锁什么 |
|------|--------|----------|
| 人物 | 身份描述全文 | 表情微变、是否看镜头 |
| 衣服帽子 | 款式颜色材质全文 | 风吹扬起的瞬时状态（须声明「仍是同一件」） |
| 道具 | 外观 + 归属 | 在不在手、开合 |
| 环境 | 空间全文 + anchors | 景别裁切导致的「看见多少」 |
| 氛围 | 基线色/颗粒/气质 | 光的时间相位（同源） |
| 材质 | 宪法全文 | morph 链已批准的演化相位 |

**「一致」= 身份与外观不变；允许的是状态与观察方式变。**

---

## 11. 失败模式与修复

| 现象 | 根因 | 修复 |
|------|------|------|
| 下一镜帽子没了 | 帽字段未独立 / 被摘要 | 帽饰独立 + diff |
| 衣服色漂 | 每镜重写服装句 | 字面量拷贝 |
| 道具换手 | 无归属句 | character_props |
| 背景人消失 | 环境被简化 | full_text 禁简 |
| 脸漂 | 只靠尾帧、无 Identity 再锚 | 每 2–3 镜原图 re-anchor |
| 有参考仍漂细节 | 当参考是细节锁 | 文本仍全锁 |
| 换场景当变体 | 无断链 | 断链重置 spatial |

---

## 12. 用户可见的「一致性保证声明」（交付时可贴）

```text
✅ 跨镜一致性已启用（PerfectVideo Continuity Protocol）
· Visual Bible v{n} 已冻结：人物/衣帽/道具归属/环境全文/材质/氛围/成像/光基线
· 本镜锁定域与 Shot {n-1} 字符级一致
· 本镜仅变更：{delta 列表}
· 参考链：{identity + last_frame | 仅文本}
· 若需换装/换景/换材质：请说「断链」或「更新锁定域」，不会静默修改
```

---

## 13. 结论

**保证一致性的不是「提示词写长一点」或「模型更聪明」，而是和 PerfectPhoto 同一套工程纪律：**

1. **先冻结 Bible**（含衣帽独立、道具归属、环境全文、材质宪法）  
2. **每镜拷贝锁定域，禁止同上与摘要**  
3. **只动 Delta 白名单**  
4. **参考图双锚 + 定期 Identity 再锚**  
5. **出镜 diff / 归属 / anchor 闸门**  
6. **换装换景走拦截或断链，禁止静默漂**  

视频比写真多的坑只有：运动与密场景抢保真预算、链式尾帧衰减——用 **预算拆镜 + 原图 re-anchor + 材质宪法一次锁多人** 压住。

**一句：**  
跨镜一致 = **Memory Pack（锁定域）被当作只读常量，镜头是对常量的合法变换，不是每镜重新想象世界。**
