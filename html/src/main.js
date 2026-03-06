import { createApp } from 'vue';
import App from './App.vue';

// Import the Google fonts exactly as the old HTML did
const link = document.createElement('link');
link.href =
	'https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Create Vue App
createApp(App).mount('#app');
