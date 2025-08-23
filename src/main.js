import {createApp} from 'vue';

import App from './App.vue';
import router from '@/router/router.js';
import draggableComponent from 'vuedraggable';

import directives from '@/directives/index.js';
import components from '@/components/UI';
import store from '@/store/index.js';

import '@/assets/base.css';

const app = createApp(App);

app.component('draggable', draggableComponent);

components.forEach(component => {
    app.component(component.name, component);
});

directives.forEach(directive => {
    app.directive(directive.name, directive);
});

app
    .use(router)
    .use(store)
    .mount('#app');
