"use strict";(self.webpackChunkteaser=self.webpackChunkteaser||[]).push([[884],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>k});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function o(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},i=Object.keys(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)a=i[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var s=n.createContext({}),p=function(e){var t=n.useContext(s),a=t;return e&&(a="function"==typeof e?e(t):o(o({},t),e)),a},u=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},d="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(a),c=r,k=d["".concat(s,".").concat(c)]||d[c]||m[c]||i;return a?n.createElement(k,o(o({ref:t},u),{},{components:a})):n.createElement(k,o({ref:t},u))}));function k(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=a.length,o=new Array(i);o[0]=c;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[d]="string"==typeof e?e:r,o[1]=l;for(var p=2;p<i;p++)o[p]=a[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},1197:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>s,contentTitle:()=>o,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>p});var n=a(7462),r=(a(7294),a(3905));const i={sidebar_position:2,sidebar_label:"Setup"},o="Local Setup on Ubuntu",l={unversionedId:"getting-started/setup",id:"getting-started/setup",title:"Local Setup on Ubuntu",description:".env files",source:"@site/docs/getting-started/02_setup.md",sourceDirName:"getting-started",slug:"/getting-started/setup",permalink:"/Teaser/docs/getting-started/setup",draft:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/getting-started/02_setup.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2,sidebar_label:"Setup"},sidebar:"tutorialSidebar",previous:{title:"Introduction",permalink:"/Teaser/docs/getting-started/introduction"},next:{title:"Architecture Diagram",permalink:"/Teaser/docs/getting-started/architecture_diagram"}},s={},p=[{value:".env files",id:"env-files",level:3},{value:"Development Setup",id:"development-setup",level:3},{value:"(Optional) Pull data from Reddit",id:"optional-pull-data-from-reddit",level:3},{value:"Setup Grafana + prometheus",id:"setup-grafana--prometheus",level:3}],u={toc:p},d="wrapper";function m(e){let{components:t,...a}=e;return(0,r.kt)(d,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"local-setup-on-ubuntu"},"Local Setup on Ubuntu"),(0,r.kt)("h3",{id:"env-files"},".env files"),(0,r.kt)("p",null,"Create ",(0,r.kt)("inlineCode",{parentName:"p"},".env")," files in the root directory to use with docker-compose for local development."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title=".frontend.env"',title:'".frontend.env"'},"EXPO_DEVTOOLS_LISTEN_ADDRESS='???'\nCHOKIDAR_USEPOLLING='true'\nREACT_NATIVE_PACKAGER_HOSTNAME='???'\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title=".backend.env"',title:'".backend.env"'},"DJANGO_SECRET_KEY=???\nPOSTGRES_PASSWORD=???\nPRIVATE_IP=???\nDEBUG=1\nOPENAI_API_KEY=???\nCDN_VIDEO_LIBRARY_ID=???\nCDN_API_KEY=???\n")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash",metastring:'title=".env"',title:'".env"'},"POSTGRES_PASSWORD=???\nPROSODY_PASSWORD=???\nPROSODY_DOMAIN=wocchit.com\nPROSODY_VIRTUAL_HOSTS=wocchit.com\nGF_SECURITY_ADMIN_PASSWORD='???'\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Setup PostCategoriesModel by running ",(0,r.kt)("inlineCode",{parentName:"li"},"python manage.py shell < core/utils/populate_categories.py\n")," in backend_django container"),(0,r.kt)("li",{parentName:"ul"},"Create user with username ",(0,r.kt)("inlineCode",{parentName:"li"},"uploader")," --\x3e This is used for uploading etl"),(0,r.kt)("li",{parentName:"ul"},"Create user with username ",(0,r.kt)("inlineCode",{parentName:"li"},"Deleted")," --\x3e This is used in the sentinel pattern for PostModel foreign keys")),(0,r.kt)("admonition",{title:"Get in contact!",type:"tip"},(0,r.kt)("p",{parentName:"admonition"},"Email ",(0,r.kt)("a",{parentName:"p",href:"mailto:teaseradmin@teasernsfw.com"},"teaseradmin@teasernsfw.com")," and I can send you a pg_dump of an already populated database!")),(0,r.kt)("h3",{id:"development-setup"},"Development Setup"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"(Git)"),": For development, Install requirements in a venv and run ",(0,r.kt)("inlineCode",{parentName:"li"},"pre-commit install")," to add black code auto-formatting on your commits"),(0,r.kt)("li",{parentName:"ul"},"Install ",(0,r.kt)("a",{parentName:"li",href:"https://www.postgresql.org/download/linux/ubuntu/"},"postgres 15")," and PGAdmin. This project assumes postgres runs on port 5432. (Default  for first time postgres installation)."),(0,r.kt)("li",{parentName:"ul"},"For postgres setup, I follow this tutorial: ",(0,r.kt)("a",{parentName:"li",href:"https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-20-04"},"https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-20-04")),(0,r.kt)("li",{parentName:"ul"},"In postgres shell:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-sql"},"CREATE DATABASE teaser;\nCREATE USER teaseruser WITH PASSWORD 'PUT_YOU_PASSWORD_HERE';\nALTER ROLE teaseruser SET client_encoding TO 'utf8';\nALTER ROLE teaseruser SET default_transaction_isolation TO 'read committed';\nALTER ROLE teaseruser SET timezone TO 'Australia/Sydney';\nGRANT ALL PRIVILEGES ON DATABASE teaser TO teaseruser;\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Do the same for Database teaser_prod with user teaseruser_prod\nAdd the password to the .env file in root directory, ",(0,r.kt)("inlineCode",{parentName:"li"},"POSTGRES_PASSWORD=PUT_YOU_PASSWORD_HERE"),". I would recommend generating a password with")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"openssl rand -hex 32\n")),(0,r.kt)("p",null,"in another terminal."),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("inlineCode",{parentName:"li"},"docker-compose up -d --build")),(0,r.kt)("li",{parentName:"ul"},"Run initial migration ",(0,r.kt)("inlineCode",{parentName:"li"},"docker-compose exec backend_django python manage.py migrate --noinput")),(0,r.kt)("li",{parentName:"ul"},"Check default Django tables were created ",(0,r.kt)("inlineCode",{parentName:"li"},"docker-compose exec db psql --username=teaseruser --dbname=teaser"))),(0,r.kt)("h3",{id:"optional-pull-data-from-reddit"},"(Optional) Pull data from Reddit"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Create a reddit personal use script in ",(0,r.kt)("a",{parentName:"li",href:"https://www.reddit.com/prefs/apps/"},"https://www.reddit.com/prefs/apps/")),(0,r.kt)("li",{parentName:"ul"},"Add praw.ini file to ",(0,r.kt)("inlineCode",{parentName:"li"},"src\\teaser"))),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ini"},"[TeaserScript]\nclient_id=SCRIPT_CLIENT_ID\nclient_secret=SCRIPT_CLIENT_SECRET\npassword=YOUR_PASSWORD\nusername=YOUR_USERNAME\nuser_agent=Python-Slim:teaser-script:v1.0.0 (by u/YOUR_USERNAME)\n")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Change the list of subreddits if you want in ",(0,r.kt)("inlineCode",{parentName:"li"},"from core.utils.user_profile_validator import ALL_CATEGORIES_TEMP")),(0,r.kt)("li",{parentName:"ul"},"Exec ",(0,r.kt)("inlineCode",{parentName:"li"},"bash")," in your ",(0,r.kt)("inlineCode",{parentName:"li"},"backend-django")," container",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Find the backend-django CONTAINER_ID with ",(0,r.kt)("inlineCode",{parentName:"li"},"docker container ls"),"."),(0,r.kt)("li",{parentName:"ul"},"Execute an interactive bash shell in the container with ",(0,r.kt)("inlineCode",{parentName:"li"},"docker exec -it CONTAINER_ID bash")),(0,r.kt)("li",{parentName:"ul"},"Download data from reddit using the django ",(0,r.kt)("inlineCode",{parentName:"li"},"manage.py shell")," --\x3e ",(0,r.kt)("inlineCode",{parentName:"li"},"RedditETL().run_pipeline()"))))),(0,r.kt)("h3",{id:"setup-grafana--prometheus"},"Setup Grafana + prometheus"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Install Docker plugin for Loki ",(0,r.kt)("inlineCode",{parentName:"li"},"docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions")," in shell."),(0,r.kt)("li",{parentName:"ul"},"Run ",(0,r.kt)("inlineCode",{parentName:"li"},"docker run -ti --user root --entrypoint bash teaser_grafana")," then in container run ",(0,r.kt)("inlineCode",{parentName:"li"},"chown -R root:root etc/grafana && chmod -R a+r /etc/grafana && chown -R grafana:root /var/lib/grafana && chown -R grafana:root /usr/share/grafana")," based on ",(0,r.kt)("a",{parentName:"li",href:"https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/#migrate-to-v51-or-later"},"https://grafana.com/docs/grafana/latest/setup-grafana/installation/docker/#migrate-to-v51-or-later")),(0,r.kt)("li",{parentName:"ul"},"Add a password ",(0,r.kt)("inlineCode",{parentName:"li"},"GF_SECURITY_ADMIN_PASSWORD=PASSWORD_HERE")," to the ",(0,r.kt)("inlineCode",{parentName:"li"},".env")," file"),(0,r.kt)("li",{parentName:"ul"},"Go to localhost:3000"),(0,r.kt)("li",{parentName:"ul"},"Login to grafana admin:admin --\x3e Change password(You added the password to the .env file)"),(0,r.kt)("li",{parentName:"ul"},"In your the grafana interface in your browser:",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Go Configuration > Data Sources"),(0,r.kt)("li",{parentName:"ul"},"Add data source > Pick Prometheus"),(0,r.kt)("li",{parentName:"ul"},"Set URL as http://prometheus:9090"),(0,r.kt)("li",{parentName:"ul"},"Save and Test"))),(0,r.kt)("li",{parentName:"ul"},"Setup loki data source",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Add data source > Pick Loki"),(0,r.kt)("li",{parentName:"ul"},"Set URL as http://loki:3100"),(0,r.kt)("li",{parentName:"ul"},"Save and Test"))),(0,r.kt)("li",{parentName:"ul"},"Import the dashboards (*.json files) from the ",(0,r.kt)("inlineCode",{parentName:"li"},"src/grafana/data:/grafana/data")," directory",(0,r.kt)("ul",{parentName:"li"},(0,r.kt)("li",{parentName:"ul"},"Make sure the data sources are correct --\x3e E.G. might have ",(0,r.kt)("inlineCode",{parentName:"li"},"prometheus")," instead of ",(0,r.kt)("inlineCode",{parentName:"li"},"prometheus-1")))),(0,r.kt)("li",{parentName:"ul"},"(Unused) Define REDIS_USERNAME and REDIS_PASSWORD in .env file"),(0,r.kt)("li",{parentName:"ul"},"If you get a permission denied error on starting prometheus container, run ",(0,r.kt)("inlineCode",{parentName:"li"},"sudo chown nobody:nogroup src/prometheus"))))}m.isMDXComponent=!0}}]);