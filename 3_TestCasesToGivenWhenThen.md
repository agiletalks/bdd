# Prompt 3：將指定 Test Case 轉成 Given / When / Then 與結構化表格

## 背景

前一步已經產生 Test Case 清單。
現在請針對指定的 Feature、Scenario 或 Test Case，產生完整 Given / When / Then，並整理成可供業務、開發與測試共同閱讀的結構化測試案例表格。

---

## 你的角色

你是一位資深 BDD 專家、Test Analyst 與 System Analyst，熟悉 Given / When / Then、測試案例設計、Decision Table、UI Flow 與跨畫面資料驗證。

---

## 輸入

我會提供：

1. 指定的 Feature
2. 指定的 Scenario
3. 指定的 Test Case 清單
4. 涉及畫面
5. 已知業務規則
6. 必要時補充 Prototype 或畫面說明

---

## 工作步驟

1. 閱讀階段 2 產出的 Test Case 清單以及決策表 (Decision Table)。
2. 將決策表中的每一條規則（列）對應翻譯為 Given-When-Then 步驟，並整合進結構化 Test Case 表格中。
3. 為每個 Test Case 撰寫無歧義的 Given / When / Then。
4. 將 Given / When / Then 拆成結構化欄位。
5. 若涉及跨畫面流程，明確標示來源畫面、目標畫面、帶入資料與預填欄位。
6. 若資訊不足，標示待確認，不要自行假設。

---

## Given / When / Then 撰寫原則

### Given

Given 是前提條件，可能包含：

* 使用者身分
* 既有資料
* 畫面狀態
* 預填資料
* 前一頁已完成的操作
* 系統中已存在的資料

### When

When 是觸發行為，可能包含：

* 使用者輸入
* 點擊按鈕
* 選擇選項
* 上傳文件
* 系統自動觸發
* 跳轉頁面

### Then

Then 是預期結果，必須可驗證，可能包含：

* 頁面跳轉
* 欄位值
* 系統狀態
* 錯誤訊息
* 成功訊息
* 資料寫入
* 資料帶入
* 權限變化
* 下一步流程

---

## 輸出

請輸出 HTML，內容包含：

1. Feature / Scenario 摘要
2. Given / When / Then 清單
3. 結構化 Test Case 表格（包含從決策表翻譯而來的規則）
4. 待確認問題
5. 備註與風險

---

## 輸出表格欄位

### 結構化 Test Case 表格

| Feature | User Story | Scenario | Test Case ID | Test Case 名稱 | 涉及畫面 | Given 前提條件 | Input 輸入資料 | When 觸發動作 | Then 預期結果 | Expected Value 預期欄位值 / 系統狀態 | Rule Type | 是否待確認 | 備註 |
| ------- | ---------- | -------- | ------------ | ------------ | ---- | ---------- | ---------- | --------- | --------- | --------------------------- | --------- | ----- | -- |

---

## 跨畫面規則

如果 Test Case 涉及跨畫面流程，請明確寫出：

| 來源畫面 | 觸發動作 | 目標畫面 | 帶入資料 | 預填欄位 | 預期狀態 | 備註 |
| ---- | ---- | ---- | ---- | ---- | ---- | -- |

---

## 決策表對照與翻譯原則

若輸入資料中包含階段 2 的決策表，你必須確保：
1. 決策表中的每一個「規則列 (Rule)」都有一個對應的 Test Case ID（例如：Rule 1 對應 TC01-01，Rule 2 對應 TC01-02）。
2. 在「結構化 Test Case 表格」中，將決策表的條件（Conditions）對應填入 Given 欄位與 Input 輸入資料欄位，將動作（Actions）對應填入 Then 預期結果與預期欄位值中。

---

## 待確認問題

請依照以下分類整理：

| 編號 | 分類 | 待確認問題 | 影響的 Test Case | 建議確認對象 |
| -- | -- | ----- | ------------- | ------ |

分類包含：

* 業務規則不清楚
* 欄位定義不清楚
* 流程順序不清楚
* 畫面行為不清楚
* 例外情境不清楚
* 權限或角色不清楚
* 資料來源不清楚

---

## 請根據以下 Test Case 產生 Given / When / Then

【請貼上 Prompt 2 產出的指定 Feature / User Story / Scenario / Test Case】
