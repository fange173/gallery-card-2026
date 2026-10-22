const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class s{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=r.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(i,e))}return e}toString(){return this.cssText}}const o=(e,...t)=>{const r=1===e.length?e[0]:t.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new s(r,e,i)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;var a;const l=window,d=l.trustedTypes,c=d?d.emptyScript:"",h=l.reactiveElementPolyfillSupport,u={toAttribute(e,t){switch(t){case Boolean:e=e?c:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},p=(e,t)=>t!==e&&(t==t||e==e),m={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p},f="finalized";class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Ep(i,t);void 0!==r&&(this._$Ev.set(r,i),e.push(r))})),e}static createProperty(e,t=m){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||m}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var i;const r=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{t?i.adoptedStyleSheets=r.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):r.forEach((t=>{const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}))})(r,this.constructor.elementStyles),r}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=m){var r;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:u).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$El=null}}_$AK(e,t){var i;const r=this.constructor,s=r._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=r.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:u;this._$El=s,this[s]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||p)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var _;g[f]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:g}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.6.3");const v=window,y=v.trustedTypes,b=y?y.createPolicy("lit-html",{createHTML:e=>e}):void 0,w="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,x="?"+$,S=`<${x}>`,M=document,A=()=>M.createComment(""),R=e=>null===e||"object"!=typeof e&&"function"!=typeof e,C=Array.isArray,I=e=>C(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),D="[ \t\n\f\r]",T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,E=/>/g,N=RegExp(`>|${D}(?:([^\\s"'>=/]+)(${D}*=${D}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),P=/'/g,L=/"/g,O=/^(?:script|style|textarea|title)$/i,z=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),Y=Symbol.for("lit-noChange"),H=Symbol.for("lit-nothing"),U=new WeakMap,V=M.createTreeWalker(M,129,null,!1);function B(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(t):t}const F=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":"",n=T;for(let a=0;a<i;a++){const t=e[a];let i,l,d=-1,c=0;for(;c<t.length&&(n.lastIndex=c,l=n.exec(t),null!==l);)c=n.lastIndex,n===T?"!--"===l[1]?n=k:void 0!==l[1]?n=E:void 0!==l[2]?(O.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=N):void 0!==l[3]&&(n=N):n===N?">"===l[0]?(n=null!=s?s:T,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,i=l[1],n=void 0===l[3]?N:'"'===l[3]?L:P):n===L||n===P?n=N:n===k||n===E?n=T:(n=N,s=void 0);const h=n===N&&e[a+1].startsWith("/>")?" ":"";o+=n===T?t+S:d>=0?(r.push(i),t.slice(0,d)+w+t.slice(d)+$+h):t+$+(-2===d?(r.push(void 0),a):h)}return[B(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),r]};class j{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[l,d]=F(e,t);if(this.el=j.createElement(l,i),V.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=V.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith(w)||t.startsWith($)){const i=d[o++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+w).split($),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?K:"?"===t[1]?J:"@"===t[1]?Q:Z})}else a.push({type:6,index:s})}for(const t of e)r.removeAttribute(t)}if(O.test(r.tagName)){const e=r.textContent.split($),t=e.length-1;if(t>0){r.textContent=y?y.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],A()),V.nextNode(),a.push({type:2,index:++s});r.append(e[t],A())}}}else if(8===r.nodeType)if(r.data===x)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf($,e+1));)a.push({type:7,index:s}),e+=$.length-1}s++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function W(e,t,i=e,r){var s,o,n,a;if(t===Y)return t;let l=void 0!==r?null===(s=i._$Co)||void 0===s?void 0:s[r]:i._$Cl;const d=R(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,r)),void 0!==r?(null!==(n=(a=i)._$Co)&&void 0!==n?n:a._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(t=W(e,l._$AS(e,t.values),l,r)),t}class q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:r}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:M).importNode(i,!0);V.currentNode=s;let o=V.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new G(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new ee(o,this,e)),this._$AV.push(t),l=r[++a]}n!==(null==l?void 0:l.index)&&(o=V.nextNode(),n++)}return V.currentNode=M,s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class G{constructor(e,t,i,r){var s;this.type=2,this._$AH=H,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cp=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),R(e)?e===H||null==e||""===e?(this._$AH!==H&&this._$AR(),this._$AH=H):e!==this._$AH&&e!==Y&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):I(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==H&&R(this._$AH)?this._$AA.nextSibling.data=e:this.$(M.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:r}=e,s="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=j.createElement(B(r.h,r.h[0]),this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new q(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=U.get(e.strings);return void 0===t&&U.set(e.strings,t=new j(e)),t}T(e){C(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new G(this.k(A()),this.k(A()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Z{constructor(e,t,i,r,s){this.type=1,this._$AH=H,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=H}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=W(this,e,t,0),o=!R(e)||e!==this._$AH&&e!==Y,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=W(this,r[i+n],t,n),a===Y&&(a=this._$AH[n]),o||(o=!R(a)||a!==this._$AH[n]),a===H?e=H:e!==H&&(e+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(e)}j(e){e===H?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class K extends Z{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===H?void 0:e}}const X=y?y.emptyScript:"";class J extends Z{constructor(){super(...arguments),this.type=4}j(e){e&&e!==H?this.element.setAttribute(this.name,X):this.element.removeAttribute(this.name)}}class Q extends Z{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=W(this,e,t,0))&&void 0!==i?i:H)===Y)return;const r=this._$AH,s=e===H&&r!==H||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==H&&(r===H||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ee{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}}const te={O:w,P:$,A:x,C:1,M:F,L:q,R:I,D:W,I:G,V:Z,H:J,N:Q,U:K,F:ee},ie=v.litHtmlPolyfillSupport;null==ie||ie(j,G),(null!==(_=v.litHtmlVersions)&&void 0!==_?_:v.litHtmlVersions=[]).push("2.8.0");var re,se;class oe extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var r,s;const o=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new G(t.insertBefore(A(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return Y}}oe.finalized=!0,oe._$litElement$=!0,null===(re=globalThis.litElementHydrateSupport)||void 0===re||re.call(globalThis,{LitElement:oe});const ne=globalThis.litElementPolyfillSupport;var ae;null==ne||ne({LitElement:oe}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.3.3"),null===(ae=window.HTMLSlotElement)||void 0===ae||ae.prototype.assignedElements,console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");const le=2;class de{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:ce}=te,he=()=>document.createComment(""),ue=(e,t,i)=>{var r;const s=e._$AA.parentNode,o=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=s.insertBefore(he(),o),r=s.insertBefore(he(),o);i=new ce(t,r,e,e.options)}else{const t=i._$AB.nextSibling,n=i._$AM,a=n!==e;if(a){let t;null===(r=i._$AQ)||void 0===r||r.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==n._$AU&&i._$AP(t)}if(t!==o||a){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;s.insertBefore(e,o),e=t}}}return i},pe=(e,t,i=e)=>(e._$AI(t,i),e),me={},fe=(e,t=me)=>e._$AH=t,ge=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const r=e._$AB.nextSibling;for(;i!==r;){const e=i.nextSibling;i.remove(),i=e}},_e=(e,t,i)=>{const r=new Map;for(let s=t;s<=i;s++)r.set(e[s],s);return r},ve=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends de{constructor(e){if(super(e),e.type!==le)throw Error("repeat() can only be used in text expressions")}ct(e,t,i){let r;void 0===i?i=t:void 0!==t&&(r=t);const s=[],o=[];let n=0;for(const a of e)s[n]=r?r(a,n):n,o[n]=i(a,n),n++;return{values:o,keys:s}}render(e,t,i){return this.ct(e,t,i).values}update(e,[t,i,r]){var s;const o=(e=>e._$AH)(e),{values:n,keys:a}=this.ct(t,i,r);if(!Array.isArray(o))return this.ut=a,n;const l=null!==(s=this.ut)&&void 0!==s?s:this.ut=[],d=[];let c,h,u=0,p=o.length-1,m=0,f=n.length-1;for(;u<=p&&m<=f;)if(null===o[u])u++;else if(null===o[p])p--;else if(l[u]===a[m])d[m]=pe(o[u],n[m]),u++,m++;else if(l[p]===a[f])d[f]=pe(o[p],n[f]),p--,f--;else if(l[u]===a[f])d[f]=pe(o[u],n[f]),ue(e,d[f+1],o[u]),u++,f--;else if(l[p]===a[m])d[m]=pe(o[p],n[m]),ue(e,o[u],o[p]),p--,m++;else if(void 0===c&&(c=_e(a,m,f),h=_e(l,u,p)),c.has(l[u]))if(c.has(l[p])){const t=h.get(a[m]),i=void 0!==t?o[t]:null;if(null===i){const t=ue(e,o[u]);pe(t,n[m]),d[m]=t}else d[m]=pe(i,n[m]),ue(e,o[u],i),o[t]=null;m++}else ge(o[p]),p--;else ge(o[u]),u++;for(;m<=f;){const t=ue(e,d[f+1]);pe(t,n[m]),d[m++]=t}for(;u<=p;){const e=o[u++];null!==e&&ge(e)}return this.ut=a,fe(e,d),Y}});"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function ye(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var be={exports:{}};be.exports=function(){var e=1e3,t=6e4,i=36e5,r="millisecond",s="second",o="minute",n="hour",a="day",l="week",d="month",c="quarter",h="year",u="date",p="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,g={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},_=function(e,t,i){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(i)+e},v={s:_,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),r=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+_(r,2,"0")+":"+_(s,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var r=12*(i.year()-t.year())+(i.month()-t.month()),s=t.clone().add(r,d),o=i-s<0,n=t.clone().add(r+(o?-1:1),d);return+(-(r+(i-s)/(o?s-n:n-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:d,y:h,w:l,d:a,D:u,h:n,m:o,s:s,ms:r,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=g;var w="$isDayjsObject",$=function(e){return e instanceof A||!(!e||!e[w])},x=function e(t,i,r){var s;if(!t)return y;if("string"==typeof t){var o=t.toLowerCase();b[o]&&(s=o),i&&(b[o]=i,s=o);var n=t.split("-");if(!s&&n.length>1)return e(n[0])}else{var a=t.name;b[a]=t,s=a}return!r&&s&&(y=s),s||!r&&y},S=function(e,t){if($(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new A(i)},M=v;M.l=x,M.i=$,M.w=function(e,t){return S(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var A=function(){function g(e){this.$L=x(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[w]=!0}var _=g.prototype;return _.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(m);if(r){var s=r[2]-1||0,o=(r[7]||"0").substring(0,3);return i?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(t)}(e),this.init()},_.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},_.$utils=function(){return M},_.isValid=function(){return!(this.$d.toString()===p)},_.isSame=function(e,t){var i=S(e);return this.startOf(t)<=i&&i<=this.endOf(t)},_.isAfter=function(e,t){return S(e)<this.startOf(t)},_.isBefore=function(e,t){return this.endOf(t)<S(e)},_.$g=function(e,t,i){return M.u(e)?this[t]:this.set(i,e)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(e,t){var i=this,r=!!M.u(t)||t,c=M.p(e),p=function(e,t){var s=M.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return r?s:s.endOf(a)},m=function(e,t){return M.w(i.toDate()[e].apply(i.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},f=this.$W,g=this.$M,_=this.$D,v="set"+(this.$u?"UTC":"");switch(c){case h:return r?p(1,0):p(31,11);case d:return r?p(1,g):p(0,g+1);case l:var y=this.$locale().weekStart||0,b=(f<y?f+7:f)-y;return p(r?_-b:_+(6-b),g);case a:case u:return m(v+"Hours",0);case n:return m(v+"Minutes",1);case o:return m(v+"Seconds",2);case s:return m(v+"Milliseconds",3);default:return this.clone()}},_.endOf=function(e){return this.startOf(e,!1)},_.$set=function(e,t){var i,l=M.p(e),c="set"+(this.$u?"UTC":""),p=(i={},i[a]=c+"Date",i[u]=c+"Date",i[d]=c+"Month",i[h]=c+"FullYear",i[n]=c+"Hours",i[o]=c+"Minutes",i[s]=c+"Seconds",i[r]=c+"Milliseconds",i)[l],m=l===a?this.$D+(t-this.$W):t;if(l===d||l===h){var f=this.clone().set(u,1);f.$d[p](m),f.init(),this.$d=f.set(u,Math.min(this.$D,f.daysInMonth())).$d}else p&&this.$d[p](m);return this.init(),this},_.set=function(e,t){return this.clone().$set(e,t)},_.get=function(e){return this[M.p(e)]()},_.add=function(r,c){var u,p=this;r=Number(r);var m=M.p(c),f=function(e){var t=S(p);return M.w(t.date(t.date()+Math.round(e*r)),p)};if(m===d)return this.set(d,this.$M+r);if(m===h)return this.set(h,this.$y+r);if(m===a)return f(1);if(m===l)return f(7);var g=(u={},u[o]=t,u[n]=i,u[s]=e,u)[m]||1,_=this.$d.getTime()+r*g;return M.w(_,this)},_.subtract=function(e,t){return this.add(-1*e,t)},_.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||p;var r=e||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),o=this.$H,n=this.$m,a=this.$M,l=i.weekdays,d=i.months,c=i.meridiem,h=function(e,i,s,o){return e&&(e[i]||e(t,r))||s[i].slice(0,o)},u=function(e){return M.s(o%12||12,e,"0")},m=c||function(e,t,i){var r=e<12?"AM":"PM";return i?r.toLowerCase():r};return r.replace(f,(function(e,r){return r||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return M.s(t.$y,4,"0");case"M":return a+1;case"MM":return M.s(a+1,2,"0");case"MMM":return h(i.monthsShort,a,d,3);case"MMMM":return h(d,a);case"D":return t.$D;case"DD":return M.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return h(i.weekdaysMin,t.$W,l,2);case"ddd":return h(i.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(o);case"HH":return M.s(o,2,"0");case"h":return u(1);case"hh":return u(2);case"a":return m(o,n,!0);case"A":return m(o,n,!1);case"m":return String(n);case"mm":return M.s(n,2,"0");case"s":return String(t.$s);case"ss":return M.s(t.$s,2,"0");case"SSS":return M.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(r,u,p){var m,f=this,g=M.p(u),_=S(r),v=(_.utcOffset()-this.utcOffset())*t,y=this-_,b=function(){return M.m(f,_)};switch(g){case h:m=b()/12;break;case d:m=b();break;case c:m=b()/3;break;case l:m=(y-v)/6048e5;break;case a:m=(y-v)/864e5;break;case n:m=y/i;break;case o:m=y/t;break;case s:m=y/e;break;default:m=y}return p?m:M.a(m)},_.daysInMonth=function(){return this.endOf(d).$D},_.$locale=function(){return b[this.$L]},_.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),r=x(e,t,!0);return r&&(i.$L=r),i},_.clone=function(){return M.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},g}(),R=A.prototype;return S.prototype=R,[["$ms",r],["$s",s],["$m",o],["$H",n],["$W",a],["$M",d],["$y",h],["$D",u]].forEach((function(e){R[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),S.extend=function(e,t){return e.$i||(e(t,A,S),e.$i=!0),S},S.locale=x,S.isDayjs=$,S.unix=function(e){return S(1e3*e)},S.en=b[y],S.Ls=b,S.p={},S}();var we=ye(be.exports),$e={exports:{}};$e.exports=function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,i=/\d\d/,r=/\d\d?/,s=/\d*[^-_:/,()\s\d]+/,o={},n=function(e){return(e=+e)+(e>68?1900:2e3)},a=function(e){return function(t){this[e]=+t}},l=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),i=60*t[1]+(+t[2]||0);return 0===i?0:"+"===t[0]?-i:i}(e)}],d=function(e){var t=o[e];return t&&(t.indexOf?t:t.s.concat(t.f))},c=function(e,t){var i,r=o.meridiem;if(r){for(var s=1;s<=24;s+=1)if(e.indexOf(r(s,0,t))>-1){i=s>12;break}}else i=e===(t?"pm":"PM");return i},h={A:[s,function(e){this.afternoon=c(e,!1)}],a:[s,function(e){this.afternoon=c(e,!0)}],S:[/\d/,function(e){this.milliseconds=100*+e}],SS:[i,function(e){this.milliseconds=10*+e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[i,a("day")],Do:[s,function(e){var t=o.ordinal,i=e.match(/\d+/);if(this.day=i[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r)}],M:[r,a("month")],MM:[i,a("month")],MMM:[s,function(e){var t=d("months"),i=(d("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(i<1)throw new Error;this.month=i%12||i}],MMMM:[s,function(e){var t=d("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[/[+-]?\d+/,a("year")],YY:[i,function(e){this.year=n(e)}],YYYY:[/\d{4}/,a("year")],Z:l,ZZ:l};function u(i){var r,s;r=i,s=o&&o.formats;for(var n=(i=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,i,r){var o=r&&r.toUpperCase();return i||s[r]||e[r]||s[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,i){return t||i.slice(1)}))}))).match(t),a=n.length,l=0;l<a;l+=1){var d=n[l],c=h[d],u=c&&c[0],p=c&&c[1];n[l]=p?{regex:u,parser:p}:d.replace(/^\[|\]$/g,"")}return function(e){for(var t={},i=0,r=0;i<a;i+=1){var s=n[i];if("string"==typeof s)r+=s.length;else{var o=s.regex,l=s.parser,d=e.slice(r),c=o.exec(d)[0];l.call(t,c),e=e.replace(c,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var i=e.hours;t?i<12&&(e.hours+=12):12===i&&(e.hours=0),delete e.afternoon}}(t),t}}return function(e,t,i){i.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(n=e.parseTwoDigitYear);var r=t.prototype,s=r.parse;r.parse=function(e){var t=e.date,r=e.utc,n=e.args;this.$u=r;var a=n[1];if("string"==typeof a){var l=!0===n[2],d=!0===n[3],c=l||d,h=n[2];d&&(h=n[2]),o=this.$locale(),!l&&h&&(o=i.Ls[h]),this.$d=function(e,t,i){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var r=u(t)(e),s=r.year,o=r.month,n=r.day,a=r.hours,l=r.minutes,d=r.seconds,c=r.milliseconds,h=r.zone,p=new Date,m=n||(s||o?1:p.getDate()),f=s||p.getFullYear(),g=0;s&&!o||(g=o>0?o-1:p.getMonth());var _=a||0,v=l||0,y=d||0,b=c||0;return h?new Date(Date.UTC(f,g,m,_,v,y,b+60*h.offset*1e3)):i?new Date(Date.UTC(f,g,m,_,v,y,b)):new Date(f,g,m,_,v,y,b)}catch(e){return new Date("")}}(t,a,r),this.init(),h&&!0!==h&&(this.$L=this.locale(h).$L),c&&t!=this.format(a)&&(this.$d=new Date("")),o={}}else if(a instanceof Array)for(var p=a.length,m=1;m<=p;m+=1){n[1]=a[m-1];var f=i.apply(this,n);if(f.isValid()){this.$d=f.$d,this.$L=f.$L,this.init();break}m===p&&(this.$d=new Date(""))}else s.call(this,e)}}}();var xe=ye($e.exports),Se={exports:{}};Se.exports=function(e,t,i){e=e||{};var r=t.prototype,s={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function o(e,t,i,s){return r.fromToBase(e,t,i,s)}i.en.relativeTime=s,r.fromToBase=function(t,r,o,n,a){for(var l,d,c,h=o.$locale().relativeTime||s,u=e.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],p=u.length,m=0;m<p;m+=1){var f=u[m];f.d&&(l=n?i(t).diff(o,f.d,!0):o.diff(t,f.d,!0));var g=(e.rounding||Math.round)(Math.abs(l));if(c=l>0,g<=f.r||!f.r){g<=1&&m>0&&(f=u[m-1]);var _=h[f.l];a&&(g=a(""+g)),d="string"==typeof _?_.replace("%d",g):_(g,r,f.l,c);break}}if(r)return d;var v=c?h.future:h.past;return"function"==typeof v?v(d):v.replace("%s",d)},r.to=function(e,t){return o(e,t,this,!0)},r.from=function(e,t){return o(e,t,this)};var n=function(e){return e.$u?i.utc():i()};r.toNow=function(e){return this.to(n(this),e)},r.fromNow=function(e){return this.from(n(this),e)}};var Me=ye(Se.exports);const Ae=new Set(["responsive","right","left","bottom","top","hidden"]),Re=["周日","周一","周二","周三","周四","周五","周六"];we.extend(xe),we.extend(Me);class Ce extends oe{static get properties(){return{config:{},resources:{type:Array},currentResourceIndex:{type:Number},selectedDate:{type:Object},_itemsToShow:{type:Number},_isDateFiltered:{type:Boolean},_isLoading:{type:Boolean},_isModalOpen:{type:Boolean},_slideshowRunning:{type:Boolean},_mediaAspect:{type:Number},_previewErrorIndex:{type:Number},errors:{type:Array}}}constructor(){super(),this.resources=void 0,this.currentResourceIndex=0,this._itemsToShow=10,this.selectedDate=null,this._isDateFiltered=!1,this._isLoading=!1,this._isModalOpen=!1,this._slideshowRunning=!1,this._previewErrorIndex=void 0,this.errors=[],this._hasKeyNavigationListener=!1,this._keyNavigationHandler=e=>this._keyNavigation(e),this._touchStartListener={handleEvent:e=>this._handleTouchStart(e),passive:!0},this._touchMoveListener=e=>this._handleTouchMove(e),this._mediaResolveCache=new Map,this._mediaResolveInflight=new Map,this._queuedResolveIds=new Map,this._mediaResolveCacheMs=9e6,this._mediaBrowseCache=new Map,this._mediaBrowseInflight=new Map,this._browseCacheGeneration=0,this._loadToken=0,this._pendingLoadRequested=!1,this._slideshowTimer=void 0,this._cameraEntityIds=[],this._viewerPointers=new Map,this._viewerGesture=void 0,this._zoom={scale:1,x:0,y:0},this._lastViewerTap=0,this._suppressViewerClickUntil=0}render(){if(!this.config)return z``;const e=this.resources||[],t=e.length>0?this._currentResource():void 0,i="auto"===this.config.height?"height-auto":"height-fill",r="number"==typeof this.config.aspect_ratio?this.config.aspect_ratio:this._mediaAspect,s=["auto"===this.config.height||"viewport"===this.config.height?"":`--gallery-card-height: ${this.config.height};`,r?`--gallery-media-aspect: ${r};`:""].join(" "),o="hidden"===this.config.menu_alignment;return z`
      <ha-card class="menu-${this.config.menu_alignment} ${i}" style="${s}">
        <section class="stage">
          ${this._renderStage(t)}
          ${o?this._renderInfoBar(t):z``}
        </section>
        <aside class="timeline">
          ${o?z``:this._renderInfoBar(t)}
          ${this._renderDateChips()}
          ${this.errors.length>0?z`<div class="error-list" role="status">
            ${this.errors.map((e=>z`<hui-warning>${e}</hui-warning>`))}
          </div>`:z``}
          <div class="resource-menu ${this._isTimelineGrouped(e)?"grouped":""}">
            ${this._isLoading?this._renderMenuLoadingState():0===e.length?z`<div class="menu-empty">${this._isDateFiltered?"这一天没有记录":"暂无媒体"}</div>`:this._renderTimelineItems(e)}
            ${!this._isLoading&&this._itemsToShow<e.length?z`<button type="button" class="load-more" @click="${this._loadMore}">加载更多（还有 ${e.length-this._itemsToShow} 项）</button>`:z``}
          </div>
        </aside>
        ${this._renderViewer(t)}
      </ha-card>
    `}_renderStage(e){const t=this.resources||[],i=this.config.show_reload?"媒体加载失败，请点击刷新后重试":"媒体加载失败，请检查媒体来源";let r;return r=this._isLoading?this._renderLoadingState("正在加载媒体..."):e?e.resolveError||this._previewErrorIndex===this.currentResourceIndex?this._renderErrorState(i):e.pendingAuth?this._renderLoadingState("正在加载预览..."):e.isHass?z`<hui-image @click="${()=>this._popupCamera()}"
        .hass=${this._hass}
        .cameraImage=${e.name}
        .cameraView=${"live"}
        .fitMode=${"contain"}
      ></hui-image>`:this._isImageResource(e)?z`<img class="preview-image" @click="${()=>this._openViewer()}" @load="${e=>this._updateMediaAspect(e.target.naturalWidth,e.target.naturalHeight)}" @error="${()=>this._handlePreviewError()}" src="${e.url}" alt="${e.caption||e.name}"/>`:z`<video controls ?loop=${this.config.video_loop} ?autoplay=${this.config.video_autoplay&&!this._isModalOpen} .muted=${Boolean(this.config.video_muted)} src="${e.url}#t=0.1" @error="${()=>this._handlePreviewError()}" @loadedmetadata="${e=>this._videoMetadataLoaded(e)}" @canplay="${e=>this._startVideo(e)}"
        @ended="${()=>this._videoHasEnded()}" preload="metadata" playsinline webkit-playsinline></video>`:this.errors.length>0?this._renderEmptyState(i):this._isDateFiltered?this._renderEmptyState("这一天没有记录",z`<button type="button" class="empty-action" @click="${()=>this._setDateFilter(null)}">查看全部</button>`):this._renderEmptyState("还没有图片或视频"),z`
      <div class="resource-viewer" @touchstart=${this._touchStartListener} @touchmove=${this._touchMoveListener}>
        <figure>${r}</figure>
        ${!this._isLoading&&t.length>1?z`<div class="viewer-nav">
          <button type="button" class="nav-icon-btn nav-left" @click="${()=>this._selectResource(this.currentResourceIndex-1)}" aria-label="上一个" title="上一个">
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <button type="button" class="nav-icon-btn nav-right" @click="${()=>this._selectResource(this.currentResourceIndex+1)}" aria-label="下一个" title="下一个">
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>
        </div>`:z``}
      </div>
    `}_renderInfoBar(e){const t=(this.resources||[]).length,i=!this._isLoading&&Boolean(e),r=i?this._getResourceTitle(e):"",s=i&&e.date?this._formatRelativeTime(e.date):"";return z`
      <div class="info-bar">
        <div class="info-text ${r?"has-caption":""}">
          ${this.config.title?z`<span class="info-title">${this.config.title}</span>`:z``}
          ${r?z`<span class="info-caption">${r}</span>`:z``}
          ${s?z`<span class="info-relative">${s}</span>`:z``}
        </div>
        <div class="info-actions">
          ${i&&t>1?z`<span class="info-counter">${this.currentResourceIndex+1} / ${t}</span>`:z``}
          ${i&&t>1&&this._hasSlideshowTimer()?z`<button type="button" class="icon-button" @click="${this._toggleSlideshow}" aria-pressed="${this._slideshowRunning?"true":"false"}" aria-label="${this._slideshowRunning?"暂停幻灯片":"继续幻灯片"}" title="${this._slideshowRunning?"暂停幻灯片":"继续幻灯片"}">
            <ha-icon icon="${this._slideshowRunning?"mdi:pause-box-outline":"mdi:play-box-multiple-outline"}"></ha-icon>
          </button>`:z``}
          ${i?this._renderDownloadButton(e):z``}
          ${i?z`<button type="button" class="icon-button" @click="${()=>this._openViewer()}" aria-label="全屏查看" title="全屏查看">
            <ha-icon icon="mdi:fullscreen"></ha-icon>
          </button>`:z``}
          ${this.config.show_reload?z`<button type="button" class="icon-button btn-reload" @click="${this._reloadResources}" ?disabled=${this._isLoading} aria-label="刷新媒体" title="刷新媒体">
            <ha-icon class="${this._isLoading?"spinning":""}" icon="mdi:refresh"></ha-icon>
          </button>`:z``}
        </div>
      </div>
    `}_renderDownloadButton(e){if(e.isHass||e.pendingAuth||!e.url)return z``;const t=e.extension?`${e.name}.${e.extension}`:e.name;return z`<a class="icon-button" href="${e.url}" download="${t}" target="_blank" rel="noopener" aria-label="下载" title="下载">
      <ha-icon icon="mdi:download"></ha-icon>
    </a>`}_renderDateChips(){if(!this.config.enable_date_search)return z``;const e=we().startOf("day"),t=this._isDateFiltered&&this.selectedDate?we(this.selectedDate):void 0,i=Boolean(t?.isSame(e,"day")),r=Boolean(t?.isSame(e.subtract(1,"day"),"day")),s=Boolean(t)&&!i&&!r,o=(e,t,i)=>z`<button type="button" class="chip ${t?"active":""}" aria-pressed="${t?"true":"false"}" @click="${()=>this._setDateFilter(i)}">${e}</button>`;return z`
      <div class="date-chips" role="toolbar" aria-label="按日期筛选">
        ${o("全部",!t,null)}
        ${o("今天",i,e)}
        ${o("昨天",r,e.subtract(1,"day"))}
        <label class="chip chip-date ${s?"active":""}">
          <ha-icon icon="mdi:calendar-month-outline"></ha-icon>
          <span>${s?this._formatMonthDay(t):"日期"}</span>
          <input type="date" class="date-picker" aria-label="选择日期" .value="${this._formatDateForInput(this.selectedDate)}" @click="${this._openDatePicker}" @change="${this._handleDateChange}">
        </label>
      </div>
    `}_isTimelineGrouped(e){return!this._isLoading&&!this.config.random_sort&&e.slice(0,this._itemsToShow).some((e=>e.date))}_renderTimelineItems(e){const t=e.slice(0,this._itemsToShow),i=this._isTimelineGrouped(e),r=i?this._countResourcesByDay(e):void 0,s=[];let o;return t.forEach(((e,t)=>{if(i){const i=this._getDayGroupKey(e);i!==o&&(s.push({key:`day:${t}:${i}`,group:i,resource:e}),o=i)}s.push({key:`${t}:${this._getResourceKey(e)}`,resource:e,index:t})})),ve(s,(e=>e.key),(e=>e.group?this._renderDayHeader(e.group,e.resource,r):this._renderThumbnail(e.resource,e.index,i)))}_renderDayHeader(e,t,i){const[r,s]="camera"===e?["摄像头",""]:"other"===e?["其他",""]:this._getDayLabelParts(t.date);return z`
      <div class="day-header">
        <span class="day-label"><span class="day-name">${r}</span>${s?z`<span class="day-date">${s}</span>`:z``}</span>
        <span class="day-count">${i.get(e)}</span>
      </div>
    `}_renderThumbnail(e,t,i){const r=e.caption||e.name||`媒体 ${t+1}`,s=this._getResourceTooltip(e)||r,o=t===this.currentResourceIndex,n=!e.isHass&&!this._isImageResource(e),a=n&&(this.config.show_duration??!0),l=e.date?we().diff(e.date,"minute"):-1,d=" "===this.config.caption_format?"":i&&e.date&&!e.isHass?e.date.format("HH:mm"):e.caption;return z`
      <figure id="resource${t}" class="thumb ${o?"selected":""}" @click="${()=>this._selectResource(t)}" @keydown="${e=>this._handleResourceKeydown(e,t)}" tabindex="0" role="button" aria-current="${o?"true":"false"}" aria-label="${r}" title="${s}">
        <div class="thumb-media">
          ${this._renderThumbnailMedia(e,t)}
          ${n?z`<span class="video-badge"><ha-icon icon="mdi:play"></ha-icon>${a?z`<span class="duration"></span>`:z``}</span>`:z``}
          ${l>=0&&l<60?z`<span class="new-dot" title="一小时内的新记录"></span>`:z``}
        </div>
        ${d?z`<figcaption>${d}</figcaption>`:z``}
      </figure>
    `}_renderThumbnailMedia(e,t){const i=!e.isHass&&!this._isImageResource(e);return e.pendingAuth?z`<div class="thumbnail-loading" data-resource-index="${t}">
        <div class="skeleton-media"></div>
      </div>`:e.resolveError||e.thumbnailError?z`<div class="thumbnail-error">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>加载失败</span>
      </div>`:e.isHass?z`<hui-image
        .hass=${this._hass}
        .cameraImage=${e.name}
        .cameraView=${"auto"}
        .fitMode=${"cover"}
      ></hui-image>`:i?this.config.video_preload??1?z`<video class="lzy_video" preload="metadata" data-src="${e.url}#t=${void 0===this.config.preview_video_at?.1:this.config.preview_video_at}" @error="${()=>this._handleThumbnailError(e)}" @loadedmetadata="${e=>this._videoMetadataLoaded(e)}" muted playsinline></video>`:z`<div class="video-placeholder"><ha-icon icon="mdi:movie-play-outline"></ha-icon></div>`:z`<img class="lzy_img" data-src="${e.url}" @error="${()=>this._handleThumbnailError(e)}" alt="" decoding="async" draggable="false"/>`}_renderViewer(e){const t=this.resources||[],i=this._isModalOpen&&e,r=i&&e.date?this._formatRelativeTime(e.date):"";return z`
      <dialog class="viewer" @close="${this._handleModalClosed}" @cancel="${this._handleModalClosed}">
        ${i?z`
          <div class="viewer-top">
            <button type="button" class="icon-button" @click="${this._closeViewer}" aria-label="关闭" title="关闭"><ha-icon icon="mdi:close"></ha-icon></button>
            <div class="viewer-title">
              <span class="info-caption">${this._getResourceTitle(e)}</span>
              ${r?z`<span class="info-relative">${r}</span>`:z``}
            </div>
            ${t.length>1?z`<span class="info-counter">${this.currentResourceIndex+1} / ${t.length}</span>`:z``}
            ${this._renderDownloadButton(e)}
          </div>
          <div class="viewer-stage"
            @pointerdown="${this._handleViewerPointerDown}"
            @pointermove="${this._handleViewerPointerMove}"
            @pointerup="${this._handleViewerPointerUp}"
            @pointercancel="${this._handleViewerPointerUp}"
            @wheel="${this._handleViewerWheel}"
            @click="${this._handleViewerStageClick}">
            <div class="zoom-layer">${this._renderViewerMedia(e)}</div>
            ${t.length>1?z`<div class="viewer-nav">
              <button type="button" class="nav-icon-btn" @click="${()=>this._selectResource(this.currentResourceIndex-1)}" aria-label="上一个" title="上一个"><ha-icon icon="mdi:chevron-left"></ha-icon></button>
              <button type="button" class="nav-icon-btn" @click="${()=>this._selectResource(this.currentResourceIndex+1)}" aria-label="下一个" title="下一个"><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            </div>`:z``}
          </div>
          ${t.length>1?z`<div class="viewer-strip">${this._renderViewerStrip()}</div>
            <div class="strip-tooltip" role="tooltip" hidden></div>`:z``}
        `:z``}
      </dialog>
    `}_renderViewerMedia(e){return e.pendingAuth?this._renderLoadingState("正在加载..."):e.resolveError?this._renderErrorState("媒体加载失败"):e.isHass?z`<hui-image class="viewer-media" .hass=${this._hass} .cameraImage=${e.name} .cameraView=${"auto"} .fitMode=${"contain"}></hui-image>`:this._isImageResource(e)?z`<img class="viewer-media" src="${e.url}" alt="${e.caption||e.name}" draggable="false">`:z`<video class="viewer-media" controls autoplay .muted=${Boolean(this.config.video_muted)} ?loop=${this.config.video_loop} src="${e.url}" playsinline webkit-playsinline></video>`}_renderViewerStrip(){const e=this.resources||[],t=this.currentResourceIndex,i=!this.config.random_sort&&e.some((e=>e.date)),r=[];let s;for(let o=Math.max(0,t-15);o<Math.min(e.length,t+16);o++){const t=i?this._getDayGroupKey(e[o]):void 0;i&&t!==s&&(r.push({key:`day:${o}:${t}`,group:t,resource:e[o]}),s=t),r.push({key:`${o}:${this._getResourceKey(e[o])}`,index:o})}return ve(r,(e=>e.key),(e=>e.group?this._renderStripDay(e.group,e.resource):this._renderStripItem(e.index)))}_renderStripDay(e,t){const[i,r]="camera"===e?["摄像头",""]:"other"===e?["其他",""]:[this._getDayLabelParts(t.date)[0],t.date.format("M/D")];return z`
      <div class="strip-day" aria-hidden="true">
        <span>${i}</span>
        ${r?z`<span class="strip-day-date">${r}</span>`:z``}
      </div>
    `}_renderStripItem(e){const t=this.resources,i=this.currentResourceIndex;return z`
      <button type="button" id="strip${e}" class="strip-item ${e===i?"selected":""}"
        @click="${()=>this._handleStripClick(e)}"
        @pointerenter="${t=>this._handleStripPointerEnter(t,e)}"
        @pointerdown="${t=>this._handleStripPointerDown(t,e)}"
        @pointerup="${this._handleStripPointerUp}"
        @pointerleave="${this._hideStripTooltip}"
        @pointercancel="${this._hideStripTooltip}"
        @contextmenu="${e=>e.preventDefault()}"
        aria-label="${this._getResourceTooltip(t[e])||t[e].caption||t[e].name}" aria-current="${e===i?"true":"false"}">
        ${this._renderThumbnailMedia(t[e],e)}
      </button>
    `}_renderLoadingState(e){return z`
      <div class="loading-state" role="status" aria-live="polite">
        <div class="loading-spinner"></div>
        <div class="loading-label">${e}</div>
      </div>
    `}_renderEmptyState(e,t){return z`
      <div class="empty-state">
        <ha-icon icon="mdi:image-off-outline"></ha-icon>
        <div class="empty-label">${e}</div>
        ${t||z``}
      </div>
    `}_renderErrorState(e){return z`
      <div class="empty-state error-state" role="alert">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <div class="empty-label">${e}</div>
      </div>
    `}_renderMenuLoadingState(){const e=Math.min(this._itemsToShow||10,10);return Array.from({length:e},(()=>z`
      <figure class="thumb resource-skeleton" aria-hidden="true">
        <div class="thumb-media"><div class="skeleton-media"></div></div>
        <div class="skeleton-caption"></div>
      </figure>
    `))}_getResourceTooltip(e){if(!e?.date)return e?.caption||"";const t=this._formatRelativeTime(e.date);return`${this._formatMonthDay(e.date)} ${e.date.format("HH:mm:ss")}${t?` · ${t}`:""}`}_getResourceTitle(e){return e.caption?e.caption:e.date?e.date.format("M月D日 HH:mm:ss"):e.name}_getDayGroupKey(e){return e.isHass?"camera":e.date?e.date.format("YYYY-MM-DD"):"other"}_countResourcesByDay(e){const t=new Map;for(const i of e){const e=this._getDayGroupKey(i);t.set(e,(t.get(e)||0)+1)}return t}_formatMonthDay(e){const t=we(e);return t.year()===we().year()?t.format("M月D日"):t.format("YYYY年M月D日")}_getDayLabelParts(e){const t=we(e).startOf("day"),i=we().startOf("day").diff(t,"day");return[0===i?"今天":1===i?"昨天":Re[t.day()],this._formatMonthDay(t)]}_formatRelativeTime(e){const t=we(),i=t.diff(e,"minute");if(i<0)return"";if(i<1)return"刚刚";if(i<60)return`${i} 分钟前`;if(i<1440)return`${Math.floor(i/60)} 小时前`;const r=t.startOf("day").diff(we(e).startOf("day"),"day");return 1===r?"昨天":r<7?`${r} 天前`:""}connectedCallback(){super.connectedCallback(),this._createImageObserver(),void 0!==this.resources&&this._addKeyNavigationListener(),this.config&&this._doSlideShow(!0),this._clockTimer??=setInterval((()=>this.requestUpdate()),6e4),this.requestUpdate()}updated(){this._createImageObserver();const e=this.shadowRoot.querySelectorAll("img.lzy_img[data-src], video.lzy_video[data-src], .thumbnail-loading[data-resource-index]");for(const i of e)this.imageObserver.observe(i);this._loadMoreObserver??=new IntersectionObserver((e=>{e.some((e=>e.isIntersecting))&&this._loadMore()})),this._loadMoreObserver.disconnect();const t=this.shadowRoot.querySelector(".load-more");t&&this._loadMoreObserver.observe(t)}_createImageObserver(){this.imageObserver||(this.imageObserver=new IntersectionObserver((e=>{const t=[];for(const i of e)if(i.isIntersecting){const e=i.target;if(void 0!==e.dataset.resourceIndex){const i=Number.parseInt(e.dataset.resourceIndex),r=this.resources?.[i];r?.pendingAuth&&r.mediaContentId&&t.push(r)}else e.dataset.src&&(e.src=e.dataset.src,"VIDEO"===e.tagName&&e.load(),delete e.dataset.src);this.imageObserver.unobserve(e)}if(t.length>0){const e=new Map(t.map((e=>[e.mediaContentId,e])));this._resolvePendingResourceBatch([...e.values()],this._hass,this._loadToken)}})))}setConfig(e){if(!e||!e.entity&&!e.entities)throw new Error("Required configuration for entities is missing");const t=(Array.isArray(e.entities)?e.entities:e.entities?[e.entities]:[]).map((e=>"object"==typeof e?{...e}:e));if(e.entity&&t.push(e.entity),0===t.length)throw new Error("At least one entity or media source is required");const i=String(e.menu_alignment||"responsive").toLowerCase(),r=Number.parseInt(e.items_per_page),s=Number(e.browse_cache_seconds),o=Number.parseInt(e.media_cache_size),n=Number.parseInt(e.resolve_concurrency),a=Number.parseInt(e.date_search_adjacent_days),l=Number.parseInt(e.slideshow_timer),d=JSON.stringify(this.config?.entities||[]),c={...e};delete c.entity,this.config={...c,entities:t,menu_alignment:Ae.has(i)?i:"responsive",items_per_page:Number.isFinite(r)&&r>0?r:10,browse_cache_seconds:Number.isFinite(s)&&s>=0?s:20,media_cache_size:Number.isFinite(o)&&o>0?o:500,resolve_concurrency:Number.isFinite(n)&&n>0?Math.min(n,8):4,date_search_adjacent_days:Number.isFinite(a)&&a>=0?Math.min(a,7):1,height:this._normalizeHeight(e.height),aspect_ratio:this._normalizeAspectRatio(e.aspect_ratio)},this._slideshowRunning=Number.isFinite(l)&&l>0,this._mediaAspect=this._readStoredMediaAspect(),this._mediaAspectMeasured=!1,d!==JSON.stringify(t)&&this._clearBrowseCache(),this._itemsToShow=this.config.items_per_page,this._previewErrorIndex=void 0,void 0!==this._hass&&this._loadResources(this._hass),this._doSlideShow(!0)}_normalizeHeight(e){if("number"==typeof e&&e>0)return`${e}px`;const t=String(e??"").trim();return t&&"viewport"!==t.toLowerCase()?"auto"===t.toLowerCase()?"auto":/^\d+(\.\d+)?$/.test(t)?`${t}px`:/^[\w\s().%+*/-]+$/.test(t)?t:"viewport":"viewport"}_normalizeAspectRatio(e){const t=String(e??"").trim().match(/^(\d+(?:\.\d+)?)\s*(?:[:/]\s*(\d+(?:\.\d+)?))?$/),i=t?Number(t[1])/Number(t[2]||1):Number.NaN;return Number.isFinite(i)&&i>0?Math.min(Math.max(i,.5),2.4):"auto"}set hass(e){const t=this._hass;this._hass=e,this.config&&(void 0===this.resources?this._loadResources(e):this._haveCameraStatesChanged(t,e)&&this.requestUpdate())}get hass(){return this._hass}_haveCameraStatesChanged(e,t){return this._cameraEntityIds.some((i=>e?.states[i]!==t?.states[i]))}disconnectedCallback(){super.disconnectedCallback(),this._removeKeyNavigationListener(),this._clearSlideshowTimer(),this._closeViewer(),clearInterval(this._clockTimer),this._clockTimer=void 0,this.imageObserver?.disconnect(),this._loadMoreObserver?.disconnect()}getCardSize(){return 12}getGridOptions(){return{columns:"full",min_columns:6}}static getStubConfig(){return{entities:[{path:"media-source://media_source/local",recursive:!0}],menu_alignment:"responsive"}}_isImageExtension(e){return"string"==typeof e&&/^(?:jpeg|jpg|gif|png|tiff|bmp|webp|avif)$/i.test(e)}_isImageResource(e){return e?.mediaType?"image"===e.mediaType:this._isImageExtension(e?.extension)}_getResourceKey(e){return e?.mediaContentId||e?.url||""}_patchResource(e,t){const i=this._getResourceKey(e);i&&this.resources&&(this.resources=this.resources.map((e=>this._getResourceKey(e)===i?{...e,...t}:e)))}_doSlideShow(e){this._clearSlideshowTimer(),this._slideshowRunning&&(e||this._isPreviewVideoPlaying()||this._selectResource(this.currentResourceIndex+1,!0),this.isConnected&&this._hasSlideshowTimer()&&(this._slideshowTimer=setTimeout((()=>{this._doSlideShow()}),1e3*Number.parseInt(this.config.slideshow_timer))))}_hasSlideshowTimer(){const e=Number.parseInt(this.config?.slideshow_timer);return Number.isFinite(e)&&e>0}_toggleSlideshow(){this._slideshowRunning=!this._slideshowRunning,this._doSlideShow(!0)}_isPreviewVideoPlaying(){if(!this.config.slideshow_video_end)return!1;const e=this.shadowRoot?.querySelector(".resource-viewer video");return Boolean(e&&!e.paused&&!e.ended)}_clearSlideshowTimer(){this._slideshowTimer&&(clearTimeout(this._slideshowTimer),this._slideshowTimer=void 0)}_loadMore(){const e=this.config.items_per_page;this._itemsToShow=Math.min(this._itemsToShow+e,this.resources.length)}_selectResource(e,t){if(this.autoPlayVideo=!0,!this.resources||0===this.resources.length)return;let i=Number.isFinite(e)?e:0;i<0?i=this.resources.length-1:i>=this.resources.length&&(i=0),i>=this._itemsToShow&&(this._itemsToShow=Math.min(i+this.config.items_per_page,this.resources.length)),this.currentResourceIndex=i,this._previewErrorIndex=void 0;const r=this.resources[this.currentResourceIndex];(r.resolveError||r.thumbnailError)&&r.mediaContentId?(this._mediaResolveCache.delete(r.mediaContentId),this._patchResource(r,{pendingAuth:!0,resolveError:!1,thumbnailError:!1})):r.thumbnailError&&this._patchResource(r,{thumbnailError:!1}),this._resolveResourceUrl(this.resources[this.currentResourceIndex]),this._resolveResourceUrl(this.resources[(i+1)%this.resources.length]),this._resolveResourceUrl(this.resources[(i-1+this.resources.length)%this.resources.length]),!t&&this._slideshowTimer&&this._doSlideShow(!0);const s=this.currentResourceIndex;this._resetZoom(),this.updateComplete.then((()=>{this._scrollThumbnailIntoView(s),this._scrollStripItemIntoView(s)}))}_scrollThumbnailIntoView(e){e===this.currentResourceIndex&&this._scrollWithin(this.shadowRoot?.querySelector(".resource-menu"),this.shadowRoot?.querySelector(`#resource${e}`))}_scrollStripItemIntoView(e){const t=this.shadowRoot?.querySelector(".viewer-strip"),i=this.shadowRoot?.querySelector(`#strip${e}`);if(e!==this.currentResourceIndex||!this._isModalOpen||!t||!i)return;const r=t.getBoundingClientRect(),s=i.getBoundingClientRect(),o=s.left+s.width/2-(r.left+r.width/2);Math.abs(o)>1&&t.scrollTo({left:t.scrollLeft+o,behavior:"smooth"})}_scrollWithin(e,t){if(!e||!t)return;const i=e.getBoundingClientRect(),r=t.getBoundingClientRect(),s=e.querySelector(".day-header"),o=(s?.offsetHeight??0)+12,n=(s?.offsetWidth??0)+12;let a=e.scrollTop,l=e.scrollLeft;e.scrollHeight>e.clientHeight&&(r.top<i.top+o?a+=r.top-i.top-o:r.bottom>i.bottom&&(a+=r.bottom-i.bottom+12)),e.scrollWidth>e.clientWidth&&(r.left<i.left+n?l+=r.left-i.left-n:r.right>i.right&&(l+=r.right-i.right+12)),a===e.scrollTop&&l===e.scrollLeft||e.scrollTo({top:a,left:l,behavior:"smooth"})}_currentResource(){return this.resources?.[this.currentResourceIndex]}_updateMediaAspect(e,t){if(this._mediaAspectMeasured||!e||!t)return;const i=Math.round(1e3*Math.min(Math.max(e/t,1),2.4))/1e3;if(this._mediaAspectMeasured=!0,!(this._mediaAspect&&Math.abs(this._mediaAspect-i)<=.01)){this._mediaAspect=i;try{localStorage.setItem(this._getAspectStorageKey(),String(i))}catch{}}}_getAspectStorageKey(){return`gallery-card-aspect:${JSON.stringify(this.config.entities)}`}_readStoredMediaAspect(){try{const e=Number(localStorage.getItem(this._getAspectStorageKey()));return e>=1&&e<=2.4?e:void 0}catch{return}}_startVideo(e){if(!this.autoPlayVideo)return;if(this.autoPlayVideo=!1,this._isModalOpen)return;const t=e.target.play();t&&t.catch((()=>{}))}_videoMetadataLoaded(e){const t=e.target.closest("figure")?.querySelector(".duration");e.target.closest(".resource-viewer")&&this._updateMediaAspect(e.target.videoWidth,e.target.videoHeight),Number.isFinite(e.target.duration)&&t&&(t.textContent=this._getFormattedVideoDuration(e.target.duration)),this.config.video_muted&&(e.target.muted=!0)}_videoHasEnded(){this.config.slideshow_video_end&&(this._selectResource(this.currentResourceIndex+1,!0),this._doSlideShow(!0))}_popupCamera(){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:this._currentResource()?.name},this.dispatchEvent(e)}_openViewer(){const e=this.shadowRoot.querySelector("dialog.viewer");e&&!e.open&&(this.shadowRoot.querySelector(".resource-viewer video")?.pause(),this._resetZoom(),this._isModalOpen=!0,e.showModal(),this.updateComplete.then((()=>this._scrollStripItemIntoView(this.currentResourceIndex))))}_closeViewer(){this._hideStripTooltip();const e=this.shadowRoot?.querySelector("dialog.viewer");e?.open&&e.close(),this._isModalOpen=!1}_handleModalClosed(){this._isModalOpen=!1}_handleStripPointerEnter(e,t){"mouse"===e.pointerType&&this._showStripTooltip(e.currentTarget,t)}_handleStripPointerDown(e,t){if(this._stripLongPressed=!1,"mouse"===e.pointerType)return;const i=e.currentTarget;clearTimeout(this._stripPressTimer),this._stripPressTimer=setTimeout((()=>{this._stripLongPressed=!0,this._showStripTooltip(i,t)}),400)}_handleStripPointerUp(e){clearTimeout(this._stripPressTimer),"mouse"!==e.pointerType&&this._hideStripTooltip()}_handleStripClick(e){this._stripLongPressed?this._stripLongPressed=!1:this._selectResource(e)}_showStripTooltip(e,t){const i=this.shadowRoot.querySelector(".strip-tooltip"),r=this.shadowRoot.querySelector("dialog.viewer"),s=this._getResourceTooltip(this.resources?.[t]);if(!i||!r||!s)return;i.textContent=s,i.hidden=!1;const o=e.getBoundingClientRect(),n=r.getBoundingClientRect(),a=i.offsetWidth/2,l=o.left+o.width/2-n.left;i.style.left=`${Math.min(Math.max(l,a+8),n.width-a-8)}px`,i.style.top=o.top-n.top-8+"px"}_hideStripTooltip(){clearTimeout(this._stripPressTimer);const e=this.shadowRoot?.querySelector(".strip-tooltip");e&&(e.hidden=!0)}_handleViewerStageClick(e){Date.now()<this._suppressViewerClickUntil||(e.target===e.currentTarget||e.target.classList.contains("zoom-layer"))&&this._closeViewer()}_handleViewerPointerDown(e){if(!("mouse"===e.pointerType&&0!==e.button||e.target.closest("button, video"))){this._viewerPointers.set(e.pointerId,{x:e.clientX,y:e.clientY});try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}if(e.currentTarget.classList.add("gesturing"),1===this._viewerPointers.size)this._viewerGesture={startX:e.clientX,startY:e.clientY,originX:this._zoom.x,originY:this._zoom.y,moved:!1};else if(2===this._viewerPointers.size){const[e,t]=[...this._viewerPointers.values()];this._viewerGesture={pinch:!0,startDistance:Math.hypot(e.x-t.x,e.y-t.y)||1,startScale:this._zoom.scale,moved:!0}}}}_handleViewerPointerMove(e){if(!this._viewerPointers.has(e.pointerId)||!this._viewerGesture)return;this._viewerPointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const t=this._viewerGesture;if(t.pinch){if(this._viewerPointers.size<2)return;const[e,i]=[...this._viewerPointers.values()],r=Math.hypot(e.x-i.x,e.y-i.y);return void this._setZoom(t.startScale*r/t.startDistance)}const i=e.clientX-t.startX,r=e.clientY-t.startY;(Math.abs(i)>6||Math.abs(r)>6)&&(t.moved=!0),this._zoom.scale>1&&(this._zoom.x=t.originX+i,this._zoom.y=t.originY+r,this._applyZoom())}_handleViewerPointerUp(e){if(!this._viewerPointers.has(e.pointerId))return;this._viewerPointers.delete(e.pointerId);const t=this._viewerGesture;if(this._viewerPointers.size>0){const[e]=[...this._viewerPointers.values()];return void(this._viewerGesture={startX:e.x,startY:e.y,originX:this._zoom.x,originY:this._zoom.y,moved:!0})}if(e.currentTarget.classList.remove("gesturing"),this._viewerGesture=void 0,!t)return;if(t.moved&&(this._suppressViewerClickUntil=Date.now()+400),t.pinch)return;const i=e.clientX-t.startX,r=e.clientY-t.startY;if(t.moved)this._zoom.scale>1||(Math.abs(i)>50&&Math.abs(i)>Math.abs(r)?this._selectResource(this.currentResourceIndex+(i<0?1:-1)):r>80&&r>Math.abs(i)&&this._closeViewer());else{const t=Date.now();t-this._lastViewerTap<300?(this._lastViewerTap=0,this._suppressViewerClickUntil=Date.now()+400,this._toggleZoomAt(e.clientX,e.clientY,e.currentTarget)):this._lastViewerTap=t}}_handleViewerWheel(e){this._isImageResource(this._currentResource())&&(e.preventDefault(),this._setZoom(this._zoom.scale*Math.exp(.0015*-e.deltaY)))}_toggleZoomAt(e,t,i){if(!this._isImageResource(this._currentResource()))return;if(this._zoom.scale>1)return void this._resetZoom();const r=i.getBoundingClientRect();this._zoom={scale:2.5,x:1.5*(r.left+r.width/2-e),y:1.5*(r.top+r.height/2-t)},this._applyZoom()}_setZoom(e){const t=Math.min(Math.max(e,1),5);if(!this._isImageResource(this._currentResource()))return;const i=t/this._zoom.scale;this._zoom={scale:t,x:this._zoom.x*i,y:this._zoom.y*i},this._applyZoom()}_resetZoom(){this._zoom={scale:1,x:0,y:0},this._applyZoom()}_applyZoom(){const e=this.shadowRoot?.querySelector(".viewer .zoom-layer");if(!e)return;const t=(this._zoom.scale-1)*e.offsetWidth/2,i=(this._zoom.scale-1)*e.offsetHeight/2;this._zoom.x=Math.min(Math.max(this._zoom.x,-t),t),this._zoom.y=Math.min(Math.max(this._zoom.y,-i),i),e.style.transform=1===this._zoom.scale?"":`translate(${this._zoom.x}px, ${this._zoom.y}px) scale(${this._zoom.scale})`}_reloadResources(){this._mediaResolveCache.clear(),this._clearBrowseCache(),this._previewErrorIndex=void 0,this._loadResources(this._hass)}_clearBrowseCache(){this._browseCacheGeneration++,this._mediaBrowseCache.clear(),this._mediaBrowseInflight.clear()}_handlePreviewError(){const e=this._currentResource();if(e)return e.mediaContentId&&!e.resolveRetried?(this._mediaResolveCache.delete(e.mediaContentId),this._patchResource(e,{pendingAuth:!0,resolveError:!1,resolveRetried:!0}),void this._resolveResourceUrl(this._currentResource())):void(this._previewErrorIndex=this.currentResourceIndex)}_handleThumbnailError(e){if(e.mediaContentId&&!e.thumbnailRetried)return this._mediaResolveCache.delete(e.mediaContentId),this._patchResource(e,{pendingAuth:!0,thumbnailRetried:!0}),void this._resolveResourceUrl({...e,pendingAuth:!0});this._patchResource(e,{thumbnailError:!0})}_handleResourceKeydown(e,t){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._selectResource(t))}_getFormattedVideoDuration(e){const t=Math.floor(e),i=Math.floor(t/3600),r=Math.floor(t%3600/60),s=String(t%60).padStart(2,"0");return i>0?`${i}:${String(r).padStart(2,"0")}:${s}`:`${r}:${s}`}_keyNavigation(e){const t=e.composedPath()[0],i=t?.isContentEditable||["INPUT","TEXTAREA","SELECT","VIDEO"].includes(t?.tagName);if(!e.defaultPrevented&&!i&&(this.matches(":hover")||this.shadowRoot.activeElement))switch(e.code){case"ArrowDown":case"ArrowRight":e.preventDefault(),this._selectResource(this.currentResourceIndex+1);break;case"ArrowUp":case"ArrowLeft":e.preventDefault(),this._selectResource(this.currentResourceIndex-1)}}_handleTouchStart(e){this.xDown=e.touches[0].clientX,this.yDown=e.touches[0].clientY}_handleTouchMove(e){if(void 0===this.xDown||void 0===this.yDown)return;const t=e.touches[0].clientX,i=e.touches[0].clientY,r=this.xDown-t,s=this.yDown-i;let o=!1;Math.abs(r)>=40&&Math.abs(r)>Math.abs(s)?(r>0?(this._selectResource(this.currentResourceIndex+1),e.preventDefault()):(this._selectResource(this.currentResourceIndex-1),e.preventDefault()),o=!0):Math.abs(s)>=40&&(o=!0),o&&(this.xDown=void 0,this.yDown=void 0)}_handleDateChange(e){this._setDateFilter(e.target.value?we(e.target.value):null)}_openDatePicker(e){try{e.currentTarget.showPicker?.()}catch{}}_setDateFilter(e){this.selectedDate=e?we(e).startOf("day").toDate():null,this._isDateFiltered=null!==this.selectedDate,this._loadResources(this._hass)}_convertOldFormat(e){return e&&"string"==typeof e?e.replace(/%YYY/g,"YYYY").replace(/%Y/g,"YYYY").replace(/%m/g,"MM").replace(/%d/g,"DD").replace(/%H/g,"HH").replace(/%M/g,"mm").replace(/%S/g,"ss"):e}async _loadResources(e){if(!e||!this.config)return;if(this._isLoading)return void(this._pendingLoadRequested=!0);const t=++this._loadToken;this._isLoading=!0,this.currentResourceIndex=void 0,this.resources=[],this.errors=[],this._previewErrorIndex=void 0,this._itemsToShow=this.config.items_per_page,this._cameraEntityIds=[];const i=(this.config.enable_date_search??!1)&&this._isDateFiltered,r=Number(this.config.maximum_files),s=Number.isFinite(r)&&r>0?Math.floor(r):void 0,o=this.config.maximum_files_per_entity??!0,n=o?void 0:s,a=this._convertOldFormat(this.config.folder_format),l=this._convertOldFormat(this.config.file_name_format),d=this.config.file_name_date_begins,c=this._convertOldFormat(this.config.caption_format),h=this.config.parsed_date_sort??!1,u=this.config.reverse_sort??!0,p=this.config.random_sort??!1,m=o||!h&&!p?s:void 0,f=()=>{const t=[];for(const r of this.config.entities){let s,o=!1,n=!0,h=!0,p=a,f=l,g=d,_=c;if(r&&"object"==typeof r?(s=r.path,r.recursive&&(o=r.recursive),void 0!==r.include_video&&(n=r.include_video),void 0!==r.include_images&&(h=r.include_images),r.folder_format&&(p=this._convertOldFormat(r.folder_format)),r.file_name_format&&(f=this._convertOldFormat(r.file_name_format)),r.file_name_date_begins&&(g=r.file_name_date_begins),r.caption_format&&(_=this._convertOldFormat(r.caption_format))):s=r,"string"==typeof s&&s.trim())if("media-source://"===s.substring(0,15).toLowerCase())t.push(this._loadMediaResource(e,s,m,p,f,g,_,o,u,n,h,i));else{const r=e.states[s];void 0===r?t.push(Promise.resolve({error:!0,entity:s,message:"Invalid Entity ID"})):(void 0!==r.attributes.entity_picture&&t.push(this._loadCameraResource(s,r)),void 0!==r.attributes.fileList&&t.push(this._loadFilesResources(r.attributes.fileList,m,f,g,_,u,i)),void 0!==r.attributes.file_list&&t.push(this._loadFilesResources(r.attributes.file_list,m,f,g,_,u,i)))}else t.push(Promise.resolve({error:!0,entity:String(s||"未配置来源"),message:"Invalid media source"}))}return t};try{const t=await Promise.all(f());let r=t.filter((e=>!e.error)).flat(Number.POSITIVE_INFINITY);if(i&&(r=this._filterResourcesForSelectedDate(r)),h){const e=e=>e.date?e.date.valueOf():0,t=u?-1:1;r.sort(((i,r)=>(e(i)-e(r))*t))}if(p)for(let e=r.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));e!==t&&([r[e],r[t]]=[r[t],r[e]])}if(void 0!==n&&n<r.length){let e=r.filter((e=>e.isHass)).length;r=r.filter((t=>t.isHass||e++<n))}this.resources=r,this._cameraEntityIds=r.filter((e=>e.isHass)).map((e=>e.name)),this.currentResourceIndex=0,this._resolveResourceUrl(this.resources[0]),this._addKeyNavigationListener(),this.updateComplete.then((()=>this._scrollThumbnailIntoView(0)));const s=t.filter((e=>e.error)).flat(Number.POSITIVE_INFINITY);this.errors=s.map((e=>e.message+" "+e.entity));for(const i of s)Promise.resolve(e.callService("system_log","write",{message:"Gallery Card Error:  "+i.message+"   "+i.entity})).catch((()=>{}))}catch(g){t===this._loadToken&&(this.resources=[],this.currentResourceIndex=0,this.errors=[g?.message||"Unknown gallery loading error"]),console.error("Gallery Card failed to load resources",g)}finally{t===this._loadToken&&(this._isLoading=!1,this._pendingLoadRequested&&(this._pendingLoadRequested=!1,this._loadResources(this._hass)))}}_addKeyNavigationListener(){this._hasKeyNavigationListener||!this.isConnected||this.parentNode&&this.parentNode.tagName&&"hui-card-preview"===this.parentNode.tagName.toLowerCase()||(document.addEventListener("keydown",this._keyNavigationHandler),this._hasKeyNavigationListener=!0)}_removeKeyNavigationListener(){this._hasKeyNavigationListener&&(document.removeEventListener("keydown",this._keyNavigationHandler),this._hasKeyNavigationListener=!1)}async _loadMediaResource(e,t,i,r,s,o,n,a,l,d,c,h){let u=t;try{let m=[];const f=h&&Boolean(s),g=f&&this.config.date_search_adjacent_days>0,_=f?void 0:i;if(!h&&r&&l&&void 0!==i&&!Number.isNaN(i)){let s=we(),o="";const n=[],a=t.replace(/\/+$/,"");let h=732;for(;m.length<i&&h-- >0;){const t=s.format(r);if(u=a+"/"+t,t!==o)try{const t=await this._loadMedia(this,e,u,i,!1,l,d,c,!1,!1);m.push(...t)}catch(p){if("browse_media_failed"!==p.code)throw p;n.push(u)}if(n.length>2){if(0===m.length)throw u=n.join(","),new Error("Failed to browse several folders and found no media files.  Verify your settings are correct.");break}o=t,s=s.subtract(12,"hour")}m.sort(((e,t)=>String(t.title||"").localeCompare(String(e.title||"")))),m.length>i&&(m.length=i)}else m=await this._loadMedia(this,e,u,_,a,l,d,c,h,g);let v=[];for(const e of m){const t=e.pending_authentication?this._createPendingMediaResource(e,s,o,n):this._createFileResource(e.authenticated_path,s,o,n);void 0!==t&&(t.mediaContentId=e.media_content_id,v.push(t))}return f&&(v=this._filterResourcesForSelectedDate(v)),void 0!==i&&i<v.length&&(v.length=i),v}catch(p){return console.error("Gallery Card failed to load media source",p),{error:!0,entity:u,message:p.message}}}async _loadMedia(e,t,i,r,s,o,n,a,l,d){const c={media_class:"directory",media_content_id:i};"/"!==i.substring(i.length-1,i.length)&&"media-source://media_source"!==i&&(c.media_content_id+="/");const h=Number.isFinite(r)&&r>0,u=(s&&h?await this._fetchMediaLimited(e,t,c,r,o,n,a,l,d):await Promise.all(this._fetchMedia(e,t,c,s,n,a,l,d))).flat(Number.POSITIVE_INFINITY).filter((function(e){return void 0!==e})).sort((function(e,t){return e.title>t.title?1:e.title<t.title?-1:0}));return o&&u.reverse(),void 0!==r&&!Number.isNaN(r)&&r<u.length&&(u.length=r),u.map((e=>({...e,pending_authentication:!0})))}_fetchMedia(e,t,i,r,s,o,n,a){const l=[];return"directory"===i.media_class&&(i.children?l.push(...i.children.filter((t=>this._shouldIncludeMediaItem(e,t,r,s,o,n,a))).map((i=>Promise.all(e._fetchMedia(e,t,i,r,s,o,n,a))))):l.push(e._fetchMediaContents(t,i.media_content_id).then((i=>Promise.all(e._fetchMedia(e,t,i,r,s,o,n,a)))))),"directory"!==i.media_class&&l.push(Promise.resolve(i)),l}async _fetchMediaLimited(e,t,i,r,s,o,n,a,l){const d=[],c=s?-1:1,h=async i=>{if(d.length>=r)return;if("directory"!==i.media_class)return void d.push(i);const s=[...(i.children?i:await this._fetchMediaContents(t,i.media_content_id)).children||[]].filter((t=>this._shouldIncludeMediaItem(e,t,!0,o,n,a,l))).sort(((e,t)=>String(e.title||"").localeCompare(String(t.title||""))*c));for(const e of s){if(d.length>=r)break;"directory"===e.media_class?await h(e):d.push(e)}};return await h(i),d}_shouldIncludeMediaItem(e,t,i,r,s,o,n){if(!t||"@eaDir"===String(t.title||"").replace(/\/$/,""))return!1;if("video"===t.media_class)return r;if("image"===t.media_class)return s;if(!i||"directory"!==t.media_class)return!1;if(!o)return!0;const a=e.config.search_date_folder_format||"DD_MM_YYYY",l=String(t.title||"").replace(/\/$/,""),d=we(l,a,!0);if(!d.isValid()||d.format(a)!==l)return!0;return e._getDateSearchFolderNames(a,n).has(l)}_fetchMediaContents(e,t){const i=1e3*this.config.browse_cache_seconds,r=this._mediaBrowseCache.get(t);if(i>0&&r?.expiresAt>Date.now())return this._refreshCacheEntry(this._mediaBrowseCache,t,r),Promise.resolve(r.value);if(r&&this._mediaBrowseCache.delete(t),this._mediaBrowseInflight.has(t))return this._mediaBrowseInflight.get(t);const s=this._browseCacheGeneration,o=e.callWS({type:"media_source/browse_media",media_content_id:t}).then((e=>(i>0&&s===this._browseCacheGeneration&&this._setLimitedCacheEntry(this._mediaBrowseCache,t,{value:e,expiresAt:Date.now()+i},100),e))).finally((()=>{this._mediaBrowseInflight.get(t)===o&&this._mediaBrowseInflight.delete(t)}));return this._mediaBrowseInflight.set(t,o),o}_fetchMediaItem(e,t){return e.callWS({type:"media_source/resolve_media",media_content_id:t,expires:10800})}_fetchMediaItemWithCache(e,t){const i=this._mediaResolveCache.get(t);if(i&&i.expiresAt>Date.now())return this._refreshCacheEntry(this._mediaResolveCache,t,i),Promise.resolve({url:i.url});if(i&&this._mediaResolveCache.delete(t),this._mediaResolveInflight.has(t))return this._mediaResolveInflight.get(t);const r=this._fetchMediaItem(e,t).then((e=>(this._setLimitedCacheEntry(this._mediaResolveCache,t,{url:e.url,expiresAt:Date.now()+this._mediaResolveCacheMs},this.config.media_cache_size),e))).finally((()=>{this._mediaResolveInflight.delete(t)}));return this._mediaResolveInflight.set(t,r),r}_refreshCacheEntry(e,t,i){e.delete(t),e.set(t,i)}_setLimitedCacheEntry(e,t,i,r){for(this._refreshCacheEntry(e,t,i);e.size>r;){const t=e.keys().next().value;e.delete(t)}}_loadCameraResource(e,t){const i={url:t.attributes.entity_picture,name:e,extension:"jpg",caption:t.attributes.friendly_name??e,isHass:!0};return Promise.resolve(i)}_loadFilesResources(e,t,i,r,s,o,n){let a=[];if(Array.isArray(e)){e=[...e].filter((e=>"string"==typeof e&&!e.includes("@eaDir"))),o&&e.reverse(),!n&&void 0!==t&&!Number.isNaN(t)&&t<e.length&&(e.length=t);for(const t of e){const e=t;let o;if(e.startsWith("/local/")||e.startsWith("http://")||e.startsWith("https://"))o=e;else if(e.includes("/config/www/"))o=e.replace("/config/www/","/local/");else if(e.includes("/www/"))o="/local/"+e.slice(e.indexOf("/www/")+5);else{if(e.startsWith("/"))continue;o="/local/"+e}const n=this._createFileResource(o,i,r,s);void 0!==n&&a.push(n)}n&&i&&(a=this._filterResourcesForSelectedDate(a)),void 0!==t&&t<a.length&&(a.length=t)}return Promise.resolve(a)}_createFileResource(e,t,i,r){if(!e)return;let s;const o=e.split("?")[0];let n=o.split("/").at(-1),a="",l="";if("@eaDir"!==n){const d=n.lastIndexOf("."),c=d>0?n.slice(d+1).toLowerCase():"";d>0&&(n=n.slice(0,d));try{n=decodeURIComponent(n)}catch{}" "!==r&&(l=n);let h=n;if(i&&!Number.isNaN(Number.parseInt(i))&&(h=h.slice(Math.max(0,Number.parseInt(i)-1))),t){const e=we(h,t);e.isValid()&&(a=e)}a&&r&&("AGO"===r.toUpperCase().trim()?l=a.fromNow():(l=a.format(r),l=l.replaceAll(/ago/gi,a.fromNow()))),s={url:e,base_url:o,name:n,extension:c,caption:l,index:-1,date:a,dateFilterable:Boolean(t)}}return s}_createPendingMediaResource(e,t,i,r){const s=this._createFileResource(e.title||e.media_content_id,t,i,r);if(!s)return;const o=String(e.media_content_type||""),n=["image","video"].includes(e.media_class)?e.media_class:o.startsWith("image/")?"image":o.startsWith("video/")?"video":void 0;return{...s,url:"",mediaContentId:e.media_content_id,mediaType:n,pendingAuth:!0}}async _resolvePendingResourceBatch(e,t,i){const r=this.config.resolve_concurrency,s=e.filter((e=>this._queuedResolveIds.get(e.mediaContentId)!==i&&(this._queuedResolveIds.set(e.mediaContentId,i),!0)));try{for(let e=0;e<s.length;e+=r){if(i!==this._loadToken)return;const o=s.slice(e,e+r),n=await Promise.all(o.map((async e=>{try{const i=await this._fetchMediaItemWithCache(t,e.mediaContentId);return{mediaContentId:e.mediaContentId,url:i.url}}catch(i){return console.error("Gallery Card failed to resolve media URL",i),{mediaContentId:e.mediaContentId,error:!0}}})));this._applyResourceResolutionResults(n,i)}}finally{for(const e of s)this._queuedResolveIds.get(e.mediaContentId)===i&&this._queuedResolveIds.delete(e.mediaContentId)}}_resolveResourceUrl(e,t=this._hass,i=this._loadToken){return e&&e.pendingAuth&&e.mediaContentId?this._fetchMediaItemWithCache(t,e.mediaContentId).then((t=>{const r={mediaContentId:e.mediaContentId,url:t.url};return this._applyResourceResolutionResults([r],i),r})).catch((t=>{this._applyResourceResolutionResults([{mediaContentId:e.mediaContentId,error:!0}],i),console.error("Gallery Card failed to resolve media URL",t)})):Promise.resolve()}_applyResourceResolutionResults(e,t){if(t!==this._loadToken||0===e.length)return;const i=new Map(e.map((e=>[e.mediaContentId,e])));this.resources=(this.resources||[]).map((e=>{const t=i.get(e.mediaContentId);return t?t.error?{...e,pendingAuth:!1,resolveError:!0}:{...e,url:t.url,pendingAuth:!1,resolveError:!1,thumbnailError:!1}:e}))}_getDateSearchFolderNames(e,t){const i=t?this.config.date_search_adjacent_days:0,r=we(this.selectedDate),s=new Set;for(let o=-i;o<=i;o++)s.add(r.add(o,"day").format(e));return s}_filterResourcesForSelectedDate(e){const t=we(this.selectedDate).format("YYYY-MM-DD");return e.filter((e=>!e.dateFilterable||!(!e.date||!we(e.date).isValid())&&we(e.date).format("YYYY-MM-DD")===t))}_formatDateForInput(e){return e?we(e).format("YYYY-MM-DD"):""}static get styles(){return o`
      :host {
        --gallery-accent: var(--primary-color, #03a9f4);
        --gallery-accent-rgb: var(--rgb-primary-color, 3, 169, 244);
        --gallery-text: var(--primary-text-color, #212121);
        --gallery-text-secondary: var(--secondary-text-color, #727272);
        --gallery-surface: var(--card-background-color, #fff);
        --gallery-divider: var(--divider-color, rgba(0, 0, 0, 0.12));
        --gallery-placeholder: rgba(127, 127, 127, 0.14);
        --gallery-stage-bg: #0e0e0e;
        display: block;
        container: gallery-card / inline-size;
      }

      /* Card shell. Page mode (default) fills the viewport below the dashboard header and scrolls the
         timeline internally; .height-auto sizes to content for use as a regular card. */
      ha-card {
        height: var(--gallery-card-height, calc(100dvh - var(--header-height, 56px)));
        display: flex;
        flex-direction: column;
        overflow: hidden;
        color: var(--gallery-text);
        background: var(--gallery-surface);
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, none);
        border: var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--gallery-divider));
        box-sizing: border-box;
      }
      ha-card.height-auto {
        height: auto;
      }
      button {
        font: inherit;
      }
      ha-icon {
        --mdc-icon-size: 22px;
      }

      /* Stage: preview plus info bar */
      .stage {
        position: relative;
        flex: 1 1 auto;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
        background: var(--gallery-stage-bg);
      }
      .resource-viewer {
        position: relative;
        flex: 1 1 auto;
        min-height: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }
      .resource-viewer figure {
        width: 100%;
        height: 100%;
        margin: 0;
      }
      img, video {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
      }
      hui-image {
        display: block;
        width: 100%;
        height: 100%;
      }
      .preview-image {
        cursor: zoom-in;
        animation: gallery-fade-in 0.25s ease;
      }
      .resource-viewer hui-image {
        cursor: pointer;
      }
      .loading-state,
      .empty-state {
        width: 100%;
        height: 100%;
        min-height: 140px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 16px;
        color: rgba(255, 255, 255, 0.82);
        text-align: center;
        box-sizing: border-box;
      }
      .loading-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(255, 255, 255, 0.2);
        border-top-color: var(--gallery-accent);
        border-radius: 50%;
        animation: gallery-spin 0.8s linear infinite;
      }
      .loading-label,
      .empty-label {
        font-size: 14px;
      }
      .empty-state ha-icon {
        --mdc-icon-size: 40px;
        opacity: 0.7;
      }
      .error-state ha-icon {
        color: var(--error-color, #db4437);
      }
      .empty-action {
        padding: 6px 16px;
        border: 1px solid rgba(255, 255, 255, 0.4);
        border-radius: 999px;
        background: transparent;
        color: #fff;
        cursor: pointer;
      }
      .empty-action:hover {
        background: rgba(255, 255, 255, 0.12);
      }
      .viewer-nav {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 12px;
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
        background: rgba(0, 0, 0, 0.45);
        color: #fff;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.2s ease, background 0.2s ease;
        -webkit-tap-highlight-color: transparent;
      }
      .nav-icon-btn ha-icon {
        --mdc-icon-size: 28px;
      }
      .resource-viewer:hover .nav-icon-btn,
      .viewer-stage:hover .nav-icon-btn,
      .nav-icon-btn:focus-visible {
        opacity: 1;
      }
      .nav-icon-btn:hover {
        background: rgba(0, 0, 0, 0.7);
      }

      /* Info bar: heads the timeline column (or sits under the preview), never on top of the picture,
         since camera recordings often burn their timestamp into the top of the frame. */
      .info-bar {
        flex: none;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 2px 12px;
        padding: 8px 6px 8px 14px;
        color: var(--gallery-text);
        background: var(--gallery-surface);
        border-bottom: 1px solid var(--gallery-divider);
      }
      .stage .info-bar {
        border-top: 1px solid var(--gallery-divider);
        border-bottom: 0;
      }
      .info-text {
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        align-items: baseline;
        gap: 10px;
        white-space: nowrap;
        overflow: hidden;
      }
      .info-title {
        flex: 0 1 auto;
        min-width: 0;
        font-size: 16px;
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info-caption {
        flex: 0 1 auto;
        min-width: 0;
        font-size: 15px;
        font-variant-numeric: tabular-nums;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info-title + .info-caption {
        font-size: 14px;
        color: var(--gallery-text-secondary);
      }
      .info-relative {
        flex: 0 1 auto;
        min-width: 0;
        font-size: 13px;
        color: var(--gallery-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .info-actions {
        flex: none;
        display: flex;
        align-items: center;
        gap: 2px;
      }
      .info-counter {
        margin-right: 6px;
        font-size: 13px;
        font-variant-numeric: tabular-nums;
        color: var(--gallery-text-secondary);
      }
      .viewer .info-relative,
      .viewer .info-counter {
        color: rgba(255, 255, 255, 0.7);
      }
      .icon-button ha-icon {
        --mdc-icon-size: 24px;
      }
      .spinning {
        animation: gallery-spin 0.9s linear infinite;
      }
      .icon-button {
        width: 40px;
        height: 40px;
        flex: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: transparent;
        color: inherit;
        cursor: pointer;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;
      }
      .icon-button:hover:not(:disabled) {
        background: rgba(127, 127, 127, 0.22);
      }
      .icon-button[aria-pressed="true"] {
        color: var(--gallery-accent);
      }
      .icon-button:disabled {
        cursor: default;
        opacity: 0.4;
      }
      .icon-button:focus-visible,
      .chip:focus-visible,
      .load-more:focus-visible,
      .empty-action:focus-visible,
      .strip-item:focus-visible {
        outline: 2px solid var(--gallery-accent);
        outline-offset: 2px;
      }

      /* Timeline */
      .timeline {
        container: gallery-menu / inline-size;
        flex: none;
        min-width: 0;
        min-height: 0;
        display: flex;
        flex-direction: column;
        background: var(--gallery-surface);
      }
      .date-chips {
        flex: none;
        display: flex;
        gap: 6px;
        padding: 12px;
        overflow-x: auto;
        scrollbar-width: none;
        border-bottom: 1px solid var(--gallery-divider);
      }
      .date-chips::-webkit-scrollbar {
        display: none;
      }
      .chip {
        position: relative;
        flex: none;
        height: 32px;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 0 12px;
        border: 1px solid var(--gallery-divider);
        border-radius: 16px;
        background: transparent;
        color: var(--gallery-text);
        font-size: 13px;
        white-space: nowrap;
        cursor: pointer;
        transition: background 0.15s ease, color 0.15s ease;
        -webkit-tap-highlight-color: transparent;
      }
      .chip:hover {
        background: var(--gallery-placeholder);
      }
      .chip.active {
        border-color: transparent;
        background: rgba(var(--gallery-accent-rgb), 0.16);
        color: var(--gallery-accent);
        font-weight: 500;
      }
      .chip-date ha-icon {
        --mdc-icon-size: 16px;
      }
      .chip-date:focus-within {
        outline: 2px solid var(--gallery-accent);
        outline-offset: 2px;
      }
      .date-picker {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        opacity: 0;
        cursor: pointer;
      }
      .error-list {
        flex: none;
        max-height: 112px;
        padding: 8px 12px;
        overflow-y: auto;
        border-bottom: 1px solid var(--gallery-divider);
      }
      .resource-menu {
        flex: 1 1 auto;
        min-height: 0;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        grid-auto-rows: max-content;
        align-content: start;
        gap: 12px 10px;
        padding: 12px 12px 16px;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-width: thin;
        scrollbar-color: rgba(127, 127, 127, 0.4) transparent;
      }
      /* Grouped lists start with a sticky day header, which must stick flush under the chips. */
      .resource-menu.grouped {
        padding-top: 0;
      }
      @container gallery-menu (min-width: 480px) {
        .resource-menu {
          grid-template-columns: repeat(3, minmax(0, 1fr));
        }
      }
      @container gallery-menu (min-width: 680px) {
        .resource-menu {
          grid-template-columns: repeat(4, minmax(0, 1fr));
        }
      }
      @container gallery-menu (min-width: 900px) {
        .resource-menu {
          grid-template-columns: repeat(5, minmax(0, 1fr));
        }
      }
      .day-header {
        grid-column: 1 / -1;
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px;
        margin: 0 -12px;
        padding: 12px 12px 4px;
        background: var(--gallery-surface);
        font-size: 14px;
        font-weight: 600;
      }
      .day-date::before {
        content: " · ";
      }
      .day-count {
        font-size: 12px;
        font-weight: 400;
        color: var(--gallery-text-secondary);
        font-variant-numeric: tabular-nums;
      }
      .thumb {
        margin: 0;
        min-width: 0;
        cursor: pointer;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        user-select: none;
      }
      .thumb-media {
        position: relative;
        aspect-ratio: var(--gallery-media-aspect, 16 / 9);
        overflow: hidden;
        border-radius: 8px;
        background: var(--gallery-placeholder);
        transition: box-shadow 0.15s ease;
      }
      .thumb-media img,
      .thumb-media video {
        object-fit: cover;
        transition: transform 0.3s ease, opacity 0.3s ease;
      }
      .thumb-media .lzy_img:not([src]),
      .thumb-media .lzy_video:not([src]) {
        opacity: 0;
      }
      @media (hover: hover) {
        .thumb:hover .thumb-media img,
        .thumb:hover .thumb-media video {
          transform: scale(1.05);
        }
      }
      .thumb.selected .thumb-media {
        box-shadow: 0 0 0 2px var(--gallery-surface), 0 0 0 4px var(--gallery-accent);
      }
      .thumb:focus-visible .thumb-media {
        box-shadow: 0 0 0 2px var(--gallery-surface), 0 0 0 4px var(--gallery-accent);
      }
      .thumb figcaption {
        margin-top: 6px;
        font-size: 12px;
        line-height: 1.3;
        color: var(--gallery-text-secondary);
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .thumb.selected figcaption {
        color: var(--gallery-accent);
        font-weight: 600;
      }
      .video-badge {
        position: absolute;
        right: 6px;
        bottom: 6px;
        display: inline-flex;
        align-items: center;
        gap: 2px;
        padding: 1px 6px 1px 3px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        font-size: 11px;
        line-height: 18px;
        font-variant-numeric: tabular-nums;
        pointer-events: none;
      }
      .video-badge ha-icon {
        --mdc-icon-size: 14px;
      }
      .new-dot {
        position: absolute;
        top: 6px;
        left: 6px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: var(--gallery-accent);
        box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.3);
      }
      .thumbnail-loading,
      .thumbnail-error,
      .video-placeholder,
      .skeleton-media {
        width: 100%;
        height: 100%;
      }
      .thumbnail-error,
      .video-placeholder {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2px;
        color: var(--gallery-text-secondary);
        font-size: 12px;
      }
      .skeleton-media {
        background: linear-gradient(90deg, var(--gallery-placeholder) 0%, rgba(127, 127, 127, 0.26) 45%, var(--gallery-placeholder) 90%);
        background-size: 220% 100%;
        animation: gallery-shimmer 1.2s ease-in-out infinite;
      }
      .resource-skeleton {
        pointer-events: none;
      }
      .skeleton-caption {
        width: 40%;
        height: 10px;
        margin-top: 8px;
        border-radius: 5px;
        background: var(--gallery-placeholder);
      }
      .menu-empty {
        grid-column: 1 / -1;
        padding: 32px 8px;
        color: var(--gallery-text-secondary);
        text-align: center;
        font-size: 14px;
      }
      .load-more {
        grid-column: 1 / -1;
        padding: 10px;
        border: 0;
        border-radius: 8px;
        background: var(--gallery-placeholder);
        color: var(--gallery-text-secondary);
        font-size: 13px;
        cursor: pointer;
      }
      .load-more:hover {
        color: var(--gallery-accent);
      }

      /* Wide layouts */
      .menu-responsive,
      .menu-right {
        flex-direction: row;
      }
      .menu-left {
        flex-direction: row-reverse;
      }
      .menu-top {
        flex-direction: column-reverse;
      }
      /* Side timeline: the preview takes the width its media needs at full height, and the timeline
         gets the rest (at least --gallery-card-sidebar-width), so the picture is never shrunk to make
         room for thumbnails while space is left over. */
      .menu-responsive .stage,
      .menu-right .stage,
      .menu-left .stage {
        flex: 0 1 auto;
        aspect-ratio: var(--gallery-media-aspect, 16 / 9);
      }
      .menu-responsive .timeline,
      .menu-right .timeline,
      .menu-left .timeline {
        flex: 1 0 var(--gallery-card-sidebar-width, 280px);
        min-width: var(--gallery-card-sidebar-width, 280px);
      }
      .menu-responsive .info-text,
      .menu-right .info-text,
      .menu-left .info-text {
        flex-basis: 100%;
      }
      .menu-responsive .info-actions,
      .menu-right .info-actions,
      .menu-left .info-actions {
        flex: 1 1 100%;
        margin-left: -8px;
      }
      .menu-responsive .info-counter,
      .menu-right .info-counter,
      .menu-left .info-counter {
        order: 1;
        margin-left: auto;
      }
      .menu-responsive .timeline,
      .menu-right .timeline {
        border-left: 1px solid var(--gallery-divider);
      }
      .menu-left .timeline {
        border-right: 1px solid var(--gallery-divider);
      }
      .menu-hidden .timeline {
        display: none;
      }
      /* Filmstrip layouts (top/bottom): info bar and date chips share one row above the strip. */
      .menu-top .timeline,
      .menu-bottom .timeline {
        display: grid;
        grid-template-columns: minmax(0, 1fr) auto;
      }
      .menu-top .timeline > :not(.info-bar):not(.date-chips),
      .menu-bottom .timeline > :not(.info-bar):not(.date-chips) {
        grid-column: 1 / -1;
      }
      .menu-top .resource-menu,
      .menu-bottom .resource-menu {
        flex: none;
        display: flex;
        gap: 10px;
        padding: 12px;
        overflow-x: auto;
        overflow-y: hidden;
      }
      .menu-top .thumb,
      .menu-bottom .thumb {
        flex: 0 0 var(--gallery-card-strip-item-width, 150px);
        margin-top: 0;
      }
      .menu-top .day-header,
      .menu-bottom .day-header {
        flex: none;
        position: sticky;
        top: auto;
        left: -12px;
        margin: 0;
        padding: 0 10px;
        align-self: stretch;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        /* Opaque: the tab stays pinned while thumbnails scroll underneath it. */
        background: linear-gradient(var(--gallery-placeholder), var(--gallery-placeholder)), var(--gallery-surface);
        box-shadow: 6px 0 8px -6px rgba(0, 0, 0, 0.3);
      }
      .menu-top .day-label,
      .menu-bottom .day-label {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        white-space: nowrap;
      }
      .menu-top .day-date,
      .menu-bottom .day-date {
        font-size: 11px;
        font-weight: 400;
        color: var(--gallery-text-secondary);
      }
      .menu-top .day-date::before,
      .menu-bottom .day-date::before {
        content: none;
      }
      .menu-top .day-count,
      .menu-bottom .day-count {
        display: none;
      }
      .menu-top .load-more,
      .menu-bottom .load-more {
        flex: none;
        padding: 0 16px;
        white-space: nowrap;
      }
      .menu-top .timeline,
      .menu-bottom .timeline {
        border-top: 1px solid var(--gallery-divider);
      }

      /* Card mode on wide layouts: the preview sets the height and the timeline matches it. */
      ha-card.height-auto .stage {
        flex: 1 1 auto;
        aspect-ratio: var(--gallery-media-aspect, 16 / 9);
        max-height: 80vh;
      }
      ha-card.height-auto.menu-responsive .timeline,
      ha-card.height-auto.menu-right .timeline,
      ha-card.height-auto.menu-left .timeline {
        flex: 0 0 var(--gallery-card-sidebar-width, 280px);
        contain: size;
      }

      /* Narrow cards (phones): preview on top, info bar under it, scrolling timeline below.
         ha-card[class] outranks the per-layout rules above without !important. */
      @container gallery-card (max-width: 599px) {
        ha-card[class] {
          flex-direction: column;
        }
        ha-card[class] .stage {
          flex: none;
          aspect-ratio: auto;
          max-height: none;
        }
        ha-card[class] .resource-viewer {
          flex: none;
          aspect-ratio: var(--gallery-media-aspect, 16 / 9);
          max-height: 50dvh;
        }
        /* One row on phones: the text gives way (ellipsis) instead of pushing the buttons to a second row. */
        ha-card[class] .info-text {
          flex: 1 1 0;
        }
        ha-card[class] .info-bar {
          flex-wrap: nowrap;
          gap: 8px;
          padding: 4px 4px 4px 14px;
        }
        ha-card[class] .icon-button {
          width: 36px;
          height: 36px;
        }
        ha-card[class] .info-actions {
          flex: none;
          margin-left: 0;
        }
        /* The highlighted thumbnail already shows the position; the capture time must never be cut. */
        ha-card[class] .info-counter {
          display: none;
        }
        ha-card[class] .info-caption {
          flex: none;
          font-size: 15px;
          color: var(--gallery-text);
        }
        ha-card[class] .timeline {
          display: flex;
          flex: 1 1 auto;
          width: 100%;
          min-width: 0;
          contain: none;
          border: 0;
        }
        ha-card[class] .resource-menu {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px 6px;
          padding: 10px 10px 16px;
          overflow-x: hidden;
          overflow-y: auto;
        }
        ha-card[class] .resource-menu.grouped {
          padding-top: 0;
        }
        ha-card[class] .thumb {
          flex: initial;
        }
        ha-card[class] .thumb-media {
          border-radius: 6px;
        }
        ha-card[class] .day-header {
          position: sticky;
          top: 0;
          left: auto;
          align-self: auto;
          margin: 0 -10px;
          padding: 12px 10px 4px;
          justify-content: space-between;
          align-items: baseline;
          border-radius: 0;
          background: var(--gallery-surface);
        }
        ha-card[class] .day-label {
          display: inline;
        }
        ha-card[class] .day-date {
          font-size: inherit;
          font-weight: inherit;
          color: inherit;
        }
        ha-card[class] .day-date::before {
          content: " · ";
        }
        ha-card[class] .day-count {
          display: inline;
        }
        ha-card[class] .load-more {
          padding: 10px;
        }
        /* On phones the current item's time matters more than the page title. */
        .info-text.has-caption .info-title {
          display: none;
        }
        .nav-icon-btn {
          opacity: 0.85;
          width: 36px;
          height: 36px;
        }
        .date-chips {
          padding: 10px;
        }
        ha-card.height-auto .timeline {
          flex: none;
        }
        ha-card.menu-hidden[class]:not(.height-auto) .stage,
        ha-card.menu-hidden[class]:not(.height-auto) .resource-viewer {
          flex: 1 1 auto;
          max-height: none;
          aspect-ratio: auto;
        }
        ha-card.height-auto .resource-menu {
          overflow: visible;
        }
      }
      @container gallery-card (max-width: 320px) {
        ha-card[class] .resource-menu {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      @media (hover: none) {
        /* Touch screens have no hover to reveal the arrows. */
        .resource-viewer .nav-icon-btn {
          opacity: 0.85;
        }
      }

      /* Full-screen viewer */
      .viewer {
        inset: 0;
        width: 100%;
        height: 100%;
        max-width: none;
        max-height: none;
        margin: 0;
        padding: 0;
        border: 0;
        overflow: hidden;
        overscroll-behavior: contain;
        background: #000;
        color: #fff;
      }
      .viewer[open] {
        display: flex;
        flex-direction: column;
        animation: gallery-fade-in 0.2s ease;
      }
      .viewer::backdrop {
        background: #000;
      }
      .viewer-top {
        flex: none;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: max(6px, env(safe-area-inset-top)) max(8px, env(safe-area-inset-right)) 6px max(8px, env(safe-area-inset-left));
      }
      .viewer-title {
        flex: 1 1 auto;
        min-width: 0;
        display: flex;
        align-items: baseline;
        gap: 10px;
        white-space: nowrap;
        overflow: hidden;
      }
      .viewer-stage {
        position: relative;
        flex: 1 1 auto;
        min-height: 0;
        overflow: hidden;
        touch-action: none;
        user-select: none;
      }
      .zoom-layer {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transform-origin: center;
        transition: transform 0.2s ease;
      }
      .gesturing .zoom-layer {
        transition: none;
      }
      .viewer-media {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
        animation: gallery-zoom-in 0.25s ease;
      }
      hui-image.viewer-media {
        width: 100%;
        height: 100%;
      }
      .viewer-strip {
        flex: none;
        display: flex;
        gap: 6px;
        justify-content: safe center;
        padding: 10px max(12px, env(safe-area-inset-right)) max(12px, env(safe-area-inset-bottom)) max(12px, env(safe-area-inset-left));
        overflow-x: auto;
        scrollbar-width: none;
      }
      .viewer-strip::-webkit-scrollbar {
        display: none;
      }
      .strip-item {
        position: relative;
        flex: none;
        height: 44px;
        aspect-ratio: var(--gallery-media-aspect, 16 / 9);
        padding: 0;
        border: 0;
        border-radius: 6px;
        overflow: hidden;
        background: #222;
        opacity: 0.45;
        cursor: pointer;
        transition: opacity 0.15s ease, transform 0.15s ease;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        user-select: none;
      }
      /* Drawn above the media: an inset shadow on the button would be hidden under the image. */
      .strip-item::after {
        content: "";
        position: absolute;
        inset: 0;
        border: 2px solid transparent;
        border-radius: inherit;
        pointer-events: none;
      }
      .strip-item:hover {
        opacity: 0.8;
      }
      .strip-item.selected {
        opacity: 1;
        transform: scale(1.08);
      }
      .strip-item.selected::after {
        border-color: #fff;
      }
      .strip-day {
        flex: none;
        align-self: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 44px;
        padding: 0 2px 0 8px;
        border-left: 1px solid rgba(255, 255, 255, 0.28);
        color: rgba(255, 255, 255, 0.85);
        font-size: 11px;
        line-height: 1.35;
        white-space: nowrap;
      }
      .strip-day:first-child {
        padding-left: 0;
        border-left: 0;
      }
      .strip-day-date {
        color: rgba(255, 255, 255, 0.55);
        font-variant-numeric: tabular-nums;
      }
      .strip-tooltip {
        position: absolute;
        z-index: 3;
        transform: translate(-50%, -100%);
        padding: 4px 10px;
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.92);
        color: #111;
        font-size: 12px;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
        pointer-events: none;
      }
      .strip-tooltip[hidden] {
        display: none;
      }
      .strip-item img,
      .strip-item video {
        object-fit: cover;
      }
      .strip-item .thumbnail-error,
      .strip-item .video-placeholder {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0;
      }
      @media (hover: none) {
        .viewer .viewer-nav {
          display: none;
        }
      }

      @keyframes gallery-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes gallery-zoom-in {
        from { transform: scale(0.96); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes gallery-spin {
        to { transform: rotate(360deg); }
      }
      @keyframes gallery-shimmer {
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
    `}}customElements.get("gallery-card")||(customElements.define("gallery-card",Ce),console.groupCollapsed("%cGALLERY-CARD 2026.0.1 IS INSTALLED","color: green; font-weight: bold"),console.log("Readme:","https://github.com/fange173/gallery-card-2026"),console.groupEnd(),window.customCards=window.customCards||[],window.customCards.push({type:"gallery-card",name:"Gallery Card 2026",preview:!1,description:"Gallery Card 2026 displays images and videos from media sources, file-list sensors, and camera entities.",documentationURL:"https://github.com/fange173/gallery-card-2026"}));
