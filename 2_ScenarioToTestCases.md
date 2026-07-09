# Prompt 2：從 Scenario 產生 Test Case 清單

## 背景

前一步已經完成 Feature 與 Scenario 的整理。
現在請不要重新分析原始會議內容，而是根據已確認的 Feature 與 Scenario，產生 Test Case 清單。

本階段只需要列出 Test Case，不需要寫 Given / When / Then。

---

## 你的角色

你是一位資深 Test Analyst / QA Architect / Business Analyst，熟悉測試案例設計、業務規則分析、決策表與流程測試。

---

## 輸入

我會提供：

1. 已確認的 Feature 清單
2. 已確認的 Scenario 清單
3. Scenario 說明
4. 涉及畫面
5. 已知業務規則
6. 必要時補充 UI Prototype

---

## 工作步驟

1. 逐一閱讀每個 Scenario。
2. 判斷該 Scenario 底下應該有哪些 Test Case。
3. 找出不同條件、不同角色、不同狀態、不同資料組合造成的測試差異。
4. 區分正常情境、例外情境、邊界情境。
5. 若遇到涉及多重條件組合（如金額上限、餘額狀況、帳戶狀態等）的複雜業務規則，請直接在此階段輸出對應的**決策表 (Decision Table)**，以矩陣方式窮舉所有邏輯分支。
6. 標示哪些 Test Case 資訊不足，需要再確認。

---

## Test Case 判斷原則

Test Case 是具體可驗證的案例。

例如：

Feature：開戶
Scenario：全新客戶開戶

可能的 Test Case：

* 成年本國自然人開戶
* 未成年本國自然人開戶
* 未成年且缺少法定代理人資料
* 身分證字號已存在
* 手機號碼已被使用
* 必填欄位未填
* 上一頁資料成功帶入下一頁

---

## 輸出

請輸出 HTML，內容包含：

1. Feature 與 Scenario 摘要
2. Test Case 清單
3. 複雜業務規則的決策表 (Decision Tables)（若無則免）
4. Test Case 分類
5. 待確認問題

---

## 輸出表格欄位

### Test Case 清單

| Feature ID | Feature 名稱 | User Story ID | Scenario ID | Scenario 名稱 | Test Case ID | Test Case 名稱 | 測試目的 | 測試類型 | 涉及畫面 | 規則類型 | 是否待確認 | 備註 |
| ---------- | ---------- | ------------- | ----------- | ----------- | ------------ | ------------ | ---- | ---- | ---- | ---- | ----- | -- |

### 規則類型

請使用以下分類：

* 單一業務規則
* 決策表
* 流程型規則
* UI互動規則
* 欄位驗證
* 例外處理
* 權限規則
* 資料帶入規則

### 測試類型

請使用以下分類：

* 正常案例
* 例外案例
* 邊界案例
* 欄位驗證
* 流程驗證
* 跨畫面驗證

---

## 決策表範例格式 (Decision Table Template)

若該 Scenario 包含多重條件組合，請使用以下矩陣格式繪製決策表：

| 條件 (Conditions) | 規則 1 | 規則 2 | 規則 3 | 規則 4 |
| :--- | :---: | :---: | :---: | :---: |
| 條件 A：可用餘額充足 | Y | Y | N | N |
| 條件 B：輸入金額 <= 單筆限額 | Y | N | Y | N |
| 動作 (Actions) | | | | |
| 動作 1：允許交易送出 | X | | | |
| 動作 2：提示「超過單筆限額」 | | X | | X |
| 動作 3：提示「帳戶餘額不足」 | | | X | |

---

## 請根據以下 Feature 與 Scenario 產生 Test Case 清單

【請貼上 Prompt 1 產出的 Feature、User Story 與 Scenario 清單】
