import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'fs'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'merchant.local',
    https: {
      key: readFileSync(resolve(__dirname, 'certs/merchant.local-key.pem')),
      cert: readFileSync(resolve(__dirname, 'certs/merchant.local.pem')),
    },
  },
})
