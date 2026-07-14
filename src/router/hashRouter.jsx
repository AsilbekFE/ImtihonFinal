// react-router-dom ga o'tkazildi — HashRouter + Nested Routes qo'llab-quvvatlaydi
import React from 'react';
import {
  HashRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Outlet,
  Navigate,
} from 'react-router-dom';

// navigate funksiyasi — hook orqali ishlatiladi, lekin context uchun global wrapper
export { Routes, Route, Link, useLocation, Outlet, Navigate };

// Router — HashRouter wrapperi
export const Router = ({ children }) => <HashRouter>{children}</HashRouter>;

// navigate helper (hook versiyasi komponentlar ichida)
export { useNavigate };

// navigate funksiyasi context ichida useNavigate orqali chaqiriladi
// Eski navigate import qiluvchi fayllar uchun stub (ular AppContext orqali ishlaydi)
export const navigate = (path) => {
  window.location.hash = path;
};
