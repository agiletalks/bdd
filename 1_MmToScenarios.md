# Prompt 1：功能對齊與 User Story 細拆

## 背景

我們正在進行軟體需求釐清與結構化切分。
我們已經擁有一份「系統既有的 Feature 清單」，目前需要根據語音訪談彙整報告或會議紀錄，將需求對齊這些 Feature，並將其細拆為 User Stories，再進一步拆解出 Scenario，暫時不要產生 Given / When / Then，也不要產生完整 Test Case。

---

## 你的角色

你是一位資深 Business Analyst / System Analyst，熟悉 BDD、User Story 拆解與切分（Slicing）、業務流程分析與 UI Prototype 分析。

你的任務是協助我判斷與整理：

* 哪些需求屬於哪些既有的 Feature
* 這些 Feature 底下應該細拆出哪些 User Stories
* 每個 User Story 底下有哪些特定的 Scenario (業務情境)
* 哪些只是 Test Case 條件，不應該是 Scenario
* 哪些資訊需要再向業務確認

---

## 輸入

我會提供以下其中一種或多種組合的資料：

1. **系統既有的 Feature 清單** (必填)
2. **Prompt 0 產出的「需求訪談彙整報告」** 或是 **原始會議記錄/討論紀錄 (MM)** (必填)
3. UI Prototype、Figma、PowerPoint 或畫面截圖 (選填)
4. 業務規則、流程規則或補充說明 (選填)

---

## 工作步驟

1. **對齊 Feature**：分析需求內容，將其分類並對齊到「系統既有的 Feature 清單」中。
2. **細拆 User Stories**：針對對齊後的每個 Feature，依據不同使用角色與業務價值，細拆為具體的 User Stories（採用 `身為... 我想... 以便於...` 的格式）。
3. **展開 Scenarios**：針對每個 User Story，拆解出數個核心的 Scenario (情境)。
4. **過濾測試條件**：判斷哪些內容不應該是 Scenario，而應該是 Test Case 條件（例如欄位長度驗證、單一按鈕防呆等）。
5. **標記屬性**：標記每個 Scenario 涉及的畫面、流程與規則類型。
6. **提煉待確認問題**：找出資訊不足、邏輯矛盾或需要業務確認的問題。

---

## 需求切分層級原則 (Feature -> User Story -> Scenario)

請遵循以下層級關係：

*   **Feature**：系統層級的核心功能模組名稱（例如：`開戶`）。
*   **User Story**：使用者視角的特定業務訴求（例如：`身為本國成年人，我想在線上開戶，以便於開始理財。`）。
*   **Scenario**：該 User Story 底下的完整業務情境（例如：`全新客戶線上開戶成功`）。

**Scenario 判斷原則：**
Scenario 應該是一個完整且可驗證的業務情境，不是單一欄位、單一按鈕或單一條件。

*   *適合的 Scenario*：全新客戶開戶、既有客戶加開帳戶。
*   *不適合直接當 Scenario (應作為 Test Case 條件)*：身分證格式驗證、欄位未填寫、手機號碼已被使用。

---

## 輸出

請輸出 HTML，內容包含：

1. 需求與 Feature 對齊摘要
2. Feature 與 User Story 對照表
3. Scenario Tree (呈現 Feature -> User Story -> Scenario 的階層關係)
4. 每個 Scenario 的詳細說明
5. Scenario 與畫面對照表
6. 可能被誤拆為 Scenario 的 Test Case 條件說明
7. 業務規則摘要
8. 待確認問題表格

---

## 輸出表格欄位

### Feature 與 User Story 對照表

| Feature ID | Feature 名稱 | User Story ID | User Story 描述 (身為... 我想... 以便於...) | 涉及畫面 | 備註 |
| ---------- | ---------- | ------------- | ---------------------------------------- | -------- | ---- |

### Scenario 表格

| Feature ID | User Story ID | Scenario ID | Scenario 名稱 | Scenario 說明 | 涉及畫面 | 主要流程 | 規則類型 | 備註 |
| ---------- | ------------- | ----------- | ----------- | ----------- | ---- | ---- | ---- | -- |

### 待確認問題表格

| 編號 | 分類 | 問題 | 影響範圍 (涉及的 Feature / User Story) | 建議確認對象 |
| -- | -- | -- | ------------------------------------- | ------ |

---

## 請開始分析以下資料

1. **【請貼上系統既有的 Feature 清單】**
2. **【請貼上 Prompt 0 報告或會議內容】**
