"use strict";(self.webpackChunkteaser=self.webpackChunkteaser||[]).push([[1738],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var d=a.createContext({}),p=function(e){var t=a.useContext(d),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=p(e.components);return a.createElement(d.Provider,{value:t},e.children)},s="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},g=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,d=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),s=p(n),g=r,m=s["".concat(d,".").concat(g)]||s[g]||c[g]||o;return n?a.createElement(m,i(i({ref:t},u),{},{components:n})):a.createElement(m,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=g;var l={};for(var d in t)hasOwnProperty.call(t,d)&&(l[d]=t[d]);l.originalType=e,l[s]="string"==typeof e?e:r,i[1]=l;for(var p=2;p<o;p++)i[p]=n[p];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}g.displayName="MDXCreateElement"},9315:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>l,toc:()=>p});var a=n(7462),r=(n(7294),n(3905));const o={sidebar_position:2,sidebar_label:"Adding a frontend app to Teaser"},i="Adding a frontend app to Teaser",l={unversionedId:"tutorials/new_frontend_app",id:"tutorials/new_frontend_app",title:"Adding a frontend app to Teaser",description:"TODO: Add a relevant example for the tutorial",source:"@site/docs/tutorials/02_new_frontend_app.md",sourceDirName:"tutorials",slug:"/tutorials/new_frontend_app",permalink:"/Teaser/docs/tutorials/new_frontend_app",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/tutorials/02_new_frontend_app.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,sidebar_label:"Adding a frontend app to Teaser"},sidebar:"tutorialSidebar",previous:{title:"Adding a django app to Teaser",permalink:"/Teaser/docs/tutorials/new_backend_app"},next:{title:"How-To Guides",permalink:"/Teaser/docs/category/how-to-guides"}},d={},p=[{value:"Installing a package",id:"installing-a-package",level:3},{value:"Adding frontend code",id:"adding-frontend-code",level:3},{value:"Media Queries using React Query",id:"media-queries-using-react-query",level:3},{value:"Managing global state and authentication",id:"managing-global-state-and-authentication",level:3},{value:"Testing your code",id:"testing-your-code",level:3},{value:"Deploying your code",id:"deploying-your-code",level:3}],u={toc:p},s="wrapper";function c(e){let{components:t,...n}=e;return(0,r.kt)(s,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"adding-a-frontend-app-to-teaser"},"Adding a frontend app to Teaser"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"TODO: Add a relevant example for the tutorial")),(0,r.kt)("h3",{id:"installing-a-package"},"Installing a package"),(0,r.kt)("p",null,"Use ",(0,r.kt)("inlineCode",{parentName:"p"},"npx expo install PACKAGE_NAME")," in the frontend container"),(0,r.kt)("h3",{id:"adding-frontend-code"},"Adding frontend code"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Module breakdown and atomic design")),(0,r.kt)("admonition",{title:"Atomic Design",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"How to structure your frontend code:")),(0,r.kt)("h3",{id:"media-queries-using-react-query"},"Media Queries using React Query"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.google.com/document/d/1gXa4vBWtwQQoKYCCmfc52D1pwo19XHVTPXh5whN4riw/edit?usp=sharing"},"https://docs.google.com/document/d/1gXa4vBWtwQQoKYCCmfc52D1pwo19XHVTPXh5whN4riw/edit?usp=sharing")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"TODO: Link to backend tutorial"))),(0,r.kt)("admonition",{title:"React Query",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("strong",{parentName:"p"},"TODO"))),(0,r.kt)("h3",{id:"managing-global-state-and-authentication"},"Managing global state and authentication"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Jotai atoms to manage global state. See ",(0,r.kt)("inlineCode",{parentName:"li"},"src/frontend/teaser/hooks/auth/useUserAuth.js"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},"const [userAuthAtomValue] = useAtom(readOnlyUserAuthAtom);\n")),(0,r.kt)("admonition",{title:"Jotai",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},(0,r.kt)("strong",{parentName:"p"},"TODO"))),(0,r.kt)("h3",{id:"testing-your-code"},"Testing your code"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"TODO:"))),(0,r.kt)("h3",{id:"deploying-your-code"},"Deploying your code"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Create a distribution (development, preview or production)")))}c.isMDXComponent=!0}}]);