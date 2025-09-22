var wt=Object.defineProperty;var Ie=e=>{throw TypeError(e)};var Et=(e,t,r)=>t in e?wt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var p=(e,t,r)=>Et(e,typeof t!="symbol"?t+"":t,r),Te=(e,t,r)=>t.has(e)||Ie("Cannot "+r);var o=(e,t,r)=>(Te(e,t,"read from private field"),r?r.call(e):t.get(e)),g=(e,t,r)=>t.has(e)?Ie("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(Te(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),v=(e,t,r)=>(Te(e,t,"access private method"),r);var Le=(e,t,r,s)=>({set _(n){f(e,t,n,r)},get _(){return o(e,t,s)}});var $e=(e,t,r)=>(s,n)=>{let a=-1;return i(0);async function i(c){if(c<=a)throw new Error("next() called multiple times");a=c;let l,d=!1,u;if(e[c]?(u=e[c][0][0],s.req.routeIndex=c):u=c===e.length&&n||void 0,u)try{l=await u(s,()=>i(c+1))}catch(h){if(h instanceof Error&&t)s.error=h,l=await t(h,s),d=!0;else throw h}else s.finalized===!1&&r&&(l=await r(s));return l&&(s.finalized===!1||d)&&(s.res=l),s}},jt=Symbol(),Rt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,a=(e instanceof nt?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?At(e,{all:r,dot:s}):{}};async function At(e,t){const r=await e.formData();return r?St(r,t):{}}function St(e,t){const r=Object.create(null);return e.forEach((s,n)=>{t.all||n.endsWith("[]")?Ot(r,n,s):r[n]=s}),t.dot&&Object.entries(r).forEach(([s,n])=>{s.includes(".")&&(Ct(r,s,n),delete r[s])}),r}var Ot=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Ct=(e,t,r)=>{let s=e;const n=t.split(".");n.forEach((a,i)=>{i===n.length-1?s[a]=r:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},Ze=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Pt=e=>{const{groups:t,path:r}=Tt(e),s=Ze(r);return _t(s,t)},Tt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const n=`@${s}`;return t.push([n,r]),n}),{groups:t,path:e}},_t=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let n=e.length-1;n>=0;n--)if(e[n].includes(s)){e[n]=e[n].replace(s,t[r][1]);break}}return e},Ee={},Dt=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return Ee[s]||(r[2]?Ee[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Ee[s]=[e,r[1],!0]),Ee[s]}return null},He=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Nt=e=>He(e,decodeURI),et=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const n=t.charCodeAt(s);if(n===37){const a=t.indexOf("?",s),i=t.slice(r,a===-1?void 0:a);return Nt(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(n===63)break}return t.slice(r,s)},Mt=e=>{const t=et(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},re=(e,t,...r)=>(r.length&&(t=re(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),tt=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))s+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){r.length===0&&s===""?r.push("/"):r.push(s);const a=n.replace("?","");s+="/"+a,r.push(s)}else s+="/"+n}),r.filter((n,a,i)=>i.indexOf(n)===a)},_e=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?He(e,st):e):e,rt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf(`?${t}`,8);for(i===-1&&(i=e.indexOf(`&${t}`,8));i!==-1;){const c=e.charCodeAt(i+t.length+1);if(c===61){const l=i+t.length+2,d=e.indexOf("&",l);return _e(e.slice(l,d===-1?void 0:d))}else if(c==38||isNaN(c))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const n={};s??(s=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let c=e.indexOf("=",a);c>i&&i!==-1&&(c=-1);let l=e.slice(a+1,c===-1?i===-1?void 0:i:c);if(s&&(l=_e(l)),a=i,l==="")continue;let d;c===-1?d="":(d=e.slice(c+1,i===-1?void 0:i),s&&(d=_e(d))),r?(n[l]&&Array.isArray(n[l])||(n[l]=[]),n[l].push(d)):n[l]??(n[l]=d)}return t?n[t]:n},Ht=rt,Ft=(e,t)=>rt(e,t,!0),st=decodeURIComponent,ke=e=>He(e,st),ae,C,$,at,it,Ne,q,ze,nt=(ze=class{constructor(e,t="/",r=[[]]){g(this,$);p(this,"raw");g(this,ae);g(this,C);p(this,"routeIndex",0);p(this,"path");p(this,"bodyCache",{});g(this,q,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const n=Object.keys(t)[0];return n?t[n].then(a=>(n==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,C,r),f(this,ae,{})}param(e){return e?v(this,$,at).call(this,e):v(this,$,it).call(this)}query(e){return Ht(this.url,e)}queries(e){return Ft(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Rt(this,e))}json(){return o(this,q).call(this,"text").then(e=>JSON.parse(e))}text(){return o(this,q).call(this,"text")}arrayBuffer(){return o(this,q).call(this,"arrayBuffer")}blob(){return o(this,q).call(this,"blob")}formData(){return o(this,q).call(this,"formData")}addValidatedData(e,t){o(this,ae)[e]=t}valid(e){return o(this,ae)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[jt](){return o(this,C)}get matchedRoutes(){return o(this,C)[0].map(([[,e]])=>e)}get routePath(){return o(this,C)[0].map(([[,e]])=>e)[this.routeIndex].path}},ae=new WeakMap,C=new WeakMap,$=new WeakSet,at=function(e){const t=o(this,C)[0][this.routeIndex][1][e],r=v(this,$,Ne).call(this,t);return r&&/\%/.test(r)?ke(r):r},it=function(){const e={},t=Object.keys(o(this,C)[0][this.routeIndex][1]);for(const r of t){const s=v(this,$,Ne).call(this,o(this,C)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?ke(s):s)}return e},Ne=function(e){return o(this,C)[1]?o(this,C)[1][e]:e},q=new WeakMap,ze),It={Stringify:1},ot=async(e,t,r,s,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(n?n[0]+=e:n=[e],Promise.all(a.map(c=>c({phase:t,buffer:n,context:s}))).then(c=>Promise.all(c.filter(Boolean).map(l=>ot(l,t,!1,s,n))).then(()=>n[0]))):Promise.resolve(e)},Lt="text/plain; charset=UTF-8",De=(e,t)=>({"Content-Type":e,...t}),ge,ve,H,ie,F,S,xe,oe,le,Y,be,ye,U,se,Ve,$t=(Ve=class{constructor(e,t){g(this,U);g(this,ge);g(this,ve);p(this,"env",{});g(this,H);p(this,"finalized",!1);p(this,"error");g(this,ie);g(this,F);g(this,S);g(this,xe);g(this,oe);g(this,le);g(this,Y);g(this,be);g(this,ye);p(this,"render",(...e)=>(o(this,oe)??f(this,oe,t=>this.html(t)),o(this,oe).call(this,...e)));p(this,"setLayout",e=>f(this,xe,e));p(this,"getLayout",()=>o(this,xe));p(this,"setRenderer",e=>{f(this,oe,e)});p(this,"header",(e,t,r)=>{this.finalized&&f(this,S,new Response(o(this,S).body,o(this,S)));const s=o(this,S)?o(this,S).headers:o(this,Y)??f(this,Y,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});p(this,"status",e=>{f(this,ie,e)});p(this,"set",(e,t)=>{o(this,H)??f(this,H,new Map),o(this,H).set(e,t)});p(this,"get",e=>o(this,H)?o(this,H).get(e):void 0);p(this,"newResponse",(...e)=>v(this,U,se).call(this,...e));p(this,"body",(e,t,r)=>v(this,U,se).call(this,e,t,r));p(this,"text",(e,t,r)=>!o(this,Y)&&!o(this,ie)&&!t&&!r&&!this.finalized?new Response(e):v(this,U,se).call(this,e,t,De(Lt,r)));p(this,"json",(e,t,r)=>v(this,U,se).call(this,JSON.stringify(e),t,De("application/json",r)));p(this,"html",(e,t,r)=>{const s=n=>v(this,U,se).call(this,n,t,De("text/html; charset=UTF-8",r));return typeof e=="object"?ot(e,It.Stringify,!1,{}).then(s):s(e)});p(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});p(this,"notFound",()=>(o(this,le)??f(this,le,()=>new Response),o(this,le).call(this,this)));f(this,ge,e),t&&(f(this,F,t.executionCtx),this.env=t.env,f(this,le,t.notFoundHandler),f(this,ye,t.path),f(this,be,t.matchResult))}get req(){return o(this,ve)??f(this,ve,new nt(o(this,ge),o(this,ye),o(this,be))),o(this,ve)}get event(){if(o(this,F)&&"respondWith"in o(this,F))return o(this,F);throw Error("This context has no FetchEvent")}get executionCtx(){if(o(this,F))return o(this,F);throw Error("This context has no ExecutionContext")}get res(){return o(this,S)||f(this,S,new Response(null,{headers:o(this,Y)??f(this,Y,new Headers)}))}set res(e){if(o(this,S)&&e){e=new Response(e.body,e);for(const[t,r]of o(this,S).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=o(this,S).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of s)e.headers.append("set-cookie",n)}else e.headers.set(t,r)}f(this,S,e),this.finalized=!0}get var(){return o(this,H)?Object.fromEntries(o(this,H)):{}}},ge=new WeakMap,ve=new WeakMap,H=new WeakMap,ie=new WeakMap,F=new WeakMap,S=new WeakMap,xe=new WeakMap,oe=new WeakMap,le=new WeakMap,Y=new WeakMap,be=new WeakMap,ye=new WeakMap,U=new WeakSet,se=function(e,t,r){const s=o(this,S)?new Headers(o(this,S).headers):o(this,Y)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,c]of a)i.toLowerCase()==="set-cookie"?s.append(i,c):s.set(i,c)}if(r)for(const[a,i]of Object.entries(r))if(typeof i=="string")s.set(a,i);else{s.delete(a);for(const c of i)s.append(a,c)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??o(this,ie);return new Response(e,{status:n,headers:s})},Ve),w="ALL",kt="all",qt=["get","post","put","delete","options","patch"],lt="Can not add a route since the matcher is already built.",ct=class extends Error{},Ut="__COMPOSED_HANDLER",Bt=e=>e.text("404 Not Found",404),qe=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},P,E,ut,T,K,je,Re,We,dt=(We=class{constructor(t={}){g(this,E);p(this,"get");p(this,"post");p(this,"put");p(this,"delete");p(this,"options");p(this,"patch");p(this,"all");p(this,"on");p(this,"use");p(this,"router");p(this,"getPath");p(this,"_basePath","/");g(this,P,"/");p(this,"routes",[]);g(this,T,Bt);p(this,"errorHandler",qe);p(this,"onError",t=>(this.errorHandler=t,this));p(this,"notFound",t=>(f(this,T,t),this));p(this,"fetch",(t,...r)=>v(this,E,Re).call(this,t,r[1],r[0],t.method));p(this,"request",(t,r,s,n)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${re("/",t)}`,r),s,n)));p(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(v(this,E,Re).call(this,t.request,t,void 0,t.request.method))})});[...qt,kt].forEach(a=>{this[a]=(i,...c)=>(typeof i=="string"?f(this,P,i):v(this,E,K).call(this,a,o(this,P),i),c.forEach(l=>{v(this,E,K).call(this,a,o(this,P),l)}),this)}),this.on=(a,i,...c)=>{for(const l of[i].flat()){f(this,P,l);for(const d of[a].flat())c.map(u=>{v(this,E,K).call(this,d.toUpperCase(),o(this,P),u)})}return this},this.use=(a,...i)=>(typeof a=="string"?f(this,P,a):(f(this,P,"*"),i.unshift(a)),i.forEach(c=>{v(this,E,K).call(this,w,o(this,P),c)}),this);const{strict:s,...n}=t;Object.assign(this,n),this.getPath=s??!0?t.getPath??et:Mt}route(t,r){const s=this.basePath(t);return r.routes.map(n=>{var i;let a;r.errorHandler===qe?a=n.handler:(a=async(c,l)=>(await $e([],r.errorHandler)(c,()=>n.handler(c,l))).res,a[Ut]=n.handler),v(i=s,E,K).call(i,n.method,n.path,a)}),this}basePath(t){const r=v(this,E,ut).call(this);return r._basePath=re(this._basePath,t),r}mount(t,r,s){let n,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?n=l=>l:n=s.replaceRequest));const i=a?l=>{const d=a(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};n||(n=(()=>{const l=re(this._basePath,t),d=l==="/"?0:l.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(d)||"/",new Request(h,u)}})());const c=async(l,d)=>{const u=await r(n(l.req.raw),...i(l));if(u)return u;await d()};return v(this,E,K).call(this,w,re(t,"*"),c),this}},P=new WeakMap,E=new WeakSet,ut=function(){const t=new dt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,T,o(this,T)),t.routes=this.routes,t},T=new WeakMap,K=function(t,r,s){t=t.toUpperCase(),r=re(this._basePath,r);const n={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,n]),this.routes.push(n)},je=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Re=function(t,r,s,n){if(n==="HEAD")return(async()=>new Response(null,await v(this,E,Re).call(this,t,r,s,"GET")))();const a=this.getPath(t,{env:s}),i=this.router.match(n,a),c=new $t(t,{path:a,matchResult:i,env:s,executionCtx:r,notFoundHandler:o(this,T)});if(i[0].length===1){let d;try{d=i[0][0][0][0](c,async()=>{c.res=await o(this,T).call(this,c)})}catch(u){return v(this,E,je).call(this,u,c)}return d instanceof Promise?d.then(u=>u||(c.finalized?c.res:o(this,T).call(this,c))).catch(u=>v(this,E,je).call(this,u,c)):d??o(this,T).call(this,c)}const l=$e(i[0],this.errorHandler,o(this,T));return(async()=>{try{const d=await l(c);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return v(this,E,je).call(this,d,c)}})()},We),Se="[^/]+",pe=".*",me="(?:|/.*)",ne=Symbol(),zt=new Set(".\\+*[^]$()");function Vt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===pe||e===me?1:t===pe||t===me?-1:e===Se?1:t===Se?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var J,X,_,Ke,Me=(Ke=class{constructor(){g(this,J);g(this,X);g(this,_,Object.create(null))}insert(t,r,s,n,a){if(t.length===0){if(o(this,J)!==void 0)throw ne;if(a)return;f(this,J,r);return}const[i,...c]=t,l=i==="*"?c.length===0?["","",pe]:["","",Se]:i==="/*"?["","",me]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const u=l[1];let h=l[2]||Se;if(u&&l[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw ne;if(d=o(this,_)[h],!d){if(Object.keys(o(this,_)).some(m=>m!==pe&&m!==me))throw ne;if(a)return;d=o(this,_)[h]=new Me,u!==""&&f(d,X,n.varIndex++)}!a&&u!==""&&s.push([u,o(d,X)])}else if(d=o(this,_)[i],!d){if(Object.keys(o(this,_)).some(u=>u.length>1&&u!==pe&&u!==me))throw ne;if(a)return;d=o(this,_)[i]=new Me}d.insert(c,r,s,n,a)}buildRegExpStr(){const r=Object.keys(o(this,_)).sort(Vt).map(s=>{const n=o(this,_)[s];return(typeof o(n,X)=="number"?`(${s})@${o(n,X)}`:zt.has(s)?`\\${s}`:s)+n.buildRegExpStr()});return typeof o(this,J)=="number"&&r.unshift(`#${o(this,J)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},J=new WeakMap,X=new WeakMap,_=new WeakMap,Ke),Oe,we,Ge,Wt=(Ge=class{constructor(){g(this,Oe,{varIndex:0});g(this,we,new Me)}insert(e,t,r){const s=[],n=[];for(let i=0;;){let c=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${i}`;return n[i]=[d,l],i++,c=!0,d}),!c)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=n.length-1;i>=0;i--){const[c]=n[i];for(let l=a.length-1;l>=0;l--)if(a[l].indexOf(c)!==-1){a[l]=a[l].replace(c,n[i][1]);break}}return o(this,we).insert(a,t,s,o(this,Oe),r),s}buildRegExp(){let e=o(this,we).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,a,i)=>a!==void 0?(r[++t]=Number(a),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,s]}},Oe=new WeakMap,we=new WeakMap,Ge),ht=[],Kt=[/^$/,[],Object.create(null)],Ae=Object.create(null);function ft(e){return Ae[e]??(Ae[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Gt(){Ae=Object.create(null)}function Yt(e){var d;const t=new Wt,r=[];if(e.length===0)return Kt;const s=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[m,y])=>u?1:m?-1:h.length-y.length),n=Object.create(null);for(let u=0,h=-1,m=s.length;u<m;u++){const[y,O,x]=s[u];y?n[O]=[x.map(([A])=>[A,Object.create(null)]),ht]:h++;let b;try{b=t.insert(O,h,y)}catch(A){throw A===ne?new ct(O):A}y||(r[h]=x.map(([A,ee])=>{const ue=Object.create(null);for(ee-=1;ee>=0;ee--){const[D,Ce]=b[ee];ue[D]=Ce}return[A,ue]}))}const[a,i,c]=t.buildRegExp();for(let u=0,h=r.length;u<h;u++)for(let m=0,y=r[u].length;m<y;m++){const O=(d=r[u][m])==null?void 0:d[1];if(!O)continue;const x=Object.keys(O);for(let b=0,A=x.length;b<A;b++)O[x[b]]=c[O[x[b]]]}const l=[];for(const u in i)l[u]=r[i[u]];return[a,l,n]}function te(e,t){if(e){for(const r of Object.keys(e).sort((s,n)=>n.length-s.length))if(ft(r).test(t))return[...e[r]]}}var B,z,de,pt,mt,Ye,Jt=(Ye=class{constructor(){g(this,de);p(this,"name","RegExpRouter");g(this,B);g(this,z);f(this,B,{[w]:Object.create(null)}),f(this,z,{[w]:Object.create(null)})}add(e,t,r){var c;const s=o(this,B),n=o(this,z);if(!s||!n)throw new Error(lt);s[e]||[s,n].forEach(l=>{l[e]=Object.create(null),Object.keys(l[w]).forEach(d=>{l[e][d]=[...l[w][d]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=ft(t);e===w?Object.keys(s).forEach(d=>{var u;(u=s[d])[t]||(u[t]=te(s[d],t)||te(s[w],t)||[])}):(c=s[e])[t]||(c[t]=te(s[e],t)||te(s[w],t)||[]),Object.keys(s).forEach(d=>{(e===w||e===d)&&Object.keys(s[d]).forEach(u=>{l.test(u)&&s[d][u].push([r,a])})}),Object.keys(n).forEach(d=>{(e===w||e===d)&&Object.keys(n[d]).forEach(u=>l.test(u)&&n[d][u].push([r,a]))});return}const i=tt(t)||[t];for(let l=0,d=i.length;l<d;l++){const u=i[l];Object.keys(n).forEach(h=>{var m;(e===w||e===h)&&((m=n[h])[u]||(m[u]=[...te(s[h],u)||te(s[w],u)||[]]),n[h][u].push([r,a-d+l+1]))})}}match(e,t){Gt();const r=v(this,de,pt).call(this);return this.match=(s,n)=>{const a=r[s]||r[w],i=a[2][n];if(i)return i;const c=n.match(a[0]);if(!c)return[[],ht];const l=c.indexOf("",1);return[a[1][l],c]},this.match(e,t)}},B=new WeakMap,z=new WeakMap,de=new WeakSet,pt=function(){const e=Object.create(null);return Object.keys(o(this,z)).concat(Object.keys(o(this,B))).forEach(t=>{e[t]||(e[t]=v(this,de,mt).call(this,t))}),f(this,B,f(this,z,void 0)),e},mt=function(e){const t=[];let r=e===w;return[o(this,B),o(this,z)].forEach(s=>{const n=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];n.length!==0?(r||(r=!0),t.push(...n)):e!==w&&t.push(...Object.keys(s[w]).map(a=>[a,s[w][a]]))}),r?Yt(t):null},Ye),V,I,Je,Xt=(Je=class{constructor(e){p(this,"name","SmartRouter");g(this,V,[]);g(this,I,[]);f(this,V,e.routers)}add(e,t,r){if(!o(this,I))throw new Error(lt);o(this,I).push([e,t,r])}match(e,t){if(!o(this,I))throw new Error("Fatal error");const r=o(this,V),s=o(this,I),n=r.length;let a=0,i;for(;a<n;a++){const c=r[a];try{for(let l=0,d=s.length;l<d;l++)c.add(...s[l]);i=c.match(e,t)}catch(l){if(l instanceof ct)continue;throw l}this.match=c.match.bind(c),f(this,V,[c]),f(this,I,void 0);break}if(a===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(o(this,I)||o(this,V).length!==1)throw new Error("No active router has been determined yet.");return o(this,V)[0]}},V=new WeakMap,I=new WeakMap,Je),fe=Object.create(null),W,R,Q,ce,j,L,G,Xe,gt=(Xe=class{constructor(e,t,r){g(this,L);g(this,W);g(this,R);g(this,Q);g(this,ce,0);g(this,j,fe);if(f(this,R,r||Object.create(null)),f(this,W,[]),e&&t){const s=Object.create(null);s[e]={handler:t,possibleKeys:[],score:0},f(this,W,[s])}f(this,Q,[])}insert(e,t,r){f(this,ce,++Le(this,ce)._);let s=this;const n=Pt(t),a=[];for(let i=0,c=n.length;i<c;i++){const l=n[i],d=n[i+1],u=Dt(l,d),h=Array.isArray(u)?u[0]:l;if(h in o(s,R)){s=o(s,R)[h],u&&a.push(u[1]);continue}o(s,R)[h]=new gt,u&&(o(s,Q).push(u),a.push(u[1])),s=o(s,R)[h]}return o(s,W).push({[e]:{handler:r,possibleKeys:a.filter((i,c,l)=>l.indexOf(i)===c),score:o(this,ce)}}),s}search(e,t){var c;const r=[];f(this,j,fe);let n=[this];const a=Ze(t),i=[];for(let l=0,d=a.length;l<d;l++){const u=a[l],h=l===d-1,m=[];for(let y=0,O=n.length;y<O;y++){const x=n[y],b=o(x,R)[u];b&&(f(b,j,o(x,j)),h?(o(b,R)["*"]&&r.push(...v(this,L,G).call(this,o(b,R)["*"],e,o(x,j))),r.push(...v(this,L,G).call(this,b,e,o(x,j)))):m.push(b));for(let A=0,ee=o(x,Q).length;A<ee;A++){const ue=o(x,Q)[A],D=o(x,j)===fe?{}:{...o(x,j)};if(ue==="*"){const k=o(x,R)["*"];k&&(r.push(...v(this,L,G).call(this,k,e,o(x,j))),f(k,j,D),m.push(k));continue}const[Ce,Fe,he]=ue;if(!u&&!(he instanceof RegExp))continue;const M=o(x,R)[Ce],yt=a.slice(l).join("/");if(he instanceof RegExp){const k=he.exec(yt);if(k){if(D[Fe]=k[0],r.push(...v(this,L,G).call(this,M,e,o(x,j),D)),Object.keys(o(M,R)).length){f(M,j,D);const Pe=((c=k[0].match(/\//))==null?void 0:c.length)??0;(i[Pe]||(i[Pe]=[])).push(M)}continue}}(he===!0||he.test(u))&&(D[Fe]=u,h?(r.push(...v(this,L,G).call(this,M,e,D,o(x,j))),o(M,R)["*"]&&r.push(...v(this,L,G).call(this,o(M,R)["*"],e,D,o(x,j)))):(f(M,j,D),m.push(M)))}}n=m.concat(i.shift()??[])}return r.length>1&&r.sort((l,d)=>l.score-d.score),[r.map(({handler:l,params:d})=>[l,d])]}},W=new WeakMap,R=new WeakMap,Q=new WeakMap,ce=new WeakMap,j=new WeakMap,L=new WeakSet,G=function(e,t,r,s){const n=[];for(let a=0,i=o(e,W).length;a<i;a++){const c=o(e,W)[a],l=c[t]||c[w],d={};if(l!==void 0&&(l.params=Object.create(null),n.push(l),r!==fe||s&&s!==fe))for(let u=0,h=l.possibleKeys.length;u<h;u++){const m=l.possibleKeys[u],y=d[l.score];l.params[m]=s!=null&&s[m]&&!y?s[m]:r[m]??(s==null?void 0:s[m]),d[l.score]=!0}}return n},Xe),Z,Qe,Qt=(Qe=class{constructor(){p(this,"name","TrieRouter");g(this,Z);f(this,Z,new gt)}add(e,t,r){const s=tt(t);if(s){for(let n=0,a=s.length;n<a;n++)o(this,Z).insert(e,s[n],r);return}o(this,Z).insert(e,t,r)}match(e,t){return o(this,Z).search(e,t)}},Z=new WeakMap,Qe),vt=class extends dt{constructor(e={}){super(e),this.router=e.router??new Xt({routers:[new Jt,new Qt]})}},Zt=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(r.origin),n=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(r.allowMethods);return async function(i,c){var u;function l(h,m){i.res.headers.set(h,m)}const d=await s(i.req.header("origin")||"",i);if(d&&l("Access-Control-Allow-Origin",d),r.origin!=="*"){const h=i.req.header("Vary");h?l("Vary",h):l("Vary","Origin")}if(r.credentials&&l("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&l("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),i.req.method==="OPTIONS"){r.maxAge!=null&&l("Access-Control-Max-Age",r.maxAge.toString());const h=await n(i.req.header("origin")||"",i);h.length&&l("Access-Control-Allow-Methods",h.join(","));let m=r.allowHeaders;if(!(m!=null&&m.length)){const y=i.req.header("Access-Control-Request-Headers");y&&(m=y.split(/\s*,\s*/))}return m!=null&&m.length&&(l("Access-Control-Allow-Headers",m.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await c()}},er=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Ue=(e,t=rr)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let n=t[s[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},tr={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},rr=tr,sr=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const n of r)n===".."&&s.length>0&&s.at(-1)!==".."?s.pop():n!=="."&&s.push(n);return s.join("/")||"."},xt={br:".br",zstd:".zst",gzip:".gz"},nr=Object.keys(xt),ar="index.html",ir=e=>{const t=e.root??"./",r=e.path,s=e.join??sr;return async(n,a)=>{var u,h,m,y;if(n.finalized)return a();let i;if(e.path)i=e.path;else try{if(i=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))throw new Error}catch{return await((u=e.onNotFound)==null?void 0:u.call(e,n.req.path,n)),a()}let c=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(i):i);e.isDir&&await e.isDir(c)&&(c=s(c,ar));const l=e.getContent;let d=await l(c,n);if(d instanceof Response)return n.newResponse(d.body,d);if(d){const O=e.mimes&&Ue(c,e.mimes)||Ue(c);if(n.header("Content-Type",O||"application/octet-stream"),e.precompressed&&(!O||er.test(O))){const x=new Set((h=n.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(b=>b.trim()));for(const b of nr){if(!x.has(b))continue;const A=await l(c+xt[b],n);if(A){d=A,n.header("Content-Encoding",b),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=e.onFound)==null?void 0:m.call(e,c,n)),n.body(d)}await((y=e.onNotFound)==null?void 0:y.call(e,c,n)),await a()}},or=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const n=r[e]||e;if(!n)return null;const a=await s.get(n,{type:"stream"});return a||null},lr=e=>async function(r,s){return ir({...e,getContent:async a=>or(a,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},cr=e=>lr(e);const N=new vt;N.use("/api/*",Zt());N.use("/static/*",cr({root:"./public"}));N.get("/api/projects",async e=>{var r;const{env:t}=e;try{const n=((r=(await t.DB.prepare(`
      SELECT id, name, amount, description, client, status, created_at, updated_at
      FROM projects 
      ORDER BY created_at DESC
    `).all()).results)==null?void 0:r.map(a=>({...a,amount:a.amount/100})))||[];return e.json({projects:n,total:n.length})}catch(s){return console.error("Error fetching projects:",s),e.json({error:"Failed to fetch projects"},500)}});N.get("/api/payments",async e=>{var r;const{env:t}=e;try{const n=((r=(await t.DB.prepare(`
      SELECT id, month, amount, client, description, received_date, created_at, updated_at
      FROM payments 
      ORDER BY month DESC
    `).all()).results)==null?void 0:r.map(a=>({...a,amount:a.amount/100})))||[];return e.json({payments:n,total:n.length})}catch(s){return console.error("Error fetching payments:",s),e.json({error:"Failed to fetch payments"},500)}});N.get("/api/delta",async e=>{var r;const{env:t}=e;try{const s=await t.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM projects WHERE status = 'active'
    `).first(),n=await t.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM payments
    `).first(),a=(s==null?void 0:s.total)||0,i=(n==null?void 0:n.total)||0,c=i-a,d=((r=(await t.DB.prepare(`
      SELECT * FROM delta_calculations 
      ORDER BY calculation_date DESC 
      LIMIT 10
    `).all()).results)==null?void 0:r.map(u=>({...u,total_project_amount:u.total_project_amount/100,total_received_amount:u.total_received_amount/100,delta_amount:u.delta_amount/100})))||[];return e.json({current:{totalProjects:a/100,totalPayments:i/100,delta:c/100,status:c>=0?"excess":"pending"},history:d})}catch(s){return console.error("Error calculating delta:",s),e.json({error:"Failed to calculate delta"},500)}});N.post("/api/projects",async e=>{const{env:t}=e;try{const{name:r,amount:s,description:n,client:a="Digital Span"}=await e.req.json();if(!r||!s)return e.json({error:"Name and amount are required"},400);const i=await t.DB.prepare(`
      INSERT INTO projects (name, amount, description, client)
      VALUES (?, ?, ?, ?)
    `).bind(r,Math.round(s*100),n||"",a).run();return e.json({id:i.meta.last_row_id,name:r,amount:s,description:n,client:a,message:"Project added successfully"})}catch(r){return console.error("Error adding project:",r),e.json({error:"Failed to add project"},500)}});N.post("/api/payments",async e=>{const{env:t}=e;try{const{month:r,amount:s,description:n,client:a="Digital Span"}=await e.req.json();if(!r||!s)return e.json({error:"Month and amount are required"},400);const i=await t.DB.prepare(`
      INSERT INTO payments (month, amount, description, client)
      VALUES (?, ?, ?, ?)
    `).bind(r,Math.round(s*100),n||"",a).run();return e.json({id:i.meta.last_row_id,month:r,amount:s,description:n,client:a,message:"Payment added successfully"})}catch(r){return console.error("Error adding payment:",r),e.json({error:"Failed to add payment"},500)}});N.post("/api/delta/save",async e=>{const{env:t}=e;try{const r=await t.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM projects WHERE status = 'active'
    `).first(),s=await t.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM payments
    `).first(),n=(r==null?void 0:r.total)||0,a=(s==null?void 0:s.total)||0,i=a-n,c=await t.DB.prepare(`
      INSERT INTO delta_calculations (calculation_date, total_project_amount, total_received_amount, delta_amount, notes)
      VALUES (DATE('now'), ?, ?, ?, ?)
    `).bind(n,a,i,"Manual calculation save").run();return e.json({id:c.meta.last_row_id,totalProjects:n/100,totalPayments:a/100,delta:i/100,message:"Delta calculation saved"})}catch(r){return console.error("Error saving delta calculation:",r),e.json({error:"Failed to save delta calculation"},500)}});N.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Delta Calculator - Surprised vs Digital Span</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
        <style>
          .delta-positive { color: #059669; }
          .delta-negative { color: #dc2626; }
          .card { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
        </style>
    </head>
    <body class="bg-gray-50">
        <div class="min-h-screen">
            <!-- Header -->
            <header class="bg-white shadow-sm border-b">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center py-6">
                        <div>
                            <h1 class="text-3xl font-bold text-gray-900">
                                <i class="fas fa-calculator mr-3 text-blue-600"></i>
                                Delta Calculator
                            </h1>
                            <p class="text-sm text-gray-600 mt-1">Surprised vs Digital Span Financial Tracking</p>
                        </div>
                        <button onclick="refreshData()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-sync-alt mr-2"></i>Refresh
                        </button>
                    </div>
                </div>
            </header>

            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <!-- Delta Summary Cards -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-lg p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
                                <i class="fas fa-project-diagram"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm text-gray-600">Total Projects</p>
                                <p class="text-2xl font-semibold text-gray-900" id="totalProjects">₹0</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-green-100 text-green-600">
                                <i class="fas fa-money-bill-wave"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm text-gray-600">Total Received</p>
                                <p class="text-2xl font-semibold text-gray-900" id="totalPayments">₹0</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-purple-100 text-purple-600">
                                <i class="fas fa-balance-scale"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm text-gray-600">Delta Amount</p>
                                <p class="text-2xl font-semibold" id="deltaAmount">₹0</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-lg p-6 card">
                        <div class="flex items-center">
                            <div class="p-3 rounded-full bg-orange-100 text-orange-600">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="ml-4">
                                <p class="text-sm text-gray-600">Status</p>
                                <p class="text-lg font-semibold" id="deltaStatus">Calculating...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Projects Section -->
                    <div class="bg-white rounded-lg shadow-sm">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="text-lg font-semibold text-gray-900">
                                <i class="fas fa-tasks mr-2"></i>Projects
                            </h2>
                        </div>
                        <div class="p-6">
                            <div class="overflow-hidden" style="max-height: 400px; overflow-y: auto;">
                                <table class="min-w-full" id="projectsTable">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                                            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200">
                                        <tr><td colspan="2" class="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Payments Section -->
                    <div class="bg-white rounded-lg shadow-sm">
                        <div class="px-6 py-4 border-b border-gray-200">
                            <h2 class="text-lg font-semibold text-gray-900">
                                <i class="fas fa-credit-card mr-2"></i>Payments Received
                            </h2>
                        </div>
                        <div class="p-6">
                            <div class="overflow-hidden" style="max-height: 400px; overflow-y: auto;">
                                <table class="min-w-full" id="paymentsTable">
                                    <thead class="bg-gray-50">
                                        <tr>
                                            <th class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                                            <th class="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200">
                                        <tr><td colspan="2" class="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="mt-8 bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">
                        <i class="fas fa-plus-circle mr-2"></i>Quick Actions
                    </h3>
                    <div class="flex flex-wrap gap-4">
                        <button onclick="showAddProjectForm()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                            <i class="fas fa-plus mr-2"></i>Add Project
                        </button>
                        <button onclick="showAddPaymentForm()" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                            <i class="fas fa-plus mr-2"></i>Add Payment
                        </button>
                        <button onclick="saveDeltaCalculation()" class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                            <i class="fas fa-save mr-2"></i>Save Current Delta
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Project Modal -->
        <div id="addProjectModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-lg font-semibold mb-4">Add New Project</h3>
                    <form id="projectForm">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                            <input type="text" id="projectName" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                            <input type="number" id="projectAmount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea id="projectDescription" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" onclick="hideAddProjectForm()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                            <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Project</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Add Payment Modal -->
        <div id="addPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-lg font-semibold mb-4">Add New Payment</h3>
                    <form id="paymentForm">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Month (YYYY-MM)</label>
                            <input type="month" id="paymentMonth" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                            <input type="number" id="paymentAmount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea id="paymentDescription" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" onclick="hideAddPaymentForm()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                            <button type="submit" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Add Payment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));const Be=new vt,dr=Object.assign({"/src/index.tsx":N});let bt=!1;for(const[,e]of Object.entries(dr))e&&(Be.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Be.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),bt=!0);if(!bt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Be as default};
