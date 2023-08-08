/*! For license information please see server.js.LICENSE.txt */
(()=>{"use strict";var e={};function r(e){return r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r(e)}function t(){t=function(){return e};var e={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(e,r,t){e[r]=t.value},a="function"==typeof Symbol?Symbol:{},u=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function l(e,r,t){return Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}),e[r]}try{l({},"")}catch(e){l=function(e,r,t){return e[r]=t}}function f(e,r,t,n){var o=r&&r.prototype instanceof p?r:p,a=Object.create(o.prototype),u=new _(n||[]);return i(a,"_invoke",{value:E(e,t,u)}),a}function h(e,r,t){try{return{type:"normal",arg:e.call(r,t)}}catch(e){return{type:"throw",arg:e}}}e.wrap=f;var d={};function p(){}function v(){}function y(){}var m={};l(m,u,(function(){return this}));var g=Object.getPrototypeOf,x=g&&g(g(P([])));x&&x!==n&&o.call(x,u)&&(m=x);var j=y.prototype=p.prototype=Object.create(m);function b(e){["next","throw","return"].forEach((function(r){l(e,r,(function(e){return this._invoke(r,e)}))}))}function w(e,t){function n(i,a,u,c){var s=h(e[i],e,a);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==r(f)&&o.call(f,"__await")?t.resolve(f.__await).then((function(e){n("next",e,u,c)}),(function(e){n("throw",e,u,c)})):t.resolve(f).then((function(e){l.value=e,u(l)}),(function(e){return n("throw",e,u,c)}))}c(s.arg)}var a;i(this,"_invoke",{value:function(e,r){function o(){return new t((function(t,o){n(e,r,t,o)}))}return a=a?a.then(o,o):o()}})}function E(e,r,t){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(t.method=o,t.arg=i;;){var a=t.delegate;if(a){var u=S(a,t);if(u){if(u===d)continue;return u}}if("next"===t.method)t.sent=t._sent=t.arg;else if("throw"===t.method){if("suspendedStart"===n)throw n="completed",t.arg;t.dispatchException(t.arg)}else"return"===t.method&&t.abrupt("return",t.arg);n="executing";var c=h(e,r,t);if("normal"===c.type){if(n=t.done?"completed":"suspendedYield",c.arg===d)continue;return{value:c.arg,done:t.done}}"throw"===c.type&&(n="completed",t.method="throw",t.arg=c.arg)}}}function S(e,r){var t=r.method,n=e.iterator[t];if(void 0===n)return r.delegate=null,"throw"===t&&e.iterator.return&&(r.method="return",r.arg=void 0,S(e,r),"throw"===r.method)||"return"!==t&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+t+"' method")),d;var o=h(n,e.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,d;var i=o.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=void 0),r.delegate=null,d):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,d)}function O(e){var r={tryLoc:e[0]};1 in e&&(r.catchLoc=e[1]),2 in e&&(r.finallyLoc=e[2],r.afterLoc=e[3]),this.tryEntries.push(r)}function L(e){var r=e.completion||{};r.type="normal",delete r.arg,e.completion=r}function _(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(O,this),this.reset(!0)}function P(e){if(e){var r=e[u];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var t=-1,n=function r(){for(;++t<e.length;)if(o.call(e,t))return r.value=e[t],r.done=!1,r;return r.value=void 0,r.done=!0,r};return n.next=n}}return{next:k}}function k(){return{value:void 0,done:!0}}return v.prototype=y,i(j,"constructor",{value:y,configurable:!0}),i(y,"constructor",{value:v,configurable:!0}),v.displayName=l(y,s,"GeneratorFunction"),e.isGeneratorFunction=function(e){var r="function"==typeof e&&e.constructor;return!!r&&(r===v||"GeneratorFunction"===(r.displayName||r.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,l(e,s,"GeneratorFunction")),e.prototype=Object.create(j),e},e.awrap=function(e){return{__await:e}},b(w.prototype),l(w.prototype,c,(function(){return this})),e.AsyncIterator=w,e.async=function(r,t,n,o,i){void 0===i&&(i=Promise);var a=new w(f(r,t,n,o),i);return e.isGeneratorFunction(t)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},b(j),l(j,s,"Generator"),l(j,u,(function(){return this})),l(j,"toString",(function(){return"[object Generator]"})),e.keys=function(e){var r=Object(e),t=[];for(var n in r)t.push(n);return t.reverse(),function e(){for(;t.length;){var n=t.pop();if(n in r)return e.value=n,e.done=!1,e}return e.done=!0,e}},e.values=P,_.prototype={constructor:_,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!e)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function t(t,n){return a.type="throw",a.arg=e,r.next=t,n&&(r.method="next",r.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return t("end");if(i.tryLoc<=this.prev){var u=o.call(i,"catchLoc"),c=o.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return t(i.catchLoc,!0);if(this.prev<i.finallyLoc)return t(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return t(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return t(i.finallyLoc)}}}},abrupt:function(e,r){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(e,r){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&r&&(this.next=r),d},finish:function(e){for(var r=this.tryEntries.length-1;r>=0;--r){var t=this.tryEntries[r];if(t.finallyLoc===e)return this.complete(t.completion,t.afterLoc),L(t),d}},catch:function(e){for(var r=this.tryEntries.length-1;r>=0;--r){var t=this.tryEntries[r];if(t.tryLoc===e){var n=t.completion;if("throw"===n.type){var o=n.arg;L(t)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,t){return this.delegate={iterator:P(e),resultName:r,nextLoc:t},"next"===this.method&&(this.arg=void 0),d}},e}function n(e,r,t,n,o,i,a){try{var u=e[i](a),c=u.value}catch(e){return void t(e)}u.done?r(c):Promise.resolve(c).then(n,o)}function o(e){return function(){var r=this,t=arguments;return new Promise((function(o,i){var a=e.apply(r,t);function u(e){n(a,o,i,u,c,"next",e)}function c(e){n(a,o,i,u,c,"throw",e)}u(void 0)}))}}e.n=r=>{var t=r&&r.__esModule?()=>r.default:()=>r;return e.d(t,{a:t}),t},e.d=(r,t)=>{for(var n in t)e.o(t,n)&&!e.o(r,n)&&Object.defineProperty(r,n,{enumerable:!0,get:t[n]})},e.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r);const i=require("react-dom/server");var a=e.n(i);const u=require("express");var c=e.n(u);const s=require("react-router-dom/server"),l=require("react-router-dom"),f=require("react/jsx-runtime"),h=function(){return(0,f.jsxs)("ul",{children:[(0,f.jsx)("li",{children:(0,f.jsx)(l.Link,{to:"/red",children:"Red"})}),(0,f.jsx)("li",{children:(0,f.jsx)(l.Link,{to:"/blue",children:"Blue"})}),(0,f.jsx)("li",{children:(0,f.jsx)(l.Link,{to:"/users",children:"Users"})})]})},d=function(){return(0,f.jsx)("div",{className:"Red",children:"Red"})},p=function(){return(0,f.jsx)(d,{})},v=function(){return(0,f.jsx)("div",{className:"Blue",children:"Blue"})},y=function(){return(0,f.jsx)(v,{})},m=require("react"),g=function(e){var r=e.users;return r?(0,f.jsx)("div",{children:(0,f.jsx)("ul",{children:r.map((function(e){return(0,f.jsx)("li",{children:(0,f.jsx)(l.Link,{to:"/users/".concat(e.id),children:e.username})},e.id)}))})}):null},x=require("react-redux");function j(e,t,n){return(t=function(e){var t=function(e,t){if("object"!==r(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,"string");if("object"!==r(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"===r(t)?t:String(t)}(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function b(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function w(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?b(Object(t),!0).forEach((function(r){j(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):b(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const E=require("axios");var S=e.n(E);require("redux-saga/effects");var O="users/GET_USERS_PENDING",L="users/GET_USERS_SUCCESS",_="users/GET_USERS_FAILURE",P="users/GET_USER",k=function(e){return{type:P,payload:e}},R=function(){return function(){var e=o(t().mark((function e(r){var n;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,r({type:O}),e.next=4,S().get("https://jsonplaceholder.typicode.com/users");case 4:n=e.sent,r({type:L,payload:n}),e.next=12;break;case 8:throw e.prev=8,e.t0=e.catch(0),r((t=e.t0,{type:_,error:!0,payload:t})),e.t0;case 12:case"end":return e.stop()}var t}),e,null,[[0,8]])})));return function(r){return e.apply(this,arguments)}}()},T={users:null,user:null,loading:{users:!1,user:!1},error:{users:null,user:null}};var G=(0,m.createContext)(null);const N=G;var q=function(e){var r=e.resolve,t=(0,m.useContext)(G);return t?(t.done||t.promise.push(Promise.resolve(r())),null):null};const F=function(){var e=(0,x.useSelector)((function(e){return e.users.users})),r=(0,x.useDispatch)();return(0,m.useEffect)((function(){e||r(R())}),[r,e]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(g,{users:e}),";",(0,f.jsx)(q,{resolve:function(){return r(R)}})]})},U=function(e){var r=e.user,t=r.email,n=r.name,o=r.username;return(0,f.jsxs)("div",{children:[(0,f.jsxs)("h1",{children:[o," (",n,")"]}),(0,f.jsxs)("p",{children:[(0,f.jsx)("b",{children:"e-mail:"}),t]})]})},D=function(e){var r=e.id,t=(0,x.useSelector)((function(e){return e.users.user})),n=(0,x.useDispatch)();return(0,m.useEffect)((function(){t&&t.id===parseInt(r,10)||n(k())}),[n,r,t]),t?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(U,{user:t}),";"]}):(0,f.jsx)(q,{resolve:function(){return n(k(r))}})},A=function(){var e=(0,l.useParams)().id;return(0,f.jsx)(D,{id:e})},C=function(){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(F,{}),(0,f.jsx)(l.Routes,{children:(0,f.jsx)(l.Route,{path:":id",element:(0,f.jsx)(A,{})})})]})},I=function(){return(0,f.jsxs)("div",{children:[(0,f.jsx)(h,{}),(0,f.jsx)("hr",{}),(0,f.jsxs)(l.Routes,{children:[(0,f.jsx)(l.Route,{path:"/red",element:(0,f.jsx)(p,{})}),(0,f.jsx)(l.Route,{path:"/blue",element:(0,f.jsx)(y,{})}),(0,f.jsx)(l.Route,{path:"/users/*",element:(0,f.jsx)(C,{})})]})]})},Y=require("path");var B=e.n(Y);const J=require("fs");var M=e.n(J);const z=require("redux"),H=require("redux-thunk");var K=e.n(H);const Q=(0,z.combineReducers)({users:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,r=arguments.length>1?arguments[1]:void 0;switch(r.type){case O:return w(w({},e),{},{loading:w(w({},e.loading),{},{users:!0})});case L:return w(w({},e),{},{loading:w(w({},e.loading),{},{users:!1}),users:r.payload.data});case _:return w(w({},e),{},{loading:w(w({},e.loading),{},{users:!1}),error:w(w({},e.error),{},{users:r.payload})});case P:return w(w({},e),{},{loading:w(w({},e.loading),{},{user:!0}),error:w(w({},e.error),{},{user:null})});case"users/GET_USER_SUCCESS":return w(w({},e),{},{loading:w(w({},e.loading),{},{user:!1}),user:r.payload});case"users/GET_USER_FAILURE":return w(w({},e),{},{loading:w(w({},e.loading),{},{user:!1}),error:w(w({},e.error),{},{user:r.payload})});default:return e}}});var V=JSON.parse(M().readFileSync(B().resolve("./build/asset-manifest.json"),"utf8"));function W(e,r){return'<!DOCTYPE html>\n  <html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <link rel="shortcut icon" href="/favicon.ico" />\n    <meta\n      name="viewport"\n      content="width=device-width,initial-scale=1,shrink-to-fit=no"\n    />\n    <meta name="theme-color" content="#000000" />\n    <title>React App</title>\n    <link href="'.concat(V.files["main.css"],'" rel="stylesheet" />\n  </head>\n  <body>\n    <noscript>You need to enable JavaScript to run this app.</noscript>\n    <div id="root">').concat(e,"</div>\n    ").concat(r,'\n    <script src="').concat(V.files["main.js"],'"><\/script>\n  </body>\n  </html>\n    ')}var X=c()(),Z=function(){var e=o(t().mark((function e(r,n,o){var i,u,c,l,h,d,p;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i={},u=(0,z.createStore)(Q,(0,z.applyMiddleware)(K())),c={done:!1,promises:[]},l=(0,f.jsx)(N.Provider,{value:c,children:(0,f.jsx)(x.Provider,{store:u,children:(0,f.jsx)(s.StaticRouter,{location:r.url,context:i,children:(0,f.jsx)(I,{})})})}),a().renderToStaticMarkup(l),e.prev=5,e.next=8,Promise.all(c.promises);case 8:e.next=13;break;case 10:return e.prev=10,e.t0=e.catch(5),e.abrupt("return",n.status(500));case 13:c.done=!0,h=a().renderToString(l),d=JSON.stringify(u.getState()).replace(/</g,"\\u003c"),p="<script>__PRELOADED_STATE__ = ".concat(d,"<\/script>"),n.send(W(h,p));case 18:case"end":return e.stop()}}),e,null,[[5,10]])})));return function(r,t,n){return e.apply(this,arguments)}}(),$=c().static(B().resolve("./build"),{index:!1});X.use($),X.use(Z),X.listen(5e3,(function(){console.log("Running on http://localhost:5000")}))})();