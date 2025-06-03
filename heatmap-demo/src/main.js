import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'uikit/dist/css/uikit.min.css'
import UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

// loads the Icon plugin
UIkit.use(Icons)

// Make UIkit available globally if needed (optional)
window.UIkit = UIkit

createApp(App).mount('#app')
