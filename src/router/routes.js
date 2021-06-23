import Home from '@/views/Home';
import NotFound from '@/views/NotFound';

import MixEffect from '@/views/MixEffect';

import InputNdi from '@/views/InputNdi';
import InputMediaPlayer from '@/views/InputMediaPlayer';

import OutputWindow from '@/views/OutputWindow';

import store from '@/store'


function mixEffectGuard(to, from, next) {
  if(store.getters['mixEffect/list'].includes(to.params.name)) {
    //Mix effect exists on the store
    next();
  } else {
    //Mix effect does not exist on the store
    next({ name: 'not-found' });
  }
}

function inputNdiGuard(to, from, next) {
  if(store.getters['inputNdi/list'].includes(to.params.name)) {
    //NDI input exists on the store
    next();
  } else {
    //NDI input does not exist on the store
    next({ name: 'not-found' });
  }
}

function inputMediaPlayerGuard(to, from, next) {
  if(store.getters['inputMediaPlayer/list'].includes(to.params.name)) {
    //Media player input exists on the store
    next();
  } else {
    //Media player input does not exist on the store
    next({ name: 'not-found' });
  }
}


function outputWindowGuard(to, from, next) {
  if(store.getters['outputWindow/list'].includes(to.params.name)) {
    //Window exists on the store
    next();
  } else {
    //Window does not exist on the store
    next({ name: 'not-found' });
  }
}

const routes = [
  //Path						                  //Name				              //Component
  {	path: '/', 					              name: 'home', 		          component: Home 		                              },
  { path: '/mix-effect/:name', 	      name: 'mix-effect',         component: MixEffect, beforeEnter: mixEffectGuard },
  { path: '/input-ndi/:name',         name: 'input-ndi',          component: InputNdi, beforeEnter: inputNdiGuard },
  { path: '/input-media-player/:name',name: 'input-media-player', component: InputMediaPlayer, beforeEnter: inputMediaPlayerGuard },
  { path: '/output-window/:name',     name: 'output-window',      component: OutputWindow, beforeEnter: outputWindowGuard },
  
  //Add here
  
  {	path: '*', 					          name: 'not-found', 	  component: NotFound 	                            }
];

export default routes;
  