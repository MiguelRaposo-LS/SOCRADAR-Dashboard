var vv=Object.defineProperty;var xv=(t,e,n)=>e in t?vv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var sh=(t,e,n)=>xv(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();var ym={exports:{}},Nl={},Sm={exports:{}},Xe={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Uo=Symbol.for("react.element"),yv=Symbol.for("react.portal"),Sv=Symbol.for("react.fragment"),Mv=Symbol.for("react.strict_mode"),Ev=Symbol.for("react.profiler"),Tv=Symbol.for("react.provider"),wv=Symbol.for("react.context"),Av=Symbol.for("react.forward_ref"),Rv=Symbol.for("react.suspense"),Cv=Symbol.for("react.memo"),Pv=Symbol.for("react.lazy"),oh=Symbol.iterator;function bv(t){return t===null||typeof t!="object"?null:(t=oh&&t[oh]||t["@@iterator"],typeof t=="function"?t:null)}var Mm={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Em=Object.assign,Tm={};function Rs(t,e,n){this.props=t,this.context=e,this.refs=Tm,this.updater=n||Mm}Rs.prototype.isReactComponent={};Rs.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Rs.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function wm(){}wm.prototype=Rs.prototype;function Xf(t,e,n){this.props=t,this.context=e,this.refs=Tm,this.updater=n||Mm}var jf=Xf.prototype=new wm;jf.constructor=Xf;Em(jf,Rs.prototype);jf.isPureReactComponent=!0;var ah=Array.isArray,Am=Object.prototype.hasOwnProperty,Yf={current:null},Rm={key:!0,ref:!0,__self:!0,__source:!0};function Cm(t,e,n){var i,r={},s=null,o=null;if(e!=null)for(i in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)Am.call(e,i)&&!Rm.hasOwnProperty(i)&&(r[i]=e[i]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var l=Array(a),u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}if(t&&t.defaultProps)for(i in a=t.defaultProps,a)r[i]===void 0&&(r[i]=a[i]);return{$$typeof:Uo,type:t,key:s,ref:o,props:r,_owner:Yf.current}}function Lv(t,e){return{$$typeof:Uo,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function qf(t){return typeof t=="object"&&t!==null&&t.$$typeof===Uo}function Dv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var lh=/\/+/g;function nu(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Dv(""+t.key):e.toString(36)}function za(t,e,n,i,r){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case Uo:case yv:o=!0}}if(o)return o=t,r=r(o),t=i===""?"."+nu(o,0):i,ah(r)?(n="",t!=null&&(n=t.replace(lh,"$&/")+"/"),za(r,e,n,"",function(u){return u})):r!=null&&(qf(r)&&(r=Lv(r,n+(!r.key||o&&o.key===r.key?"":(""+r.key).replace(lh,"$&/")+"/")+t)),e.push(r)),1;if(o=0,i=i===""?".":i+":",ah(t))for(var a=0;a<t.length;a++){s=t[a];var l=i+nu(s,a);o+=za(s,e,n,l,r)}else if(l=bv(t),typeof l=="function")for(t=l.call(t),a=0;!(s=t.next()).done;)s=s.value,l=i+nu(s,a++),o+=za(s,e,n,l,r);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function jo(t,e,n){if(t==null)return t;var i=[],r=0;return za(t,i,"","",function(s){return e.call(n,s,r++)}),i}function Uv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Jt={current:null},Ba={transition:null},Iv={ReactCurrentDispatcher:Jt,ReactCurrentBatchConfig:Ba,ReactCurrentOwner:Yf};function Pm(){throw Error("act(...) is not supported in production builds of React.")}Xe.Children={map:jo,forEach:function(t,e,n){jo(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return jo(t,function(){e++}),e},toArray:function(t){return jo(t,function(e){return e})||[]},only:function(t){if(!qf(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Xe.Component=Rs;Xe.Fragment=Sv;Xe.Profiler=Ev;Xe.PureComponent=Xf;Xe.StrictMode=Mv;Xe.Suspense=Rv;Xe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Iv;Xe.act=Pm;Xe.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var i=Em({},t.props),r=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Yf.current),e.key!==void 0&&(r=""+e.key),t.type&&t.type.defaultProps)var a=t.type.defaultProps;for(l in e)Am.call(e,l)&&!Rm.hasOwnProperty(l)&&(i[l]=e[l]===void 0&&a!==void 0?a[l]:e[l])}var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){a=Array(l);for(var u=0;u<l;u++)a[u]=arguments[u+2];i.children=a}return{$$typeof:Uo,type:t.type,key:r,ref:s,props:i,_owner:o}};Xe.createContext=function(t){return t={$$typeof:wv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Tv,_context:t},t.Consumer=t};Xe.createElement=Cm;Xe.createFactory=function(t){var e=Cm.bind(null,t);return e.type=t,e};Xe.createRef=function(){return{current:null}};Xe.forwardRef=function(t){return{$$typeof:Av,render:t}};Xe.isValidElement=qf;Xe.lazy=function(t){return{$$typeof:Pv,_payload:{_status:-1,_result:t},_init:Uv}};Xe.memo=function(t,e){return{$$typeof:Cv,type:t,compare:e===void 0?null:e}};Xe.startTransition=function(t){var e=Ba.transition;Ba.transition={};try{t()}finally{Ba.transition=e}};Xe.unstable_act=Pm;Xe.useCallback=function(t,e){return Jt.current.useCallback(t,e)};Xe.useContext=function(t){return Jt.current.useContext(t)};Xe.useDebugValue=function(){};Xe.useDeferredValue=function(t){return Jt.current.useDeferredValue(t)};Xe.useEffect=function(t,e){return Jt.current.useEffect(t,e)};Xe.useId=function(){return Jt.current.useId()};Xe.useImperativeHandle=function(t,e,n){return Jt.current.useImperativeHandle(t,e,n)};Xe.useInsertionEffect=function(t,e){return Jt.current.useInsertionEffect(t,e)};Xe.useLayoutEffect=function(t,e){return Jt.current.useLayoutEffect(t,e)};Xe.useMemo=function(t,e){return Jt.current.useMemo(t,e)};Xe.useReducer=function(t,e,n){return Jt.current.useReducer(t,e,n)};Xe.useRef=function(t){return Jt.current.useRef(t)};Xe.useState=function(t){return Jt.current.useState(t)};Xe.useSyncExternalStore=function(t,e,n){return Jt.current.useSyncExternalStore(t,e,n)};Xe.useTransition=function(){return Jt.current.useTransition()};Xe.version="18.3.1";Sm.exports=Xe;var dt=Sm.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Nv=dt,Fv=Symbol.for("react.element"),Ov=Symbol.for("react.fragment"),kv=Object.prototype.hasOwnProperty,zv=Nv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Bv={key:!0,ref:!0,__self:!0,__source:!0};function bm(t,e,n){var i,r={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(i in e)kv.call(e,i)&&!Bv.hasOwnProperty(i)&&(r[i]=e[i]);if(t&&t.defaultProps)for(i in e=t.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);return{$$typeof:Fv,type:t,key:s,ref:o,props:r,_owner:zv.current}}Nl.Fragment=Ov;Nl.jsx=bm;Nl.jsxs=bm;ym.exports=Nl;var ae=ym.exports,Lm={exports:{}},_n={},Dm={exports:{}},Um={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(L,G){var q=L.length;L.push(G);e:for(;0<q;){var K=q-1>>>1,fe=L[K];if(0<r(fe,G))L[K]=G,L[q]=fe,q=K;else break e}}function n(L){return L.length===0?null:L[0]}function i(L){if(L.length===0)return null;var G=L[0],q=L.pop();if(q!==G){L[0]=q;e:for(var K=0,fe=L.length,Ue=fe>>>1;K<Ue;){var W=2*(K+1)-1,ie=L[W],ge=W+1,oe=L[ge];if(0>r(ie,q))ge<fe&&0>r(oe,ie)?(L[K]=oe,L[ge]=q,K=ge):(L[K]=ie,L[W]=q,K=W);else if(ge<fe&&0>r(oe,q))L[K]=oe,L[ge]=q,K=ge;else break e}}return G}function r(L,G){var q=L.sortIndex-G.sortIndex;return q!==0?q:L.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,a=o.now();t.unstable_now=function(){return o.now()-a}}var l=[],u=[],f=1,d=null,h=3,p=!1,g=!1,x=!1,m=typeof setTimeout=="function"?setTimeout:null,c=typeof clearTimeout=="function"?clearTimeout:null,_=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(L){for(var G=n(u);G!==null;){if(G.callback===null)i(u);else if(G.startTime<=L)i(u),G.sortIndex=G.expirationTime,e(l,G);else break;G=n(u)}}function y(L){if(x=!1,v(L),!g)if(n(l)!==null)g=!0,I(C);else{var G=n(u);G!==null&&H(y,G.startTime-L)}}function C(L,G){g=!1,x&&(x=!1,c(P),P=-1),p=!0;var q=h;try{for(v(G),d=n(l);d!==null&&(!(d.expirationTime>G)||L&&!D());){var K=d.callback;if(typeof K=="function"){d.callback=null,h=d.priorityLevel;var fe=K(d.expirationTime<=G);G=t.unstable_now(),typeof fe=="function"?d.callback=fe:d===n(l)&&i(l),v(G)}else i(l);d=n(l)}if(d!==null)var Ue=!0;else{var W=n(u);W!==null&&H(y,W.startTime-G),Ue=!1}return Ue}finally{d=null,h=q,p=!1}}var R=!1,A=null,P=-1,T=5,M=-1;function D(){return!(t.unstable_now()-M<T)}function j(){if(A!==null){var L=t.unstable_now();M=L;var G=!0;try{G=A(!0,L)}finally{G?V():(R=!1,A=null)}}else R=!1}var V;if(typeof _=="function")V=function(){_(j)};else if(typeof MessageChannel<"u"){var Q=new MessageChannel,J=Q.port2;Q.port1.onmessage=j,V=function(){J.postMessage(null)}}else V=function(){m(j,0)};function I(L){A=L,R||(R=!0,V())}function H(L,G){P=m(function(){L(t.unstable_now())},G)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(L){L.callback=null},t.unstable_continueExecution=function(){g||p||(g=!0,I(C))},t.unstable_forceFrameRate=function(L){0>L||125<L?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<L?Math.floor(1e3/L):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_getFirstCallbackNode=function(){return n(l)},t.unstable_next=function(L){switch(h){case 1:case 2:case 3:var G=3;break;default:G=h}var q=h;h=G;try{return L()}finally{h=q}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(L,G){switch(L){case 1:case 2:case 3:case 4:case 5:break;default:L=3}var q=h;h=L;try{return G()}finally{h=q}},t.unstable_scheduleCallback=function(L,G,q){var K=t.unstable_now();switch(typeof q=="object"&&q!==null?(q=q.delay,q=typeof q=="number"&&0<q?K+q:K):q=K,L){case 1:var fe=-1;break;case 2:fe=250;break;case 5:fe=1073741823;break;case 4:fe=1e4;break;default:fe=5e3}return fe=q+fe,L={id:f++,callback:G,priorityLevel:L,startTime:q,expirationTime:fe,sortIndex:-1},q>K?(L.sortIndex=q,e(u,L),n(l)===null&&L===n(u)&&(x?(c(P),P=-1):x=!0,H(y,q-K))):(L.sortIndex=fe,e(l,L),g||p||(g=!0,I(C))),L},t.unstable_shouldYield=D,t.unstable_wrapCallback=function(L){var G=h;return function(){var q=h;h=G;try{return L.apply(this,arguments)}finally{h=q}}}})(Um);Dm.exports=Um;var Vv=Dm.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hv=dt,gn=Vv;function ne(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Im=new Set,co={};function Cr(t,e){ms(t,e),ms(t+"Capture",e)}function ms(t,e){for(co[t]=e,t=0;t<e.length;t++)Im.add(e[t])}var _i=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),uc=Object.prototype.hasOwnProperty,Gv=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,uh={},ch={};function Wv(t){return uc.call(ch,t)?!0:uc.call(uh,t)?!1:Gv.test(t)?ch[t]=!0:(uh[t]=!0,!1)}function Xv(t,e,n,i){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function jv(t,e,n,i){if(e===null||typeof e>"u"||Xv(t,e,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function en(t,e,n,i,r,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=i,this.attributeNamespace=r,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var kt={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){kt[t]=new en(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];kt[e]=new en(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){kt[t]=new en(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){kt[t]=new en(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){kt[t]=new en(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){kt[t]=new en(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){kt[t]=new en(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){kt[t]=new en(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){kt[t]=new en(t,5,!1,t.toLowerCase(),null,!1,!1)});var $f=/[\-:]([a-z])/g;function Kf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace($f,Kf);kt[e]=new en(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace($f,Kf);kt[e]=new en(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace($f,Kf);kt[e]=new en(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){kt[t]=new en(t,1,!1,t.toLowerCase(),null,!1,!1)});kt.xlinkHref=new en("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){kt[t]=new en(t,1,!1,t.toLowerCase(),null,!0,!0)});function Zf(t,e,n,i){var r=kt.hasOwnProperty(e)?kt[e]:null;(r!==null?r.type!==0:i||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(jv(e,n,r,i)&&(n=null),i||r===null?Wv(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):r.mustUseProperty?t[r.propertyName]=n===null?r.type===3?!1:"":n:(e=r.attributeName,i=r.attributeNamespace,n===null?t.removeAttribute(e):(r=r.type,n=r===3||r===4&&n===!0?"":""+n,i?t.setAttributeNS(i,e,n):t.setAttribute(e,n))))}var Mi=Hv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Yo=Symbol.for("react.element"),Yr=Symbol.for("react.portal"),qr=Symbol.for("react.fragment"),Qf=Symbol.for("react.strict_mode"),cc=Symbol.for("react.profiler"),Nm=Symbol.for("react.provider"),Fm=Symbol.for("react.context"),Jf=Symbol.for("react.forward_ref"),fc=Symbol.for("react.suspense"),dc=Symbol.for("react.suspense_list"),ed=Symbol.for("react.memo"),Li=Symbol.for("react.lazy"),Om=Symbol.for("react.offscreen"),fh=Symbol.iterator;function Is(t){return t===null||typeof t!="object"?null:(t=fh&&t[fh]||t["@@iterator"],typeof t=="function"?t:null)}var gt=Object.assign,iu;function qs(t){if(iu===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);iu=e&&e[1]||""}return`
`+iu+t}var ru=!1;function su(t,e){if(!t||ru)return"";ru=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var i=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){i=u}t.call(e.prototype)}else{try{throw Error()}catch(u){i=u}t()}}catch(u){if(u&&i&&typeof u.stack=="string"){for(var r=u.stack.split(`
`),s=i.stack.split(`
`),o=r.length-1,a=s.length-1;1<=o&&0<=a&&r[o]!==s[a];)a--;for(;1<=o&&0<=a;o--,a--)if(r[o]!==s[a]){if(o!==1||a!==1)do if(o--,a--,0>a||r[o]!==s[a]){var l=`
`+r[o].replace(" at new "," at ");return t.displayName&&l.includes("<anonymous>")&&(l=l.replace("<anonymous>",t.displayName)),l}while(1<=o&&0<=a);break}}}finally{ru=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?qs(t):""}function Yv(t){switch(t.tag){case 5:return qs(t.type);case 16:return qs("Lazy");case 13:return qs("Suspense");case 19:return qs("SuspenseList");case 0:case 2:case 15:return t=su(t.type,!1),t;case 11:return t=su(t.type.render,!1),t;case 1:return t=su(t.type,!0),t;default:return""}}function hc(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case qr:return"Fragment";case Yr:return"Portal";case cc:return"Profiler";case Qf:return"StrictMode";case fc:return"Suspense";case dc:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Fm:return(t.displayName||"Context")+".Consumer";case Nm:return(t._context.displayName||"Context")+".Provider";case Jf:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case ed:return e=t.displayName||null,e!==null?e:hc(t.type)||"Memo";case Li:e=t._payload,t=t._init;try{return hc(t(e))}catch{}}return null}function qv(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return hc(e);case 8:return e===Qf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function qi(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function km(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function $v(t){var e=km(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),i=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var r=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return r.call(this)},set:function(o){i=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(o){i=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function qo(t){t._valueTracker||(t._valueTracker=$v(t))}function zm(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=km(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function sl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function pc(t,e){var n=e.checked;return gt({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function dh(t,e){var n=e.defaultValue==null?"":e.defaultValue,i=e.checked!=null?e.checked:e.defaultChecked;n=qi(e.value!=null?e.value:n),t._wrapperState={initialChecked:i,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Bm(t,e){e=e.checked,e!=null&&Zf(t,"checked",e,!1)}function mc(t,e){Bm(t,e);var n=qi(e.value),i=e.type;if(n!=null)i==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(i==="submit"||i==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?gc(t,e.type,n):e.hasOwnProperty("defaultValue")&&gc(t,e.type,qi(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function hh(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var i=e.type;if(!(i!=="submit"&&i!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function gc(t,e,n){(e!=="number"||sl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var $s=Array.isArray;function as(t,e,n,i){if(t=t.options,e){e={};for(var r=0;r<n.length;r++)e["$"+n[r]]=!0;for(n=0;n<t.length;n++)r=e.hasOwnProperty("$"+t[n].value),t[n].selected!==r&&(t[n].selected=r),r&&i&&(t[n].defaultSelected=!0)}else{for(n=""+qi(n),e=null,r=0;r<t.length;r++){if(t[r].value===n){t[r].selected=!0,i&&(t[r].defaultSelected=!0);return}e!==null||t[r].disabled||(e=t[r])}e!==null&&(e.selected=!0)}}function _c(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(ne(91));return gt({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function ph(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(ne(92));if($s(n)){if(1<n.length)throw Error(ne(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:qi(n)}}function Vm(t,e){var n=qi(e.value),i=qi(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),i!=null&&(t.defaultValue=""+i)}function mh(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Hm(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function vc(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Hm(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var $o,Gm=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,i,r){MSApp.execUnsafeLocalFunction(function(){return t(e,n,i,r)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for($o=$o||document.createElement("div"),$o.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=$o.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function fo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var Js={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Kv=["Webkit","ms","Moz","O"];Object.keys(Js).forEach(function(t){Kv.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),Js[e]=Js[t]})});function Wm(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||Js.hasOwnProperty(t)&&Js[t]?(""+e).trim():e+"px"}function Xm(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var i=n.indexOf("--")===0,r=Wm(n,e[n],i);n==="float"&&(n="cssFloat"),i?t.setProperty(n,r):t[n]=r}}var Zv=gt({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function xc(t,e){if(e){if(Zv[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(ne(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(ne(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(ne(61))}if(e.style!=null&&typeof e.style!="object")throw Error(ne(62))}}function yc(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Sc=null;function td(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Mc=null,ls=null,us=null;function gh(t){if(t=Fo(t)){if(typeof Mc!="function")throw Error(ne(280));var e=t.stateNode;e&&(e=Bl(e),Mc(t.stateNode,t.type,e))}}function jm(t){ls?us?us.push(t):us=[t]:ls=t}function Ym(){if(ls){var t=ls,e=us;if(us=ls=null,gh(t),e)for(t=0;t<e.length;t++)gh(e[t])}}function qm(t,e){return t(e)}function $m(){}var ou=!1;function Km(t,e,n){if(ou)return t(e,n);ou=!0;try{return qm(t,e,n)}finally{ou=!1,(ls!==null||us!==null)&&($m(),Ym())}}function ho(t,e){var n=t.stateNode;if(n===null)return null;var i=Bl(n);if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ne(231,e,typeof n));return n}var Ec=!1;if(_i)try{var Ns={};Object.defineProperty(Ns,"passive",{get:function(){Ec=!0}}),window.addEventListener("test",Ns,Ns),window.removeEventListener("test",Ns,Ns)}catch{Ec=!1}function Qv(t,e,n,i,r,s,o,a,l){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(f){this.onError(f)}}var eo=!1,ol=null,al=!1,Tc=null,Jv={onError:function(t){eo=!0,ol=t}};function e0(t,e,n,i,r,s,o,a,l){eo=!1,ol=null,Qv.apply(Jv,arguments)}function t0(t,e,n,i,r,s,o,a,l){if(e0.apply(this,arguments),eo){if(eo){var u=ol;eo=!1,ol=null}else throw Error(ne(198));al||(al=!0,Tc=u)}}function Pr(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Zm(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function _h(t){if(Pr(t)!==t)throw Error(ne(188))}function n0(t){var e=t.alternate;if(!e){if(e=Pr(t),e===null)throw Error(ne(188));return e!==t?null:t}for(var n=t,i=e;;){var r=n.return;if(r===null)break;var s=r.alternate;if(s===null){if(i=r.return,i!==null){n=i;continue}break}if(r.child===s.child){for(s=r.child;s;){if(s===n)return _h(r),t;if(s===i)return _h(r),e;s=s.sibling}throw Error(ne(188))}if(n.return!==i.return)n=r,i=s;else{for(var o=!1,a=r.child;a;){if(a===n){o=!0,n=r,i=s;break}if(a===i){o=!0,i=r,n=s;break}a=a.sibling}if(!o){for(a=s.child;a;){if(a===n){o=!0,n=s,i=r;break}if(a===i){o=!0,i=s,n=r;break}a=a.sibling}if(!o)throw Error(ne(189))}}if(n.alternate!==i)throw Error(ne(190))}if(n.tag!==3)throw Error(ne(188));return n.stateNode.current===n?t:e}function Qm(t){return t=n0(t),t!==null?Jm(t):null}function Jm(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Jm(t);if(e!==null)return e;t=t.sibling}return null}var eg=gn.unstable_scheduleCallback,vh=gn.unstable_cancelCallback,i0=gn.unstable_shouldYield,r0=gn.unstable_requestPaint,St=gn.unstable_now,s0=gn.unstable_getCurrentPriorityLevel,nd=gn.unstable_ImmediatePriority,tg=gn.unstable_UserBlockingPriority,ll=gn.unstable_NormalPriority,o0=gn.unstable_LowPriority,ng=gn.unstable_IdlePriority,Fl=null,Zn=null;function a0(t){if(Zn&&typeof Zn.onCommitFiberRoot=="function")try{Zn.onCommitFiberRoot(Fl,t,void 0,(t.current.flags&128)===128)}catch{}}var Hn=Math.clz32?Math.clz32:c0,l0=Math.log,u0=Math.LN2;function c0(t){return t>>>=0,t===0?32:31-(l0(t)/u0|0)|0}var Ko=64,Zo=4194304;function Ks(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function ul(t,e){var n=t.pendingLanes;if(n===0)return 0;var i=0,r=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var a=o&~r;a!==0?i=Ks(a):(s&=o,s!==0&&(i=Ks(s)))}else o=n&~r,o!==0?i=Ks(o):s!==0&&(i=Ks(s));if(i===0)return 0;if(e!==0&&e!==i&&!(e&r)&&(r=i&-i,s=e&-e,r>=s||r===16&&(s&4194240)!==0))return e;if(i&4&&(i|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=i;0<e;)n=31-Hn(e),r=1<<n,i|=t[n],e&=~r;return i}function f0(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function d0(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,r=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-Hn(s),a=1<<o,l=r[o];l===-1?(!(a&n)||a&i)&&(r[o]=f0(a,e)):l<=e&&(t.expiredLanes|=a),s&=~a}}function wc(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function ig(){var t=Ko;return Ko<<=1,!(Ko&4194240)&&(Ko=64),t}function au(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Io(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-Hn(e),t[e]=n}function h0(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var i=t.eventTimes;for(t=t.expirationTimes;0<n;){var r=31-Hn(n),s=1<<r;e[r]=0,i[r]=-1,t[r]=-1,n&=~s}}function id(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-Hn(n),r=1<<i;r&e|t[i]&e&&(t[i]|=e),n&=~r}}var it=0;function rg(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var sg,rd,og,ag,lg,Ac=!1,Qo=[],ki=null,zi=null,Bi=null,po=new Map,mo=new Map,Ui=[],p0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function xh(t,e){switch(t){case"focusin":case"focusout":ki=null;break;case"dragenter":case"dragleave":zi=null;break;case"mouseover":case"mouseout":Bi=null;break;case"pointerover":case"pointerout":po.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":mo.delete(e.pointerId)}}function Fs(t,e,n,i,r,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[r]},e!==null&&(e=Fo(e),e!==null&&rd(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,r!==null&&e.indexOf(r)===-1&&e.push(r),t)}function m0(t,e,n,i,r){switch(e){case"focusin":return ki=Fs(ki,t,e,n,i,r),!0;case"dragenter":return zi=Fs(zi,t,e,n,i,r),!0;case"mouseover":return Bi=Fs(Bi,t,e,n,i,r),!0;case"pointerover":var s=r.pointerId;return po.set(s,Fs(po.get(s)||null,t,e,n,i,r)),!0;case"gotpointercapture":return s=r.pointerId,mo.set(s,Fs(mo.get(s)||null,t,e,n,i,r)),!0}return!1}function ug(t){var e=pr(t.target);if(e!==null){var n=Pr(e);if(n!==null){if(e=n.tag,e===13){if(e=Zm(n),e!==null){t.blockedOn=e,lg(t.priority,function(){og(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Va(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Rc(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);Sc=i,n.target.dispatchEvent(i),Sc=null}else return e=Fo(n),e!==null&&rd(e),t.blockedOn=n,!1;e.shift()}return!0}function yh(t,e,n){Va(t)&&n.delete(e)}function g0(){Ac=!1,ki!==null&&Va(ki)&&(ki=null),zi!==null&&Va(zi)&&(zi=null),Bi!==null&&Va(Bi)&&(Bi=null),po.forEach(yh),mo.forEach(yh)}function Os(t,e){t.blockedOn===e&&(t.blockedOn=null,Ac||(Ac=!0,gn.unstable_scheduleCallback(gn.unstable_NormalPriority,g0)))}function go(t){function e(r){return Os(r,t)}if(0<Qo.length){Os(Qo[0],t);for(var n=1;n<Qo.length;n++){var i=Qo[n];i.blockedOn===t&&(i.blockedOn=null)}}for(ki!==null&&Os(ki,t),zi!==null&&Os(zi,t),Bi!==null&&Os(Bi,t),po.forEach(e),mo.forEach(e),n=0;n<Ui.length;n++)i=Ui[n],i.blockedOn===t&&(i.blockedOn=null);for(;0<Ui.length&&(n=Ui[0],n.blockedOn===null);)ug(n),n.blockedOn===null&&Ui.shift()}var cs=Mi.ReactCurrentBatchConfig,cl=!0;function _0(t,e,n,i){var r=it,s=cs.transition;cs.transition=null;try{it=1,sd(t,e,n,i)}finally{it=r,cs.transition=s}}function v0(t,e,n,i){var r=it,s=cs.transition;cs.transition=null;try{it=4,sd(t,e,n,i)}finally{it=r,cs.transition=s}}function sd(t,e,n,i){if(cl){var r=Rc(t,e,n,i);if(r===null)_u(t,e,i,fl,n),xh(t,i);else if(m0(r,t,e,n,i))i.stopPropagation();else if(xh(t,i),e&4&&-1<p0.indexOf(t)){for(;r!==null;){var s=Fo(r);if(s!==null&&sg(s),s=Rc(t,e,n,i),s===null&&_u(t,e,i,fl,n),s===r)break;r=s}r!==null&&i.stopPropagation()}else _u(t,e,i,null,n)}}var fl=null;function Rc(t,e,n,i){if(fl=null,t=td(i),t=pr(t),t!==null)if(e=Pr(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Zm(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return fl=t,null}function cg(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(s0()){case nd:return 1;case tg:return 4;case ll:case o0:return 16;case ng:return 536870912;default:return 16}default:return 16}}var Fi=null,od=null,Ha=null;function fg(){if(Ha)return Ha;var t,e=od,n=e.length,i,r="value"in Fi?Fi.value:Fi.textContent,s=r.length;for(t=0;t<n&&e[t]===r[t];t++);var o=n-t;for(i=1;i<=o&&e[n-i]===r[s-i];i++);return Ha=r.slice(t,1<i?1-i:void 0)}function Ga(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Jo(){return!0}function Sh(){return!1}function vn(t){function e(n,i,r,s,o){this._reactName=n,this._targetInst=r,this.type=i,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var a in t)t.hasOwnProperty(a)&&(n=t[a],this[a]=n?n(s):s[a]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Jo:Sh,this.isPropagationStopped=Sh,this}return gt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Jo)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Jo)},persist:function(){},isPersistent:Jo}),e}var Cs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ad=vn(Cs),No=gt({},Cs,{view:0,detail:0}),x0=vn(No),lu,uu,ks,Ol=gt({},No,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ld,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ks&&(ks&&t.type==="mousemove"?(lu=t.screenX-ks.screenX,uu=t.screenY-ks.screenY):uu=lu=0,ks=t),lu)},movementY:function(t){return"movementY"in t?t.movementY:uu}}),Mh=vn(Ol),y0=gt({},Ol,{dataTransfer:0}),S0=vn(y0),M0=gt({},No,{relatedTarget:0}),cu=vn(M0),E0=gt({},Cs,{animationName:0,elapsedTime:0,pseudoElement:0}),T0=vn(E0),w0=gt({},Cs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),A0=vn(w0),R0=gt({},Cs,{data:0}),Eh=vn(R0),C0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},P0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},b0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function L0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=b0[t])?!!e[t]:!1}function ld(){return L0}var D0=gt({},No,{key:function(t){if(t.key){var e=C0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Ga(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?P0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ld,charCode:function(t){return t.type==="keypress"?Ga(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ga(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),U0=vn(D0),I0=gt({},Ol,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Th=vn(I0),N0=gt({},No,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ld}),F0=vn(N0),O0=gt({},Cs,{propertyName:0,elapsedTime:0,pseudoElement:0}),k0=vn(O0),z0=gt({},Ol,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),B0=vn(z0),V0=[9,13,27,32],ud=_i&&"CompositionEvent"in window,to=null;_i&&"documentMode"in document&&(to=document.documentMode);var H0=_i&&"TextEvent"in window&&!to,dg=_i&&(!ud||to&&8<to&&11>=to),wh=" ",Ah=!1;function hg(t,e){switch(t){case"keyup":return V0.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function pg(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var $r=!1;function G0(t,e){switch(t){case"compositionend":return pg(e);case"keypress":return e.which!==32?null:(Ah=!0,wh);case"textInput":return t=e.data,t===wh&&Ah?null:t;default:return null}}function W0(t,e){if($r)return t==="compositionend"||!ud&&hg(t,e)?(t=fg(),Ha=od=Fi=null,$r=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return dg&&e.locale!=="ko"?null:e.data;default:return null}}var X0={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!X0[t.type]:e==="textarea"}function mg(t,e,n,i){jm(i),e=dl(e,"onChange"),0<e.length&&(n=new ad("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var no=null,_o=null;function j0(t){Ag(t,0)}function kl(t){var e=Qr(t);if(zm(e))return t}function Y0(t,e){if(t==="change")return e}var gg=!1;if(_i){var fu;if(_i){var du="oninput"in document;if(!du){var Ch=document.createElement("div");Ch.setAttribute("oninput","return;"),du=typeof Ch.oninput=="function"}fu=du}else fu=!1;gg=fu&&(!document.documentMode||9<document.documentMode)}function Ph(){no&&(no.detachEvent("onpropertychange",_g),_o=no=null)}function _g(t){if(t.propertyName==="value"&&kl(_o)){var e=[];mg(e,_o,t,td(t)),Km(j0,e)}}function q0(t,e,n){t==="focusin"?(Ph(),no=e,_o=n,no.attachEvent("onpropertychange",_g)):t==="focusout"&&Ph()}function $0(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return kl(_o)}function K0(t,e){if(t==="click")return kl(e)}function Z0(t,e){if(t==="input"||t==="change")return kl(e)}function Q0(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var Xn=typeof Object.is=="function"?Object.is:Q0;function vo(t,e){if(Xn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var r=n[i];if(!uc.call(e,r)||!Xn(t[r],e[r]))return!1}return!0}function bh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Lh(t,e){var n=bh(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=bh(n)}}function vg(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?vg(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function xg(){for(var t=window,e=sl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=sl(t.document)}return e}function cd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function J0(t){var e=xg(),n=t.focusedElem,i=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&vg(n.ownerDocument.documentElement,n)){if(i!==null&&cd(n)){if(e=i.start,t=i.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var r=n.textContent.length,s=Math.min(i.start,r);i=i.end===void 0?s:Math.min(i.end,r),!t.extend&&s>i&&(r=i,i=s,s=r),r=Lh(n,s);var o=Lh(n,i);r&&o&&(t.rangeCount!==1||t.anchorNode!==r.node||t.anchorOffset!==r.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(r.node,r.offset),t.removeAllRanges(),s>i?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var ex=_i&&"documentMode"in document&&11>=document.documentMode,Kr=null,Cc=null,io=null,Pc=!1;function Dh(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Pc||Kr==null||Kr!==sl(i)||(i=Kr,"selectionStart"in i&&cd(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),io&&vo(io,i)||(io=i,i=dl(Cc,"onSelect"),0<i.length&&(e=new ad("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Kr)))}function ea(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Zr={animationend:ea("Animation","AnimationEnd"),animationiteration:ea("Animation","AnimationIteration"),animationstart:ea("Animation","AnimationStart"),transitionend:ea("Transition","TransitionEnd")},hu={},yg={};_i&&(yg=document.createElement("div").style,"AnimationEvent"in window||(delete Zr.animationend.animation,delete Zr.animationiteration.animation,delete Zr.animationstart.animation),"TransitionEvent"in window||delete Zr.transitionend.transition);function zl(t){if(hu[t])return hu[t];if(!Zr[t])return t;var e=Zr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in yg)return hu[t]=e[n];return t}var Sg=zl("animationend"),Mg=zl("animationiteration"),Eg=zl("animationstart"),Tg=zl("transitionend"),wg=new Map,Uh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Zi(t,e){wg.set(t,e),Cr(e,[t])}for(var pu=0;pu<Uh.length;pu++){var mu=Uh[pu],tx=mu.toLowerCase(),nx=mu[0].toUpperCase()+mu.slice(1);Zi(tx,"on"+nx)}Zi(Sg,"onAnimationEnd");Zi(Mg,"onAnimationIteration");Zi(Eg,"onAnimationStart");Zi("dblclick","onDoubleClick");Zi("focusin","onFocus");Zi("focusout","onBlur");Zi(Tg,"onTransitionEnd");ms("onMouseEnter",["mouseout","mouseover"]);ms("onMouseLeave",["mouseout","mouseover"]);ms("onPointerEnter",["pointerout","pointerover"]);ms("onPointerLeave",["pointerout","pointerover"]);Cr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Cr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Cr("onBeforeInput",["compositionend","keypress","textInput","paste"]);Cr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Cr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Cr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ix=new Set("cancel close invalid load scroll toggle".split(" ").concat(Zs));function Ih(t,e,n){var i=t.type||"unknown-event";t.currentTarget=n,t0(i,e,void 0,t),t.currentTarget=null}function Ag(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],r=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var o=i.length-1;0<=o;o--){var a=i[o],l=a.instance,u=a.currentTarget;if(a=a.listener,l!==s&&r.isPropagationStopped())break e;Ih(r,a,u),s=l}else for(o=0;o<i.length;o++){if(a=i[o],l=a.instance,u=a.currentTarget,a=a.listener,l!==s&&r.isPropagationStopped())break e;Ih(r,a,u),s=l}}}if(al)throw t=Tc,al=!1,Tc=null,t}function at(t,e){var n=e[Ic];n===void 0&&(n=e[Ic]=new Set);var i=t+"__bubble";n.has(i)||(Rg(e,t,2,!1),n.add(i))}function gu(t,e,n){var i=0;e&&(i|=4),Rg(n,t,i,e)}var ta="_reactListening"+Math.random().toString(36).slice(2);function xo(t){if(!t[ta]){t[ta]=!0,Im.forEach(function(n){n!=="selectionchange"&&(ix.has(n)||gu(n,!1,t),gu(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ta]||(e[ta]=!0,gu("selectionchange",!1,e))}}function Rg(t,e,n,i){switch(cg(e)){case 1:var r=_0;break;case 4:r=v0;break;default:r=sd}n=r.bind(null,e,n,t),r=void 0,!Ec||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(r=!0),i?r!==void 0?t.addEventListener(e,n,{capture:!0,passive:r}):t.addEventListener(e,n,!0):r!==void 0?t.addEventListener(e,n,{passive:r}):t.addEventListener(e,n,!1)}function _u(t,e,n,i,r){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var o=i.tag;if(o===3||o===4){var a=i.stateNode.containerInfo;if(a===r||a.nodeType===8&&a.parentNode===r)break;if(o===4)for(o=i.return;o!==null;){var l=o.tag;if((l===3||l===4)&&(l=o.stateNode.containerInfo,l===r||l.nodeType===8&&l.parentNode===r))return;o=o.return}for(;a!==null;){if(o=pr(a),o===null)return;if(l=o.tag,l===5||l===6){i=s=o;continue e}a=a.parentNode}}i=i.return}Km(function(){var u=s,f=td(n),d=[];e:{var h=wg.get(t);if(h!==void 0){var p=ad,g=t;switch(t){case"keypress":if(Ga(n)===0)break e;case"keydown":case"keyup":p=U0;break;case"focusin":g="focus",p=cu;break;case"focusout":g="blur",p=cu;break;case"beforeblur":case"afterblur":p=cu;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Mh;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=S0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=F0;break;case Sg:case Mg:case Eg:p=T0;break;case Tg:p=k0;break;case"scroll":p=x0;break;case"wheel":p=B0;break;case"copy":case"cut":case"paste":p=A0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Th}var x=(e&4)!==0,m=!x&&t==="scroll",c=x?h!==null?h+"Capture":null:h;x=[];for(var _=u,v;_!==null;){v=_;var y=v.stateNode;if(v.tag===5&&y!==null&&(v=y,c!==null&&(y=ho(_,c),y!=null&&x.push(yo(_,y,v)))),m)break;_=_.return}0<x.length&&(h=new p(h,g,null,n,f),d.push({event:h,listeners:x}))}}if(!(e&7)){e:{if(h=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",h&&n!==Sc&&(g=n.relatedTarget||n.fromElement)&&(pr(g)||g[vi]))break e;if((p||h)&&(h=f.window===f?f:(h=f.ownerDocument)?h.defaultView||h.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=u,g=g?pr(g):null,g!==null&&(m=Pr(g),g!==m||g.tag!==5&&g.tag!==6)&&(g=null)):(p=null,g=u),p!==g)){if(x=Mh,y="onMouseLeave",c="onMouseEnter",_="mouse",(t==="pointerout"||t==="pointerover")&&(x=Th,y="onPointerLeave",c="onPointerEnter",_="pointer"),m=p==null?h:Qr(p),v=g==null?h:Qr(g),h=new x(y,_+"leave",p,n,f),h.target=m,h.relatedTarget=v,y=null,pr(f)===u&&(x=new x(c,_+"enter",g,n,f),x.target=v,x.relatedTarget=m,y=x),m=y,p&&g)t:{for(x=p,c=g,_=0,v=x;v;v=Lr(v))_++;for(v=0,y=c;y;y=Lr(y))v++;for(;0<_-v;)x=Lr(x),_--;for(;0<v-_;)c=Lr(c),v--;for(;_--;){if(x===c||c!==null&&x===c.alternate)break t;x=Lr(x),c=Lr(c)}x=null}else x=null;p!==null&&Nh(d,h,p,x,!1),g!==null&&m!==null&&Nh(d,m,g,x,!0)}}e:{if(h=u?Qr(u):window,p=h.nodeName&&h.nodeName.toLowerCase(),p==="select"||p==="input"&&h.type==="file")var C=Y0;else if(Rh(h))if(gg)C=Z0;else{C=$0;var R=q0}else(p=h.nodeName)&&p.toLowerCase()==="input"&&(h.type==="checkbox"||h.type==="radio")&&(C=K0);if(C&&(C=C(t,u))){mg(d,C,n,f);break e}R&&R(t,h,u),t==="focusout"&&(R=h._wrapperState)&&R.controlled&&h.type==="number"&&gc(h,"number",h.value)}switch(R=u?Qr(u):window,t){case"focusin":(Rh(R)||R.contentEditable==="true")&&(Kr=R,Cc=u,io=null);break;case"focusout":io=Cc=Kr=null;break;case"mousedown":Pc=!0;break;case"contextmenu":case"mouseup":case"dragend":Pc=!1,Dh(d,n,f);break;case"selectionchange":if(ex)break;case"keydown":case"keyup":Dh(d,n,f)}var A;if(ud)e:{switch(t){case"compositionstart":var P="onCompositionStart";break e;case"compositionend":P="onCompositionEnd";break e;case"compositionupdate":P="onCompositionUpdate";break e}P=void 0}else $r?hg(t,n)&&(P="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(P="onCompositionStart");P&&(dg&&n.locale!=="ko"&&($r||P!=="onCompositionStart"?P==="onCompositionEnd"&&$r&&(A=fg()):(Fi=f,od="value"in Fi?Fi.value:Fi.textContent,$r=!0)),R=dl(u,P),0<R.length&&(P=new Eh(P,t,null,n,f),d.push({event:P,listeners:R}),A?P.data=A:(A=pg(n),A!==null&&(P.data=A)))),(A=H0?G0(t,n):W0(t,n))&&(u=dl(u,"onBeforeInput"),0<u.length&&(f=new Eh("onBeforeInput","beforeinput",null,n,f),d.push({event:f,listeners:u}),f.data=A))}Ag(d,e)})}function yo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function dl(t,e){for(var n=e+"Capture",i=[];t!==null;){var r=t,s=r.stateNode;r.tag===5&&s!==null&&(r=s,s=ho(t,n),s!=null&&i.unshift(yo(t,s,r)),s=ho(t,e),s!=null&&i.push(yo(t,s,r))),t=t.return}return i}function Lr(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Nh(t,e,n,i,r){for(var s=e._reactName,o=[];n!==null&&n!==i;){var a=n,l=a.alternate,u=a.stateNode;if(l!==null&&l===i)break;a.tag===5&&u!==null&&(a=u,r?(l=ho(n,s),l!=null&&o.unshift(yo(n,l,a))):r||(l=ho(n,s),l!=null&&o.push(yo(n,l,a)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var rx=/\r\n?/g,sx=/\u0000|\uFFFD/g;function Fh(t){return(typeof t=="string"?t:""+t).replace(rx,`
`).replace(sx,"")}function na(t,e,n){if(e=Fh(e),Fh(t)!==e&&n)throw Error(ne(425))}function hl(){}var bc=null,Lc=null;function Dc(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Uc=typeof setTimeout=="function"?setTimeout:void 0,ox=typeof clearTimeout=="function"?clearTimeout:void 0,Oh=typeof Promise=="function"?Promise:void 0,ax=typeof queueMicrotask=="function"?queueMicrotask:typeof Oh<"u"?function(t){return Oh.resolve(null).then(t).catch(lx)}:Uc;function lx(t){setTimeout(function(){throw t})}function vu(t,e){var n=e,i=0;do{var r=n.nextSibling;if(t.removeChild(n),r&&r.nodeType===8)if(n=r.data,n==="/$"){if(i===0){t.removeChild(r),go(e);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=r}while(n);go(e)}function Vi(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function kh(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Ps=Math.random().toString(36).slice(2),$n="__reactFiber$"+Ps,So="__reactProps$"+Ps,vi="__reactContainer$"+Ps,Ic="__reactEvents$"+Ps,ux="__reactListeners$"+Ps,cx="__reactHandles$"+Ps;function pr(t){var e=t[$n];if(e)return e;for(var n=t.parentNode;n;){if(e=n[vi]||n[$n]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=kh(t);t!==null;){if(n=t[$n])return n;t=kh(t)}return e}t=n,n=t.parentNode}return null}function Fo(t){return t=t[$n]||t[vi],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Qr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(ne(33))}function Bl(t){return t[So]||null}var Nc=[],Jr=-1;function Qi(t){return{current:t}}function lt(t){0>Jr||(t.current=Nc[Jr],Nc[Jr]=null,Jr--)}function ot(t,e){Jr++,Nc[Jr]=t.current,t.current=e}var $i={},Xt=Qi($i),on=Qi(!1),Sr=$i;function gs(t,e){var n=t.type.contextTypes;if(!n)return $i;var i=t.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===e)return i.__reactInternalMemoizedMaskedChildContext;var r={},s;for(s in n)r[s]=e[s];return i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=r),r}function an(t){return t=t.childContextTypes,t!=null}function pl(){lt(on),lt(Xt)}function zh(t,e,n){if(Xt.current!==$i)throw Error(ne(168));ot(Xt,e),ot(on,n)}function Cg(t,e,n){var i=t.stateNode;if(e=e.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var r in i)if(!(r in e))throw Error(ne(108,qv(t)||"Unknown",r));return gt({},n,i)}function ml(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||$i,Sr=Xt.current,ot(Xt,t),ot(on,on.current),!0}function Bh(t,e,n){var i=t.stateNode;if(!i)throw Error(ne(169));n?(t=Cg(t,e,Sr),i.__reactInternalMemoizedMergedChildContext=t,lt(on),lt(Xt),ot(Xt,t)):lt(on),ot(on,n)}var ci=null,Vl=!1,xu=!1;function Pg(t){ci===null?ci=[t]:ci.push(t)}function fx(t){Vl=!0,Pg(t)}function Ji(){if(!xu&&ci!==null){xu=!0;var t=0,e=it;try{var n=ci;for(it=1;t<n.length;t++){var i=n[t];do i=i(!0);while(i!==null)}ci=null,Vl=!1}catch(r){throw ci!==null&&(ci=ci.slice(t+1)),eg(nd,Ji),r}finally{it=e,xu=!1}}return null}var es=[],ts=0,gl=null,_l=0,En=[],Tn=0,Mr=null,fi=1,di="";function lr(t,e){es[ts++]=_l,es[ts++]=gl,gl=t,_l=e}function bg(t,e,n){En[Tn++]=fi,En[Tn++]=di,En[Tn++]=Mr,Mr=t;var i=fi;t=di;var r=32-Hn(i)-1;i&=~(1<<r),n+=1;var s=32-Hn(e)+r;if(30<s){var o=r-r%5;s=(i&(1<<o)-1).toString(32),i>>=o,r-=o,fi=1<<32-Hn(e)+r|n<<r|i,di=s+t}else fi=1<<s|n<<r|i,di=t}function fd(t){t.return!==null&&(lr(t,1),bg(t,1,0))}function dd(t){for(;t===gl;)gl=es[--ts],es[ts]=null,_l=es[--ts],es[ts]=null;for(;t===Mr;)Mr=En[--Tn],En[Tn]=null,di=En[--Tn],En[Tn]=null,fi=En[--Tn],En[Tn]=null}var mn=null,pn=null,ht=!1,zn=null;function Lg(t,e){var n=Rn(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Vh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,mn=t,pn=Vi(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,mn=t,pn=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Mr!==null?{id:fi,overflow:di}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Rn(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,mn=t,pn=null,!0):!1;default:return!1}}function Fc(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Oc(t){if(ht){var e=pn;if(e){var n=e;if(!Vh(t,e)){if(Fc(t))throw Error(ne(418));e=Vi(n.nextSibling);var i=mn;e&&Vh(t,e)?Lg(i,n):(t.flags=t.flags&-4097|2,ht=!1,mn=t)}}else{if(Fc(t))throw Error(ne(418));t.flags=t.flags&-4097|2,ht=!1,mn=t}}}function Hh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;mn=t}function ia(t){if(t!==mn)return!1;if(!ht)return Hh(t),ht=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Dc(t.type,t.memoizedProps)),e&&(e=pn)){if(Fc(t))throw Dg(),Error(ne(418));for(;e;)Lg(t,e),e=Vi(e.nextSibling)}if(Hh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ne(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){pn=Vi(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}pn=null}}else pn=mn?Vi(t.stateNode.nextSibling):null;return!0}function Dg(){for(var t=pn;t;)t=Vi(t.nextSibling)}function _s(){pn=mn=null,ht=!1}function hd(t){zn===null?zn=[t]:zn.push(t)}var dx=Mi.ReactCurrentBatchConfig;function zs(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(ne(309));var i=n.stateNode}if(!i)throw Error(ne(147,t));var r=i,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var a=r.refs;o===null?delete a[s]:a[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(ne(284));if(!n._owner)throw Error(ne(290,t))}return t}function ra(t,e){throw t=Object.prototype.toString.call(e),Error(ne(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Gh(t){var e=t._init;return e(t._payload)}function Ug(t){function e(c,_){if(t){var v=c.deletions;v===null?(c.deletions=[_],c.flags|=16):v.push(_)}}function n(c,_){if(!t)return null;for(;_!==null;)e(c,_),_=_.sibling;return null}function i(c,_){for(c=new Map;_!==null;)_.key!==null?c.set(_.key,_):c.set(_.index,_),_=_.sibling;return c}function r(c,_){return c=Xi(c,_),c.index=0,c.sibling=null,c}function s(c,_,v){return c.index=v,t?(v=c.alternate,v!==null?(v=v.index,v<_?(c.flags|=2,_):v):(c.flags|=2,_)):(c.flags|=1048576,_)}function o(c){return t&&c.alternate===null&&(c.flags|=2),c}function a(c,_,v,y){return _===null||_.tag!==6?(_=Au(v,c.mode,y),_.return=c,_):(_=r(_,v),_.return=c,_)}function l(c,_,v,y){var C=v.type;return C===qr?f(c,_,v.props.children,y,v.key):_!==null&&(_.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Li&&Gh(C)===_.type)?(y=r(_,v.props),y.ref=zs(c,_,v),y.return=c,y):(y=Ka(v.type,v.key,v.props,null,c.mode,y),y.ref=zs(c,_,v),y.return=c,y)}function u(c,_,v,y){return _===null||_.tag!==4||_.stateNode.containerInfo!==v.containerInfo||_.stateNode.implementation!==v.implementation?(_=Ru(v,c.mode,y),_.return=c,_):(_=r(_,v.children||[]),_.return=c,_)}function f(c,_,v,y,C){return _===null||_.tag!==7?(_=yr(v,c.mode,y,C),_.return=c,_):(_=r(_,v),_.return=c,_)}function d(c,_,v){if(typeof _=="string"&&_!==""||typeof _=="number")return _=Au(""+_,c.mode,v),_.return=c,_;if(typeof _=="object"&&_!==null){switch(_.$$typeof){case Yo:return v=Ka(_.type,_.key,_.props,null,c.mode,v),v.ref=zs(c,null,_),v.return=c,v;case Yr:return _=Ru(_,c.mode,v),_.return=c,_;case Li:var y=_._init;return d(c,y(_._payload),v)}if($s(_)||Is(_))return _=yr(_,c.mode,v,null),_.return=c,_;ra(c,_)}return null}function h(c,_,v,y){var C=_!==null?_.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return C!==null?null:a(c,_,""+v,y);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Yo:return v.key===C?l(c,_,v,y):null;case Yr:return v.key===C?u(c,_,v,y):null;case Li:return C=v._init,h(c,_,C(v._payload),y)}if($s(v)||Is(v))return C!==null?null:f(c,_,v,y,null);ra(c,v)}return null}function p(c,_,v,y,C){if(typeof y=="string"&&y!==""||typeof y=="number")return c=c.get(v)||null,a(_,c,""+y,C);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case Yo:return c=c.get(y.key===null?v:y.key)||null,l(_,c,y,C);case Yr:return c=c.get(y.key===null?v:y.key)||null,u(_,c,y,C);case Li:var R=y._init;return p(c,_,v,R(y._payload),C)}if($s(y)||Is(y))return c=c.get(v)||null,f(_,c,y,C,null);ra(_,y)}return null}function g(c,_,v,y){for(var C=null,R=null,A=_,P=_=0,T=null;A!==null&&P<v.length;P++){A.index>P?(T=A,A=null):T=A.sibling;var M=h(c,A,v[P],y);if(M===null){A===null&&(A=T);break}t&&A&&M.alternate===null&&e(c,A),_=s(M,_,P),R===null?C=M:R.sibling=M,R=M,A=T}if(P===v.length)return n(c,A),ht&&lr(c,P),C;if(A===null){for(;P<v.length;P++)A=d(c,v[P],y),A!==null&&(_=s(A,_,P),R===null?C=A:R.sibling=A,R=A);return ht&&lr(c,P),C}for(A=i(c,A);P<v.length;P++)T=p(A,c,P,v[P],y),T!==null&&(t&&T.alternate!==null&&A.delete(T.key===null?P:T.key),_=s(T,_,P),R===null?C=T:R.sibling=T,R=T);return t&&A.forEach(function(D){return e(c,D)}),ht&&lr(c,P),C}function x(c,_,v,y){var C=Is(v);if(typeof C!="function")throw Error(ne(150));if(v=C.call(v),v==null)throw Error(ne(151));for(var R=C=null,A=_,P=_=0,T=null,M=v.next();A!==null&&!M.done;P++,M=v.next()){A.index>P?(T=A,A=null):T=A.sibling;var D=h(c,A,M.value,y);if(D===null){A===null&&(A=T);break}t&&A&&D.alternate===null&&e(c,A),_=s(D,_,P),R===null?C=D:R.sibling=D,R=D,A=T}if(M.done)return n(c,A),ht&&lr(c,P),C;if(A===null){for(;!M.done;P++,M=v.next())M=d(c,M.value,y),M!==null&&(_=s(M,_,P),R===null?C=M:R.sibling=M,R=M);return ht&&lr(c,P),C}for(A=i(c,A);!M.done;P++,M=v.next())M=p(A,c,P,M.value,y),M!==null&&(t&&M.alternate!==null&&A.delete(M.key===null?P:M.key),_=s(M,_,P),R===null?C=M:R.sibling=M,R=M);return t&&A.forEach(function(j){return e(c,j)}),ht&&lr(c,P),C}function m(c,_,v,y){if(typeof v=="object"&&v!==null&&v.type===qr&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Yo:e:{for(var C=v.key,R=_;R!==null;){if(R.key===C){if(C=v.type,C===qr){if(R.tag===7){n(c,R.sibling),_=r(R,v.props.children),_.return=c,c=_;break e}}else if(R.elementType===C||typeof C=="object"&&C!==null&&C.$$typeof===Li&&Gh(C)===R.type){n(c,R.sibling),_=r(R,v.props),_.ref=zs(c,R,v),_.return=c,c=_;break e}n(c,R);break}else e(c,R);R=R.sibling}v.type===qr?(_=yr(v.props.children,c.mode,y,v.key),_.return=c,c=_):(y=Ka(v.type,v.key,v.props,null,c.mode,y),y.ref=zs(c,_,v),y.return=c,c=y)}return o(c);case Yr:e:{for(R=v.key;_!==null;){if(_.key===R)if(_.tag===4&&_.stateNode.containerInfo===v.containerInfo&&_.stateNode.implementation===v.implementation){n(c,_.sibling),_=r(_,v.children||[]),_.return=c,c=_;break e}else{n(c,_);break}else e(c,_);_=_.sibling}_=Ru(v,c.mode,y),_.return=c,c=_}return o(c);case Li:return R=v._init,m(c,_,R(v._payload),y)}if($s(v))return g(c,_,v,y);if(Is(v))return x(c,_,v,y);ra(c,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,_!==null&&_.tag===6?(n(c,_.sibling),_=r(_,v),_.return=c,c=_):(n(c,_),_=Au(v,c.mode,y),_.return=c,c=_),o(c)):n(c,_)}return m}var vs=Ug(!0),Ig=Ug(!1),vl=Qi(null),xl=null,ns=null,pd=null;function md(){pd=ns=xl=null}function gd(t){var e=vl.current;lt(vl),t._currentValue=e}function kc(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function fs(t,e){xl=t,pd=ns=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(sn=!0),t.firstContext=null)}function Pn(t){var e=t._currentValue;if(pd!==t)if(t={context:t,memoizedValue:e,next:null},ns===null){if(xl===null)throw Error(ne(308));ns=t,xl.dependencies={lanes:0,firstContext:t}}else ns=ns.next=t;return e}var mr=null;function _d(t){mr===null?mr=[t]:mr.push(t)}function Ng(t,e,n,i){var r=e.interleaved;return r===null?(n.next=n,_d(e)):(n.next=r.next,r.next=n),e.interleaved=n,xi(t,i)}function xi(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Di=!1;function vd(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Fg(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function mi(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function Hi(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Ye&2){var r=i.pending;return r===null?e.next=e:(e.next=r.next,r.next=e),i.pending=e,xi(t,n)}return r=i.interleaved,r===null?(e.next=e,_d(i)):(e.next=r.next,r.next=e),i.interleaved=e,xi(t,n)}function Wa(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,id(t,n)}}function Wh(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var r=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?r=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?r=s=e:s=s.next=e}else r=s=e;n={baseState:i.baseState,firstBaseUpdate:r,lastBaseUpdate:s,shared:i.shared,effects:i.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function yl(t,e,n,i){var r=t.updateQueue;Di=!1;var s=r.firstBaseUpdate,o=r.lastBaseUpdate,a=r.shared.pending;if(a!==null){r.shared.pending=null;var l=a,u=l.next;l.next=null,o===null?s=u:o.next=u,o=l;var f=t.alternate;f!==null&&(f=f.updateQueue,a=f.lastBaseUpdate,a!==o&&(a===null?f.firstBaseUpdate=u:a.next=u,f.lastBaseUpdate=l))}if(s!==null){var d=r.baseState;o=0,f=u=l=null,a=s;do{var h=a.lane,p=a.eventTime;if((i&h)===h){f!==null&&(f=f.next={eventTime:p,lane:0,tag:a.tag,payload:a.payload,callback:a.callback,next:null});e:{var g=t,x=a;switch(h=e,p=n,x.tag){case 1:if(g=x.payload,typeof g=="function"){d=g.call(p,d,h);break e}d=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=x.payload,h=typeof g=="function"?g.call(p,d,h):g,h==null)break e;d=gt({},d,h);break e;case 2:Di=!0}}a.callback!==null&&a.lane!==0&&(t.flags|=64,h=r.effects,h===null?r.effects=[a]:h.push(a))}else p={eventTime:p,lane:h,tag:a.tag,payload:a.payload,callback:a.callback,next:null},f===null?(u=f=p,l=d):f=f.next=p,o|=h;if(a=a.next,a===null){if(a=r.shared.pending,a===null)break;h=a,a=h.next,h.next=null,r.lastBaseUpdate=h,r.shared.pending=null}}while(!0);if(f===null&&(l=d),r.baseState=l,r.firstBaseUpdate=u,r.lastBaseUpdate=f,e=r.shared.interleaved,e!==null){r=e;do o|=r.lane,r=r.next;while(r!==e)}else s===null&&(r.shared.lanes=0);Tr|=o,t.lanes=o,t.memoizedState=d}}function Xh(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var i=t[e],r=i.callback;if(r!==null){if(i.callback=null,i=n,typeof r!="function")throw Error(ne(191,r));r.call(i)}}}var Oo={},Qn=Qi(Oo),Mo=Qi(Oo),Eo=Qi(Oo);function gr(t){if(t===Oo)throw Error(ne(174));return t}function xd(t,e){switch(ot(Eo,e),ot(Mo,t),ot(Qn,Oo),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:vc(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=vc(e,t)}lt(Qn),ot(Qn,e)}function xs(){lt(Qn),lt(Mo),lt(Eo)}function Og(t){gr(Eo.current);var e=gr(Qn.current),n=vc(e,t.type);e!==n&&(ot(Mo,t),ot(Qn,n))}function yd(t){Mo.current===t&&(lt(Qn),lt(Mo))}var pt=Qi(0);function Sl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var yu=[];function Sd(){for(var t=0;t<yu.length;t++)yu[t]._workInProgressVersionPrimary=null;yu.length=0}var Xa=Mi.ReactCurrentDispatcher,Su=Mi.ReactCurrentBatchConfig,Er=0,mt=null,At=null,Lt=null,Ml=!1,ro=!1,To=0,hx=0;function Bt(){throw Error(ne(321))}function Md(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!Xn(t[n],e[n]))return!1;return!0}function Ed(t,e,n,i,r,s){if(Er=s,mt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Xa.current=t===null||t.memoizedState===null?_x:vx,t=n(i,r),ro){s=0;do{if(ro=!1,To=0,25<=s)throw Error(ne(301));s+=1,Lt=At=null,e.updateQueue=null,Xa.current=xx,t=n(i,r)}while(ro)}if(Xa.current=El,e=At!==null&&At.next!==null,Er=0,Lt=At=mt=null,Ml=!1,e)throw Error(ne(300));return t}function Td(){var t=To!==0;return To=0,t}function Yn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Lt===null?mt.memoizedState=Lt=t:Lt=Lt.next=t,Lt}function bn(){if(At===null){var t=mt.alternate;t=t!==null?t.memoizedState:null}else t=At.next;var e=Lt===null?mt.memoizedState:Lt.next;if(e!==null)Lt=e,At=t;else{if(t===null)throw Error(ne(310));At=t,t={memoizedState:At.memoizedState,baseState:At.baseState,baseQueue:At.baseQueue,queue:At.queue,next:null},Lt===null?mt.memoizedState=Lt=t:Lt=Lt.next=t}return Lt}function wo(t,e){return typeof e=="function"?e(t):e}function Mu(t){var e=bn(),n=e.queue;if(n===null)throw Error(ne(311));n.lastRenderedReducer=t;var i=At,r=i.baseQueue,s=n.pending;if(s!==null){if(r!==null){var o=r.next;r.next=s.next,s.next=o}i.baseQueue=r=s,n.pending=null}if(r!==null){s=r.next,i=i.baseState;var a=o=null,l=null,u=s;do{var f=u.lane;if((Er&f)===f)l!==null&&(l=l.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),i=u.hasEagerState?u.eagerState:t(i,u.action);else{var d={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};l===null?(a=l=d,o=i):l=l.next=d,mt.lanes|=f,Tr|=f}u=u.next}while(u!==null&&u!==s);l===null?o=i:l.next=a,Xn(i,e.memoizedState)||(sn=!0),e.memoizedState=i,e.baseState=o,e.baseQueue=l,n.lastRenderedState=i}if(t=n.interleaved,t!==null){r=t;do s=r.lane,mt.lanes|=s,Tr|=s,r=r.next;while(r!==t)}else r===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function Eu(t){var e=bn(),n=e.queue;if(n===null)throw Error(ne(311));n.lastRenderedReducer=t;var i=n.dispatch,r=n.pending,s=e.memoizedState;if(r!==null){n.pending=null;var o=r=r.next;do s=t(s,o.action),o=o.next;while(o!==r);Xn(s,e.memoizedState)||(sn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function kg(){}function zg(t,e){var n=mt,i=bn(),r=e(),s=!Xn(i.memoizedState,r);if(s&&(i.memoizedState=r,sn=!0),i=i.queue,wd(Hg.bind(null,n,i,t),[t]),i.getSnapshot!==e||s||Lt!==null&&Lt.memoizedState.tag&1){if(n.flags|=2048,Ao(9,Vg.bind(null,n,i,r,e),void 0,null),Dt===null)throw Error(ne(349));Er&30||Bg(n,e,r)}return r}function Bg(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=mt.updateQueue,e===null?(e={lastEffect:null,stores:null},mt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Vg(t,e,n,i){e.value=n,e.getSnapshot=i,Gg(e)&&Wg(t)}function Hg(t,e,n){return n(function(){Gg(e)&&Wg(t)})}function Gg(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!Xn(t,n)}catch{return!0}}function Wg(t){var e=xi(t,1);e!==null&&Gn(e,t,1,-1)}function jh(t){var e=Yn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:wo,lastRenderedState:t},e.queue=t,t=t.dispatch=gx.bind(null,mt,t),[e.memoizedState,t]}function Ao(t,e,n,i){return t={tag:t,create:e,destroy:n,deps:i,next:null},e=mt.updateQueue,e===null?(e={lastEffect:null,stores:null},mt.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t)),t}function Xg(){return bn().memoizedState}function ja(t,e,n,i){var r=Yn();mt.flags|=t,r.memoizedState=Ao(1|e,n,void 0,i===void 0?null:i)}function Hl(t,e,n,i){var r=bn();i=i===void 0?null:i;var s=void 0;if(At!==null){var o=At.memoizedState;if(s=o.destroy,i!==null&&Md(i,o.deps)){r.memoizedState=Ao(e,n,s,i);return}}mt.flags|=t,r.memoizedState=Ao(1|e,n,s,i)}function Yh(t,e){return ja(8390656,8,t,e)}function wd(t,e){return Hl(2048,8,t,e)}function jg(t,e){return Hl(4,2,t,e)}function Yg(t,e){return Hl(4,4,t,e)}function qg(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function $g(t,e,n){return n=n!=null?n.concat([t]):null,Hl(4,4,qg.bind(null,e,t),n)}function Ad(){}function Kg(t,e){var n=bn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Md(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Zg(t,e){var n=bn();e=e===void 0?null:e;var i=n.memoizedState;return i!==null&&e!==null&&Md(e,i[1])?i[0]:(t=t(),n.memoizedState=[t,e],t)}function Qg(t,e,n){return Er&21?(Xn(n,e)||(n=ig(),mt.lanes|=n,Tr|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,sn=!0),t.memoizedState=n)}function px(t,e){var n=it;it=n!==0&&4>n?n:4,t(!0);var i=Su.transition;Su.transition={};try{t(!1),e()}finally{it=n,Su.transition=i}}function Jg(){return bn().memoizedState}function mx(t,e,n){var i=Wi(t);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},e_(t))t_(e,n);else if(n=Ng(t,e,n,i),n!==null){var r=Kt();Gn(n,t,i,r),n_(n,e,i)}}function gx(t,e,n){var i=Wi(t),r={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(e_(t))t_(e,r);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,a=s(o,n);if(r.hasEagerState=!0,r.eagerState=a,Xn(a,o)){var l=e.interleaved;l===null?(r.next=r,_d(e)):(r.next=l.next,l.next=r),e.interleaved=r;return}}catch{}finally{}n=Ng(t,e,r,i),n!==null&&(r=Kt(),Gn(n,t,i,r),n_(n,e,i))}}function e_(t){var e=t.alternate;return t===mt||e!==null&&e===mt}function t_(t,e){ro=Ml=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function n_(t,e,n){if(n&4194240){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,id(t,n)}}var El={readContext:Pn,useCallback:Bt,useContext:Bt,useEffect:Bt,useImperativeHandle:Bt,useInsertionEffect:Bt,useLayoutEffect:Bt,useMemo:Bt,useReducer:Bt,useRef:Bt,useState:Bt,useDebugValue:Bt,useDeferredValue:Bt,useTransition:Bt,useMutableSource:Bt,useSyncExternalStore:Bt,useId:Bt,unstable_isNewReconciler:!1},_x={readContext:Pn,useCallback:function(t,e){return Yn().memoizedState=[t,e===void 0?null:e],t},useContext:Pn,useEffect:Yh,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,ja(4194308,4,qg.bind(null,e,t),n)},useLayoutEffect:function(t,e){return ja(4194308,4,t,e)},useInsertionEffect:function(t,e){return ja(4,2,t,e)},useMemo:function(t,e){var n=Yn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var i=Yn();return e=n!==void 0?n(e):e,i.memoizedState=i.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},i.queue=t,t=t.dispatch=mx.bind(null,mt,t),[i.memoizedState,t]},useRef:function(t){var e=Yn();return t={current:t},e.memoizedState=t},useState:jh,useDebugValue:Ad,useDeferredValue:function(t){return Yn().memoizedState=t},useTransition:function(){var t=jh(!1),e=t[0];return t=px.bind(null,t[1]),Yn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var i=mt,r=Yn();if(ht){if(n===void 0)throw Error(ne(407));n=n()}else{if(n=e(),Dt===null)throw Error(ne(349));Er&30||Bg(i,e,n)}r.memoizedState=n;var s={value:n,getSnapshot:e};return r.queue=s,Yh(Hg.bind(null,i,s,t),[t]),i.flags|=2048,Ao(9,Vg.bind(null,i,s,n,e),void 0,null),n},useId:function(){var t=Yn(),e=Dt.identifierPrefix;if(ht){var n=di,i=fi;n=(i&~(1<<32-Hn(i)-1)).toString(32)+n,e=":"+e+"R"+n,n=To++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=hx++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},vx={readContext:Pn,useCallback:Kg,useContext:Pn,useEffect:wd,useImperativeHandle:$g,useInsertionEffect:jg,useLayoutEffect:Yg,useMemo:Zg,useReducer:Mu,useRef:Xg,useState:function(){return Mu(wo)},useDebugValue:Ad,useDeferredValue:function(t){var e=bn();return Qg(e,At.memoizedState,t)},useTransition:function(){var t=Mu(wo)[0],e=bn().memoizedState;return[t,e]},useMutableSource:kg,useSyncExternalStore:zg,useId:Jg,unstable_isNewReconciler:!1},xx={readContext:Pn,useCallback:Kg,useContext:Pn,useEffect:wd,useImperativeHandle:$g,useInsertionEffect:jg,useLayoutEffect:Yg,useMemo:Zg,useReducer:Eu,useRef:Xg,useState:function(){return Eu(wo)},useDebugValue:Ad,useDeferredValue:function(t){var e=bn();return At===null?e.memoizedState=t:Qg(e,At.memoizedState,t)},useTransition:function(){var t=Eu(wo)[0],e=bn().memoizedState;return[t,e]},useMutableSource:kg,useSyncExternalStore:zg,useId:Jg,unstable_isNewReconciler:!1};function On(t,e){if(t&&t.defaultProps){e=gt({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function zc(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:gt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Gl={isMounted:function(t){return(t=t._reactInternals)?Pr(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var i=Kt(),r=Wi(t),s=mi(i,r);s.payload=e,n!=null&&(s.callback=n),e=Hi(t,s,r),e!==null&&(Gn(e,t,r,i),Wa(e,t,r))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=Kt(),r=Wi(t),s=mi(i,r);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=Hi(t,s,r),e!==null&&(Gn(e,t,r,i),Wa(e,t,r))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Kt(),i=Wi(t),r=mi(n,i);r.tag=2,e!=null&&(r.callback=e),e=Hi(t,r,i),e!==null&&(Gn(e,t,i,n),Wa(e,t,i))}};function qh(t,e,n,i,r,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,o):e.prototype&&e.prototype.isPureReactComponent?!vo(n,i)||!vo(r,s):!0}function i_(t,e,n){var i=!1,r=$i,s=e.contextType;return typeof s=="object"&&s!==null?s=Pn(s):(r=an(e)?Sr:Xt.current,i=e.contextTypes,s=(i=i!=null)?gs(t,r):$i),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Gl,t.stateNode=e,e._reactInternals=t,i&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=s),e}function $h(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Gl.enqueueReplaceState(e,e.state,null)}function Bc(t,e,n,i){var r=t.stateNode;r.props=n,r.state=t.memoizedState,r.refs={},vd(t);var s=e.contextType;typeof s=="object"&&s!==null?r.context=Pn(s):(s=an(e)?Sr:Xt.current,r.context=gs(t,s)),r.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(zc(t,e,s,n),r.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof r.getSnapshotBeforeUpdate=="function"||typeof r.UNSAFE_componentWillMount!="function"&&typeof r.componentWillMount!="function"||(e=r.state,typeof r.componentWillMount=="function"&&r.componentWillMount(),typeof r.UNSAFE_componentWillMount=="function"&&r.UNSAFE_componentWillMount(),e!==r.state&&Gl.enqueueReplaceState(r,r.state,null),yl(t,n,r,i),r.state=t.memoizedState),typeof r.componentDidMount=="function"&&(t.flags|=4194308)}function ys(t,e){try{var n="",i=e;do n+=Yv(i),i=i.return;while(i);var r=n}catch(s){r=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:r,digest:null}}function Tu(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function Vc(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var yx=typeof WeakMap=="function"?WeakMap:Map;function r_(t,e,n){n=mi(-1,n),n.tag=3,n.payload={element:null};var i=e.value;return n.callback=function(){wl||(wl=!0,Zc=i),Vc(t,e)},n}function s_(t,e,n){n=mi(-1,n),n.tag=3;var i=t.type.getDerivedStateFromError;if(typeof i=="function"){var r=e.value;n.payload=function(){return i(r)},n.callback=function(){Vc(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Vc(t,e),typeof i!="function"&&(Gi===null?Gi=new Set([this]):Gi.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Kh(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new yx;var r=new Set;i.set(e,r)}else r=i.get(e),r===void 0&&(r=new Set,i.set(e,r));r.has(n)||(r.add(n),t=Ix.bind(null,t,e,n),e.then(t,t))}function Zh(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Qh(t,e,n,i,r){return t.mode&1?(t.flags|=65536,t.lanes=r,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=mi(-1,1),e.tag=2,Hi(n,e,1))),n.lanes|=1),t)}var Sx=Mi.ReactCurrentOwner,sn=!1;function qt(t,e,n,i){e.child=t===null?Ig(e,null,n,i):vs(e,t.child,n,i)}function Jh(t,e,n,i,r){n=n.render;var s=e.ref;return fs(e,r),i=Ed(t,e,n,i,s,r),n=Td(),t!==null&&!sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,yi(t,e,r)):(ht&&n&&fd(e),e.flags|=1,qt(t,e,i,r),e.child)}function ep(t,e,n,i,r){if(t===null){var s=n.type;return typeof s=="function"&&!Id(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,o_(t,e,s,i,r)):(t=Ka(n.type,null,i,e,e.mode,r),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&r)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:vo,n(o,i)&&t.ref===e.ref)return yi(t,e,r)}return e.flags|=1,t=Xi(s,i),t.ref=e.ref,t.return=e,e.child=t}function o_(t,e,n,i,r){if(t!==null){var s=t.memoizedProps;if(vo(s,i)&&t.ref===e.ref)if(sn=!1,e.pendingProps=i=s,(t.lanes&r)!==0)t.flags&131072&&(sn=!0);else return e.lanes=t.lanes,yi(t,e,r)}return Hc(t,e,n,i,r)}function a_(t,e,n){var i=e.pendingProps,r=i.children,s=t!==null?t.memoizedState:null;if(i.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},ot(rs,hn),hn|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,ot(rs,hn),hn|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=s!==null?s.baseLanes:n,ot(rs,hn),hn|=i}else s!==null?(i=s.baseLanes|n,e.memoizedState=null):i=n,ot(rs,hn),hn|=i;return qt(t,e,r,n),e.child}function l_(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function Hc(t,e,n,i,r){var s=an(n)?Sr:Xt.current;return s=gs(e,s),fs(e,r),n=Ed(t,e,n,i,s,r),i=Td(),t!==null&&!sn?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~r,yi(t,e,r)):(ht&&i&&fd(e),e.flags|=1,qt(t,e,n,r),e.child)}function tp(t,e,n,i,r){if(an(n)){var s=!0;ml(e)}else s=!1;if(fs(e,r),e.stateNode===null)Ya(t,e),i_(e,n,i),Bc(e,n,i,r),i=!0;else if(t===null){var o=e.stateNode,a=e.memoizedProps;o.props=a;var l=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=Pn(u):(u=an(n)?Sr:Xt.current,u=gs(e,u));var f=n.getDerivedStateFromProps,d=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==i||l!==u)&&$h(e,o,i,u),Di=!1;var h=e.memoizedState;o.state=h,yl(e,i,o,r),l=e.memoizedState,a!==i||h!==l||on.current||Di?(typeof f=="function"&&(zc(e,n,f,i),l=e.memoizedState),(a=Di||qh(e,n,a,i,h,l,u))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=l),o.props=i,o.state=l,o.context=u,i=a):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{o=e.stateNode,Fg(t,e),a=e.memoizedProps,u=e.type===e.elementType?a:On(e.type,a),o.props=u,d=e.pendingProps,h=o.context,l=n.contextType,typeof l=="object"&&l!==null?l=Pn(l):(l=an(n)?Sr:Xt.current,l=gs(e,l));var p=n.getDerivedStateFromProps;(f=typeof p=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(a!==d||h!==l)&&$h(e,o,i,l),Di=!1,h=e.memoizedState,o.state=h,yl(e,i,o,r);var g=e.memoizedState;a!==d||h!==g||on.current||Di?(typeof p=="function"&&(zc(e,n,p,i),g=e.memoizedState),(u=Di||qh(e,n,u,i,h,g,l)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(i,g,l),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(i,g,l)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=g),o.props=i,o.state=g,o.context=l,i=u):(typeof o.componentDidUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||a===t.memoizedProps&&h===t.memoizedState||(e.flags|=1024),i=!1)}return Gc(t,e,n,i,s,r)}function Gc(t,e,n,i,r,s){l_(t,e);var o=(e.flags&128)!==0;if(!i&&!o)return r&&Bh(e,n,!1),yi(t,e,s);i=e.stateNode,Sx.current=e;var a=o&&typeof n.getDerivedStateFromError!="function"?null:i.render();return e.flags|=1,t!==null&&o?(e.child=vs(e,t.child,null,s),e.child=vs(e,null,a,s)):qt(t,e,a,s),e.memoizedState=i.state,r&&Bh(e,n,!0),e.child}function u_(t){var e=t.stateNode;e.pendingContext?zh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&zh(t,e.context,!1),xd(t,e.containerInfo)}function np(t,e,n,i,r){return _s(),hd(r),e.flags|=256,qt(t,e,n,i),e.child}var Wc={dehydrated:null,treeContext:null,retryLane:0};function Xc(t){return{baseLanes:t,cachePool:null,transitions:null}}function c_(t,e,n){var i=e.pendingProps,r=pt.current,s=!1,o=(e.flags&128)!==0,a;if((a=o)||(a=t!==null&&t.memoizedState===null?!1:(r&2)!==0),a?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(r|=1),ot(pt,r&1),t===null)return Oc(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=i.children,t=i.fallback,s?(i=e.mode,s=e.child,o={mode:"hidden",children:o},!(i&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=jl(o,i,0,null),t=yr(t,i,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=Xc(n),e.memoizedState=Wc,t):Rd(e,o));if(r=t.memoizedState,r!==null&&(a=r.dehydrated,a!==null))return Mx(t,e,o,i,a,r,n);if(s){s=i.fallback,o=e.mode,r=t.child,a=r.sibling;var l={mode:"hidden",children:i.children};return!(o&1)&&e.child!==r?(i=e.child,i.childLanes=0,i.pendingProps=l,e.deletions=null):(i=Xi(r,l),i.subtreeFlags=r.subtreeFlags&14680064),a!==null?s=Xi(a,s):(s=yr(s,o,n,null),s.flags|=2),s.return=e,i.return=e,i.sibling=s,e.child=i,i=s,s=e.child,o=t.child.memoizedState,o=o===null?Xc(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=Wc,i}return s=t.child,t=s.sibling,i=Xi(s,{mode:"visible",children:i.children}),!(e.mode&1)&&(i.lanes=n),i.return=e,i.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=i,e.memoizedState=null,i}function Rd(t,e){return e=jl({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function sa(t,e,n,i){return i!==null&&hd(i),vs(e,t.child,null,n),t=Rd(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Mx(t,e,n,i,r,s,o){if(n)return e.flags&256?(e.flags&=-257,i=Tu(Error(ne(422))),sa(t,e,o,i)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=i.fallback,r=e.mode,i=jl({mode:"visible",children:i.children},r,0,null),s=yr(s,r,o,null),s.flags|=2,i.return=e,s.return=e,i.sibling=s,e.child=i,e.mode&1&&vs(e,t.child,null,o),e.child.memoizedState=Xc(o),e.memoizedState=Wc,s);if(!(e.mode&1))return sa(t,e,o,null);if(r.data==="$!"){if(i=r.nextSibling&&r.nextSibling.dataset,i)var a=i.dgst;return i=a,s=Error(ne(419)),i=Tu(s,i,void 0),sa(t,e,o,i)}if(a=(o&t.childLanes)!==0,sn||a){if(i=Dt,i!==null){switch(o&-o){case 4:r=2;break;case 16:r=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:r=32;break;case 536870912:r=268435456;break;default:r=0}r=r&(i.suspendedLanes|o)?0:r,r!==0&&r!==s.retryLane&&(s.retryLane=r,xi(t,r),Gn(i,t,r,-1))}return Ud(),i=Tu(Error(ne(421))),sa(t,e,o,i)}return r.data==="$?"?(e.flags|=128,e.child=t.child,e=Nx.bind(null,t),r._reactRetry=e,null):(t=s.treeContext,pn=Vi(r.nextSibling),mn=e,ht=!0,zn=null,t!==null&&(En[Tn++]=fi,En[Tn++]=di,En[Tn++]=Mr,fi=t.id,di=t.overflow,Mr=e),e=Rd(e,i.children),e.flags|=4096,e)}function ip(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),kc(t.return,e,n)}function wu(t,e,n,i,r){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:r}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=i,s.tail=n,s.tailMode=r)}function f_(t,e,n){var i=e.pendingProps,r=i.revealOrder,s=i.tail;if(qt(t,e,i.children,n),i=pt.current,i&2)i=i&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&ip(t,n,e);else if(t.tag===19)ip(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}i&=1}if(ot(pt,i),!(e.mode&1))e.memoizedState=null;else switch(r){case"forwards":for(n=e.child,r=null;n!==null;)t=n.alternate,t!==null&&Sl(t)===null&&(r=n),n=n.sibling;n=r,n===null?(r=e.child,e.child=null):(r=n.sibling,n.sibling=null),wu(e,!1,r,n,s);break;case"backwards":for(n=null,r=e.child,e.child=null;r!==null;){if(t=r.alternate,t!==null&&Sl(t)===null){e.child=r;break}t=r.sibling,r.sibling=n,n=r,r=t}wu(e,!0,n,null,s);break;case"together":wu(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Ya(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function yi(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Tr|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(ne(153));if(e.child!==null){for(t=e.child,n=Xi(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Xi(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Ex(t,e,n){switch(e.tag){case 3:u_(e),_s();break;case 5:Og(e);break;case 1:an(e.type)&&ml(e);break;case 4:xd(e,e.stateNode.containerInfo);break;case 10:var i=e.type._context,r=e.memoizedProps.value;ot(vl,i._currentValue),i._currentValue=r;break;case 13:if(i=e.memoizedState,i!==null)return i.dehydrated!==null?(ot(pt,pt.current&1),e.flags|=128,null):n&e.child.childLanes?c_(t,e,n):(ot(pt,pt.current&1),t=yi(t,e,n),t!==null?t.sibling:null);ot(pt,pt.current&1);break;case 19:if(i=(n&e.childLanes)!==0,t.flags&128){if(i)return f_(t,e,n);e.flags|=128}if(r=e.memoizedState,r!==null&&(r.rendering=null,r.tail=null,r.lastEffect=null),ot(pt,pt.current),i)break;return null;case 22:case 23:return e.lanes=0,a_(t,e,n)}return yi(t,e,n)}var d_,jc,h_,p_;d_=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};jc=function(){};h_=function(t,e,n,i){var r=t.memoizedProps;if(r!==i){t=e.stateNode,gr(Qn.current);var s=null;switch(n){case"input":r=pc(t,r),i=pc(t,i),s=[];break;case"select":r=gt({},r,{value:void 0}),i=gt({},i,{value:void 0}),s=[];break;case"textarea":r=_c(t,r),i=_c(t,i),s=[];break;default:typeof r.onClick!="function"&&typeof i.onClick=="function"&&(t.onclick=hl)}xc(n,i);var o;n=null;for(u in r)if(!i.hasOwnProperty(u)&&r.hasOwnProperty(u)&&r[u]!=null)if(u==="style"){var a=r[u];for(o in a)a.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(co.hasOwnProperty(u)?s||(s=[]):(s=s||[]).push(u,null));for(u in i){var l=i[u];if(a=r!=null?r[u]:void 0,i.hasOwnProperty(u)&&l!==a&&(l!=null||a!=null))if(u==="style")if(a){for(o in a)!a.hasOwnProperty(o)||l&&l.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in l)l.hasOwnProperty(o)&&a[o]!==l[o]&&(n||(n={}),n[o]=l[o])}else n||(s||(s=[]),s.push(u,n)),n=l;else u==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,a=a?a.__html:void 0,l!=null&&a!==l&&(s=s||[]).push(u,l)):u==="children"?typeof l!="string"&&typeof l!="number"||(s=s||[]).push(u,""+l):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(co.hasOwnProperty(u)?(l!=null&&u==="onScroll"&&at("scroll",t),s||a===l||(s=[])):(s=s||[]).push(u,l))}n&&(s=s||[]).push("style",n);var u=s;(e.updateQueue=u)&&(e.flags|=4)}};p_=function(t,e,n,i){n!==i&&(e.flags|=4)};function Bs(t,e){if(!ht)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Vt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags&14680064,i|=r.flags&14680064,r.return=t,r=r.sibling;else for(r=t.child;r!==null;)n|=r.lanes|r.childLanes,i|=r.subtreeFlags,i|=r.flags,r.return=t,r=r.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Tx(t,e,n){var i=e.pendingProps;switch(dd(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Vt(e),null;case 1:return an(e.type)&&pl(),Vt(e),null;case 3:return i=e.stateNode,xs(),lt(on),lt(Xt),Sd(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(t===null||t.child===null)&&(ia(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,zn!==null&&(ef(zn),zn=null))),jc(t,e),Vt(e),null;case 5:yd(e);var r=gr(Eo.current);if(n=e.type,t!==null&&e.stateNode!=null)h_(t,e,n,i,r),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!i){if(e.stateNode===null)throw Error(ne(166));return Vt(e),null}if(t=gr(Qn.current),ia(e)){i=e.stateNode,n=e.type;var s=e.memoizedProps;switch(i[$n]=e,i[So]=s,t=(e.mode&1)!==0,n){case"dialog":at("cancel",i),at("close",i);break;case"iframe":case"object":case"embed":at("load",i);break;case"video":case"audio":for(r=0;r<Zs.length;r++)at(Zs[r],i);break;case"source":at("error",i);break;case"img":case"image":case"link":at("error",i),at("load",i);break;case"details":at("toggle",i);break;case"input":dh(i,s),at("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!s.multiple},at("invalid",i);break;case"textarea":ph(i,s),at("invalid",i)}xc(n,s),r=null;for(var o in s)if(s.hasOwnProperty(o)){var a=s[o];o==="children"?typeof a=="string"?i.textContent!==a&&(s.suppressHydrationWarning!==!0&&na(i.textContent,a,t),r=["children",a]):typeof a=="number"&&i.textContent!==""+a&&(s.suppressHydrationWarning!==!0&&na(i.textContent,a,t),r=["children",""+a]):co.hasOwnProperty(o)&&a!=null&&o==="onScroll"&&at("scroll",i)}switch(n){case"input":qo(i),hh(i,s,!0);break;case"textarea":qo(i),mh(i);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(i.onclick=hl)}i=r,e.updateQueue=i,i!==null&&(e.flags|=4)}else{o=r.nodeType===9?r:r.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Hm(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof i.is=="string"?t=o.createElement(n,{is:i.is}):(t=o.createElement(n),n==="select"&&(o=t,i.multiple?o.multiple=!0:i.size&&(o.size=i.size))):t=o.createElementNS(t,n),t[$n]=e,t[So]=i,d_(t,e,!1,!1),e.stateNode=t;e:{switch(o=yc(n,i),n){case"dialog":at("cancel",t),at("close",t),r=i;break;case"iframe":case"object":case"embed":at("load",t),r=i;break;case"video":case"audio":for(r=0;r<Zs.length;r++)at(Zs[r],t);r=i;break;case"source":at("error",t),r=i;break;case"img":case"image":case"link":at("error",t),at("load",t),r=i;break;case"details":at("toggle",t),r=i;break;case"input":dh(t,i),r=pc(t,i),at("invalid",t);break;case"option":r=i;break;case"select":t._wrapperState={wasMultiple:!!i.multiple},r=gt({},i,{value:void 0}),at("invalid",t);break;case"textarea":ph(t,i),r=_c(t,i),at("invalid",t);break;default:r=i}xc(n,r),a=r;for(s in a)if(a.hasOwnProperty(s)){var l=a[s];s==="style"?Xm(t,l):s==="dangerouslySetInnerHTML"?(l=l?l.__html:void 0,l!=null&&Gm(t,l)):s==="children"?typeof l=="string"?(n!=="textarea"||l!=="")&&fo(t,l):typeof l=="number"&&fo(t,""+l):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(co.hasOwnProperty(s)?l!=null&&s==="onScroll"&&at("scroll",t):l!=null&&Zf(t,s,l,o))}switch(n){case"input":qo(t),hh(t,i,!1);break;case"textarea":qo(t),mh(t);break;case"option":i.value!=null&&t.setAttribute("value",""+qi(i.value));break;case"select":t.multiple=!!i.multiple,s=i.value,s!=null?as(t,!!i.multiple,s,!1):i.defaultValue!=null&&as(t,!!i.multiple,i.defaultValue,!0);break;default:typeof r.onClick=="function"&&(t.onclick=hl)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Vt(e),null;case 6:if(t&&e.stateNode!=null)p_(t,e,t.memoizedProps,i);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ne(166));if(n=gr(Eo.current),gr(Qn.current),ia(e)){if(i=e.stateNode,n=e.memoizedProps,i[$n]=e,(s=i.nodeValue!==n)&&(t=mn,t!==null))switch(t.tag){case 3:na(i.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&na(i.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[$n]=e,e.stateNode=i}return Vt(e),null;case 13:if(lt(pt),i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(ht&&pn!==null&&e.mode&1&&!(e.flags&128))Dg(),_s(),e.flags|=98560,s=!1;else if(s=ia(e),i!==null&&i.dehydrated!==null){if(t===null){if(!s)throw Error(ne(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(ne(317));s[$n]=e}else _s(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Vt(e),s=!1}else zn!==null&&(ef(zn),zn=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(i=i!==null,i!==(t!==null&&t.memoizedState!==null)&&i&&(e.child.flags|=8192,e.mode&1&&(t===null||pt.current&1?Rt===0&&(Rt=3):Ud())),e.updateQueue!==null&&(e.flags|=4),Vt(e),null);case 4:return xs(),jc(t,e),t===null&&xo(e.stateNode.containerInfo),Vt(e),null;case 10:return gd(e.type._context),Vt(e),null;case 17:return an(e.type)&&pl(),Vt(e),null;case 19:if(lt(pt),s=e.memoizedState,s===null)return Vt(e),null;if(i=(e.flags&128)!==0,o=s.rendering,o===null)if(i)Bs(s,!1);else{if(Rt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Sl(t),o!==null){for(e.flags|=128,Bs(s,!1),i=o.updateQueue,i!==null&&(e.updateQueue=i,e.flags|=4),e.subtreeFlags=0,i=n,n=e.child;n!==null;)s=n,t=i,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return ot(pt,pt.current&1|2),e.child}t=t.sibling}s.tail!==null&&St()>Ss&&(e.flags|=128,i=!0,Bs(s,!1),e.lanes=4194304)}else{if(!i)if(t=Sl(o),t!==null){if(e.flags|=128,i=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),Bs(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!ht)return Vt(e),null}else 2*St()-s.renderingStartTime>Ss&&n!==1073741824&&(e.flags|=128,i=!0,Bs(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=St(),e.sibling=null,n=pt.current,ot(pt,i?n&1|2:n&1),e):(Vt(e),null);case 22:case 23:return Dd(),i=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==i&&(e.flags|=8192),i&&e.mode&1?hn&1073741824&&(Vt(e),e.subtreeFlags&6&&(e.flags|=8192)):Vt(e),null;case 24:return null;case 25:return null}throw Error(ne(156,e.tag))}function wx(t,e){switch(dd(e),e.tag){case 1:return an(e.type)&&pl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return xs(),lt(on),lt(Xt),Sd(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return yd(e),null;case 13:if(lt(pt),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ne(340));_s()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return lt(pt),null;case 4:return xs(),null;case 10:return gd(e.type._context),null;case 22:case 23:return Dd(),null;case 24:return null;default:return null}}var oa=!1,Wt=!1,Ax=typeof WeakSet=="function"?WeakSet:Set,ve=null;function is(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){xt(t,e,i)}else n.current=null}function Yc(t,e,n){try{n()}catch(i){xt(t,e,i)}}var rp=!1;function Rx(t,e){if(bc=cl,t=xg(),cd(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var r=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,a=-1,l=-1,u=0,f=0,d=t,h=null;t:for(;;){for(var p;d!==n||r!==0&&d.nodeType!==3||(a=o+r),d!==s||i!==0&&d.nodeType!==3||(l=o+i),d.nodeType===3&&(o+=d.nodeValue.length),(p=d.firstChild)!==null;)h=d,d=p;for(;;){if(d===t)break t;if(h===n&&++u===r&&(a=o),h===s&&++f===i&&(l=o),(p=d.nextSibling)!==null)break;d=h,h=d.parentNode}d=p}n=a===-1||l===-1?null:{start:a,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Lc={focusedElem:t,selectionRange:n},cl=!1,ve=e;ve!==null;)if(e=ve,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,ve=t;else for(;ve!==null;){e=ve;try{var g=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(g!==null){var x=g.memoizedProps,m=g.memoizedState,c=e.stateNode,_=c.getSnapshotBeforeUpdate(e.elementType===e.type?x:On(e.type,x),m);c.__reactInternalSnapshotBeforeUpdate=_}break;case 3:var v=e.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(ne(163))}}catch(y){xt(e,e.return,y)}if(t=e.sibling,t!==null){t.return=e.return,ve=t;break}ve=e.return}return g=rp,rp=!1,g}function so(t,e,n){var i=e.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var r=i=i.next;do{if((r.tag&t)===t){var s=r.destroy;r.destroy=void 0,s!==void 0&&Yc(e,n,s)}r=r.next}while(r!==i)}}function Wl(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var i=n.create;n.destroy=i()}n=n.next}while(n!==e)}}function qc(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function m_(t){var e=t.alternate;e!==null&&(t.alternate=null,m_(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[$n],delete e[So],delete e[Ic],delete e[ux],delete e[cx])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function g_(t){return t.tag===5||t.tag===3||t.tag===4}function sp(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||g_(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function $c(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=hl));else if(i!==4&&(t=t.child,t!==null))for($c(t,e,n),t=t.sibling;t!==null;)$c(t,e,n),t=t.sibling}function Kc(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(t=t.child,t!==null))for(Kc(t,e,n),t=t.sibling;t!==null;)Kc(t,e,n),t=t.sibling}var Ft=null,kn=!1;function Ei(t,e,n){for(n=n.child;n!==null;)__(t,e,n),n=n.sibling}function __(t,e,n){if(Zn&&typeof Zn.onCommitFiberUnmount=="function")try{Zn.onCommitFiberUnmount(Fl,n)}catch{}switch(n.tag){case 5:Wt||is(n,e);case 6:var i=Ft,r=kn;Ft=null,Ei(t,e,n),Ft=i,kn=r,Ft!==null&&(kn?(t=Ft,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):Ft.removeChild(n.stateNode));break;case 18:Ft!==null&&(kn?(t=Ft,n=n.stateNode,t.nodeType===8?vu(t.parentNode,n):t.nodeType===1&&vu(t,n),go(t)):vu(Ft,n.stateNode));break;case 4:i=Ft,r=kn,Ft=n.stateNode.containerInfo,kn=!0,Ei(t,e,n),Ft=i,kn=r;break;case 0:case 11:case 14:case 15:if(!Wt&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){r=i=i.next;do{var s=r,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&Yc(n,e,o),r=r.next}while(r!==i)}Ei(t,e,n);break;case 1:if(!Wt&&(is(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(a){xt(n,e,a)}Ei(t,e,n);break;case 21:Ei(t,e,n);break;case 22:n.mode&1?(Wt=(i=Wt)||n.memoizedState!==null,Ei(t,e,n),Wt=i):Ei(t,e,n);break;default:Ei(t,e,n)}}function op(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Ax),e.forEach(function(i){var r=Fx.bind(null,t,i);n.has(i)||(n.add(i),i.then(r,r))})}}function Un(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var r=n[i];try{var s=t,o=e,a=o;e:for(;a!==null;){switch(a.tag){case 5:Ft=a.stateNode,kn=!1;break e;case 3:Ft=a.stateNode.containerInfo,kn=!0;break e;case 4:Ft=a.stateNode.containerInfo,kn=!0;break e}a=a.return}if(Ft===null)throw Error(ne(160));__(s,o,r),Ft=null,kn=!1;var l=r.alternate;l!==null&&(l.return=null),r.return=null}catch(u){xt(r,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)v_(e,t),e=e.sibling}function v_(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Un(e,t),jn(t),i&4){try{so(3,t,t.return),Wl(3,t)}catch(x){xt(t,t.return,x)}try{so(5,t,t.return)}catch(x){xt(t,t.return,x)}}break;case 1:Un(e,t),jn(t),i&512&&n!==null&&is(n,n.return);break;case 5:if(Un(e,t),jn(t),i&512&&n!==null&&is(n,n.return),t.flags&32){var r=t.stateNode;try{fo(r,"")}catch(x){xt(t,t.return,x)}}if(i&4&&(r=t.stateNode,r!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,a=t.type,l=t.updateQueue;if(t.updateQueue=null,l!==null)try{a==="input"&&s.type==="radio"&&s.name!=null&&Bm(r,s),yc(a,o);var u=yc(a,s);for(o=0;o<l.length;o+=2){var f=l[o],d=l[o+1];f==="style"?Xm(r,d):f==="dangerouslySetInnerHTML"?Gm(r,d):f==="children"?fo(r,d):Zf(r,f,d,u)}switch(a){case"input":mc(r,s);break;case"textarea":Vm(r,s);break;case"select":var h=r._wrapperState.wasMultiple;r._wrapperState.wasMultiple=!!s.multiple;var p=s.value;p!=null?as(r,!!s.multiple,p,!1):h!==!!s.multiple&&(s.defaultValue!=null?as(r,!!s.multiple,s.defaultValue,!0):as(r,!!s.multiple,s.multiple?[]:"",!1))}r[So]=s}catch(x){xt(t,t.return,x)}}break;case 6:if(Un(e,t),jn(t),i&4){if(t.stateNode===null)throw Error(ne(162));r=t.stateNode,s=t.memoizedProps;try{r.nodeValue=s}catch(x){xt(t,t.return,x)}}break;case 3:if(Un(e,t),jn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{go(e.containerInfo)}catch(x){xt(t,t.return,x)}break;case 4:Un(e,t),jn(t);break;case 13:Un(e,t),jn(t),r=t.child,r.flags&8192&&(s=r.memoizedState!==null,r.stateNode.isHidden=s,!s||r.alternate!==null&&r.alternate.memoizedState!==null||(bd=St())),i&4&&op(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Wt=(u=Wt)||f,Un(e,t),Wt=u):Un(e,t),jn(t),i&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!f&&t.mode&1)for(ve=t,f=t.child;f!==null;){for(d=ve=f;ve!==null;){switch(h=ve,p=h.child,h.tag){case 0:case 11:case 14:case 15:so(4,h,h.return);break;case 1:is(h,h.return);var g=h.stateNode;if(typeof g.componentWillUnmount=="function"){i=h,n=h.return;try{e=i,g.props=e.memoizedProps,g.state=e.memoizedState,g.componentWillUnmount()}catch(x){xt(i,n,x)}}break;case 5:is(h,h.return);break;case 22:if(h.memoizedState!==null){lp(d);continue}}p!==null?(p.return=h,ve=p):lp(d)}f=f.sibling}e:for(f=null,d=t;;){if(d.tag===5){if(f===null){f=d;try{r=d.stateNode,u?(s=r.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(a=d.stateNode,l=d.memoizedProps.style,o=l!=null&&l.hasOwnProperty("display")?l.display:null,a.style.display=Wm("display",o))}catch(x){xt(t,t.return,x)}}}else if(d.tag===6){if(f===null)try{d.stateNode.nodeValue=u?"":d.memoizedProps}catch(x){xt(t,t.return,x)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;f===d&&(f=null),d=d.return}f===d&&(f=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:Un(e,t),jn(t),i&4&&op(t);break;case 21:break;default:Un(e,t),jn(t)}}function jn(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(g_(n)){var i=n;break e}n=n.return}throw Error(ne(160))}switch(i.tag){case 5:var r=i.stateNode;i.flags&32&&(fo(r,""),i.flags&=-33);var s=sp(t);Kc(t,s,r);break;case 3:case 4:var o=i.stateNode.containerInfo,a=sp(t);$c(t,a,o);break;default:throw Error(ne(161))}}catch(l){xt(t,t.return,l)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Cx(t,e,n){ve=t,x_(t)}function x_(t,e,n){for(var i=(t.mode&1)!==0;ve!==null;){var r=ve,s=r.child;if(r.tag===22&&i){var o=r.memoizedState!==null||oa;if(!o){var a=r.alternate,l=a!==null&&a.memoizedState!==null||Wt;a=oa;var u=Wt;if(oa=o,(Wt=l)&&!u)for(ve=r;ve!==null;)o=ve,l=o.child,o.tag===22&&o.memoizedState!==null?up(r):l!==null?(l.return=o,ve=l):up(r);for(;s!==null;)ve=s,x_(s),s=s.sibling;ve=r,oa=a,Wt=u}ap(t)}else r.subtreeFlags&8772&&s!==null?(s.return=r,ve=s):ap(t)}}function ap(t){for(;ve!==null;){var e=ve;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Wt||Wl(5,e);break;case 1:var i=e.stateNode;if(e.flags&4&&!Wt)if(n===null)i.componentDidMount();else{var r=e.elementType===e.type?n.memoizedProps:On(e.type,n.memoizedProps);i.componentDidUpdate(r,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&Xh(e,s,i);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Xh(e,o,n)}break;case 5:var a=e.stateNode;if(n===null&&e.flags&4){n=a;var l=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":l.autoFocus&&n.focus();break;case"img":l.src&&(n.src=l.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var d=f.dehydrated;d!==null&&go(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(ne(163))}Wt||e.flags&512&&qc(e)}catch(h){xt(e,e.return,h)}}if(e===t){ve=null;break}if(n=e.sibling,n!==null){n.return=e.return,ve=n;break}ve=e.return}}function lp(t){for(;ve!==null;){var e=ve;if(e===t){ve=null;break}var n=e.sibling;if(n!==null){n.return=e.return,ve=n;break}ve=e.return}}function up(t){for(;ve!==null;){var e=ve;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Wl(4,e)}catch(l){xt(e,n,l)}break;case 1:var i=e.stateNode;if(typeof i.componentDidMount=="function"){var r=e.return;try{i.componentDidMount()}catch(l){xt(e,r,l)}}var s=e.return;try{qc(e)}catch(l){xt(e,s,l)}break;case 5:var o=e.return;try{qc(e)}catch(l){xt(e,o,l)}}}catch(l){xt(e,e.return,l)}if(e===t){ve=null;break}var a=e.sibling;if(a!==null){a.return=e.return,ve=a;break}ve=e.return}}var Px=Math.ceil,Tl=Mi.ReactCurrentDispatcher,Cd=Mi.ReactCurrentOwner,Cn=Mi.ReactCurrentBatchConfig,Ye=0,Dt=null,Tt=null,Ot=0,hn=0,rs=Qi(0),Rt=0,Ro=null,Tr=0,Xl=0,Pd=0,oo=null,rn=null,bd=0,Ss=1/0,ui=null,wl=!1,Zc=null,Gi=null,aa=!1,Oi=null,Al=0,ao=0,Qc=null,qa=-1,$a=0;function Kt(){return Ye&6?St():qa!==-1?qa:qa=St()}function Wi(t){return t.mode&1?Ye&2&&Ot!==0?Ot&-Ot:dx.transition!==null?($a===0&&($a=ig()),$a):(t=it,t!==0||(t=window.event,t=t===void 0?16:cg(t.type)),t):1}function Gn(t,e,n,i){if(50<ao)throw ao=0,Qc=null,Error(ne(185));Io(t,n,i),(!(Ye&2)||t!==Dt)&&(t===Dt&&(!(Ye&2)&&(Xl|=n),Rt===4&&Ii(t,Ot)),ln(t,i),n===1&&Ye===0&&!(e.mode&1)&&(Ss=St()+500,Vl&&Ji()))}function ln(t,e){var n=t.callbackNode;d0(t,e);var i=ul(t,t===Dt?Ot:0);if(i===0)n!==null&&vh(n),t.callbackNode=null,t.callbackPriority=0;else if(e=i&-i,t.callbackPriority!==e){if(n!=null&&vh(n),e===1)t.tag===0?fx(cp.bind(null,t)):Pg(cp.bind(null,t)),ax(function(){!(Ye&6)&&Ji()}),n=null;else{switch(rg(i)){case 1:n=nd;break;case 4:n=tg;break;case 16:n=ll;break;case 536870912:n=ng;break;default:n=ll}n=R_(n,y_.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function y_(t,e){if(qa=-1,$a=0,Ye&6)throw Error(ne(327));var n=t.callbackNode;if(ds()&&t.callbackNode!==n)return null;var i=ul(t,t===Dt?Ot:0);if(i===0)return null;if(i&30||i&t.expiredLanes||e)e=Rl(t,i);else{e=i;var r=Ye;Ye|=2;var s=M_();(Dt!==t||Ot!==e)&&(ui=null,Ss=St()+500,xr(t,e));do try{Dx();break}catch(a){S_(t,a)}while(!0);md(),Tl.current=s,Ye=r,Tt!==null?e=0:(Dt=null,Ot=0,e=Rt)}if(e!==0){if(e===2&&(r=wc(t),r!==0&&(i=r,e=Jc(t,r))),e===1)throw n=Ro,xr(t,0),Ii(t,i),ln(t,St()),n;if(e===6)Ii(t,i);else{if(r=t.current.alternate,!(i&30)&&!bx(r)&&(e=Rl(t,i),e===2&&(s=wc(t),s!==0&&(i=s,e=Jc(t,s))),e===1))throw n=Ro,xr(t,0),Ii(t,i),ln(t,St()),n;switch(t.finishedWork=r,t.finishedLanes=i,e){case 0:case 1:throw Error(ne(345));case 2:ur(t,rn,ui);break;case 3:if(Ii(t,i),(i&130023424)===i&&(e=bd+500-St(),10<e)){if(ul(t,0)!==0)break;if(r=t.suspendedLanes,(r&i)!==i){Kt(),t.pingedLanes|=t.suspendedLanes&r;break}t.timeoutHandle=Uc(ur.bind(null,t,rn,ui),e);break}ur(t,rn,ui);break;case 4:if(Ii(t,i),(i&4194240)===i)break;for(e=t.eventTimes,r=-1;0<i;){var o=31-Hn(i);s=1<<o,o=e[o],o>r&&(r=o),i&=~s}if(i=r,i=St()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Px(i/1960))-i,10<i){t.timeoutHandle=Uc(ur.bind(null,t,rn,ui),i);break}ur(t,rn,ui);break;case 5:ur(t,rn,ui);break;default:throw Error(ne(329))}}}return ln(t,St()),t.callbackNode===n?y_.bind(null,t):null}function Jc(t,e){var n=oo;return t.current.memoizedState.isDehydrated&&(xr(t,e).flags|=256),t=Rl(t,e),t!==2&&(e=rn,rn=n,e!==null&&ef(e)),t}function ef(t){rn===null?rn=t:rn.push.apply(rn,t)}function bx(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var r=n[i],s=r.getSnapshot;r=r.value;try{if(!Xn(s(),r))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Ii(t,e){for(e&=~Pd,e&=~Xl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-Hn(e),i=1<<n;t[n]=-1,e&=~i}}function cp(t){if(Ye&6)throw Error(ne(327));ds();var e=ul(t,0);if(!(e&1))return ln(t,St()),null;var n=Rl(t,e);if(t.tag!==0&&n===2){var i=wc(t);i!==0&&(e=i,n=Jc(t,i))}if(n===1)throw n=Ro,xr(t,0),Ii(t,e),ln(t,St()),n;if(n===6)throw Error(ne(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,ur(t,rn,ui),ln(t,St()),null}function Ld(t,e){var n=Ye;Ye|=1;try{return t(e)}finally{Ye=n,Ye===0&&(Ss=St()+500,Vl&&Ji())}}function wr(t){Oi!==null&&Oi.tag===0&&!(Ye&6)&&ds();var e=Ye;Ye|=1;var n=Cn.transition,i=it;try{if(Cn.transition=null,it=1,t)return t()}finally{it=i,Cn.transition=n,Ye=e,!(Ye&6)&&Ji()}}function Dd(){hn=rs.current,lt(rs)}function xr(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,ox(n)),Tt!==null)for(n=Tt.return;n!==null;){var i=n;switch(dd(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&pl();break;case 3:xs(),lt(on),lt(Xt),Sd();break;case 5:yd(i);break;case 4:xs();break;case 13:lt(pt);break;case 19:lt(pt);break;case 10:gd(i.type._context);break;case 22:case 23:Dd()}n=n.return}if(Dt=t,Tt=t=Xi(t.current,null),Ot=hn=e,Rt=0,Ro=null,Pd=Xl=Tr=0,rn=oo=null,mr!==null){for(e=0;e<mr.length;e++)if(n=mr[e],i=n.interleaved,i!==null){n.interleaved=null;var r=i.next,s=n.pending;if(s!==null){var o=s.next;s.next=r,i.next=o}n.pending=i}mr=null}return t}function S_(t,e){do{var n=Tt;try{if(md(),Xa.current=El,Ml){for(var i=mt.memoizedState;i!==null;){var r=i.queue;r!==null&&(r.pending=null),i=i.next}Ml=!1}if(Er=0,Lt=At=mt=null,ro=!1,To=0,Cd.current=null,n===null||n.return===null){Rt=1,Ro=e,Tt=null;break}e:{var s=t,o=n.return,a=n,l=e;if(e=Ot,a.flags|=32768,l!==null&&typeof l=="object"&&typeof l.then=="function"){var u=l,f=a,d=f.tag;if(!(f.mode&1)&&(d===0||d===11||d===15)){var h=f.alternate;h?(f.updateQueue=h.updateQueue,f.memoizedState=h.memoizedState,f.lanes=h.lanes):(f.updateQueue=null,f.memoizedState=null)}var p=Zh(o);if(p!==null){p.flags&=-257,Qh(p,o,a,s,e),p.mode&1&&Kh(s,u,e),e=p,l=u;var g=e.updateQueue;if(g===null){var x=new Set;x.add(l),e.updateQueue=x}else g.add(l);break e}else{if(!(e&1)){Kh(s,u,e),Ud();break e}l=Error(ne(426))}}else if(ht&&a.mode&1){var m=Zh(o);if(m!==null){!(m.flags&65536)&&(m.flags|=256),Qh(m,o,a,s,e),hd(ys(l,a));break e}}s=l=ys(l,a),Rt!==4&&(Rt=2),oo===null?oo=[s]:oo.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var c=r_(s,l,e);Wh(s,c);break e;case 1:a=l;var _=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof _.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(Gi===null||!Gi.has(v)))){s.flags|=65536,e&=-e,s.lanes|=e;var y=s_(s,a,e);Wh(s,y);break e}}s=s.return}while(s!==null)}T_(n)}catch(C){e=C,Tt===n&&n!==null&&(Tt=n=n.return);continue}break}while(!0)}function M_(){var t=Tl.current;return Tl.current=El,t===null?El:t}function Ud(){(Rt===0||Rt===3||Rt===2)&&(Rt=4),Dt===null||!(Tr&268435455)&&!(Xl&268435455)||Ii(Dt,Ot)}function Rl(t,e){var n=Ye;Ye|=2;var i=M_();(Dt!==t||Ot!==e)&&(ui=null,xr(t,e));do try{Lx();break}catch(r){S_(t,r)}while(!0);if(md(),Ye=n,Tl.current=i,Tt!==null)throw Error(ne(261));return Dt=null,Ot=0,Rt}function Lx(){for(;Tt!==null;)E_(Tt)}function Dx(){for(;Tt!==null&&!i0();)E_(Tt)}function E_(t){var e=A_(t.alternate,t,hn);t.memoizedProps=t.pendingProps,e===null?T_(t):Tt=e,Cd.current=null}function T_(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=wx(n,e),n!==null){n.flags&=32767,Tt=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Rt=6,Tt=null;return}}else if(n=Tx(n,e,hn),n!==null){Tt=n;return}if(e=e.sibling,e!==null){Tt=e;return}Tt=e=t}while(e!==null);Rt===0&&(Rt=5)}function ur(t,e,n){var i=it,r=Cn.transition;try{Cn.transition=null,it=1,Ux(t,e,n,i)}finally{Cn.transition=r,it=i}return null}function Ux(t,e,n,i){do ds();while(Oi!==null);if(Ye&6)throw Error(ne(327));n=t.finishedWork;var r=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(ne(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(h0(t,s),t===Dt&&(Tt=Dt=null,Ot=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||aa||(aa=!0,R_(ll,function(){return ds(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Cn.transition,Cn.transition=null;var o=it;it=1;var a=Ye;Ye|=4,Cd.current=null,Rx(t,n),v_(n,t),J0(Lc),cl=!!bc,Lc=bc=null,t.current=n,Cx(n),r0(),Ye=a,it=o,Cn.transition=s}else t.current=n;if(aa&&(aa=!1,Oi=t,Al=r),s=t.pendingLanes,s===0&&(Gi=null),a0(n.stateNode),ln(t,St()),e!==null)for(i=t.onRecoverableError,n=0;n<e.length;n++)r=e[n],i(r.value,{componentStack:r.stack,digest:r.digest});if(wl)throw wl=!1,t=Zc,Zc=null,t;return Al&1&&t.tag!==0&&ds(),s=t.pendingLanes,s&1?t===Qc?ao++:(ao=0,Qc=t):ao=0,Ji(),null}function ds(){if(Oi!==null){var t=rg(Al),e=Cn.transition,n=it;try{if(Cn.transition=null,it=16>t?16:t,Oi===null)var i=!1;else{if(t=Oi,Oi=null,Al=0,Ye&6)throw Error(ne(331));var r=Ye;for(Ye|=4,ve=t.current;ve!==null;){var s=ve,o=s.child;if(ve.flags&16){var a=s.deletions;if(a!==null){for(var l=0;l<a.length;l++){var u=a[l];for(ve=u;ve!==null;){var f=ve;switch(f.tag){case 0:case 11:case 15:so(8,f,s)}var d=f.child;if(d!==null)d.return=f,ve=d;else for(;ve!==null;){f=ve;var h=f.sibling,p=f.return;if(m_(f),f===u){ve=null;break}if(h!==null){h.return=p,ve=h;break}ve=p}}}var g=s.alternate;if(g!==null){var x=g.child;if(x!==null){g.child=null;do{var m=x.sibling;x.sibling=null,x=m}while(x!==null)}}ve=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,ve=o;else e:for(;ve!==null;){if(s=ve,s.flags&2048)switch(s.tag){case 0:case 11:case 15:so(9,s,s.return)}var c=s.sibling;if(c!==null){c.return=s.return,ve=c;break e}ve=s.return}}var _=t.current;for(ve=_;ve!==null;){o=ve;var v=o.child;if(o.subtreeFlags&2064&&v!==null)v.return=o,ve=v;else e:for(o=_;ve!==null;){if(a=ve,a.flags&2048)try{switch(a.tag){case 0:case 11:case 15:Wl(9,a)}}catch(C){xt(a,a.return,C)}if(a===o){ve=null;break e}var y=a.sibling;if(y!==null){y.return=a.return,ve=y;break e}ve=a.return}}if(Ye=r,Ji(),Zn&&typeof Zn.onPostCommitFiberRoot=="function")try{Zn.onPostCommitFiberRoot(Fl,t)}catch{}i=!0}return i}finally{it=n,Cn.transition=e}}return!1}function fp(t,e,n){e=ys(n,e),e=r_(t,e,1),t=Hi(t,e,1),e=Kt(),t!==null&&(Io(t,1,e),ln(t,e))}function xt(t,e,n){if(t.tag===3)fp(t,t,n);else for(;e!==null;){if(e.tag===3){fp(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(Gi===null||!Gi.has(i))){t=ys(n,t),t=s_(e,t,1),e=Hi(e,t,1),t=Kt(),e!==null&&(Io(e,1,t),ln(e,t));break}}e=e.return}}function Ix(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),e=Kt(),t.pingedLanes|=t.suspendedLanes&n,Dt===t&&(Ot&n)===n&&(Rt===4||Rt===3&&(Ot&130023424)===Ot&&500>St()-bd?xr(t,0):Pd|=n),ln(t,e)}function w_(t,e){e===0&&(t.mode&1?(e=Zo,Zo<<=1,!(Zo&130023424)&&(Zo=4194304)):e=1);var n=Kt();t=xi(t,e),t!==null&&(Io(t,e,n),ln(t,n))}function Nx(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),w_(t,n)}function Fx(t,e){var n=0;switch(t.tag){case 13:var i=t.stateNode,r=t.memoizedState;r!==null&&(n=r.retryLane);break;case 19:i=t.stateNode;break;default:throw Error(ne(314))}i!==null&&i.delete(e),w_(t,n)}var A_;A_=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||on.current)sn=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return sn=!1,Ex(t,e,n);sn=!!(t.flags&131072)}else sn=!1,ht&&e.flags&1048576&&bg(e,_l,e.index);switch(e.lanes=0,e.tag){case 2:var i=e.type;Ya(t,e),t=e.pendingProps;var r=gs(e,Xt.current);fs(e,n),r=Ed(null,e,i,t,r,n);var s=Td();return e.flags|=1,typeof r=="object"&&r!==null&&typeof r.render=="function"&&r.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,an(i)?(s=!0,ml(e)):s=!1,e.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,vd(e),r.updater=Gl,e.stateNode=r,r._reactInternals=e,Bc(e,i,t,n),e=Gc(null,e,i,!0,s,n)):(e.tag=0,ht&&s&&fd(e),qt(null,e,r,n),e=e.child),e;case 16:i=e.elementType;e:{switch(Ya(t,e),t=e.pendingProps,r=i._init,i=r(i._payload),e.type=i,r=e.tag=kx(i),t=On(i,t),r){case 0:e=Hc(null,e,i,t,n);break e;case 1:e=tp(null,e,i,t,n);break e;case 11:e=Jh(null,e,i,t,n);break e;case 14:e=ep(null,e,i,On(i.type,t),n);break e}throw Error(ne(306,i,""))}return e;case 0:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),Hc(t,e,i,r,n);case 1:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),tp(t,e,i,r,n);case 3:e:{if(u_(e),t===null)throw Error(ne(387));i=e.pendingProps,s=e.memoizedState,r=s.element,Fg(t,e),yl(e,i,null,n);var o=e.memoizedState;if(i=o.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){r=ys(Error(ne(423)),e),e=np(t,e,i,n,r);break e}else if(i!==r){r=ys(Error(ne(424)),e),e=np(t,e,i,n,r);break e}else for(pn=Vi(e.stateNode.containerInfo.firstChild),mn=e,ht=!0,zn=null,n=Ig(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(_s(),i===r){e=yi(t,e,n);break e}qt(t,e,i,n)}e=e.child}return e;case 5:return Og(e),t===null&&Oc(e),i=e.type,r=e.pendingProps,s=t!==null?t.memoizedProps:null,o=r.children,Dc(i,r)?o=null:s!==null&&Dc(i,s)&&(e.flags|=32),l_(t,e),qt(t,e,o,n),e.child;case 6:return t===null&&Oc(e),null;case 13:return c_(t,e,n);case 4:return xd(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=vs(e,null,i,n):qt(t,e,i,n),e.child;case 11:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),Jh(t,e,i,r,n);case 7:return qt(t,e,e.pendingProps,n),e.child;case 8:return qt(t,e,e.pendingProps.children,n),e.child;case 12:return qt(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(i=e.type._context,r=e.pendingProps,s=e.memoizedProps,o=r.value,ot(vl,i._currentValue),i._currentValue=o,s!==null)if(Xn(s.value,o)){if(s.children===r.children&&!on.current){e=yi(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var a=s.dependencies;if(a!==null){o=s.child;for(var l=a.firstContext;l!==null;){if(l.context===i){if(s.tag===1){l=mi(-1,n&-n),l.tag=2;var u=s.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?l.next=l:(l.next=f.next,f.next=l),u.pending=l}}s.lanes|=n,l=s.alternate,l!==null&&(l.lanes|=n),kc(s.return,n,e),a.lanes|=n;break}l=l.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(ne(341));o.lanes|=n,a=o.alternate,a!==null&&(a.lanes|=n),kc(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}qt(t,e,r.children,n),e=e.child}return e;case 9:return r=e.type,i=e.pendingProps.children,fs(e,n),r=Pn(r),i=i(r),e.flags|=1,qt(t,e,i,n),e.child;case 14:return i=e.type,r=On(i,e.pendingProps),r=On(i.type,r),ep(t,e,i,r,n);case 15:return o_(t,e,e.type,e.pendingProps,n);case 17:return i=e.type,r=e.pendingProps,r=e.elementType===i?r:On(i,r),Ya(t,e),e.tag=1,an(i)?(t=!0,ml(e)):t=!1,fs(e,n),i_(e,i,r),Bc(e,i,r,n),Gc(null,e,i,!0,t,n);case 19:return f_(t,e,n);case 22:return a_(t,e,n)}throw Error(ne(156,e.tag))};function R_(t,e){return eg(t,e)}function Ox(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Rn(t,e,n,i){return new Ox(t,e,n,i)}function Id(t){return t=t.prototype,!(!t||!t.isReactComponent)}function kx(t){if(typeof t=="function")return Id(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Jf)return 11;if(t===ed)return 14}return 2}function Xi(t,e){var n=t.alternate;return n===null?(n=Rn(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Ka(t,e,n,i,r,s){var o=2;if(i=t,typeof t=="function")Id(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case qr:return yr(n.children,r,s,e);case Qf:o=8,r|=8;break;case cc:return t=Rn(12,n,e,r|2),t.elementType=cc,t.lanes=s,t;case fc:return t=Rn(13,n,e,r),t.elementType=fc,t.lanes=s,t;case dc:return t=Rn(19,n,e,r),t.elementType=dc,t.lanes=s,t;case Om:return jl(n,r,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Nm:o=10;break e;case Fm:o=9;break e;case Jf:o=11;break e;case ed:o=14;break e;case Li:o=16,i=null;break e}throw Error(ne(130,t==null?t:typeof t,""))}return e=Rn(o,n,e,r),e.elementType=t,e.type=i,e.lanes=s,e}function yr(t,e,n,i){return t=Rn(7,t,i,e),t.lanes=n,t}function jl(t,e,n,i){return t=Rn(22,t,i,e),t.elementType=Om,t.lanes=n,t.stateNode={isHidden:!1},t}function Au(t,e,n){return t=Rn(6,t,null,e),t.lanes=n,t}function Ru(t,e,n){return e=Rn(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function zx(t,e,n,i,r){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=au(0),this.expirationTimes=au(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=au(0),this.identifierPrefix=i,this.onRecoverableError=r,this.mutableSourceEagerHydrationData=null}function Nd(t,e,n,i,r,s,o,a,l){return t=new zx(t,e,n,a,l),e===1?(e=1,s===!0&&(e|=8)):e=0,s=Rn(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},vd(s),t}function Bx(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Yr,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}function C_(t){if(!t)return $i;t=t._reactInternals;e:{if(Pr(t)!==t||t.tag!==1)throw Error(ne(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(an(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(ne(171))}if(t.tag===1){var n=t.type;if(an(n))return Cg(t,n,e)}return e}function P_(t,e,n,i,r,s,o,a,l){return t=Nd(n,i,!0,t,r,s,o,a,l),t.context=C_(null),n=t.current,i=Kt(),r=Wi(n),s=mi(i,r),s.callback=e??null,Hi(n,s,r),t.current.lanes=r,Io(t,r,i),ln(t,i),t}function Yl(t,e,n,i){var r=e.current,s=Kt(),o=Wi(r);return n=C_(n),e.context===null?e.context=n:e.pendingContext=n,e=mi(s,o),e.payload={element:t},i=i===void 0?null:i,i!==null&&(e.callback=i),t=Hi(r,e,o),t!==null&&(Gn(t,r,o,s),Wa(t,r,o)),o}function Cl(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function dp(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Fd(t,e){dp(t,e),(t=t.alternate)&&dp(t,e)}function Vx(){return null}var b_=typeof reportError=="function"?reportError:function(t){console.error(t)};function Od(t){this._internalRoot=t}ql.prototype.render=Od.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ne(409));Yl(t,e,null,null)};ql.prototype.unmount=Od.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;wr(function(){Yl(null,t,null,null)}),e[vi]=null}};function ql(t){this._internalRoot=t}ql.prototype.unstable_scheduleHydration=function(t){if(t){var e=ag();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ui.length&&e!==0&&e<Ui[n].priority;n++);Ui.splice(n,0,t),n===0&&ug(t)}};function kd(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function $l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function hp(){}function Hx(t,e,n,i,r){if(r){if(typeof i=="function"){var s=i;i=function(){var u=Cl(o);s.call(u)}}var o=P_(e,i,t,0,null,!1,!1,"",hp);return t._reactRootContainer=o,t[vi]=o.current,xo(t.nodeType===8?t.parentNode:t),wr(),o}for(;r=t.lastChild;)t.removeChild(r);if(typeof i=="function"){var a=i;i=function(){var u=Cl(l);a.call(u)}}var l=Nd(t,0,!1,null,null,!1,!1,"",hp);return t._reactRootContainer=l,t[vi]=l.current,xo(t.nodeType===8?t.parentNode:t),wr(function(){Yl(e,l,n,i)}),l}function Kl(t,e,n,i,r){var s=n._reactRootContainer;if(s){var o=s;if(typeof r=="function"){var a=r;r=function(){var l=Cl(o);a.call(l)}}Yl(e,o,t,r)}else o=Hx(n,e,t,r,i);return Cl(o)}sg=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=Ks(e.pendingLanes);n!==0&&(id(e,n|1),ln(e,St()),!(Ye&6)&&(Ss=St()+500,Ji()))}break;case 13:wr(function(){var i=xi(t,1);if(i!==null){var r=Kt();Gn(i,t,1,r)}}),Fd(t,1)}};rd=function(t){if(t.tag===13){var e=xi(t,134217728);if(e!==null){var n=Kt();Gn(e,t,134217728,n)}Fd(t,134217728)}};og=function(t){if(t.tag===13){var e=Wi(t),n=xi(t,e);if(n!==null){var i=Kt();Gn(n,t,e,i)}Fd(t,e)}};ag=function(){return it};lg=function(t,e){var n=it;try{return it=t,e()}finally{it=n}};Mc=function(t,e,n){switch(e){case"input":if(mc(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var r=Bl(i);if(!r)throw Error(ne(90));zm(i),mc(i,r)}}}break;case"textarea":Vm(t,n);break;case"select":e=n.value,e!=null&&as(t,!!n.multiple,e,!1)}};qm=Ld;$m=wr;var Gx={usingClientEntryPoint:!1,Events:[Fo,Qr,Bl,jm,Ym,Ld]},Vs={findFiberByHostInstance:pr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Wx={bundleType:Vs.bundleType,version:Vs.version,rendererPackageName:Vs.rendererPackageName,rendererConfig:Vs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Mi.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Qm(t),t===null?null:t.stateNode},findFiberByHostInstance:Vs.findFiberByHostInstance||Vx,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var la=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!la.isDisabled&&la.supportsFiber)try{Fl=la.inject(Wx),Zn=la}catch{}}_n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Gx;_n.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!kd(e))throw Error(ne(200));return Bx(t,e,null,n)};_n.createRoot=function(t,e){if(!kd(t))throw Error(ne(299));var n=!1,i="",r=b_;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=Nd(t,1,!1,null,null,n,!1,i,r),t[vi]=e.current,xo(t.nodeType===8?t.parentNode:t),new Od(e)};_n.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ne(188)):(t=Object.keys(t).join(","),Error(ne(268,t)));return t=Qm(e),t=t===null?null:t.stateNode,t};_n.flushSync=function(t){return wr(t)};_n.hydrate=function(t,e,n){if(!$l(e))throw Error(ne(200));return Kl(null,t,e,!0,n)};_n.hydrateRoot=function(t,e,n){if(!kd(t))throw Error(ne(405));var i=n!=null&&n.hydratedSources||null,r=!1,s="",o=b_;if(n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=P_(e,null,t,1,n??null,r,!1,s,o),t[vi]=e.current,xo(t),i)for(t=0;t<i.length;t++)n=i[t],r=n._getVersion,r=r(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,r]:e.mutableSourceEagerHydrationData.push(n,r);return new ql(e)};_n.render=function(t,e,n){if(!$l(e))throw Error(ne(200));return Kl(null,t,e,!1,n)};_n.unmountComponentAtNode=function(t){if(!$l(t))throw Error(ne(40));return t._reactRootContainer?(wr(function(){Kl(null,null,t,!1,function(){t._reactRootContainer=null,t[vi]=null})}),!0):!1};_n.unstable_batchedUpdates=Ld;_n.unstable_renderSubtreeIntoContainer=function(t,e,n,i){if(!$l(n))throw Error(ne(200));if(t==null||t._reactInternals===void 0)throw Error(ne(38));return Kl(t,e,n,!1,i)};_n.version="18.3.1-next-f1338f8080-20240426";function L_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(L_)}catch(t){console.error(t)}}L_(),Lm.exports=_n;var Xx=Lm.exports,D_,pp=Xx;D_=pp.createRoot,pp.hydrateRoot;class jx extends dt.Component{constructor(n){super(n);sh(this,"handleRetry",()=>{this.setState({hasError:!1,error:null})});this.state={hasError:!1,error:null}}static getDerivedStateFromError(n){return{hasError:!0,error:n}}componentDidCatch(n,i){console.error("[ErrorBoundary] Caught error:",n,i.componentStack)}render(){var n;return this.state.hasError?this.props.fallback?this.props.fallback:ae.jsxs("div",{style:{position:"fixed",inset:0,background:"#0a0f1c",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Inter', 'Segoe UI', system-ui, sans-serif",color:"#4fc3f7",gap:"16px",padding:"24px"},children:[ae.jsx("div",{style:{fontSize:"48px",marginBottom:"8px",color:"#f44336"},children:"⚠"}),ae.jsx("h1",{style:{fontSize:"22px",fontWeight:700,color:"#e0e6ed",margin:0,letterSpacing:"1px"},children:"Rendering Error"}),ae.jsx("p",{style:{fontSize:"13px",color:"#667788",maxWidth:"480px",textAlign:"center",margin:0},children:((n=this.state.error)==null?void 0:n.message)||"An unexpected error occurred while rendering the map."}),ae.jsx("button",{onClick:this.handleRetry,style:{marginTop:"8px",padding:"10px 28px",borderRadius:"8px",border:"1px solid #4fc3f7",background:"rgba(79,195,247,0.12)",color:"#4fc3f7",fontSize:"13px",fontWeight:600,letterSpacing:"1px",cursor:"pointer",transition:"background 0.2s"},onMouseEnter:i=>i.currentTarget.style.background="rgba(79,195,247,0.25)",onMouseLeave:i=>i.currentTarget.style.background="rgba(79,195,247,0.12)",children:"RETRY"})]}):this.props.children}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const zd="176",Yx=0,mp=1,qx=2,U_=1,$x=2,li=3,Ki=0,Zt=1,An=2,ji=0,hs=1,tf=2,gp=3,_p=4,Kx=5,dr=100,Zx=101,Qx=102,Jx=103,ey=104,ty=200,ny=201,iy=202,ry=203,nf=204,rf=205,sy=206,oy=207,ay=208,ly=209,uy=210,cy=211,fy=212,dy=213,hy=214,sf=0,of=1,af=2,Ms=3,lf=4,uf=5,cf=6,ff=7,I_=0,py=1,my=2,Yi=0,gy=1,_y=2,vy=3,xy=4,yy=5,Sy=6,My=7,N_=300,Es=301,Ts=302,df=303,hf=304,Zl=306,pf=1e3,_r=1001,mf=1002,Wn=1003,Ey=1004,ua=1005,Kn=1006,Cu=1007,vr=1008,ei=1009,F_=1010,O_=1011,Co=1012,Bd=1013,Ar=1014,hi=1015,ko=1016,Vd=1017,Hd=1018,Po=1020,k_=35902,z_=1021,B_=1022,Vn=1023,bo=1026,Lo=1027,V_=1028,Gd=1029,H_=1030,Wd=1031,Xd=1033,Za=33776,Qa=33777,Ja=33778,el=33779,gf=35840,_f=35841,vf=35842,xf=35843,yf=36196,Sf=37492,Mf=37496,Ef=37808,Tf=37809,wf=37810,Af=37811,Rf=37812,Cf=37813,Pf=37814,bf=37815,Lf=37816,Df=37817,Uf=37818,If=37819,Nf=37820,Ff=37821,tl=36492,Of=36494,kf=36495,G_=36283,zf=36284,Bf=36285,Vf=36286,Ty=3200,wy=3201,Ay=0,Ry=1,Ni="",Mn="srgb",ws="srgb-linear",Pl="linear",rt="srgb",Dr=7680,vp=519,Cy=512,Py=513,by=514,W_=515,Ly=516,Dy=517,Uy=518,Iy=519,xp=35044,yp="300 es",pi=2e3,bl=2001;class bs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Ht=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pu=Math.PI/180,Hf=180/Math.PI;function zo(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ht[t&255]+Ht[t>>8&255]+Ht[t>>16&255]+Ht[t>>24&255]+"-"+Ht[e&255]+Ht[e>>8&255]+"-"+Ht[e>>16&15|64]+Ht[e>>24&255]+"-"+Ht[n&63|128]+Ht[n>>8&255]+"-"+Ht[n>>16&255]+Ht[n>>24&255]+Ht[i&255]+Ht[i>>8&255]+Ht[i>>16&255]+Ht[i>>24&255]).toLowerCase()}function We(t,e,n){return Math.max(e,Math.min(n,t))}function Ny(t,e){return(t%e+e)%e}function bu(t,e,n){return(1-n)*t+n*e}function Hs(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function nn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class Ke{constructor(e=0,n=0){Ke.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=We(this.x,e.x,n.x),this.y=We(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=We(this.x,e,n),this.y=We(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ze{constructor(e,n,i,r,s,o,a,l,u){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u)}set(e,n,i,r,s,o,a,l,u){const f=this.elements;return f[0]=e,f[1]=r,f[2]=a,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=o,f[8]=u,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[3],l=i[6],u=i[1],f=i[4],d=i[7],h=i[2],p=i[5],g=i[8],x=r[0],m=r[3],c=r[6],_=r[1],v=r[4],y=r[7],C=r[2],R=r[5],A=r[8];return s[0]=o*x+a*_+l*C,s[3]=o*m+a*v+l*R,s[6]=o*c+a*y+l*A,s[1]=u*x+f*_+d*C,s[4]=u*m+f*v+d*R,s[7]=u*c+f*y+d*A,s[2]=h*x+p*_+g*C,s[5]=h*m+p*v+g*R,s[8]=h*c+p*y+g*A,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8];return n*o*f-n*a*u-i*s*f+i*a*l+r*s*u-r*o*l}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8],d=f*o-a*u,h=a*l-f*s,p=u*s-o*l,g=n*d+i*h+r*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return e[0]=d*x,e[1]=(r*u-f*i)*x,e[2]=(a*i-r*o)*x,e[3]=h*x,e[4]=(f*n-r*l)*x,e[5]=(r*s-a*n)*x,e[6]=p*x,e[7]=(i*l-u*n)*x,e[8]=(o*n-i*s)*x,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,o,a){const l=Math.cos(s),u=Math.sin(s);return this.set(i*l,i*u,-i*(l*o+u*a)+o+e,-r*u,r*l,-r*(-u*o+l*a)+a+n,0,0,1),this}scale(e,n){return this.premultiply(Lu.makeScale(e,n)),this}rotate(e){return this.premultiply(Lu.makeRotation(-e)),this}translate(e,n){return this.premultiply(Lu.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Lu=new ze;function X_(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Do(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Fy(){const t=Do("canvas");return t.style.display="block",t}const Sp={};function nl(t){t in Sp||(Sp[t]=!0,console.warn(t))}function Oy(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}function ky(t){const e=t.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function zy(t){const e=t.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const Mp=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ep=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function By(){const t={enabled:!0,workingColorSpace:ws,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===rt&&(r.r=gi(r.r),r.g=gi(r.g),r.b=gi(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===rt&&(r.r=ps(r.r),r.g=ps(r.g),r.b=ps(r.b))),r},fromWorkingColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},toWorkingColorSpace:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ni?Pl:this.spaces[r].transfer},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[ws]:{primaries:e,whitePoint:i,transfer:Pl,toXYZ:Mp,fromXYZ:Ep,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Mn},outputColorSpaceConfig:{drawingBufferColorSpace:Mn}},[Mn]:{primaries:e,whitePoint:i,transfer:rt,toXYZ:Mp,fromXYZ:Ep,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Mn}}}),t}const $e=By();function gi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function ps(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Ur;class Vy{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ur===void 0&&(Ur=Do("canvas")),Ur.width=e.width,Ur.height=e.height;const r=Ur.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Ur}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Do("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=gi(s[o]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(gi(n[i]/255)*255):n[i]=gi(n[i]);return{data:n,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hy=0;class jd{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hy++}),this.uuid=zo(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Du(r[o].image)):s.push(Du(r[o]))}else s=Du(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Du(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?Vy.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Gy=0;class Qt extends bs{constructor(e=Qt.DEFAULT_IMAGE,n=Qt.DEFAULT_MAPPING,i=_r,r=_r,s=Kn,o=vr,a=Vn,l=ei,u=Qt.DEFAULT_ANISOTROPY,f=Ni){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gy++}),this.uuid=zo(),this.name="",this.source=new jd(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=u,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Ke(0,0),this.repeat=new Ke(1,1),this.center=new Ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isTextureArray=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isTextureArray=e.isTextureArray,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==N_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case pf:e.x=e.x-Math.floor(e.x);break;case _r:e.x=e.x<0?0:1;break;case mf:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case pf:e.y=e.y-Math.floor(e.y);break;case _r:e.y=e.y<0?0:1;break;case mf:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=N_;Qt.DEFAULT_ANISOTROPY=1;class yt{constructor(e=0,n=0,i=0,r=1){yt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*n+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*n+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*n+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*n+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const l=e.elements,u=l[0],f=l[4],d=l[8],h=l[1],p=l[5],g=l[9],x=l[2],m=l[6],c=l[10];if(Math.abs(f-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(f+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(u+p+c-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const v=(u+1)/2,y=(p+1)/2,C=(c+1)/2,R=(f+h)/4,A=(d+x)/4,P=(g+m)/4;return v>y&&v>C?v<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(v),r=R/i,s=A/i):y>C?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=R/r,s=P/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=A/s,r=P/s),this.set(i,r,s,n),this}let _=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(h-f)*(h-f));return Math.abs(_)<.001&&(_=1),this.x=(m-g)/_,this.y=(d-x)/_,this.z=(h-f)/_,this.w=Math.acos((u+p+c-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=We(this.x,e.x,n.x),this.y=We(this.y,e.y,n.y),this.z=We(this.z,e.z,n.z),this.w=We(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=We(this.x,e,n),this.y=We(this.y,e,n),this.z=We(this.z,e,n),this.w=We(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Wy extends bs{constructor(e=1,n=1,i={}){super(),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth?i.depth:1,this.scissor=new yt(0,0,e,n),this.scissorTest=!1,this.viewport=new yt(0,0,e,n);const r={width:e,height:n,depth:this.depth};i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,multiview:!1},i);const s=new Qt(r,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace);s.flipY=!1,s.generateMipmaps=i.generateMipmaps,s.internalFormat=i.internalFormat,this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i;this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new jd(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Rr extends Wy{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class j_ extends Qt{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Wn,this.minFilter=Wn,this.wrapR=_r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Xy extends Qt{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Wn,this.minFilter=Wn,this.wrapR=_r,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bo{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,o,a){let l=i[r+0],u=i[r+1],f=i[r+2],d=i[r+3];const h=s[o+0],p=s[o+1],g=s[o+2],x=s[o+3];if(a===0){e[n+0]=l,e[n+1]=u,e[n+2]=f,e[n+3]=d;return}if(a===1){e[n+0]=h,e[n+1]=p,e[n+2]=g,e[n+3]=x;return}if(d!==x||l!==h||u!==p||f!==g){let m=1-a;const c=l*h+u*p+f*g+d*x,_=c>=0?1:-1,v=1-c*c;if(v>Number.EPSILON){const C=Math.sqrt(v),R=Math.atan2(C,c*_);m=Math.sin(m*R)/C,a=Math.sin(a*R)/C}const y=a*_;if(l=l*m+h*y,u=u*m+p*y,f=f*m+g*y,d=d*m+x*y,m===1-a){const C=1/Math.sqrt(l*l+u*u+f*f+d*d);l*=C,u*=C,f*=C,d*=C}}e[n]=l,e[n+1]=u,e[n+2]=f,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,o){const a=i[r],l=i[r+1],u=i[r+2],f=i[r+3],d=s[o],h=s[o+1],p=s[o+2],g=s[o+3];return e[n]=a*g+f*d+l*p-u*h,e[n+1]=l*g+f*h+u*d-a*p,e[n+2]=u*g+f*p+a*h-l*d,e[n+3]=f*g-a*d-l*h-u*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,u=a(i/2),f=a(r/2),d=a(s/2),h=l(i/2),p=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=h*f*d+u*p*g,this._y=u*p*d-h*f*g,this._z=u*f*g+h*p*d,this._w=u*f*d-h*p*g;break;case"YXZ":this._x=h*f*d+u*p*g,this._y=u*p*d-h*f*g,this._z=u*f*g-h*p*d,this._w=u*f*d+h*p*g;break;case"ZXY":this._x=h*f*d-u*p*g,this._y=u*p*d+h*f*g,this._z=u*f*g+h*p*d,this._w=u*f*d-h*p*g;break;case"ZYX":this._x=h*f*d-u*p*g,this._y=u*p*d+h*f*g,this._z=u*f*g-h*p*d,this._w=u*f*d+h*p*g;break;case"YZX":this._x=h*f*d+u*p*g,this._y=u*p*d+h*f*g,this._z=u*f*g-h*p*d,this._w=u*f*d-h*p*g;break;case"XZY":this._x=h*f*d-u*p*g,this._y=u*p*d-h*f*g,this._z=u*f*g+h*p*d,this._w=u*f*d+h*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],o=n[1],a=n[5],l=n[9],u=n[2],f=n[6],d=n[10],h=i+a+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-u)*p,this._z=(o-r)*p}else if(i>a&&i>d){const p=2*Math.sqrt(1+i-a-d);this._w=(f-l)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(s+u)/p}else if(a>d){const p=2*Math.sqrt(1+a-i-d);this._w=(s-u)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+d-i-a);this._w=(o-r)/p,this._x=(s+u)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<Number.EPSILON?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(We(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,o=e._w,a=n._x,l=n._y,u=n._z,f=n._w;return this._x=i*f+o*a+r*u-s*l,this._y=r*f+o*l+s*a-i*u,this._z=s*f+o*u+i*l-r*a,this._w=o*f-i*a-r*l-s*u,this._onChangeCallback(),this}slerp(e,n){if(n===0)return this;if(n===1)return this.copy(e);const i=this._x,r=this._y,s=this._z,o=this._w;let a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-n;return this._w=p*o+n*this._w,this._x=p*i+n*this._x,this._y=p*r+n*this._y,this._z=p*s+n*this._z,this.normalize(),this}const u=Math.sqrt(l),f=Math.atan2(u,a),d=Math.sin((1-n)*f)/u,h=Math.sin(n*f)/u;return this._w=o*d+this._w*h,this._x=i*d+this._x*h,this._y=r*d+this._y*h,this._z=s*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(e=0,n=0,i=0){O.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Tp.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Tp.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,u=2*(o*r-a*i),f=2*(a*n-s*r),d=2*(s*i-o*n);return this.x=n+l*u+o*d-a*f,this.y=i+l*f+a*u-s*d,this.z=r+l*d+s*f-o*u,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=We(this.x,e.x,n.x),this.y=We(this.y,e.y,n.y),this.z=We(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=We(this.x,e,n),this.y=We(this.y,e,n),this.z=We(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(We(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,o=n.x,a=n.y,l=n.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Uu.copy(this).projectOnVector(e),this.sub(Uu)}reflect(e){return this.sub(Uu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(We(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Uu=new O,Tp=new Bo;class Vo{constructor(e=new O(1/0,1/0,1/0),n=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(In.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(In.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=In.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,In):In.fromBufferAttribute(s,o),In.applyMatrix4(e.matrixWorld),this.expandByPoint(In);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ca.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ca.copy(i.boundingBox)),ca.applyMatrix4(e.matrixWorld),this.union(ca)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,In),In.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gs),fa.subVectors(this.max,Gs),Ir.subVectors(e.a,Gs),Nr.subVectors(e.b,Gs),Fr.subVectors(e.c,Gs),Ti.subVectors(Nr,Ir),wi.subVectors(Fr,Nr),nr.subVectors(Ir,Fr);let n=[0,-Ti.z,Ti.y,0,-wi.z,wi.y,0,-nr.z,nr.y,Ti.z,0,-Ti.x,wi.z,0,-wi.x,nr.z,0,-nr.x,-Ti.y,Ti.x,0,-wi.y,wi.x,0,-nr.y,nr.x,0];return!Iu(n,Ir,Nr,Fr,fa)||(n=[1,0,0,0,1,0,0,0,1],!Iu(n,Ir,Nr,Fr,fa))?!1:(da.crossVectors(Ti,wi),n=[da.x,da.y,da.z],Iu(n,Ir,Nr,Fr,fa))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,In).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(In).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const ii=[new O,new O,new O,new O,new O,new O,new O,new O],In=new O,ca=new Vo,Ir=new O,Nr=new O,Fr=new O,Ti=new O,wi=new O,nr=new O,Gs=new O,fa=new O,da=new O,ir=new O;function Iu(t,e,n,i,r){for(let s=0,o=t.length-3;s<=o;s+=3){ir.fromArray(t,s);const a=r.x*Math.abs(ir.x)+r.y*Math.abs(ir.y)+r.z*Math.abs(ir.z),l=e.dot(ir),u=n.dot(ir),f=i.dot(ir);if(Math.max(-Math.max(l,u,f),Math.min(l,u,f))>a)return!1}return!0}const jy=new Vo,Ws=new O,Nu=new O;class Ho{constructor(e=new O,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):jy.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ws.subVectors(e,this.center);const n=Ws.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Ws,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ws.copy(e.center).add(Nu)),this.expandByPoint(Ws.copy(e.center).sub(Nu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const ri=new O,Fu=new O,ha=new O,Ai=new O,Ou=new O,pa=new O,ku=new O;class Yd{constructor(e=new O,n=new O(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ri)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ri.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ri.copy(this.origin).addScaledVector(this.direction,n),ri.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Fu.copy(e).add(n).multiplyScalar(.5),ha.copy(n).sub(e).normalize(),Ai.copy(this.origin).sub(Fu);const s=e.distanceTo(n)*.5,o=-this.direction.dot(ha),a=Ai.dot(this.direction),l=-Ai.dot(ha),u=Ai.lengthSq(),f=Math.abs(1-o*o);let d,h,p,g;if(f>0)if(d=o*l-a,h=o*a-l,g=s*f,d>=0)if(h>=-g)if(h<=g){const x=1/f;d*=x,h*=x,p=d*(d+o*h+2*a)+h*(o*d+h+2*l)+u}else h=s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+u;else h=-s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+u;else h<=-g?(d=Math.max(0,-(-o*s+a)),h=d>0?-s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+u):h<=g?(d=0,h=Math.min(Math.max(-s,-l),s),p=h*(h+2*l)+u):(d=Math.max(0,-(o*s+a)),h=d>0?s:Math.min(Math.max(-s,-l),s),p=-d*d+h*(h+2*l)+u);else h=o>0?-s:s,d=Math.max(0,-(o*h+a)),p=-d*d+h*(h+2*l)+u;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Fu).addScaledVector(ha,h),p}intersectSphere(e,n){ri.subVectors(e.center,this.origin);const i=ri.dot(this.direction),r=ri.dot(ri)-i*i,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,n):this.at(a,n)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,o,a,l;const u=1/this.direction.x,f=1/this.direction.y,d=1/this.direction.z,h=this.origin;return u>=0?(i=(e.min.x-h.x)*u,r=(e.max.x-h.x)*u):(i=(e.max.x-h.x)*u,r=(e.min.x-h.x)*u),f>=0?(s=(e.min.y-h.y)*f,o=(e.max.y-h.y)*f):(s=(e.max.y-h.y)*f,o=(e.min.y-h.y)*f),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,ri)!==null}intersectTriangle(e,n,i,r,s){Ou.subVectors(n,e),pa.subVectors(i,e),ku.crossVectors(Ou,pa);let o=this.direction.dot(ku),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ai.subVectors(this.origin,e);const l=a*this.direction.dot(pa.crossVectors(Ai,pa));if(l<0)return null;const u=a*this.direction.dot(Ou.cross(Ai));if(u<0||l+u>o)return null;const f=-a*Ai.dot(ku);return f<0?null:this.at(f/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ut{constructor(e,n,i,r,s,o,a,l,u,f,d,h,p,g,x,m){ut.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,o,a,l,u,f,d,h,p,g,x,m)}set(e,n,i,r,s,o,a,l,u,f,d,h,p,g,x,m){const c=this.elements;return c[0]=e,c[4]=n,c[8]=i,c[12]=r,c[1]=s,c[5]=o,c[9]=a,c[13]=l,c[2]=u,c[6]=f,c[10]=d,c[14]=h,c[3]=p,c[7]=g,c[11]=x,c[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ut().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){const n=this.elements,i=e.elements,r=1/Or.setFromMatrixColumn(e,0).length(),s=1/Or.setFromMatrixColumn(e,1).length(),o=1/Or.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),u=Math.sin(r),f=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const h=o*f,p=o*d,g=a*f,x=a*d;n[0]=l*f,n[4]=-l*d,n[8]=u,n[1]=p+g*u,n[5]=h-x*u,n[9]=-a*l,n[2]=x-h*u,n[6]=g+p*u,n[10]=o*l}else if(e.order==="YXZ"){const h=l*f,p=l*d,g=u*f,x=u*d;n[0]=h+x*a,n[4]=g*a-p,n[8]=o*u,n[1]=o*d,n[5]=o*f,n[9]=-a,n[2]=p*a-g,n[6]=x+h*a,n[10]=o*l}else if(e.order==="ZXY"){const h=l*f,p=l*d,g=u*f,x=u*d;n[0]=h-x*a,n[4]=-o*d,n[8]=g+p*a,n[1]=p+g*a,n[5]=o*f,n[9]=x-h*a,n[2]=-o*u,n[6]=a,n[10]=o*l}else if(e.order==="ZYX"){const h=o*f,p=o*d,g=a*f,x=a*d;n[0]=l*f,n[4]=g*u-p,n[8]=h*u+x,n[1]=l*d,n[5]=x*u+h,n[9]=p*u-g,n[2]=-u,n[6]=a*l,n[10]=o*l}else if(e.order==="YZX"){const h=o*l,p=o*u,g=a*l,x=a*u;n[0]=l*f,n[4]=x-h*d,n[8]=g*d+p,n[1]=d,n[5]=o*f,n[9]=-a*f,n[2]=-u*f,n[6]=p*d+g,n[10]=h-x*d}else if(e.order==="XZY"){const h=o*l,p=o*u,g=a*l,x=a*u;n[0]=l*f,n[4]=-d,n[8]=u*f,n[1]=h*d+x,n[5]=o*f,n[9]=p*d-g,n[2]=g*d-p,n[6]=a*f,n[10]=x*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yy,e,qy)}lookAt(e,n,i){const r=this.elements;return fn.subVectors(e,n),fn.lengthSq()===0&&(fn.z=1),fn.normalize(),Ri.crossVectors(i,fn),Ri.lengthSq()===0&&(Math.abs(i.z)===1?fn.x+=1e-4:fn.z+=1e-4,fn.normalize(),Ri.crossVectors(i,fn)),Ri.normalize(),ma.crossVectors(fn,Ri),r[0]=Ri.x,r[4]=ma.x,r[8]=fn.x,r[1]=Ri.y,r[5]=ma.y,r[9]=fn.y,r[2]=Ri.z,r[6]=ma.z,r[10]=fn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,o=i[0],a=i[4],l=i[8],u=i[12],f=i[1],d=i[5],h=i[9],p=i[13],g=i[2],x=i[6],m=i[10],c=i[14],_=i[3],v=i[7],y=i[11],C=i[15],R=r[0],A=r[4],P=r[8],T=r[12],M=r[1],D=r[5],j=r[9],V=r[13],Q=r[2],J=r[6],I=r[10],H=r[14],L=r[3],G=r[7],q=r[11],K=r[15];return s[0]=o*R+a*M+l*Q+u*L,s[4]=o*A+a*D+l*J+u*G,s[8]=o*P+a*j+l*I+u*q,s[12]=o*T+a*V+l*H+u*K,s[1]=f*R+d*M+h*Q+p*L,s[5]=f*A+d*D+h*J+p*G,s[9]=f*P+d*j+h*I+p*q,s[13]=f*T+d*V+h*H+p*K,s[2]=g*R+x*M+m*Q+c*L,s[6]=g*A+x*D+m*J+c*G,s[10]=g*P+x*j+m*I+c*q,s[14]=g*T+x*V+m*H+c*K,s[3]=_*R+v*M+y*Q+C*L,s[7]=_*A+v*D+y*J+C*G,s[11]=_*P+v*j+y*I+C*q,s[15]=_*T+v*V+y*H+C*K,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],u=e[13],f=e[2],d=e[6],h=e[10],p=e[14],g=e[3],x=e[7],m=e[11],c=e[15];return g*(+s*l*d-r*u*d-s*a*h+i*u*h+r*a*p-i*l*p)+x*(+n*l*p-n*u*h+s*o*h-r*o*p+r*u*f-s*l*f)+m*(+n*u*d-n*a*p-s*o*d+i*o*p+s*a*f-i*u*f)+c*(-r*a*f-n*l*d+n*a*h+r*o*d-i*o*h+i*l*f)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],u=e[7],f=e[8],d=e[9],h=e[10],p=e[11],g=e[12],x=e[13],m=e[14],c=e[15],_=d*m*u-x*h*u+x*l*p-a*m*p-d*l*c+a*h*c,v=g*h*u-f*m*u-g*l*p+o*m*p+f*l*c-o*h*c,y=f*x*u-g*d*u+g*a*p-o*x*p-f*a*c+o*d*c,C=g*d*l-f*x*l-g*a*h+o*x*h+f*a*m-o*d*m,R=n*_+i*v+r*y+s*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return e[0]=_*A,e[1]=(x*h*s-d*m*s-x*r*p+i*m*p+d*r*c-i*h*c)*A,e[2]=(a*m*s-x*l*s+x*r*u-i*m*u-a*r*c+i*l*c)*A,e[3]=(d*l*s-a*h*s-d*r*u+i*h*u+a*r*p-i*l*p)*A,e[4]=v*A,e[5]=(f*m*s-g*h*s+g*r*p-n*m*p-f*r*c+n*h*c)*A,e[6]=(g*l*s-o*m*s-g*r*u+n*m*u+o*r*c-n*l*c)*A,e[7]=(o*h*s-f*l*s+f*r*u-n*h*u-o*r*p+n*l*p)*A,e[8]=y*A,e[9]=(g*d*s-f*x*s-g*i*p+n*x*p+f*i*c-n*d*c)*A,e[10]=(o*x*s-g*a*s+g*i*u-n*x*u-o*i*c+n*a*c)*A,e[11]=(f*a*s-o*d*s-f*i*u+n*d*u+o*i*p-n*a*p)*A,e[12]=C*A,e[13]=(f*x*r-g*d*r+g*i*h-n*x*h-f*i*m+n*d*m)*A,e[14]=(g*a*r-o*x*r-g*i*l+n*x*l+o*i*m-n*a*m)*A,e[15]=(o*d*r-f*a*r+f*i*l-n*d*l-o*i*h+n*a*h)*A,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,o=e.x,a=e.y,l=e.z,u=s*o,f=s*a;return this.set(u*o+i,u*a-r*l,u*l+r*a,0,u*a+r*l,f*a+i,f*l-r*o,0,u*l-r*a,f*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,o=n._y,a=n._z,l=n._w,u=s+s,f=o+o,d=a+a,h=s*u,p=s*f,g=s*d,x=o*f,m=o*d,c=a*d,_=l*u,v=l*f,y=l*d,C=i.x,R=i.y,A=i.z;return r[0]=(1-(x+c))*C,r[1]=(p+y)*C,r[2]=(g-v)*C,r[3]=0,r[4]=(p-y)*R,r[5]=(1-(h+c))*R,r[6]=(m+_)*R,r[7]=0,r[8]=(g+v)*A,r[9]=(m-_)*A,r[10]=(1-(h+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;let s=Or.set(r[0],r[1],r[2]).length();const o=Or.set(r[4],r[5],r[6]).length(),a=Or.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],Nn.copy(this);const u=1/s,f=1/o,d=1/a;return Nn.elements[0]*=u,Nn.elements[1]*=u,Nn.elements[2]*=u,Nn.elements[4]*=f,Nn.elements[5]*=f,Nn.elements[6]*=f,Nn.elements[8]*=d,Nn.elements[9]*=d,Nn.elements[10]*=d,n.setFromRotationMatrix(Nn),i.x=s,i.y=o,i.z=a,this}makePerspective(e,n,i,r,s,o,a=pi){const l=this.elements,u=2*s/(n-e),f=2*s/(i-r),d=(n+e)/(n-e),h=(i+r)/(i-r);let p,g;if(a===pi)p=-(o+s)/(o-s),g=-2*o*s/(o-s);else if(a===bl)p=-o/(o-s),g=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=u,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=f,l[9]=h,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,o,a=pi){const l=this.elements,u=1/(n-e),f=1/(i-r),d=1/(o-s),h=(n+e)*u,p=(i+r)*f;let g,x;if(a===pi)g=(o+s)*d,x=-2*d;else if(a===bl)g=s*d,x=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*u,l[4]=0,l[8]=0,l[12]=-h,l[1]=0,l[5]=2*f,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=x,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Or=new O,Nn=new ut,Yy=new O(0,0,0),qy=new O(1,1,1),Ri=new O,ma=new O,fn=new O,wp=new ut,Ap=new Bo;class Si{constructor(e=0,n=0,i=0,r=Si.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],u=r[5],f=r[9],d=r[2],h=r[6],p=r[10];switch(n){case"XYZ":this._y=Math.asin(We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(h,u),this._z=0);break;case"YXZ":this._x=Math.asin(-We(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,u)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,u)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-We(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,u));break;case"YZX":this._z=Math.asin(We(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,u),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,u),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return wp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(wp,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Ap.setFromEuler(this),this.setFromQuaternion(Ap,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Si.DEFAULT_ORDER="XYZ";class Y_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let $y=0;const Rp=new O,kr=new Bo,si=new ut,ga=new O,Xs=new O,Ky=new O,Zy=new Bo,Cp=new O(1,0,0),Pp=new O(0,1,0),bp=new O(0,0,1),Lp={type:"added"},Qy={type:"removed"},zr={type:"childadded",child:null},zu={type:"childremoved",child:null};class Ut extends bs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:$y++}),this.uuid=zo(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ut.DEFAULT_UP.clone();const e=new O,n=new Si,i=new Bo,r=new O(1,1,1);function s(){i.setFromEuler(n,!1)}function o(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new ut},normalMatrix:{value:new ze}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=Ut.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Y_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return kr.setFromAxisAngle(e,n),this.quaternion.multiply(kr),this}rotateOnWorldAxis(e,n){return kr.setFromAxisAngle(e,n),this.quaternion.premultiply(kr),this}rotateX(e){return this.rotateOnAxis(Cp,e)}rotateY(e){return this.rotateOnAxis(Pp,e)}rotateZ(e){return this.rotateOnAxis(bp,e)}translateOnAxis(e,n){return Rp.copy(e).applyQuaternion(this.quaternion),this.position.add(Rp.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Cp,e)}translateY(e){return this.translateOnAxis(Pp,e)}translateZ(e){return this.translateOnAxis(bp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(si.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?ga.copy(e):ga.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?si.lookAt(Xs,ga,this.up):si.lookAt(ga,Xs,this.up),this.quaternion.setFromRotationMatrix(si),r&&(si.extractRotation(r.matrixWorld),kr.setFromRotationMatrix(si),this.quaternion.premultiply(kr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Lp),zr.child=e,this.dispatchEvent(zr),zr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(Qy),zu.child=e,this.dispatchEvent(zu),zu.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),si.multiply(e.parent.matrixWorld)),e.applyMatrix4(si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Lp),zr.child=e,this.dispatchEvent(zr),zr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const o=this.children[i].getObjectByProperty(e,n);if(o!==void 0)return o}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,e,Ky),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,Zy,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?{min:a.boundingBox.min.toArray(),max:a.boundingBox.max.toArray()}:void 0,boundingSphere:a.boundingSphere?{radius:a.boundingSphere.radius,center:a.boundingSphere.center.toArray()}:void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:this.boundingSphere.center.toArray(),radius:this.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:this.boundingBox.min.toArray(),max:this.boundingBox.max.toArray()}));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let u=0,f=l.length;u<f;u++){const d=l[u];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,u=this.material.length;l<u;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(n){const a=o(e.geometries),l=o(e.materials),u=o(e.textures),f=o(e.images),d=o(e.shapes),h=o(e.skeletons),p=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),u.length>0&&(i.textures=u),f.length>0&&(i.images=f),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){const l=[];for(const u in a){const f=a[u];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}Ut.DEFAULT_UP=new O(0,1,0);Ut.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ut.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Fn=new O,oi=new O,Bu=new O,ai=new O,Br=new O,Vr=new O,Dp=new O,Vu=new O,Hu=new O,Gu=new O,Wu=new yt,Xu=new yt,ju=new yt;class Bn{constructor(e=new O,n=new O,i=new O){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Fn.subVectors(e,n),r.cross(Fn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Fn.subVectors(r,n),oi.subVectors(i,n),Bu.subVectors(e,n);const o=Fn.dot(Fn),a=Fn.dot(oi),l=Fn.dot(Bu),u=oi.dot(oi),f=oi.dot(Bu),d=o*u-a*a;if(d===0)return s.set(0,0,0),null;const h=1/d,p=(u*l-a*f)*h,g=(o*f-a*l)*h;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getInterpolation(e,n,i,r,s,o,a,l){return this.getBarycoord(e,n,i,r,ai)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ai.x),l.addScaledVector(o,ai.y),l.addScaledVector(a,ai.z),l)}static getInterpolatedAttribute(e,n,i,r,s,o){return Wu.setScalar(0),Xu.setScalar(0),ju.setScalar(0),Wu.fromBufferAttribute(e,n),Xu.fromBufferAttribute(e,i),ju.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Wu,s.x),o.addScaledVector(Xu,s.y),o.addScaledVector(ju,s.z),o}static isFrontFacing(e,n,i,r){return Fn.subVectors(i,n),oi.subVectors(e,n),Fn.cross(oi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Fn.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),Fn.cross(oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Bn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Bn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let o,a;Br.subVectors(r,i),Vr.subVectors(s,i),Vu.subVectors(e,i);const l=Br.dot(Vu),u=Vr.dot(Vu);if(l<=0&&u<=0)return n.copy(i);Hu.subVectors(e,r);const f=Br.dot(Hu),d=Vr.dot(Hu);if(f>=0&&d<=f)return n.copy(r);const h=l*d-f*u;if(h<=0&&l>=0&&f<=0)return o=l/(l-f),n.copy(i).addScaledVector(Br,o);Gu.subVectors(e,s);const p=Br.dot(Gu),g=Vr.dot(Gu);if(g>=0&&p<=g)return n.copy(s);const x=p*u-l*g;if(x<=0&&u>=0&&g<=0)return a=u/(u-g),n.copy(i).addScaledVector(Vr,a);const m=f*g-p*d;if(m<=0&&d-f>=0&&p-g>=0)return Dp.subVectors(s,r),a=(d-f)/(d-f+(p-g)),n.copy(r).addScaledVector(Dp,a);const c=1/(m+x+h);return o=x*c,a=h*c,n.copy(i).addScaledVector(Br,o).addScaledVector(Vr,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const q_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ci={h:0,s:0,l:0},_a={h:0,s:0,l:0};function Yu(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Qe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Mn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,$e.toWorkingColorSpace(this,n),this}setRGB(e,n,i,r=$e.workingColorSpace){return this.r=e,this.g=n,this.b=i,$e.toWorkingColorSpace(this,r),this}setHSL(e,n,i,r=$e.workingColorSpace){if(e=Ny(e,1),n=We(n,0,1),i=We(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,o=2*i-s;this.r=Yu(o,s,e+1/3),this.g=Yu(o,s,e),this.b=Yu(o,s,e-1/3)}return $e.toWorkingColorSpace(this,r),this}setStyle(e,n=Mn){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(o===6)return this.setHex(parseInt(s,16),n);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Mn){const i=q_[e.toLowerCase()];return i!==void 0?this.setHex(i,n):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}copyLinearToSRGB(e){return this.r=ps(e.r),this.g=ps(e.g),this.b=ps(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Mn){return $e.fromWorkingColorSpace(Gt.copy(this),e),Math.round(We(Gt.r*255,0,255))*65536+Math.round(We(Gt.g*255,0,255))*256+Math.round(We(Gt.b*255,0,255))}getHexString(e=Mn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=$e.workingColorSpace){$e.fromWorkingColorSpace(Gt.copy(this),n);const i=Gt.r,r=Gt.g,s=Gt.b,o=Math.max(i,r,s),a=Math.min(i,r,s);let l,u;const f=(a+o)/2;if(a===o)l=0,u=0;else{const d=o-a;switch(u=f<=.5?d/(o+a):d/(2-o-a),o){case i:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-i)/d+2;break;case s:l=(i-r)/d+4;break}l/=6}return e.h=l,e.s=u,e.l=f,e}getRGB(e,n=$e.workingColorSpace){return $e.fromWorkingColorSpace(Gt.copy(this),n),e.r=Gt.r,e.g=Gt.g,e.b=Gt.b,e}getStyle(e=Mn){$e.fromWorkingColorSpace(Gt.copy(this),e);const n=Gt.r,i=Gt.g,r=Gt.b;return e!==Mn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Ci),this.setHSL(Ci.h+e,Ci.s+n,Ci.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ci),e.getHSL(_a);const i=bu(Ci.h,_a.h,n),r=bu(Ci.s,_a.s,n),s=bu(Ci.l,_a.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Gt=new Qe;Qe.NAMES=q_;let Jy=0;class Ls extends bs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jy++}),this.uuid=zo(),this.name="",this.type="Material",this.blending=hs,this.side=Ki,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=nf,this.blendDst=rf,this.blendEquation=dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Qe(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=vp,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Dr,this.stencilZFail=Dr,this.stencilZPass=Dr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){console.warn(`THREE.Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){console.warn(`THREE.Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==hs&&(i.blending=this.blending),this.side!==Ki&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==nf&&(i.blendSrc=this.blendSrc),this.blendDst!==rf&&(i.blendDst=this.blendDst),this.blendEquation!==dr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==vp&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Dr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Dr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Dr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(n){const s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class ss extends Ls{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Si,this.combine=I_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new O,va=new Ke;let eS=0;class Jn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:eS++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=xp,this.updateRanges=[],this.gpuType=hi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)va.fromBufferAttribute(this,n),va.applyMatrix3(e),this.setXY(n,va.x,va.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Et.fromBufferAttribute(this,n),Et.applyMatrix3(e),this.setXYZ(n,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Et.fromBufferAttribute(this,n),Et.applyMatrix4(e),this.setXYZ(n,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Et.fromBufferAttribute(this,n),Et.applyNormalMatrix(e),this.setXYZ(n,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Et.fromBufferAttribute(this,n),Et.transformDirection(e),this.setXYZ(n,Et.x,Et.y,Et.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Hs(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=nn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Hs(n,this.array)),n}setX(e,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Hs(n,this.array)),n}setY(e,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Hs(n,this.array)),n}setZ(e,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Hs(n,this.array)),n}setW(e,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=nn(n,this.array),i=nn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=nn(n,this.array),i=nn(i,this.array),r=nn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=nn(n,this.array),i=nn(i,this.array),r=nn(r,this.array),s=nn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==xp&&(e.usage=this.usage),e}}class $_ extends Jn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class K_ extends Jn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class It extends Jn{constructor(e,n,i){super(new Float32Array(e),n,i)}}let tS=0;const Sn=new ut,qu=new Ut,Hr=new O,dn=new Vo,js=new Vo,bt=new O;class un extends bs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:tS++}),this.uuid=zo(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(X_(e)?K_:$_)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Sn.makeRotationFromQuaternion(e),this.applyMatrix4(Sn),this}rotateX(e){return Sn.makeRotationX(e),this.applyMatrix4(Sn),this}rotateY(e){return Sn.makeRotationY(e),this.applyMatrix4(Sn),this}rotateZ(e){return Sn.makeRotationZ(e),this.applyMatrix4(Sn),this}translate(e,n,i){return Sn.makeTranslation(e,n,i),this.applyMatrix4(Sn),this}scale(e,n,i){return Sn.makeScale(e,n,i),this.applyMatrix4(Sn),this}lookAt(e){return qu.lookAt(e),qu.updateMatrix(),this.applyMatrix4(qu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hr).negate(),this.translate(Hr.x,Hr.y,Hr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new It(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vo);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];dn.setFromBufferAttribute(s),this.morphTargetsRelative?(bt.addVectors(this.boundingBox.min,dn.min),this.boundingBox.expandByPoint(bt),bt.addVectors(this.boundingBox.max,dn.max),this.boundingBox.expandByPoint(bt)):(this.boundingBox.expandByPoint(dn.min),this.boundingBox.expandByPoint(dn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ho);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){const i=this.boundingSphere.center;if(dn.setFromBufferAttribute(e),n)for(let s=0,o=n.length;s<o;s++){const a=n[s];js.setFromBufferAttribute(a),this.morphTargetsRelative?(bt.addVectors(dn.min,js.min),dn.expandByPoint(bt),bt.addVectors(dn.max,js.max),dn.expandByPoint(bt)):(dn.expandByPoint(js.min),dn.expandByPoint(js.max))}dn.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)bt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(bt));if(n)for(let s=0,o=n.length;s<o;s++){const a=n[s],l=this.morphTargetsRelative;for(let u=0,f=a.count;u<f;u++)bt.fromBufferAttribute(a,u),l&&(Hr.fromBufferAttribute(e,u),bt.add(Hr)),r=Math.max(r,i.distanceToSquared(bt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Jn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let P=0;P<i.count;P++)a[P]=new O,l[P]=new O;const u=new O,f=new O,d=new O,h=new Ke,p=new Ke,g=new Ke,x=new O,m=new O;function c(P,T,M){u.fromBufferAttribute(i,P),f.fromBufferAttribute(i,T),d.fromBufferAttribute(i,M),h.fromBufferAttribute(s,P),p.fromBufferAttribute(s,T),g.fromBufferAttribute(s,M),f.sub(u),d.sub(u),p.sub(h),g.sub(h);const D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(x.copy(f).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(D),m.copy(d).multiplyScalar(p.x).addScaledVector(f,-g.x).multiplyScalar(D),a[P].add(x),a[T].add(x),a[M].add(x),l[P].add(m),l[T].add(m),l[M].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let P=0,T=_.length;P<T;++P){const M=_[P],D=M.start,j=M.count;for(let V=D,Q=D+j;V<Q;V+=3)c(e.getX(V+0),e.getX(V+1),e.getX(V+2))}const v=new O,y=new O,C=new O,R=new O;function A(P){C.fromBufferAttribute(r,P),R.copy(C);const T=a[P];v.copy(T),v.sub(C.multiplyScalar(C.dot(T))).normalize(),y.crossVectors(R,T);const D=y.dot(l[P])<0?-1:1;o.setXYZW(P,v.x,v.y,v.z,D)}for(let P=0,T=_.length;P<T;++P){const M=_[P],D=M.start,j=M.count;for(let V=D,Q=D+j;V<Q;V+=3)A(e.getX(V+0)),A(e.getX(V+1)),A(e.getX(V+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Jn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,p=i.count;h<p;h++)i.setXYZ(h,0,0,0);const r=new O,s=new O,o=new O,a=new O,l=new O,u=new O,f=new O,d=new O;if(e)for(let h=0,p=e.count;h<p;h+=3){const g=e.getX(h+0),x=e.getX(h+1),m=e.getX(h+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,x),o.fromBufferAttribute(n,m),f.subVectors(o,s),d.subVectors(r,s),f.cross(d),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),u.fromBufferAttribute(i,m),a.add(f),l.add(f),u.add(f),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,u.x,u.y,u.z)}else for(let h=0,p=n.count;h<p;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),o.fromBufferAttribute(n,h+2),f.subVectors(o,s),d.subVectors(r,s),f.cross(d),i.setXYZ(h+0,f.x,f.y,f.z),i.setXYZ(h+1,f.x,f.y,f.z),i.setXYZ(h+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)bt.fromBufferAttribute(e,n),bt.normalize(),e.setXYZ(n,bt.x,bt.y,bt.z)}toNonIndexed(){function e(a,l){const u=a.array,f=a.itemSize,d=a.normalized,h=new u.constructor(l.length*f);let p=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?p=l[x]*a.data.stride+a.offset:p=l[x]*f;for(let c=0;c<f;c++)h[g++]=u[p++]}return new Jn(h,f,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new un,i=this.index.array,r=this.attributes;for(const a in r){const l=r[a],u=e(l,i);n.setAttribute(a,u)}const s=this.morphAttributes;for(const a in s){const l=[],u=s[a];for(let f=0,d=u.length;f<d;f++){const h=u[f],p=e(h,i);l.push(p)}n.morphAttributes[a]=l}n.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const u=o[a];n.addGroup(u.start,u.count,u.materialIndex)}return n}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const u in l)l[u]!==void 0&&(e[u]=l[u]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const u=i[l];e.data.attributes[l]=u.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const u=this.morphAttributes[l],f=[];for(let d=0,h=u.length;d<h;d++){const p=u[d];f.push(p.toJSON(e.data))}f.length>0&&(r[l]=f,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const u in r){const f=r[u];this.setAttribute(u,f.clone(n))}const s=e.morphAttributes;for(const u in s){const f=[],d=s[u];for(let h=0,p=d.length;h<p;h++)f.push(d[h].clone(n));this.morphAttributes[u]=f}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let u=0,f=o.length;u<f;u++){const d=o[u];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Up=new ut,rr=new Yd,xa=new Ho,Ip=new O,ya=new O,Sa=new O,Ma=new O,$u=new O,Ea=new O,Np=new O,Ta=new O;class $t extends Ut{constructor(e=new un,n=new ss){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Ea.set(0,0,0);for(let l=0,u=s.length;l<u;l++){const f=a[l],d=s[l];f!==0&&($u.fromBufferAttribute(d,e),o?Ea.addScaledVector($u,f):Ea.addScaledVector($u.sub(n),f))}n.add(Ea)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),xa.copy(i.boundingSphere),xa.applyMatrix4(s),rr.copy(e.ray).recast(e.near),!(xa.containsPoint(rr.origin)===!1&&(rr.intersectSphere(xa,Ip)===null||rr.origin.distanceToSquared(Ip)>(e.far-e.near)**2))&&(Up.copy(s).invert(),rr.copy(e.ray).applyMatrix4(Up),!(i.boundingBox!==null&&rr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,rr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,u=s.attributes.uv,f=s.attributes.uv1,d=s.attributes.normal,h=s.groups,p=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=h.length;g<x;g++){const m=h[g],c=o[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,C=v;y<C;y+=3){const R=a.getX(y),A=a.getX(y+1),P=a.getX(y+2);r=wa(this,c,e,i,u,f,d,R,A,P),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(a.count,p.start+p.count);for(let m=g,c=x;m<c;m+=3){const _=a.getX(m),v=a.getX(m+1),y=a.getX(m+2);r=wa(this,o,e,i,u,f,d,_,v,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=h.length;g<x;g++){const m=h[g],c=o[m.materialIndex],_=Math.max(m.start,p.start),v=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=_,C=v;y<C;y+=3){const R=y,A=y+1,P=y+2;r=wa(this,c,e,i,u,f,d,R,A,P),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,p.start),x=Math.min(l.count,p.start+p.count);for(let m=g,c=x;m<c;m+=3){const _=m,v=m+1,y=m+2;r=wa(this,o,e,i,u,f,d,_,v,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function nS(t,e,n,i,r,s,o,a){let l;if(e.side===Zt?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===Ki,a),l===null)return null;Ta.copy(a),Ta.applyMatrix4(t.matrixWorld);const u=n.ray.origin.distanceTo(Ta);return u<n.near||u>n.far?null:{distance:u,point:Ta.clone(),object:t}}function wa(t,e,n,i,r,s,o,a,l,u){t.getVertexPosition(a,ya),t.getVertexPosition(l,Sa),t.getVertexPosition(u,Ma);const f=nS(t,e,n,i,ya,Sa,Ma,Np);if(f){const d=new O;Bn.getBarycoord(Np,ya,Sa,Ma,d),r&&(f.uv=Bn.getInterpolatedAttribute(r,a,l,u,d,new Ke)),s&&(f.uv1=Bn.getInterpolatedAttribute(s,a,l,u,d,new Ke)),o&&(f.normal=Bn.getInterpolatedAttribute(o,a,l,u,d,new O),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const h={a,b:l,c:u,normal:new O,materialIndex:0};Bn.getNormal(ya,Sa,Ma,h.normal),f.face=h,f.barycoord=d}return f}class Go extends un{constructor(e=1,n=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],u=[],f=[],d=[];let h=0,p=0;g("z","y","x",-1,-1,i,n,e,o,s,0),g("z","y","x",1,-1,i,n,-e,o,s,1),g("x","z","y",1,1,e,i,n,r,o,2),g("x","z","y",1,-1,e,i,-n,r,o,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new It(u,3)),this.setAttribute("normal",new It(f,3)),this.setAttribute("uv",new It(d,2));function g(x,m,c,_,v,y,C,R,A,P,T){const M=y/A,D=C/P,j=y/2,V=C/2,Q=R/2,J=A+1,I=P+1;let H=0,L=0;const G=new O;for(let q=0;q<I;q++){const K=q*D-V;for(let fe=0;fe<J;fe++){const Ue=fe*M-j;G[x]=Ue*_,G[m]=K*v,G[c]=Q,u.push(G.x,G.y,G.z),G[x]=0,G[m]=0,G[c]=R>0?1:-1,f.push(G.x,G.y,G.z),d.push(fe/A),d.push(1-q/P),H+=1}}for(let q=0;q<P;q++)for(let K=0;K<A;K++){const fe=h+K+J*q,Ue=h+K+J*(q+1),W=h+(K+1)+J*(q+1),ie=h+(K+1)+J*q;l.push(fe,Ue,ie),l.push(Ue,W,ie),L+=6}a.addGroup(p,L,T),p+=L,h+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Go(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function As(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function Yt(t){const e={};for(let n=0;n<t.length;n++){const i=As(t[n]);for(const r in i)e[r]=i[r]}return e}function iS(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Z_(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:$e.workingColorSpace}const rS={clone:As,merge:Yt};var sS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,oS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ti extends Ls{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sS,this.fragmentShader=oS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=As(e.uniforms),this.uniformsGroups=iS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?n.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?n.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?n.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?n.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?n.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?n.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?n.uniforms[r]={type:"m4",value:o.toArray()}:n.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class Q_ extends Ut{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=pi}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pi=new O,Fp=new Ke,Op=new Ke;class wn extends Q_{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Hf*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Pu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hf*2*Math.atan(Math.tan(Pu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Pi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pi.x,Pi.y).multiplyScalar(-e/Pi.z),Pi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Pi.x,Pi.y).multiplyScalar(-e/Pi.z)}getViewSize(e,n){return this.getViewBounds(e,Fp,Op),n.subVectors(Op,Fp)}setViewOffset(e,n,i,r,s,o){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(Pu*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,u=o.fullHeight;s+=o.offsetX*r/l,n-=o.offsetY*i/u,r*=o.width/l,i*=o.height/u}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}const Gr=-90,Wr=1;class aS extends Ut{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new wn(Gr,Wr,e,n);r.layers=this.layers,this.add(r);const s=new wn(Gr,Wr,e,n);s.layers=this.layers,this.add(s);const o=new wn(Gr,Wr,e,n);o.layers=this.layers,this.add(o);const a=new wn(Gr,Wr,e,n);a.layers=this.layers,this.add(a);const l=new wn(Gr,Wr,e,n);l.layers=this.layers,this.add(l);const u=new wn(Gr,Wr,e,n);u.layers=this.layers,this.add(u)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,o,a,l]=n;for(const u of n)this.remove(u);if(e===pi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===bl)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const u of n)this.add(u),u.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,u,f]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(n,s),e.setRenderTarget(i,1,r),e.render(n,o),e.setRenderTarget(i,2,r),e.render(n,a),e.setRenderTarget(i,3,r),e.render(n,l),e.setRenderTarget(i,4,r),e.render(n,u),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(n,f),e.setRenderTarget(d,h,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class J_ extends Qt{constructor(e=[],n=Es,i,r,s,o,a,l,u,f){super(e,n,i,r,s,o,a,l,u,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class lS extends Rr{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new J_(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:Kn}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Go(5,5,5),s=new ti({name:"CubemapFromEquirect",uniforms:As(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Zt,blending:ji});s.uniforms.tEquirect.value=n;const o=new $t(r,s),a=n.minFilter;return n.minFilter===vr&&(n.minFilter=Kn),new aS(1,10,this).update(e,o),n.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(n,i,r);e.setRenderTarget(s)}}class Aa extends Ut{constructor(){super(),this.isGroup=!0,this.type="Group"}}const uS={type:"move"};class Ku{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Aa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Aa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Aa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,u=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(u&&e.hand){o=!0;for(const x of e.hand.values()){const m=n.getJointPose(x,i),c=this._getHandJoint(u,x);m!==null&&(c.matrix.fromArray(m.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,c.jointRadius=m.radius),c.visible=m!==null}const f=u.joints["index-finger-tip"],d=u.joints["thumb-tip"],h=f.position.distanceTo(d.position),p=.02,g=.005;u.inputState.pinching&&h>p+g?(u.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!u.inputState.pinching&&h<=p-g&&(u.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(uS)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),u!==null&&(u.visible=o!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Aa;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}class cS extends Ut{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Si,this.environmentIntensity=1,this.environmentRotation=new Si,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Zu=new O,fS=new O,dS=new ze;class cr{constructor(e=new O(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Zu.subVectors(i,n).cross(fS.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Zu),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||dS.getNormalMatrix(e),r=this.coplanarPoint(Zu).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const sr=new Ho,Ra=new O;class qd{constructor(e=new cr,n=new cr,i=new cr,r=new cr,s=new cr,o=new cr){this.planes=[e,n,i,r,s,o]}set(e,n,i,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(n),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=pi){const i=this.planes,r=e.elements,s=r[0],o=r[1],a=r[2],l=r[3],u=r[4],f=r[5],d=r[6],h=r[7],p=r[8],g=r[9],x=r[10],m=r[11],c=r[12],_=r[13],v=r[14],y=r[15];if(i[0].setComponents(l-s,h-u,m-p,y-c).normalize(),i[1].setComponents(l+s,h+u,m+p,y+c).normalize(),i[2].setComponents(l+o,h+f,m+g,y+_).normalize(),i[3].setComponents(l-o,h-f,m-g,y-_).normalize(),i[4].setComponents(l-a,h-d,m-x,y-v).normalize(),n===pi)i[5].setComponents(l+a,h+d,m+x,y+v).normalize();else if(n===bl)i[5].setComponents(a,d,x,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),sr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),sr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(sr)}intersectsSprite(e){return sr.center.set(0,0,0),sr.radius=.7071067811865476,sr.applyMatrix4(e.matrixWorld),this.intersectsSphere(sr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Ra.x=r.normal.x>0?e.max.x:e.min.x,Ra.y=r.normal.y>0?e.max.y:e.min.y,Ra.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ra)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ev extends Ls{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ll=new O,Dl=new O,kp=new ut,Ys=new Yd,Ca=new Ho,Qu=new O,zp=new O;class hS extends Ut{constructor(e=new un,n=new ev){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)Ll.fromBufferAttribute(n,r-1),Dl.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=Ll.distanceTo(Dl);e.setAttribute("lineDistance",new It(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ca.copy(i.boundingSphere),Ca.applyMatrix4(r),Ca.radius+=s,e.ray.intersectsSphere(Ca)===!1)return;kp.copy(r).invert(),Ys.copy(e.ray).applyMatrix4(kp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=this.isLineSegments?2:1,f=i.index,h=i.attributes.position;if(f!==null){const p=Math.max(0,o.start),g=Math.min(f.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=u){const c=f.getX(x),_=f.getX(x+1),v=Pa(this,e,Ys,l,c,_,x);v&&n.push(v)}if(this.isLineLoop){const x=f.getX(g-1),m=f.getX(p),c=Pa(this,e,Ys,l,x,m,g-1);c&&n.push(c)}}else{const p=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=p,m=g-1;x<m;x+=u){const c=Pa(this,e,Ys,l,x,x+1,x);c&&n.push(c)}if(this.isLineLoop){const x=Pa(this,e,Ys,l,g-1,p,g-1);x&&n.push(x)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Pa(t,e,n,i,r,s,o){const a=t.geometry.attributes.position;if(Ll.fromBufferAttribute(a,r),Dl.fromBufferAttribute(a,s),n.distanceSqToSegment(Ll,Dl,Qu,zp)>i)return;Qu.applyMatrix4(t.matrixWorld);const u=e.ray.origin.distanceTo(Qu);if(!(u<e.near||u>e.far))return{distance:u,point:zp.clone().applyMatrix4(t.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:t}}class tv extends Ls{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Bp=new ut,Gf=new Yd,ba=new Ho,La=new O;class pS extends Ut{constructor(e=new un,n=new tv){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ba.copy(i.boundingSphere),ba.applyMatrix4(r),ba.radius+=s,e.ray.intersectsSphere(ba)===!1)return;Bp.copy(r).invert(),Gf.copy(e.ray).applyMatrix4(Bp);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,u=i.index,d=i.attributes.position;if(u!==null){const h=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let g=h,x=p;g<x;g++){const m=u.getX(g);La.fromBufferAttribute(d,m),Vp(La,m,l,r,e,n,this)}}else{const h=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let g=h,x=p;g<x;g++)La.fromBufferAttribute(d,g),Vp(La,g,l,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function Vp(t,e,n,i,r,s,o){const a=Gf.distanceSqToPoint(t);if(a<n){const l=new O;Gf.closestPointToPoint(t,l),l.applyMatrix4(i);const u=r.ray.origin.distanceTo(l);if(u<r.near||u>r.far)return;s.push({distance:u,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class nv extends Qt{constructor(e,n,i=Ar,r,s,o,a=Wn,l=Wn,u,f=bo){if(f!==bo&&f!==Lo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");super(null,r,s,o,a,l,f,i,u),this.isDepthTexture=!0,this.image={width:e,height:n},this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new jd(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class $d extends un{constructor(e=1,n=32,i=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:n,thetaStart:i,thetaLength:r},n=Math.max(3,n);const s=[],o=[],a=[],l=[],u=new O,f=new Ke;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,h=3;d<=n;d++,h+=3){const p=i+d/n*r;u.x=e*Math.cos(p),u.y=e*Math.sin(p),o.push(u.x,u.y,u.z),a.push(0,0,1),f.x=(o[h]/e+1)/2,f.y=(o[h+1]/e+1)/2,l.push(f.x,f.y)}for(let d=1;d<=n;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new It(o,3)),this.setAttribute("normal",new It(a,3)),this.setAttribute("uv",new It(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $d(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class mS{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n=null){const i=this.getLengths();let r=0;const s=i.length;let o;n?o=n:o=e*i[s-1];let a=0,l=s-1,u;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),u=i[r]-o,u<0)a=r+1;else if(u>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);const f=i[r],h=i[r+1]-f,p=(o-f)/h;return(r+p)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const o=this.getPoint(r),a=this.getPoint(s),l=n||(o.isVector2?new Ke:new O);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n=!1){const i=new O,r=[],s=[],o=[],a=new O,l=new ut;for(let p=0;p<=e;p++){const g=p/e;r[p]=this.getTangentAt(g,new O)}s[0]=new O,o[0]=new O;let u=Number.MAX_VALUE;const f=Math.abs(r[0].x),d=Math.abs(r[0].y),h=Math.abs(r[0].z);f<=u&&(u=f,i.set(1,0,0)),d<=u&&(u=d,i.set(0,1,0)),h<=u&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(r[p-1],r[p]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(We(r[p-1].dot(r[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(a,g))}o[p].crossVectors(r[p],s[p])}if(n===!0){let p=Math.acos(We(s[0].dot(s[e]),-1,1));p/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(p=-p);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],p*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function gS(t,e){const n=1-t;return n*n*e}function _S(t,e){return 2*(1-t)*t*e}function vS(t,e){return t*t*e}function Ju(t,e,n,i){return gS(t,e)+_S(t,n)+vS(t,i)}class xS extends mS{constructor(e=new O,n=new O,i=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new O){const i=n,r=this.v0,s=this.v1,o=this.v2;return i.set(Ju(e,r.x,s.x,o.x),Ju(e,r.y,s.y,o.y),Ju(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ql extends un{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,o=n/2,a=Math.floor(i),l=Math.floor(r),u=a+1,f=l+1,d=e/a,h=n/l,p=[],g=[],x=[],m=[];for(let c=0;c<f;c++){const _=c*h-o;for(let v=0;v<u;v++){const y=v*d-s;g.push(y,-_,0),x.push(0,0,1),m.push(v/a),m.push(1-c/l)}}for(let c=0;c<l;c++)for(let _=0;_<a;_++){const v=_+u*c,y=_+u*(c+1),C=_+1+u*(c+1),R=_+1+u*c;p.push(v,y,R),p.push(y,C,R)}this.setIndex(p),this.setAttribute("position",new It(g,3)),this.setAttribute("normal",new It(x,3)),this.setAttribute("uv",new It(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ql(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ul extends un{constructor(e=.5,n=1,i=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:n,thetaSegments:i,phiSegments:r,thetaStart:s,thetaLength:o},i=Math.max(3,i),r=Math.max(1,r);const a=[],l=[],u=[],f=[];let d=e;const h=(n-e)/r,p=new O,g=new Ke;for(let x=0;x<=r;x++){for(let m=0;m<=i;m++){const c=s+m/i*o;p.x=d*Math.cos(c),p.y=d*Math.sin(c),l.push(p.x,p.y,p.z),u.push(0,0,1),g.x=(p.x/n+1)/2,g.y=(p.y/n+1)/2,f.push(g.x,g.y)}d+=h}for(let x=0;x<r;x++){const m=x*(i+1);for(let c=0;c<i;c++){const _=c+m,v=_,y=_+i+1,C=_+i+2,R=_+1;a.push(v,y,R),a.push(y,C,R)}}this.setIndex(a),this.setAttribute("position",new It(l,3)),this.setAttribute("normal",new It(u,3)),this.setAttribute("uv",new It(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ul(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class lo extends un{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let u=0;const f=[],d=new O,h=new O,p=[],g=[],x=[],m=[];for(let c=0;c<=i;c++){const _=[],v=c/i;let y=0;c===0&&o===0?y=.5/n:c===i&&l===Math.PI&&(y=-.5/n);for(let C=0;C<=n;C++){const R=C/n;d.x=-e*Math.cos(r+R*s)*Math.sin(o+v*a),d.y=e*Math.cos(o+v*a),d.z=e*Math.sin(r+R*s)*Math.sin(o+v*a),g.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),m.push(R+y,1-v),_.push(u++)}f.push(_)}for(let c=0;c<i;c++)for(let _=0;_<n;_++){const v=f[c][_+1],y=f[c][_],C=f[c+1][_],R=f[c+1][_+1];(c!==0||o>0)&&p.push(v,y,R),(c!==i-1||l<Math.PI)&&p.push(y,C,R)}this.setIndex(p),this.setAttribute("position",new It(g,3)),this.setAttribute("normal",new It(x,3)),this.setAttribute("uv",new It(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new lo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class yS extends Ls{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ty,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class SS extends Ls{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Hp={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(this.files[t]=e)},get:function(t){if(this.enabled!==!1)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};class MS{constructor(e,n,i){const r=this;let s=!1,o=0,a=0,l;const u=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this.itemStart=function(f){a++,s===!1&&r.onStart!==void 0&&r.onStart(f,o,a),s=!0},this.itemEnd=function(f){o++,r.onProgress!==void 0&&r.onProgress(f,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(f){r.onError!==void 0&&r.onError(f)},this.resolveURL=function(f){return l?l(f):f},this.setURLModifier=function(f){return l=f,this},this.addHandler=function(f,d){return u.push(f,d),this},this.removeHandler=function(f){const d=u.indexOf(f);return d!==-1&&u.splice(d,2),this},this.getHandler=function(f){for(let d=0,h=u.length;d<h;d+=2){const p=u[d],g=u[d+1];if(p.global&&(p.lastIndex=0),p.test(f))return g}return null}}}const ES=new MS;class Kd{constructor(e){this.manager=e!==void 0?e:ES,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}Kd.DEFAULT_MATERIAL_NAME="__DEFAULT";class TS extends Kd{constructor(e){super(e)}load(e,n,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,o=Hp.get(e);if(o!==void 0)return s.manager.itemStart(e),setTimeout(function(){n&&n(o),s.manager.itemEnd(e)},0),o;const a=Do("img");function l(){f(),Hp.add(e,this),n&&n(this),s.manager.itemEnd(e)}function u(d){f(),r&&r(d),s.manager.itemError(e),s.manager.itemEnd(e)}function f(){a.removeEventListener("load",l,!1),a.removeEventListener("error",u,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",u,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),s.manager.itemStart(e),a.src=e,a}}class wS extends Kd{constructor(e){super(e)}load(e,n,i,r){const s=new Qt,o=new TS(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,n!==void 0&&n(s)},i,r),s}}class iv extends Ut{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Qe(e),this.intensity=n}dispose(){}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,this.groundColor!==void 0&&(n.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(n.object.distance=this.distance),this.angle!==void 0&&(n.object.angle=this.angle),this.decay!==void 0&&(n.object.decay=this.decay),this.penumbra!==void 0&&(n.object.penumbra=this.penumbra),this.shadow!==void 0&&(n.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(n.object.target=this.target.uuid),n}}const ec=new ut,Gp=new O,Wp=new O;class AS{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ke(512,512),this.mapType=ei,this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qd,this._frameExtents=new Ke(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;Gp.setFromMatrixPosition(e.matrixWorld),n.position.copy(Gp),Wp.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(Wp),n.updateMatrixWorld(),ec.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ec),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(ec)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class rv extends Q_{constructor(e=-1,n=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,o=i+e,a=r+n,l=r-n;if(this.view!==null&&this.view.enabled){const u=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=u*this.view.offsetX,o=s+u*this.view.width,a-=f*this.view.offsetY,l=a-f*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class RS extends AS{constructor(){super(new rv(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class CS extends iv{constructor(e,n){super(e,n),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ut.DEFAULT_UP),this.updateMatrix(),this.target=new Ut,this.shadow=new RS}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class PS extends iv{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}class bS extends wn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function Xp(t,e,n,i){const r=LS(i);switch(n){case z_:return t*e;case V_:return t*e/r.components*r.byteLength;case Gd:return t*e/r.components*r.byteLength;case H_:return t*e*2/r.components*r.byteLength;case Wd:return t*e*2/r.components*r.byteLength;case B_:return t*e*3/r.components*r.byteLength;case Vn:return t*e*4/r.components*r.byteLength;case Xd:return t*e*4/r.components*r.byteLength;case Za:case Qa:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Ja:case el:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case _f:case xf:return Math.max(t,16)*Math.max(e,8)/4;case gf:case vf:return Math.max(t,8)*Math.max(e,8)/2;case yf:case Sf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Mf:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Ef:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Tf:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case wf:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Af:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Rf:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Cf:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Pf:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case bf:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Lf:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Df:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Uf:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case If:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Nf:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Ff:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case tl:case Of:case kf:return Math.ceil(t/4)*Math.ceil(e/4)*16;case G_:case zf:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Bf:case Vf:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function LS(t){switch(t){case ei:case F_:return{byteLength:1,components:1};case Co:case O_:case ko:return{byteLength:2,components:1};case Vd:case Hd:return{byteLength:2,components:4};case Ar:case Bd:case hi:return{byteLength:4,components:1};case k_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zd}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zd);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function sv(){let t=null,e=!1,n=null,i=null;function r(s,o){n(s,o),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function DS(t){const e=new WeakMap;function n(a,l){const u=a.array,f=a.usage,d=u.byteLength,h=t.createBuffer();t.bindBuffer(l,h),t.bufferData(l,u,f),a.onUploadCallback();let p;if(u instanceof Float32Array)p=t.FLOAT;else if(u instanceof Uint16Array)a.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(u instanceof Int16Array)p=t.SHORT;else if(u instanceof Uint32Array)p=t.UNSIGNED_INT;else if(u instanceof Int32Array)p=t.INT;else if(u instanceof Int8Array)p=t.BYTE;else if(u instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:h,type:p,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:d}}function i(a,l,u){const f=l.array,d=l.updateRanges;if(t.bindBuffer(u,a),d.length===0)t.bufferSubData(u,0,f);else{d.sort((p,g)=>p.start-g.start);let h=0;for(let p=1;p<d.length;p++){const g=d[h],x=d[p];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++h,d[h]=x)}d.length=h+1;for(let p=0,g=d.length;p<g;p++){const x=d[p];t.bufferSubData(u,x.start*f.BYTES_PER_ELEMENT,f,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(t.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const f=e.get(a);(!f||f.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const u=e.get(a);if(u===void 0)e.set(a,n(a,l));else if(u.version<a.version){if(u.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(u.buffer,a,l),u.version=a.version}}return{get:r,remove:s,update:o}}var US=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,IS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,NS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,FS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,OS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,kS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,zS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,BS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,VS=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,HS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,GS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,WS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,XS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,jS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,YS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,qS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,$S=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,KS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ZS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,QS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,JS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,eM=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,tM=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,nM=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,iM=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,rM=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,sM=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,oM=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,aM=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lM=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,uM="gl_FragColor = linearToOutputTexel( gl_FragColor );",cM=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,fM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,dM=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,hM=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,pM=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,mM=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,gM=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,_M=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,vM=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,xM=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,yM=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,SM=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,MM=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,EM=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,TM=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,wM=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,AM=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,RM=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,CM=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,PM=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,bM=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,LM=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,DM=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,UM=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,IM=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,NM=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,FM=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,OM=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kM=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zM=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,BM=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,VM=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,HM=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,GM=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,WM=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,XM=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,jM=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,YM=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qM=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,$M=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,KM=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ZM=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,QM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,JM=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,eE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,tE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,nE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,iE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,rE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,sE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,oE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,aE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,lE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,uE=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,cE=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,fE=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,dE=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hE=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,pE=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,mE=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,gE=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,_E=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,vE=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,xE=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,yE=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,SE=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ME=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,EE=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,TE=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,wE=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,AE=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,RE=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,CE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,PE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bE=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,LE=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const DE=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,UE=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,IE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,NE=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,FE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,OE=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,zE=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,BE=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,VE=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,HE=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,GE=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,WE=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,XE=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,jE=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,YE=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,qE=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$E=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KE=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ZE=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,QE=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,JE=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,eT=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tT=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,nT=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,iT=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rT=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,sT=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,oT=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,aT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,lT=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,uT=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,cT=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,fT=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:US,alphahash_pars_fragment:IS,alphamap_fragment:NS,alphamap_pars_fragment:FS,alphatest_fragment:OS,alphatest_pars_fragment:kS,aomap_fragment:zS,aomap_pars_fragment:BS,batching_pars_vertex:VS,batching_vertex:HS,begin_vertex:GS,beginnormal_vertex:WS,bsdfs:XS,iridescence_fragment:jS,bumpmap_pars_fragment:YS,clipping_planes_fragment:qS,clipping_planes_pars_fragment:$S,clipping_planes_pars_vertex:KS,clipping_planes_vertex:ZS,color_fragment:QS,color_pars_fragment:JS,color_pars_vertex:eM,color_vertex:tM,common:nM,cube_uv_reflection_fragment:iM,defaultnormal_vertex:rM,displacementmap_pars_vertex:sM,displacementmap_vertex:oM,emissivemap_fragment:aM,emissivemap_pars_fragment:lM,colorspace_fragment:uM,colorspace_pars_fragment:cM,envmap_fragment:fM,envmap_common_pars_fragment:dM,envmap_pars_fragment:hM,envmap_pars_vertex:pM,envmap_physical_pars_fragment:wM,envmap_vertex:mM,fog_vertex:gM,fog_pars_vertex:_M,fog_fragment:vM,fog_pars_fragment:xM,gradientmap_pars_fragment:yM,lightmap_pars_fragment:SM,lights_lambert_fragment:MM,lights_lambert_pars_fragment:EM,lights_pars_begin:TM,lights_toon_fragment:AM,lights_toon_pars_fragment:RM,lights_phong_fragment:CM,lights_phong_pars_fragment:PM,lights_physical_fragment:bM,lights_physical_pars_fragment:LM,lights_fragment_begin:DM,lights_fragment_maps:UM,lights_fragment_end:IM,logdepthbuf_fragment:NM,logdepthbuf_pars_fragment:FM,logdepthbuf_pars_vertex:OM,logdepthbuf_vertex:kM,map_fragment:zM,map_pars_fragment:BM,map_particle_fragment:VM,map_particle_pars_fragment:HM,metalnessmap_fragment:GM,metalnessmap_pars_fragment:WM,morphinstance_vertex:XM,morphcolor_vertex:jM,morphnormal_vertex:YM,morphtarget_pars_vertex:qM,morphtarget_vertex:$M,normal_fragment_begin:KM,normal_fragment_maps:ZM,normal_pars_fragment:QM,normal_pars_vertex:JM,normal_vertex:eE,normalmap_pars_fragment:tE,clearcoat_normal_fragment_begin:nE,clearcoat_normal_fragment_maps:iE,clearcoat_pars_fragment:rE,iridescence_pars_fragment:sE,opaque_fragment:oE,packing:aE,premultiplied_alpha_fragment:lE,project_vertex:uE,dithering_fragment:cE,dithering_pars_fragment:fE,roughnessmap_fragment:dE,roughnessmap_pars_fragment:hE,shadowmap_pars_fragment:pE,shadowmap_pars_vertex:mE,shadowmap_vertex:gE,shadowmask_pars_fragment:_E,skinbase_vertex:vE,skinning_pars_vertex:xE,skinning_vertex:yE,skinnormal_vertex:SE,specularmap_fragment:ME,specularmap_pars_fragment:EE,tonemapping_fragment:TE,tonemapping_pars_fragment:wE,transmission_fragment:AE,transmission_pars_fragment:RE,uv_pars_fragment:CE,uv_pars_vertex:PE,uv_vertex:bE,worldpos_vertex:LE,background_vert:DE,background_frag:UE,backgroundCube_vert:IE,backgroundCube_frag:NE,cube_vert:FE,cube_frag:OE,depth_vert:kE,depth_frag:zE,distanceRGBA_vert:BE,distanceRGBA_frag:VE,equirect_vert:HE,equirect_frag:GE,linedashed_vert:WE,linedashed_frag:XE,meshbasic_vert:jE,meshbasic_frag:YE,meshlambert_vert:qE,meshlambert_frag:$E,meshmatcap_vert:KE,meshmatcap_frag:ZE,meshnormal_vert:QE,meshnormal_frag:JE,meshphong_vert:eT,meshphong_frag:tT,meshphysical_vert:nT,meshphysical_frag:iT,meshtoon_vert:rT,meshtoon_frag:sT,points_vert:oT,points_frag:aT,shadow_vert:lT,shadow_frag:uT,sprite_vert:cT,sprite_frag:fT},ce={common:{diffuse:{value:new Qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new Ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new Qe(16777215)},opacity:{value:1},center:{value:new Ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},qn={basic:{uniforms:Yt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:Yt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:Yt([ce.common,ce.specularmap,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,ce.lights,{emissive:{value:new Qe(0)},specular:{value:new Qe(1118481)},shininess:{value:30}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:Yt([ce.common,ce.envmap,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.roughnessmap,ce.metalnessmap,ce.fog,ce.lights,{emissive:{value:new Qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:Yt([ce.common,ce.aomap,ce.lightmap,ce.emissivemap,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.gradientmap,ce.fog,ce.lights,{emissive:{value:new Qe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:Yt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,ce.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:Yt([ce.points,ce.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:Yt([ce.common,ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:Yt([ce.common,ce.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:Yt([ce.common,ce.bumpmap,ce.normalmap,ce.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:Yt([ce.sprite,ce.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distanceRGBA:{uniforms:Yt([ce.common,ce.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distanceRGBA_vert,fragmentShader:Ve.distanceRGBA_frag},shadow:{uniforms:Yt([ce.lights,ce.fog,{color:{value:new Qe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};qn.physical={uniforms:Yt([qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new Ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new Qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new Ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new Qe(0)},specularColor:{value:new Qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new Ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Da={r:0,b:0,g:0},or=new Si,dT=new ut;function hT(t,e,n,i,r,s,o){const a=new Qe(0);let l=s===!0?0:1,u,f,d=null,h=0,p=null;function g(v){let y=v.isScene===!0?v.background:null;return y&&y.isTexture&&(y=(v.backgroundBlurriness>0?n:e).get(y)),y}function x(v){let y=!1;const C=g(v);C===null?c(a,l):C&&C.isColor&&(c(C,1),y=!0);const R=t.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(t.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function m(v,y){const C=g(y);C&&(C.isCubeTexture||C.mapping===Zl)?(f===void 0&&(f=new $t(new Go(1,1,1),new ti({name:"BackgroundCubeMaterial",uniforms:As(qn.backgroundCube.uniforms),vertexShader:qn.backgroundCube.vertexShader,fragmentShader:qn.backgroundCube.fragmentShader,side:Zt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),f.geometry.deleteAttribute("normal"),f.geometry.deleteAttribute("uv"),f.onBeforeRender=function(R,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(f.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(f)),or.copy(y.backgroundRotation),or.x*=-1,or.y*=-1,or.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(or.y*=-1,or.z*=-1),f.material.uniforms.envMap.value=C,f.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,f.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,f.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,f.material.uniforms.backgroundRotation.value.setFromMatrix4(dT.makeRotationFromEuler(or)),f.material.toneMapped=$e.getTransfer(C.colorSpace)!==rt,(d!==C||h!==C.version||p!==t.toneMapping)&&(f.material.needsUpdate=!0,d=C,h=C.version,p=t.toneMapping),f.layers.enableAll(),v.unshift(f,f.geometry,f.material,0,0,null)):C&&C.isTexture&&(u===void 0&&(u=new $t(new Ql(2,2),new ti({name:"BackgroundMaterial",uniforms:As(qn.background.uniforms),vertexShader:qn.background.vertexShader,fragmentShader:qn.background.fragmentShader,side:Ki,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),Object.defineProperty(u.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(u)),u.material.uniforms.t2D.value=C,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.toneMapped=$e.getTransfer(C.colorSpace)!==rt,C.matrixAutoUpdate===!0&&C.updateMatrix(),u.material.uniforms.uvTransform.value.copy(C.matrix),(d!==C||h!==C.version||p!==t.toneMapping)&&(u.material.needsUpdate=!0,d=C,h=C.version,p=t.toneMapping),u.layers.enableAll(),v.unshift(u,u.geometry,u.material,0,0,null))}function c(v,y){v.getRGB(Da,Z_(t)),i.buffers.color.setClear(Da.r,Da.g,Da.b,y,o)}function _(){f!==void 0&&(f.geometry.dispose(),f.material.dispose(),f=void 0),u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0)}return{getClearColor:function(){return a},setClearColor:function(v,y=1){a.set(v),l=y,c(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(v){l=v,c(a,l)},render:x,addToRenderList:m,dispose:_}}function pT(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,o=!1;function a(M,D,j,V,Q){let J=!1;const I=d(V,j,D);s!==I&&(s=I,u(s.object)),J=p(M,V,j,Q),J&&g(M,V,j,Q),Q!==null&&e.update(Q,t.ELEMENT_ARRAY_BUFFER),(J||o)&&(o=!1,y(M,D,j,V),Q!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function l(){return t.createVertexArray()}function u(M){return t.bindVertexArray(M)}function f(M){return t.deleteVertexArray(M)}function d(M,D,j){const V=j.wireframe===!0;let Q=i[M.id];Q===void 0&&(Q={},i[M.id]=Q);let J=Q[D.id];J===void 0&&(J={},Q[D.id]=J);let I=J[V];return I===void 0&&(I=h(l()),J[V]=I),I}function h(M){const D=[],j=[],V=[];for(let Q=0;Q<n;Q++)D[Q]=0,j[Q]=0,V[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:j,attributeDivisors:V,object:M,attributes:{},index:null}}function p(M,D,j,V){const Q=s.attributes,J=D.attributes;let I=0;const H=j.getAttributes();for(const L in H)if(H[L].location>=0){const q=Q[L];let K=J[L];if(K===void 0&&(L==="instanceMatrix"&&M.instanceMatrix&&(K=M.instanceMatrix),L==="instanceColor"&&M.instanceColor&&(K=M.instanceColor)),q===void 0||q.attribute!==K||K&&q.data!==K.data)return!0;I++}return s.attributesNum!==I||s.index!==V}function g(M,D,j,V){const Q={},J=D.attributes;let I=0;const H=j.getAttributes();for(const L in H)if(H[L].location>=0){let q=J[L];q===void 0&&(L==="instanceMatrix"&&M.instanceMatrix&&(q=M.instanceMatrix),L==="instanceColor"&&M.instanceColor&&(q=M.instanceColor));const K={};K.attribute=q,q&&q.data&&(K.data=q.data),Q[L]=K,I++}s.attributes=Q,s.attributesNum=I,s.index=V}function x(){const M=s.newAttributes;for(let D=0,j=M.length;D<j;D++)M[D]=0}function m(M){c(M,0)}function c(M,D){const j=s.newAttributes,V=s.enabledAttributes,Q=s.attributeDivisors;j[M]=1,V[M]===0&&(t.enableVertexAttribArray(M),V[M]=1),Q[M]!==D&&(t.vertexAttribDivisor(M,D),Q[M]=D)}function _(){const M=s.newAttributes,D=s.enabledAttributes;for(let j=0,V=D.length;j<V;j++)D[j]!==M[j]&&(t.disableVertexAttribArray(j),D[j]=0)}function v(M,D,j,V,Q,J,I){I===!0?t.vertexAttribIPointer(M,D,j,Q,J):t.vertexAttribPointer(M,D,j,V,Q,J)}function y(M,D,j,V){x();const Q=V.attributes,J=j.getAttributes(),I=D.defaultAttributeValues;for(const H in J){const L=J[H];if(L.location>=0){let G=Q[H];if(G===void 0&&(H==="instanceMatrix"&&M.instanceMatrix&&(G=M.instanceMatrix),H==="instanceColor"&&M.instanceColor&&(G=M.instanceColor)),G!==void 0){const q=G.normalized,K=G.itemSize,fe=e.get(G);if(fe===void 0)continue;const Ue=fe.buffer,W=fe.type,ie=fe.bytesPerElement,ge=W===t.INT||W===t.UNSIGNED_INT||G.gpuType===Bd;if(G.isInterleavedBufferAttribute){const oe=G.data,Re=oe.stride,He=G.offset;if(oe.isInstancedInterleavedBuffer){for(let Le=0;Le<L.locationSize;Le++)c(L.location+Le,oe.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let Le=0;Le<L.locationSize;Le++)m(L.location+Le);t.bindBuffer(t.ARRAY_BUFFER,Ue);for(let Le=0;Le<L.locationSize;Le++)v(L.location+Le,K/L.locationSize,W,q,Re*ie,(He+K/L.locationSize*Le)*ie,ge)}else{if(G.isInstancedBufferAttribute){for(let oe=0;oe<L.locationSize;oe++)c(L.location+oe,G.meshPerAttribute);M.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=G.meshPerAttribute*G.count)}else for(let oe=0;oe<L.locationSize;oe++)m(L.location+oe);t.bindBuffer(t.ARRAY_BUFFER,Ue);for(let oe=0;oe<L.locationSize;oe++)v(L.location+oe,K/L.locationSize,W,q,K*ie,K/L.locationSize*oe*ie,ge)}}else if(I!==void 0){const q=I[H];if(q!==void 0)switch(q.length){case 2:t.vertexAttrib2fv(L.location,q);break;case 3:t.vertexAttrib3fv(L.location,q);break;case 4:t.vertexAttrib4fv(L.location,q);break;default:t.vertexAttrib1fv(L.location,q)}}}}_()}function C(){P();for(const M in i){const D=i[M];for(const j in D){const V=D[j];for(const Q in V)f(V[Q].object),delete V[Q];delete D[j]}delete i[M]}}function R(M){if(i[M.id]===void 0)return;const D=i[M.id];for(const j in D){const V=D[j];for(const Q in V)f(V[Q].object),delete V[Q];delete D[j]}delete i[M.id]}function A(M){for(const D in i){const j=i[D];if(j[M.id]===void 0)continue;const V=j[M.id];for(const Q in V)f(V[Q].object),delete V[Q];delete j[M.id]}}function P(){T(),o=!0,s!==r&&(s=r,u(s.object))}function T(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:P,resetDefaultState:T,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:_}}function mT(t,e,n){let i;function r(u){i=u}function s(u,f){t.drawArrays(i,u,f),n.update(f,i,1)}function o(u,f,d){d!==0&&(t.drawArraysInstanced(i,u,f,d),n.update(f,i,d))}function a(u,f,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,u,0,f,0,d);let p=0;for(let g=0;g<d;g++)p+=f[g];n.update(p,i,1)}function l(u,f,d,h){if(d===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<u.length;g++)o(u[g],f[g],h[g]);else{p.multiDrawArraysInstancedWEBGL(i,u,0,f,0,h,0,d);let g=0;for(let x=0;x<d;x++)g+=f[x]*h[x];n.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function gT(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==Vn&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const P=A===ko&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==ei&&i.convert(A)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==hi&&!P)}function l(A){if(A==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let u=n.precision!==void 0?n.precision:"highp";const f=l(u);f!==u&&(console.warn("THREE.WebGLRenderer:",u,"not supported, using",f,"instead."),u=f);const d=n.logarithmicDepthBuffer===!0,h=n.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),c=t.getParameter(t.MAX_VERTEX_ATTRIBS),_=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),v=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,R=t.getParameter(t.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:u,logarithmicDepthBuffer:d,reverseDepthBuffer:h,maxTextures:p,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:c,maxVertexUniforms:_,maxVaryings:v,maxFragmentUniforms:y,vertexTextures:C,maxSamples:R}}function _T(t){const e=this;let n=null,i=0,r=!1,s=!1;const o=new cr,a=new ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const p=d.length!==0||h||i!==0||r;return r=h,i=d.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,h){n=f(d,h,0)},this.setState=function(d,h,p){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,c=t.get(d);if(!r||g===null||g.length===0||s&&!m)s?f(null):u();else{const _=s?0:i,v=_*4;let y=c.clippingState||null;l.value=y,y=f(g,h,v,p);for(let C=0;C!==v;++C)y[C]=n[C];c.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=_}};function u(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(d,h,p,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=l.value,g!==!0||m===null){const c=p+x*4,_=h.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<c)&&(m=new Float32Array(c));for(let v=0,y=p;v!==x;++v,y+=4)o.copy(d[v]).applyMatrix4(_,a),o.normal.toArray(m,y),m[y+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function vT(t){let e=new WeakMap;function n(o,a){return a===df?o.mapping=Es:a===hf&&(o.mapping=Ts),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===df||a===hf)if(e.has(o)){const l=e.get(o).texture;return n(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const u=new lS(l.height);return u.fromEquirectangularTexture(t,o),e.set(o,u),o.addEventListener("dispose",r),n(u.texture,o.mapping)}else return null}}return o}function r(o){const a=o.target;a.removeEventListener("dispose",r);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}const os=4,jp=[.125,.215,.35,.446,.526,.582],hr=20,tc=new rv,Yp=new Qe;let nc=null,ic=0,rc=0,sc=!1;const fr=(1+Math.sqrt(5))/2,Xr=1/fr,qp=[new O(-fr,Xr,0),new O(fr,Xr,0),new O(-Xr,0,fr),new O(Xr,0,fr),new O(0,fr,-Xr),new O(0,fr,Xr),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],xT=new O;class $p{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,n=0,i=.1,r=100,s={}){const{size:o=256,position:a=xT}=s;nc=this._renderer.getRenderTarget(),ic=this._renderer.getActiveCubeFace(),rc=this._renderer.getActiveMipmapLevel(),sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Qp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Zp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(nc,ic,rc),this._renderer.xr.enabled=sc,e.scissorTest=!1,Ua(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Es||e.mapping===Ts?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),nc=this._renderer.getRenderTarget(),ic=this._renderer.getActiveCubeFace(),rc=this._renderer.getActiveMipmapLevel(),sc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Kn,minFilter:Kn,generateMipmaps:!1,type:ko,format:Vn,colorSpace:ws,depthBuffer:!1},r=Kp(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Kp(e,n,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=yT(s)),this._blurMaterial=ST(s,e,n)}return r}_compileMaterial(e){const n=new $t(this._lodPlanes[0],e);this._renderer.compile(n,tc)}_sceneToCubeUV(e,n,i,r,s){const l=new wn(90,1,n,i),u=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,p=d.toneMapping;d.getClearColor(Yp),d.toneMapping=Yi,d.autoClear=!1;const g=new ss({name:"PMREM.Background",side:Zt,depthWrite:!1,depthTest:!1}),x=new $t(new Go,g);let m=!1;const c=e.background;c?c.isColor&&(g.color.copy(c),e.background=null,m=!0):(g.color.copy(Yp),m=!0);for(let _=0;_<6;_++){const v=_%3;v===0?(l.up.set(0,u[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[_],s.y,s.z)):v===1?(l.up.set(0,0,u[_]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[_],s.z)):(l.up.set(0,u[_],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[_]));const y=this._cubeSize;Ua(r,v*y,_>2?y:0,y,y),d.setRenderTarget(r),m&&d.render(x,l),d.render(e,l)}x.geometry.dispose(),x.material.dispose(),d.toneMapping=p,d.autoClear=h,e.background=c}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===Es||e.mapping===Ts;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Qp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Zp());const s=r?this._cubemapMaterial:this._equirectMaterial,o=new $t(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Ua(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(o,tc)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodPlanes.length;for(let s=1;s<r;s++){const o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=qp[(r-s-1)%qp.length];this._blur(e,s-1,s,o,a)}n.autoClear=i}_blur(e,n,i,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,n,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,o,a){const l=this._renderer,u=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const f=3,d=new $t(this._lodPlanes[r],u),h=u.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*hr-1),x=s/g,m=isFinite(s)?1+Math.floor(f*x):hr;m>hr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${hr}`);const c=[];let _=0;for(let A=0;A<hr;++A){const P=A/x,T=Math.exp(-P*P/2);c.push(T),A===0?_+=T:A<m&&(_+=2*T)}for(let A=0;A<c.length;A++)c[A]=c[A]/_;h.envMap.value=e.texture,h.samples.value=m,h.weights.value=c,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:v}=this;h.dTheta.value=g,h.mipInt.value=v-i;const y=this._sizeLods[r],C=3*y*(r>v-os?r-v+os:0),R=4*(this._cubeSize-y);Ua(n,C,R,3*y,2*y),l.setRenderTarget(n),l.render(d,tc)}}function yT(t){const e=[],n=[],i=[];let r=t;const s=t-os+1+jp.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);n.push(a);let l=1/a;o>t-os?l=jp[o-t+os-1]:o===0&&(l=0),i.push(l);const u=1/(a-2),f=-u,d=1+u,h=[f,f,d,f,d,d,f,f,d,d,f,d],p=6,g=6,x=3,m=2,c=1,_=new Float32Array(x*g*p),v=new Float32Array(m*g*p),y=new Float32Array(c*g*p);for(let R=0;R<p;R++){const A=R%3*2/3-1,P=R>2?0:-1,T=[A,P,0,A+2/3,P,0,A+2/3,P+1,0,A,P,0,A+2/3,P+1,0,A,P+1,0];_.set(T,x*g*R),v.set(h,m*g*R);const M=[R,R,R,R,R,R];y.set(M,c*g*R)}const C=new un;C.setAttribute("position",new Jn(_,x)),C.setAttribute("uv",new Jn(v,m)),C.setAttribute("faceIndex",new Jn(y,c)),e.push(C),r>os&&r--}return{lodPlanes:e,sizeLods:n,sigmas:i}}function Kp(t,e,n){const i=new Rr(t,e,n);return i.texture.mapping=Zl,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ua(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function ST(t,e,n){const i=new Float32Array(hr),r=new O(0,1,0);return new ti({name:"SphericalGaussianBlur",defines:{n:hr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Zd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function Zp(){return new ti({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Zd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function Qp(){return new ti({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Zd(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ji,depthTest:!1,depthWrite:!1})}function Zd(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function MT(t){let e=new WeakMap,n=null;function i(a){if(a&&a.isTexture){const l=a.mapping,u=l===df||l===hf,f=l===Es||l===Ts;if(u||f){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return n===null&&(n=new $p(t)),d=u?n.fromEquirectangular(a,d):n.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const p=a.image;return u&&p&&p.height>0||f&&p&&r(p)?(n===null&&(n=new $p(t)),d=u?n.fromEquirectangular(a):n.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",s),d.texture):null}}}return a}function r(a){let l=0;const u=6;for(let f=0;f<u;f++)a[f]!==void 0&&l++;return l===u}function s(a){const l=a.target;l.removeEventListener("dispose",s);const u=e.get(l);u!==void 0&&(e.delete(l),u.dispose())}function o(){e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:o}}function ET(t){const e={};function n(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=t.getExtension(i)}return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&nl("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function TT(t,e,n,i){const r={},s=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const g in h.attributes)e.remove(h.attributes[g]);h.removeEventListener("dispose",o),delete r[h.id];const p=s.get(h);p&&(e.remove(p),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function a(d,h){return r[h.id]===!0||(h.addEventListener("dispose",o),r[h.id]=!0,n.memory.geometries++),h}function l(d){const h=d.attributes;for(const p in h)e.update(h[p],t.ARRAY_BUFFER)}function u(d){const h=[],p=d.index,g=d.attributes.position;let x=0;if(p!==null){const _=p.array;x=p.version;for(let v=0,y=_.length;v<y;v+=3){const C=_[v+0],R=_[v+1],A=_[v+2];h.push(C,R,R,A,A,C)}}else if(g!==void 0){const _=g.array;x=g.version;for(let v=0,y=_.length/3-1;v<y;v+=3){const C=v+0,R=v+1,A=v+2;h.push(C,R,R,A,A,C)}}else return;const m=new(X_(h)?K_:$_)(h,1);m.version=x;const c=s.get(d);c&&e.remove(c),s.set(d,m)}function f(d){const h=s.get(d);if(h){const p=d.index;p!==null&&h.version<p.version&&u(d)}else u(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:f}}function wT(t,e,n){let i;function r(h){i=h}let s,o;function a(h){s=h.type,o=h.bytesPerElement}function l(h,p){t.drawElements(i,p,s,h*o),n.update(p,i,1)}function u(h,p,g){g!==0&&(t.drawElementsInstanced(i,p,s,h*o,g),n.update(p,i,g))}function f(h,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,s,h,0,g);let m=0;for(let c=0;c<g;c++)m+=p[c];n.update(m,i,1)}function d(h,p,g,x){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let c=0;c<h.length;c++)u(h[c]/o,p[c],x[c]);else{m.multiDrawElementsInstancedWEBGL(i,p,0,s,h,0,x,0,g);let c=0;for(let _=0;_<g;_++)c+=p[_]*x[_];n.update(c,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=u,this.renderMultiDraw=f,this.renderMultiDrawInstances=d}function AT(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(n.calls++,o){case t.TRIANGLES:n.triangles+=a*(s/3);break;case t.LINES:n.lines+=a*(s/2);break;case t.LINE_STRIP:n.lines+=a*(s-1);break;case t.LINE_LOOP:n.lines+=a*s;break;case t.POINTS:n.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function RT(t,e,n){const i=new WeakMap,r=new yt;function s(o,a,l){const u=o.morphTargetInfluences,f=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=f!==void 0?f.length:0;let h=i.get(a);if(h===void 0||h.count!==d){let M=function(){P.dispose(),i.delete(a),a.removeEventListener("dispose",M)};var p=M;h!==void 0&&h.texture.dispose();const g=a.morphAttributes.position!==void 0,x=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,c=a.morphAttributes.position||[],_=a.morphAttributes.normal||[],v=a.morphAttributes.color||[];let y=0;g===!0&&(y=1),x===!0&&(y=2),m===!0&&(y=3);let C=a.attributes.position.count*y,R=1;C>e.maxTextureSize&&(R=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const A=new Float32Array(C*R*4*d),P=new j_(A,C,R,d);P.type=hi,P.needsUpdate=!0;const T=y*4;for(let D=0;D<d;D++){const j=c[D],V=_[D],Q=v[D],J=C*R*4*D;for(let I=0;I<j.count;I++){const H=I*T;g===!0&&(r.fromBufferAttribute(j,I),A[J+H+0]=r.x,A[J+H+1]=r.y,A[J+H+2]=r.z,A[J+H+3]=0),x===!0&&(r.fromBufferAttribute(V,I),A[J+H+4]=r.x,A[J+H+5]=r.y,A[J+H+6]=r.z,A[J+H+7]=0),m===!0&&(r.fromBufferAttribute(Q,I),A[J+H+8]=r.x,A[J+H+9]=r.y,A[J+H+10]=r.z,A[J+H+11]=Q.itemSize===4?r.w:1)}}h={count:d,texture:P,size:new Ke(C,R)},i.set(a,h),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",o.morphTexture,n);else{let g=0;for(let m=0;m<u.length;m++)g+=u[m];const x=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",x),l.getUniforms().setValue(t,"morphTargetInfluences",u)}l.getUniforms().setValue(t,"morphTargetsTexture",h.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",h.size)}return{update:s}}function CT(t,e,n,i){let r=new WeakMap;function s(l){const u=i.render.frame,f=l.geometry,d=e.get(l,f);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==u&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const h=l.skeleton;r.get(h)!==u&&(h.update(),r.set(h,u))}return d}function o(){r=new WeakMap}function a(l){const u=l.target;u.removeEventListener("dispose",a),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:s,dispose:o}}const ov=new Qt,Jp=new nv(1,1),av=new j_,lv=new Xy,uv=new J_,em=[],tm=[],nm=new Float32Array(16),im=new Float32Array(9),rm=new Float32Array(4);function Ds(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=em[r];if(s===void 0&&(s=new Float32Array(r),em[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=n,t[o].toArray(s,a)}return s}function Ct(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Pt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Jl(t,e){let n=tm[e];n===void 0&&(n=new Int32Array(e),tm[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function PT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function bT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2fv(this.addr,e),Pt(n,e)}}function LT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Ct(n,e))return;t.uniform3fv(this.addr,e),Pt(n,e)}}function DT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4fv(this.addr,e),Pt(n,e)}}function UT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Pt(n,e)}else{if(Ct(n,i))return;rm.set(i),t.uniformMatrix2fv(this.addr,!1,rm),Pt(n,i)}}function IT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Pt(n,e)}else{if(Ct(n,i))return;im.set(i),t.uniformMatrix3fv(this.addr,!1,im),Pt(n,i)}}function NT(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Ct(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Pt(n,e)}else{if(Ct(n,i))return;nm.set(i),t.uniformMatrix4fv(this.addr,!1,nm),Pt(n,i)}}function FT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function OT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2iv(this.addr,e),Pt(n,e)}}function kT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ct(n,e))return;t.uniform3iv(this.addr,e),Pt(n,e)}}function zT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4iv(this.addr,e),Pt(n,e)}}function BT(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function VT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Ct(n,e))return;t.uniform2uiv(this.addr,e),Pt(n,e)}}function HT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Ct(n,e))return;t.uniform3uiv(this.addr,e),Pt(n,e)}}function GT(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Ct(n,e))return;t.uniform4uiv(this.addr,e),Pt(n,e)}}function WT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Jp.compareFunction=W_,s=Jp):s=ov,n.setTexture2D(e||s,r)}function XT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||lv,r)}function jT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||uv,r)}function YT(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||av,r)}function qT(t){switch(t){case 5126:return PT;case 35664:return bT;case 35665:return LT;case 35666:return DT;case 35674:return UT;case 35675:return IT;case 35676:return NT;case 5124:case 35670:return FT;case 35667:case 35671:return OT;case 35668:case 35672:return kT;case 35669:case 35673:return zT;case 5125:return BT;case 36294:return VT;case 36295:return HT;case 36296:return GT;case 35678:case 36198:case 36298:case 36306:case 35682:return WT;case 35679:case 36299:case 36307:return XT;case 35680:case 36300:case 36308:case 36293:return jT;case 36289:case 36303:case 36311:case 36292:return YT}}function $T(t,e){t.uniform1fv(this.addr,e)}function KT(t,e){const n=Ds(e,this.size,2);t.uniform2fv(this.addr,n)}function ZT(t,e){const n=Ds(e,this.size,3);t.uniform3fv(this.addr,n)}function QT(t,e){const n=Ds(e,this.size,4);t.uniform4fv(this.addr,n)}function JT(t,e){const n=Ds(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function e1(t,e){const n=Ds(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function t1(t,e){const n=Ds(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function n1(t,e){t.uniform1iv(this.addr,e)}function i1(t,e){t.uniform2iv(this.addr,e)}function r1(t,e){t.uniform3iv(this.addr,e)}function s1(t,e){t.uniform4iv(this.addr,e)}function o1(t,e){t.uniform1uiv(this.addr,e)}function a1(t,e){t.uniform2uiv(this.addr,e)}function l1(t,e){t.uniform3uiv(this.addr,e)}function u1(t,e){t.uniform4uiv(this.addr,e)}function c1(t,e,n){const i=this.cache,r=e.length,s=Jl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)n.setTexture2D(e[o]||ov,s[o])}function f1(t,e,n){const i=this.cache,r=e.length,s=Jl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)n.setTexture3D(e[o]||lv,s[o])}function d1(t,e,n){const i=this.cache,r=e.length,s=Jl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)n.setTextureCube(e[o]||uv,s[o])}function h1(t,e,n){const i=this.cache,r=e.length,s=Jl(n,r);Ct(i,s)||(t.uniform1iv(this.addr,s),Pt(i,s));for(let o=0;o!==r;++o)n.setTexture2DArray(e[o]||av,s[o])}function p1(t){switch(t){case 5126:return $T;case 35664:return KT;case 35665:return ZT;case 35666:return QT;case 35674:return JT;case 35675:return e1;case 35676:return t1;case 5124:case 35670:return n1;case 35667:case 35671:return i1;case 35668:case 35672:return r1;case 35669:case 35673:return s1;case 5125:return o1;case 36294:return a1;case 36295:return l1;case 36296:return u1;case 35678:case 36198:case 36298:case 36306:case 35682:return c1;case 35679:case 36299:case 36307:return f1;case 35680:case 36300:case 36308:case 36293:return d1;case 36289:case 36303:case 36311:case 36292:return h1}}class m1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=qT(n.type)}}class g1{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=p1(n.type)}}class _1{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,n[a.id],i)}}}const oc=/(\w+)(\])?(\[|\.)?/g;function sm(t,e){t.seq.push(e),t.map[e.id]=e}function v1(t,e,n){const i=t.name,r=i.length;for(oc.lastIndex=0;;){const s=oc.exec(i),o=oc.lastIndex;let a=s[1];const l=s[2]==="]",u=s[3];if(l&&(a=a|0),u===void 0||u==="["&&o+2===r){sm(n,u===void 0?new m1(a,t,e):new g1(a,t,e));break}else{let d=n.map[a];d===void 0&&(d=new _1(a),sm(n,d)),n=d}}}class il{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const s=e.getActiveUniform(n,r),o=e.getUniformLocation(n,s.name);v1(s,o,this)}}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,o=n.length;s!==o;++s){const a=n[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in n&&i.push(o)}return i}}function om(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const x1=37297;let y1=0;function S1(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let o=r;o<s;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${n[o]}`)}return i.join(`
`)}const am=new ze;function M1(t){$e._getMatrix(am,$e.workingColorSpace,t);const e=`mat3( ${am.elements.map(n=>n.toFixed(4))} )`;switch($e.getTransfer(t)){case Pl:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function lm(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=t.getShaderInfoLog(e).trim();if(i&&r==="")return"";const s=/ERROR: 0:(\d+)/.exec(r);if(s){const o=parseInt(s[1]);return n.toUpperCase()+`

`+r+`

`+S1(t.getShaderSource(e),o)}else return r}function E1(t,e){const n=M1(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}function T1(t,e){let n;switch(e){case gy:n="Linear";break;case _y:n="Reinhard";break;case vy:n="Cineon";break;case xy:n="ACESFilmic";break;case Sy:n="AgX";break;case My:n="Neutral";break;case yy:n="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),n="Linear"}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ia=new O;function w1(){$e.getLuminanceCoefficients(Ia);const t=Ia.x.toFixed(4),e=Ia.y.toFixed(4),n=Ia.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function A1(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Qs).join(`
`)}function R1(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function C1(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),o=s.name;let a=1;s.type===t.FLOAT_MAT2&&(a=2),s.type===t.FLOAT_MAT3&&(a=3),s.type===t.FLOAT_MAT4&&(a=4),n[o]={type:s.type,location:t.getAttribLocation(e,o),locationSize:a}}return n}function Qs(t){return t!==""}function um(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function cm(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const P1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wf(t){return t.replace(P1,L1)}const b1=new Map;function L1(t,e){let n=Ve[e];if(n===void 0){const i=b1.get(e);if(i!==void 0)n=Ve[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Wf(n)}const D1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function fm(t){return t.replace(D1,U1)}function U1(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function dm(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function I1(t){let e="SHADOWMAP_TYPE_BASIC";return t.shadowMapType===U_?e="SHADOWMAP_TYPE_PCF":t.shadowMapType===$x?e="SHADOWMAP_TYPE_PCF_SOFT":t.shadowMapType===li&&(e="SHADOWMAP_TYPE_VSM"),e}function N1(t){let e="ENVMAP_TYPE_CUBE";if(t.envMap)switch(t.envMapMode){case Es:case Ts:e="ENVMAP_TYPE_CUBE";break;case Zl:e="ENVMAP_TYPE_CUBE_UV";break}return e}function F1(t){let e="ENVMAP_MODE_REFLECTION";if(t.envMap)switch(t.envMapMode){case Ts:e="ENVMAP_MODE_REFRACTION";break}return e}function O1(t){let e="ENVMAP_BLENDING_NONE";if(t.envMap)switch(t.combine){case I_:e="ENVMAP_BLENDING_MULTIPLY";break;case py:e="ENVMAP_BLENDING_MIX";break;case my:e="ENVMAP_BLENDING_ADD";break}return e}function k1(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function z1(t,e,n,i){const r=t.getContext(),s=n.defines;let o=n.vertexShader,a=n.fragmentShader;const l=I1(n),u=N1(n),f=F1(n),d=O1(n),h=k1(n),p=A1(n),g=R1(s),x=r.createProgram();let m,c,_=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Qs).join(`
`),m.length>0&&(m+=`
`),c=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Qs).join(`
`),c.length>0&&(c+=`
`)):(m=[dm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Qs).join(`
`),c=[dm(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor||n.batchingColor?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",n.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Yi?"#define TONE_MAPPING":"",n.toneMapping!==Yi?Ve.tonemapping_pars_fragment:"",n.toneMapping!==Yi?T1("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,E1("linearToOutputTexel",n.outputColorSpace),w1(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Qs).join(`
`)),o=Wf(o),o=um(o,n),o=cm(o,n),a=Wf(a),a=um(a,n),a=cm(a,n),o=fm(o),a=fm(a),n.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,c=["#define varying in",n.glslVersion===yp?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===yp?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+c);const v=_+m+o,y=_+c+a,C=om(r,r.VERTEX_SHADER,v),R=om(r,r.FRAGMENT_SHADER,y);r.attachShader(x,C),r.attachShader(x,R),n.index0AttributeName!==void 0?r.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(D){if(t.debug.checkShaderErrors){const j=r.getProgramInfoLog(x).trim(),V=r.getShaderInfoLog(C).trim(),Q=r.getShaderInfoLog(R).trim();let J=!0,I=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(J=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,x,C,R);else{const H=lm(r,C,"vertex"),L=lm(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+j+`
`+H+`
`+L)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(V===""||Q==="")&&(I=!1);I&&(D.diagnostics={runnable:J,programLog:j,vertexShader:{log:V,prefix:m},fragmentShader:{log:Q,prefix:c}})}r.deleteShader(C),r.deleteShader(R),P=new il(r,x),T=C1(r,x)}let P;this.getUniforms=function(){return P===void 0&&A(this),P};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let M=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=r.getProgramParameter(x,x1)),M},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=y1++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=R,this}let B1=0;class V1{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new H1(e),n.set(e,i)),i}}class H1{constructor(e){this.id=B1++,this.code=e,this.usedTimes=0}}function G1(t,e,n,i,r,s,o){const a=new Y_,l=new V1,u=new Set,f=[],d=r.logarithmicDepthBuffer,h=r.vertexTextures;let p=r.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(T){return u.add(T),T===0?"uv":`uv${T}`}function m(T,M,D,j,V){const Q=j.fog,J=V.geometry,I=T.isMeshStandardMaterial?j.environment:null,H=(T.isMeshStandardMaterial?n:e).get(T.envMap||I),L=H&&H.mapping===Zl?H.image.height:null,G=g[T.type];T.precision!==null&&(p=r.getMaxPrecision(T.precision),p!==T.precision&&console.warn("THREE.WebGLProgram.getParameters:",T.precision,"not supported, using",p,"instead."));const q=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,K=q!==void 0?q.length:0;let fe=0;J.morphAttributes.position!==void 0&&(fe=1),J.morphAttributes.normal!==void 0&&(fe=2),J.morphAttributes.color!==void 0&&(fe=3);let Ue,W,ie,ge;if(G){const nt=qn[G];Ue=nt.vertexShader,W=nt.fragmentShader}else Ue=T.vertexShader,W=T.fragmentShader,l.update(T),ie=l.getVertexShaderID(T),ge=l.getFragmentShaderID(T);const oe=t.getRenderTarget(),Re=t.state.buffers.depth.getReversed(),He=V.isInstancedMesh===!0,Le=V.isBatchedMesh===!0,ct=!!T.map,st=!!T.matcap,Be=!!H,b=!!T.aoMap,wt=!!T.lightMap,Ge=!!T.bumpMap,De=!!T.normalMap,Ee=!!T.displacementMap,Ze=!!T.emissiveMap,we=!!T.metalnessMap,w=!!T.roughnessMap,S=T.anisotropy>0,k=T.clearcoat>0,$=T.dispersion>0,ee=T.iridescence>0,Y=T.sheen>0,Se=T.transmission>0,de=S&&!!T.anisotropyMap,Ae=k&&!!T.clearcoatMap,be=k&&!!T.clearcoatNormalMap,te=k&&!!T.clearcoatRoughnessMap,_e=ee&&!!T.iridescenceMap,le=ee&&!!T.iridescenceThicknessMap,Me=Y&&!!T.sheenColorMap,me=Y&&!!T.sheenRoughnessMap,Oe=!!T.specularMap,Ne=!!T.specularColorMap,tt=!!T.specularIntensityMap,U=Se&&!!T.transmissionMap,se=Se&&!!T.thicknessMap,X=!!T.gradientMap,Z=!!T.alphaMap,ue=T.alphaTest>0,pe=!!T.alphaHash,ke=!!T.extensions;let _t=Yi;T.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(_t=t.toneMapping);const zt={shaderID:G,shaderType:T.type,shaderName:T.name,vertexShader:Ue,fragmentShader:W,defines:T.defines,customVertexShaderID:ie,customFragmentShaderID:ge,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:p,batching:Le,batchingColor:Le&&V._colorsTexture!==null,instancing:He,instancingColor:He&&V.instanceColor!==null,instancingMorph:He&&V.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:oe===null?t.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:ws,alphaToCoverage:!!T.alphaToCoverage,map:ct,matcap:st,envMap:Be,envMapMode:Be&&H.mapping,envMapCubeUVHeight:L,aoMap:b,lightMap:wt,bumpMap:Ge,normalMap:De,displacementMap:h&&Ee,emissiveMap:Ze,normalMapObjectSpace:De&&T.normalMapType===Ry,normalMapTangentSpace:De&&T.normalMapType===Ay,metalnessMap:we,roughnessMap:w,anisotropy:S,anisotropyMap:de,clearcoat:k,clearcoatMap:Ae,clearcoatNormalMap:be,clearcoatRoughnessMap:te,dispersion:$,iridescence:ee,iridescenceMap:_e,iridescenceThicknessMap:le,sheen:Y,sheenColorMap:Me,sheenRoughnessMap:me,specularMap:Oe,specularColorMap:Ne,specularIntensityMap:tt,transmission:Se,transmissionMap:U,thicknessMap:se,gradientMap:X,opaque:T.transparent===!1&&T.blending===hs&&T.alphaToCoverage===!1,alphaMap:Z,alphaTest:ue,alphaHash:pe,combine:T.combine,mapUv:ct&&x(T.map.channel),aoMapUv:b&&x(T.aoMap.channel),lightMapUv:wt&&x(T.lightMap.channel),bumpMapUv:Ge&&x(T.bumpMap.channel),normalMapUv:De&&x(T.normalMap.channel),displacementMapUv:Ee&&x(T.displacementMap.channel),emissiveMapUv:Ze&&x(T.emissiveMap.channel),metalnessMapUv:we&&x(T.metalnessMap.channel),roughnessMapUv:w&&x(T.roughnessMap.channel),anisotropyMapUv:de&&x(T.anisotropyMap.channel),clearcoatMapUv:Ae&&x(T.clearcoatMap.channel),clearcoatNormalMapUv:be&&x(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&x(T.clearcoatRoughnessMap.channel),iridescenceMapUv:_e&&x(T.iridescenceMap.channel),iridescenceThicknessMapUv:le&&x(T.iridescenceThicknessMap.channel),sheenColorMapUv:Me&&x(T.sheenColorMap.channel),sheenRoughnessMapUv:me&&x(T.sheenRoughnessMap.channel),specularMapUv:Oe&&x(T.specularMap.channel),specularColorMapUv:Ne&&x(T.specularColorMap.channel),specularIntensityMapUv:tt&&x(T.specularIntensityMap.channel),transmissionMapUv:U&&x(T.transmissionMap.channel),thicknessMapUv:se&&x(T.thicknessMap.channel),alphaMapUv:Z&&x(T.alphaMap.channel),vertexTangents:!!J.attributes.tangent&&(De||S),vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!J.attributes.uv&&(ct||Z),fog:!!Q,useFog:T.fog===!0,fogExp2:!!Q&&Q.isFogExp2,flatShading:T.flatShading===!0,sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Re,skinning:V.isSkinnedMesh===!0,morphTargets:J.morphAttributes.position!==void 0,morphNormals:J.morphAttributes.normal!==void 0,morphColors:J.morphAttributes.color!==void 0,morphTargetsCount:K,morphTextureStride:fe,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:T.dithering,shadowMapEnabled:t.shadowMap.enabled&&D.length>0,shadowMapType:t.shadowMap.type,toneMapping:_t,decodeVideoTexture:ct&&T.map.isVideoTexture===!0&&$e.getTransfer(T.map.colorSpace)===rt,decodeVideoTextureEmissive:Ze&&T.emissiveMap.isVideoTexture===!0&&$e.getTransfer(T.emissiveMap.colorSpace)===rt,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===An,flipSided:T.side===Zt,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:ke&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ke&&T.extensions.multiDraw===!0||Le)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return zt.vertexUv1s=u.has(1),zt.vertexUv2s=u.has(2),zt.vertexUv3s=u.has(3),u.clear(),zt}function c(T){const M=[];if(T.shaderID?M.push(T.shaderID):(M.push(T.customVertexShaderID),M.push(T.customFragmentShaderID)),T.defines!==void 0)for(const D in T.defines)M.push(D),M.push(T.defines[D]);return T.isRawShaderMaterial===!1&&(_(M,T),v(M,T),M.push(t.outputColorSpace)),M.push(T.customProgramCacheKey),M.join()}function _(T,M){T.push(M.precision),T.push(M.outputColorSpace),T.push(M.envMapMode),T.push(M.envMapCubeUVHeight),T.push(M.mapUv),T.push(M.alphaMapUv),T.push(M.lightMapUv),T.push(M.aoMapUv),T.push(M.bumpMapUv),T.push(M.normalMapUv),T.push(M.displacementMapUv),T.push(M.emissiveMapUv),T.push(M.metalnessMapUv),T.push(M.roughnessMapUv),T.push(M.anisotropyMapUv),T.push(M.clearcoatMapUv),T.push(M.clearcoatNormalMapUv),T.push(M.clearcoatRoughnessMapUv),T.push(M.iridescenceMapUv),T.push(M.iridescenceThicknessMapUv),T.push(M.sheenColorMapUv),T.push(M.sheenRoughnessMapUv),T.push(M.specularMapUv),T.push(M.specularColorMapUv),T.push(M.specularIntensityMapUv),T.push(M.transmissionMapUv),T.push(M.thicknessMapUv),T.push(M.combine),T.push(M.fogExp2),T.push(M.sizeAttenuation),T.push(M.morphTargetsCount),T.push(M.morphAttributeCount),T.push(M.numDirLights),T.push(M.numPointLights),T.push(M.numSpotLights),T.push(M.numSpotLightMaps),T.push(M.numHemiLights),T.push(M.numRectAreaLights),T.push(M.numDirLightShadows),T.push(M.numPointLightShadows),T.push(M.numSpotLightShadows),T.push(M.numSpotLightShadowsWithMaps),T.push(M.numLightProbes),T.push(M.shadowMapType),T.push(M.toneMapping),T.push(M.numClippingPlanes),T.push(M.numClipIntersection),T.push(M.depthPacking)}function v(T,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),M.batchingColor&&a.enable(21),T.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reverseDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),T.push(a.mask)}function y(T){const M=g[T.type];let D;if(M){const j=qn[M];D=rS.clone(j.uniforms)}else D=T.uniforms;return D}function C(T,M){let D;for(let j=0,V=f.length;j<V;j++){const Q=f[j];if(Q.cacheKey===M){D=Q,++D.usedTimes;break}}return D===void 0&&(D=new z1(t,M,T,s),f.push(D)),D}function R(T){if(--T.usedTimes===0){const M=f.indexOf(T);f[M]=f[f.length-1],f.pop(),T.destroy()}}function A(T){l.remove(T)}function P(){l.dispose()}return{getParameters:m,getProgramCacheKey:c,getUniforms:y,acquireProgram:C,releaseProgram:R,releaseShaderCache:A,programs:f,dispose:P}}function W1(){let t=new WeakMap;function e(o){return t.has(o)}function n(o){let a=t.get(o);return a===void 0&&(a={},t.set(o,a)),a}function i(o){t.delete(o)}function r(o,a,l){t.get(o)[a]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function X1(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function hm(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function pm(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function o(d,h,p,g,x,m){let c=t[e];return c===void 0?(c={id:d.id,object:d,geometry:h,material:p,groupOrder:g,renderOrder:d.renderOrder,z:x,group:m},t[e]=c):(c.id=d.id,c.object=d,c.geometry=h,c.material=p,c.groupOrder=g,c.renderOrder=d.renderOrder,c.z=x,c.group=m),e++,c}function a(d,h,p,g,x,m){const c=o(d,h,p,g,x,m);p.transmission>0?i.push(c):p.transparent===!0?r.push(c):n.push(c)}function l(d,h,p,g,x,m){const c=o(d,h,p,g,x,m);p.transmission>0?i.unshift(c):p.transparent===!0?r.unshift(c):n.unshift(c)}function u(d,h){n.length>1&&n.sort(d||X1),i.length>1&&i.sort(h||hm),r.length>1&&r.sort(h||hm)}function f(){for(let d=e,h=t.length;d<h;d++){const p=t[d];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:f,sort:u}}function j1(){let t=new WeakMap;function e(i,r){const s=t.get(i);let o;return s===void 0?(o=new pm,t.set(i,[o])):r>=s.length?(o=new pm,s.push(o)):o=s[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}function Y1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new O,color:new Qe};break;case"SpotLight":n={position:new O,direction:new O,color:new Qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new O,color:new Qe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new O,skyColor:new Qe,groundColor:new Qe};break;case"RectAreaLight":n={color:new Qe,position:new O,halfWidth:new O,halfHeight:new O};break}return t[e.id]=n,n}}}function q1(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ke,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let $1=0;function K1(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function Z1(t){const e=new Y1,n=q1(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)i.probe.push(new O);const r=new O,s=new ut,o=new ut;function a(u){let f=0,d=0,h=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let p=0,g=0,x=0,m=0,c=0,_=0,v=0,y=0,C=0,R=0,A=0;u.sort(K1);for(let T=0,M=u.length;T<M;T++){const D=u[T],j=D.color,V=D.intensity,Q=D.distance,J=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)f+=j.r*V,d+=j.g*V,h+=j.b*V;else if(D.isLightProbe){for(let I=0;I<9;I++)i.probe[I].addScaledVector(D.sh.coefficients[I],V);A++}else if(D.isDirectionalLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const H=D.shadow,L=n.get(D);L.shadowIntensity=H.intensity,L.shadowBias=H.bias,L.shadowNormalBias=H.normalBias,L.shadowRadius=H.radius,L.shadowMapSize=H.mapSize,i.directionalShadow[p]=L,i.directionalShadowMap[p]=J,i.directionalShadowMatrix[p]=D.shadow.matrix,_++}i.directional[p]=I,p++}else if(D.isSpotLight){const I=e.get(D);I.position.setFromMatrixPosition(D.matrixWorld),I.color.copy(j).multiplyScalar(V),I.distance=Q,I.coneCos=Math.cos(D.angle),I.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),I.decay=D.decay,i.spot[x]=I;const H=D.shadow;if(D.map&&(i.spotLightMap[C]=D.map,C++,H.updateMatrices(D),D.castShadow&&R++),i.spotLightMatrix[x]=H.matrix,D.castShadow){const L=n.get(D);L.shadowIntensity=H.intensity,L.shadowBias=H.bias,L.shadowNormalBias=H.normalBias,L.shadowRadius=H.radius,L.shadowMapSize=H.mapSize,i.spotShadow[x]=L,i.spotShadowMap[x]=J,y++}x++}else if(D.isRectAreaLight){const I=e.get(D);I.color.copy(j).multiplyScalar(V),I.halfWidth.set(D.width*.5,0,0),I.halfHeight.set(0,D.height*.5,0),i.rectArea[m]=I,m++}else if(D.isPointLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity),I.distance=D.distance,I.decay=D.decay,D.castShadow){const H=D.shadow,L=n.get(D);L.shadowIntensity=H.intensity,L.shadowBias=H.bias,L.shadowNormalBias=H.normalBias,L.shadowRadius=H.radius,L.shadowMapSize=H.mapSize,L.shadowCameraNear=H.camera.near,L.shadowCameraFar=H.camera.far,i.pointShadow[g]=L,i.pointShadowMap[g]=J,i.pointShadowMatrix[g]=D.shadow.matrix,v++}i.point[g]=I,g++}else if(D.isHemisphereLight){const I=e.get(D);I.skyColor.copy(D.color).multiplyScalar(V),I.groundColor.copy(D.groundColor).multiplyScalar(V),i.hemi[c]=I,c++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ce.LTC_FLOAT_1,i.rectAreaLTC2=ce.LTC_FLOAT_2):(i.rectAreaLTC1=ce.LTC_HALF_1,i.rectAreaLTC2=ce.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=d,i.ambient[2]=h;const P=i.hash;(P.directionalLength!==p||P.pointLength!==g||P.spotLength!==x||P.rectAreaLength!==m||P.hemiLength!==c||P.numDirectionalShadows!==_||P.numPointShadows!==v||P.numSpotShadows!==y||P.numSpotMaps!==C||P.numLightProbes!==A)&&(i.directional.length=p,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=c,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=y+C-R,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=A,P.directionalLength=p,P.pointLength=g,P.spotLength=x,P.rectAreaLength=m,P.hemiLength=c,P.numDirectionalShadows=_,P.numPointShadows=v,P.numSpotShadows=y,P.numSpotMaps=C,P.numLightProbes=A,i.version=$1++)}function l(u,f){let d=0,h=0,p=0,g=0,x=0;const m=f.matrixWorldInverse;for(let c=0,_=u.length;c<_;c++){const v=u[c];if(v.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),d++}else if(v.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),p++}else if(v.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),o.identity(),s.copy(v.matrixWorld),s.premultiply(m),o.extractRotation(s),y.halfWidth.set(v.width*.5,0,0),y.halfHeight.set(0,v.height*.5,0),y.halfWidth.applyMatrix4(o),y.halfHeight.applyMatrix4(o),g++}else if(v.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(v.matrixWorld),y.position.applyMatrix4(m),h++}else if(v.isHemisphereLight){const y=i.hemi[x];y.direction.setFromMatrixPosition(v.matrixWorld),y.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function mm(t){const e=new Z1(t),n=[],i=[];function r(f){u.camera=f,n.length=0,i.length=0}function s(f){n.push(f)}function o(f){i.push(f)}function a(){e.setup(n)}function l(f){e.setupView(n,f)}const u={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:u,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Q1(t){let e=new WeakMap;function n(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new mm(t),e.set(r,[a])):s>=o.length?(a=new mm(t),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:n,dispose:i}}const J1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ew=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function tw(t,e,n){let i=new qd;const r=new Ke,s=new Ke,o=new yt,a=new yS({depthPacking:wy}),l=new SS,u={},f=n.maxTextureSize,d={[Ki]:Zt,[Zt]:Ki,[An]:An},h=new ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ke},radius:{value:4}},vertexShader:J1,fragmentShader:ew}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const g=new un;g.setAttribute("position",new Jn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new $t(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=U_;let c=this.type;this.render=function(R,A,P){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const T=t.getRenderTarget(),M=t.getActiveCubeFace(),D=t.getActiveMipmapLevel(),j=t.state;j.setBlending(ji),j.buffers.color.setClear(1,1,1,1),j.buffers.depth.setTest(!0),j.setScissorTest(!1);const V=c!==li&&this.type===li,Q=c===li&&this.type!==li;for(let J=0,I=R.length;J<I;J++){const H=R[J],L=H.shadow;if(L===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(L.autoUpdate===!1&&L.needsUpdate===!1)continue;r.copy(L.mapSize);const G=L.getFrameExtents();if(r.multiply(G),s.copy(L.mapSize),(r.x>f||r.y>f)&&(r.x>f&&(s.x=Math.floor(f/G.x),r.x=s.x*G.x,L.mapSize.x=s.x),r.y>f&&(s.y=Math.floor(f/G.y),r.y=s.y*G.y,L.mapSize.y=s.y)),L.map===null||V===!0||Q===!0){const K=this.type!==li?{minFilter:Wn,magFilter:Wn}:{};L.map!==null&&L.map.dispose(),L.map=new Rr(r.x,r.y,K),L.map.texture.name=H.name+".shadowMap",L.camera.updateProjectionMatrix()}t.setRenderTarget(L.map),t.clear();const q=L.getViewportCount();for(let K=0;K<q;K++){const fe=L.getViewport(K);o.set(s.x*fe.x,s.y*fe.y,s.x*fe.z,s.y*fe.w),j.viewport(o),L.updateMatrices(H,K),i=L.getFrustum(),y(A,P,L.camera,H,this.type)}L.isPointLightShadow!==!0&&this.type===li&&_(L,P),L.needsUpdate=!1}c=this.type,m.needsUpdate=!1,t.setRenderTarget(T,M,D)};function _(R,A){const P=e.update(x);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Rr(r.x,r.y)),h.uniforms.shadow_pass.value=R.map.texture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,t.setRenderTarget(R.mapPass),t.clear(),t.renderBufferDirect(A,null,P,h,x,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,t.setRenderTarget(R.map),t.clear(),t.renderBufferDirect(A,null,P,p,x,null)}function v(R,A,P,T){let M=null;const D=P.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)M=D;else if(M=P.isPointLight===!0?l:a,t.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const j=M.uuid,V=A.uuid;let Q=u[j];Q===void 0&&(Q={},u[j]=Q);let J=Q[V];J===void 0&&(J=M.clone(),Q[V]=J,A.addEventListener("dispose",C)),M=J}if(M.visible=A.visible,M.wireframe=A.wireframe,T===li?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:d[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,P.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const j=t.properties.get(M);j.light=P}return M}function y(R,A,P,T,M){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===li)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(P.matrixWorldInverse,R.matrixWorld);const V=e.update(R),Q=R.material;if(Array.isArray(Q)){const J=V.groups;for(let I=0,H=J.length;I<H;I++){const L=J[I],G=Q[L.materialIndex];if(G&&G.visible){const q=v(R,G,T,M);R.onBeforeShadow(t,R,A,P,V,q,L),t.renderBufferDirect(P,null,V,q,R,L),R.onAfterShadow(t,R,A,P,V,q,L)}}}else if(Q.visible){const J=v(R,Q,T,M);R.onBeforeShadow(t,R,A,P,V,J,null),t.renderBufferDirect(P,null,V,J,R,null),R.onAfterShadow(t,R,A,P,V,J,null)}}const j=R.children;for(let V=0,Q=j.length;V<Q;V++)y(j[V],A,P,T,M)}function C(R){R.target.removeEventListener("dispose",C);for(const P in u){const T=u[P],M=R.target.uuid;M in T&&(T[M].dispose(),delete T[M])}}}const nw={[sf]:of,[af]:cf,[lf]:ff,[Ms]:uf,[of]:sf,[cf]:af,[ff]:lf,[uf]:Ms};function iw(t,e){function n(){let U=!1;const se=new yt;let X=null;const Z=new yt(0,0,0,0);return{setMask:function(ue){X!==ue&&!U&&(t.colorMask(ue,ue,ue,ue),X=ue)},setLocked:function(ue){U=ue},setClear:function(ue,pe,ke,_t,zt){zt===!0&&(ue*=_t,pe*=_t,ke*=_t),se.set(ue,pe,ke,_t),Z.equals(se)===!1&&(t.clearColor(ue,pe,ke,_t),Z.copy(se))},reset:function(){U=!1,X=null,Z.set(-1,0,0,0)}}}function i(){let U=!1,se=!1,X=null,Z=null,ue=null;return{setReversed:function(pe){if(se!==pe){const ke=e.get("EXT_clip_control");pe?ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.ZERO_TO_ONE_EXT):ke.clipControlEXT(ke.LOWER_LEFT_EXT,ke.NEGATIVE_ONE_TO_ONE_EXT),se=pe;const _t=ue;ue=null,this.setClear(_t)}},getReversed:function(){return se},setTest:function(pe){pe?oe(t.DEPTH_TEST):Re(t.DEPTH_TEST)},setMask:function(pe){X!==pe&&!U&&(t.depthMask(pe),X=pe)},setFunc:function(pe){if(se&&(pe=nw[pe]),Z!==pe){switch(pe){case sf:t.depthFunc(t.NEVER);break;case of:t.depthFunc(t.ALWAYS);break;case af:t.depthFunc(t.LESS);break;case Ms:t.depthFunc(t.LEQUAL);break;case lf:t.depthFunc(t.EQUAL);break;case uf:t.depthFunc(t.GEQUAL);break;case cf:t.depthFunc(t.GREATER);break;case ff:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Z=pe}},setLocked:function(pe){U=pe},setClear:function(pe){ue!==pe&&(se&&(pe=1-pe),t.clearDepth(pe),ue=pe)},reset:function(){U=!1,X=null,Z=null,ue=null,se=!1}}}function r(){let U=!1,se=null,X=null,Z=null,ue=null,pe=null,ke=null,_t=null,zt=null;return{setTest:function(nt){U||(nt?oe(t.STENCIL_TEST):Re(t.STENCIL_TEST))},setMask:function(nt){se!==nt&&!U&&(t.stencilMask(nt),se=nt)},setFunc:function(nt,Ln,ni){(X!==nt||Z!==Ln||ue!==ni)&&(t.stencilFunc(nt,Ln,ni),X=nt,Z=Ln,ue=ni)},setOp:function(nt,Ln,ni){(pe!==nt||ke!==Ln||_t!==ni)&&(t.stencilOp(nt,Ln,ni),pe=nt,ke=Ln,_t=ni)},setLocked:function(nt){U=nt},setClear:function(nt){zt!==nt&&(t.clearStencil(nt),zt=nt)},reset:function(){U=!1,se=null,X=null,Z=null,ue=null,pe=null,ke=null,_t=null,zt=null}}}const s=new n,o=new i,a=new r,l=new WeakMap,u=new WeakMap;let f={},d={},h=new WeakMap,p=[],g=null,x=!1,m=null,c=null,_=null,v=null,y=null,C=null,R=null,A=new Qe(0,0,0),P=0,T=!1,M=null,D=null,j=null,V=null,Q=null;const J=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,H=0;const L=t.getParameter(t.VERSION);L.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(L)[1]),I=H>=1):L.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(L)[1]),I=H>=2);let G=null,q={};const K=t.getParameter(t.SCISSOR_BOX),fe=t.getParameter(t.VIEWPORT),Ue=new yt().fromArray(K),W=new yt().fromArray(fe);function ie(U,se,X,Z){const ue=new Uint8Array(4),pe=t.createTexture();t.bindTexture(U,pe),t.texParameteri(U,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(U,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let ke=0;ke<X;ke++)U===t.TEXTURE_3D||U===t.TEXTURE_2D_ARRAY?t.texImage3D(se,0,t.RGBA,1,1,Z,0,t.RGBA,t.UNSIGNED_BYTE,ue):t.texImage2D(se+ke,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ue);return pe}const ge={};ge[t.TEXTURE_2D]=ie(t.TEXTURE_2D,t.TEXTURE_2D,1),ge[t.TEXTURE_CUBE_MAP]=ie(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[t.TEXTURE_2D_ARRAY]=ie(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ge[t.TEXTURE_3D]=ie(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),oe(t.DEPTH_TEST),o.setFunc(Ms),Ge(!1),De(mp),oe(t.CULL_FACE),b(ji);function oe(U){f[U]!==!0&&(t.enable(U),f[U]=!0)}function Re(U){f[U]!==!1&&(t.disable(U),f[U]=!1)}function He(U,se){return d[U]!==se?(t.bindFramebuffer(U,se),d[U]=se,U===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=se),U===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=se),!0):!1}function Le(U,se){let X=p,Z=!1;if(U){X=h.get(se),X===void 0&&(X=[],h.set(se,X));const ue=U.textures;if(X.length!==ue.length||X[0]!==t.COLOR_ATTACHMENT0){for(let pe=0,ke=ue.length;pe<ke;pe++)X[pe]=t.COLOR_ATTACHMENT0+pe;X.length=ue.length,Z=!0}}else X[0]!==t.BACK&&(X[0]=t.BACK,Z=!0);Z&&t.drawBuffers(X)}function ct(U){return g!==U?(t.useProgram(U),g=U,!0):!1}const st={[dr]:t.FUNC_ADD,[Zx]:t.FUNC_SUBTRACT,[Qx]:t.FUNC_REVERSE_SUBTRACT};st[Jx]=t.MIN,st[ey]=t.MAX;const Be={[ty]:t.ZERO,[ny]:t.ONE,[iy]:t.SRC_COLOR,[nf]:t.SRC_ALPHA,[uy]:t.SRC_ALPHA_SATURATE,[ay]:t.DST_COLOR,[sy]:t.DST_ALPHA,[ry]:t.ONE_MINUS_SRC_COLOR,[rf]:t.ONE_MINUS_SRC_ALPHA,[ly]:t.ONE_MINUS_DST_COLOR,[oy]:t.ONE_MINUS_DST_ALPHA,[cy]:t.CONSTANT_COLOR,[fy]:t.ONE_MINUS_CONSTANT_COLOR,[dy]:t.CONSTANT_ALPHA,[hy]:t.ONE_MINUS_CONSTANT_ALPHA};function b(U,se,X,Z,ue,pe,ke,_t,zt,nt){if(U===ji){x===!0&&(Re(t.BLEND),x=!1);return}if(x===!1&&(oe(t.BLEND),x=!0),U!==Kx){if(U!==m||nt!==T){if((c!==dr||y!==dr)&&(t.blendEquation(t.FUNC_ADD),c=dr,y=dr),nt)switch(U){case hs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case tf:t.blendFunc(t.ONE,t.ONE);break;case gp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case _p:t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case hs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case tf:t.blendFunc(t.SRC_ALPHA,t.ONE);break;case gp:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case _p:t.blendFunc(t.ZERO,t.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}_=null,v=null,C=null,R=null,A.set(0,0,0),P=0,m=U,T=nt}return}ue=ue||se,pe=pe||X,ke=ke||Z,(se!==c||ue!==y)&&(t.blendEquationSeparate(st[se],st[ue]),c=se,y=ue),(X!==_||Z!==v||pe!==C||ke!==R)&&(t.blendFuncSeparate(Be[X],Be[Z],Be[pe],Be[ke]),_=X,v=Z,C=pe,R=ke),(_t.equals(A)===!1||zt!==P)&&(t.blendColor(_t.r,_t.g,_t.b,zt),A.copy(_t),P=zt),m=U,T=!1}function wt(U,se){U.side===An?Re(t.CULL_FACE):oe(t.CULL_FACE);let X=U.side===Zt;se&&(X=!X),Ge(X),U.blending===hs&&U.transparent===!1?b(ji):b(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);const Z=U.stencilWrite;a.setTest(Z),Z&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),Ze(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?oe(t.SAMPLE_ALPHA_TO_COVERAGE):Re(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(U){M!==U&&(U?t.frontFace(t.CW):t.frontFace(t.CCW),M=U)}function De(U){U!==Yx?(oe(t.CULL_FACE),U!==D&&(U===mp?t.cullFace(t.BACK):U===qx?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Re(t.CULL_FACE),D=U}function Ee(U){U!==j&&(I&&t.lineWidth(U),j=U)}function Ze(U,se,X){U?(oe(t.POLYGON_OFFSET_FILL),(V!==se||Q!==X)&&(t.polygonOffset(se,X),V=se,Q=X)):Re(t.POLYGON_OFFSET_FILL)}function we(U){U?oe(t.SCISSOR_TEST):Re(t.SCISSOR_TEST)}function w(U){U===void 0&&(U=t.TEXTURE0+J-1),G!==U&&(t.activeTexture(U),G=U)}function S(U,se,X){X===void 0&&(G===null?X=t.TEXTURE0+J-1:X=G);let Z=q[X];Z===void 0&&(Z={type:void 0,texture:void 0},q[X]=Z),(Z.type!==U||Z.texture!==se)&&(G!==X&&(t.activeTexture(X),G=X),t.bindTexture(U,se||ge[U]),Z.type=U,Z.texture=se)}function k(){const U=q[G];U!==void 0&&U.type!==void 0&&(t.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function $(){try{t.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{t.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Y(){try{t.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Se(){try{t.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function de(){try{t.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{t.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function be(){try{t.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{t.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function _e(){try{t.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function le(){try{t.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Me(U){Ue.equals(U)===!1&&(t.scissor(U.x,U.y,U.z,U.w),Ue.copy(U))}function me(U){W.equals(U)===!1&&(t.viewport(U.x,U.y,U.z,U.w),W.copy(U))}function Oe(U,se){let X=u.get(se);X===void 0&&(X=new WeakMap,u.set(se,X));let Z=X.get(U);Z===void 0&&(Z=t.getUniformBlockIndex(se,U.name),X.set(U,Z))}function Ne(U,se){const Z=u.get(se).get(U);l.get(se)!==Z&&(t.uniformBlockBinding(se,Z,U.__bindingPointIndex),l.set(se,Z))}function tt(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),o.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),f={},G=null,q={},d={},h=new WeakMap,p=[],g=null,x=!1,m=null,c=null,_=null,v=null,y=null,C=null,R=null,A=new Qe(0,0,0),P=0,T=!1,M=null,D=null,j=null,V=null,Q=null,Ue.set(0,0,t.canvas.width,t.canvas.height),W.set(0,0,t.canvas.width,t.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:oe,disable:Re,bindFramebuffer:He,drawBuffers:Le,useProgram:ct,setBlending:b,setMaterial:wt,setFlipSided:Ge,setCullFace:De,setLineWidth:Ee,setPolygonOffset:Ze,setScissorTest:we,activeTexture:w,bindTexture:S,unbindTexture:k,compressedTexImage2D:$,compressedTexImage3D:ee,texImage2D:_e,texImage3D:le,updateUBOMapping:Oe,uniformBlockBinding:Ne,texStorage2D:be,texStorage3D:te,texSubImage2D:Y,texSubImage3D:Se,compressedTexSubImage2D:de,compressedTexSubImage3D:Ae,scissor:Me,viewport:me,reset:tt}}function rw(t,e,n,i,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),u=new Ke,f=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,S){return p?new OffscreenCanvas(w,S):Do("canvas")}function x(w,S,k){let $=1;const ee=we(w);if((ee.width>k||ee.height>k)&&($=k/Math.max(ee.width,ee.height)),$<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const Y=Math.floor($*ee.width),Se=Math.floor($*ee.height);d===void 0&&(d=g(Y,Se));const de=S?g(Y,Se):d;return de.width=Y,de.height=Se,de.getContext("2d").drawImage(w,0,0,Y,Se),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+Y+"x"+Se+")."),de}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),w;return w}function m(w){return w.generateMipmaps}function c(w){t.generateMipmap(w)}function _(w){return w.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?t.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function v(w,S,k,$,ee=!1){if(w!==null){if(t[w]!==void 0)return t[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let Y=S;if(S===t.RED&&(k===t.FLOAT&&(Y=t.R32F),k===t.HALF_FLOAT&&(Y=t.R16F),k===t.UNSIGNED_BYTE&&(Y=t.R8)),S===t.RED_INTEGER&&(k===t.UNSIGNED_BYTE&&(Y=t.R8UI),k===t.UNSIGNED_SHORT&&(Y=t.R16UI),k===t.UNSIGNED_INT&&(Y=t.R32UI),k===t.BYTE&&(Y=t.R8I),k===t.SHORT&&(Y=t.R16I),k===t.INT&&(Y=t.R32I)),S===t.RG&&(k===t.FLOAT&&(Y=t.RG32F),k===t.HALF_FLOAT&&(Y=t.RG16F),k===t.UNSIGNED_BYTE&&(Y=t.RG8)),S===t.RG_INTEGER&&(k===t.UNSIGNED_BYTE&&(Y=t.RG8UI),k===t.UNSIGNED_SHORT&&(Y=t.RG16UI),k===t.UNSIGNED_INT&&(Y=t.RG32UI),k===t.BYTE&&(Y=t.RG8I),k===t.SHORT&&(Y=t.RG16I),k===t.INT&&(Y=t.RG32I)),S===t.RGB_INTEGER&&(k===t.UNSIGNED_BYTE&&(Y=t.RGB8UI),k===t.UNSIGNED_SHORT&&(Y=t.RGB16UI),k===t.UNSIGNED_INT&&(Y=t.RGB32UI),k===t.BYTE&&(Y=t.RGB8I),k===t.SHORT&&(Y=t.RGB16I),k===t.INT&&(Y=t.RGB32I)),S===t.RGBA_INTEGER&&(k===t.UNSIGNED_BYTE&&(Y=t.RGBA8UI),k===t.UNSIGNED_SHORT&&(Y=t.RGBA16UI),k===t.UNSIGNED_INT&&(Y=t.RGBA32UI),k===t.BYTE&&(Y=t.RGBA8I),k===t.SHORT&&(Y=t.RGBA16I),k===t.INT&&(Y=t.RGBA32I)),S===t.RGB&&k===t.UNSIGNED_INT_5_9_9_9_REV&&(Y=t.RGB9_E5),S===t.RGBA){const Se=ee?Pl:$e.getTransfer($);k===t.FLOAT&&(Y=t.RGBA32F),k===t.HALF_FLOAT&&(Y=t.RGBA16F),k===t.UNSIGNED_BYTE&&(Y=Se===rt?t.SRGB8_ALPHA8:t.RGBA8),k===t.UNSIGNED_SHORT_4_4_4_4&&(Y=t.RGBA4),k===t.UNSIGNED_SHORT_5_5_5_1&&(Y=t.RGB5_A1)}return(Y===t.R16F||Y===t.R32F||Y===t.RG16F||Y===t.RG32F||Y===t.RGBA16F||Y===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function y(w,S){let k;return w?S===null||S===Ar||S===Po?k=t.DEPTH24_STENCIL8:S===hi?k=t.DEPTH32F_STENCIL8:S===Co&&(k=t.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Ar||S===Po?k=t.DEPTH_COMPONENT24:S===hi?k=t.DEPTH_COMPONENT32F:S===Co&&(k=t.DEPTH_COMPONENT16),k}function C(w,S){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Wn&&w.minFilter!==Kn?Math.log2(Math.max(S.width,S.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?S.mipmaps.length:1}function R(w){const S=w.target;S.removeEventListener("dispose",R),P(S),S.isVideoTexture&&f.delete(S)}function A(w){const S=w.target;S.removeEventListener("dispose",A),M(S)}function P(w){const S=i.get(w);if(S.__webglInit===void 0)return;const k=w.source,$=h.get(k);if($){const ee=$[S.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&T(w),Object.keys($).length===0&&h.delete(k)}i.remove(w)}function T(w){const S=i.get(w);t.deleteTexture(S.__webglTexture);const k=w.source,$=h.get(k);delete $[S.__cacheKey],o.memory.textures--}function M(w){const S=i.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),i.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(S.__webglFramebuffer[$]))for(let ee=0;ee<S.__webglFramebuffer[$].length;ee++)t.deleteFramebuffer(S.__webglFramebuffer[$][ee]);else t.deleteFramebuffer(S.__webglFramebuffer[$]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[$])}else{if(Array.isArray(S.__webglFramebuffer))for(let $=0;$<S.__webglFramebuffer.length;$++)t.deleteFramebuffer(S.__webglFramebuffer[$]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let $=0;$<S.__webglColorRenderbuffer.length;$++)S.__webglColorRenderbuffer[$]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[$]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const k=w.textures;for(let $=0,ee=k.length;$<ee;$++){const Y=i.get(k[$]);Y.__webglTexture&&(t.deleteTexture(Y.__webglTexture),o.memory.textures--),i.remove(k[$])}i.remove(w)}let D=0;function j(){D=0}function V(){const w=D;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),D+=1,w}function Q(w){const S=[];return S.push(w.wrapS),S.push(w.wrapT),S.push(w.wrapR||0),S.push(w.magFilter),S.push(w.minFilter),S.push(w.anisotropy),S.push(w.internalFormat),S.push(w.format),S.push(w.type),S.push(w.generateMipmaps),S.push(w.premultiplyAlpha),S.push(w.flipY),S.push(w.unpackAlignment),S.push(w.colorSpace),S.join()}function J(w,S){const k=i.get(w);if(w.isVideoTexture&&Ee(w),w.isRenderTargetTexture===!1&&w.version>0&&k.__version!==w.version){const $=w.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{W(k,w,S);return}}n.bindTexture(t.TEXTURE_2D,k.__webglTexture,t.TEXTURE0+S)}function I(w,S){const k=i.get(w);if(w.version>0&&k.__version!==w.version){W(k,w,S);return}n.bindTexture(t.TEXTURE_2D_ARRAY,k.__webglTexture,t.TEXTURE0+S)}function H(w,S){const k=i.get(w);if(w.version>0&&k.__version!==w.version){W(k,w,S);return}n.bindTexture(t.TEXTURE_3D,k.__webglTexture,t.TEXTURE0+S)}function L(w,S){const k=i.get(w);if(w.version>0&&k.__version!==w.version){ie(k,w,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,k.__webglTexture,t.TEXTURE0+S)}const G={[pf]:t.REPEAT,[_r]:t.CLAMP_TO_EDGE,[mf]:t.MIRRORED_REPEAT},q={[Wn]:t.NEAREST,[Ey]:t.NEAREST_MIPMAP_NEAREST,[ua]:t.NEAREST_MIPMAP_LINEAR,[Kn]:t.LINEAR,[Cu]:t.LINEAR_MIPMAP_NEAREST,[vr]:t.LINEAR_MIPMAP_LINEAR},K={[Cy]:t.NEVER,[Iy]:t.ALWAYS,[Py]:t.LESS,[W_]:t.LEQUAL,[by]:t.EQUAL,[Uy]:t.GEQUAL,[Ly]:t.GREATER,[Dy]:t.NOTEQUAL};function fe(w,S){if(S.type===hi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Kn||S.magFilter===Cu||S.magFilter===ua||S.magFilter===vr||S.minFilter===Kn||S.minFilter===Cu||S.minFilter===ua||S.minFilter===vr)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(w,t.TEXTURE_WRAP_S,G[S.wrapS]),t.texParameteri(w,t.TEXTURE_WRAP_T,G[S.wrapT]),(w===t.TEXTURE_3D||w===t.TEXTURE_2D_ARRAY)&&t.texParameteri(w,t.TEXTURE_WRAP_R,G[S.wrapR]),t.texParameteri(w,t.TEXTURE_MAG_FILTER,q[S.magFilter]),t.texParameteri(w,t.TEXTURE_MIN_FILTER,q[S.minFilter]),S.compareFunction&&(t.texParameteri(w,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(w,t.TEXTURE_COMPARE_FUNC,K[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Wn||S.minFilter!==ua&&S.minFilter!==vr||S.type===hi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");t.texParameterf(w,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function Ue(w,S){let k=!1;w.__webglInit===void 0&&(w.__webglInit=!0,S.addEventListener("dispose",R));const $=S.source;let ee=h.get($);ee===void 0&&(ee={},h.set($,ee));const Y=Q(S);if(Y!==w.__cacheKey){ee[Y]===void 0&&(ee[Y]={texture:t.createTexture(),usedTimes:0},o.memory.textures++,k=!0),ee[Y].usedTimes++;const Se=ee[w.__cacheKey];Se!==void 0&&(ee[w.__cacheKey].usedTimes--,Se.usedTimes===0&&T(S)),w.__cacheKey=Y,w.__webglTexture=ee[Y].texture}return k}function W(w,S,k){let $=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&($=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&($=t.TEXTURE_3D);const ee=Ue(w,S),Y=S.source;n.bindTexture($,w.__webglTexture,t.TEXTURE0+k);const Se=i.get(Y);if(Y.version!==Se.__version||ee===!0){n.activeTexture(t.TEXTURE0+k);const de=$e.getPrimaries($e.workingColorSpace),Ae=S.colorSpace===Ni?null:$e.getPrimaries(S.colorSpace),be=S.colorSpace===Ni||de===Ae?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,be);let te=x(S.image,!1,r.maxTextureSize);te=Ze(S,te);const _e=s.convert(S.format,S.colorSpace),le=s.convert(S.type);let Me=v(S.internalFormat,_e,le,S.colorSpace,S.isVideoTexture);fe($,S);let me;const Oe=S.mipmaps,Ne=S.isVideoTexture!==!0,tt=Se.__version===void 0||ee===!0,U=Y.dataReady,se=C(S,te);if(S.isDepthTexture)Me=y(S.format===Lo,S.type),tt&&(Ne?n.texStorage2D(t.TEXTURE_2D,1,Me,te.width,te.height):n.texImage2D(t.TEXTURE_2D,0,Me,te.width,te.height,0,_e,le,null));else if(S.isDataTexture)if(Oe.length>0){Ne&&tt&&n.texStorage2D(t.TEXTURE_2D,se,Me,Oe[0].width,Oe[0].height);for(let X=0,Z=Oe.length;X<Z;X++)me=Oe[X],Ne?U&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,me.width,me.height,_e,le,me.data):n.texImage2D(t.TEXTURE_2D,X,Me,me.width,me.height,0,_e,le,me.data);S.generateMipmaps=!1}else Ne?(tt&&n.texStorage2D(t.TEXTURE_2D,se,Me,te.width,te.height),U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,te.width,te.height,_e,le,te.data)):n.texImage2D(t.TEXTURE_2D,0,Me,te.width,te.height,0,_e,le,te.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Ne&&tt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,se,Me,Oe[0].width,Oe[0].height,te.depth);for(let X=0,Z=Oe.length;X<Z;X++)if(me=Oe[X],S.format!==Vn)if(_e!==null)if(Ne){if(U)if(S.layerUpdates.size>0){const ue=Xp(me.width,me.height,S.format,S.type);for(const pe of S.layerUpdates){const ke=me.data.subarray(pe*ue/me.data.BYTES_PER_ELEMENT,(pe+1)*ue/me.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,pe,me.width,me.height,1,_e,ke)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,te.depth,_e,me.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,X,Me,me.width,me.height,te.depth,0,me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ne?U&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,X,0,0,0,me.width,me.height,te.depth,_e,le,me.data):n.texImage3D(t.TEXTURE_2D_ARRAY,X,Me,me.width,me.height,te.depth,0,_e,le,me.data)}else{Ne&&tt&&n.texStorage2D(t.TEXTURE_2D,se,Me,Oe[0].width,Oe[0].height);for(let X=0,Z=Oe.length;X<Z;X++)me=Oe[X],S.format!==Vn?_e!==null?Ne?U&&n.compressedTexSubImage2D(t.TEXTURE_2D,X,0,0,me.width,me.height,_e,me.data):n.compressedTexImage2D(t.TEXTURE_2D,X,Me,me.width,me.height,0,me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ne?U&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,me.width,me.height,_e,le,me.data):n.texImage2D(t.TEXTURE_2D,X,Me,me.width,me.height,0,_e,le,me.data)}else if(S.isDataArrayTexture)if(Ne){if(tt&&n.texStorage3D(t.TEXTURE_2D_ARRAY,se,Me,te.width,te.height,te.depth),U)if(S.layerUpdates.size>0){const X=Xp(te.width,te.height,S.format,S.type);for(const Z of S.layerUpdates){const ue=te.data.subarray(Z*X/te.data.BYTES_PER_ELEMENT,(Z+1)*X/te.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Z,te.width,te.height,1,_e,le,ue)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,_e,le,te.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Me,te.width,te.height,te.depth,0,_e,le,te.data);else if(S.isData3DTexture)Ne?(tt&&n.texStorage3D(t.TEXTURE_3D,se,Me,te.width,te.height,te.depth),U&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,_e,le,te.data)):n.texImage3D(t.TEXTURE_3D,0,Me,te.width,te.height,te.depth,0,_e,le,te.data);else if(S.isFramebufferTexture){if(tt)if(Ne)n.texStorage2D(t.TEXTURE_2D,se,Me,te.width,te.height);else{let X=te.width,Z=te.height;for(let ue=0;ue<se;ue++)n.texImage2D(t.TEXTURE_2D,ue,Me,X,Z,0,_e,le,null),X>>=1,Z>>=1}}else if(Oe.length>0){if(Ne&&tt){const X=we(Oe[0]);n.texStorage2D(t.TEXTURE_2D,se,Me,X.width,X.height)}for(let X=0,Z=Oe.length;X<Z;X++)me=Oe[X],Ne?U&&n.texSubImage2D(t.TEXTURE_2D,X,0,0,_e,le,me):n.texImage2D(t.TEXTURE_2D,X,Me,_e,le,me);S.generateMipmaps=!1}else if(Ne){if(tt){const X=we(te);n.texStorage2D(t.TEXTURE_2D,se,Me,X.width,X.height)}U&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,_e,le,te)}else n.texImage2D(t.TEXTURE_2D,0,Me,_e,le,te);m(S)&&c($),Se.__version=Y.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function ie(w,S,k){if(S.image.length!==6)return;const $=Ue(w,S),ee=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,w.__webglTexture,t.TEXTURE0+k);const Y=i.get(ee);if(ee.version!==Y.__version||$===!0){n.activeTexture(t.TEXTURE0+k);const Se=$e.getPrimaries($e.workingColorSpace),de=S.colorSpace===Ni?null:$e.getPrimaries(S.colorSpace),Ae=S.colorSpace===Ni||Se===de?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);const be=S.isCompressedTexture||S.image[0].isCompressedTexture,te=S.image[0]&&S.image[0].isDataTexture,_e=[];for(let Z=0;Z<6;Z++)!be&&!te?_e[Z]=x(S.image[Z],!0,r.maxCubemapSize):_e[Z]=te?S.image[Z].image:S.image[Z],_e[Z]=Ze(S,_e[Z]);const le=_e[0],Me=s.convert(S.format,S.colorSpace),me=s.convert(S.type),Oe=v(S.internalFormat,Me,me,S.colorSpace),Ne=S.isVideoTexture!==!0,tt=Y.__version===void 0||$===!0,U=ee.dataReady;let se=C(S,le);fe(t.TEXTURE_CUBE_MAP,S);let X;if(be){Ne&&tt&&n.texStorage2D(t.TEXTURE_CUBE_MAP,se,Oe,le.width,le.height);for(let Z=0;Z<6;Z++){X=_e[Z].mipmaps;for(let ue=0;ue<X.length;ue++){const pe=X[ue];S.format!==Vn?Me!==null?Ne?U&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ue,0,0,pe.width,pe.height,Me,pe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ue,Oe,pe.width,pe.height,0,pe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ne?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ue,0,0,pe.width,pe.height,Me,me,pe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ue,Oe,pe.width,pe.height,0,Me,me,pe.data)}}}else{if(X=S.mipmaps,Ne&&tt){X.length>0&&se++;const Z=we(_e[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,se,Oe,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(te){Ne?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,_e[Z].width,_e[Z].height,Me,me,_e[Z].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Oe,_e[Z].width,_e[Z].height,0,Me,me,_e[Z].data);for(let ue=0;ue<X.length;ue++){const ke=X[ue].image[Z].image;Ne?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ue+1,0,0,ke.width,ke.height,Me,me,ke.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ue+1,Oe,ke.width,ke.height,0,Me,me,ke.data)}}else{Ne?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Me,me,_e[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Oe,Me,me,_e[Z]);for(let ue=0;ue<X.length;ue++){const pe=X[ue];Ne?U&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ue+1,0,0,Me,me,pe.image[Z]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ue+1,Oe,Me,me,pe.image[Z])}}}m(S)&&c(t.TEXTURE_CUBE_MAP),Y.__version=ee.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function ge(w,S,k,$,ee,Y){const Se=s.convert(k.format,k.colorSpace),de=s.convert(k.type),Ae=v(k.internalFormat,Se,de,k.colorSpace),be=i.get(S),te=i.get(k);if(te.__renderTarget=S,!be.__hasExternalTextures){const _e=Math.max(1,S.width>>Y),le=Math.max(1,S.height>>Y);ee===t.TEXTURE_3D||ee===t.TEXTURE_2D_ARRAY?n.texImage3D(ee,Y,Ae,_e,le,S.depth,0,Se,de,null):n.texImage2D(ee,Y,Ae,_e,le,0,Se,de,null)}n.bindFramebuffer(t.FRAMEBUFFER,w),De(S)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,$,ee,te.__webglTexture,0,Ge(S)):(ee===t.TEXTURE_2D||ee>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,$,ee,te.__webglTexture,Y),n.bindFramebuffer(t.FRAMEBUFFER,null)}function oe(w,S,k){if(t.bindRenderbuffer(t.RENDERBUFFER,w),S.depthBuffer){const $=S.depthTexture,ee=$&&$.isDepthTexture?$.type:null,Y=y(S.stencilBuffer,ee),Se=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,de=Ge(S);De(S)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,de,Y,S.width,S.height):k?t.renderbufferStorageMultisample(t.RENDERBUFFER,de,Y,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,Y,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,Se,t.RENDERBUFFER,w)}else{const $=S.textures;for(let ee=0;ee<$.length;ee++){const Y=$[ee],Se=s.convert(Y.format,Y.colorSpace),de=s.convert(Y.type),Ae=v(Y.internalFormat,Se,de,Y.colorSpace),be=Ge(S);k&&De(S)===!1?t.renderbufferStorageMultisample(t.RENDERBUFFER,be,Ae,S.width,S.height):De(S)?a.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,be,Ae,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,Ae,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Re(w,S){if(S&&S.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(n.bindFramebuffer(t.FRAMEBUFFER,w),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const $=i.get(S.depthTexture);$.__renderTarget=S,(!$.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),J(S.depthTexture,0);const ee=$.__webglTexture,Y=Ge(S);if(S.depthTexture.format===bo)De(S)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0,Y):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,ee,0);else if(S.depthTexture.format===Lo)De(S)?a.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0,Y):t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,ee,0);else throw new Error("Unknown depthTexture format")}function He(w){const S=i.get(w),k=w.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==w.depthTexture){const $=w.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),$){const ee=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,$.removeEventListener("dispose",ee)};$.addEventListener("dispose",ee),S.__depthDisposeCallback=ee}S.__boundDepthTexture=$}if(w.depthTexture&&!S.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const $=w.texture.mipmaps;$&&$.length>0?Re(S.__webglFramebuffer[0],w):Re(S.__webglFramebuffer,w)}else if(k){S.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[$]),S.__webglDepthbuffer[$]===void 0)S.__webglDepthbuffer[$]=t.createRenderbuffer(),oe(S.__webglDepthbuffer[$],w,!1);else{const ee=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer[$];t.bindRenderbuffer(t.RENDERBUFFER,Y),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,Y)}}else{const $=w.texture.mipmaps;if($&&$.length>0?n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),oe(S.__webglDepthbuffer,w,!1);else{const ee=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Y=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,Y),t.framebufferRenderbuffer(t.FRAMEBUFFER,ee,t.RENDERBUFFER,Y)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Le(w,S,k){const $=i.get(w);S!==void 0&&ge($.__webglFramebuffer,w,w.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),k!==void 0&&He(w)}function ct(w){const S=w.texture,k=i.get(w),$=i.get(S);w.addEventListener("dispose",A);const ee=w.textures,Y=w.isWebGLCubeRenderTarget===!0,Se=ee.length>1;if(Se||($.__webglTexture===void 0&&($.__webglTexture=t.createTexture()),$.__version=S.version,o.memory.textures++),Y){k.__webglFramebuffer=[];for(let de=0;de<6;de++)if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer[de]=[];for(let Ae=0;Ae<S.mipmaps.length;Ae++)k.__webglFramebuffer[de][Ae]=t.createFramebuffer()}else k.__webglFramebuffer[de]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){k.__webglFramebuffer=[];for(let de=0;de<S.mipmaps.length;de++)k.__webglFramebuffer[de]=t.createFramebuffer()}else k.__webglFramebuffer=t.createFramebuffer();if(Se)for(let de=0,Ae=ee.length;de<Ae;de++){const be=i.get(ee[de]);be.__webglTexture===void 0&&(be.__webglTexture=t.createTexture(),o.memory.textures++)}if(w.samples>0&&De(w)===!1){k.__webglMultisampledFramebuffer=t.createFramebuffer(),k.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let de=0;de<ee.length;de++){const Ae=ee[de];k.__webglColorRenderbuffer[de]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,k.__webglColorRenderbuffer[de]);const be=s.convert(Ae.format,Ae.colorSpace),te=s.convert(Ae.type),_e=v(Ae.internalFormat,be,te,Ae.colorSpace,w.isXRRenderTarget===!0),le=Ge(w);t.renderbufferStorageMultisample(t.RENDERBUFFER,le,_e,w.width,w.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+de,t.RENDERBUFFER,k.__webglColorRenderbuffer[de])}t.bindRenderbuffer(t.RENDERBUFFER,null),w.depthBuffer&&(k.__webglDepthRenderbuffer=t.createRenderbuffer(),oe(k.__webglDepthRenderbuffer,w,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(Y){n.bindTexture(t.TEXTURE_CUBE_MAP,$.__webglTexture),fe(t.TEXTURE_CUBE_MAP,S);for(let de=0;de<6;de++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ae=0;Ae<S.mipmaps.length;Ae++)ge(k.__webglFramebuffer[de][Ae],w,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+de,Ae);else ge(k.__webglFramebuffer[de],w,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+de,0);m(S)&&c(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Se){for(let de=0,Ae=ee.length;de<Ae;de++){const be=ee[de],te=i.get(be);n.bindTexture(t.TEXTURE_2D,te.__webglTexture),fe(t.TEXTURE_2D,be),ge(k.__webglFramebuffer,w,be,t.COLOR_ATTACHMENT0+de,t.TEXTURE_2D,0),m(be)&&c(t.TEXTURE_2D)}n.unbindTexture()}else{let de=t.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(de=w.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(de,$.__webglTexture),fe(de,S),S.mipmaps&&S.mipmaps.length>0)for(let Ae=0;Ae<S.mipmaps.length;Ae++)ge(k.__webglFramebuffer[Ae],w,S,t.COLOR_ATTACHMENT0,de,Ae);else ge(k.__webglFramebuffer,w,S,t.COLOR_ATTACHMENT0,de,0);m(S)&&c(de),n.unbindTexture()}w.depthBuffer&&He(w)}function st(w){const S=w.textures;for(let k=0,$=S.length;k<$;k++){const ee=S[k];if(m(ee)){const Y=_(w),Se=i.get(ee).__webglTexture;n.bindTexture(Y,Se),c(Y),n.unbindTexture()}}}const Be=[],b=[];function wt(w){if(w.samples>0){if(De(w)===!1){const S=w.textures,k=w.width,$=w.height;let ee=t.COLOR_BUFFER_BIT;const Y=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,Se=i.get(w),de=S.length>1;if(de)for(let be=0;be<S.length;be++)n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+be,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+be,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,Se.__webglMultisampledFramebuffer);const Ae=w.texture.mipmaps;Ae&&Ae.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglFramebuffer);for(let be=0;be<S.length;be++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ee|=t.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ee|=t.STENCIL_BUFFER_BIT)),de){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,Se.__webglColorRenderbuffer[be]);const te=i.get(S[be]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,te,0)}t.blitFramebuffer(0,0,k,$,0,0,k,$,ee,t.NEAREST),l===!0&&(Be.length=0,b.length=0,Be.push(t.COLOR_ATTACHMENT0+be),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Be.push(Y),b.push(Y),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,b)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Be))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),de)for(let be=0;be<S.length;be++){n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+be,t.RENDERBUFFER,Se.__webglColorRenderbuffer[be]);const te=i.get(S[be]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,Se.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+be,t.TEXTURE_2D,te,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,Se.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){const S=w.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function Ge(w){return Math.min(r.maxSamples,w.samples)}function De(w){const S=i.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Ee(w){const S=o.render.frame;f.get(w)!==S&&(f.set(w,S),w.update())}function Ze(w,S){const k=w.colorSpace,$=w.format,ee=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||k!==ws&&k!==Ni&&($e.getTransfer(k)===rt?($!==Vn||ee!==ei)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),S}function we(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(u.width=w.naturalWidth||w.width,u.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(u.width=w.displayWidth,u.height=w.displayHeight):(u.width=w.width,u.height=w.height),u}this.allocateTextureUnit=V,this.resetTextureUnits=j,this.setTexture2D=J,this.setTexture2DArray=I,this.setTexture3D=H,this.setTextureCube=L,this.rebindTextures=Le,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=st,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=He,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=De}function sw(t,e){function n(i,r=Ni){let s;const o=$e.getTransfer(r);if(i===ei)return t.UNSIGNED_BYTE;if(i===Vd)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Hd)return t.UNSIGNED_SHORT_5_5_5_1;if(i===k_)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===F_)return t.BYTE;if(i===O_)return t.SHORT;if(i===Co)return t.UNSIGNED_SHORT;if(i===Bd)return t.INT;if(i===Ar)return t.UNSIGNED_INT;if(i===hi)return t.FLOAT;if(i===ko)return t.HALF_FLOAT;if(i===z_)return t.ALPHA;if(i===B_)return t.RGB;if(i===Vn)return t.RGBA;if(i===bo)return t.DEPTH_COMPONENT;if(i===Lo)return t.DEPTH_STENCIL;if(i===V_)return t.RED;if(i===Gd)return t.RED_INTEGER;if(i===H_)return t.RG;if(i===Wd)return t.RG_INTEGER;if(i===Xd)return t.RGBA_INTEGER;if(i===Za||i===Qa||i===Ja||i===el)if(o===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Za)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qa)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Ja)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===el)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Za)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qa)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Ja)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===el)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===gf||i===_f||i===vf||i===xf)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===gf)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_f)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===vf)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===xf)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===yf||i===Sf||i===Mf)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===yf||i===Sf)return o===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Mf)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Ef||i===Tf||i===wf||i===Af||i===Rf||i===Cf||i===Pf||i===bf||i===Lf||i===Df||i===Uf||i===If||i===Nf||i===Ff)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Ef)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Tf)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===wf)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Af)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Rf)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Cf)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Pf)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===bf)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Lf)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Df)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Uf)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===If)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Nf)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ff)return o===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===tl||i===Of||i===kf)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===tl)return o===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Of)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===kf)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===G_||i===zf||i===Bf||i===Vf)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===tl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===zf)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Bf)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Vf)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Po?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const ow=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,aw=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class lw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n,i){if(this.texture===null){const r=new Qt,s=e.properties.get(r);s.__webglTexture=n.texture,(n.depthNear!==i.depthNear||n.depthFar!==i.depthFar)&&(this.depthNear=n.depthNear,this.depthFar=n.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new ti({vertexShader:ow,fragmentShader:aw,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new $t(new Ql(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class uw extends bs{constructor(e,n){super();const i=this;let r=null,s=1,o=null,a="local-floor",l=1,u=null,f=null,d=null,h=null,p=null,g=null;const x=new lw,m=n.getContextAttributes();let c=null,_=null;const v=[],y=[],C=new Ke;let R=null;const A=new wn;A.viewport=new yt;const P=new wn;P.viewport=new yt;const T=[A,P],M=new bS;let D=null,j=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let ie=v[W];return ie===void 0&&(ie=new Ku,v[W]=ie),ie.getTargetRaySpace()},this.getControllerGrip=function(W){let ie=v[W];return ie===void 0&&(ie=new Ku,v[W]=ie),ie.getGripSpace()},this.getHand=function(W){let ie=v[W];return ie===void 0&&(ie=new Ku,v[W]=ie),ie.getHandSpace()};function V(W){const ie=y.indexOf(W.inputSource);if(ie===-1)return;const ge=v[ie];ge!==void 0&&(ge.update(W.inputSource,W.frame,u||o),ge.dispatchEvent({type:W.type,data:W.inputSource}))}function Q(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",Q),r.removeEventListener("inputsourceschange",J);for(let W=0;W<v.length;W++){const ie=y[W];ie!==null&&(y[W]=null,v[W].disconnect(ie))}D=null,j=null,x.reset(),e.setRenderTarget(c),p=null,h=null,d=null,r=null,_=null,Ue.stop(),i.isPresenting=!1,e.setPixelRatio(R),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){s=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return u||o},this.setReferenceSpace=function(W){u=W},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(W){if(r=W,r!==null){if(c=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",Q),r.addEventListener("inputsourceschange",J),m.xrCompatible!==!0&&await n.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(C),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,oe=null,Re=null;m.depth&&(Re=m.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ge=m.stencil?Lo:bo,oe=m.stencil?Po:Ar);const He={colorFormat:n.RGBA8,depthFormat:Re,scaleFactor:s};d=new XRWebGLBinding(r,n),h=d.createProjectionLayer(He),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new Rr(h.textureWidth,h.textureHeight,{format:Vn,type:ei,depthTexture:new nv(h.textureWidth,h.textureHeight,oe,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ge={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(r,n,ge),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new Rr(p.framebufferWidth,p.framebufferHeight,{format:Vn,type:ei,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),u=null,o=await r.requestReferenceSpace(a),Ue.setContext(r),Ue.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return x.getDepthTexture()};function J(W){for(let ie=0;ie<W.removed.length;ie++){const ge=W.removed[ie],oe=y.indexOf(ge);oe>=0&&(y[oe]=null,v[oe].disconnect(ge))}for(let ie=0;ie<W.added.length;ie++){const ge=W.added[ie];let oe=y.indexOf(ge);if(oe===-1){for(let He=0;He<v.length;He++)if(He>=y.length){y.push(ge),oe=He;break}else if(y[He]===null){y[He]=ge,oe=He;break}if(oe===-1)break}const Re=v[oe];Re&&Re.connect(ge)}}const I=new O,H=new O;function L(W,ie,ge){I.setFromMatrixPosition(ie.matrixWorld),H.setFromMatrixPosition(ge.matrixWorld);const oe=I.distanceTo(H),Re=ie.projectionMatrix.elements,He=ge.projectionMatrix.elements,Le=Re[14]/(Re[10]-1),ct=Re[14]/(Re[10]+1),st=(Re[9]+1)/Re[5],Be=(Re[9]-1)/Re[5],b=(Re[8]-1)/Re[0],wt=(He[8]+1)/He[0],Ge=Le*b,De=Le*wt,Ee=oe/(-b+wt),Ze=Ee*-b;if(ie.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(Ze),W.translateZ(Ee),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert(),Re[10]===-1)W.projectionMatrix.copy(ie.projectionMatrix),W.projectionMatrixInverse.copy(ie.projectionMatrixInverse);else{const we=Le+Ee,w=ct+Ee,S=Ge-Ze,k=De+(oe-Ze),$=st*ct/w*we,ee=Be*ct/w*we;W.projectionMatrix.makePerspective(S,k,$,ee,we,w),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}}function G(W,ie){ie===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(ie.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(r===null)return;let ie=W.near,ge=W.far;x.texture!==null&&(x.depthNear>0&&(ie=x.depthNear),x.depthFar>0&&(ge=x.depthFar)),M.near=P.near=A.near=ie,M.far=P.far=A.far=ge,(D!==M.near||j!==M.far)&&(r.updateRenderState({depthNear:M.near,depthFar:M.far}),D=M.near,j=M.far),A.layers.mask=W.layers.mask|2,P.layers.mask=W.layers.mask|4,M.layers.mask=A.layers.mask|P.layers.mask;const oe=W.parent,Re=M.cameras;G(M,oe);for(let He=0;He<Re.length;He++)G(Re[He],oe);Re.length===2?L(M,A,P):M.projectionMatrix.copy(A.projectionMatrix),q(W,M,oe)};function q(W,ie,ge){ge===null?W.matrix.copy(ie.matrixWorld):(W.matrix.copy(ge.matrixWorld),W.matrix.invert(),W.matrix.multiply(ie.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(ie.projectionMatrix),W.projectionMatrixInverse.copy(ie.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Hf*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(h===null&&p===null))return l},this.setFoveation=function(W){l=W,h!==null&&(h.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return x.texture!==null},this.getDepthSensingMesh=function(){return x.getMesh(M)};let K=null;function fe(W,ie){if(f=ie.getViewerPose(u||o),g=ie,f!==null){const ge=f.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let oe=!1;ge.length!==M.cameras.length&&(M.cameras.length=0,oe=!0);for(let Le=0;Le<ge.length;Le++){const ct=ge[Le];let st=null;if(p!==null)st=p.getViewport(ct);else{const b=d.getViewSubImage(h,ct);st=b.viewport,Le===0&&(e.setRenderTargetTextures(_,b.colorTexture,b.depthStencilTexture),e.setRenderTarget(_))}let Be=T[Le];Be===void 0&&(Be=new wn,Be.layers.enable(Le),Be.viewport=new yt,T[Le]=Be),Be.matrix.fromArray(ct.transform.matrix),Be.matrix.decompose(Be.position,Be.quaternion,Be.scale),Be.projectionMatrix.fromArray(ct.projectionMatrix),Be.projectionMatrixInverse.copy(Be.projectionMatrix).invert(),Be.viewport.set(st.x,st.y,st.width,st.height),Le===0&&(M.matrix.copy(Be.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),oe===!0&&M.cameras.push(Be)}const Re=r.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&d){const Le=d.getDepthInformation(ge[0]);Le&&Le.isValid&&Le.texture&&x.init(e,Le,r.renderState)}}for(let ge=0;ge<v.length;ge++){const oe=y[ge],Re=v[ge];oe!==null&&Re!==void 0&&Re.update(oe,ie,u||o)}K&&K(W,ie),ie.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ie}),g=null}const Ue=new sv;Ue.setAnimationLoop(fe),this.setAnimationLoop=function(W){K=W},this.dispose=function(){}}}const ar=new Si,cw=new ut;function fw(t,e){function n(m,c){m.matrixAutoUpdate===!0&&m.updateMatrix(),c.value.copy(m.matrix)}function i(m,c){c.color.getRGB(m.fogColor.value,Z_(t)),c.isFog?(m.fogNear.value=c.near,m.fogFar.value=c.far):c.isFogExp2&&(m.fogDensity.value=c.density)}function r(m,c,_,v,y){c.isMeshBasicMaterial||c.isMeshLambertMaterial?s(m,c):c.isMeshToonMaterial?(s(m,c),d(m,c)):c.isMeshPhongMaterial?(s(m,c),f(m,c)):c.isMeshStandardMaterial?(s(m,c),h(m,c),c.isMeshPhysicalMaterial&&p(m,c,y)):c.isMeshMatcapMaterial?(s(m,c),g(m,c)):c.isMeshDepthMaterial?s(m,c):c.isMeshDistanceMaterial?(s(m,c),x(m,c)):c.isMeshNormalMaterial?s(m,c):c.isLineBasicMaterial?(o(m,c),c.isLineDashedMaterial&&a(m,c)):c.isPointsMaterial?l(m,c,_,v):c.isSpriteMaterial?u(m,c):c.isShadowMaterial?(m.color.value.copy(c.color),m.opacity.value=c.opacity):c.isShaderMaterial&&(c.uniformsNeedUpdate=!1)}function s(m,c){m.opacity.value=c.opacity,c.color&&m.diffuse.value.copy(c.color),c.emissive&&m.emissive.value.copy(c.emissive).multiplyScalar(c.emissiveIntensity),c.map&&(m.map.value=c.map,n(c.map,m.mapTransform)),c.alphaMap&&(m.alphaMap.value=c.alphaMap,n(c.alphaMap,m.alphaMapTransform)),c.bumpMap&&(m.bumpMap.value=c.bumpMap,n(c.bumpMap,m.bumpMapTransform),m.bumpScale.value=c.bumpScale,c.side===Zt&&(m.bumpScale.value*=-1)),c.normalMap&&(m.normalMap.value=c.normalMap,n(c.normalMap,m.normalMapTransform),m.normalScale.value.copy(c.normalScale),c.side===Zt&&m.normalScale.value.negate()),c.displacementMap&&(m.displacementMap.value=c.displacementMap,n(c.displacementMap,m.displacementMapTransform),m.displacementScale.value=c.displacementScale,m.displacementBias.value=c.displacementBias),c.emissiveMap&&(m.emissiveMap.value=c.emissiveMap,n(c.emissiveMap,m.emissiveMapTransform)),c.specularMap&&(m.specularMap.value=c.specularMap,n(c.specularMap,m.specularMapTransform)),c.alphaTest>0&&(m.alphaTest.value=c.alphaTest);const _=e.get(c),v=_.envMap,y=_.envMapRotation;v&&(m.envMap.value=v,ar.copy(y),ar.x*=-1,ar.y*=-1,ar.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(ar.y*=-1,ar.z*=-1),m.envMapRotation.value.setFromMatrix4(cw.makeRotationFromEuler(ar)),m.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=c.reflectivity,m.ior.value=c.ior,m.refractionRatio.value=c.refractionRatio),c.lightMap&&(m.lightMap.value=c.lightMap,m.lightMapIntensity.value=c.lightMapIntensity,n(c.lightMap,m.lightMapTransform)),c.aoMap&&(m.aoMap.value=c.aoMap,m.aoMapIntensity.value=c.aoMapIntensity,n(c.aoMap,m.aoMapTransform))}function o(m,c){m.diffuse.value.copy(c.color),m.opacity.value=c.opacity,c.map&&(m.map.value=c.map,n(c.map,m.mapTransform))}function a(m,c){m.dashSize.value=c.dashSize,m.totalSize.value=c.dashSize+c.gapSize,m.scale.value=c.scale}function l(m,c,_,v){m.diffuse.value.copy(c.color),m.opacity.value=c.opacity,m.size.value=c.size*_,m.scale.value=v*.5,c.map&&(m.map.value=c.map,n(c.map,m.uvTransform)),c.alphaMap&&(m.alphaMap.value=c.alphaMap,n(c.alphaMap,m.alphaMapTransform)),c.alphaTest>0&&(m.alphaTest.value=c.alphaTest)}function u(m,c){m.diffuse.value.copy(c.color),m.opacity.value=c.opacity,m.rotation.value=c.rotation,c.map&&(m.map.value=c.map,n(c.map,m.mapTransform)),c.alphaMap&&(m.alphaMap.value=c.alphaMap,n(c.alphaMap,m.alphaMapTransform)),c.alphaTest>0&&(m.alphaTest.value=c.alphaTest)}function f(m,c){m.specular.value.copy(c.specular),m.shininess.value=Math.max(c.shininess,1e-4)}function d(m,c){c.gradientMap&&(m.gradientMap.value=c.gradientMap)}function h(m,c){m.metalness.value=c.metalness,c.metalnessMap&&(m.metalnessMap.value=c.metalnessMap,n(c.metalnessMap,m.metalnessMapTransform)),m.roughness.value=c.roughness,c.roughnessMap&&(m.roughnessMap.value=c.roughnessMap,n(c.roughnessMap,m.roughnessMapTransform)),c.envMap&&(m.envMapIntensity.value=c.envMapIntensity)}function p(m,c,_){m.ior.value=c.ior,c.sheen>0&&(m.sheenColor.value.copy(c.sheenColor).multiplyScalar(c.sheen),m.sheenRoughness.value=c.sheenRoughness,c.sheenColorMap&&(m.sheenColorMap.value=c.sheenColorMap,n(c.sheenColorMap,m.sheenColorMapTransform)),c.sheenRoughnessMap&&(m.sheenRoughnessMap.value=c.sheenRoughnessMap,n(c.sheenRoughnessMap,m.sheenRoughnessMapTransform))),c.clearcoat>0&&(m.clearcoat.value=c.clearcoat,m.clearcoatRoughness.value=c.clearcoatRoughness,c.clearcoatMap&&(m.clearcoatMap.value=c.clearcoatMap,n(c.clearcoatMap,m.clearcoatMapTransform)),c.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=c.clearcoatRoughnessMap,n(c.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),c.clearcoatNormalMap&&(m.clearcoatNormalMap.value=c.clearcoatNormalMap,n(c.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(c.clearcoatNormalScale),c.side===Zt&&m.clearcoatNormalScale.value.negate())),c.dispersion>0&&(m.dispersion.value=c.dispersion),c.iridescence>0&&(m.iridescence.value=c.iridescence,m.iridescenceIOR.value=c.iridescenceIOR,m.iridescenceThicknessMinimum.value=c.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=c.iridescenceThicknessRange[1],c.iridescenceMap&&(m.iridescenceMap.value=c.iridescenceMap,n(c.iridescenceMap,m.iridescenceMapTransform)),c.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=c.iridescenceThicknessMap,n(c.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),c.transmission>0&&(m.transmission.value=c.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),c.transmissionMap&&(m.transmissionMap.value=c.transmissionMap,n(c.transmissionMap,m.transmissionMapTransform)),m.thickness.value=c.thickness,c.thicknessMap&&(m.thicknessMap.value=c.thicknessMap,n(c.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=c.attenuationDistance,m.attenuationColor.value.copy(c.attenuationColor)),c.anisotropy>0&&(m.anisotropyVector.value.set(c.anisotropy*Math.cos(c.anisotropyRotation),c.anisotropy*Math.sin(c.anisotropyRotation)),c.anisotropyMap&&(m.anisotropyMap.value=c.anisotropyMap,n(c.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=c.specularIntensity,m.specularColor.value.copy(c.specularColor),c.specularColorMap&&(m.specularColorMap.value=c.specularColorMap,n(c.specularColorMap,m.specularColorMapTransform)),c.specularIntensityMap&&(m.specularIntensityMap.value=c.specularIntensityMap,n(c.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,c){c.matcap&&(m.matcap.value=c.matcap)}function x(m,c){const _=e.get(c).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function dw(t,e,n,i){let r={},s={},o=[];const a=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,v){const y=v.program;i.uniformBlockBinding(_,y)}function u(_,v){let y=r[_.id];y===void 0&&(g(_),y=f(_),r[_.id]=y,_.addEventListener("dispose",m));const C=v.program;i.updateUBOMapping(_,C);const R=e.render.frame;s[_.id]!==R&&(h(_),s[_.id]=R)}function f(_){const v=d();_.__bindingPointIndex=v;const y=t.createBuffer(),C=_.__size,R=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,C,R),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,v,y),y}function d(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(_){const v=r[_.id],y=_.uniforms,C=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,v);for(let R=0,A=y.length;R<A;R++){const P=Array.isArray(y[R])?y[R]:[y[R]];for(let T=0,M=P.length;T<M;T++){const D=P[T];if(p(D,R,T,C)===!0){const j=D.__offset,V=Array.isArray(D.value)?D.value:[D.value];let Q=0;for(let J=0;J<V.length;J++){const I=V[J],H=x(I);typeof I=="number"||typeof I=="boolean"?(D.__data[0]=I,t.bufferSubData(t.UNIFORM_BUFFER,j+Q,D.__data)):I.isMatrix3?(D.__data[0]=I.elements[0],D.__data[1]=I.elements[1],D.__data[2]=I.elements[2],D.__data[3]=0,D.__data[4]=I.elements[3],D.__data[5]=I.elements[4],D.__data[6]=I.elements[5],D.__data[7]=0,D.__data[8]=I.elements[6],D.__data[9]=I.elements[7],D.__data[10]=I.elements[8],D.__data[11]=0):(I.toArray(D.__data,Q),Q+=H.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,j,D.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,v,y,C){const R=_.value,A=v+"_"+y;if(C[A]===void 0)return typeof R=="number"||typeof R=="boolean"?C[A]=R:C[A]=R.clone(),!0;{const P=C[A];if(typeof R=="number"||typeof R=="boolean"){if(P!==R)return C[A]=R,!0}else if(P.equals(R)===!1)return P.copy(R),!0}return!1}function g(_){const v=_.uniforms;let y=0;const C=16;for(let A=0,P=v.length;A<P;A++){const T=Array.isArray(v[A])?v[A]:[v[A]];for(let M=0,D=T.length;M<D;M++){const j=T[M],V=Array.isArray(j.value)?j.value:[j.value];for(let Q=0,J=V.length;Q<J;Q++){const I=V[Q],H=x(I),L=y%C,G=L%H.boundary,q=L+G;y+=G,q!==0&&C-q<H.storage&&(y+=C-q),j.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=y,y+=H.storage}}}const R=y%C;return R>0&&(y+=C-R),_.__size=y,_.__cache={},this}function x(_){const v={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(v.boundary=4,v.storage=4):_.isVector2?(v.boundary=8,v.storage=8):_.isVector3||_.isColor?(v.boundary=16,v.storage=12):_.isVector4?(v.boundary=16,v.storage=16):_.isMatrix3?(v.boundary=48,v.storage=48):_.isMatrix4?(v.boundary=64,v.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),v}function m(_){const v=_.target;v.removeEventListener("dispose",m);const y=o.indexOf(v.__bindingPointIndex);o.splice(y,1),t.deleteBuffer(r[v.id]),delete r[v.id],delete s[v.id]}function c(){for(const _ in r)t.deleteBuffer(r[_]);o=[],r={},s={}}return{bind:l,update:u,dispose:c}}class hw{constructor(e={}){const{canvas:n=Fy(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:u=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const g=new Uint32Array(4),x=new Int32Array(4);let m=null,c=null;const _=[],v=[];this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let C=!1;this._outputColorSpace=Mn;let R=0,A=0,P=null,T=-1,M=null;const D=new yt,j=new yt;let V=null;const Q=new Qe(0);let J=0,I=n.width,H=n.height,L=1,G=null,q=null;const K=new yt(0,0,I,H),fe=new yt(0,0,I,H);let Ue=!1;const W=new qd;let ie=!1,ge=!1;const oe=new ut,Re=new ut,He=new O,Le=new yt,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let st=!1;function Be(){return P===null?L:1}let b=i;function wt(E,N){return n.getContext(E,N)}try{const E={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:u,powerPreference:f,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${zd}`),n.addEventListener("webglcontextlost",Z,!1),n.addEventListener("webglcontextrestored",ue,!1),n.addEventListener("webglcontextcreationerror",pe,!1),b===null){const N="webgl2";if(b=wt(N,E),b===null)throw wt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Ge,De,Ee,Ze,we,w,S,k,$,ee,Y,Se,de,Ae,be,te,_e,le,Me,me,Oe,Ne,tt,U;function se(){Ge=new ET(b),Ge.init(),Ne=new sw(b,Ge),De=new gT(b,Ge,e,Ne),Ee=new iw(b,Ge),De.reverseDepthBuffer&&h&&Ee.buffers.depth.setReversed(!0),Ze=new AT(b),we=new W1,w=new rw(b,Ge,Ee,we,De,Ne,Ze),S=new vT(y),k=new MT(y),$=new DS(b),tt=new pT(b,$),ee=new TT(b,$,Ze,tt),Y=new CT(b,ee,$,Ze),Me=new RT(b,De,w),te=new _T(we),Se=new G1(y,S,k,Ge,De,tt,te),de=new fw(y,we),Ae=new j1,be=new Q1(Ge),le=new hT(y,S,k,Ee,Y,p,l),_e=new tw(y,Y,De),U=new dw(b,Ze,De,Ee),me=new mT(b,Ge,Ze),Oe=new wT(b,Ge,Ze),Ze.programs=Se.programs,y.capabilities=De,y.extensions=Ge,y.properties=we,y.renderLists=Ae,y.shadowMap=_e,y.state=Ee,y.info=Ze}se();const X=new uw(y,b);this.xr=X,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){const E=Ge.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ge.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return L},this.setPixelRatio=function(E){E!==void 0&&(L=E,this.setSize(I,H,!1))},this.getSize=function(E){return E.set(I,H)},this.setSize=function(E,N,z=!0){if(X.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=E,H=N,n.width=Math.floor(E*L),n.height=Math.floor(N*L),z===!0&&(n.style.width=E+"px",n.style.height=N+"px"),this.setViewport(0,0,E,N)},this.getDrawingBufferSize=function(E){return E.set(I*L,H*L).floor()},this.setDrawingBufferSize=function(E,N,z){I=E,H=N,L=z,n.width=Math.floor(E*z),n.height=Math.floor(N*z),this.setViewport(0,0,E,N)},this.getCurrentViewport=function(E){return E.copy(D)},this.getViewport=function(E){return E.copy(K)},this.setViewport=function(E,N,z,B){E.isVector4?K.set(E.x,E.y,E.z,E.w):K.set(E,N,z,B),Ee.viewport(D.copy(K).multiplyScalar(L).round())},this.getScissor=function(E){return E.copy(fe)},this.setScissor=function(E,N,z,B){E.isVector4?fe.set(E.x,E.y,E.z,E.w):fe.set(E,N,z,B),Ee.scissor(j.copy(fe).multiplyScalar(L).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(E){Ee.setScissorTest(Ue=E)},this.setOpaqueSort=function(E){G=E},this.setTransparentSort=function(E){q=E},this.getClearColor=function(E){return E.copy(le.getClearColor())},this.setClearColor=function(){le.setClearColor(...arguments)},this.getClearAlpha=function(){return le.getClearAlpha()},this.setClearAlpha=function(){le.setClearAlpha(...arguments)},this.clear=function(E=!0,N=!0,z=!0){let B=0;if(E){let F=!1;if(P!==null){const re=P.texture.format;F=re===Xd||re===Wd||re===Gd}if(F){const re=P.texture.type,he=re===ei||re===Ar||re===Co||re===Po||re===Vd||re===Hd,xe=le.getClearColor(),ye=le.getClearAlpha(),Fe=xe.r,Ie=xe.g,Ce=xe.b;he?(g[0]=Fe,g[1]=Ie,g[2]=Ce,g[3]=ye,b.clearBufferuiv(b.COLOR,0,g)):(x[0]=Fe,x[1]=Ie,x[2]=Ce,x[3]=ye,b.clearBufferiv(b.COLOR,0,x))}else B|=b.COLOR_BUFFER_BIT}N&&(B|=b.DEPTH_BUFFER_BIT),z&&(B|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),b.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",Z,!1),n.removeEventListener("webglcontextrestored",ue,!1),n.removeEventListener("webglcontextcreationerror",pe,!1),le.dispose(),Ae.dispose(),be.dispose(),we.dispose(),S.dispose(),k.dispose(),Y.dispose(),tt.dispose(),U.dispose(),Se.dispose(),X.dispose(),X.removeEventListener("sessionstart",Qd),X.removeEventListener("sessionend",Jd),er.stop()};function Z(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function ue(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const E=Ze.autoReset,N=_e.enabled,z=_e.autoUpdate,B=_e.needsUpdate,F=_e.type;se(),Ze.autoReset=E,_e.enabled=N,_e.autoUpdate=z,_e.needsUpdate=B,_e.type=F}function pe(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function ke(E){const N=E.target;N.removeEventListener("dispose",ke),_t(N)}function _t(E){zt(E),we.remove(E)}function zt(E){const N=we.get(E).programs;N!==void 0&&(N.forEach(function(z){Se.releaseProgram(z)}),E.isShaderMaterial&&Se.releaseShaderCache(E))}this.renderBufferDirect=function(E,N,z,B,F,re){N===null&&(N=ct);const he=F.isMesh&&F.matrixWorld.determinant()<0,xe=dv(E,N,z,B,F);Ee.setMaterial(B,he);let ye=z.index,Fe=1;if(B.wireframe===!0){if(ye=ee.getWireframeAttribute(z),ye===void 0)return;Fe=2}const Ie=z.drawRange,Ce=z.attributes.position;let je=Ie.start*Fe,Je=(Ie.start+Ie.count)*Fe;re!==null&&(je=Math.max(je,re.start*Fe),Je=Math.min(Je,(re.start+re.count)*Fe)),ye!==null?(je=Math.max(je,0),Je=Math.min(Je,ye.count)):Ce!=null&&(je=Math.max(je,0),Je=Math.min(Je,Ce.count));const Mt=Je-je;if(Mt<0||Mt===1/0)return;tt.setup(F,B,xe,z,ye);let vt,qe=me;if(ye!==null&&(vt=$.get(ye),qe=Oe,qe.setIndex(vt)),F.isMesh)B.wireframe===!0?(Ee.setLineWidth(B.wireframeLinewidth*Be()),qe.setMode(b.LINES)):qe.setMode(b.TRIANGLES);else if(F.isLine){let Pe=B.linewidth;Pe===void 0&&(Pe=1),Ee.setLineWidth(Pe*Be()),F.isLineSegments?qe.setMode(b.LINES):F.isLineLoop?qe.setMode(b.LINE_LOOP):qe.setMode(b.LINE_STRIP)}else F.isPoints?qe.setMode(b.POINTS):F.isSprite&&qe.setMode(b.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)nl("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),qe.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ge.get("WEBGL_multi_draw"))qe.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Pe=F._multiDrawStarts,Nt=F._multiDrawCounts,et=F._multiDrawCount,Dn=ye?$.get(ye).bytesPerElement:1,br=we.get(B).currentProgram.getUniforms();for(let cn=0;cn<et;cn++)br.setValue(b,"_gl_DrawID",cn),qe.render(Pe[cn]/Dn,Nt[cn])}else if(F.isInstancedMesh)qe.renderInstances(je,Mt,F.count);else if(z.isInstancedBufferGeometry){const Pe=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,Nt=Math.min(z.instanceCount,Pe);qe.renderInstances(je,Mt,Nt)}else qe.render(je,Mt)};function nt(E,N,z){E.transparent===!0&&E.side===An&&E.forceSinglePass===!1?(E.side=Zt,E.needsUpdate=!0,Xo(E,N,z),E.side=Ki,E.needsUpdate=!0,Xo(E,N,z),E.side=An):Xo(E,N,z)}this.compile=function(E,N,z=null){z===null&&(z=E),c=be.get(z),c.init(N),v.push(c),z.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(c.pushLight(F),F.castShadow&&c.pushShadow(F))}),E!==z&&E.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(c.pushLight(F),F.castShadow&&c.pushShadow(F))}),c.setupLights();const B=new Set;return E.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const re=F.material;if(re)if(Array.isArray(re))for(let he=0;he<re.length;he++){const xe=re[he];nt(xe,z,F),B.add(xe)}else nt(re,z,F),B.add(re)}),c=v.pop(),B},this.compileAsync=function(E,N,z=null){const B=this.compile(E,N,z);return new Promise(F=>{function re(){if(B.forEach(function(he){we.get(he).currentProgram.isReady()&&B.delete(he)}),B.size===0){F(E);return}setTimeout(re,10)}Ge.get("KHR_parallel_shader_compile")!==null?re():setTimeout(re,10)})};let Ln=null;function ni(E){Ln&&Ln(E)}function Qd(){er.stop()}function Jd(){er.start()}const er=new sv;er.setAnimationLoop(ni),typeof self<"u"&&er.setContext(self),this.setAnimationLoop=function(E){Ln=E,X.setAnimationLoop(E),E===null?er.stop():er.start()},X.addEventListener("sessionstart",Qd),X.addEventListener("sessionend",Jd),this.render=function(E,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(X.cameraAutoUpdate===!0&&X.updateCamera(N),N=X.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,N,P),c=be.get(E,v.length),c.init(N),v.push(c),Re.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),W.setFromProjectionMatrix(Re),ge=this.localClippingEnabled,ie=te.init(this.clippingPlanes,ge),m=Ae.get(E,_.length),m.init(),_.push(m),X.enabled===!0&&X.isPresenting===!0){const re=y.xr.getDepthSensingMesh();re!==null&&eu(re,N,-1/0,y.sortObjects)}eu(E,N,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(G,q),st=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,st&&le.addToRenderList(m,E),this.info.render.frame++,ie===!0&&te.beginShadows();const z=c.state.shadowsArray;_e.render(z,E,N),ie===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset();const B=m.opaque,F=m.transmissive;if(c.setupLights(),N.isArrayCamera){const re=N.cameras;if(F.length>0)for(let he=0,xe=re.length;he<xe;he++){const ye=re[he];th(B,F,E,ye)}st&&le.render(E);for(let he=0,xe=re.length;he<xe;he++){const ye=re[he];eh(m,E,ye,ye.viewport)}}else F.length>0&&th(B,F,E,N),st&&le.render(E),eh(m,E,N);P!==null&&A===0&&(w.updateMultisampleRenderTarget(P),w.updateRenderTargetMipmap(P)),E.isScene===!0&&E.onAfterRender(y,E,N),tt.resetDefaultState(),T=-1,M=null,v.pop(),v.length>0?(c=v[v.length-1],ie===!0&&te.setGlobalState(y.clippingPlanes,c.state.camera)):c=null,_.pop(),_.length>0?m=_[_.length-1]:m=null};function eu(E,N,z,B){if(E.visible===!1)return;if(E.layers.test(N.layers)){if(E.isGroup)z=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(N);else if(E.isLight)c.pushLight(E),E.castShadow&&c.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||W.intersectsSprite(E)){B&&Le.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Re);const he=Y.update(E),xe=E.material;xe.visible&&m.push(E,he,xe,z,Le.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||W.intersectsObject(E))){const he=Y.update(E),xe=E.material;if(B&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Le.copy(E.boundingSphere.center)):(he.boundingSphere===null&&he.computeBoundingSphere(),Le.copy(he.boundingSphere.center)),Le.applyMatrix4(E.matrixWorld).applyMatrix4(Re)),Array.isArray(xe)){const ye=he.groups;for(let Fe=0,Ie=ye.length;Fe<Ie;Fe++){const Ce=ye[Fe],je=xe[Ce.materialIndex];je&&je.visible&&m.push(E,he,je,z,Le.z,Ce)}}else xe.visible&&m.push(E,he,xe,z,Le.z,null)}}const re=E.children;for(let he=0,xe=re.length;he<xe;he++)eu(re[he],N,z,B)}function eh(E,N,z,B){const F=E.opaque,re=E.transmissive,he=E.transparent;c.setupLightsView(z),ie===!0&&te.setGlobalState(y.clippingPlanes,z),B&&Ee.viewport(D.copy(B)),F.length>0&&Wo(F,N,z),re.length>0&&Wo(re,N,z),he.length>0&&Wo(he,N,z),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function th(E,N,z,B){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;c.state.transmissionRenderTarget[B.id]===void 0&&(c.state.transmissionRenderTarget[B.id]=new Rr(1,1,{generateMipmaps:!0,type:Ge.has("EXT_color_buffer_half_float")||Ge.has("EXT_color_buffer_float")?ko:ei,minFilter:vr,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$e.workingColorSpace}));const re=c.state.transmissionRenderTarget[B.id],he=B.viewport||D;re.setSize(he.z*y.transmissionResolutionScale,he.w*y.transmissionResolutionScale);const xe=y.getRenderTarget();y.setRenderTarget(re),y.getClearColor(Q),J=y.getClearAlpha(),J<1&&y.setClearColor(16777215,.5),y.clear(),st&&le.render(z);const ye=y.toneMapping;y.toneMapping=Yi;const Fe=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),c.setupLightsView(B),ie===!0&&te.setGlobalState(y.clippingPlanes,B),Wo(E,z,B),w.updateMultisampleRenderTarget(re),w.updateRenderTargetMipmap(re),Ge.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let Ce=0,je=N.length;Ce<je;Ce++){const Je=N[Ce],Mt=Je.object,vt=Je.geometry,qe=Je.material,Pe=Je.group;if(qe.side===An&&Mt.layers.test(B.layers)){const Nt=qe.side;qe.side=Zt,qe.needsUpdate=!0,nh(Mt,z,B,vt,qe,Pe),qe.side=Nt,qe.needsUpdate=!0,Ie=!0}}Ie===!0&&(w.updateMultisampleRenderTarget(re),w.updateRenderTargetMipmap(re))}y.setRenderTarget(xe),y.setClearColor(Q,J),Fe!==void 0&&(B.viewport=Fe),y.toneMapping=ye}function Wo(E,N,z){const B=N.isScene===!0?N.overrideMaterial:null;for(let F=0,re=E.length;F<re;F++){const he=E[F],xe=he.object,ye=he.geometry,Fe=he.group;let Ie=he.material;Ie.allowOverride===!0&&B!==null&&(Ie=B),xe.layers.test(z.layers)&&nh(xe,N,z,ye,Ie,Fe)}}function nh(E,N,z,B,F,re){E.onBeforeRender(y,N,z,B,F,re),E.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),F.onBeforeRender(y,N,z,B,E,re),F.transparent===!0&&F.side===An&&F.forceSinglePass===!1?(F.side=Zt,F.needsUpdate=!0,y.renderBufferDirect(z,N,B,F,E,re),F.side=Ki,F.needsUpdate=!0,y.renderBufferDirect(z,N,B,F,E,re),F.side=An):y.renderBufferDirect(z,N,B,F,E,re),E.onAfterRender(y,N,z,B,F,re)}function Xo(E,N,z){N.isScene!==!0&&(N=ct);const B=we.get(E),F=c.state.lights,re=c.state.shadowsArray,he=F.state.version,xe=Se.getParameters(E,F.state,re,N,z),ye=Se.getProgramCacheKey(xe);let Fe=B.programs;B.environment=E.isMeshStandardMaterial?N.environment:null,B.fog=N.fog,B.envMap=(E.isMeshStandardMaterial?k:S).get(E.envMap||B.environment),B.envMapRotation=B.environment!==null&&E.envMap===null?N.environmentRotation:E.envMapRotation,Fe===void 0&&(E.addEventListener("dispose",ke),Fe=new Map,B.programs=Fe);let Ie=Fe.get(ye);if(Ie!==void 0){if(B.currentProgram===Ie&&B.lightsStateVersion===he)return rh(E,xe),Ie}else xe.uniforms=Se.getUniforms(E),E.onBeforeCompile(xe,y),Ie=Se.acquireProgram(xe,ye),Fe.set(ye,Ie),B.uniforms=xe.uniforms;const Ce=B.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ce.clippingPlanes=te.uniform),rh(E,xe),B.needsLights=pv(E),B.lightsStateVersion=he,B.needsLights&&(Ce.ambientLightColor.value=F.state.ambient,Ce.lightProbe.value=F.state.probe,Ce.directionalLights.value=F.state.directional,Ce.directionalLightShadows.value=F.state.directionalShadow,Ce.spotLights.value=F.state.spot,Ce.spotLightShadows.value=F.state.spotShadow,Ce.rectAreaLights.value=F.state.rectArea,Ce.ltc_1.value=F.state.rectAreaLTC1,Ce.ltc_2.value=F.state.rectAreaLTC2,Ce.pointLights.value=F.state.point,Ce.pointLightShadows.value=F.state.pointShadow,Ce.hemisphereLights.value=F.state.hemi,Ce.directionalShadowMap.value=F.state.directionalShadowMap,Ce.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ce.spotShadowMap.value=F.state.spotShadowMap,Ce.spotLightMatrix.value=F.state.spotLightMatrix,Ce.spotLightMap.value=F.state.spotLightMap,Ce.pointShadowMap.value=F.state.pointShadowMap,Ce.pointShadowMatrix.value=F.state.pointShadowMatrix),B.currentProgram=Ie,B.uniformsList=null,Ie}function ih(E){if(E.uniformsList===null){const N=E.currentProgram.getUniforms();E.uniformsList=il.seqWithValue(N.seq,E.uniforms)}return E.uniformsList}function rh(E,N){const z=we.get(E);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function dv(E,N,z,B,F){N.isScene!==!0&&(N=ct),w.resetTextureUnits();const re=N.fog,he=B.isMeshStandardMaterial?N.environment:null,xe=P===null?y.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:ws,ye=(B.isMeshStandardMaterial?k:S).get(B.envMap||he),Fe=B.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Ie=!!z.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Ce=!!z.morphAttributes.position,je=!!z.morphAttributes.normal,Je=!!z.morphAttributes.color;let Mt=Yi;B.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(Mt=y.toneMapping);const vt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,qe=vt!==void 0?vt.length:0,Pe=we.get(B),Nt=c.state.lights;if(ie===!0&&(ge===!0||E!==M)){const jt=E===M&&B.id===T;te.setState(B,E,jt)}let et=!1;B.version===Pe.__version?(Pe.needsLights&&Pe.lightsStateVersion!==Nt.state.version||Pe.outputColorSpace!==xe||F.isBatchedMesh&&Pe.batching===!1||!F.isBatchedMesh&&Pe.batching===!0||F.isBatchedMesh&&Pe.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Pe.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Pe.instancing===!1||!F.isInstancedMesh&&Pe.instancing===!0||F.isSkinnedMesh&&Pe.skinning===!1||!F.isSkinnedMesh&&Pe.skinning===!0||F.isInstancedMesh&&Pe.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Pe.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Pe.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Pe.instancingMorph===!1&&F.morphTexture!==null||Pe.envMap!==ye||B.fog===!0&&Pe.fog!==re||Pe.numClippingPlanes!==void 0&&(Pe.numClippingPlanes!==te.numPlanes||Pe.numIntersection!==te.numIntersection)||Pe.vertexAlphas!==Fe||Pe.vertexTangents!==Ie||Pe.morphTargets!==Ce||Pe.morphNormals!==je||Pe.morphColors!==Je||Pe.toneMapping!==Mt||Pe.morphTargetsCount!==qe)&&(et=!0):(et=!0,Pe.__version=B.version);let Dn=Pe.currentProgram;et===!0&&(Dn=Xo(B,N,F));let br=!1,cn=!1,Us=!1;const ft=Dn.getUniforms(),xn=Pe.uniforms;if(Ee.useProgram(Dn.program)&&(br=!0,cn=!0,Us=!0),B.id!==T&&(T=B.id,cn=!0),br||M!==E){Ee.buffers.depth.getReversed()?(oe.copy(E.projectionMatrix),ky(oe),zy(oe),ft.setValue(b,"projectionMatrix",oe)):ft.setValue(b,"projectionMatrix",E.projectionMatrix),ft.setValue(b,"viewMatrix",E.matrixWorldInverse);const tn=ft.map.cameraPosition;tn!==void 0&&tn.setValue(b,He.setFromMatrixPosition(E.matrixWorld)),De.logarithmicDepthBuffer&&ft.setValue(b,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&ft.setValue(b,"isOrthographic",E.isOrthographicCamera===!0),M!==E&&(M=E,cn=!0,Us=!0)}if(F.isSkinnedMesh){ft.setOptional(b,F,"bindMatrix"),ft.setOptional(b,F,"bindMatrixInverse");const jt=F.skeleton;jt&&(jt.boneTexture===null&&jt.computeBoneTexture(),ft.setValue(b,"boneTexture",jt.boneTexture,w))}F.isBatchedMesh&&(ft.setOptional(b,F,"batchingTexture"),ft.setValue(b,"batchingTexture",F._matricesTexture,w),ft.setOptional(b,F,"batchingIdTexture"),ft.setValue(b,"batchingIdTexture",F._indirectTexture,w),ft.setOptional(b,F,"batchingColorTexture"),F._colorsTexture!==null&&ft.setValue(b,"batchingColorTexture",F._colorsTexture,w));const yn=z.morphAttributes;if((yn.position!==void 0||yn.normal!==void 0||yn.color!==void 0)&&Me.update(F,z,Dn),(cn||Pe.receiveShadow!==F.receiveShadow)&&(Pe.receiveShadow=F.receiveShadow,ft.setValue(b,"receiveShadow",F.receiveShadow)),B.isMeshGouraudMaterial&&B.envMap!==null&&(xn.envMap.value=ye,xn.flipEnvMap.value=ye.isCubeTexture&&ye.isRenderTargetTexture===!1?-1:1),B.isMeshStandardMaterial&&B.envMap===null&&N.environment!==null&&(xn.envMapIntensity.value=N.environmentIntensity),cn&&(ft.setValue(b,"toneMappingExposure",y.toneMappingExposure),Pe.needsLights&&hv(xn,Us),re&&B.fog===!0&&de.refreshFogUniforms(xn,re),de.refreshMaterialUniforms(xn,B,L,H,c.state.transmissionRenderTarget[E.id]),il.upload(b,ih(Pe),xn,w)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(il.upload(b,ih(Pe),xn,w),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&ft.setValue(b,"center",F.center),ft.setValue(b,"modelViewMatrix",F.modelViewMatrix),ft.setValue(b,"normalMatrix",F.normalMatrix),ft.setValue(b,"modelMatrix",F.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const jt=B.uniformsGroups;for(let tn=0,tu=jt.length;tn<tu;tn++){const tr=jt[tn];U.update(tr,Dn),U.bind(tr,Dn)}}return Dn}function hv(E,N){E.ambientLightColor.needsUpdate=N,E.lightProbe.needsUpdate=N,E.directionalLights.needsUpdate=N,E.directionalLightShadows.needsUpdate=N,E.pointLights.needsUpdate=N,E.pointLightShadows.needsUpdate=N,E.spotLights.needsUpdate=N,E.spotLightShadows.needsUpdate=N,E.rectAreaLights.needsUpdate=N,E.hemisphereLights.needsUpdate=N}function pv(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(E,N,z){const B=we.get(E);B.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),we.get(E.texture).__webglTexture=N,we.get(E.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:z,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,N){const z=we.get(E);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0};const mv=b.createFramebuffer();this.setRenderTarget=function(E,N=0,z=0){P=E,R=N,A=z;let B=!0,F=null,re=!1,he=!1;if(E){const ye=we.get(E);if(ye.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(b.FRAMEBUFFER,null),B=!1;else if(ye.__webglFramebuffer===void 0)w.setupRenderTarget(E);else if(ye.__hasExternalTextures)w.rebindTextures(E,we.get(E.texture).__webglTexture,we.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ce=E.depthTexture;if(ye.__boundDepthTexture!==Ce){if(Ce!==null&&we.has(Ce)&&(E.width!==Ce.image.width||E.height!==Ce.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(E)}}const Fe=E.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(he=!0);const Ie=we.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Ie[N])?F=Ie[N][z]:F=Ie[N],re=!0):E.samples>0&&w.useMultisampledRTT(E)===!1?F=we.get(E).__webglMultisampledFramebuffer:Array.isArray(Ie)?F=Ie[z]:F=Ie,D.copy(E.viewport),j.copy(E.scissor),V=E.scissorTest}else D.copy(K).multiplyScalar(L).floor(),j.copy(fe).multiplyScalar(L).floor(),V=Ue;if(z!==0&&(F=mv),Ee.bindFramebuffer(b.FRAMEBUFFER,F)&&B&&Ee.drawBuffers(E,F),Ee.viewport(D),Ee.scissor(j),Ee.setScissorTest(V),re){const ye=we.get(E.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+N,ye.__webglTexture,z)}else if(he){const ye=we.get(E.texture),Fe=N;b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,ye.__webglTexture,z,Fe)}else if(E!==null&&z!==0){const ye=we.get(E.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,ye.__webglTexture,z)}T=-1},this.readRenderTargetPixels=function(E,N,z,B,F,re,he){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=we.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&he!==void 0&&(xe=xe[he]),xe){Ee.bindFramebuffer(b.FRAMEBUFFER,xe);try{const ye=E.texture,Fe=ye.format,Ie=ye.type;if(!De.textureFormatReadable(Fe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!De.textureTypeReadable(Ie)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=E.width-B&&z>=0&&z<=E.height-F&&b.readPixels(N,z,B,F,Ne.convert(Fe),Ne.convert(Ie),re)}finally{const ye=P!==null?we.get(P).__webglFramebuffer:null;Ee.bindFramebuffer(b.FRAMEBUFFER,ye)}}},this.readRenderTargetPixelsAsync=async function(E,N,z,B,F,re,he){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=we.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&he!==void 0&&(xe=xe[he]),xe)if(N>=0&&N<=E.width-B&&z>=0&&z<=E.height-F){Ee.bindFramebuffer(b.FRAMEBUFFER,xe);const ye=E.texture,Fe=ye.format,Ie=ye.type;if(!De.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!De.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ce=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,Ce),b.bufferData(b.PIXEL_PACK_BUFFER,re.byteLength,b.STREAM_READ),b.readPixels(N,z,B,F,Ne.convert(Fe),Ne.convert(Ie),0);const je=P!==null?we.get(P).__webglFramebuffer:null;Ee.bindFramebuffer(b.FRAMEBUFFER,je);const Je=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await Oy(b,Je,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,Ce),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,re),b.deleteBuffer(Ce),b.deleteSync(Je),re}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,N=null,z=0){const B=Math.pow(2,-z),F=Math.floor(E.image.width*B),re=Math.floor(E.image.height*B),he=N!==null?N.x:0,xe=N!==null?N.y:0;w.setTexture2D(E,0),b.copyTexSubImage2D(b.TEXTURE_2D,z,0,0,he,xe,F,re),Ee.unbindTexture()};const gv=b.createFramebuffer(),_v=b.createFramebuffer();this.copyTextureToTexture=function(E,N,z=null,B=null,F=0,re=null){re===null&&(F!==0?(nl("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),re=F,F=0):re=0);let he,xe,ye,Fe,Ie,Ce,je,Je,Mt;const vt=E.isCompressedTexture?E.mipmaps[re]:E.image;if(z!==null)he=z.max.x-z.min.x,xe=z.max.y-z.min.y,ye=z.isBox3?z.max.z-z.min.z:1,Fe=z.min.x,Ie=z.min.y,Ce=z.isBox3?z.min.z:0;else{const yn=Math.pow(2,-F);he=Math.floor(vt.width*yn),xe=Math.floor(vt.height*yn),E.isDataArrayTexture?ye=vt.depth:E.isData3DTexture?ye=Math.floor(vt.depth*yn):ye=1,Fe=0,Ie=0,Ce=0}B!==null?(je=B.x,Je=B.y,Mt=B.z):(je=0,Je=0,Mt=0);const qe=Ne.convert(N.format),Pe=Ne.convert(N.type);let Nt;N.isData3DTexture?(w.setTexture3D(N,0),Nt=b.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(w.setTexture2DArray(N,0),Nt=b.TEXTURE_2D_ARRAY):(w.setTexture2D(N,0),Nt=b.TEXTURE_2D),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,N.flipY),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),b.pixelStorei(b.UNPACK_ALIGNMENT,N.unpackAlignment);const et=b.getParameter(b.UNPACK_ROW_LENGTH),Dn=b.getParameter(b.UNPACK_IMAGE_HEIGHT),br=b.getParameter(b.UNPACK_SKIP_PIXELS),cn=b.getParameter(b.UNPACK_SKIP_ROWS),Us=b.getParameter(b.UNPACK_SKIP_IMAGES);b.pixelStorei(b.UNPACK_ROW_LENGTH,vt.width),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,vt.height),b.pixelStorei(b.UNPACK_SKIP_PIXELS,Fe),b.pixelStorei(b.UNPACK_SKIP_ROWS,Ie),b.pixelStorei(b.UNPACK_SKIP_IMAGES,Ce);const ft=E.isDataArrayTexture||E.isData3DTexture,xn=N.isDataArrayTexture||N.isData3DTexture;if(E.isDepthTexture){const yn=we.get(E),jt=we.get(N),tn=we.get(yn.__renderTarget),tu=we.get(jt.__renderTarget);Ee.bindFramebuffer(b.READ_FRAMEBUFFER,tn.__webglFramebuffer),Ee.bindFramebuffer(b.DRAW_FRAMEBUFFER,tu.__webglFramebuffer);for(let tr=0;tr<ye;tr++)ft&&(b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,we.get(E).__webglTexture,F,Ce+tr),b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,we.get(N).__webglTexture,re,Mt+tr)),b.blitFramebuffer(Fe,Ie,he,xe,je,Je,he,xe,b.DEPTH_BUFFER_BIT,b.NEAREST);Ee.bindFramebuffer(b.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else if(F!==0||E.isRenderTargetTexture||we.has(E)){const yn=we.get(E),jt=we.get(N);Ee.bindFramebuffer(b.READ_FRAMEBUFFER,gv),Ee.bindFramebuffer(b.DRAW_FRAMEBUFFER,_v);for(let tn=0;tn<ye;tn++)ft?b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,yn.__webglTexture,F,Ce+tn):b.framebufferTexture2D(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,yn.__webglTexture,F),xn?b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,jt.__webglTexture,re,Mt+tn):b.framebufferTexture2D(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,jt.__webglTexture,re),F!==0?b.blitFramebuffer(Fe,Ie,he,xe,je,Je,he,xe,b.COLOR_BUFFER_BIT,b.NEAREST):xn?b.copyTexSubImage3D(Nt,re,je,Je,Mt+tn,Fe,Ie,he,xe):b.copyTexSubImage2D(Nt,re,je,Je,Fe,Ie,he,xe);Ee.bindFramebuffer(b.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else xn?E.isDataTexture||E.isData3DTexture?b.texSubImage3D(Nt,re,je,Je,Mt,he,xe,ye,qe,Pe,vt.data):N.isCompressedArrayTexture?b.compressedTexSubImage3D(Nt,re,je,Je,Mt,he,xe,ye,qe,vt.data):b.texSubImage3D(Nt,re,je,Je,Mt,he,xe,ye,qe,Pe,vt):E.isDataTexture?b.texSubImage2D(b.TEXTURE_2D,re,je,Je,he,xe,qe,Pe,vt.data):E.isCompressedTexture?b.compressedTexSubImage2D(b.TEXTURE_2D,re,je,Je,vt.width,vt.height,qe,vt.data):b.texSubImage2D(b.TEXTURE_2D,re,je,Je,he,xe,qe,Pe,vt);b.pixelStorei(b.UNPACK_ROW_LENGTH,et),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,Dn),b.pixelStorei(b.UNPACK_SKIP_PIXELS,br),b.pixelStorei(b.UNPACK_SKIP_ROWS,cn),b.pixelStorei(b.UNPACK_SKIP_IMAGES,Us),re===0&&N.generateMipmaps&&b.generateMipmap(Nt),Ee.unbindTexture()},this.copyTextureToTexture3D=function(E,N,z=null,B=null,F=0){return nl('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,N,z,B,F)},this.initRenderTarget=function(E){we.get(E).__webglFramebuffer===void 0&&w.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?w.setTextureCube(E,0):E.isData3DTexture?w.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?w.setTexture2DArray(E,0):w.setTexture2D(E,0),Ee.unbindTexture()},this.resetState=function(){R=0,A=0,P=null,Ee.reset(),tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return pi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=$e._getDrawingBufferColorSpace(e),n.unpackColorSpace=$e._getUnpackColorSpace()}}const pw=`${location.protocol==="https:"?"wss":"ws"}://${location.host}/ws/attacks`,Il=`${location.protocol}//${location.hostname}:8360/`,mw=5e3,gm=40,ac=3e4,cv="Atlantic/Azores",gw="texturas/terra.jpg",_w="texturas/noite.jpg",uo={critical:{hex:14232394,css:"#d92b4a",label:"CRÍTICO"},high:{hex:15762986,css:"#f0862a",label:"ALTO"},medium:{hex:16243797,css:"#f7dc55",label:"MÉDIO"},low:{hex:4176240,css:"#3fb970",label:"BAIXO"}},_m=["critical","high","medium","low"],vm=t=>uo[t]??uo.medium;function vw(t){return t.severity==="critical"?{id:"T1499.002",nome:"Service Exhaustion Flood"}:t.severity==="high"?{id:"T1190",nome:"Exploit Public-Facing Application"}:null}const xw={block:"bloqueado",managedchallenge:"desafiado",challenge:"desafiado",jschallenge:"desafiado"};function Na(t,e,n){const i=(90-t)*(Math.PI/180),r=(e+180)*(Math.PI/180);return new O(-n*Math.sin(i)*Math.cos(r),n*Math.cos(i),n*Math.sin(i)*Math.sin(r))}function yw(t){const e=new Date(t),n=Date.UTC(e.getUTCFullYear(),0,0),i=(t-n)/864e5,r=-23.44*Math.cos(2*Math.PI/365*(i+10)),s=2*Math.PI*(i-81)/364,o=9.87*Math.sin(2*s)-7.53*Math.cos(s)-1.5*Math.sin(s);let l=-15*(e.getUTCHours()+e.getUTCMinutes()/60+e.getUTCSeconds()/3600-12+o/60);return l=(l+540)%360-180,{lat:r,lng:l}}function Sw(t,e){const n=new O().addVectors(t,e).multiplyScalar(.5),i=t.distanceTo(e);return n.normalize().multiplyScalar(2+i*.4),new xS(t,n,e).getPoints(48)}const lc=t=>new Date(t).toLocaleTimeString("pt-PT",{timeZone:cv,hour:"2-digit",minute:"2-digit",second:"2-digit"}),bi=t=>t.toLocaleString("pt-PT");let rl=null;try{rl=new Intl.DisplayNames(["pt-PT"],{type:"region"})}catch{}const Fa=t=>{try{return t&&(rl==null?void 0:rl.of(t))||t||"?"}catch{return t||"?"}};function Mw(){const t=()=>Math.max(.6,Math.min(window.innerWidth/1920,window.innerHeight/1080)),[e,n]=dt.useState(t);return dt.useEffect(()=>{const i=()=>n(t());return window.addEventListener("resize",i),()=>window.removeEventListener("resize",i)},[]),e}function fv(){if(window.TransicaoAcores){window.TransicaoAcores.sair(Il,"Painel principal");return}document.documentElement.classList.add("saindo"),setTimeout(()=>{location.href=Il},350)}function Ew(t){t.button!==0||t.ctrlKey||t.metaKey||t.shiftKey||(t.preventDefault(),fv())}const Oa=2*6e4,Tw=new URLSearchParams(location.search).get("contagem")==="1",xm=(()=>{const t=new URLSearchParams(location.search);try{return t.has("rodar")&&localStorage.setItem("mapa:rodar",t.get("rodar")==="0"?"0":"1"),localStorage.getItem("mapa:rodar")!=="0"}catch{return t.get("rodar")!=="0"}})();window.addEventListener("pageshow",()=>document.documentElement.classList.remove("saindo"));const ww=Date.now();setInterval(()=>{new Intl.DateTimeFormat("pt-PT",{timeZone:cv,hour:"2-digit",hourCycle:"h23"}).format(new Date)!=="04"||Date.now()-ww<36e5||fetch("api/estado",{cache:"no-store"}).then(e=>{e.ok&&location.reload()}).catch(()=>{})},6e4);function Aw(){var j,V,Q,J;const t=dt.useRef(null),e=dt.useRef(null),n=dt.useRef([]),i=dt.useRef([]),r=dt.useRef(!1),s=dt.useRef(0),[o,a]=dt.useState([]),[l,u]=dt.useState(null),[f,d]=dt.useState(!1),[h,p]=dt.useState(null),[g,x]=dt.useState(Date.now()),[m,c]=dt.useState(xm?Oa:null),_=Mw(),v=dt.useCallback(I=>{const H=e.current;if(!H)return;const{scene:L}=H,G=vm(I.severity),q=Na(I.source.latitude,I.source.longitude,2.01),K=Na(I.target.latitude,I.target.longitude,2.01),fe=new hS(new un().setFromPoints(Sw(q,K)),new ev({color:G.hex,transparent:!0,opacity:.9}));fe.userData={birth:Date.now(),life:2500,type:"arc"},L.add(fe),n.current.push(fe);const Ue=new $t(new Ul(.008,.016,16),new ss({color:G.hex,transparent:!0,opacity:0,side:An}));Ue.position.copy(q),Ue.lookAt(new O(0,0,0)),Ue.userData={birth:Date.now(),life:1200,type:"pulse"},L.add(Ue),n.current.push(Ue)},[]),y=dt.useCallback((I,H)=>{H&&v(I),i.current.unshift(I),i.current.length>gm&&(i.current.length=gm),r.current=!0},[v]);dt.useEffect(()=>{if(!xm)return;let I=Date.now(),H=[];const L=K=>{if(K.type==="mousemove"){const fe=K,Ue=performance.now();H=H.filter(ie=>Ue-ie[0]<=1e3);const W=H.some(ie=>Math.hypot(fe.screenX-ie[1],fe.screenY-ie[2])>=60);if(H=W?[[Ue,fe.screenX,fe.screenY]]:[...H,[Ue,fe.screenX,fe.screenY]],!W)return}I=Date.now(),c(Math.max(0,Oa-(Date.now()-Math.max(I,s.current))))},G=["mousemove","mousedown","keydown","wheel","touchstart"];G.forEach(K=>window.addEventListener(K,L,{passive:!0}));const q=setInterval(()=>{const K=Date.now()-Math.max(I,s.current);c(Math.max(0,Oa-K)),!(K<Oa)&&(I=Date.now(),fetch(`${Il}api/ping`,{mode:"no-cors",cache:"no-store"}).then(fv).catch(()=>console.warn("Painel sem resposta: fica o mapa.")))},1e3);return()=>{clearInterval(q),G.forEach(K=>window.removeEventListener(K,L))}},[]),dt.useEffect(()=>{const I=setInterval(()=>{x(Date.now()),r.current&&(r.current=!1,a([...i.current]))},500);return()=>clearInterval(I)},[]),dt.useEffect(()=>{let I=null,H=null,L=!1;function G(){I=new WebSocket(pw),I.onopen=()=>d(!0),I.onmessage=q=>{let K;try{K=JSON.parse(q.data)}catch{return}if(K.type==="attack")y(K.data,!0);else if(K.type==="history"&&Array.isArray(K.data)){const fe=K.data;fe.forEach((Ue,W)=>y(Ue,W>=fe.length-20))}else K.type==="stats"?u(K.data):K.type==="estado"&&p(K.data)},I.onclose=()=>{d(!1),L||(H=setTimeout(G,mw))},I.onerror=()=>I==null?void 0:I.close()}return G(),()=>{L=!0,I==null||I.close(),H&&clearTimeout(H)}},[y]),dt.useEffect(()=>{const I=t.current;if(!I)return;const H=I.clientWidth,L=I.clientHeight,G=new cS,q=new wn(45,H/L,.1,100),K=new hw({antialias:!0,alpha:!0});K.setSize(H,L),K.setPixelRatio(Math.min(window.devicePixelRatio,2)),K.setClearColor(0,0),I.appendChild(K.domElement);const fe=new O,Ue=()=>{const le=yw(Date.now());fe.copy(Na(le.lat,le.lng,1)).normalize()};Ue();const W=new ti({uniforms:{dia:{value:null},noite:{value:null},sol:{value:fe},temDia:{value:0},temNoite:{value:0}},vertexShader:`varying vec2 vUv; varying vec3 vN;
        void main() { vUv = uv; vN = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform sampler2D dia; uniform sampler2D noite; uniform vec3 sol;
        uniform float temDia; uniform float temNoite;
        varying vec2 vUv; varying vec3 vN;
        void main() {
          float c = dot(normalize(vN), sol);
          // Contraste forte (a primeira versão quase não se notava, 2026-10-01):
          // noite escura e azulada, luzes das cidades acesas, passagem estreita.
          // (Uma faixa dourada de crepúsculo a marcar a linha saiu: o Miguel não
          // gostou.)
          float luz = smoothstep(-0.05, 0.08, c);          // 0 noite, 1 dia
          vec3 d = temDia > 0.5 ? texture2D(dia, vUv).rgb : vec3(0.10, 0.23, 0.36);
          vec3 n = temNoite > 0.5 ? texture2D(noite, vUv).rgb : vec3(0.0);
          vec3 corDia = d * (0.35 + 0.85 * pow(max(c, 0.0), 0.6));
          vec3 luzes = n * n * vec3(1.9, 1.5, 0.9);            // ao quadrado: só as cidades, sem o véu
          vec3 corNoite = d * vec3(0.03, 0.05, 0.10) + luzes;
          gl_FragColor = vec4(mix(corNoite, corDia, luz), 1.0);
        }`});G.add(new $t(new lo(2,64,64),W));const ie=new wS;ie.load(gw,le=>{W.uniforms.dia.value=le,W.uniforms.temDia.value=1}),ie.load(_w,le=>{W.uniforms.noite.value=le,W.uniforms.temNoite.value=1});const ge=setInterval(Ue,3e4);G.add(new $t(new lo(2.005,48,24),new ss({color:871019,wireframe:!0,transparent:!0,opacity:.06}))),G.add(new $t(new lo(2.15,64,64),new ti({vertexShader:`varying vec3 vNormal;
        void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`varying vec3 vNormal;
        void main() { float i = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 4.0); gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * i; }`,blending:tf,side:Zt,transparent:!0})));const oe=Na(37.7412,-25.6756,2.012),Re=new $t(new $d(.03,24),new ss({color:5227511,transparent:!0,opacity:.9,side:An}));Re.position.copy(oe),Re.lookAt(new O(0,0,0)),G.add(Re);const He=new $t(new Ul(.04,.05,32),new ss({color:5227511,transparent:!0,opacity:.6,side:An}));He.position.copy(oe),He.lookAt(new O(0,0,0)),G.add(He);const Le=[];for(let le=0;le<3e3;le++){const Me=15+Math.random()*40,me=Math.random()*Math.PI*2,Oe=Math.acos(2*Math.random()-1);Le.push(Me*Math.sin(Oe)*Math.cos(me),Me*Math.sin(Oe)*Math.sin(me),Me*Math.cos(Oe))}const ct=new un;ct.setAttribute("position",new It(Le,3)),G.add(new pS(ct,new tv({size:.08,transparent:!0,opacity:.6,color:14213872}))),G.add(new PS(3359846,.5));const st=new CS(8961023,.9);st.position.set(5,3,5),G.add(st),e.current={scene:G};let Be=!1,b={x:0,y:0};const wt={theta:1.122,phi:.95},Ge=5.5,De={...wt},Ee={...wt};let Ze=Ge,we=Ge,w=!1;const S=()=>{De.phi=Math.max(.3,Math.min(Math.PI-.3,De.phi)),q.position.set(Ze*Math.sin(De.phi)*Math.sin(De.theta),Ze*Math.cos(De.phi),Ze*Math.sin(De.phi)*Math.cos(De.theta)),q.lookAt(0,0,0)};S();const k=()=>{s.current=Date.now(),w=!1},$=le=>"touches"in le?le.touches[0]:le,ee=le=>{const Me=$(le);Me&&(Be=!0,b={x:Me.clientX,y:Me.clientY},k())},Y=le=>{if(!Be)return;const Me=$(le);Me&&(Ee.theta-=(Me.clientX-b.x)*.005,Ee.phi=Math.max(.3,Math.min(Math.PI-.3,Ee.phi+(Me.clientY-b.y)*.005)),b={x:Me.clientX,y:Me.clientY},k(),"touches"in le&&le.preventDefault())},Se=()=>{Be&&k(),Be=!1},de=le=>{le.preventDefault(),we=Math.max(3,Math.min(12,we+le.deltaY*.004)),k()},Ae=K.domElement;Ae.style.cursor="grab",Ae.addEventListener("mousedown",ee),Ae.addEventListener("mousemove",Y),Ae.addEventListener("wheel",de,{passive:!1}),Ae.addEventListener("touchstart",ee,{passive:!0}),Ae.addEventListener("touchmove",Y,{passive:!1}),window.addEventListener("mouseup",Se),window.addEventListener("touchend",Se);let be=0;const te=()=>{var tt,U;be=requestAnimationFrame(te);const le=Date.now(),Me=Be||le-s.current<ac;if(!Me){if(!w){const se=2*Math.PI;De.theta=wt.theta+((De.theta-wt.theta)%se+se+Math.PI)%se-Math.PI,w=!0}Ee.theta=wt.theta+.6*Math.sin(le/4e4),Ee.phi=wt.phi,we=Ge}const me=Me?.08:.02;De.theta+=(Ee.theta-De.theta)*me,De.phi+=(Ee.phi-De.phi)*me,Ze+=(we-Ze)*me,S();const Oe=le%2e3/2e3;He.scale.set(1+Oe*2.5,1+Oe*2.5,1),He.material.opacity=.6*(1-Oe);const Ne=[];for(const se of n.current){const X=le-se.userData.birth,Z=se.userData.life;if(X>=Z){Ne.push(se);continue}const ue=X/Z;se.userData.type==="pulse"?(se.scale.set(1+ue*2,1+ue*2,1),se.material.opacity=1-ue):se.material.opacity=Math.max(0,.9*(1-ue*ue))}for(const se of Ne)G.remove(se),(tt=se.geometry)==null||tt.dispose(),(U=se.material)==null||U.dispose();Ne.length&&(n.current=n.current.filter(se=>!Ne.includes(se))),K.render(G,q)};te();const _e=()=>{q.aspect=I.clientWidth/I.clientHeight,q.updateProjectionMatrix(),K.setSize(I.clientWidth,I.clientHeight)};return window.addEventListener("resize",_e),()=>{cancelAnimationFrame(be),clearInterval(ge),window.removeEventListener("resize",_e),window.removeEventListener("mouseup",Se),window.removeEventListener("touchend",Se),K.dispose(),I.contains(K.domElement)&&I.removeChild(K.domElement)}},[]);const C=h!=null&&h.ultimo_ok?g-h.ultimo_ok>5*6e4:!0,R=f?h!=null&&h.erro?{cor:"#d92b4a",txt:"XSIAM com erro — mapa parado"}:h!=null&&h.ultimo_ok?C?{cor:"#f0862a",txt:`Sem dados novos desde ${lc(h.ultimo_ok)}`}:{cor:"#3fb970",txt:"Em direto · atraso ~5 min"}:{cor:"#f0862a",txt:"A ler o primeiro minuto…"}:{cor:"#d92b4a",txt:"Sem ligação ao servidor do mapa"},A=Math.max(1,_m.reduce((I,H)=>I+((l==null?void 0:l.severidade[H])??0),0)),P=((j=l==null?void 0:l.paises[0])==null?void 0:j[1])??1,T=((V=l==null?void 0:l.hosts[0])==null?void 0:V[1])??1,M=l!=null&&l.minutos?l.minutos>=60?"última hora":`últimos ${l.minutos} min`:"—",D={zoom:_};return ae.jsxs("div",{style:Te.container,children:[ae.jsx("div",{style:Te.bgGradient}),ae.jsx("div",{ref:t,style:Te.globe}),ae.jsxs("div",{style:{...Te.topBar,...D},children:[ae.jsx("a",{href:Il,style:Te.voltar,onClick:Ew,children:"← Painel principal"}),ae.jsxs("div",{style:Te.logo,children:[ae.jsx("span",{style:Te.logoDot}),"MAPA DE ATAQUES · Azores Cyber 360"]}),ae.jsxs("div",{style:Te.statusBadge,title:(h==null?void 0:h.erro)??"",children:[ae.jsx("span",{style:{...Te.statusDot,background:R.cor}}),R.txt]}),g-s.current<ac&&ae.jsxs("div",{style:Te.livre,children:["Modo livre · volta à animação em ",Math.ceil((ac-(g-s.current))/1e3)," s"]}),ae.jsx("div",{style:{marginLeft:"auto"}}),m!==null&&Tw&&ae.jsxs("div",{style:Te.voltaEm,children:["painel em ",Math.floor(m/6e4),":",String(Math.floor(m/1e3)%60).padStart(2,"0")]}),ae.jsxs("div",{style:Te.relogio,children:[lc(g)," ",ae.jsx("span",{style:Te.tz,children:"Açores"})]})]}),((Q=l==null?void 0:l.ddos)==null?void 0:Q.ativo)&&ae.jsxs("div",{style:{...Te.ddos,...D},role:"alert",children:[ae.jsx("span",{style:Te.ddosTitulo,children:"⚠ DDoS em curso"}),ae.jsx("span",{children:((J=l.ddos.hosts[0])==null?void 0:J[0])??"sites do GRA"}),ae.jsxs("span",{style:Te.ddosMeta,children:[bi(l.ddos.pedidos)," pedidos travados · ",bi(l.ddos.paises)," ",l.ddos.paises===1?"país":"países"," · últimos ",l.ddos.minutos," min"]})]}),ae.jsxs("div",{style:{...Te.leftPanel,...D},children:[ae.jsxs("div",{style:Te.sectionTitle,children:["Resumo · ",M]}),ae.jsxs("div",{style:Te.statGrid,children:[ae.jsx(ka,{label:"Pedidos travados",value:l?bi(l.total):"—"}),ae.jsx(ka,{label:"IPs de origem",value:l?bi(l.ips):"—"}),ae.jsx(ka,{label:"Países",value:l?bi(l.n_paises):"—"}),ae.jsx(ka,{label:"Origem principal",value:l!=null&&l.paises[0]?Fa(l.paises[0][0]):"—"})]}),ae.jsx("div",{style:Te.sectionTitle,children:"Severidade"}),ae.jsx("div",{style:Te.bars,children:_m.map(I=>{const H=(l==null?void 0:l.severidade[I])??0;return ae.jsxs("div",{style:Te.row,children:[ae.jsx("span",{style:{...Te.sevLabel,color:uo[I].css},children:uo[I].label}),ae.jsx("div",{style:Te.barBg,children:ae.jsx("div",{style:{...Te.barFill,width:`${H/A*100}%`,background:uo[I].css}})}),ae.jsx("span",{style:Te.count,children:bi(H)})]},I)})}),ae.jsx("div",{style:Te.legenda,children:"Crítico: DDoS · Alto: WAF (exploração) · Médio: regras próprias, país, ASN · Baixo: desafios a bots"}),ae.jsx("div",{style:Te.sectionTitle,children:"Países de origem"}),ae.jsx("div",{style:Te.bars,children:((l==null?void 0:l.paises)??[]).map(([I,H])=>ae.jsxs("div",{style:Te.row,children:[ae.jsx("span",{style:Te.nome,title:I,children:Fa(I)}),ae.jsx("div",{style:Te.barBg,children:ae.jsx("div",{style:{...Te.barFill,width:`${H/P*100}%`,background:"#4fc3f7"}})}),ae.jsx("span",{style:Te.count,children:bi(H)})]},I))}),ae.jsx("div",{style:Te.sectionTitle,children:"Sites atacados"}),ae.jsx("div",{style:Te.bars,children:((l==null?void 0:l.hosts)??[]).map(([I,H])=>ae.jsxs("div",{style:Te.row,children:[ae.jsx("span",{style:{...Te.nome,width:"150px"},title:I,children:I}),ae.jsx("div",{style:Te.barBg,children:ae.jsx("div",{style:{...Te.barFill,width:`${H/T*100}%`,background:"#5b8def"}})}),ae.jsx("span",{style:Te.count,children:bi(H)})]},I))})]}),ae.jsxs("div",{style:{...Te.rightPanel,...D},children:[ae.jsx("div",{style:Te.sectionTitle,children:"Últimos pedidos travados"}),ae.jsxs("div",{style:Te.attackLog,children:[o.length===0&&ae.jsx("div",{style:Te.vazio,children:f?"À espera do primeiro minuto do XSIAM…":"Sem ligação ao servidor."}),o.map(I=>{const H=vm(I.severity),L=vw(I);return ae.jsxs("div",{style:{...Te.attackCard,borderLeftColor:H.css},children:[ae.jsxs("div",{style:Te.attackHeader,children:[ae.jsx("span",{style:{...Te.sevBadge,background:H.css+"22",color:H.css},children:H.label}),ae.jsx("span",{style:Te.attackType,title:I.attack_type,children:I.attack_type}),ae.jsx("span",{style:Te.attackTime,children:lc(I.t)})]}),ae.jsxs("div",{style:Te.attackDetails,children:[ae.jsxs("span",{style:Te.trunca,title:`${I.source.ip} · ${I.source.city}, ${Fa(I.source.country??"")}`,children:[I.source.ip," · ",Fa(I.source.country??"")," → ",I.target.city]}),ae.jsxs("span",{style:Te.meta,children:[I.count>1&&ae.jsxs("span",{style:Te.rep,children:["×",I.count]}),ae.jsx("span",{style:Te.acao,children:xw[(I.action??"").toLowerCase()]??I.action}),L&&ae.jsx("span",{style:Te.mitreBadge,title:L.nome,children:L.id})]})]})]},I.id)})]})]}),ae.jsxs("div",{style:{...Te.bottomBar,...D},children:[ae.jsx("span",{children:"Fonte: Cloudflare (cloudflare_waf_raw) via Cortex XSIAM · pedidos bloqueados e desafiados à frente dos sites do GRA · destino nos Açores"}),ae.jsx("span",{children:"Origem: cidade e coordenadas da própria Cloudflare · dia e noite pela posição real do Sol · sem dados simulados"})]})]})}function ka({label:t,value:e}){return ae.jsxs("div",{style:Te.statCard,children:[ae.jsx("div",{style:Te.statLabel,children:t}),ae.jsx("div",{style:Te.statValue,children:e})]})}const jr={background:"rgba(10, 15, 30, 0.75)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"12px"},Te={container:{position:"relative",width:"100vw",height:"100vh",overflow:"hidden",background:"#020810",fontFamily:"'Inter','Segoe UI',system-ui,sans-serif",color:"#e0e6ed"},bgGradient:{position:"absolute",inset:0,background:"radial-gradient(ellipse at 50% 50%, rgba(10,40,80,0.4) 0%, transparent 70%)",pointerEvents:"none",zIndex:0},globe:{position:"absolute",inset:0,zIndex:1},topBar:{position:"absolute",top:0,left:0,right:0,zIndex:10,display:"flex",alignItems:"center",gap:"16px",padding:"12px 20px",...jr,borderRadius:0,borderTop:"none",borderLeft:"none",borderRight:"none"},voltar:{color:"#e0e6ed",textDecoration:"none",fontSize:"13px",fontWeight:600,padding:"5px 12px",borderRadius:"8px",border:"1px solid rgba(255,255,255,0.15)",background:"rgba(255,255,255,0.06)",whiteSpace:"nowrap"},logo:{display:"flex",alignItems:"center",gap:"8px",fontSize:"15px",fontWeight:700,letterSpacing:"1px",color:"#4fc3f7"},logoDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#4fc3f7",boxShadow:"0 0 8px #4fc3f7"},statusBadge:{display:"flex",alignItems:"center",gap:"6px",padding:"4px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:600,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)"},statusDot:{width:"8px",height:"8px",borderRadius:"50%"},livre:{fontSize:"12px",fontWeight:600,color:"#4fc3f7",padding:"4px 12px",borderRadius:"20px",border:"1px solid rgba(79,195,247,0.4)",background:"rgba(79,195,247,0.08)"},ddos:{position:"absolute",top:"64px",left:"50%",transform:"translateX(-50%)",zIndex:12,display:"flex",alignItems:"baseline",gap:"14px",padding:"10px 22px",borderRadius:"10px",background:"rgba(150, 18, 40, 0.92)",border:"1px solid #ff6b81",color:"#fff",boxShadow:"0 0 24px rgba(217, 43, 74, 0.6)",fontSize:"15px",fontWeight:600,whiteSpace:"nowrap"},ddosTitulo:{fontSize:"13px",fontWeight:800,letterSpacing:"1.5px",textTransform:"uppercase",color:"#ffd6dc"},ddosMeta:{fontSize:"12px",fontWeight:500,color:"#ffd6dc"},voltaEm:{fontSize:"11px",color:"#8899aa",whiteSpace:"nowrap"},relogio:{marginLeft:"16px",fontSize:"18px",fontWeight:700,fontVariantNumeric:"tabular-nums"},tz:{fontSize:"11px",fontWeight:500,color:"#8899aa"},leftPanel:{position:"absolute",top:"56px",left:"12px",width:"330px",zIndex:10,...jr,padding:"14px",display:"flex",flexDirection:"column",gap:"10px"},statGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"},statCard:{...jr,padding:"10px 12px",borderRadius:"8px",background:"rgba(20,30,50,0.6)"},statLabel:{fontSize:"10px",color:"#8899aa",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"4px"},statValue:{fontSize:"20px",fontWeight:700,color:"#e0e6ed",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},sectionTitle:{fontSize:"11px",color:"#8899aa",textTransform:"uppercase",letterSpacing:"1px",fontWeight:600,marginTop:"4px"},legenda:{fontSize:"10px",color:"#667788",lineHeight:1.4},bars:{display:"flex",flexDirection:"column",gap:"5px"},row:{display:"flex",alignItems:"center",gap:"8px"},sevLabel:{fontSize:"10px",fontWeight:700,width:"58px",textAlign:"right"},nome:{fontSize:"12px",width:"110px",color:"#c0ccdd",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},barBg:{flex:1,height:"6px",borderRadius:"3px",background:"rgba(255,255,255,0.06)",overflow:"hidden"},barFill:{height:"100%",borderRadius:"3px",transition:"width 0.5s ease"},count:{fontSize:"11px",color:"#aab6c4",width:"52px",textAlign:"right",fontVariantNumeric:"tabular-nums"},rightPanel:{position:"absolute",top:"56px",right:"12px",bottom:"40px",width:"380px",zIndex:10,...jr,padding:"14px",display:"flex",flexDirection:"column",gap:"8px"},attackLog:{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",gap:"6px"},vazio:{fontSize:"12px",color:"#8899aa",padding:"8px 0"},attackCard:{...jr,padding:"7px 10px",borderRadius:"8px",background:"rgba(20,30,50,0.5)",borderLeft:"3px solid",flexShrink:0},attackHeader:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"3px"},sevBadge:{padding:"1px 6px",borderRadius:"4px",fontSize:"9px",fontWeight:700,letterSpacing:"0.5px",flexShrink:0},attackType:{fontSize:"12px",fontWeight:600,color:"#c0ccdd",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},attackTime:{marginLeft:"auto",fontSize:"10px",color:"#8899aa",flexShrink:0,fontVariantNumeric:"tabular-nums"},attackDetails:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"8px",fontSize:"11px",color:"#8fa0b2"},trunca:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},meta:{display:"flex",gap:"5px",alignItems:"center",flexShrink:0},rep:{fontWeight:700,color:"#e0e6ed"},acao:{fontSize:"10px",color:"#8899aa"},mitreBadge:{padding:"1px 6px",borderRadius:"4px",fontSize:"9px",fontWeight:600,background:"rgba(161,120,240,0.15)",color:"#c4a8f5",cursor:"help"},bottomBar:{position:"absolute",bottom:0,left:0,right:0,zIndex:10,display:"flex",justifyContent:"space-between",padding:"8px 20px",fontSize:"10px",color:"#667788",...jr,borderRadius:0,borderBottom:"none",borderLeft:"none",borderRight:"none"}};function Rw(){return ae.jsx(jx,{children:ae.jsx(Aw,{})})}D_(document.getElementById("root")).render(ae.jsx(dt.StrictMode,{children:ae.jsx(Rw,{})}));
