import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode is intentionally omitted: it double-mounts components in dev,
// which destroys the WebGL context (THREE.WebGLRenderer: Context Lost).
createRoot(document.getElementById('root')).render(<App />)
