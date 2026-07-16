const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class s{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=r.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(i,e))}return e}toString(){return this.cssText}}const o=(e,...t)=>{const r=1===e.length?e[0]:t.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new s(r,e,i)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;var a;const l=window,c=l.trustedTypes,d=c?c.emptyScript:"",h=l.reactiveElementPolyfillSupport,u={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},m=(e,t)=>t!==e&&(t==t||e==e),p={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:m},f="finalized";class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Ep(i,t);void 0!==r&&(this._$Ev.set(r,i),e.push(r))})),e}static createProperty(e,t=p){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||p}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var i;const r=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{t?i.adoptedStyleSheets=r.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):r.forEach((t=>{const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}))})(r,this.constructor.elementStyles),r}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=p){var r;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:u).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$El=null}}_$AK(e,t){var i;const r=this.constructor,s=r._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=r.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:u;this._$El=s,this[s]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||m)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var v;g[f]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:g}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.6.3");const _=window,y=_.trustedTypes,b=y?y.createPolicy("lit-html",{createHTML:e=>e}):void 0,w="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,x="?"+$,S=`<${x}>`,M=document,A=()=>M.createComment(""),I=e=>null===e||"object"!=typeof e&&"function"!=typeof e,C=Array.isArray,R="[ \t\n\f\r]",E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,D=/-->/g,k=/>/g,N=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),T=/'/g,L=/"/g,O=/^(?:script|style|textarea|title)$/i,Y=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),P=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),z=new WeakMap,F=M.createTreeWalker(M,129,null,!1);function U(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(t):t}const j=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":"",n=E;for(let a=0;a<i;a++){const t=e[a];let i,l,c=-1,d=0;for(;d<t.length&&(n.lastIndex=d,l=n.exec(t),null!==l);)d=n.lastIndex,n===E?"!--"===l[1]?n=D:void 0!==l[1]?n=k:void 0!==l[2]?(O.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=N):void 0!==l[3]&&(n=N):n===N?">"===l[0]?(n=null!=s?s:E,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,i=l[1],n=void 0===l[3]?N:'"'===l[3]?L:T):n===L||n===T?n=N:n===D||n===k?n=E:(n=N,s=void 0);const h=n===N&&e[a+1].startsWith("/>")?" ":"";o+=n===E?t+S:c>=0?(r.push(i),t.slice(0,c)+w+t.slice(c)+$+h):t+$+(-2===c?(r.push(void 0),a):h)}return[U(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),r]};class B{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[l,c]=j(e,t);if(this.el=B.createElement(l,i),F.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=F.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith(w)||t.startsWith($)){const i=c[o++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+w).split($),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?K:"?"===t[1]?J:"@"===t[1]?X:G})}else a.push({type:6,index:s})}for(const t of e)r.removeAttribute(t)}if(O.test(r.tagName)){const e=r.textContent.split($),t=e.length-1;if(t>0){r.textContent=y?y.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],A()),F.nextNode(),a.push({type:2,index:++s});r.append(e[t],A())}}}else if(8===r.nodeType)if(r.data===x)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf($,e+1));)a.push({type:7,index:s}),e+=$.length-1}s++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function V(e,t,i=e,r){var s,o,n,a;if(t===P)return t;let l=void 0!==r?null===(s=i._$Co)||void 0===s?void 0:s[r]:i._$Cl;const c=I(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,r)),void 0!==r?(null!==(n=(a=i)._$Co)&&void 0!==n?n:a._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(t=V(e,l._$AS(e,t.values),l,r)),t}class q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:r}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:M).importNode(i,!0);F.currentNode=s;let o=F.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new W(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new Q(o,this,e)),this._$AV.push(t),l=r[++a]}n!==(null==l?void 0:l.index)&&(o=F.nextNode(),n++)}return F.currentNode=M,s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class W{constructor(e,t,i,r){var s;this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cp=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=V(this,e,t),I(e)?e===H||null==e||""===e?(this._$AH!==H&&this._$AR(),this._$AH=H):e!==this._$AH&&e!==P&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>C(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==H&&I(this._$AH)?this._$AA.nextSibling.data=e:this.$(M.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:r}=e,s="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=B.createElement(U(r.h,r.h[0]),this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new q(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=z.get(e.strings);return void 0===t&&z.set(e.strings,t=new B(e)),t}T(e){C(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new W(this.k(A()),this.k(A()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class G{constructor(e,t,i,r,s){this.type=1,this._$AH=H,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=H}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=V(this,e,t,0),o=!I(e)||e!==this._$AH&&e!==P,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=V(this,r[i+n],t,n),a===P&&(a=this._$AH[n]),o||(o=!I(a)||a!==this._$AH[n]),a===H?e=H:e!==H&&(e+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(e)}j(e){e===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class K extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===H?void 0:e}}const Z=y?y.emptyScript:"";class J extends G{constructor(){super(...arguments),this.type=4}j(e){e&&e!==H?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class X extends G{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=V(this,e,t,0))&&void 0!==i?i:H)===P)return;const r=this._$AH,s=e===H&&r!==H||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==H&&(r===H||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Q{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){V(this,e)}}const ee=_.litHtmlPolyfillSupport;null==ee||ee(B,W),(null!==(v=_.litHtmlVersions)&&void 0!==v?v:_.litHtmlVersions=[]).push("2.8.0");var te,ie;class re extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var r,s;const o=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new W(t.insertBefore(A(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return P}}re.finalized=!0,re._$litElement$=!0,null===(te=globalThis.litElementHydrateSupport)||void 0===te||te.call(globalThis,{LitElement:re});const se=globalThis.litElementPolyfillSupport;var oe;null==se||se({LitElement:re}),(null!==(ie=globalThis.litElementVersions)&&void 0!==ie?ie:globalThis.litElementVersions=[]).push("3.3.3"),null===(oe=window.HTMLSlotElement)||void 0===oe||oe.prototype.assignedElements,console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function ne(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ae={exports:{}};ae.exports=function(){var e=1e3,t=6e4,i=36e5,r="millisecond",s="second",o="minute",n="hour",a="day",l="week",c="month",d="quarter",h="year",u="date",m="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,g={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},v=function(e,t,i){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(i)+e},_={s:v,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),r=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+v(r,2,"0")+":"+v(s,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var r=12*(i.year()-t.year())+(i.month()-t.month()),s=t.clone().add(r,c),o=i-s<0,n=t.clone().add(r+(o?-1:1),c);return+(-(r+(i-s)/(o?s-n:n-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:h,w:l,d:a,D:u,h:n,m:o,s:s,ms:r,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=g;var w="$isDayjsObject",$=function(e){return e instanceof A||!(!e||!e[w])},x=function e(t,i,r){var s;if(!t)return y;if("string"==typeof t){var o=t.toLowerCase();b[o]&&(s=o),i&&(b[o]=i,s=o);var n=t.split("-");if(!s&&n.length>1)return e(n[0])}else{var a=t.name;b[a]=t,s=a}return!r&&s&&(y=s),s||!r&&y},S=function(e,t){if($(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new A(i)},M=_;M.l=x,M.i=$,M.w=function(e,t){return S(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var A=function(){function g(e){this.$L=x(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[w]=!0}var v=g.prototype;return v.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(p);if(r){var s=r[2]-1||0,o=(r[7]||"0").substring(0,3);return i?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(t)}(e),this.init()},v.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},v.$utils=function(){return M},v.isValid=function(){return!(this.$d.toString()===m)},v.isSame=function(e,t){var i=S(e);return this.startOf(t)<=i&&i<=this.endOf(t)},v.isAfter=function(e,t){return S(e)<this.startOf(t)},v.isBefore=function(e,t){return this.endOf(t)<S(e)},v.$g=function(e,t,i){return M.u(e)?this[t]:this.set(i,e)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(e,t){var i=this,r=!!M.u(t)||t,d=M.p(e),m=function(e,t){var s=M.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return r?s:s.endOf(a)},p=function(e,t){return M.w(i.toDate()[e].apply(i.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},f=this.$W,g=this.$M,v=this.$D,_="set"+(this.$u?"UTC":"");switch(d){case h:return r?m(1,0):m(31,11);case c:return r?m(1,g):m(0,g+1);case l:var y=this.$locale().weekStart||0,b=(f<y?f+7:f)-y;return m(r?v-b:v+(6-b),g);case a:case u:return p(_+"Hours",0);case n:return p(_+"Minutes",1);case o:return p(_+"Seconds",2);case s:return p(_+"Milliseconds",3);default:return this.clone()}},v.endOf=function(e){return this.startOf(e,!1)},v.$set=function(e,t){var i,l=M.p(e),d="set"+(this.$u?"UTC":""),m=(i={},i[a]=d+"Date",i[u]=d+"Date",i[c]=d+"Month",i[h]=d+"FullYear",i[n]=d+"Hours",i[o]=d+"Minutes",i[s]=d+"Seconds",i[r]=d+"Milliseconds",i)[l],p=l===a?this.$D+(t-this.$W):t;if(l===c||l===h){var f=this.clone().set(u,1);f.$d[m](p),f.init(),this.$d=f.set(u,Math.min(this.$D,f.daysInMonth())).$d}else m&&this.$d[m](p);return this.init(),this},v.set=function(e,t){return this.clone().$set(e,t)},v.get=function(e){return this[M.p(e)]()},v.add=function(r,d){var u,m=this;r=Number(r);var p=M.p(d),f=function(e){var t=S(m);return M.w(t.date(t.date()+Math.round(e*r)),m)};if(p===c)return this.set(c,this.$M+r);if(p===h)return this.set(h,this.$y+r);if(p===a)return f(1);if(p===l)return f(7);var g=(u={},u[o]=t,u[n]=i,u[s]=e,u)[p]||1,v=this.$d.getTime()+r*g;return M.w(v,this)},v.subtract=function(e,t){return this.add(-1*e,t)},v.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||m;var r=e||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),o=this.$H,n=this.$m,a=this.$M,l=i.weekdays,c=i.months,d=i.meridiem,h=function(e,i,s,o){return e&&(e[i]||e(t,r))||s[i].slice(0,o)},u=function(e){return M.s(o%12||12,e,"0")},p=d||function(e,t,i){var r=e<12?"AM":"PM";return i?r.toLowerCase():r};return r.replace(f,(function(e,r){return r||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return M.s(t.$y,4,"0");case"M":return a+1;case"MM":return M.s(a+1,2,"0");case"MMM":return h(i.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return t.$D;case"DD":return M.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return h(i.weekdaysMin,t.$W,l,2);case"ddd":return h(i.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(o);case"HH":return M.s(o,2,"0");case"h":return u(1);case"hh":return u(2);case"a":return p(o,n,!0);case"A":return p(o,n,!1);case"m":return String(n);case"mm":return M.s(n,2,"0");case"s":return String(t.$s);case"ss":return M.s(t.$s,2,"0");case"SSS":return M.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(r,u,m){var p,f=this,g=M.p(u),v=S(r),_=(v.utcOffset()-this.utcOffset())*t,y=this-v,b=function(){return M.m(f,v)};switch(g){case h:p=b()/12;break;case c:p=b();break;case d:p=b()/3;break;case l:p=(y-_)/6048e5;break;case a:p=(y-_)/864e5;break;case n:p=y/i;break;case o:p=y/t;break;case s:p=y/e;break;default:p=y}return m?p:M.a(p)},v.daysInMonth=function(){return this.endOf(c).$D},v.$locale=function(){return b[this.$L]},v.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),r=x(e,t,!0);return r&&(i.$L=r),i},v.clone=function(){return M.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},g}(),I=A.prototype;return S.prototype=I,[["$ms",r],["$s",s],["$m",o],["$H",n],["$W",a],["$M",c],["$y",h],["$D",u]].forEach((function(e){I[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),S.extend=function(e,t){return e.$i||(e(t,A,S),e.$i=!0),S},S.locale=x,S.isDayjs=$,S.unix=function(e){return S(1e3*e)},S.en=b[y],S.Ls=b,S.p={},S}();var le=ne(ae.exports),ce={exports:{}};ce.exports=function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,i=/\d\d/,r=/\d\d?/,s=/\d*[^-_:/,()\s\d]+/,o={},n=function(e){return(e=+e)+(e>68?1900:2e3)},a=function(e){return function(t){this[e]=+t}},l=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),i=60*t[1]+(+t[2]||0);return 0===i?0:"+"===t[0]?-i:i}(e)}],c=function(e){var t=o[e];return t&&(t.indexOf?t:t.s.concat(t.f))},d=function(e,t){var i,r=o.meridiem;if(r){for(var s=1;s<=24;s+=1)if(e.indexOf(r(s,0,t))>-1){i=s>12;break}}else i=e===(t?"pm":"PM");return i},h={A:[s,function(e){this.afternoon=d(e,!1)}],a:[s,function(e){this.afternoon=d(e,!0)}],S:[/\d/,function(e){this.milliseconds=100*+e}],SS:[i,function(e){this.milliseconds=10*+e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[i,a("day")],Do:[s,function(e){var t=o.ordinal,i=e.match(/\d+/);if(this.day=i[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r)}],M:[r,a("month")],MM:[i,a("month")],MMM:[s,function(e){var t=c("months"),i=(c("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(i<1)throw new Error;this.month=i%12||i}],MMMM:[s,function(e){var t=c("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[/[+-]?\d+/,a("year")],YY:[i,function(e){this.year=n(e)}],YYYY:[/\d{4}/,a("year")],Z:l,ZZ:l};function u(i){var r,s;r=i,s=o&&o.formats;for(var n=(i=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,i,r){var o=r&&r.toUpperCase();return i||s[r]||e[r]||s[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,i){return t||i.slice(1)}))}))).match(t),a=n.length,l=0;l<a;l+=1){var c=n[l],d=h[c],u=d&&d[0],m=d&&d[1];n[l]=m?{regex:u,parser:m}:c.replace(/^\[|\]$/g,"")}return function(e){for(var t={},i=0,r=0;i<a;i+=1){var s=n[i];if("string"==typeof s)r+=s.length;else{var o=s.regex,l=s.parser,c=e.slice(r),d=o.exec(c)[0];l.call(t,d),e=e.replace(d,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var i=e.hours;t?i<12&&(e.hours+=12):12===i&&(e.hours=0),delete e.afternoon}}(t),t}}return function(e,t,i){i.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(n=e.parseTwoDigitYear);var r=t.prototype,s=r.parse;r.parse=function(e){var t=e.date,r=e.utc,n=e.args;this.$u=r;var a=n[1];if("string"==typeof a){var l=!0===n[2],c=!0===n[3],d=l||c,h=n[2];c&&(h=n[2]),o=this.$locale(),!l&&h&&(o=i.Ls[h]),this.$d=function(e,t,i){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var r=u(t)(e),s=r.year,o=r.month,n=r.day,a=r.hours,l=r.minutes,c=r.seconds,d=r.milliseconds,h=r.zone,m=new Date,p=n||(s||o?1:m.getDate()),f=s||m.getFullYear(),g=0;s&&!o||(g=o>0?o-1:m.getMonth());var v=a||0,_=l||0,y=c||0,b=d||0;return h?new Date(Date.UTC(f,g,p,v,_,y,b+60*h.offset*1e3)):i?new Date(Date.UTC(f,g,p,v,_,y,b)):new Date(f,g,p,v,_,y,b)}catch(e){return new Date("")}}(t,a,r),this.init(),h&&!0!==h&&(this.$L=this.locale(h).$L),d&&t!=this.format(a)&&(this.$d=new Date("")),o={}}else if(a instanceof Array)for(var m=a.length,p=1;p<=m;p+=1){n[1]=a[p-1];var f=i.apply(this,n);if(f.isValid()){this.$d=f.$d,this.$L=f.$L,this.init();break}p===m&&(this.$d=new Date(""))}else s.call(this,e)}}}();var de=ne(ce.exports),he={exports:{}};he.exports=function(e,t,i){e=e||{};var r=t.prototype,s={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function o(e,t,i,s){return r.fromToBase(e,t,i,s)}i.en.relativeTime=s,r.fromToBase=function(t,r,o,n,a){for(var l,c,d,h=o.$locale().relativeTime||s,u=e.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=u.length,p=0;p<m;p+=1){var f=u[p];f.d&&(l=n?i(t).diff(o,f.d,!0):o.diff(t,f.d,!0));var g=(e.rounding||Math.round)(Math.abs(l));if(d=l>0,g<=f.r||!f.r){g<=1&&p>0&&(f=u[p-1]);var v=h[f.l];a&&(g=a(""+g)),c="string"==typeof v?v.replace("%d",g):v(g,r,f.l,d);break}}if(r)return c;var _=d?h.future:h.past;return"function"==typeof _?_(c):_.replace("%s",c)},r.to=function(e,t){return o(e,t,this,!0)},r.from=function(e,t){return o(e,t,this)};var n=function(e){return e.$u?i.utc():i()};r.toNow=function(e){return this.to(n(this),e)},r.fromNow=function(e){return this.from(n(this),e)}};var ue=ne(he.exports);const me=new Set(["responsive","right","left","bottom","top","hidden"]);le.extend(de),le.extend(ue);customElements.define("gallery-card",class extends re{static get properties(){return{_hass:{},config:{},resources:{type:Array},currentResourceIndex:{type:Number},selectedDate:{type:Object},_itemsToShow:{type:Number},_isDateFiltered:{type:Boolean},_isLoading:{type:Boolean},_previewErrorIndex:{type:Number},errors:{type:Array}}}constructor(){super(),this.resources=void 0,this.currentResourceIndex=0,this._itemsToShow=10,this.selectedDate=null,this._isDateFiltered=!1,this._isInitialLoad=!1,this._isLoading=!1,this._previewErrorIndex=void 0,this.errors=[],this._hasKeyNavigationListener=!1,this._keyNavigationHandler=e=>this._keyNavigation(e),this._mediaResolveCache=new Map,this._mediaResolveInflight=new Map,this._queuedResolveIds=new Map,this._mediaResolveCacheMs=9e6,this._mediaBrowseCache=new Map,this._mediaBrowseInflight=new Map,this._browseCacheGeneration=0,this._loadToken=0,this._pendingLoadRequested=!1,this._slideshowTimer=void 0}render(){if(!this.config)return Y``;const e=(this.config.menu_alignment||"responsive").toLowerCase(),t=this.resources||[],i=t.length>0,r=this.errors.length>0,s=Boolean(this.config.title||this.config.enable_date_search||this.config.show_reload||r),o=i?this._currentResource():void 0,n=o&&(o.resolveError||this._previewErrorIndex===this.currentResourceIndex),a=this.config.show_reload?"媒体加载失败，请点击刷新后重试":"媒体加载失败，请检查媒体来源";return Y`
      <ha-card class="menu-${e}">
        <div class="resource-viewer" @touchstart="${e=>this._handleTouchStart(e)}" @touchmove="${e=>this._handleTouchMove(e)}">
          <figure>
            ${this._isLoading?this._renderLoadingState("正在加载媒体..."):i?n?this._renderErrorState(a):o.pendingAuth?this._renderLoadingState("正在加载预览..."):o.isHass?Y`
                  <hui-image @click="${e=>this._popupCamera(e)}"
                                      .hass=${this._hass}
                                      .cameraImage=${o.name}
                                      .cameraView=${"live"}
                                    ></hui-image>
                `:this._isImageExtension(o.extension)?Y`<img @click="${e=>this._popupImage(e)}" @error="${()=>this._handlePreviewError()}" src="${o.url}" alt="${o.caption||o.name}"/>`:Y`<video controls ?loop=${this.config.video_loop} ?autoplay=${this.config.video_autoplay} ?muted=${this.config.video_muted} src="${o.url}#t=0.1" @error="${()=>this._handlePreviewError()}" @loadedmetadata="${e=>this._videoMetadataLoaded(e)}" @canplay="${e=>this._startVideo(e)}" 
                            @ended="${()=>this._videoHasEnded()}" preload="metadata" playsinline webkit-playsinline></video>`:this._renderEmptyState(r?a:"没有可显示的图片或视频")}
          </figure>
          ${!this._isLoading&&i?Y`<div class="viewer-nav">
            <button type="button" class="nav-icon-btn nav-left" @click="${()=>this._selectResource(this.currentResourceIndex-1)}" aria-label="上一个" title="上一个">
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>
            <button type="button" class="nav-icon-btn nav-right" @click="${()=>this._selectResource(this.currentResourceIndex+1)}" aria-label="下一个" title="下一个">
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>
          </div>`:Y``}
        </div>
        <div class="resource-menu-container">
          ${s?Y`
            <div class="card-header-actions">
              <div class="header-leading">
                ${this.config.title?Y`<div class="card-title" title="${this.config.title}">${this.config.title}</div>`:Y``}
              </div>
              ${this.config.enable_date_search?Y`<div class="date-filter-container">
                <input type="date" class="date-picker" @change="${this._handleDateChange}" .value="${this._formatDateForInput(this.selectedDate)}">
              </div>`:Y``}
              <div class="header-trailing">
                ${this.config.enable_date_search?Y`<button type="button" class="action-text btn-clear-date" @click="${this._clearDateFilter}" style="visibility: ${this._isDateFiltered?"visible":"hidden"};">清除</button>`:Y``}
                ${this.config.show_reload?Y`<button type="button" class="icon-button btn-reload" @click="${this._reloadResources}" ?disabled=${this._isLoading} aria-label="刷新媒体" title="刷新媒体">
                  <ha-icon icon="mdi:refresh"></ha-icon>
                </button>`:Y``}
              </div>
            </div>
          `:Y``}
          ${r?Y`<div class="error-list" role="status">
            ${this.errors.map((e=>Y`<hui-warning>${e}</hui-warning>`))}
          </div>`:Y``}
          <div class="resource-menu">
            ${this._isLoading?this._renderMenuLoadingState():i?t.slice(0,this._itemsToShow).map(((e,t)=>Y`
                    <figure id="resource${t}" data-imageIndex="${t}" @click="${()=>this._selectResource(t)}" @keydown="${e=>this._handleResourceKeydown(e,t)}" class="${t===this.currentResourceIndex?"selected":""}" tabindex="0" role="button" aria-label="${e.caption||e.name||`媒体 ${t+1}`}">
                    ${e.pendingAuth?Y`<div class="thumbnail-loading" data-resource-index="${t}">
                            <div class="skeleton-media"></div>
                          </div>`:e.resolveError?Y`<div class="thumbnail-error">
                            <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
                            <span>加载失败</span>
                          </div>`:e.isHass?Y`
                          <hui-image
                            .hass=${this._hass}
                            .cameraImage=${e.name}
                            .cameraView=${"live"}
                          ></hui-image>
                        `:this._isImageExtension(e.extension)?Y`<img class="lzy_img" data-src="${e.url}" @load="${e=>this._handleThumbnailLoad(e)}" @error="${e=>this._handleThumbnailError(e)}" alt="${e.caption||e.name}" decoding="async"/>`:this.config.video_preload??1?Y`<video class="lzy_video" preload="metadata" data-src="${e.url}#t=${void 0===this.config.preview_video_at?.1:this.config.preview_video_at}" @error="${e=>this._handleThumbnailError(e)}" @loadedmetadata="${e=>this._videoMetadataLoaded(e)}" muted playsinline></video>`:Y`<div class="video-placeholder"><ha-icon class="play-icon" icon="mdi:movie-play-outline"></ha-icon></div>`}
                    <figcaption>${e.caption}</figcaption>
                    </figure>
                  `)):Y`<div class="menu-empty">暂无媒体</div>`}
            ${this._itemsToShow<t.length?Y`<button type="button" class="load-more" @click="${this._loadMore}">更多 (${t.length-this._itemsToShow})</button>`:Y``}
          </div>
        </div>
        <div id="imageModal" class="modal" @click="${this._closeImageModal}" @touchstart="${e=>this._handleTouchStart(e)}" @touchmove="${e=>this._handleTouchMove(e)}">
          <button type="button" class="modal-close" @click="${this._closeImageModal}" aria-label="关闭预览" title="关闭预览"><ha-icon icon="mdi:close"></ha-icon></button>
          <img class="modal-content" id="popupImage" @click="${e=>e.stopPropagation()}" alt="">
          <div id="popupCaption"></div>
        </div>
      </ha-card>
    `}_renderLoadingState(e){return Y`
      <div class="loading-state" role="status" aria-live="polite">
        <div class="loading-spinner"></div>
        <div class="loading-label">${e}</div>
      </div>
    `}_renderEmptyState(e){return Y`
      <div class="empty-state">
        <ha-icon icon="mdi:image-off-outline"></ha-icon>
        <div class="empty-label">${e}</div>
      </div>
    `}_renderErrorState(e){return Y`
      <div class="empty-state error-state" role="alert">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <div class="empty-label">${e}</div>
      </div>
    `}_renderMenuLoadingState(){const e=Math.min(this._itemsToShow||10,10);return Array.from({length:e},(()=>Y`
      <figure class="resource-skeleton" aria-hidden="true">
        <div class="skeleton-media"></div>
        <div class="skeleton-caption"></div>
      </figure>
    `))}connectedCallback(){super.connectedCallback(),this._createImageObserver(),this.requestUpdate()}updated(){this._createImageObserver();const e=this.shadowRoot.querySelectorAll("img.lzy_img, video.lzy_video, .thumbnail-loading[data-resource-index]");for(const t of e)t.dataset.src&&(t.closest("figure")?.classList.remove("media-load-error"),this.imageObserver.observe(t)),void 0!==t.dataset.resourceIndex&&this.imageObserver.observe(t)}_createImageObserver(){this.imageObserver||(this.imageObserver=new IntersectionObserver((e=>{const t=[];for(const i of e)if(i.isIntersecting){const e=i.target;if(void 0!==e.dataset.resourceIndex){const i=Number.parseInt(e.dataset.resourceIndex),r=this.resources?.[i];r?.pendingAuth&&r.mediaContentId&&t.push(r)}else e.dataset.src&&(e.src=e.dataset.src,"VIDEO"===e.tagName&&e.load(),delete e.dataset.src);this.imageObserver.unobserve(e)}if(t.length>0){const e=new Map(t.map((e=>[e.mediaContentId,e])));this._resolvePendingResourceBatch([...e.values()],this._hass,this._loadToken)}})))}setConfig(e){if(!e||!e.entity&&!e.entities)throw new Error("Required configuration for entities is missing");const t=(Array.isArray(e.entities)?e.entities:e.entities?[e.entities]:[]).map((e=>"object"==typeof e?{...e}:e));if(e.entity&&t.push(e.entity),0===t.length)throw new Error("At least one entity or media source is required");const i=String(e.menu_alignment||"responsive").toLowerCase(),r=Number.parseInt(e.items_per_page),s=Number(e.browse_cache_seconds),o=Number.parseInt(e.media_cache_size),n=Number.parseInt(e.resolve_concurrency),a=Number.parseInt(e.date_search_adjacent_days),l=JSON.stringify(this.config?.entities||[]),c={...e};delete c.entity,this.config={...c,entities:t,menu_alignment:me.has(i)?i:"responsive",items_per_page:Number.isFinite(r)&&r>0?r:10,browse_cache_seconds:Number.isFinite(s)&&s>=0?s:20,media_cache_size:Number.isFinite(o)&&o>0?o:500,resolve_concurrency:Number.isFinite(n)&&n>0?Math.min(n,8):4,date_search_adjacent_days:Number.isFinite(a)&&a>=0?Math.min(a,7):1},l!==JSON.stringify(t)&&this._clearBrowseCache(),this._itemsToShow=this.config.items_per_page,this._previewErrorIndex=void 0,void 0!==this._hass&&this._loadResources(this._hass),this._clearSlideshowTimer(),this._doSlideShow(!0)}set hass(e){this._hass=e,this.config&&void 0===this.resources&&this._loadResources(this._hass)}disconnectedCallback(){super.disconnectedCallback(),this._removeKeyNavigationListener(),this._clearSlideshowTimer(),this.imageObserver&&this.imageObserver.disconnect()}getCardSize(){return 1}_isImageExtension(e){return"string"==typeof e&&/\.(?:jpeg|jpg|gif|png|tiff|bmp|webp|avif)$/i.test(`.${e}`)}_doSlideShow(e){if(this._clearSlideshowTimer(),e||this._selectResource(this.currentResourceIndex+1,!0),this.config.slideshow_timer){const e=Number.parseInt(this.config.slideshow_timer);!Number.isNaN(e)&&e>0&&(this._slideshowTimer=setTimeout((()=>{this._doSlideShow()}),1e3*e))}}_clearSlideshowTimer(){this._slideshowTimer&&(clearTimeout(this._slideshowTimer),this._slideshowTimer=void 0)}_loadMore(){const e=this.config.items_per_page;this._itemsToShow=Math.min(this._itemsToShow+e,this.resources.length)}_selectResource(e,t){if(this.autoPlayVideo=!0,!this.resources||0===this.resources.length)return;let i=Number.isFinite(e)?e:0;i<0?i=this.resources.length-1:i>=this.resources.length&&(i=0),i>=this._itemsToShow&&(this._itemsToShow=Math.min(i+this.config.items_per_page,this.resources.length)),this.currentResourceIndex=i,this._previewErrorIndex=void 0;const r=this.resources[this.currentResourceIndex];if(r.resolveError&&r.mediaContentId&&(this._mediaResolveCache.delete(r.mediaContentId),this.resources=this.resources.map(((e,t)=>t===this.currentResourceIndex?{...e,pendingAuth:!0,resolveError:!1}:e))),this._resolveResourceUrl(this.resources[this.currentResourceIndex]),this._loadImageForPopup(),t&&this.parentNode&&this.parentNode.tagName&&"hui-card-preview"===this.parentNode.tagName.toLowerCase())return;const s=this.shadowRoot.querySelector("#resource"+this.currentResourceIndex);s&&s.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}_getResource(e){return void 0!==this.resources&&void 0!==e&&this.resources.length>0?this.resources[e]:{url:"",name:"",extension:"jpg",caption:void 0===e?"Loading resources...":"No images or videos to display",index:0}}_currentResource(){return this._getResource(this.currentResourceIndex)}_startVideo(e){if(this.autoPlayVideo){const t=e.target.play();t&&t.catch((()=>{}))}}_videoMetadataLoaded(e){e.target.closest("figure")?.classList.remove("media-load-error");const t=this.config.show_duration??!0,i=e.target.closest("figure")?.querySelector(".duration");!Number.isNaN(Number.parseInt(e.target.duration))&&t&&i&&(i.textContent="["+this._getFormattedVideoDuration(e.target.duration)+"]"),this.config.video_muted&&(e.target.muted=!0)}_videoHasEnded(){this.config.slideshow_video_end&&(this._clearSlideshowTimer(),this._doSlideShow())}_popupCamera(){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:this._currentResource().name},this.dispatchEvent(e)}_popupImage(){this.shadowRoot.querySelector("#imageModal").style.display="block",this._loadImageForPopup()}_closeImageModal(){this.shadowRoot.querySelector("#imageModal").style.display="none"}_reloadResources(){this._mediaResolveCache.clear(),this._clearBrowseCache(),this._previewErrorIndex=void 0,this._loadResources(this._hass)}_clearBrowseCache(){this._browseCacheGeneration++,this._mediaBrowseCache.clear(),this._mediaBrowseInflight.clear()}_handlePreviewError(){const e=this._currentResource();if(e.mediaContentId&&!e.resolveRetried)return this._mediaResolveCache.delete(e.mediaContentId),this.resources=this.resources.map(((e,t)=>t===this.currentResourceIndex?{...e,pendingAuth:!0,resolveError:!1,resolveRetried:!0}:e)),void this._resolveResourceUrl(this.resources[this.currentResourceIndex]);this._previewErrorIndex=this.currentResourceIndex}_handleThumbnailError(e){e.currentTarget.closest("figure")?.classList.add("media-load-error")}_handleThumbnailLoad(e){e.currentTarget.closest("figure")?.classList.remove("media-load-error")}_handleResourceKeydown(e,t){"Enter"!==e.code&&"Space"!==e.code||(e.preventDefault(),this._selectResource(t))}_loadImageForPopup(){const e=this.shadowRoot.querySelector("#imageModal"),t=this.shadowRoot.querySelector("#popupImage"),i=this.shadowRoot.querySelector("#popupCaption");if("block"===e.style.display){if(this._currentResource().pendingAuth)return;t.src=this._currentResource().url,t.alt=this._currentResource().caption||this._currentResource().name,i.textContent=this._currentResource().caption}}_getFormattedVideoDuration(e){let t=Number.parseInt(e/60);t<10&&(t="0"+t);let i=Number.parseInt(e%60);return i="0"+i,i=i.slice(Math.max(0,i.length-2)),t+":"+i}_keyNavigation(e){const t=e.composedPath()[0],i=t?.isContentEditable||["INPUT","TEXTAREA","SELECT","VIDEO"].includes(t?.tagName),r=this.shadowRoot.querySelector("#imageModal");if("Escape"!==e.code||"block"!==r?.style.display){if(!i&&(this.matches(":hover")||this.shadowRoot.activeElement))switch(e.code){case"ArrowDown":case"ArrowRight":e.preventDefault(),this._selectResource(this.currentResourceIndex+1);break;case"ArrowUp":case"ArrowLeft":e.preventDefault(),this._selectResource(this.currentResourceIndex-1)}}else this._closeImageModal()}_handleTouchStart(e){this.xDown=e.touches[0].clientX,this.yDown=e.touches[0].clientY}_handleTouchMove(e){if(void 0===this.xDown||void 0===this.yDown)return;const t=e.touches[0].clientX,i=e.touches[0].clientY,r=this.xDown-t,s=this.yDown-i;let o=!1;Math.abs(r)>=40&&Math.abs(r)>Math.abs(s)?(r>0?(this._selectResource(this.currentResourceIndex+1),e.preventDefault()):(this._selectResource(this.currentResourceIndex-1),e.preventDefault()),o=!0):Math.abs(s)>=40&&(o=!0),o&&(this.xDown=void 0,this.yDown=void 0)}_handleDateChange(e){e.target.value?this.selectedDate=le(e.target.value).toDate():this.selectedDate=null,this._isDateFiltered=null!==this.selectedDate,this._loadResources(this._hass)}_clearDateFilter(){this.selectedDate=null,this._isDateFiltered=!1,this._loadResources(this._hass)}_convertOldFormat(e){return e&&"string"==typeof e?e.replace(/%YYY/g,"YYYY").replace(/%Y/g,"YYYY").replace(/%m/g,"MM").replace(/%d/g,"DD").replace(/%H/g,"HH").replace(/%M/g,"mm").replace(/%S/g,"ss"):e}async _loadResources(e){if(!e||!this.config)return;if(this._isLoading)return void(this._pendingLoadRequested=!0);const t=++this._loadToken;this._isLoading=!0,this.currentResourceIndex=void 0,this.resources=[],this.errors=[],this._previewErrorIndex=void 0;let i=(this.config.enable_date_search??!1)&&this._isDateFiltered;const r=Number(this.config.maximum_files),s=Number.isFinite(r)&&r>0?Math.floor(r):void 0,o=this.config.maximum_files_per_entity??!0,n=o?void 0:s,a=this._convertOldFormat(this.config.folder_format),l=this._convertOldFormat(this.config.file_name_format),c=this.config.file_name_date_begins,d=this._convertOldFormat(this.config.caption_format),h=this.config.parsed_date_sort??!1,u=this.config.reverse_sort??!0,m=this.config.random_sort??!1,p=o||!h&&!m?s:void 0,f=()=>{const t=[];for(const r of this.config.entities){let s,o=!1,n=!0,h=!0,m=a,f=l,g=c,v=d;if(r&&"object"==typeof r?(s=r.path,r.recursive&&(o=r.recursive),void 0!==r.include_video&&(n=r.include_video),void 0!==r.include_images&&(h=r.include_images),r.folder_format&&(m=this._convertOldFormat(r.folder_format)),r.file_name_format&&(f=this._convertOldFormat(r.file_name_format)),r.file_name_date_begins&&(g=r.file_name_date_begins),r.caption_format&&(v=this._convertOldFormat(r.caption_format))):s=r,"string"==typeof s&&s.trim())if("media-source://"===s.substring(0,15).toLowerCase())t.push(this._loadMediaResource(e,s,p,m,f,g,v,o,u,n,h,i));else{const r=e.states[s];void 0===r?t.push(Promise.resolve({error:!0,entity:s,message:"Invalid Entity ID"})):(void 0!==r.attributes.entity_picture&&t.push(this._loadCameraResource(s,r)),void 0!==r.attributes.fileList&&t.push(this._loadFilesResources(r.attributes.fileList,p,f,g,v,u,i)),void 0!==r.attributes.file_list&&t.push(this._loadFilesResources(r.attributes.file_list,p,f,g,v,u,i)))}else t.push(Promise.resolve({error:!0,entity:String(s||"未配置来源"),message:"Invalid media source"}))}return t};try{let e=await Promise.all(f()),t=e.filter((e=>!e.error)).flat(Number.POSITIVE_INFINITY);if(i&&(t=this._filterResourcesForSelectedDate(t)),this._isInitialLoad&&i&&0===t.length){let r=0,s=le(this.selectedDate);for(;0===t.length&&r<30;)r++,s=s.subtract(1,"day"),this.selectedDate=s.toDate(),e=await Promise.all(f()),t=e.filter((e=>!e.error)).flat(Number.POSITIVE_INFINITY),i&&(t=this._filterResourcesForSelectedDate(t));0===t.length&&(this._isDateFiltered=!1,i=!1,e=await Promise.all(f()),t=e.filter((e=>!e.error)).flat(Number.POSITIVE_INFINITY))}if(this._isInitialLoad=!1,this.resources=t,h&&(u?this.resources.sort((function(e,t){return t.date-e.date})):this.resources.sort((function(e,t){return e.date-t.date}))),m)for(let i=this.resources.length-1;i>0;i--){const e=Math.floor(Math.random()*(i+1));i!==e&&([this.resources[i],this.resources[e]]=[this.resources[e],this.resources[i]])}void 0!==n&&!Number.isNaN(n)&&n<this.resources.length&&(this.resources=this.resources.filter((function(e){return!!e.isHass||this.count<n&&(this.count++,!0)}),{count:this.resources.filter((e=>e.isHass)).length})),this.currentResourceIndex=0,this._resolveResourceUrl(this.resources[0]),this._addKeyNavigationListener();const r=e.filter((e=>e.error)).flat(Number.POSITIVE_INFINITY);this.errors=r.map((e=>e.message+" "+e.entity));for(const i of r)this._hass.callService("system_log","write",{message:"Gallery Card Error:  "+i.message+"   "+i.entity})}catch(g){t===this._loadToken&&(this.resources=[],this.currentResourceIndex=0,this.errors=[g?.message||"Unknown gallery loading error"]),console.error("Gallery Card failed to load resources",g)}finally{t===this._loadToken&&(this._isLoading=!1,this._pendingLoadRequested&&(this._pendingLoadRequested=!1,this._loadResources(this._hass)))}}_addKeyNavigationListener(){this._hasKeyNavigationListener||this.parentNode&&this.parentNode.tagName&&"hui-card-preview"===this.parentNode.tagName.toLowerCase()||(document.addEventListener("keydown",this._keyNavigationHandler),this._hasKeyNavigationListener=!0)}_removeKeyNavigationListener(){this._hasKeyNavigationListener&&(document.removeEventListener("keydown",this._keyNavigationHandler),this._hasKeyNavigationListener=!1)}async _loadMediaResource(e,t,i,r,s,o,n,a,l,c,d,h){let u=t;try{let p=[];const f=h&&Boolean(s),g=f&&this.config.date_search_adjacent_days>0,v=f?void 0:i;if(!h&&r&&l&&void 0!==i&&!Number.isNaN(i)){let s=le(),o="";const n=[];for(;p.length<i;){const a=s.format(r);if(u=t+"/"+a,a!==o)try{const t=await this._loadMedia(this,e,u,i,!1,l,c,d,!1,!1);p.push(...t)}catch(m){if("browse_media_failed"!==m.code)throw m;n.push(u)}if(n.length>2){if(0===p.length)throw u=n.join(","),new Error("Failed to browse several folders and found no media files.  Verify your settings are correct.");break}o=a,s=s.subtract(12,"hour")}p.sort(((e,t)=>String(t.title||"").localeCompare(String(e.title||"")))),p.length>i&&(p.length=i)}else p=await this._loadMedia(this,e,u,v,a,l,c,d,h,g);let _=[];for(const e of p){const t=e.pending_authentication?this._createPendingMediaResource(e,s,o,n):this._createFileResource(e.authenticated_path,s,o,n);void 0!==t&&(t.mediaContentId=e.media_content_id,_.push(t))}return f&&(_=this._filterResourcesForSelectedDate(_)),void 0!==i&&i<_.length&&(_.length=i),_}catch(m){return console.error("Gallery Card failed to load media source",m),{error:!0,entity:u,message:m.message}}}async _loadMedia(e,t,i,r,s,o,n,a,l,c){const d={media_class:"directory",media_content_id:i};"/"!==i.substring(i.length-1,i.length)&&"media-source://media_source"!==i&&(d.media_content_id+="/");const h=Number.isFinite(r)&&r>0,u=(s&&h?await this._fetchMediaLimited(e,t,d,r,o,n,a,l,c):await Promise.all(this._fetchMedia(e,t,d,s,n,a,l,c))).flat(Number.POSITIVE_INFINITY).filter((function(e){return void 0!==e})).sort((function(e,t){return e.title>t.title?1:e.title<t.title?-1:0}));return o&&u.reverse(),void 0!==r&&!Number.isNaN(r)&&r<u.length&&(u.length=r),u.map((e=>({...e,pending_authentication:!0})))}_fetchMedia(e,t,i,r,s,o,n,a){const l=[];return"directory"===i.media_class&&(i.children?l.push(...i.children.filter((t=>this._shouldIncludeMediaItem(e,t,r,s,o,n,a))).map((i=>Promise.all(e._fetchMedia(e,t,i,r,s,o,n,a))))):l.push(e._fetchMediaContents(t,i.media_content_id).then((i=>Promise.all(e._fetchMedia(e,t,i,r,s,o,n,a)))))),"directory"!==i.media_class&&l.push(Promise.resolve(i)),l}async _fetchMediaLimited(e,t,i,r,s,o,n,a,l){const c=[],d=s?-1:1,h=async i=>{if(c.length>=r)return;if("directory"!==i.media_class)return void c.push(i);const s=[...(i.children?i:await this._fetchMediaContents(t,i.media_content_id)).children||[]].filter((t=>this._shouldIncludeMediaItem(e,t,!0,o,n,a,l))).sort(((e,t)=>String(e.title||"").localeCompare(String(t.title||""))*d));for(const e of s){if(c.length>=r)break;"directory"===e.media_class?await h(e):c.push(e)}};return await h(i),c}_shouldIncludeMediaItem(e,t,i,r,s,o,n){if(!t||"@eaDir/"===t.title)return!1;if("video"===t.media_class)return r;if("image"===t.media_class)return s;if(!i||"directory"!==t.media_class)return!1;if(!o)return!0;const a=e.config.search_date_folder_format||"DD_MM_YYYY",l=String(t.title||"").replace(/\/$/,""),c=le(l,a,!0);if(!c.isValid()||c.format(a)!==l)return!0;return e._getDateSearchFolderNames(a,n).has(l)}_fetchMediaContents(e,t){const i=1e3*this.config.browse_cache_seconds,r=this._mediaBrowseCache.get(t);if(i>0&&r?.expiresAt>Date.now())return this._refreshCacheEntry(this._mediaBrowseCache,t,r),Promise.resolve(r.value);if(r&&this._mediaBrowseCache.delete(t),this._mediaBrowseInflight.has(t))return this._mediaBrowseInflight.get(t);const s=this._browseCacheGeneration,o=e.callWS({type:"media_source/browse_media",media_content_id:t}).then((e=>(i>0&&s===this._browseCacheGeneration&&this._setLimitedCacheEntry(this._mediaBrowseCache,t,{value:e,expiresAt:Date.now()+i},100),e))).finally((()=>{this._mediaBrowseInflight.get(t)===o&&this._mediaBrowseInflight.delete(t)}));return this._mediaBrowseInflight.set(t,o),o}_fetchMediaItem(e,t){return e.callWS({type:"media_source/resolve_media",media_content_id:t,expires:10800})}_fetchMediaItemWithCache(e,t){const i=this._mediaResolveCache.get(t);if(i&&i.expiresAt>Date.now())return this._refreshCacheEntry(this._mediaResolveCache,t,i),Promise.resolve({url:i.url});if(i&&this._mediaResolveCache.delete(t),this._mediaResolveInflight.has(t))return this._mediaResolveInflight.get(t);const r=this._fetchMediaItem(e,t).then((e=>(this._setLimitedCacheEntry(this._mediaResolveCache,t,{url:e.url,expiresAt:Date.now()+this._mediaResolveCacheMs},this.config.media_cache_size),e))).finally((()=>{this._mediaResolveInflight.delete(t)}));return this._mediaResolveInflight.set(t,r),r}_refreshCacheEntry(e,t,i){e.delete(t),e.set(t,i)}_setLimitedCacheEntry(e,t,i,r){for(this._refreshCacheEntry(e,t,i);e.size>r;){const t=e.keys().next().value;e.delete(t)}}_loadCameraResource(e,t){const i={url:t.attributes.entity_picture,name:e,extension:"jpg",caption:t.attributes.friendly_name??e,isHass:!0};return Promise.resolve(i)}_loadFilesResources(e,t,i,r,s,o,n){let a=[];if(Array.isArray(e)){e=[...e].filter((e=>"string"==typeof e&&!e.includes("@eaDir"))),o&&e.reverse(),!n&&void 0!==t&&!Number.isNaN(t)&&t<e.length&&(e.length=t);for(const t of e){const e=t;let o;if(e.startsWith("/local/")||e.startsWith("http://")||e.startsWith("https://"))o=e;else if(e.includes("/config/www/"))o=e.replace("/config/www/","/local/");else if(e.includes("/www/"))o="/local/"+e.slice(e.indexOf("/www/")+5);else{if(e.startsWith("/"))continue;o="/local/"+e}const n=this._createFileResource(o,i,r,s);void 0!==n&&a.push(n)}n&&i&&(a=this._filterResourcesForSelectedDate(a)),void 0!==t&&t<a.length&&(a.length=t)}return Promise.resolve(a)}_createFileResource(e,t,i,r){if(!e)return;let s;const o=e.split("?")[0];let n=o.split("/").at(-1),a="",l="";if("@eaDir"!==n){const c=n.split(".").at(-1).toLowerCase();n=n.slice(0,Math.max(0,n.length-c.length-1));try{n=decodeURIComponent(n)}catch{}" "!==r&&(l=n);let d=n;i&&!Number.isNaN(Number.parseInt(i))&&(d=d.slice(Math.max(0,Number.parseInt(i)-1))),t&&(a=le(d,t)),a&&r&&("AGO"===r.toUpperCase().trim()?l=a.fromNow():(l=a.format(r),l=l.replaceAll(/ago/gi,a.fromNow()))),s={url:e,base_url:o,name:n,extension:c,caption:l,index:-1,date:a,dateFilterable:Boolean(t)}}return s}_createPendingMediaResource(e,t,i,r){const s=this._createFileResource(e.title||e.media_content_id,t,i,r);if(s)return{...s,url:"",mediaContentId:e.media_content_id,pendingAuth:!0}}async _resolvePendingResourceBatch(e,t,i){const r=this.config.resolve_concurrency,s=e.filter((e=>this._queuedResolveIds.get(e.mediaContentId)!==i&&(this._queuedResolveIds.set(e.mediaContentId,i),!0)));try{for(let e=0;e<s.length;e+=r){if(i!==this._loadToken)return;const o=s.slice(e,e+r),n=await Promise.all(o.map((async e=>{try{const i=await this._fetchMediaItemWithCache(t,e.mediaContentId);return{mediaContentId:e.mediaContentId,url:i.url}}catch(i){return console.error("Gallery Card failed to resolve media URL",i),{mediaContentId:e.mediaContentId,error:!0}}})));this._applyResourceResolutionResults(n,i)}}finally{for(const e of s)this._queuedResolveIds.get(e.mediaContentId)===i&&this._queuedResolveIds.delete(e.mediaContentId)}}_resolveResourceUrl(e,t=this._hass,i=this._loadToken){return e&&e.pendingAuth&&e.mediaContentId?this._fetchMediaItemWithCache(t,e.mediaContentId).then((t=>{const r={mediaContentId:e.mediaContentId,url:t.url};return this._applyResourceResolutionResults([r],i),r})).catch((t=>{this._applyResourceResolutionResults([{mediaContentId:e.mediaContentId,error:!0}],i),console.error("Gallery Card failed to resolve media URL",t)})):Promise.resolve()}_applyResourceResolutionResults(e,t){if(t!==this._loadToken||0===e.length)return;const i=new Map(e.map((e=>[e.mediaContentId,e])));this.resources=(this.resources||[]).map((e=>{const t=i.get(e.mediaContentId);return t?t.error?{...e,pendingAuth:!1,resolveError:!0}:{...e,url:t.url,pendingAuth:!1,resolveError:!1}:e})),e.some((e=>!e.error))&&this._loadImageForPopup()}_folderDateFormatter(e,t){return le(t).format(e)}_getDateSearchFolderNames(e,t){const i=t?this.config.date_search_adjacent_days:0,r=le(this.selectedDate),s=new Set;for(let o=-i;o<=i;o++)s.add(r.add(o,"day").format(e));return s}_filterResourcesForSelectedDate(e){const t=le(this.selectedDate).format("YYYY-MM-DD");return e.filter((e=>!e.dateFilterable||!(!e.date||!le(e.date).isValid())&&le(e.date).format("YYYY-MM-DD")===t))}_formatDateForInput(e){return e?le(e).format("YYYY-MM-DD"):""}static get styles(){return o`
      :host {
        --gallery-card-primary-color: var(--primary-color, #03a9f4);
        --gallery-card-text-color: var(--primary-text-color, #212121);
        --gallery-card-bg-color: var(--card-background-color, #fff);
        display: block;
        container-type: inline-size;
      }
      .content {
        overflow: hidden;
      }
      ha-card {
        height: 100%;
        max-height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: var(--gallery-card-bg-color);
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2));
      }
      .resource-viewer {
        position: sticky;
        top: var(--header-height, 56px);
        z-index: 2;
        width: 100%;
        background: radial-gradient(circle, #2c2c2c 0%, #111 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        align-self: flex-start;
        height: calc(100dvh - var(--header-height, 56px));
        max-height: calc(100dvh - var(--header-height, 56px));
      }
      .resource-viewer::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: inset 0 0 80px rgba(0,0,0,0.4);
        pointer-events: none;
      }
      .resource-viewer figure {
        width: 100%;
        height: 100%;
        margin: 0 !important;
        box-sizing: border-box;
      }
      img, video {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        transition: opacity 0.3s ease;
      }
      .loading-state,
      .empty-state {
        width: 100%;
        height: 100%;
        min-height: 160px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: rgba(255, 255, 255, 0.82);
        text-align: center;
        box-sizing: border-box;
      }
      .loading-spinner {
        width: 36px;
        height: 36px;
        border: 3px solid rgba(255, 255, 255, 0.24);
        border-top-color: var(--gallery-card-primary-color);
        border-radius: 50%;
        animation: gallery-card-spin 0.8s linear infinite;
      }
      .loading-label,
      .empty-label {
        font-size: 0.95em;
        font-weight: 500;
      }
      .empty-state ha-icon {
        --mdc-icon-size: 42px;
        opacity: 0.75;
      }
      .error-state ha-icon {
        color: var(--error-color, #db4437);
      }
      .resource-menu-container {
        display: flex;
        flex-direction: column;
        background: var(--secondary-background-color, #f5f5f5);
        overflow: hidden;
        min-height: 0;
      }
      .card-header-actions {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        min-height: 48px;
        box-sizing: border-box;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        background: var(--gallery-card-bg-color);
      }
      @container (max-width: 599px) {
        .card-header-actions {
          padding: 6px 12px;
        }
      }
      .action-text {
        cursor: pointer;
        color: var(--gallery-card-primary-color);
        border: 0;
        background: transparent;
        font-family: inherit;
        font-size: 0.9em;
        font-weight: 500;
        padding: 4px 8px;
        border-radius: 4px;
        transition: background 0.2s;
        white-space: nowrap;
      }
      .action-text:hover {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
      }
      .header-leading {
        grid-column: 1;
        min-width: 0;
      }
      .card-title {
        color: var(--gallery-card-text-color);
        font-size: 0.95em;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .header-trailing {
        grid-column: 3;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 2px;
      }
      .icon-button {
        width: 32px;
        height: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: var(--gallery-card-text-color);
        cursor: pointer;
      }
      .icon-button:hover {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
        color: var(--gallery-card-primary-color);
      }
      .icon-button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      .btn-clear-date {
        color: var(--error-color, #db4437);
      }
      .date-filter-container {
        grid-column: 2;
        display: flex;
        align-items: center;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        padding: 4px 10px;
        border: 1px solid var(--divider-color, #e0e0e0);
        height: 32px;
        box-sizing: border-box;
      }
      .date-picker {
        border: none;
        background: transparent;
        color: var(--gallery-card-text-color);
        font-family: inherit;
        outline: none;
        font-size: 0.95em;
        cursor: pointer;
        text-align: center;
        height: 24px;
        line-height: normal;
      }
      .error-list {
        flex: none;
        max-height: 112px;
        padding: 8px;
        overflow-y: auto;
        box-sizing: border-box;
        background: var(--gallery-card-bg-color);
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 12px;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
        color: #fff;
        text-align: center;
        box-sizing: border-box;
      }
      .caption-text {
        font-weight: 500;
        font-size: 1.1em;
        margin-bottom: 4px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .caption-details {
        font-size: 0.9em;
        opacity: 0.8;
      }
      .zoom-link {
        color: var(--gallery-card-primary-color);
        text-decoration: none;
        margin-left: 8px;
      }
      .viewer-nav {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        pointer-events: none;
      }
      .nav-icon-btn {
        pointer-events: auto;
        width: 44px;
        height: 44px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s ease, background 0.2s ease;
        user-select: none;
      }
      .nav-icon-btn ha-icon {
        --mdc-icon-size: 30px;
      }
      .resource-viewer:hover .nav-icon-btn,
      .nav-icon-btn:focus-visible {
        opacity: 1;
      }
      .nav-icon-btn:hover {
        background: rgba(0, 0, 0, 0.8);
      }
      .resource-menu {
        padding: 12px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        grid-auto-rows: max-content;
        gap: 12px;
        overflow-y: auto;
        align-content: flex-start;
        min-height: 0;
        width: 100%;
        box-sizing: border-box;
      }
      .resource-menu::-webkit-scrollbar {
        width: 4px;
      }
      .resource-menu::-webkit-scrollbar-thumb {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.3);
        border-radius: 4px;
      }
      .resource-menu figure {
        margin: 0 !important;
        width: 100%;
        height: auto;
        cursor: pointer;
        border-radius: 8px;
        overflow: hidden;
        background: #222;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        position: relative;
        aspect-ratio: 16/9;
        align-self: start;
        box-sizing: border-box;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      }
      .resource-menu figure:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 15px rgba(0,0,0,0.4);
      }
      .resource-menu figure.selected {
        outline: 2px solid var(--gallery-card-primary-color);
        outline-offset: 2px;
        box-shadow: 0 0 0 4px rgba(var(--rgb-primary-color, 3, 169, 244), 0.2);
      }
      .resource-menu figure:focus-visible {
        outline: 2px solid var(--gallery-card-primary-color);
        outline-offset: 2px;
      }
      .resource-skeleton {
        cursor: default !important;
        box-shadow: none !important;
        pointer-events: none;
      }
      .resource-skeleton:hover {
        transform: none;
        box-shadow: none;
      }
      .skeleton-media {
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, #242424 0%, #363636 45%, #242424 90%);
        background-size: 220% 100%;
        animation: gallery-card-shimmer 1.2s ease-in-out infinite;
      }
      .skeleton-caption {
        position: absolute;
        left: 10px;
        right: 10px;
        bottom: 8px;
        height: 8px;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.3);
      }
      .menu-empty {
        grid-column: 1 / -1;
        padding: 20px 8px;
        color: var(--secondary-text-color, #727272);
        text-align: center;
        font-size: 0.9em;
      }
      .thumbnail-loading,
      .thumbnail-error,
      .video-placeholder {
        width: 100%;
        height: 100%;
      }
      .thumbnail-error,
      .video-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 4px;
        color: rgba(255, 255, 255, 0.76);
        font-size: 0.78em;
      }
      .thumbnail-error ha-icon,
      .video-placeholder ha-icon {
        --mdc-icon-size: 28px;
      }
      .resource-menu figure.media-load-error img,
      .resource-menu figure.media-load-error video {
        display: none;
      }
      .resource-menu figure.media-load-error::before {
        content: "加载失败";
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(255, 255, 255, 0.76);
        font-size: 0.78em;
      }
      .resource-menu img, .resource-menu video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .resource-menu .lzy_img:not([src]),
      .resource-menu .lzy_video:not([src]) {
        opacity: 0;
      }
      .resource-menu figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 4px;
        font-size: 0.7em;
        background: rgba(0,0,0,0.6);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      @container (min-width: 600px) {
        .resource-menu figcaption {
          font-size: 1.1em;
        }
      }
      .load-more {
        grid-column: 1 / -1;
        width: 100%;
        text-align: center;
        padding: 6px;
        border: 0;
        background: transparent;
        font: inherit;
        cursor: pointer;
        color: var(--gallery-card-primary-color);
        font-weight: 500;
        transition: background 0.2s;
        border-radius: 4px;
      }
      .load-more:hover {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
      }

      /* Layout modes */
      .menu-responsive {
        flex-direction: column;
      }
      @container (min-width: 600px) {
        .menu-responsive,
        .menu-right,
        .menu-left {
          height: calc(100dvh - var(--header-height, 56px));
          max-height: calc(100dvh - var(--header-height, 56px));
        }
        .menu-responsive {
          flex-direction: row;
        }
        .menu-responsive .resource-viewer {
          flex: 1 1 auto;
          min-width: 0;
        }
        .menu-responsive .resource-menu-container {
          flex: 0 0 clamp(220px, 25%, 360px);
          width: clamp(220px, 25%, 360px);
          height: 100%;
          max-height: 100%;
        }
        .menu-responsive .resource-menu {
          flex: 1 1 0;
          grid-template-columns: 1fr;
        }
      }
      .menu-bottom .resource-menu-container {
        order: 2;
      }
      .menu-bottom .resource-menu {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
      }
      .menu-bottom .resource-menu figure {
        min-width: 120px;
      }
      .menu-right { flex-direction: row; }
      .menu-right .resource-viewer,
      .menu-left .resource-viewer { flex: 1 1 auto; min-width: 0; }
      .menu-right .resource-menu-container { width: clamp(220px, 25%, 360px); height: 100%; max-height: 100%; }
      .menu-right .resource-menu { flex: 1 1 0; grid-template-columns: 1fr; }
      .menu-left { flex-direction: row-reverse; }
      .menu-left .resource-menu-container { width: clamp(220px, 25%, 360px); height: 100%; max-height: 100%; }
      .menu-left .resource-menu { flex: 1 1 0; grid-template-columns: 1fr; }
      .menu-top { flex-direction: column-reverse; }
      .menu-top .resource-menu { display: flex; overflow-x: auto; overflow-y: hidden; }
      .menu-top .resource-menu figure { min-width: 120px; }
      .menu-hidden .resource-menu-container { display: none; }

      @container (max-width: 599px) {
        ha-card {
          flex-direction: column !important;
          height: auto;
          max-height: none;
          overflow: visible;
        }
        .resource-viewer {
          position: relative;
          top: 0;
          height: auto;
          max-height: none;
          aspect-ratio: 16/9;
          width: 100% !important;
        }
        .resource-menu-container {
          width: 100% !important;
          height: auto !important;
          max-height: none !important;
          overflow: visible;
        }
        .resource-menu {
          grid-template-columns: repeat(3, 1fr) !important;
          display: grid !important;
          flex: none !important;
          overflow-y: visible;
        }
        .nav-icon-btn {
          opacity: 0.82;
          width: 38px;
          height: 38px;
        }
      }

      @container (max-width: 340px) {
        .resource-menu {
          grid-template-columns: repeat(2, 1fr) !important;
        }
      }

      /* Modal */
      .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.95);
        backdrop-filter: blur(5px);
      }
      .modal-content {
        margin: auto;
        display: block;
        max-width: 90%;
        max-height: 85%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: zoom 0.3s;
      }
      .modal-close {
        position: absolute;
        z-index: 1;
        top: max(12px, env(safe-area-inset-top));
        right: max(12px, env(safe-area-inset-right));
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        cursor: pointer;
      }
      .modal-close ha-icon {
        --mdc-icon-size: 28px;
      }
      #popupCaption {
        position: absolute;
        bottom: 20px;
        width: 100%;
        text-align: center;
        color: #fff;
        font-size: 1.2em;
      }
      @keyframes zoom {
        from {transform: translate(-50%, -50%) scale(0.8); opacity: 0;}
        to {transform: translate(-50%, -50%) scale(1); opacity: 1;}
      }
      @keyframes gallery-card-spin {
        to { transform: rotate(360deg); }
      }
      @keyframes gallery-card-shimmer {
        0% { background-position: 100% 0; }
        100% { background-position: -100% 0; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after {
          scroll-behavior: auto !important;
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `}}),console.groupCollapsed("%cGALLERY-CARD 2026.0.1 IS INSTALLED","color: green; font-weight: bold"),console.log("Readme:","https://github.com/fange173/gallery-card-2026"),console.groupEnd(),window.customCards=window.customCards||[],window.customCards.push({type:"gallery-card",name:"Gallery Card 2026",preview:!1,description:"Gallery Card 2026 displays images and videos from media sources, file-list sensors, and camera entities."});
