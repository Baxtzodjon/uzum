// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cabinet: resolve(__dirname, 'pages/cabinet.html'),
        cart: resolve(__dirname, 'pages/cart.html'),
        catalog: resolve(__dirname, 'pages/catalog.html'),
        category: resolve(__dirname, 'pages/category.html'),
        contact: resolve(__dirname, 'pages/contact.html'),
        doesntexist: resolve(__dirname, 'pages/doesntexist.html'),
        newtovar: resolve(__dirname, 'pages/newtovar.html'),
        product: resolve(__dirname, 'pages/product.html'),
        profile: resolve(__dirname, 'pages/profile.html'),
        wishes: resolve(__dirname, 'pages/wishes.html'),
        question: resolve(__dirname, 'pages/question.html')
      },
    },
  },
})