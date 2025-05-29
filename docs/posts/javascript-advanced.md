---
title: JavaScript 進階技巧
date: 2024-01-03
author: DragoBlog
category: 技術筆記
tags:
  - JavaScript
  - 前端
  - 進階
  - 程式設計
---

# JavaScript 進階技巧

分享一些實用的 JavaScript 進階技巧和最佳實踐。

## 1. 解構賦值的進階用法

### 物件解構與重命名
```javascript
const user = { id: 1, name: 'John', email: 'john@example.com' };

// 重命名並設定預設值
const { name: userName = 'Anonymous', age = 0 } = user;
console.log(userName); // 'John'
console.log(age); // 0
```

### 陣列解構與跳過元素
```javascript
const colors = ['red', 'green', 'blue', 'yellow'];

// 跳過第二個元素
const [first, , third, ...rest] = colors;
console.log(first); // 'red'
console.log(third); // 'blue'
console.log(rest); // ['yellow']
```

## 2. 函數式程式設計技巧

### 柯里化 (Currying)
```javascript
const multiply = (a) => (b) => a * b;

const double = multiply(2);
const triple = multiply(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### 組合函數
```javascript
const compose = (...fns) => (value) =>
  fns.reduceRight((acc, fn) => fn(acc), value);

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const complexOperation = compose(square, double, addOne);
console.log(complexOperation(3)); // (3 + 1) * 2 ^ 2 = 64
```

## 3. 非同步程式設計

### Promise.allSettled 的應用
```javascript
const fetchUserData = async (userId) => {
  const promises = [
    fetch(`/api/users/${userId}`),
    fetch(`/api/users/${userId}/posts`),
    fetch(`/api/users/${userId}/followers`)
  ];

  const results = await Promise.allSettled(promises);
  
  return results.map((result, index) => ({
    type: ['profile', 'posts', 'followers'][index],
    status: result.status,
    data: result.status === 'fulfilled' ? result.value : null,
    error: result.status === 'rejected' ? result.reason : null
  }));
};
```

### 自訂 async/await 錯誤處理
```javascript
const safeAsync = (asyncFn) => async (...args) => {
  try {
    const data = await asyncFn(...args);
    return [null, data];
  } catch (error) {
    return [error, null];
  }
};

const fetchData = safeAsync(async (url) => {
  const response = await fetch(url);
  return response.json();
});

// 使用方式
const [error, data] = await fetchData('/api/data');
if (error) {
  console.error('發生錯誤:', error);
} else {
  console.log('取得資料:', data);
}
```

## 4. 記憶化 (Memoization)

```javascript
const memoize = (fn) => {
  const cache = new Map();
  
  return (...args) => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// 斐波那契數列的記憶化版本
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // 快速計算
```

## 5. 深度複製

```javascript
const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (typeof obj === 'object') {
    const clonedObj = {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
};
```

## 6. 防抖和節流

### 防抖 (Debounce)
```javascript
const debounce = (func, delay) => {
  let timeoutId;
  
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// 搜尋輸入防抖
const searchInput = document.getElementById('search');
const debouncedSearch = debounce((query) => {
  console.log('搜尋:', query);
}, 300);

searchInput.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});
```

### 節流 (Throttle)
```javascript
const throttle = (func, limit) => {
  let inThrottle;
  
  return (...args) => {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// 滾動事件節流
const throttledScroll = throttle(() => {
  console.log('頁面滾動');
}, 100);

window.addEventListener('scroll', throttledScroll);
```

## 總結

這些進階技巧可以讓您的 JavaScript 程式碼更加：
- **優雅**：使用函數式程式設計概念
- **高效**：記憶化和防抖節流優化性能
- **安全**：正確的錯誤處理和深度複製
- **可維護**：清晰的程式碼結構

持續學習和實踐這些技巧，將大大提升您的 JavaScript 開發能力！ 