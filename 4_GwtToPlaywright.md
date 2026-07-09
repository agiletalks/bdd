# Prompt 4：將 Given / When / Then 轉成 Playwright 測試代碼

## 背景

前一步已經完成 Given / When / Then (GWT) 結構化表格的撰寫。
現在請針對指定的 GWT 表格與測試案例，產生對應的 **Playwright (TypeScript)** 自動化測試代碼。

---

## 你的角色

你是一位資深 QA 自動化測試工程師，精通 Playwright、TypeScript、CSS Selectors 定位器設計與 E2E 測試最佳實踐。

---

## 輸入

我會提供：

1. 階段三產出的「結構化 Test Case 表格 (含 Given/When/Then)」
2. 畫面跳轉與跳轉邏輯
3. 【選填】CSS Selectors 說明（若未提供，請根據欄位與按鈕名稱，使用語意化的預設 Selector，例如 `#username`、`#confirm-btn`，並於代碼中以註解說明）

---

## 工作步驟

1. **分析測試步驟**：
   - 閱讀每個 Test Case 的 Given（設定前置狀態、登入、進入網頁）。
   - 閱讀 When（模擬鍵盤輸入、點擊、選擇下拉選單等操作）。
   - 閱讀 Then 與 Expected Value（進行斷言 `expect` 驗證畫面狀態、文字、網址或跳轉結果）。
2. **編寫 Playwright 代碼**：
   - 採用 **TypeScript** 撰寫。
   - 使用標準的 `test('TCXX_名稱', async ({ page }) => { ... })` 語法。
   - 在每個步驟上方寫上對應的 `// Given:`、`// When:`、`// Then:` 中文註解，保持規格與代碼一致性。
   - 使用 Playwright 的最佳定位器（如 `page.locator()`、`page.getByRole()`、`page.getByPlaceholder()` 等）。
   - 斷言應使用 Playwright 的非同步斷言，例如 `await expect(locator).toHaveText()` 或 `await expect(page).toHaveURL()`。
3. **優化代碼結構**：
   - 模擬實際操作中的等待（如頁面跳轉時使用 `await page.waitForURL()`）。
   - 保持代碼簡潔、可讀，無語意衝突。

---

## 輸出

請輸出 Markdown 格式的完整代碼檔案，其中應包含：

1. **說明摘要**：列出此檔案包含哪些 Test Cases。
2. **Playwright 測試代碼塊**：使用 ````typescript```` 區塊包覆，包含完整的 `import` 引用與測試用例。
3. **定位器 (Selectors) 假設清單**：列出你在代碼中假設的 CSS Selectors 對照表，方便開發人員修改。

---

## 代碼風格規範範例

```typescript
import { test, expect } from '@playwright/test';

test.describe('線上非約定轉帳功能驗證', () => {
  
  test('TC01-02 轉帳金額大於單筆限額應阻擋並報錯', async ({ page }) => {
    // Given: 使用者登入成功，且可用餘額有 $100,000，單筆限額為 $50,000
    await page.goto('/login');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
    
    // When: 在轉帳金額輸入 $60,000，並點擊「確認轉帳」按鈕
    await page.fill('#transfer-amount', '60000');
    await page.click('#confirm-transfer-btn');
    
    // Then: 系統阻擋交易送出，且於欄位下方提示「轉帳金額已超過單筆限額 $50,000 元」
    const errorAlert = page.locator('.error-message');
    await expect(errorAlert).toBeVisible();
    await expect(errorAlert).toHaveText('轉帳金額已超過單筆限額 $50,000 元');
  });

});
```

---

## 請根據以下 GWT 測試案例產生 Playwright 測試代碼

【請貼上 Prompt 3 產出的指定 Feature / User Story / Scenario / GWT 表格】
