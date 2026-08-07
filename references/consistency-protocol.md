# 跨镜一致性协议（摘要）

完整论证见 `research/03-cross-shot-consistency-protocol.md`。

## 一句话

**不靠模型记忆；靠 Bible 冻结 + 字面量焊接 + Delta 白名单 + 双锚 + diff 闸门。**

## 五层叠甲

1. **Visual Bible** 镜前冻结，中途禁重生  
2. **Literal Weld** 每镜全文拷贝 lock，禁「同上/略」  
3. **Delta Whitelist** 只动景别/机位/运镜/动作/前景/合法 morph 相位  
4. **Visual Anchor** 文本 + 身份图/上镜尾帧；图≠细节锁  
5. **Runtime QC** 字符级 diff / 归属 / 合同混用  

## 焊接头模板

```text
【锁定域 · 与 Shot {N-1} 字符级一致 · 禁止改写】
人物：…
服装：…
帽饰：…          ← 独立
人物道具：…      ← 含归属
场景道具：…
环境：…          ← full_text，禁摘要
材质宪法：…
氛围/成像/光线基线/色彩命题：…

【变体域 · 仅允许】
景别 / 机位 / 运镜 / 动作焦点 / 前景 / morph 相位 / 瞬时事件
```

## 外观 vs 状态

| 外观（锁） | 状态（可动） |
|------------|--------------|
| 色/纹样/材质/logo | 位置/开合/持有/褶皱 |
| 材质宪法体系 | 合法 morph 进度 |

## 环境

- **同场景连戏**：`spatial.full_text` 不变，只改裁切  
- **换空间**：断链 / 新 setting，不是 delta.background  

## 公式

```text
new_prompt = copy(lock) + legal_delta + action
```

## Diff 闸门

任一 LOCK 字段与上一镜不等 → **BLOCK** 回写后再交付。  
Agent 不得因「太长」删环境 anchor 句。
