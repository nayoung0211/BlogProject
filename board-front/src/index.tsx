// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ← 필수
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
      <BrowserRouter> {/* 여기서 App 전체를 감쌉니다 */}
        <App />
      </BrowserRouter>
    </React.StrictMode>
);
