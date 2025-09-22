var wt=Object.defineProperty;var ke=e=>{throw TypeError(e)};var Et=(e,t,r)=>t in e?wt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var p=(e,t,r)=>Et(e,typeof t!="symbol"?t+"":t,r),Te=(e,t,r)=>t.has(e)||ke("Cannot "+r);var o=(e,t,r)=>(Te(e,t,"read from private field"),r?r.call(e):t.get(e)),g=(e,t,r)=>t.has(e)?ke("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(Te(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),b=(e,t,r)=>(Te(e,t,"access private method"),r);var Ie=(e,t,r,s)=>({set _(n){f(e,t,n,r)},get _(){return o(e,t,s)}});var Le=(e,t,r)=>(s,n)=>{let a=-1;return i(0);async function i(c){if(c<=a)throw new Error("next() called multiple times");a=c;let l,d=!1,u;if(e[c]?(u=e[c][0][0],s.req.routeIndex=c):u=c===e.length&&n||void 0,u)try{l=await u(s,()=>i(c+1))}catch(h){if(h instanceof Error&&t)s.error=h,l=await t(h,s),d=!0;else throw h}else s.finalized===!1&&r&&(l=await r(s));return l&&(s.finalized===!1||d)&&(s.res=l),s}},jt=Symbol(),Pt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,a=(e instanceof nt?e.raw.headers:e.headers).get("Content-Type");return a!=null&&a.startsWith("multipart/form-data")||a!=null&&a.startsWith("application/x-www-form-urlencoded")?Rt(e,{all:r,dot:s}):{}};async function Rt(e,t){const r=await e.formData();return r?At(r,t):{}}function At(e,t){const r=Object.create(null);return e.forEach((s,n)=>{t.all||n.endsWith("[]")?St(r,n,s):r[n]=s}),t.dot&&Object.entries(r).forEach(([s,n])=>{s.includes(".")&&(Ct(r,s,n),delete r[s])}),r}var St=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Ct=(e,t,r)=>{let s=e;const n=t.split(".");n.forEach((a,i)=>{i===n.length-1?s[a]=r:((!s[a]||typeof s[a]!="object"||Array.isArray(s[a])||s[a]instanceof File)&&(s[a]=Object.create(null)),s=s[a])})},Ze=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},Ot=e=>{const{groups:t,path:r}=Tt(e),s=Ze(r);return Dt(s,t)},Tt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const n=`@${s}`;return t.push([n,r]),n}),{groups:t,path:e}},Dt=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let n=e.length-1;n>=0;n--)if(e[n].includes(s)){e[n]=e[n].replace(s,t[r][1]);break}}return e},Ee={},_t=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return Ee[s]||(r[2]?Ee[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:Ee[s]=[e,r[1],!0]),Ee[s]}return null},Fe=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Mt=e=>Fe(e,decodeURI),et=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const n=t.charCodeAt(s);if(n===37){const a=t.indexOf("?",s),i=t.slice(r,a===-1?void 0:a);return Mt(i.includes("%25")?i.replace(/%25/g,"%2525"):i)}else if(n===63)break}return t.slice(r,s)},Nt=e=>{const t=et(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},re=(e,t,...r)=>(r.length&&(t=re(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),tt=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))s+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){r.length===0&&s===""?r.push("/"):r.push(s);const a=n.replace("?","");s+="/"+a,r.push(s)}else s+="/"+n}),r.filter((n,a,i)=>i.indexOf(n)===a)},De=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Fe(e,st):e):e,rt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let i=e.indexOf(`?${t}`,8);for(i===-1&&(i=e.indexOf(`&${t}`,8));i!==-1;){const c=e.charCodeAt(i+t.length+1);if(c===61){const l=i+t.length+2,d=e.indexOf("&",l);return De(e.slice(l,d===-1?void 0:d))}else if(c==38||isNaN(c))return"";i=e.indexOf(`&${t}`,i+1)}if(s=/[%+]/.test(e),!s)return}const n={};s??(s=/[%+]/.test(e));let a=e.indexOf("?",8);for(;a!==-1;){const i=e.indexOf("&",a+1);let c=e.indexOf("=",a);c>i&&i!==-1&&(c=-1);let l=e.slice(a+1,c===-1?i===-1?void 0:i:c);if(s&&(l=De(l)),a=i,l==="")continue;let d;c===-1?d="":(d=e.slice(c+1,i===-1?void 0:i),s&&(d=De(d))),r?(n[l]&&Array.isArray(n[l])||(n[l]=[]),n[l].push(d)):n[l]??(n[l]=d)}return t?n[t]:n},Ft=rt,Ht=(e,t)=>rt(e,t,!0),st=decodeURIComponent,qe=e=>Fe(e,st),ae,O,L,at,it,Me,$,ze,nt=(ze=class{constructor(e,t="/",r=[[]]){g(this,L);p(this,"raw");g(this,ae);g(this,O);p(this,"routeIndex",0);p(this,"path");p(this,"bodyCache",{});g(this,$,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const n=Object.keys(t)[0];return n?t[n].then(a=>(n==="json"&&(a=JSON.stringify(a)),new Response(a)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,O,r),f(this,ae,{})}param(e){return e?b(this,L,at).call(this,e):b(this,L,it).call(this)}query(e){return Ft(this.url,e)}queries(e){return Ht(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Pt(this,e))}json(){return o(this,$).call(this,"text").then(e=>JSON.parse(e))}text(){return o(this,$).call(this,"text")}arrayBuffer(){return o(this,$).call(this,"arrayBuffer")}blob(){return o(this,$).call(this,"blob")}formData(){return o(this,$).call(this,"formData")}addValidatedData(e,t){o(this,ae)[e]=t}valid(e){return o(this,ae)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[jt](){return o(this,O)}get matchedRoutes(){return o(this,O)[0].map(([[,e]])=>e)}get routePath(){return o(this,O)[0].map(([[,e]])=>e)[this.routeIndex].path}},ae=new WeakMap,O=new WeakMap,L=new WeakSet,at=function(e){const t=o(this,O)[0][this.routeIndex][1][e],r=b(this,L,Me).call(this,t);return r&&/\%/.test(r)?qe(r):r},it=function(){const e={},t=Object.keys(o(this,O)[0][this.routeIndex][1]);for(const r of t){const s=b(this,L,Me).call(this,o(this,O)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?qe(s):s)}return e},Me=function(e){return o(this,O)[1]?o(this,O)[1][e]:e},$=new WeakMap,ze),kt={Stringify:1},ot=async(e,t,r,s,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const a=e.callbacks;return a!=null&&a.length?(n?n[0]+=e:n=[e],Promise.all(a.map(c=>c({phase:t,buffer:n,context:s}))).then(c=>Promise.all(c.filter(Boolean).map(l=>ot(l,t,!1,s,n))).then(()=>n[0]))):Promise.resolve(e)},It="text/plain; charset=UTF-8",_e=(e,t)=>({"Content-Type":e,...t}),ge,be,F,ie,H,A,xe,oe,le,G,ye,ve,U,se,We,Lt=(We=class{constructor(e,t){g(this,U);g(this,ge);g(this,be);p(this,"env",{});g(this,F);p(this,"finalized",!1);p(this,"error");g(this,ie);g(this,H);g(this,A);g(this,xe);g(this,oe);g(this,le);g(this,G);g(this,ye);g(this,ve);p(this,"render",(...e)=>(o(this,oe)??f(this,oe,t=>this.html(t)),o(this,oe).call(this,...e)));p(this,"setLayout",e=>f(this,xe,e));p(this,"getLayout",()=>o(this,xe));p(this,"setRenderer",e=>{f(this,oe,e)});p(this,"header",(e,t,r)=>{this.finalized&&f(this,A,new Response(o(this,A).body,o(this,A)));const s=o(this,A)?o(this,A).headers:o(this,G)??f(this,G,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});p(this,"status",e=>{f(this,ie,e)});p(this,"set",(e,t)=>{o(this,F)??f(this,F,new Map),o(this,F).set(e,t)});p(this,"get",e=>o(this,F)?o(this,F).get(e):void 0);p(this,"newResponse",(...e)=>b(this,U,se).call(this,...e));p(this,"body",(e,t,r)=>b(this,U,se).call(this,e,t,r));p(this,"text",(e,t,r)=>!o(this,G)&&!o(this,ie)&&!t&&!r&&!this.finalized?new Response(e):b(this,U,se).call(this,e,t,_e(It,r)));p(this,"json",(e,t,r)=>b(this,U,se).call(this,JSON.stringify(e),t,_e("application/json",r)));p(this,"html",(e,t,r)=>{const s=n=>b(this,U,se).call(this,n,t,_e("text/html; charset=UTF-8",r));return typeof e=="object"?ot(e,kt.Stringify,!1,{}).then(s):s(e)});p(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});p(this,"notFound",()=>(o(this,le)??f(this,le,()=>new Response),o(this,le).call(this,this)));f(this,ge,e),t&&(f(this,H,t.executionCtx),this.env=t.env,f(this,le,t.notFoundHandler),f(this,ve,t.path),f(this,ye,t.matchResult))}get req(){return o(this,be)??f(this,be,new nt(o(this,ge),o(this,ve),o(this,ye))),o(this,be)}get event(){if(o(this,H)&&"respondWith"in o(this,H))return o(this,H);throw Error("This context has no FetchEvent")}get executionCtx(){if(o(this,H))return o(this,H);throw Error("This context has no ExecutionContext")}get res(){return o(this,A)||f(this,A,new Response(null,{headers:o(this,G)??f(this,G,new Headers)}))}set res(e){if(o(this,A)&&e){e=new Response(e.body,e);for(const[t,r]of o(this,A).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=o(this,A).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of s)e.headers.append("set-cookie",n)}else e.headers.set(t,r)}f(this,A,e),this.finalized=!0}get var(){return o(this,F)?Object.fromEntries(o(this,F)):{}}},ge=new WeakMap,be=new WeakMap,F=new WeakMap,ie=new WeakMap,H=new WeakMap,A=new WeakMap,xe=new WeakMap,oe=new WeakMap,le=new WeakMap,G=new WeakMap,ye=new WeakMap,ve=new WeakMap,U=new WeakSet,se=function(e,t,r){const s=o(this,A)?new Headers(o(this,A).headers):o(this,G)??new Headers;if(typeof t=="object"&&"headers"in t){const a=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[i,c]of a)i.toLowerCase()==="set-cookie"?s.append(i,c):s.set(i,c)}if(r)for(const[a,i]of Object.entries(r))if(typeof i=="string")s.set(a,i);else{s.delete(a);for(const c of i)s.append(a,c)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??o(this,ie);return new Response(e,{status:n,headers:s})},We),w="ALL",qt="all",$t=["get","post","put","delete","options","patch"],lt="Can not add a route since the matcher is already built.",ct=class extends Error{},Ut="__COMPOSED_HANDLER",Bt=e=>e.text("404 Not Found",404),$e=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},T,E,ut,D,Y,je,Pe,Ve,dt=(Ve=class{constructor(t={}){g(this,E);p(this,"get");p(this,"post");p(this,"put");p(this,"delete");p(this,"options");p(this,"patch");p(this,"all");p(this,"on");p(this,"use");p(this,"router");p(this,"getPath");p(this,"_basePath","/");g(this,T,"/");p(this,"routes",[]);g(this,D,Bt);p(this,"errorHandler",$e);p(this,"onError",t=>(this.errorHandler=t,this));p(this,"notFound",t=>(f(this,D,t),this));p(this,"fetch",(t,...r)=>b(this,E,Pe).call(this,t,r[1],r[0],t.method));p(this,"request",(t,r,s,n)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${re("/",t)}`,r),s,n)));p(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(b(this,E,Pe).call(this,t.request,t,void 0,t.request.method))})});[...$t,qt].forEach(a=>{this[a]=(i,...c)=>(typeof i=="string"?f(this,T,i):b(this,E,Y).call(this,a,o(this,T),i),c.forEach(l=>{b(this,E,Y).call(this,a,o(this,T),l)}),this)}),this.on=(a,i,...c)=>{for(const l of[i].flat()){f(this,T,l);for(const d of[a].flat())c.map(u=>{b(this,E,Y).call(this,d.toUpperCase(),o(this,T),u)})}return this},this.use=(a,...i)=>(typeof a=="string"?f(this,T,a):(f(this,T,"*"),i.unshift(a)),i.forEach(c=>{b(this,E,Y).call(this,w,o(this,T),c)}),this);const{strict:s,...n}=t;Object.assign(this,n),this.getPath=s??!0?t.getPath??et:Nt}route(t,r){const s=this.basePath(t);return r.routes.map(n=>{var i;let a;r.errorHandler===$e?a=n.handler:(a=async(c,l)=>(await Le([],r.errorHandler)(c,()=>n.handler(c,l))).res,a[Ut]=n.handler),b(i=s,E,Y).call(i,n.method,n.path,a)}),this}basePath(t){const r=b(this,E,ut).call(this);return r._basePath=re(this._basePath,t),r}mount(t,r,s){let n,a;s&&(typeof s=="function"?a=s:(a=s.optionHandler,s.replaceRequest===!1?n=l=>l:n=s.replaceRequest));const i=a?l=>{const d=a(l);return Array.isArray(d)?d:[d]}:l=>{let d;try{d=l.executionCtx}catch{}return[l.env,d]};n||(n=(()=>{const l=re(this._basePath,t),d=l==="/"?0:l.length;return u=>{const h=new URL(u.url);return h.pathname=h.pathname.slice(d)||"/",new Request(h,u)}})());const c=async(l,d)=>{const u=await r(n(l.req.raw),...i(l));if(u)return u;await d()};return b(this,E,Y).call(this,w,re(t,"*"),c),this}},T=new WeakMap,E=new WeakSet,ut=function(){const t=new dt({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,D,o(this,D)),t.routes=this.routes,t},D=new WeakMap,Y=function(t,r,s){t=t.toUpperCase(),r=re(this._basePath,r);const n={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,n]),this.routes.push(n)},je=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Pe=function(t,r,s,n){if(n==="HEAD")return(async()=>new Response(null,await b(this,E,Pe).call(this,t,r,s,"GET")))();const a=this.getPath(t,{env:s}),i=this.router.match(n,a),c=new Lt(t,{path:a,matchResult:i,env:s,executionCtx:r,notFoundHandler:o(this,D)});if(i[0].length===1){let d;try{d=i[0][0][0][0](c,async()=>{c.res=await o(this,D).call(this,c)})}catch(u){return b(this,E,je).call(this,u,c)}return d instanceof Promise?d.then(u=>u||(c.finalized?c.res:o(this,D).call(this,c))).catch(u=>b(this,E,je).call(this,u,c)):d??o(this,D).call(this,c)}const l=Le(i[0],this.errorHandler,o(this,D));return(async()=>{try{const d=await l(c);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return b(this,E,je).call(this,d,c)}})()},Ve),Ae="[^/]+",pe=".*",me="(?:|/.*)",ne=Symbol(),zt=new Set(".\\+*[^]$()");function Wt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===pe||e===me?1:t===pe||t===me?-1:e===Ae?1:t===Ae?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var J,X,_,Ye,Ne=(Ye=class{constructor(){g(this,J);g(this,X);g(this,_,Object.create(null))}insert(t,r,s,n,a){if(t.length===0){if(o(this,J)!==void 0)throw ne;if(a)return;f(this,J,r);return}const[i,...c]=t,l=i==="*"?c.length===0?["","",pe]:["","",Ae]:i==="/*"?["","",me]:i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(l){const u=l[1];let h=l[2]||Ae;if(u&&l[2]&&(h===".*"||(h=h.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(h))))throw ne;if(d=o(this,_)[h],!d){if(Object.keys(o(this,_)).some(m=>m!==pe&&m!==me))throw ne;if(a)return;d=o(this,_)[h]=new Ne,u!==""&&f(d,X,n.varIndex++)}!a&&u!==""&&s.push([u,o(d,X)])}else if(d=o(this,_)[i],!d){if(Object.keys(o(this,_)).some(u=>u.length>1&&u!==pe&&u!==me))throw ne;if(a)return;d=o(this,_)[i]=new Ne}d.insert(c,r,s,n,a)}buildRegExpStr(){const r=Object.keys(o(this,_)).sort(Wt).map(s=>{const n=o(this,_)[s];return(typeof o(n,X)=="number"?`(${s})@${o(n,X)}`:zt.has(s)?`\\${s}`:s)+n.buildRegExpStr()});return typeof o(this,J)=="number"&&r.unshift(`#${o(this,J)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},J=new WeakMap,X=new WeakMap,_=new WeakMap,Ye),Se,we,Ke,Vt=(Ke=class{constructor(){g(this,Se,{varIndex:0});g(this,we,new Ne)}insert(e,t,r){const s=[],n=[];for(let i=0;;){let c=!1;if(e=e.replace(/\{[^}]+\}/g,l=>{const d=`@\\${i}`;return n[i]=[d,l],i++,c=!0,d}),!c)break}const a=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let i=n.length-1;i>=0;i--){const[c]=n[i];for(let l=a.length-1;l>=0;l--)if(a[l].indexOf(c)!==-1){a[l]=a[l].replace(c,n[i][1]);break}}return o(this,we).insert(a,t,s,o(this,Se),r),s}buildRegExp(){let e=o(this,we).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,a,i)=>a!==void 0?(r[++t]=Number(a),"$()"):(i!==void 0&&(s[Number(i)]=++t),"")),[new RegExp(`^${e}`),r,s]}},Se=new WeakMap,we=new WeakMap,Ke),ht=[],Yt=[/^$/,[],Object.create(null)],Re=Object.create(null);function ft(e){return Re[e]??(Re[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Kt(){Re=Object.create(null)}function Gt(e){var d;const t=new Vt,r=[];if(e.length===0)return Yt;const s=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,h],[m,v])=>u?1:m?-1:h.length-v.length),n=Object.create(null);for(let u=0,h=-1,m=s.length;u<m;u++){const[v,S,x]=s[u];v?n[S]=[x.map(([R])=>[R,Object.create(null)]),ht]:h++;let y;try{y=t.insert(S,h,v)}catch(R){throw R===ne?new ct(S):R}v||(r[h]=x.map(([R,ee])=>{const ue=Object.create(null);for(ee-=1;ee>=0;ee--){const[M,Ce]=y[ee];ue[M]=Ce}return[R,ue]}))}const[a,i,c]=t.buildRegExp();for(let u=0,h=r.length;u<h;u++)for(let m=0,v=r[u].length;m<v;m++){const S=(d=r[u][m])==null?void 0:d[1];if(!S)continue;const x=Object.keys(S);for(let y=0,R=x.length;y<R;y++)S[x[y]]=c[S[x[y]]]}const l=[];for(const u in i)l[u]=r[i[u]];return[a,l,n]}function te(e,t){if(e){for(const r of Object.keys(e).sort((s,n)=>n.length-s.length))if(ft(r).test(t))return[...e[r]]}}var B,z,de,pt,mt,Ge,Jt=(Ge=class{constructor(){g(this,de);p(this,"name","RegExpRouter");g(this,B);g(this,z);f(this,B,{[w]:Object.create(null)}),f(this,z,{[w]:Object.create(null)})}add(e,t,r){var c;const s=o(this,B),n=o(this,z);if(!s||!n)throw new Error(lt);s[e]||[s,n].forEach(l=>{l[e]=Object.create(null),Object.keys(l[w]).forEach(d=>{l[e][d]=[...l[w][d]]})}),t==="/*"&&(t="*");const a=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const l=ft(t);e===w?Object.keys(s).forEach(d=>{var u;(u=s[d])[t]||(u[t]=te(s[d],t)||te(s[w],t)||[])}):(c=s[e])[t]||(c[t]=te(s[e],t)||te(s[w],t)||[]),Object.keys(s).forEach(d=>{(e===w||e===d)&&Object.keys(s[d]).forEach(u=>{l.test(u)&&s[d][u].push([r,a])})}),Object.keys(n).forEach(d=>{(e===w||e===d)&&Object.keys(n[d]).forEach(u=>l.test(u)&&n[d][u].push([r,a]))});return}const i=tt(t)||[t];for(let l=0,d=i.length;l<d;l++){const u=i[l];Object.keys(n).forEach(h=>{var m;(e===w||e===h)&&((m=n[h])[u]||(m[u]=[...te(s[h],u)||te(s[w],u)||[]]),n[h][u].push([r,a-d+l+1]))})}}match(e,t){Kt();const r=b(this,de,pt).call(this);return this.match=(s,n)=>{const a=r[s]||r[w],i=a[2][n];if(i)return i;const c=n.match(a[0]);if(!c)return[[],ht];const l=c.indexOf("",1);return[a[1][l],c]},this.match(e,t)}},B=new WeakMap,z=new WeakMap,de=new WeakSet,pt=function(){const e=Object.create(null);return Object.keys(o(this,z)).concat(Object.keys(o(this,B))).forEach(t=>{e[t]||(e[t]=b(this,de,mt).call(this,t))}),f(this,B,f(this,z,void 0)),e},mt=function(e){const t=[];let r=e===w;return[o(this,B),o(this,z)].forEach(s=>{const n=s[e]?Object.keys(s[e]).map(a=>[a,s[e][a]]):[];n.length!==0?(r||(r=!0),t.push(...n)):e!==w&&t.push(...Object.keys(s[w]).map(a=>[a,s[w][a]]))}),r?Gt(t):null},Ge),W,k,Je,Xt=(Je=class{constructor(e){p(this,"name","SmartRouter");g(this,W,[]);g(this,k,[]);f(this,W,e.routers)}add(e,t,r){if(!o(this,k))throw new Error(lt);o(this,k).push([e,t,r])}match(e,t){if(!o(this,k))throw new Error("Fatal error");const r=o(this,W),s=o(this,k),n=r.length;let a=0,i;for(;a<n;a++){const c=r[a];try{for(let l=0,d=s.length;l<d;l++)c.add(...s[l]);i=c.match(e,t)}catch(l){if(l instanceof ct)continue;throw l}this.match=c.match.bind(c),f(this,W,[c]),f(this,k,void 0);break}if(a===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,i}get activeRouter(){if(o(this,k)||o(this,W).length!==1)throw new Error("No active router has been determined yet.");return o(this,W)[0]}},W=new WeakMap,k=new WeakMap,Je),fe=Object.create(null),V,P,Q,ce,j,I,K,Xe,gt=(Xe=class{constructor(e,t,r){g(this,I);g(this,V);g(this,P);g(this,Q);g(this,ce,0);g(this,j,fe);if(f(this,P,r||Object.create(null)),f(this,V,[]),e&&t){const s=Object.create(null);s[e]={handler:t,possibleKeys:[],score:0},f(this,V,[s])}f(this,Q,[])}insert(e,t,r){f(this,ce,++Ie(this,ce)._);let s=this;const n=Ot(t),a=[];for(let i=0,c=n.length;i<c;i++){const l=n[i],d=n[i+1],u=_t(l,d),h=Array.isArray(u)?u[0]:l;if(h in o(s,P)){s=o(s,P)[h],u&&a.push(u[1]);continue}o(s,P)[h]=new gt,u&&(o(s,Q).push(u),a.push(u[1])),s=o(s,P)[h]}return o(s,V).push({[e]:{handler:r,possibleKeys:a.filter((i,c,l)=>l.indexOf(i)===c),score:o(this,ce)}}),s}search(e,t){var c;const r=[];f(this,j,fe);let n=[this];const a=Ze(t),i=[];for(let l=0,d=a.length;l<d;l++){const u=a[l],h=l===d-1,m=[];for(let v=0,S=n.length;v<S;v++){const x=n[v],y=o(x,P)[u];y&&(f(y,j,o(x,j)),h?(o(y,P)["*"]&&r.push(...b(this,I,K).call(this,o(y,P)["*"],e,o(x,j))),r.push(...b(this,I,K).call(this,y,e,o(x,j)))):m.push(y));for(let R=0,ee=o(x,Q).length;R<ee;R++){const ue=o(x,Q)[R],M=o(x,j)===fe?{}:{...o(x,j)};if(ue==="*"){const q=o(x,P)["*"];q&&(r.push(...b(this,I,K).call(this,q,e,o(x,j))),f(q,j,M),m.push(q));continue}const[Ce,He,he]=ue;if(!u&&!(he instanceof RegExp))continue;const N=o(x,P)[Ce],vt=a.slice(l).join("/");if(he instanceof RegExp){const q=he.exec(vt);if(q){if(M[He]=q[0],r.push(...b(this,I,K).call(this,N,e,o(x,j),M)),Object.keys(o(N,P)).length){f(N,j,M);const Oe=((c=q[0].match(/\//))==null?void 0:c.length)??0;(i[Oe]||(i[Oe]=[])).push(N)}continue}}(he===!0||he.test(u))&&(M[He]=u,h?(r.push(...b(this,I,K).call(this,N,e,M,o(x,j))),o(N,P)["*"]&&r.push(...b(this,I,K).call(this,o(N,P)["*"],e,M,o(x,j)))):(f(N,j,M),m.push(N)))}}n=m.concat(i.shift()??[])}return r.length>1&&r.sort((l,d)=>l.score-d.score),[r.map(({handler:l,params:d})=>[l,d])]}},V=new WeakMap,P=new WeakMap,Q=new WeakMap,ce=new WeakMap,j=new WeakMap,I=new WeakSet,K=function(e,t,r,s){const n=[];for(let a=0,i=o(e,V).length;a<i;a++){const c=o(e,V)[a],l=c[t]||c[w],d={};if(l!==void 0&&(l.params=Object.create(null),n.push(l),r!==fe||s&&s!==fe))for(let u=0,h=l.possibleKeys.length;u<h;u++){const m=l.possibleKeys[u],v=d[l.score];l.params[m]=s!=null&&s[m]&&!v?s[m]:r[m]??(s==null?void 0:s[m]),d[l.score]=!0}}return n},Xe),Z,Qe,Qt=(Qe=class{constructor(){p(this,"name","TrieRouter");g(this,Z);f(this,Z,new gt)}add(e,t,r){const s=tt(t);if(s){for(let n=0,a=s.length;n<a;n++)o(this,Z).insert(e,s[n],r);return}o(this,Z).insert(e,t,r)}match(e,t){return o(this,Z).search(e,t)}},Z=new WeakMap,Qe),bt=class extends dt{constructor(e={}){super(e),this.router=e.router??new Xt({routers:[new Jt,new Qt]})}},Zt=e=>{const r={...{origin:"*",allowMethods:["GET","HEAD","PUT","POST","DELETE","PATCH"],allowHeaders:[],exposeHeaders:[]},...e},s=(a=>typeof a=="string"?a==="*"?()=>a:i=>a===i?i:null:typeof a=="function"?a:i=>a.includes(i)?i:null)(r.origin),n=(a=>typeof a=="function"?a:Array.isArray(a)?()=>a:()=>[])(r.allowMethods);return async function(i,c){var u;function l(h,m){i.res.headers.set(h,m)}const d=await s(i.req.header("origin")||"",i);if(d&&l("Access-Control-Allow-Origin",d),r.origin!=="*"){const h=i.req.header("Vary");h?l("Vary",h):l("Vary","Origin")}if(r.credentials&&l("Access-Control-Allow-Credentials","true"),(u=r.exposeHeaders)!=null&&u.length&&l("Access-Control-Expose-Headers",r.exposeHeaders.join(",")),i.req.method==="OPTIONS"){r.maxAge!=null&&l("Access-Control-Max-Age",r.maxAge.toString());const h=await n(i.req.header("origin")||"",i);h.length&&l("Access-Control-Allow-Methods",h.join(","));let m=r.allowHeaders;if(!(m!=null&&m.length)){const v=i.req.header("Access-Control-Request-Headers");v&&(m=v.split(/\s*,\s*/))}return m!=null&&m.length&&(l("Access-Control-Allow-Headers",m.join(",")),i.res.headers.append("Vary","Access-Control-Request-Headers")),i.res.headers.delete("Content-Length"),i.res.headers.delete("Content-Type"),new Response(null,{headers:i.res.headers,status:204,statusText:"No Content"})}await c()}},er=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Ue=(e,t=rr)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let n=t[s[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},tr={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},rr=tr,sr=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const n of r)n===".."&&s.length>0&&s.at(-1)!==".."?s.pop():n!=="."&&s.push(n);return s.join("/")||"."},xt={br:".br",zstd:".zst",gzip:".gz"},nr=Object.keys(xt),ar="index.html",ir=e=>{const t=e.root??"./",r=e.path,s=e.join??sr;return async(n,a)=>{var u,h,m,v;if(n.finalized)return a();let i;if(e.path)i=e.path;else try{if(i=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i))throw new Error}catch{return await((u=e.onNotFound)==null?void 0:u.call(e,n.req.path,n)),a()}let c=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(i):i);e.isDir&&await e.isDir(c)&&(c=s(c,ar));const l=e.getContent;let d=await l(c,n);if(d instanceof Response)return n.newResponse(d.body,d);if(d){const S=e.mimes&&Ue(c,e.mimes)||Ue(c);if(n.header("Content-Type",S||"application/octet-stream"),e.precompressed&&(!S||er.test(S))){const x=new Set((h=n.req.header("Accept-Encoding"))==null?void 0:h.split(",").map(y=>y.trim()));for(const y of nr){if(!x.has(y))continue;const R=await l(c+xt[y],n);if(R){d=R,n.header("Content-Encoding",y),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=e.onFound)==null?void 0:m.call(e,c,n)),n.body(d)}await((v=e.onNotFound)==null?void 0:v.call(e,c,n)),await a()}},or=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const n=r[e]||e;if(!n)return null;const a=await s.get(n,{type:"stream"});return a||null},lr=e=>async function(r,s){return ir({...e,getContent:async a=>or(a,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},cr=e=>lr(e);const C=new bt;C.use("/api/*",Zt());C.use("/static/*",cr({root:"./public"}));C.get("/api/projects",async e=>{var r;const{env:t}=e;try{const n=((r=(await t.DB.prepare(`
      SELECT id, name, amount, description, client, status, created_at, updated_at
      FROM projects 
      ORDER BY created_at DESC
    `).all()).results)==null?void 0:r.map(a=>({...a,amount:a.amount/100})))||[];return e.json({projects:n,total:n.length})}catch(s){return console.error("Error fetching projects:",s),e.json({error:"Failed to fetch projects"},500)}});C.get("/api/payments",async e=>{var r;const{env:t}=e;try{const n=((r=(await t.DB.prepare(`
      SELECT id, month, amount, client, description, received_date, created_at, updated_at
      FROM payments 
      ORDER BY month DESC
    `).all()).results)==null?void 0:r.map(a=>({...a,amount:a.amount/100})))||[];return e.json({payments:n,total:n.length})}catch(s){return console.error("Error fetching payments:",s),e.json({error:"Failed to fetch payments"},500)}});C.get("/api/delta",async e=>{var r;const{env:t}=e;try{const s=await t.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM projects WHERE status = 'active'
    `).first(),n=await t.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM payments
    `).first(),a=(s==null?void 0:s.total)||0,i=(n==null?void 0:n.total)||0,c=i-a,d=((r=(await t.DB.prepare(`
      SELECT * FROM delta_calculations 
      ORDER BY calculation_date DESC 
      LIMIT 10
    `).all()).results)==null?void 0:r.map(u=>({...u,total_project_amount:u.total_project_amount/100,total_received_amount:u.total_received_amount/100,delta_amount:u.delta_amount/100})))||[];return e.json({current:{totalProjects:a/100,totalPayments:i/100,delta:c/100,status:c>=0?"excess":"pending"},history:d})}catch(s){return console.error("Error calculating delta:",s),e.json({error:"Failed to calculate delta"},500)}});C.post("/api/projects",async e=>{const{env:t}=e;try{const{name:r,amount:s,description:n,client:a="Digital Span"}=await e.req.json();if(!r||!s)return e.json({error:"Name and amount are required"},400);const i=await t.DB.prepare(`
      INSERT INTO projects (name, amount, description, client)
      VALUES (?, ?, ?, ?)
    `).bind(r,Math.round(s*100),n||"",a).run();return e.json({id:i.meta.last_row_id,name:r,amount:s,description:n,client:a,message:"Project added successfully"})}catch(r){return console.error("Error adding project:",r),e.json({error:"Failed to add project"},500)}});C.post("/api/payments",async e=>{const{env:t}=e;try{const{month:r,amount:s,description:n,client:a="Digital Span"}=await e.req.json();if(!r||!s)return e.json({error:"Month and amount are required"},400);const i=await t.DB.prepare(`
      INSERT INTO payments (month, amount, description, client)
      VALUES (?, ?, ?, ?)
    `).bind(r,Math.round(s*100),n||"",a).run();return e.json({id:i.meta.last_row_id,month:r,amount:s,description:n,client:a,message:"Payment added successfully"})}catch(r){return console.error("Error adding payment:",r),e.json({error:"Failed to add payment"},500)}});C.post("/api/delta/save",async e=>{const{env:t}=e;try{const r=await t.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM projects WHERE status = 'active'
    `).first(),s=await t.DB.prepare(`
      SELECT COALESCE(SUM(amount), 0) as total FROM payments
    `).first(),n=(r==null?void 0:r.total)||0,a=(s==null?void 0:s.total)||0,i=a-n,c=await t.DB.prepare(`
      INSERT INTO delta_calculations (calculation_date, total_project_amount, total_received_amount, delta_amount, notes)
      VALUES (DATE('now'), ?, ?, ?, ?)
    `).bind(n,a,i,"Manual calculation save").run();return e.json({id:c.meta.last_row_id,totalProjects:n/100,totalPayments:a/100,delta:i/100,message:"Delta calculation saved"})}catch(r){return console.error("Error saving delta calculation:",r),e.json({error:"Failed to save delta calculation"},500)}});C.put("/api/projects/:id",async e=>{const{env:t}=e,r=e.req.param("id");try{const{name:s,amount:n,description:a,client:i,status:c}=await e.req.json();return!s||!n?e.json({error:"Name and amount are required"},400):(await t.DB.prepare(`
      UPDATE projects 
      SET name = ?, amount = ?, description = ?, client = ?, status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(s,Math.round(n*100),a||"",i||"Digital Span",c||"active",r).run(),e.json({id:parseInt(r),name:s,amount:n,description:a,client:i,status:c,message:"Project updated successfully"}))}catch(s){return console.error("Error updating project:",s),e.json({error:"Failed to update project"},500)}});C.delete("/api/projects/:id",async e=>{const{env:t}=e,r=e.req.param("id");try{return(await t.DB.prepare(`
      DELETE FROM projects WHERE id = ?
    `).bind(r).run()).changes===0?e.json({error:"Project not found"},404):e.json({message:"Project deleted successfully"})}catch(s){return console.error("Error deleting project:",s),e.json({error:"Failed to delete project"},500)}});C.put("/api/payments/:id",async e=>{const{env:t}=e,r=e.req.param("id");try{const{month:s,amount:n,description:a,client:i}=await e.req.json();return!s||!n?e.json({error:"Month and amount are required"},400):(await t.DB.prepare(`
      UPDATE payments 
      SET month = ?, amount = ?, description = ?, client = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(s,Math.round(n*100),a||"",i||"Digital Span",r).run(),e.json({id:parseInt(r),month:s,amount:n,description:a,client:i,message:"Payment updated successfully"}))}catch(s){return console.error("Error updating payment:",s),e.json({error:"Failed to update payment"},500)}});C.delete("/api/payments/:id",async e=>{const{env:t}=e,r=e.req.param("id");try{return(await t.DB.prepare(`
      DELETE FROM payments WHERE id = ?
    `).bind(r).run()).changes===0?e.json({error:"Payment not found"},404):e.json({message:"Payment deleted successfully"})}catch(s){return console.error("Error deleting payment:",s),e.json({error:"Failed to delete payment"},500)}});C.get("/",e=>e.html(`
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
                                            <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200">
                                        <tr><td colspan="3" class="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
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
                                            <th class="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200">
                                        <tr><td colspan="3" class="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
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

        <!-- Edit Project Modal -->
        <div id="editProjectModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-lg font-semibold mb-4">Edit Project</h3>
                    <form id="editProjectForm">
                        <input type="hidden" id="editProjectId">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                            <input type="text" id="editProjectName" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                            <input type="number" id="editProjectAmount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea id="editProjectDescription" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select id="editProjectStatus" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" onclick="hideEditProjectForm()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                            <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Update Project</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Edit Payment Modal -->
        <div id="editPaymentModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-lg font-semibold mb-4">Edit Payment</h3>
                    <form id="editPaymentForm">
                        <input type="hidden" id="editPaymentId">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Month (YYYY-MM)</label>
                            <input type="month" id="editPaymentMonth" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                            <input type="number" id="editPaymentAmount" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea id="editPaymentDescription" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3"></textarea>
                        </div>
                        <div class="flex gap-3">
                            <button type="button" onclick="hideEditPaymentForm()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                            <button type="submit" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Update Payment</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <div id="deleteModal" class="fixed inset-0 bg-black bg-opacity-50 hidden z-50">
            <div class="flex items-center justify-center min-h-screen p-4">
                <div class="bg-white rounded-lg max-w-md w-full p-6">
                    <h3 class="text-lg font-semibold mb-4 text-red-600">
                        <i class="fas fa-exclamation-triangle mr-2"></i>Confirm Delete
                    </h3>
                    <p class="text-gray-700 mb-6" id="deleteMessage">Are you sure you want to delete this item? This action cannot be undone.</p>
                    <div class="flex gap-3">
                        <button type="button" onclick="hideDeleteModal()" class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">Cancel</button>
                        <button type="button" onclick="confirmDelete()" class="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/axios@1.6.0/dist/axios.min.js"><\/script>
        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));const Be=new bt,dr=Object.assign({"/src/index.tsx":C});let yt=!1;for(const[,e]of Object.entries(dr))e&&(Be.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),Be.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),yt=!0);if(!yt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Be as default};
