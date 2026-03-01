const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class s{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=r.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(i,e))}return e}toString(){return this.cssText}}const o=(e,...t)=>{const r=1===e.length?e[0]:t.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new s(r,e,i)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;var a;const l=window,c=l.trustedTypes,d=c?c.emptyScript:"",h=l.reactiveElementPolyfillSupport,u={toAttribute(e,t){switch(t){case Boolean:e=e?d:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},f=(e,t)=>t!==e&&(t==t||e==e),p={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:f},m="finalized";class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Ep(i,t);void 0!==r&&(this._$Ev.set(r,i),e.push(r))})),e}static createProperty(e,t=p){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||p}static finalize(){if(this.hasOwnProperty(m))return!1;this[m]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var i;const r=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{t?i.adoptedStyleSheets=r.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):r.forEach((t=>{const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}))})(r,this.constructor.elementStyles),r}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=p){var r;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:u).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$El=null}}_$AK(e,t){var i;const r=this.constructor,s=r._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=r.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:u;this._$El=s,this[s]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||f)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var v;g[m]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:g}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.6.3");const _=window,$=_.trustedTypes,y=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,w="$lit$",b=`lit$${(Math.random()+"").slice(9)}$`,x="?"+b,S=`<${x}>`,A=document,M=()=>A.createComment(""),D=e=>null===e||"object"!=typeof e&&"function"!=typeof e,E=Array.isArray,N="[ \t\n\f\r]",C=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,R=/-->/g,I=/>/g,T=RegExp(`>|${N}(?:([^\\s"'>=/]+)(${N}*=${N}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),k=/'/g,O=/"/g,L=/^(?:script|style|textarea|title)$/i,Y=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),P=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),U=new WeakMap,F=A.createTreeWalker(A,129,null,!1);function z(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==y?y.createHTML(t):t}const V=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":"",n=C;for(let a=0;a<i;a++){const t=e[a];let i,l,c=-1,d=0;for(;d<t.length&&(n.lastIndex=d,l=n.exec(t),null!==l);)d=n.lastIndex,n===C?"!--"===l[1]?n=R:void 0!==l[1]?n=I:void 0!==l[2]?(L.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=T):void 0!==l[3]&&(n=T):n===T?">"===l[0]?(n=null!=s?s:C,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,i=l[1],n=void 0===l[3]?T:'"'===l[3]?O:k):n===O||n===k?n=T:n===R||n===I?n=C:(n=T,s=void 0);const h=n===T&&e[a+1].startsWith("/>")?" ":"";o+=n===C?t+S:c>=0?(r.push(i),t.slice(0,c)+w+t.slice(c)+b+h):t+b+(-2===c?(r.push(void 0),a):h)}return[z(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),r]};class j{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[l,c]=V(e,t);if(this.el=j.createElement(l,i),F.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=F.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith(w)||t.startsWith(b)){const i=c[o++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+w).split(b),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?G:"?"===t[1]?X:"@"===t[1]?K:Z})}else a.push({type:6,index:s})}for(const t of e)r.removeAttribute(t)}if(L.test(r.tagName)){const e=r.textContent.split(b),t=e.length-1;if(t>0){r.textContent=$?$.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],M()),F.nextNode(),a.push({type:2,index:++s});r.append(e[t],M())}}}else if(8===r.nodeType)if(r.data===x)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(b,e+1));)a.push({type:7,index:s}),e+=b.length-1}s++}}static createElement(e,t){const i=A.createElement("template");return i.innerHTML=e,i}}function B(e,t,i=e,r){var s,o,n,a;if(t===P)return t;let l=void 0!==r?null===(s=i._$Co)||void 0===s?void 0:s[r]:i._$Cl;const c=D(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,r)),void 0!==r?(null!==(n=(a=i)._$Co)&&void 0!==n?n:a._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(t=B(e,l._$AS(e,t.values),l,r)),t}class W{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:r}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:A).importNode(i,!0);F.currentNode=s;let o=F.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new q(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new Q(o,this,e)),this._$AV.push(t),l=r[++a]}n!==(null==l?void 0:l.index)&&(o=F.nextNode(),n++)}return F.currentNode=A,s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class q{constructor(e,t,i,r){var s;this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cp=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=B(this,e,t),D(e)?e===H||null==e||""===e?(this._$AH!==H&&this._$AR(),this._$AH=H):e!==this._$AH&&e!==P&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>E(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==H&&D(this._$AH)?this._$AA.nextSibling.data=e:this.$(A.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:r}=e,s="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=j.createElement(z(r.h,r.h[0]),this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new W(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=U.get(e.strings);return void 0===t&&U.set(e.strings,t=new j(e)),t}T(e){E(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new q(this.k(M()),this.k(M()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Z{constructor(e,t,i,r,s){this.type=1,this._$AH=H,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=H}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=B(this,e,t,0),o=!D(e)||e!==this._$AH&&e!==P,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=B(this,r[i+n],t,n),a===P&&(a=this._$AH[n]),o||(o=!D(a)||a!==this._$AH[n]),a===H?e=H:e!==H&&(e+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(e)}j(e){e===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class G extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===H?void 0:e}}const J=$?$.emptyScript:"";class X extends Z{constructor(){super(...arguments),this.type=4}j(e){e&&e!==H?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class K extends Z{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=B(this,e,t,0))&&void 0!==i?i:H)===P)return;const r=this._$AH,s=e===H&&r!==H||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==H&&(r===H||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Q{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){B(this,e)}}const ee=_.litHtmlPolyfillSupport;null==ee||ee(j,q),(null!==(v=_.litHtmlVersions)&&void 0!==v?v:_.litHtmlVersions=[]).push("2.8.0");var te,ie;class re extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var r,s;const o=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new q(t.insertBefore(M(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return P}}re.finalized=!0,re._$litElement$=!0,null===(te=globalThis.litElementHydrateSupport)||void 0===te||te.call(globalThis,{LitElement:re});const se=globalThis.litElementPolyfillSupport;var oe;null==se||se({LitElement:re}),(null!==(ie=globalThis.litElementVersions)&&void 0!==ie?ie:globalThis.litElementVersions=[]).push("3.3.3"),null===(oe=window.HTMLSlotElement)||void 0===oe||oe.prototype.assignedElements,console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function ne(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ae={exports:{}};ae.exports=function(){var e=1e3,t=6e4,i=36e5,r="millisecond",s="second",o="minute",n="hour",a="day",l="week",c="month",d="quarter",h="year",u="date",f="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,g={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},v=function(e,t,i){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(i)+e},_={s:v,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),r=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+v(r,2,"0")+":"+v(s,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var r=12*(i.year()-t.year())+(i.month()-t.month()),s=t.clone().add(r,c),o=i-s<0,n=t.clone().add(r+(o?-1:1),c);return+(-(r+(i-s)/(o?s-n:n-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:c,y:h,w:l,d:a,D:u,h:n,m:o,s:s,ms:r,Q:d}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},$="en",y={};y[$]=g;var w="$isDayjsObject",b=function(e){return e instanceof M||!(!e||!e[w])},x=function e(t,i,r){var s;if(!t)return $;if("string"==typeof t){var o=t.toLowerCase();y[o]&&(s=o),i&&(y[o]=i,s=o);var n=t.split("-");if(!s&&n.length>1)return e(n[0])}else{var a=t.name;y[a]=t,s=a}return!r&&s&&($=s),s||!r&&$},S=function(e,t){if(b(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new M(i)},A=_;A.l=x,A.i=b,A.w=function(e,t){return S(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var M=function(){function g(e){this.$L=x(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[w]=!0}var v=g.prototype;return v.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(A.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(p);if(r){var s=r[2]-1||0,o=(r[7]||"0").substring(0,3);return i?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(t)}(e),this.init()},v.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},v.$utils=function(){return A},v.isValid=function(){return!(this.$d.toString()===f)},v.isSame=function(e,t){var i=S(e);return this.startOf(t)<=i&&i<=this.endOf(t)},v.isAfter=function(e,t){return S(e)<this.startOf(t)},v.isBefore=function(e,t){return this.endOf(t)<S(e)},v.$g=function(e,t,i){return A.u(e)?this[t]:this.set(i,e)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(e,t){var i=this,r=!!A.u(t)||t,d=A.p(e),f=function(e,t){var s=A.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return r?s:s.endOf(a)},p=function(e,t){return A.w(i.toDate()[e].apply(i.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},m=this.$W,g=this.$M,v=this.$D,_="set"+(this.$u?"UTC":"");switch(d){case h:return r?f(1,0):f(31,11);case c:return r?f(1,g):f(0,g+1);case l:var $=this.$locale().weekStart||0,y=(m<$?m+7:m)-$;return f(r?v-y:v+(6-y),g);case a:case u:return p(_+"Hours",0);case n:return p(_+"Minutes",1);case o:return p(_+"Seconds",2);case s:return p(_+"Milliseconds",3);default:return this.clone()}},v.endOf=function(e){return this.startOf(e,!1)},v.$set=function(e,t){var i,l=A.p(e),d="set"+(this.$u?"UTC":""),f=(i={},i[a]=d+"Date",i[u]=d+"Date",i[c]=d+"Month",i[h]=d+"FullYear",i[n]=d+"Hours",i[o]=d+"Minutes",i[s]=d+"Seconds",i[r]=d+"Milliseconds",i)[l],p=l===a?this.$D+(t-this.$W):t;if(l===c||l===h){var m=this.clone().set(u,1);m.$d[f](p),m.init(),this.$d=m.set(u,Math.min(this.$D,m.daysInMonth())).$d}else f&&this.$d[f](p);return this.init(),this},v.set=function(e,t){return this.clone().$set(e,t)},v.get=function(e){return this[A.p(e)]()},v.add=function(r,d){var u,f=this;r=Number(r);var p=A.p(d),m=function(e){var t=S(f);return A.w(t.date(t.date()+Math.round(e*r)),f)};if(p===c)return this.set(c,this.$M+r);if(p===h)return this.set(h,this.$y+r);if(p===a)return m(1);if(p===l)return m(7);var g=(u={},u[o]=t,u[n]=i,u[s]=e,u)[p]||1,v=this.$d.getTime()+r*g;return A.w(v,this)},v.subtract=function(e,t){return this.add(-1*e,t)},v.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||f;var r=e||"YYYY-MM-DDTHH:mm:ssZ",s=A.z(this),o=this.$H,n=this.$m,a=this.$M,l=i.weekdays,c=i.months,d=i.meridiem,h=function(e,i,s,o){return e&&(e[i]||e(t,r))||s[i].slice(0,o)},u=function(e){return A.s(o%12||12,e,"0")},p=d||function(e,t,i){var r=e<12?"AM":"PM";return i?r.toLowerCase():r};return r.replace(m,(function(e,r){return r||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return A.s(t.$y,4,"0");case"M":return a+1;case"MM":return A.s(a+1,2,"0");case"MMM":return h(i.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return t.$D;case"DD":return A.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return h(i.weekdaysMin,t.$W,l,2);case"ddd":return h(i.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(o);case"HH":return A.s(o,2,"0");case"h":return u(1);case"hh":return u(2);case"a":return p(o,n,!0);case"A":return p(o,n,!1);case"m":return String(n);case"mm":return A.s(n,2,"0");case"s":return String(t.$s);case"ss":return A.s(t.$s,2,"0");case"SSS":return A.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(r,u,f){var p,m=this,g=A.p(u),v=S(r),_=(v.utcOffset()-this.utcOffset())*t,$=this-v,y=function(){return A.m(m,v)};switch(g){case h:p=y()/12;break;case c:p=y();break;case d:p=y()/3;break;case l:p=($-_)/6048e5;break;case a:p=($-_)/864e5;break;case n:p=$/i;break;case o:p=$/t;break;case s:p=$/e;break;default:p=$}return f?p:A.a(p)},v.daysInMonth=function(){return this.endOf(c).$D},v.$locale=function(){return y[this.$L]},v.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),r=x(e,t,!0);return r&&(i.$L=r),i},v.clone=function(){return A.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},g}(),D=M.prototype;return S.prototype=D,[["$ms",r],["$s",s],["$m",o],["$H",n],["$W",a],["$M",c],["$y",h],["$D",u]].forEach((function(e){D[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),S.extend=function(e,t){return e.$i||(e(t,M,S),e.$i=!0),S},S.locale=x,S.isDayjs=b,S.unix=function(e){return S(1e3*e)},S.en=y[$],S.Ls=y,S.p={},S}();var le=ne(ae.exports),ce={exports:{}};ce.exports=function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,i=/\d\d/,r=/\d\d?/,s=/\d*[^-_:/,()\s\d]+/,o={},n=function(e){return(e=+e)+(e>68?1900:2e3)},a=function(e){return function(t){this[e]=+t}},l=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),i=60*t[1]+(+t[2]||0);return 0===i?0:"+"===t[0]?-i:i}(e)}],c=function(e){var t=o[e];return t&&(t.indexOf?t:t.s.concat(t.f))},d=function(e,t){var i,r=o.meridiem;if(r){for(var s=1;s<=24;s+=1)if(e.indexOf(r(s,0,t))>-1){i=s>12;break}}else i=e===(t?"pm":"PM");return i},h={A:[s,function(e){this.afternoon=d(e,!1)}],a:[s,function(e){this.afternoon=d(e,!0)}],S:[/\d/,function(e){this.milliseconds=100*+e}],SS:[i,function(e){this.milliseconds=10*+e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[i,a("day")],Do:[s,function(e){var t=o.ordinal,i=e.match(/\d+/);if(this.day=i[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r)}],M:[r,a("month")],MM:[i,a("month")],MMM:[s,function(e){var t=c("months"),i=(c("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(i<1)throw new Error;this.month=i%12||i}],MMMM:[s,function(e){var t=c("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[/[+-]?\d+/,a("year")],YY:[i,function(e){this.year=n(e)}],YYYY:[/\d{4}/,a("year")],Z:l,ZZ:l};function u(i){var r,s;r=i,s=o&&o.formats;for(var n=(i=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,i,r){var o=r&&r.toUpperCase();return i||s[r]||e[r]||s[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,i){return t||i.slice(1)}))}))).match(t),a=n.length,l=0;l<a;l+=1){var c=n[l],d=h[c],u=d&&d[0],f=d&&d[1];n[l]=f?{regex:u,parser:f}:c.replace(/^\[|\]$/g,"")}return function(e){for(var t={},i=0,r=0;i<a;i+=1){var s=n[i];if("string"==typeof s)r+=s.length;else{var o=s.regex,l=s.parser,c=e.slice(r),d=o.exec(c)[0];l.call(t,d),e=e.replace(d,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var i=e.hours;t?i<12&&(e.hours+=12):12===i&&(e.hours=0),delete e.afternoon}}(t),t}}return function(e,t,i){i.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(n=e.parseTwoDigitYear);var r=t.prototype,s=r.parse;r.parse=function(e){var t=e.date,r=e.utc,n=e.args;this.$u=r;var a=n[1];if("string"==typeof a){var l=!0===n[2],c=!0===n[3],d=l||c,h=n[2];c&&(h=n[2]),o=this.$locale(),!l&&h&&(o=i.Ls[h]),this.$d=function(e,t,i){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var r=u(t)(e),s=r.year,o=r.month,n=r.day,a=r.hours,l=r.minutes,c=r.seconds,d=r.milliseconds,h=r.zone,f=new Date,p=n||(s||o?1:f.getDate()),m=s||f.getFullYear(),g=0;s&&!o||(g=o>0?o-1:f.getMonth());var v=a||0,_=l||0,$=c||0,y=d||0;return h?new Date(Date.UTC(m,g,p,v,_,$,y+60*h.offset*1e3)):i?new Date(Date.UTC(m,g,p,v,_,$,y)):new Date(m,g,p,v,_,$,y)}catch(e){return new Date("")}}(t,a,r),this.init(),h&&!0!==h&&(this.$L=this.locale(h).$L),d&&t!=this.format(a)&&(this.$d=new Date("")),o={}}else if(a instanceof Array)for(var f=a.length,p=1;p<=f;p+=1){n[1]=a[p-1];var m=i.apply(this,n);if(m.isValid()){this.$d=m.$d,this.$L=m.$L,this.init();break}p===f&&(this.$d=new Date(""))}else s.call(this,e)}}}();var de=ne(ce.exports),he={exports:{}};he.exports=function(e,t,i){e=e||{};var r=t.prototype,s={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function o(e,t,i,s){return r.fromToBase(e,t,i,s)}i.en.relativeTime=s,r.fromToBase=function(t,r,o,n,a){for(var l,c,d,h=o.$locale().relativeTime||s,u=e.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],f=u.length,p=0;p<f;p+=1){var m=u[p];m.d&&(l=n?i(t).diff(o,m.d,!0):o.diff(t,m.d,!0));var g=(e.rounding||Math.round)(Math.abs(l));if(d=l>0,g<=m.r||!m.r){g<=1&&p>0&&(m=u[p-1]);var v=h[m.l];a&&(g=a(""+g)),c="string"==typeof v?v.replace("%d",g):v(g,r,m.l,d);break}}if(r)return c;var _=d?h.future:h.past;return"function"==typeof _?_(c):_.replace("%s",c)},r.to=function(e,t){return o(e,t,this,!0)},r.from=function(e,t){return o(e,t,this)};var n=function(e){return e.$u?i.utc():i()};r.toNow=function(e){return this.to(n(this),e)},r.fromNow=function(e){return this.from(n(this),e)}};var ue=ne(he.exports);customElements.define("gallery-card",class extends re{static get properties(){return{_hass:{},config:{},resources:{type:Array},currentResourceIndex:{type:Number},selectedDate:{type:Object},_itemsToShow:{type:Number},_isDateFiltered:{type:Boolean}}}constructor(){super(),this.resources=[],this.currentResourceIndex=0,this._itemsToShow=30,this.selectedDate=new Date,this._isDateFiltered=!0,this._isInitialLoad=!0,this._isLoading=!1}render(){const e=(this.config.menu_alignment||"responsive").toLowerCase();return Y`
      ${void 0===this.errors?Y``:this.errors.map((e=>Y`<hui-warning>${e}</hui-warning>`))}
      <ha-card class="menu-${e}">
        <div class="resource-viewer" @touchstart="${e=>this._handleTouchStart(e)}" @touchmove="${e=>this._handleTouchMove(e)}">
          <figure style="margin:5px;">
            ${this._currentResource().isHass?Y`
                  <hui-image @click="${e=>this._popupCamera(e)}"
                                      .hass=${this._hass}
                                      .cameraImage=${this._currentResource().name}
                                      .cameraView=${"live"}
                                    ></hui-image>
                `:this._isImageExtension(this._currentResource().extension)?Y`<img @click="${e=>this._popupImage(e)}" src="${this._currentResource().url}"/>`:Y`<video controls ?loop=${this.config.video_loop} ?autoplay=${this.config.video_autoplay} src="${this._currentResource().url}#t=0.1" @loadedmetadata="${e=>this._videoMetadataLoaded(e)}" @canplay="${e=>this._startVideo(e)}" 
                            @ended="${()=>this._videoHasEnded()}" preload="metadata"></video>`}
            <figcaption>
              <div class="caption-text">${this._currentResource().caption}</div>
              <div class="caption-details">
                ${this._isImageExtension(this._currentResource().extension)?Y``:Y`<span class="duration"></span> `}                  
                ${this.config.show_zoom?Y`<a class="zoom-link" href= "${this._currentResource().url}" target="_blank">Zoom</a>`:Y``}                  
              </div>
            </figcaption>
          </figure>  
          <div class="viewer-nav">
            <ha-icon-button class="nav-btn nav-left" icon="mdi:chevron-left" @click="${()=>this._selectResource(this.currentResourceIndex-1)}"></ha-icon-button> 
            <ha-icon-button class="nav-btn nav-right" icon="mdi:chevron-right" @click="${()=>this._selectResource(this.currentResourceIndex+1)}"></ha-icon-button> 
          </div>
        </div>
        <div class="resource-menu-container">
          <div class="card-header-actions">
            ${this.config.enable_date_search?Y`
                  <div class="date-filter-container">
                    <input type="date" class="date-picker" @change="${this._handleDateChange}" .value="${this._formatDateForInput(this.selectedDate)}">
                    ${this._isDateFiltered?Y`<ha-icon-button icon="mdi:close-circle" class="btn-clear-date" @click="${this._clearDateFilter}"></ha-icon-button>`:Y``}
                  </div>
                `:Y``}
            ${this.config.show_reload?Y`<ha-icon-button class="btn-reload" icon="mdi:refresh" @click="${()=>this._loadResources(this._hass)}"></ha-icon-button>`:Y``}
          </div>
          <div class="resource-menu">
            ${this.resources.slice(0,this._itemsToShow).map(((e,t)=>Y`
                    <figure style="margin:5px;" id="resource${t}" data-imageIndex="${t}" @click="${()=>this._selectResource(t)}" class="${t===this.currentResourceIndex?"selected":""}">
                    ${e.isHass?Y`
                          <hui-image
                            .hass=${this._hass}
                            .cameraImage=${e.name}
                            .cameraView=${"live"}
                          ></hui-image>
                        `:this._isImageExtension(e.extension)?Y`<img class="lzy_img" src="/local/community/gallery-card/placeholder.jpg" data-src="${e.url}"/>`:this.config.video_preload??1?Y`<video preload="none" data-src="${e.url}#t=${void 0===this.config.preview_video_at?.1:this.config.preview_video_at}" @loadedmetadata="${e=>this._videoMetadataLoaded(e)}" @canplay="${()=>this._downloadNextMenuVideo()}" preload="metadata"></video>`:Y`<div style="text-align: center"><div class="lzy_img"><ha-icon id="play" icon="mdi:movie-play-outline"></ha-icon></div></div>`}
                    <figcaption>${e.caption} <span class="duration"></span></figcaption>
                    </figure>
                  `))}
            ${this._itemsToShow<this.resources.length?Y`<div class="load-more" @click="${this._loadMore}">加载更多... (${this.resources.length-this._itemsToShow} 剩余)</div>`:Y``}
          </div>
        </div>
        <div id="imageModal" class="modal" @touchstart="${e=>this._handleTouchStart(e)}" @touchmove="${e=>this._handleTouchMove(e)}">
          <img class="modal-content" id="popupImage">
          <div id="popupCaption"></div>
        </div>
      </ha-card>
    `}_downloadingVideos=!1;updated(e){const t=this.shadowRoot.querySelectorAll("img.lzy_img");for(const r of t)this.imageObserver.observe(r);const i=this.shadowRoot.querySelectorAll("video.lzy_video");for(const r of i)this.imageObserver.observe(r);this._downloadingVideos||this._downloadNextMenuVideo()}async _downloadNextMenuVideo(){this._downloadingVideos=!0;const e=this.shadowRoot.querySelector(".resource-menu figure video[data-src]");if(e){await new Promise((e=>setTimeout(e,100)));const t=e.dataset.src;delete e.dataset.src,e.src=t,e.load()}else this._downloadingVideos=!1}setConfig(e){if(le.extend(de),le.extend(ue),this.imageObserver=new IntersectionObserver((e=>{for(const t of e)if(t.isIntersecting){const e=t.target;e.src=e.dataset.src}})),!e.entity&&!e.entities)throw new Error("Required configuration for entities is missing");this.config=e,this.config.entity&&(this.config.entities||(this.config={...this.config,entities:[]}),this.config.entities.push(this.config.entity),delete this.config.entity),void 0!==this._hass&&this._loadResources(this._hass),this._doSlideShow(!0)}set hass(e){this._hass=e,void 0===this.resources&&this._loadResources(this._hass)}getCardSize(){return 1}_isImageExtension(e){return e.match(/(jpeg|jpg|gif|png|tiff|bmp)$/)}_doSlideShow(e){if(e||this._selectResource(this.currentResourceIndex+1,!0),this.config.slideshow_timer){const e=Number.parseInt(this.config.slideshow_timer);!Number.isNaN(e)&&e>0&&setTimeout((()=>{this._doSlideShow()}),1e3*e)}}_loadMore(){this._itemsToShow+=30}_selectResource(e,t){this.autoPlayVideo=!0;let i=e;if(e<0?i=this.resources.length-1:e>=this.resources.length&&(i=0),i>=this._itemsToShow&&(this._itemsToShow=i+10),this.currentResourceIndex=i,this._loadImageForPopup(),t&&this.parentNode&&this.parentNode.tagName&&"hui-card-preview"===this.parentNode.tagName.toLowerCase())return;const r=this.shadowRoot.querySelector("#resource"+this.currentResourceIndex);r&&r.scrollIntoView({behavior:"smooth",block:"nearest",inline:"nearest"})}_getResource(e){return void 0!==this.resources&&void 0!==e&&this.resources.length>0?this.resources[e]:{url:"",name:"",extension:"jpg",caption:void 0===e?"Loading resources...":"No images or videos to display",index:0}}_currentResource(){return this._getResource(this.currentResourceIndex)}_startVideo(e){this.autoPlayVideo&&e.target.play()}_videoMetadataLoaded(e){const t=this.config.show_duration??!0,i=e.target.closest("figure")?.querySelector(".duration");!Number.isNaN(Number.parseInt(e.target.duration))&&t&&i&&(i.innerHTML="["+this._getFormattedVideoDuration(e.target.duration)+"]"),this.config.video_muted&&(e.target.muted="muted")}_videoHasEnded(){this.config.slideshow_video_end&&this._doSlideShow()}_popupCamera(){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:this._currentResource().name},this.dispatchEvent(e)}_popupImage(){const e=this.shadowRoot.querySelector("#imageModal");e.style.display="block",this._loadImageForPopup(),e.scrollIntoView(!0),e.addEventListener("click",(function(){e.style.display="none"}))}_loadImageForPopup(){const e=this.shadowRoot.querySelector("#imageModal"),t=this.shadowRoot.querySelector("#popupImage"),i=this.shadowRoot.querySelector("#popupCaption");"block"===e.style.display&&(t.src=this._currentResource().url,i.innerHTML=this._currentResource().caption)}_getFormattedVideoDuration(e){let t=Number.parseInt(e/60);t<10&&(t="0"+t);let i=Number.parseInt(e%60);return i="0"+i,i=i.slice(Math.max(0,i.length-2)),t+":"+i}_keyNavigation(e){switch(e.code){case"ArrowDown":case"ArrowRight":this._selectResource(this.currentResourceIndex+1);break;case"ArrowUp":case"ArrowLeft":this._selectResource(this.currentResourceIndex-1)}}_handleTouchStart(e){this.xDown=e.touches[0].clientX,this.yDown=e.touches[0].clientY}_handleTouchMove(e){if(!this.xDown||!this.yDown)return;const t=e.touches[0].clientX,i=e.touches[0].clientY,r=this.xDown-t,s=this.yDown-i;Math.abs(r)>Math.abs(s)&&(r>0?(this._selectResource(this.currentResourceIndex+1),e.preventDefault()):(this._selectResource(this.currentResourceIndex-1),e.preventDefault())),this.xDown=void 0,this.yDown=void 0}_handleDateChange(e){this.selectedDate=e.target.valueAsDate,this._isDateFiltered=null!==this.selectedDate,this._loadResources(this._hass)}_clearDateFilter(){this.selectedDate=null,this._isDateFiltered=!1,this._loadResources(this._hass)}_convertOldFormat(e){return e&&"string"==typeof e?e.replace(/%YYY/g,"YYYY").replace(/%Y/g,"YYYY").replace(/%m/g,"MM").replace(/%d/g,"DD").replace(/%H/g,"HH").replace(/%M/g,"mm").replace(/%S/g,"ss"):e}async _loadResources(e){if(this._isLoading)return;this._isLoading=!0,this.currentResourceIndex=void 0,this.resources=[];let t=(this.config.enable_date_search??!1)&&this._isDateFiltered,i=this.config.maximum_files;0===i&&(i=void 0);const r=this.config.maximum_files_per_entity??!0,s=r?i:void 0,o=r?void 0:i;let n=this._convertOldFormat(this.config.folder_format),a=this._convertOldFormat(this.config.file_name_format),l=this.config.file_name_date_begins,c=this._convertOldFormat(this.config.caption_format);const d=this.config.parsed_date_sort??!1,h=this.config.reverse_sort??!0,u=this.config.random_sort??!1,f=()=>{const i=[];for(const r of this.config.entities){let o,d=!1,u=!0,f=!0;if("object"==typeof r?(o=r.path,r.recursive&&(d=r.recursive),void 0!==r.include_video&&(u=r.include_video),void 0!==r.include_images&&(f=r.include_images),r.folder_format&&(n=this._convertOldFormat(r.folder_format)),r.file_name_format&&(a=this._convertOldFormat(r.file_name_format)),r.file_name_date_begins&&(l=r.file_name_date_begins),r.caption_format&&(c=this._convertOldFormat(r.caption_format))):o=r,"media-source://"===o.substring(0,15).toLowerCase())i.push(this._loadMediaResource(e,o,s,n,a,l,c,d,h,u,f,t));else{const t=e.states[o];void 0===t?i.push(Promise.resolve({error:!0,entity:o,message:"Invalid Entity ID"})):(void 0!==t.attributes.entity_picture&&i.push(this._loadCameraResource(o,t)),void 0!==t.attributes.fileList&&i.push(this._loadFilesResources(t.attributes.fileList,s,a,l,c,h)),void 0!==t.attributes.file_list&&i.push(this._loadFilesResources(t.attributes.file_list,s,a,l,c,h)))}}return i};try{let e=await Promise.all(f()),i=e.filter((e=>!e.error)).flat(Number.POSITIVE_INFINITY);if(this._isInitialLoad&&t&&0===i.length){let r=0,s=le(this.selectedDate);for(;0===i.length&&r<30;)r++,s=s.subtract(1,"day"),this.selectedDate=s.toDate(),e=await Promise.all(f()),i=e.filter((e=>!e.error)).flat(Number.POSITIVE_INFINITY);0===i.length&&(this._isDateFiltered=!1,t=!1,e=await Promise.all(f()),i=e.filter((e=>!e.error)).flat(Number.POSITIVE_INFINITY))}if(this._isInitialLoad=!1,this.resources=i,d&&(h?this.resources.sort((function(e,t){return t.date-e.date})):this.resources.sort((function(e,t){return e.date-t.date}))),u)for(let t=this.resources.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1));t!==e&&([this.resources[t],this.resources[e]]=[this.resources[e],this.resources[t]])}void 0!==o&&!Number.isNaN(o)&&o<this.resources.length&&(this.resources=this.resources.filter((function(e){return!!e.isHass||this.count<o&&(this.count++,!0)}),{count:this.resources.filter((e=>e.isHass)).length})),this.currentResourceIndex=0,this.parentNode&&this.parentNode.tagName&&"hui-card-preview"===this.parentNode.tagName.toLowerCase()||document.addEventListener("keydown",(e=>this._keyNavigation(e))),this.errors=[];for(const t of e.filter((e=>e.error)).flat(Number.POSITIVE_INFINITY))this.errors.push(t.message+" "+t.entity),this._hass.callService("system_log","write",{message:"Gallery Card Error:  "+t.message+"   "+t.entity})}finally{this._isLoading=!1}}_loadMediaResource(e,t,i,r,s,o,n,a,l,c,d,h){return new Promise((async u=>{let f=t;try{let m=[];if(r&&l&&void 0!==i&&!Number.isNaN(i)){let s=le(),o="";const n=[];for(;m.length<i;){const a=s.format(r);if(f=t+"/"+a,a!==o)try{const t=await this._loadMedia(this,e,f,i,!1,l,c,d,h);m.push(...t)}catch(p){if("browse_media_failed"!==p.code)throw p;n.push(f)}if(n.length>2){if(0===m.length)throw f=n.join(","),new Error("Failed to browse several folders and found no media files.  Verify your settings are correct.");break}o=a,s=s.subtract(12,"hour")}m.length>i&&(m.length=i)}else m=await this._loadMedia(this,e,f,i,a,l,c,d,h);const g=[];for(const e of m){const t=this._createFileResource(e.authenticated_path,s,o,n);void 0!==t&&g.push(t)}u(g)}catch(p){console.log(p),u({error:!0,entity:f,message:p.message})}}))}_loadMedia(e,t,i,r,s,o,n,a,l){const c={media_class:"directory",media_content_id:i};return"/"!==i.substring(i.length-1,i.length)&&"media-source://media_source"!==i&&(c.media_content_id+="/"),Promise.all(this._fetchMedia(e,t,c,s,n,a,l)).then((function(i){const s=i.flat(Number.POSITIVE_INFINITY).filter((function(e){return void 0!==e})).sort((function(e,t){return e.title>t.title?1:e.title<t.title?-1:0}));return o&&s.reverse(),void 0!==r&&!Number.isNaN(r)&&r<s.length&&(s.length=r),Promise.all(s.map((function(i){return e._fetchMediaItem(t,i.media_content_id).then((function(e){return{...i,authenticated_path:e.url}}))})))}))}_fetchMedia(e,t,i,r,s,o,n){const a=[];return"directory"===i.media_class&&(i.children?a.push(...i.children.filter((t=>(s&&"video"===t.media_class||o&&"image"===t.media_class||r&&"directory"===t.media_class&&(!n||t.title===e._folderDateFormatter(void 0===e.config.search_date_folder_format?"DD_MM_YYYY":e.config.search_date_folder_format,e.selectedDate)))&&"@eaDir/"!==t.title)).map((i=>Promise.all(e._fetchMedia(e,t,i,r,s,o,n))))):a.push(e._fetchMediaContents(t,i.media_content_id).then((i=>Promise.all(e._fetchMedia(e,t,i,r,s,o,n)))))),"directory"!==i.media_class&&a.push(Promise.resolve(i)),a}_fetchMediaContents(e,t){return e.callWS({type:"media_source/browse_media",media_content_id:t})}_fetchMediaItem(e,t){return e.callWS({type:"media_source/resolve_media",media_content_id:t,expires:10800})}_loadCameraResource(e,t){const i={url:t.attributes.entity_picture,name:e,extension:"jpg",caption:t.attributes.friendly_name??e,isHass:!0};return Promise.resolve(i)}_loadFilesResources(e,t,i,r,s,o){const n=[];if(e){e=e.filter((e=>!e.includes("@eaDir"))),o&&e.reverse(),void 0!==t&&!Number.isNaN(t)&&t<e.length&&(e.length=t);for(const t of e){const e=t;let o=e.replace("/config/www/","/local/");e.includes("/config/www/")||(o="/local/"+e.slice(Math.max(0,e.indexOf("/www/")+5)));const a=this._createFileResource(o,i,r,s);void 0!==a&&n.push(a)}}return Promise.resolve(n)}_createFileResource(e,t,i,r){if(!e)return;let s;const o=e.split("?")[0];let n=o.split("/").at(-1),a="",l="";if("@eaDir"!==n){const c=n.split(".").at(-1).toLowerCase();n=n.slice(0,Math.max(0,n.length-c.length-1)),n=decodeURIComponent(n)," "!==r&&(l=n);let d=n;i&&!Number.isNaN(Number.parseInt(i))&&(d=d.slice(Math.max(0,Number.parseInt(i)-1))),console.log(d),t&&(a=le(d,t)),a&&r&&("AGO"===r.toUpperCase().trim()?l=a.fromNow():(l=a.format(r),l=l.replaceAll(/ago/gi,a.fromNow()))),s={url:e,base_url:o,name:n,extension:c,caption:l,index:-1,date:a}}return s}_folderDateFormatter(e,t){return le(t).format(e)}_formatDateForInput(e){e||(e=new Date);return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`}static get styles(){return o`
      :host {
        --gallery-card-primary-color: var(--primary-color, #03a9f4);
        --gallery-card-text-color: var(--primary-text-color, #212121);
        --gallery-card-bg-color: var(--card-background-color, #fff);
      }
      .content {
        overflow: hidden;
      }
      ha-card {
        height: 100%;
        max-height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        background: var(--gallery-card-bg-color);
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2));
      }
      .resource-menu-container {
        display: flex;
        flex-direction: column;
        background: var(--secondary-background-color, #f5f5f5);
        max-height: 400px;
      }
      .card-header-actions {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 4px 12px;
        gap: 8px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }
      .date-filter-container {
        display: flex;
        align-items: center;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 20px;
        padding: 2px 4px 2px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
      }
      .btn-clear-date {
        --mdc-icon-button-size: 32px;
        --mdc-icon-size: 18px;
        color: var(--error-color, #db4437);
      }
      .date-picker {
        border: none;
        background: transparent;
        color: var(--gallery-card-text-color);
        font-family: inherit;
        outline: none;
        font-size: 0.9em;
        cursor: pointer;
      }
      .resource-viewer {
        position: relative;
        width: 100%;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
        max-height: 70vh;
        overflow: hidden;
        flex: 1;
      }
      .resource-viewer figure {
        width: 100%;
        margin: 0 !important;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      img, video {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        transition: opacity 0.3s ease;
      }
      figcaption {
        width: 100%;
        padding: 12px;
        background: rgba(0, 0, 0, 0.7);
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
      .nav-btn {
        pointer-events: auto;
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        border-radius: 50%;
        opacity: 0;
        transition: all 0.3s ease;
      }
      .resource-viewer:hover .nav-btn {
        opacity: 1;
        background: rgba(255, 255, 255, 0.4);
      }
      .btn-reload {
        color: var(--gallery-card-primary-color);
      }
      .resource-menu {
        padding: 8px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
        gap: 8px;
        overflow-y: auto;
        align-content: flex-start;
      }
      .resource-menu figure {
        margin: 0 !important;
        cursor: pointer;
        border-radius: 8px;
        overflow: hidden;
        background: #000;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        position: relative;
        aspect-ratio: 16/9;
      }
      .resource-menu figure:hover {
        transform: scale(1.03);
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      }
      .resource-menu figure.selected {
        outline: 3px solid var(--gallery-card-primary-color);
        outline-offset: -3px;
      }
      .resource-menu img, .resource-menu video {
        width: 100%;
        height: 100%;
        object-fit: cover;
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
      .load-more {
        grid-column: 1 / -1;
        text-align: center;
        padding: 12px;
        cursor: pointer;
        color: var(--gallery-card-primary-color);
        font-weight: 500;
        transition: background 0.2s;
        border-radius: 8px;
      }
      .load-more:hover {
        background: rgba(var(--rgb-primary-color), 0.1);
      }

      /* Layout modes */
      .menu-responsive {
        flex-direction: column;
      }
      @media all and (min-width: 600px) {
        .menu-responsive {
          flex-direction: row;
        }
        .menu-responsive .resource-viewer {
          flex: 3;
        }
        .menu-responsive .resource-menu-container {
          flex: 1;
          max-height: none;
        }
        .menu-responsive .resource-menu {
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
      .menu-right .resource-menu-container { width: 25%; max-height: none; }
      .menu-right .resource-menu { grid-template-columns: 1fr; }
      .menu-left { flex-direction: row-reverse; }
      .menu-left .resource-menu-container { width: 25%; max-height: none; }
      .menu-left .resource-menu { grid-template-columns: 1fr; }
      .menu-top { flex-direction: column-reverse; }
      .menu-top .resource-menu { display: flex; overflow-x: auto; overflow-y: hidden; }
      .menu-top .resource-menu figure { min-width: 120px; }
      .menu-hidden .resource-menu-container { display: none; }

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
    `}}),console.groupCollapsed("%cGALLERY-CARD 2026.0.1 IS INSTALLED","color: green; font-weight: bold"),console.log("Readme:","https://github.com/lukelalo/gallery-card"),console.groupEnd(),window.customCards=window.customCards||[],window.customCards.push({type:"gallery-card",name:"Gallery Card",preview:!1,description:"The Gallery Card allows for viewing multiple images/videos.  Requires the Files sensor available at https://github.com/TarheelGrad1998"});
