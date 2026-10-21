const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class s{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=r.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(i,e))}return e}toString(){return this.cssText}}const o=(e,...t)=>{const r=1===e.length?e[0]:t.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new s(r,e,i)},n=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;var a;const l=window,d=l.trustedTypes,c=d?d.emptyScript:"",h=l.reactiveElementPolyfillSupport,u={toAttribute(e,t){switch(t){case Boolean:e=e?c:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},m=(e,t)=>t!==e&&(t==t||e==e),p={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:m},f="finalized";class g extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Ep(i,t);void 0!==r&&(this._$Ev.set(r,i),e.push(r))})),e}static createProperty(e,t=p){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||p}static finalize(){if(this.hasOwnProperty(f))return!1;this[f]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(n(e))}else void 0!==e&&t.push(n(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var i;const r=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{t?i.adoptedStyleSheets=r.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):r.forEach((t=>{const r=document.createElement("style"),s=e.litNonce;void 0!==s&&r.setAttribute("nonce",s),r.textContent=t.cssText,i.appendChild(r)}))})(r,this.constructor.elementStyles),r}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=p){var r;const s=this.constructor._$Ep(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:u).toAttribute(t,i.type);this._$El=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$El=null}}_$AK(e,t){var i;const r=this.constructor,s=r._$Ev.get(e);if(void 0!==s&&this._$El!==s){const e=r.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:u;this._$El=s,this[s]=o.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||m)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var v;g[f]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:g}),(null!==(a=l.reactiveElementVersions)&&void 0!==a?a:l.reactiveElementVersions=[]).push("1.6.3");const _=window,y=_.trustedTypes,b=y?y.createPolicy("lit-html",{createHTML:e=>e}):void 0,$="$lit$",w=`lit$${(Math.random()+"").slice(9)}$`,x="?"+w,A=`<${x}>`,M=document,S=()=>M.createComment(""),C=e=>null===e||"object"!=typeof e&&"function"!=typeof e,R=Array.isArray,I=e=>R(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),E="[ \t\n\f\r]",D=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,k=/-->/g,T=/>/g,N=RegExp(`>|${E}(?:([^\\s"'>=/]+)(${E}*=${E}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,O=/"/g,P=/^(?:script|style|textarea|title)$/i,Y=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),H=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),z=new WeakMap,F=M.createTreeWalker(M,129,null,!1);function B(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(t):t}const j=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":"",n=D;for(let a=0;a<i;a++){const t=e[a];let i,l,d=-1,c=0;for(;c<t.length&&(n.lastIndex=c,l=n.exec(t),null!==l);)c=n.lastIndex,n===D?"!--"===l[1]?n=k:void 0!==l[1]?n=T:void 0!==l[2]?(P.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=N):void 0!==l[3]&&(n=N):n===N?">"===l[0]?(n=null!=s?s:D,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,i=l[1],n=void 0===l[3]?N:'"'===l[3]?O:L):n===O||n===L?n=N:n===k||n===T?n=D:(n=N,s=void 0);const h=n===N&&e[a+1].startsWith("/>")?" ":"";o+=n===D?t+A:d>=0?(r.push(i),t.slice(0,d)+$+t.slice(d)+w+h):t+w+(-2===d?(r.push(void 0),a):h)}return[B(e,o+(e[i]||"<?>")+(2===t?"</svg>":"")),r]};class V{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[l,d]=j(e,t);if(this.el=V.createElement(l,i),F.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=F.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith($)||t.startsWith(w)){const i=d[o++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+$).split(w),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?Z:"?"===t[1]?X:"@"===t[1]?Q:G})}else a.push({type:6,index:s})}for(const t of e)r.removeAttribute(t)}if(P.test(r.tagName)){const e=r.textContent.split(w),t=e.length-1;if(t>0){r.textContent=y?y.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],S()),F.nextNode(),a.push({type:2,index:++s});r.append(e[t],S())}}}else if(8===r.nodeType)if(r.data===x)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(w,e+1));)a.push({type:7,index:s}),e+=w.length-1}s++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function W(e,t,i=e,r){var s,o,n,a;if(t===H)return t;let l=void 0!==r?null===(s=i._$Co)||void 0===s?void 0:s[r]:i._$Cl;const d=C(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,r)),void 0!==r?(null!==(n=(a=i)._$Co)&&void 0!==n?n:a._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(t=W(e,l._$AS(e,t.values),l,r)),t}class q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:r}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:M).importNode(i,!0);F.currentNode=s;let o=F.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new K(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new ee(o,this,e)),this._$AV.push(t),l=r[++a]}n!==(null==l?void 0:l.index)&&(o=F.nextNode(),n++)}return F.currentNode=M,s}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class K{constructor(e,t,i,r){var s;this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cp=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),C(e)?e===U||null==e||""===e?(this._$AH!==U&&this._$AR(),this._$AH=U):e!==this._$AH&&e!==H&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):I(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==U&&C(this._$AH)?this._$AA.nextSibling.data=e:this.$(M.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:r}=e,s="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=V.createElement(B(r.h,r.h[0]),this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.v(i);else{const e=new q(s,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=z.get(e.strings);return void 0===t&&z.set(e.strings,t=new V(e)),t}T(e){R(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new K(this.k(S()),this.k(S()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class G{constructor(e,t,i,r,s){this.type=1,this._$AH=U,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=U}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=W(this,e,t,0),o=!C(e)||e!==this._$AH&&e!==H,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=W(this,r[i+n],t,n),a===H&&(a=this._$AH[n]),o||(o=!C(a)||a!==this._$AH[n]),a===U?e=U:e!==U&&(e+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.j(e)}j(e){e===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Z extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===U?void 0:e}}const J=y?y.emptyScript:"";class X extends G{constructor(){super(...arguments),this.type=4}j(e){e&&e!==U?this.element.setAttribute(this.name,J):this.element.removeAttribute(this.name)}}class Q extends G{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=W(this,e,t,0))&&void 0!==i?i:U)===H)return;const r=this._$AH,s=e===U&&r!==U||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==U&&(r===U||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ee{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}}const te={O:$,P:w,A:x,C:1,M:j,L:q,R:I,D:W,I:K,V:G,H:X,N:Q,U:Z,F:ee},ie=_.litHtmlPolyfillSupport;null==ie||ie(V,K),(null!==(v=_.litHtmlVersions)&&void 0!==v?v:_.litHtmlVersions=[]).push("2.8.0");var re,se;class oe extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var r,s;const o=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new K(t.insertBefore(S(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return H}}oe.finalized=!0,oe._$litElement$=!0,null===(re=globalThis.litElementHydrateSupport)||void 0===re||re.call(globalThis,{LitElement:oe});const ne=globalThis.litElementPolyfillSupport;var ae;null==ne||ne({LitElement:oe}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.3.3"),null===(ae=window.HTMLSlotElement)||void 0===ae||ae.prototype.assignedElements,console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");const le=2;class de{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:ce}=te,he=()=>document.createComment(""),ue=(e,t,i)=>{var r;const s=e._$AA.parentNode,o=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=s.insertBefore(he(),o),r=s.insertBefore(he(),o);i=new ce(t,r,e,e.options)}else{const t=i._$AB.nextSibling,n=i._$AM,a=n!==e;if(a){let t;null===(r=i._$AQ)||void 0===r||r.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==n._$AU&&i._$AP(t)}if(t!==o||a){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;s.insertBefore(e,o),e=t}}}return i},me=(e,t,i=e)=>(e._$AI(t,i),e),pe={},fe=(e,t=pe)=>e._$AH=t,ge=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const r=e._$AB.nextSibling;for(;i!==r;){const e=i.nextSibling;i.remove(),i=e}},ve=(e,t,i)=>{const r=new Map;for(let s=t;s<=i;s++)r.set(e[s],s);return r},_e=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends de{constructor(e){if(super(e),e.type!==le)throw Error("repeat() can only be used in text expressions")}ct(e,t,i){let r;void 0===i?i=t:void 0!==t&&(r=t);const s=[],o=[];let n=0;for(const a of e)s[n]=r?r(a,n):n,o[n]=i(a,n),n++;return{values:o,keys:s}}render(e,t,i){return this.ct(e,t,i).values}update(e,[t,i,r]){var s;const o=(e=>e._$AH)(e),{values:n,keys:a}=this.ct(t,i,r);if(!Array.isArray(o))return this.ut=a,n;const l=null!==(s=this.ut)&&void 0!==s?s:this.ut=[],d=[];let c,h,u=0,m=o.length-1,p=0,f=n.length-1;for(;u<=m&&p<=f;)if(null===o[u])u++;else if(null===o[m])m--;else if(l[u]===a[p])d[p]=me(o[u],n[p]),u++,p++;else if(l[m]===a[f])d[f]=me(o[m],n[f]),m--,f--;else if(l[u]===a[f])d[f]=me(o[u],n[f]),ue(e,d[f+1],o[u]),u++,f--;else if(l[m]===a[p])d[p]=me(o[m],n[p]),ue(e,o[u],o[m]),m--,p++;else if(void 0===c&&(c=ve(a,p,f),h=ve(l,u,m)),c.has(l[u]))if(c.has(l[m])){const t=h.get(a[p]),i=void 0!==t?o[t]:null;if(null===i){const t=ue(e,o[u]);me(t,n[p]),d[p]=t}else d[p]=me(i,n[p]),ue(e,o[u],i),o[t]=null;p++}else ge(o[m]),m--;else ge(o[u]),u++;for(;p<=f;){const t=ue(e,d[f+1]);me(t,n[p]),d[p++]=t}for(;u<=m;){const e=o[u++];null!==e&&ge(e)}return this.ut=a,fe(e,d),H}});"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function ye(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var be={exports:{}};be.exports=function(){var e=1e3,t=6e4,i=36e5,r="millisecond",s="second",o="minute",n="hour",a="day",l="week",d="month",c="quarter",h="year",u="date",m="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,g={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},v=function(e,t,i){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(i)+e},_={s:v,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),r=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+v(r,2,"0")+":"+v(s,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var r=12*(i.year()-t.year())+(i.month()-t.month()),s=t.clone().add(r,d),o=i-s<0,n=t.clone().add(r+(o?-1:1),d);return+(-(r+(i-s)/(o?s-n:n-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:d,y:h,w:l,d:a,D:u,h:n,m:o,s:s,ms:r,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=g;var $="$isDayjsObject",w=function(e){return e instanceof S||!(!e||!e[$])},x=function e(t,i,r){var s;if(!t)return y;if("string"==typeof t){var o=t.toLowerCase();b[o]&&(s=o),i&&(b[o]=i,s=o);var n=t.split("-");if(!s&&n.length>1)return e(n[0])}else{var a=t.name;b[a]=t,s=a}return!r&&s&&(y=s),s||!r&&y},A=function(e,t){if(w(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new S(i)},M=_;M.l=x,M.i=w,M.w=function(e,t){return A(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var S=function(){function g(e){this.$L=x(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[$]=!0}var v=g.prototype;return v.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(p);if(r){var s=r[2]-1||0,o=(r[7]||"0").substring(0,3);return i?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(t)}(e),this.init()},v.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},v.$utils=function(){return M},v.isValid=function(){return!(this.$d.toString()===m)},v.isSame=function(e,t){var i=A(e);return this.startOf(t)<=i&&i<=this.endOf(t)},v.isAfter=function(e,t){return A(e)<this.startOf(t)},v.isBefore=function(e,t){return this.endOf(t)<A(e)},v.$g=function(e,t,i){return M.u(e)?this[t]:this.set(i,e)},v.unix=function(){return Math.floor(this.valueOf()/1e3)},v.valueOf=function(){return this.$d.getTime()},v.startOf=function(e,t){var i=this,r=!!M.u(t)||t,c=M.p(e),m=function(e,t){var s=M.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return r?s:s.endOf(a)},p=function(e,t){return M.w(i.toDate()[e].apply(i.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},f=this.$W,g=this.$M,v=this.$D,_="set"+(this.$u?"UTC":"");switch(c){case h:return r?m(1,0):m(31,11);case d:return r?m(1,g):m(0,g+1);case l:var y=this.$locale().weekStart||0,b=(f<y?f+7:f)-y;return m(r?v-b:v+(6-b),g);case a:case u:return p(_+"Hours",0);case n:return p(_+"Minutes",1);case o:return p(_+"Seconds",2);case s:return p(_+"Milliseconds",3);default:return this.clone()}},v.endOf=function(e){return this.startOf(e,!1)},v.$set=function(e,t){var i,l=M.p(e),c="set"+(this.$u?"UTC":""),m=(i={},i[a]=c+"Date",i[u]=c+"Date",i[d]=c+"Month",i[h]=c+"FullYear",i[n]=c+"Hours",i[o]=c+"Minutes",i[s]=c+"Seconds",i[r]=c+"Milliseconds",i)[l],p=l===a?this.$D+(t-this.$W):t;if(l===d||l===h){var f=this.clone().set(u,1);f.$d[m](p),f.init(),this.$d=f.set(u,Math.min(this.$D,f.daysInMonth())).$d}else m&&this.$d[m](p);return this.init(),this},v.set=function(e,t){return this.clone().$set(e,t)},v.get=function(e){return this[M.p(e)]()},v.add=function(r,c){var u,m=this;r=Number(r);var p=M.p(c),f=function(e){var t=A(m);return M.w(t.date(t.date()+Math.round(e*r)),m)};if(p===d)return this.set(d,this.$M+r);if(p===h)return this.set(h,this.$y+r);if(p===a)return f(1);if(p===l)return f(7);var g=(u={},u[o]=t,u[n]=i,u[s]=e,u)[p]||1,v=this.$d.getTime()+r*g;return M.w(v,this)},v.subtract=function(e,t){return this.add(-1*e,t)},v.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||m;var r=e||"YYYY-MM-DDTHH:mm:ssZ",s=M.z(this),o=this.$H,n=this.$m,a=this.$M,l=i.weekdays,d=i.months,c=i.meridiem,h=function(e,i,s,o){return e&&(e[i]||e(t,r))||s[i].slice(0,o)},u=function(e){return M.s(o%12||12,e,"0")},p=c||function(e,t,i){var r=e<12?"AM":"PM";return i?r.toLowerCase():r};return r.replace(f,(function(e,r){return r||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return M.s(t.$y,4,"0");case"M":return a+1;case"MM":return M.s(a+1,2,"0");case"MMM":return h(i.monthsShort,a,d,3);case"MMMM":return h(d,a);case"D":return t.$D;case"DD":return M.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return h(i.weekdaysMin,t.$W,l,2);case"ddd":return h(i.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(o);case"HH":return M.s(o,2,"0");case"h":return u(1);case"hh":return u(2);case"a":return p(o,n,!0);case"A":return p(o,n,!1);case"m":return String(n);case"mm":return M.s(n,2,"0");case"s":return String(t.$s);case"ss":return M.s(t.$s,2,"0");case"SSS":return M.s(t.$ms,3,"0");case"Z":return s}return null}(e)||s.replace(":","")}))},v.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},v.diff=function(r,u,m){var p,f=this,g=M.p(u),v=A(r),_=(v.utcOffset()-this.utcOffset())*t,y=this-v,b=function(){return M.m(f,v)};switch(g){case h:p=b()/12;break;case d:p=b();break;case c:p=b()/3;break;case l:p=(y-_)/6048e5;break;case a:p=(y-_)/864e5;break;case n:p=y/i;break;case o:p=y/t;break;case s:p=y/e;break;default:p=y}return m?p:M.a(p)},v.daysInMonth=function(){return this.endOf(d).$D},v.$locale=function(){return b[this.$L]},v.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),r=x(e,t,!0);return r&&(i.$L=r),i},v.clone=function(){return M.w(this.$d,this)},v.toDate=function(){return new Date(this.valueOf())},v.toJSON=function(){return this.isValid()?this.toISOString():null},v.toISOString=function(){return this.$d.toISOString()},v.toString=function(){return this.$d.toUTCString()},g}(),C=S.prototype;return A.prototype=C,[["$ms",r],["$s",s],["$m",o],["$H",n],["$W",a],["$M",d],["$y",h],["$D",u]].forEach((function(e){C[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),A.extend=function(e,t){return e.$i||(e(t,S,A),e.$i=!0),A},A.locale=x,A.isDayjs=w,A.unix=function(e){return A(1e3*e)},A.en=b[y],A.Ls=b,A.p={},A}();var $e=ye(be.exports),we={exports:{}};we.exports=function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,i=/\d\d/,r=/\d\d?/,s=/\d*[^-_:/,()\s\d]+/,o={},n=function(e){return(e=+e)+(e>68?1900:2e3)},a=function(e){return function(t){this[e]=+t}},l=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),i=60*t[1]+(+t[2]||0);return 0===i?0:"+"===t[0]?-i:i}(e)}],d=function(e){var t=o[e];return t&&(t.indexOf?t:t.s.concat(t.f))},c=function(e,t){var i,r=o.meridiem;if(r){for(var s=1;s<=24;s+=1)if(e.indexOf(r(s,0,t))>-1){i=s>12;break}}else i=e===(t?"pm":"PM");return i},h={A:[s,function(e){this.afternoon=c(e,!1)}],a:[s,function(e){this.afternoon=c(e,!0)}],S:[/\d/,function(e){this.milliseconds=100*+e}],SS:[i,function(e){this.milliseconds=10*+e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[i,a("day")],Do:[s,function(e){var t=o.ordinal,i=e.match(/\d+/);if(this.day=i[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r)}],M:[r,a("month")],MM:[i,a("month")],MMM:[s,function(e){var t=d("months"),i=(d("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(i<1)throw new Error;this.month=i%12||i}],MMMM:[s,function(e){var t=d("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[/[+-]?\d+/,a("year")],YY:[i,function(e){this.year=n(e)}],YYYY:[/\d{4}/,a("year")],Z:l,ZZ:l};function u(i){var r,s;r=i,s=o&&o.formats;for(var n=(i=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,i,r){var o=r&&r.toUpperCase();return i||s[r]||e[r]||s[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,i){return t||i.slice(1)}))}))).match(t),a=n.length,l=0;l<a;l+=1){var d=n[l],c=h[d],u=c&&c[0],m=c&&c[1];n[l]=m?{regex:u,parser:m}:d.replace(/^\[|\]$/g,"")}return function(e){for(var t={},i=0,r=0;i<a;i+=1){var s=n[i];if("string"==typeof s)r+=s.length;else{var o=s.regex,l=s.parser,d=e.slice(r),c=o.exec(d)[0];l.call(t,c),e=e.replace(c,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var i=e.hours;t?i<12&&(e.hours+=12):12===i&&(e.hours=0),delete e.afternoon}}(t),t}}return function(e,t,i){i.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(n=e.parseTwoDigitYear);var r=t.prototype,s=r.parse;r.parse=function(e){var t=e.date,r=e.utc,n=e.args;this.$u=r;var a=n[1];if("string"==typeof a){var l=!0===n[2],d=!0===n[3],c=l||d,h=n[2];d&&(h=n[2]),o=this.$locale(),!l&&h&&(o=i.Ls[h]),this.$d=function(e,t,i){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var r=u(t)(e),s=r.year,o=r.month,n=r.day,a=r.hours,l=r.minutes,d=r.seconds,c=r.milliseconds,h=r.zone,m=new Date,p=n||(s||o?1:m.getDate()),f=s||m.getFullYear(),g=0;s&&!o||(g=o>0?o-1:m.getMonth());var v=a||0,_=l||0,y=d||0,b=c||0;return h?new Date(Date.UTC(f,g,p,v,_,y,b+60*h.offset*1e3)):i?new Date(Date.UTC(f,g,p,v,_,y,b)):new Date(f,g,p,v,_,y,b)}catch(e){return new Date("")}}(t,a,r),this.init(),h&&!0!==h&&(this.$L=this.locale(h).$L),c&&t!=this.format(a)&&(this.$d=new Date("")),o={}}else if(a instanceof Array)for(var m=a.length,p=1;p<=m;p+=1){n[1]=a[p-1];var f=i.apply(this,n);if(f.isValid()){this.$d=f.$d,this.$L=f.$L,this.init();break}p===m&&(this.$d=new Date(""))}else s.call(this,e)}}}();var xe=ye(we.exports),Ae={exports:{}};Ae.exports=function(e,t,i){e=e||{};var r=t.prototype,s={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function o(e,t,i,s){return r.fromToBase(e,t,i,s)}i.en.relativeTime=s,r.fromToBase=function(t,r,o,n,a){for(var l,d,c,h=o.$locale().relativeTime||s,u=e.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=u.length,p=0;p<m;p+=1){var f=u[p];f.d&&(l=n?i(t).diff(o,f.d,!0):o.diff(t,f.d,!0));var g=(e.rounding||Math.round)(Math.abs(l));if(c=l>0,g<=f.r||!f.r){g<=1&&p>0&&(f=u[p-1]);var v=h[f.l];a&&(g=a(""+g)),d="string"==typeof v?v.replace("%d",g):v(g,r,f.l,c);break}}if(r)return d;var _=c?h.future:h.past;return"function"==typeof _?_(d):_.replace("%s",d)},r.to=function(e,t){return o(e,t,this,!0)},r.from=function(e,t){return o(e,t,this)};var n=function(e){return e.$u?i.utc():i()};r.toNow=function(e){return this.to(n(this),e)},r.fromNow=function(e){return this.from(n(this),e)}};var Me=ye(Ae.exports);const Se=new Set(["responsive","right","left","bottom","top","hidden"]);$e.extend(xe),$e.extend(Me);class Ce extends oe{static get properties(){return{config:{},resources:{type:Array},currentResourceIndex:{type:Number},selectedDate:{type:Object},_itemsToShow:{type:Number},_isDateFiltered:{type:Boolean},_isLoading:{type:Boolean},_isModalOpen:{type:Boolean},_previewErrorIndex:{type:Number},errors:{type:Array}}}constructor(){super(),this.resources=void 0,this.currentResourceIndex=0,this._itemsToShow=10,this.selectedDate=null,this._isDateFiltered=!1,this._isLoading=!1,this._isModalOpen=!1,this._previewErrorIndex=void 0,this.errors=[],this._hasKeyNavigationListener=!1,this._keyNavigationHandler=e=>this._keyNavigation(e),this._touchStartListener={handleEvent:e=>this._handleTouchStart(e),passive:!0},this._touchMoveListener=e=>this._handleTouchMove(e),this._mediaResolveCache=new Map,this._mediaResolveInflight=new Map,this._queuedResolveIds=new Map,this._mediaResolveCacheMs=9e6,this._mediaBrowseCache=new Map,this._mediaBrowseInflight=new Map,this._browseCacheGeneration=0,this._loadToken=0,this._pendingLoadRequested=!1,this._slideshowTimer=void 0,this._cameraEntityIds=[]}render(){if(!this.config)return Y``;const e=(this.config.menu_alignment||"responsive").toLowerCase(),t=this.resources||[],i=t.length>0,r=this.errors.length>0,s=Boolean(this.config.title||this.config.enable_date_search||this.config.show_reload),o=i?this._currentResource():void 0,n=o&&(o.resolveError||this._previewErrorIndex===this.currentResourceIndex),a=this.config.show_reload?"媒体加载失败，请点击刷新后重试":"媒体加载失败，请检查媒体来源",l=r?a:this._isDateFiltered?"所选日期没有图片或视频":"没有可显示的图片或视频",d=Boolean(this.config.enable_date_search),c=d?"card-header-actions has-date":"card-header-actions";return Y`
      <ha-card class="menu-${e}">
        <div class="resource-viewer" @touchstart=${this._touchStartListener} @touchmove=${this._touchMoveListener}>
          <figure>
            ${this._isLoading?this._renderLoadingState("正在加载媒体..."):i?n?this._renderErrorState(a):o.pendingAuth?this._renderLoadingState("正在加载预览..."):o.isHass?Y`
                  <hui-image @click="${e=>this._popupCamera(e)}"
                                      .hass=${this._hass}
                                      .cameraImage=${o.name}
                                      .cameraView=${"live"}
                                      .fitMode=${"contain"}
                                    ></hui-image>
                `:this._isImageResource(o)?Y`<img class="preview-image" @click="${()=>this._popupImage()}" @error="${()=>this._handlePreviewError()}" src="${o.url}" alt="${o.caption||o.name}"/>`:Y`<video controls ?loop=${this.config.video_loop} ?autoplay=${this.config.video_autoplay&&!this._isModalOpen} .muted=${Boolean(this.config.video_muted)} src="${o.url}#t=0.1" @error="${()=>this._handlePreviewError()}" @loadedmetadata="${e=>this._videoMetadataLoaded(e)}" @canplay="${e=>this._startVideo(e)}"
                            @ended="${()=>this._videoHasEnded()}" preload="metadata" playsinline webkit-playsinline></video>`:this._renderEmptyState(l)}
          </figure>
          ${!this._isLoading&&t.length>1?Y`<div class="viewer-nav">
            <button type="button" class="nav-icon-btn nav-left" @click="${()=>this._selectResource(this.currentResourceIndex-1)}" aria-label="上一个" title="上一个">
              <ha-icon icon="mdi:chevron-left"></ha-icon>
            </button>
            <button type="button" class="nav-icon-btn nav-right" @click="${()=>this._selectResource(this.currentResourceIndex+1)}" aria-label="下一个" title="下一个">
              <ha-icon icon="mdi:chevron-right"></ha-icon>
            </button>
          </div>
          <div class="viewer-counter" aria-hidden="true">${this.currentResourceIndex+1} / ${t.length}</div>`:Y``}
        </div>
        <div class="resource-menu-container">
          ${s?Y`
            <div class="${c}">
              ${this.config.title?Y`<div class="header-leading">
                <div class="card-title" title="${this.config.title}">${this.config.title}</div>
              </div>`:Y``}
              ${d?Y`<div class="date-filter-container">
                <input type="date" class="date-picker" aria-label="按日期筛选" @change="${this._handleDateChange}" .value="${this._formatDateForInput(this.selectedDate)}">
              </div>`:Y``}
              <div class="header-trailing">
                ${d?Y`<button type="button" class="action-text btn-clear-date" @click="${this._clearDateFilter}" style="visibility: ${this._isDateFiltered?"visible":"hidden"};">清除</button>`:Y``}
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
            ${this._isLoading?this._renderMenuLoadingState():i?_e(t.slice(0,this._itemsToShow),((e,t)=>`${t}:${this._getResourceKey(e)}`),((e,t)=>this._renderThumbnail(e,t))):Y`<div class="menu-empty">暂无媒体</div>`}
            ${!this._isLoading&&this._itemsToShow<t.length?Y`<button type="button" class="load-more" @click="${this._loadMore}">更多 (${t.length-this._itemsToShow})</button>`:Y``}
          </div>
        </div>
        <dialog class="modal" @click="${this._handleModalClick}" @close="${this._handleModalClosed}" @touchstart=${this._touchStartListener} @touchmove=${this._touchMoveListener}>
          <button type="button" class="modal-close" @click="${this._closeImageModal}" aria-label="关闭预览" title="关闭预览"><ha-icon icon="mdi:close"></ha-icon></button>
          ${this._isModalOpen&&o?this._renderModalContent(o):Y``}
        </dialog>
      </ha-card>
    `}_renderThumbnail(e,t){const i=e.caption||e.name||`媒体 ${t+1}`,r=t===this.currentResourceIndex,s=!e.isHass&&!this._isImageResource(e),o=s&&(this.config.show_duration??!0);let n;return n=e.pendingAuth?Y`<div class="thumbnail-loading" data-resource-index="${t}">
        <div class="skeleton-media"></div>
      </div>`:e.resolveError||e.thumbnailError?Y`<div class="thumbnail-error">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>加载失败</span>
      </div>`:e.isHass?Y`<hui-image
        .hass=${this._hass}
        .cameraImage=${e.name}
        .cameraView=${"auto"}
        .fitMode=${"cover"}
      ></hui-image>`:s?this.config.video_preload??1?Y`<video class="lzy_video" preload="metadata" data-src="${e.url}#t=${void 0===this.config.preview_video_at?.1:this.config.preview_video_at}" @error="${()=>this._handleThumbnailError(e)}" @loadedmetadata="${e=>this._videoMetadataLoaded(e)}" muted playsinline></video>`:Y`<div class="video-placeholder"><ha-icon class="play-icon" icon="mdi:movie-play-outline"></ha-icon></div>`:Y`<img class="lzy_img" data-src="${e.url}" @error="${()=>this._handleThumbnailError(e)}" alt="${i}" decoding="async" draggable="false"/>`,Y`
      <figure id="resource${t}" @click="${()=>this._selectResource(t)}" @keydown="${e=>this._handleResourceKeydown(e,t)}" class="${r?"selected":""}" tabindex="0" role="button" aria-current="${r?"true":"false"}" aria-label="${i}">
        ${n}
        ${o?Y`<span class="duration"></span>`:Y``}
        ${e.caption?Y`<figcaption>${e.caption}</figcaption>`:Y``}
      </figure>
    `}_renderModalContent(e){let t;return t=e.pendingAuth?this._renderLoadingState("正在加载预览..."):e.resolveError?this._renderErrorState("媒体加载失败"):e.isHass?Y`<hui-image class="modal-media" .hass=${this._hass} .cameraImage=${e.name} .cameraView=${"auto"} .fitMode=${"contain"}></hui-image>`:this._isImageResource(e)?Y`<img class="modal-media" src="${e.url}" alt="${e.caption||e.name}">`:Y`<video class="modal-media" controls autoplay .muted=${Boolean(this.config.video_muted)} ?loop=${this.config.video_loop} src="${e.url}" playsinline webkit-playsinline></video>`,Y`
      ${t}
      ${e.caption?Y`<div class="modal-caption">${e.caption}</div>`:Y``}
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
    `))}connectedCallback(){super.connectedCallback(),this._createImageObserver(),void 0!==this.resources&&this._addKeyNavigationListener(),this.config&&this._doSlideShow(!0),this.requestUpdate()}updated(){this._createImageObserver();const e=this.shadowRoot.querySelectorAll("img.lzy_img[data-src], video.lzy_video[data-src], .thumbnail-loading[data-resource-index]");for(const t of e)this.imageObserver.observe(t)}_createImageObserver(){this.imageObserver||(this.imageObserver=new IntersectionObserver((e=>{const t=[];for(const i of e)if(i.isIntersecting){const e=i.target;if(void 0!==e.dataset.resourceIndex){const i=Number.parseInt(e.dataset.resourceIndex),r=this.resources?.[i];r?.pendingAuth&&r.mediaContentId&&t.push(r)}else e.dataset.src&&(e.src=e.dataset.src,"VIDEO"===e.tagName&&e.load(),delete e.dataset.src);this.imageObserver.unobserve(e)}if(t.length>0){const e=new Map(t.map((e=>[e.mediaContentId,e])));this._resolvePendingResourceBatch([...e.values()],this._hass,this._loadToken)}})))}setConfig(e){if(!e||!e.entity&&!e.entities)throw new Error("Required configuration for entities is missing");const t=(Array.isArray(e.entities)?e.entities:e.entities?[e.entities]:[]).map((e=>"object"==typeof e?{...e}:e));if(e.entity&&t.push(e.entity),0===t.length)throw new Error("At least one entity or media source is required");const i=String(e.menu_alignment||"responsive").toLowerCase(),r=Number.parseInt(e.items_per_page),s=Number(e.browse_cache_seconds),o=Number.parseInt(e.media_cache_size),n=Number.parseInt(e.resolve_concurrency),a=Number.parseInt(e.date_search_adjacent_days),l=JSON.stringify(this.config?.entities||[]),d={...e};delete d.entity,this.config={...d,entities:t,menu_alignment:Se.has(i)?i:"responsive",items_per_page:Number.isFinite(r)&&r>0?r:10,browse_cache_seconds:Number.isFinite(s)&&s>=0?s:20,media_cache_size:Number.isFinite(o)&&o>0?o:500,resolve_concurrency:Number.isFinite(n)&&n>0?Math.min(n,8):4,date_search_adjacent_days:Number.isFinite(a)&&a>=0?Math.min(a,7):1},l!==JSON.stringify(t)&&this._clearBrowseCache(),this._itemsToShow=this.config.items_per_page,this._previewErrorIndex=void 0,void 0!==this._hass&&this._loadResources(this._hass),this._doSlideShow(!0)}set hass(e){const t=this._hass;this._hass=e,this.config&&(void 0===this.resources?this._loadResources(e):this._haveCameraStatesChanged(t,e)&&this.requestUpdate())}get hass(){return this._hass}_haveCameraStatesChanged(e,t){return this._cameraEntityIds.some((i=>e?.states[i]!==t?.states[i]))}disconnectedCallback(){super.disconnectedCallback(),this._removeKeyNavigationListener(),this._clearSlideshowTimer(),this._closeImageModal(),this.imageObserver&&this.imageObserver.disconnect()}getCardSize(){return 12}getGridOptions(){return{columns:"full",min_columns:6}}static getStubConfig(){return{entities:[{path:"media-source://media_source/local",recursive:!0}],menu_alignment:"responsive"}}_isImageExtension(e){return"string"==typeof e&&/^(?:jpeg|jpg|gif|png|tiff|bmp|webp|avif)$/i.test(e)}_isImageResource(e){return e?.mediaType?"image"===e.mediaType:this._isImageExtension(e?.extension)}_getResourceKey(e){return e?.mediaContentId||e?.url||""}_patchResource(e,t){const i=this._getResourceKey(e);i&&this.resources&&(this.resources=this.resources.map((e=>this._getResourceKey(e)===i?{...e,...t}:e)))}_doSlideShow(e){this._clearSlideshowTimer(),e||this._isPreviewVideoPlaying()||this._selectResource(this.currentResourceIndex+1,!0);const t=Number.parseInt(this.config?.slideshow_timer);this.isConnected&&Number.isFinite(t)&&t>0&&(this._slideshowTimer=setTimeout((()=>{this._doSlideShow()}),1e3*t))}_isPreviewVideoPlaying(){if(!this.config.slideshow_video_end)return!1;const e=this.shadowRoot?.querySelector(".resource-viewer video");return Boolean(e&&!e.paused&&!e.ended)}_clearSlideshowTimer(){this._slideshowTimer&&(clearTimeout(this._slideshowTimer),this._slideshowTimer=void 0)}_loadMore(){const e=this.config.items_per_page;this._itemsToShow=Math.min(this._itemsToShow+e,this.resources.length)}_selectResource(e,t){if(this.autoPlayVideo=!0,!this.resources||0===this.resources.length)return;let i=Number.isFinite(e)?e:0;i<0?i=this.resources.length-1:i>=this.resources.length&&(i=0),i>=this._itemsToShow&&(this._itemsToShow=Math.min(i+this.config.items_per_page,this.resources.length)),this.currentResourceIndex=i,this._previewErrorIndex=void 0;const r=this.resources[this.currentResourceIndex];(r.resolveError||r.thumbnailError)&&r.mediaContentId?(this._mediaResolveCache.delete(r.mediaContentId),this._patchResource(r,{pendingAuth:!0,resolveError:!1,thumbnailError:!1})):r.thumbnailError&&this._patchResource(r,{thumbnailError:!1}),this._resolveResourceUrl(this.resources[this.currentResourceIndex]),!t&&this._slideshowTimer&&this._doSlideShow(!0);const s=this.currentResourceIndex;this.updateComplete.then((()=>this._scrollThumbnailIntoView(s)))}_scrollThumbnailIntoView(e){const t=this.shadowRoot?.querySelector(".resource-menu"),i=this.shadowRoot?.querySelector(`#resource${e}`);if(!t||!i||e!==this.currentResourceIndex)return;const r=t.getBoundingClientRect(),s=i.getBoundingClientRect();let o=t.scrollTop,n=t.scrollLeft;t.scrollHeight>t.clientHeight&&(s.top<r.top?o+=s.top-r.top-12:s.bottom>r.bottom&&(o+=s.bottom-r.bottom+12)),t.scrollWidth>t.clientWidth&&(s.left<r.left?n+=s.left-r.left-12:s.right>r.right&&(n+=s.right-r.right+12)),o===t.scrollTop&&n===t.scrollLeft||t.scrollTo({top:o,left:n,behavior:"smooth"})}_currentResource(){return this.resources?.[this.currentResourceIndex]}_startVideo(e){if(!this.autoPlayVideo)return;if(this.autoPlayVideo=!1,this._isModalOpen)return;const t=e.target.play();t&&t.catch((()=>{}))}_videoMetadataLoaded(e){const t=e.target.closest("figure")?.querySelector(".duration");Number.isFinite(e.target.duration)&&t&&(t.textContent=this._getFormattedVideoDuration(e.target.duration)),this.config.video_muted&&(e.target.muted=!0)}_videoHasEnded(){this.config.slideshow_video_end&&(this._clearSlideshowTimer(),this._doSlideShow())}_popupCamera(){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:this._currentResource()?.name},this.dispatchEvent(e)}_popupImage(){const e=this.shadowRoot.querySelector("dialog.modal");e&&!e.open&&(this._isModalOpen=!0,e.showModal())}_closeImageModal(){const e=this.shadowRoot?.querySelector("dialog.modal");e?.open&&e.close(),this._isModalOpen=!1}_handleModalClick(e){e.target===e.currentTarget&&this._closeImageModal()}_handleModalClosed(){this._isModalOpen=!1}_reloadResources(){this._mediaResolveCache.clear(),this._clearBrowseCache(),this._previewErrorIndex=void 0,this._loadResources(this._hass)}_clearBrowseCache(){this._browseCacheGeneration++,this._mediaBrowseCache.clear(),this._mediaBrowseInflight.clear()}_handlePreviewError(){const e=this._currentResource();if(e)return e.mediaContentId&&!e.resolveRetried?(this._mediaResolveCache.delete(e.mediaContentId),this._patchResource(e,{pendingAuth:!0,resolveError:!1,resolveRetried:!0}),void this._resolveResourceUrl(this._currentResource())):void(this._previewErrorIndex=this.currentResourceIndex)}_handleThumbnailError(e){if(e.mediaContentId&&!e.thumbnailRetried)return this._mediaResolveCache.delete(e.mediaContentId),this._patchResource(e,{pendingAuth:!0,thumbnailRetried:!0}),void this._resolveResourceUrl({...e,pendingAuth:!0});this._patchResource(e,{thumbnailError:!0})}_handleResourceKeydown(e,t){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._selectResource(t))}_getFormattedVideoDuration(e){let t=Number.parseInt(e/60);t<10&&(t="0"+t);let i=Number.parseInt(e%60);return i="0"+i,i=i.slice(Math.max(0,i.length-2)),t+":"+i}_keyNavigation(e){const t=e.composedPath()[0],i=t?.isContentEditable||["INPUT","TEXTAREA","SELECT","VIDEO"].includes(t?.tagName);if(!e.defaultPrevented&&!i&&(this.matches(":hover")||this.shadowRoot.activeElement))switch(e.code){case"ArrowDown":case"ArrowRight":e.preventDefault(),this._selectResource(this.currentResourceIndex+1);break;case"ArrowUp":case"ArrowLeft":e.preventDefault(),this._selectResource(this.currentResourceIndex-1)}}_handleTouchStart(e){this.xDown=e.touches[0].clientX,this.yDown=e.touches[0].clientY}_handleTouchMove(e){if(void 0===this.xDown||void 0===this.yDown)return;const t=e.touches[0].clientX,i=e.touches[0].clientY,r=this.xDown-t,s=this.yDown-i;let o=!1;Math.abs(r)>=40&&Math.abs(r)>Math.abs(s)?(r>0?(this._selectResource(this.currentResourceIndex+1),e.preventDefault()):(this._selectResource(this.currentResourceIndex-1),e.preventDefault()),o=!0):Math.abs(s)>=40&&(o=!0),o&&(this.xDown=void 0,this.yDown=void 0)}_handleDateChange(e){e.target.value?this.selectedDate=$e(e.target.value).toDate():this.selectedDate=null,this._isDateFiltered=null!==this.selectedDate,this._loadResources(this._hass)}_clearDateFilter(){this.selectedDate=null,this._isDateFiltered=!1,this._loadResources(this._hass)}_convertOldFormat(e){return e&&"string"==typeof e?e.replace(/%YYY/g,"YYYY").replace(/%Y/g,"YYYY").replace(/%m/g,"MM").replace(/%d/g,"DD").replace(/%H/g,"HH").replace(/%M/g,"mm").replace(/%S/g,"ss"):e}async _loadResources(e){if(!e||!this.config)return;if(this._isLoading)return void(this._pendingLoadRequested=!0);const t=++this._loadToken;this._isLoading=!0,this.currentResourceIndex=void 0,this.resources=[],this.errors=[],this._previewErrorIndex=void 0,this._itemsToShow=this.config.items_per_page,this._cameraEntityIds=[];const i=(this.config.enable_date_search??!1)&&this._isDateFiltered,r=Number(this.config.maximum_files),s=Number.isFinite(r)&&r>0?Math.floor(r):void 0,o=this.config.maximum_files_per_entity??!0,n=o?void 0:s,a=this._convertOldFormat(this.config.folder_format),l=this._convertOldFormat(this.config.file_name_format),d=this.config.file_name_date_begins,c=this._convertOldFormat(this.config.caption_format),h=this.config.parsed_date_sort??!1,u=this.config.reverse_sort??!0,m=this.config.random_sort??!1,p=o||!h&&!m?s:void 0,f=()=>{const t=[];for(const r of this.config.entities){let s,o=!1,n=!0,h=!0,m=a,f=l,g=d,v=c;if(r&&"object"==typeof r?(s=r.path,r.recursive&&(o=r.recursive),void 0!==r.include_video&&(n=r.include_video),void 0!==r.include_images&&(h=r.include_images),r.folder_format&&(m=this._convertOldFormat(r.folder_format)),r.file_name_format&&(f=this._convertOldFormat(r.file_name_format)),r.file_name_date_begins&&(g=r.file_name_date_begins),r.caption_format&&(v=this._convertOldFormat(r.caption_format))):s=r,"string"==typeof s&&s.trim())if("media-source://"===s.substring(0,15).toLowerCase())t.push(this._loadMediaResource(e,s,p,m,f,g,v,o,u,n,h,i));else{const r=e.states[s];void 0===r?t.push(Promise.resolve({error:!0,entity:s,message:"Invalid Entity ID"})):(void 0!==r.attributes.entity_picture&&t.push(this._loadCameraResource(s,r)),void 0!==r.attributes.fileList&&t.push(this._loadFilesResources(r.attributes.fileList,p,f,g,v,u,i)),void 0!==r.attributes.file_list&&t.push(this._loadFilesResources(r.attributes.file_list,p,f,g,v,u,i)))}else t.push(Promise.resolve({error:!0,entity:String(s||"未配置来源"),message:"Invalid media source"}))}return t};try{const t=await Promise.all(f());let r=t.filter((e=>!e.error)).flat(Number.POSITIVE_INFINITY);if(i&&(r=this._filterResourcesForSelectedDate(r)),h){const e=e=>e.date?e.date.valueOf():0,t=u?-1:1;r.sort(((i,r)=>(e(i)-e(r))*t))}if(m)for(let e=r.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));e!==t&&([r[e],r[t]]=[r[t],r[e]])}if(void 0!==n&&n<r.length){let e=r.filter((e=>e.isHass)).length;r=r.filter((t=>t.isHass||e++<n))}this.resources=r,this._cameraEntityIds=r.filter((e=>e.isHass)).map((e=>e.name)),this.currentResourceIndex=0,this._resolveResourceUrl(this.resources[0]),this._addKeyNavigationListener(),this.updateComplete.then((()=>this._scrollThumbnailIntoView(0)));const s=t.filter((e=>e.error)).flat(Number.POSITIVE_INFINITY);this.errors=s.map((e=>e.message+" "+e.entity));for(const i of s)Promise.resolve(e.callService("system_log","write",{message:"Gallery Card Error:  "+i.message+"   "+i.entity})).catch((()=>{}))}catch(g){t===this._loadToken&&(this.resources=[],this.currentResourceIndex=0,this.errors=[g?.message||"Unknown gallery loading error"]),console.error("Gallery Card failed to load resources",g)}finally{t===this._loadToken&&(this._isLoading=!1,this._pendingLoadRequested&&(this._pendingLoadRequested=!1,this._loadResources(this._hass)))}}_addKeyNavigationListener(){this._hasKeyNavigationListener||!this.isConnected||this.parentNode&&this.parentNode.tagName&&"hui-card-preview"===this.parentNode.tagName.toLowerCase()||(document.addEventListener("keydown",this._keyNavigationHandler),this._hasKeyNavigationListener=!0)}_removeKeyNavigationListener(){this._hasKeyNavigationListener&&(document.removeEventListener("keydown",this._keyNavigationHandler),this._hasKeyNavigationListener=!1)}async _loadMediaResource(e,t,i,r,s,o,n,a,l,d,c,h){let u=t;try{let p=[];const f=h&&Boolean(s),g=f&&this.config.date_search_adjacent_days>0,v=f?void 0:i;if(!h&&r&&l&&void 0!==i&&!Number.isNaN(i)){let s=$e(),o="";const n=[],a=t.replace(/\/+$/,"");let h=732;for(;p.length<i&&h-- >0;){const t=s.format(r);if(u=a+"/"+t,t!==o)try{const t=await this._loadMedia(this,e,u,i,!1,l,d,c,!1,!1);p.push(...t)}catch(m){if("browse_media_failed"!==m.code)throw m;n.push(u)}if(n.length>2){if(0===p.length)throw u=n.join(","),new Error("Failed to browse several folders and found no media files.  Verify your settings are correct.");break}o=t,s=s.subtract(12,"hour")}p.sort(((e,t)=>String(t.title||"").localeCompare(String(e.title||"")))),p.length>i&&(p.length=i)}else p=await this._loadMedia(this,e,u,v,a,l,d,c,h,g);let _=[];for(const e of p){const t=e.pending_authentication?this._createPendingMediaResource(e,s,o,n):this._createFileResource(e.authenticated_path,s,o,n);void 0!==t&&(t.mediaContentId=e.media_content_id,_.push(t))}return f&&(_=this._filterResourcesForSelectedDate(_)),void 0!==i&&i<_.length&&(_.length=i),_}catch(m){return console.error("Gallery Card failed to load media source",m),{error:!0,entity:u,message:m.message}}}async _loadMedia(e,t,i,r,s,o,n,a,l,d){const c={media_class:"directory",media_content_id:i};"/"!==i.substring(i.length-1,i.length)&&"media-source://media_source"!==i&&(c.media_content_id+="/");const h=Number.isFinite(r)&&r>0,u=(s&&h?await this._fetchMediaLimited(e,t,c,r,o,n,a,l,d):await Promise.all(this._fetchMedia(e,t,c,s,n,a,l,d))).flat(Number.POSITIVE_INFINITY).filter((function(e){return void 0!==e})).sort((function(e,t){return e.title>t.title?1:e.title<t.title?-1:0}));return o&&u.reverse(),void 0!==r&&!Number.isNaN(r)&&r<u.length&&(u.length=r),u.map((e=>({...e,pending_authentication:!0})))}_fetchMedia(e,t,i,r,s,o,n,a){const l=[];return"directory"===i.media_class&&(i.children?l.push(...i.children.filter((t=>this._shouldIncludeMediaItem(e,t,r,s,o,n,a))).map((i=>Promise.all(e._fetchMedia(e,t,i,r,s,o,n,a))))):l.push(e._fetchMediaContents(t,i.media_content_id).then((i=>Promise.all(e._fetchMedia(e,t,i,r,s,o,n,a)))))),"directory"!==i.media_class&&l.push(Promise.resolve(i)),l}async _fetchMediaLimited(e,t,i,r,s,o,n,a,l){const d=[],c=s?-1:1,h=async i=>{if(d.length>=r)return;if("directory"!==i.media_class)return void d.push(i);const s=[...(i.children?i:await this._fetchMediaContents(t,i.media_content_id)).children||[]].filter((t=>this._shouldIncludeMediaItem(e,t,!0,o,n,a,l))).sort(((e,t)=>String(e.title||"").localeCompare(String(t.title||""))*c));for(const e of s){if(d.length>=r)break;"directory"===e.media_class?await h(e):d.push(e)}};return await h(i),d}_shouldIncludeMediaItem(e,t,i,r,s,o,n){if(!t||"@eaDir"===String(t.title||"").replace(/\/$/,""))return!1;if("video"===t.media_class)return r;if("image"===t.media_class)return s;if(!i||"directory"!==t.media_class)return!1;if(!o)return!0;const a=e.config.search_date_folder_format||"DD_MM_YYYY",l=String(t.title||"").replace(/\/$/,""),d=$e(l,a,!0);if(!d.isValid()||d.format(a)!==l)return!0;return e._getDateSearchFolderNames(a,n).has(l)}_fetchMediaContents(e,t){const i=1e3*this.config.browse_cache_seconds,r=this._mediaBrowseCache.get(t);if(i>0&&r?.expiresAt>Date.now())return this._refreshCacheEntry(this._mediaBrowseCache,t,r),Promise.resolve(r.value);if(r&&this._mediaBrowseCache.delete(t),this._mediaBrowseInflight.has(t))return this._mediaBrowseInflight.get(t);const s=this._browseCacheGeneration,o=e.callWS({type:"media_source/browse_media",media_content_id:t}).then((e=>(i>0&&s===this._browseCacheGeneration&&this._setLimitedCacheEntry(this._mediaBrowseCache,t,{value:e,expiresAt:Date.now()+i},100),e))).finally((()=>{this._mediaBrowseInflight.get(t)===o&&this._mediaBrowseInflight.delete(t)}));return this._mediaBrowseInflight.set(t,o),o}_fetchMediaItem(e,t){return e.callWS({type:"media_source/resolve_media",media_content_id:t,expires:10800})}_fetchMediaItemWithCache(e,t){const i=this._mediaResolveCache.get(t);if(i&&i.expiresAt>Date.now())return this._refreshCacheEntry(this._mediaResolveCache,t,i),Promise.resolve({url:i.url});if(i&&this._mediaResolveCache.delete(t),this._mediaResolveInflight.has(t))return this._mediaResolveInflight.get(t);const r=this._fetchMediaItem(e,t).then((e=>(this._setLimitedCacheEntry(this._mediaResolveCache,t,{url:e.url,expiresAt:Date.now()+this._mediaResolveCacheMs},this.config.media_cache_size),e))).finally((()=>{this._mediaResolveInflight.delete(t)}));return this._mediaResolveInflight.set(t,r),r}_refreshCacheEntry(e,t,i){e.delete(t),e.set(t,i)}_setLimitedCacheEntry(e,t,i,r){for(this._refreshCacheEntry(e,t,i);e.size>r;){const t=e.keys().next().value;e.delete(t)}}_loadCameraResource(e,t){const i={url:t.attributes.entity_picture,name:e,extension:"jpg",caption:t.attributes.friendly_name??e,isHass:!0};return Promise.resolve(i)}_loadFilesResources(e,t,i,r,s,o,n){let a=[];if(Array.isArray(e)){e=[...e].filter((e=>"string"==typeof e&&!e.includes("@eaDir"))),o&&e.reverse(),!n&&void 0!==t&&!Number.isNaN(t)&&t<e.length&&(e.length=t);for(const t of e){const e=t;let o;if(e.startsWith("/local/")||e.startsWith("http://")||e.startsWith("https://"))o=e;else if(e.includes("/config/www/"))o=e.replace("/config/www/","/local/");else if(e.includes("/www/"))o="/local/"+e.slice(e.indexOf("/www/")+5);else{if(e.startsWith("/"))continue;o="/local/"+e}const n=this._createFileResource(o,i,r,s);void 0!==n&&a.push(n)}n&&i&&(a=this._filterResourcesForSelectedDate(a)),void 0!==t&&t<a.length&&(a.length=t)}return Promise.resolve(a)}_createFileResource(e,t,i,r){if(!e)return;let s;const o=e.split("?")[0];let n=o.split("/").at(-1),a="",l="";if("@eaDir"!==n){const d=n.lastIndexOf("."),c=d>0?n.slice(d+1).toLowerCase():"";d>0&&(n=n.slice(0,d));try{n=decodeURIComponent(n)}catch{}" "!==r&&(l=n);let h=n;if(i&&!Number.isNaN(Number.parseInt(i))&&(h=h.slice(Math.max(0,Number.parseInt(i)-1))),t){const e=$e(h,t);e.isValid()&&(a=e)}a&&r&&("AGO"===r.toUpperCase().trim()?l=a.fromNow():(l=a.format(r),l=l.replaceAll(/ago/gi,a.fromNow()))),s={url:e,base_url:o,name:n,extension:c,caption:l,index:-1,date:a,dateFilterable:Boolean(t)}}return s}_createPendingMediaResource(e,t,i,r){const s=this._createFileResource(e.title||e.media_content_id,t,i,r);if(!s)return;const o=String(e.media_content_type||""),n=["image","video"].includes(e.media_class)?e.media_class:o.startsWith("image/")?"image":o.startsWith("video/")?"video":void 0;return{...s,url:"",mediaContentId:e.media_content_id,mediaType:n,pendingAuth:!0}}async _resolvePendingResourceBatch(e,t,i){const r=this.config.resolve_concurrency,s=e.filter((e=>this._queuedResolveIds.get(e.mediaContentId)!==i&&(this._queuedResolveIds.set(e.mediaContentId,i),!0)));try{for(let e=0;e<s.length;e+=r){if(i!==this._loadToken)return;const o=s.slice(e,e+r),n=await Promise.all(o.map((async e=>{try{const i=await this._fetchMediaItemWithCache(t,e.mediaContentId);return{mediaContentId:e.mediaContentId,url:i.url}}catch(i){return console.error("Gallery Card failed to resolve media URL",i),{mediaContentId:e.mediaContentId,error:!0}}})));this._applyResourceResolutionResults(n,i)}}finally{for(const e of s)this._queuedResolveIds.get(e.mediaContentId)===i&&this._queuedResolveIds.delete(e.mediaContentId)}}_resolveResourceUrl(e,t=this._hass,i=this._loadToken){return e&&e.pendingAuth&&e.mediaContentId?this._fetchMediaItemWithCache(t,e.mediaContentId).then((t=>{const r={mediaContentId:e.mediaContentId,url:t.url};return this._applyResourceResolutionResults([r],i),r})).catch((t=>{this._applyResourceResolutionResults([{mediaContentId:e.mediaContentId,error:!0}],i),console.error("Gallery Card failed to resolve media URL",t)})):Promise.resolve()}_applyResourceResolutionResults(e,t){if(t!==this._loadToken||0===e.length)return;const i=new Map(e.map((e=>[e.mediaContentId,e])));this.resources=(this.resources||[]).map((e=>{const t=i.get(e.mediaContentId);return t?t.error?{...e,pendingAuth:!1,resolveError:!0}:{...e,url:t.url,pendingAuth:!1,resolveError:!1,thumbnailError:!1}:e}))}_getDateSearchFolderNames(e,t){const i=t?this.config.date_search_adjacent_days:0,r=$e(this.selectedDate),s=new Set;for(let o=-i;o<=i;o++)s.add(r.add(o,"day").format(e));return s}_filterResourcesForSelectedDate(e){const t=$e(this.selectedDate).format("YYYY-MM-DD");return e.filter((e=>!e.dateFilterable||!(!e.date||!$e(e.date).isValid())&&$e(e.date).format("YYYY-MM-DD")===t))}_formatDateForInput(e){return e?$e(e).format("YYYY-MM-DD"):""}static get styles(){return o`
      :host {
        --gallery-card-primary-color: var(--primary-color, #03a9f4);
        --gallery-card-text-color: var(--primary-text-color, #212121);
        --gallery-card-bg-color: var(--card-background-color, #fff);
        --gallery-card-sidebar-width: clamp(220px, 25%, 360px);
        --gallery-card-strip-item-width: 160px;
        display: block;
        container: gallery-card / inline-size;
      }
      ha-card {
        /* Override --gallery-card-height (e.g. with card-mod) to fit other dashboard layouts. */
        height: var(--gallery-card-height, calc(100dvh - var(--header-height, 56px)));
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background: var(--gallery-card-bg-color);
        border-radius: var(--ha-card-border-radius, 12px);
        box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12), 0 3px 1px -2px rgba(0,0,0,0.2));
      }

      /* Preview */
      .resource-viewer {
        position: relative;
        flex: 1 1 auto;
        min-width: 0;
        min-height: 0;
        background: radial-gradient(circle, #2c2c2c 0%, #111 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }
      .resource-viewer::after {
        content: "";
        position: absolute;
        inset: 0;
        box-shadow: inset 0 0 80px rgba(0,0,0,0.4);
        pointer-events: none;
      }
      .resource-viewer figure {
        width: 100%;
        height: 100%;
        margin: 0;
        box-sizing: border-box;
      }
      img, video {
        width: 100%;
        height: 100%;
        object-fit: contain;
        display: block;
        transition: opacity 0.3s ease;
      }
      hui-image {
        display: block;
        width: 100%;
        height: 100%;
      }
      .preview-image {
        cursor: zoom-in;
      }
      .resource-viewer hui-image {
        cursor: pointer;
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
        padding: 16px;
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
      .viewer-nav {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        pointer-events: none;
        z-index: 1;
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
        -webkit-tap-highlight-color: transparent;
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
      .viewer-counter {
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 1;
        padding: 2px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.55);
        color: #fff;
        font-size: 0.8em;
        font-variant-numeric: tabular-nums;
        line-height: 1.6;
        pointer-events: none;
      }
      @media (hover: none) {
        /* Touch screens have no hover to reveal the arrows. */
        .nav-icon-btn {
          opacity: 0.82;
        }
      }

      /* Thumbnail list */
      .resource-menu-container {
        container: gallery-menu / inline-size;
        flex: none;
        display: flex;
        flex-direction: column;
        min-width: 0;
        min-height: 0;
        background: var(--secondary-background-color, #f5f5f5);
        overflow: hidden;
      }
      .card-header-actions {
        flex: none;
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
      .date-filter-container {
        grid-column: 2;
        display: flex;
        align-items: center;
        min-width: 0;
        background: var(--secondary-background-color, #f5f5f5);
        border-radius: 8px;
        padding: 4px 10px;
        border: 1px solid var(--divider-color, #e0e0e0);
        height: 32px;
        box-sizing: border-box;
      }
      .date-filter-container:focus-within {
        border-color: var(--gallery-card-primary-color);
      }
      .date-picker {
        min-width: 0;
        width: 100%;
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
      .header-trailing {
        grid-column: 3;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 2px;
        min-width: 0;
      }
      /* Narrow lists: put the title on its own row so the date picker and actions never overlap. */
      @container gallery-menu (max-width: 339px) {
        .card-header-actions.has-date {
          grid-template-columns: minmax(0, 1fr) auto;
        }
        .has-date .header-leading {
          grid-column: 1 / -1;
        }
        .has-date .date-filter-container {
          grid-column: 1;
        }
        .has-date .header-trailing {
          grid-column: 2;
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
      .btn-clear-date {
        color: var(--error-color, #db4437);
      }
      .icon-button {
        width: 32px;
        height: 32px;
        flex: none;
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
      .icon-button:disabled {
        cursor: default;
        opacity: 0.45;
      }
      .action-text:hover,
      .icon-button:hover:not(:disabled),
      .load-more:hover {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
      }
      .icon-button:hover:not(:disabled) {
        color: var(--gallery-card-primary-color);
      }
      .action-text:focus-visible,
      .icon-button:focus-visible,
      .load-more:focus-visible,
      .modal-close:focus-visible {
        outline: 2px solid var(--gallery-card-primary-color);
        outline-offset: 1px;
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
      .resource-menu {
        padding: 12px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        grid-auto-rows: max-content;
        gap: 12px;
        overflow-y: auto;
        align-content: start;
        min-height: 0;
        width: 100%;
        box-sizing: border-box;
        scrollbar-width: thin;
        scrollbar-color: rgba(var(--rgb-primary-color, 3, 169, 244), 0.3) transparent;
      }
      .resource-menu::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      .resource-menu::-webkit-scrollbar-thumb {
        background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.3);
        border-radius: 4px;
      }
      .resource-menu figure {
        margin: 0;
        width: 100%;
        cursor: pointer;
        border-radius: 8px;
        overflow: hidden;
        background: #222;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        position: relative;
        aspect-ratio: 16 / 9;
        align-self: start;
        box-sizing: border-box;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        -webkit-tap-highlight-color: transparent;
      }
      @media (hover: hover) {
        .resource-menu figure:not(.resource-skeleton):hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(0,0,0,0.4);
        }
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
        cursor: default;
        box-shadow: none;
        pointer-events: none;
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
        flex: 1 1 auto;
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
      .resource-menu img,
      .resource-menu video {
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
        padding: 4px 6px;
        font-size: 0.7em;
        color: #fff;
        text-align: center;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.75));
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        box-sizing: border-box;
      }
      .duration {
        position: absolute;
        top: 4px;
        right: 4px;
        padding: 0 5px;
        border-radius: 4px;
        background: rgba(0, 0, 0, 0.65);
        color: #fff;
        font-size: 0.68em;
        font-variant-numeric: tabular-nums;
        line-height: 1.6;
        pointer-events: none;
      }
      .duration:empty {
        display: none;
      }
      @container gallery-card (min-width: 600px) {
        .resource-menu figcaption {
          font-size: 0.85em;
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

      /* Layout modes (wide cards) */
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
      .menu-responsive .resource-menu-container,
      .menu-right .resource-menu-container,
      .menu-left .resource-menu-container {
        width: var(--gallery-card-sidebar-width);
      }
      .menu-responsive .resource-menu,
      .menu-right .resource-menu,
      .menu-left .resource-menu {
        flex: 1 1 0;
        grid-template-columns: minmax(0, 1fr);
      }
      .menu-top .resource-menu,
      .menu-bottom .resource-menu {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
      }
      .menu-top .resource-menu figure,
      .menu-bottom .resource-menu figure {
        flex: 0 0 var(--gallery-card-strip-item-width);
      }
      .menu-top .load-more,
      .menu-bottom .load-more {
        flex: none;
        width: auto;
        padding: 6px 16px;
        white-space: nowrap;
      }
      .menu-hidden .resource-menu-container {
        display: none;
      }

      /* Narrow cards: preview on top with a fixed ratio, thumbnails as a grid below.
         ha-card[class] outranks the per-mode selectors above without !important. */
      @container gallery-card (max-width: 599px) {
        ha-card[class] {
          flex-direction: column;
          height: auto;
        }
        ha-card[class] .resource-viewer {
          flex: none;
          width: 100%;
          aspect-ratio: 16 / 9;
          max-height: 70dvh;
        }
        ha-card[class] .resource-menu-container {
          width: 100%;
        }
        ha-card[class] .resource-menu {
          display: grid;
          flex: none;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          overflow: visible;
        }
        ha-card[class] .load-more {
          width: 100%;
        }
        .card-header-actions {
          padding: 6px 12px;
        }
        .nav-icon-btn {
          opacity: 0.82;
          width: 38px;
          height: 38px;
        }
      }
      @container gallery-card (max-width: 340px) {
        ha-card[class] .resource-menu {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      /* Full-screen preview */
      .modal {
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
        background: rgba(0, 0, 0, 0.95);
        color: #fff;
        box-sizing: border-box;
      }
      .modal[open] {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        padding: 56px max(16px, env(safe-area-inset-right)) max(20px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left));
      }
      .modal::backdrop {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(5px);
      }
      .modal-media {
        flex: 0 1 auto;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
        min-height: 0;
        object-fit: contain;
        animation: zoom 0.3s;
      }
      hui-image.modal-media {
        width: 100%;
        height: 100%;
      }
      .modal-caption {
        flex: none;
        max-width: 100%;
        text-align: center;
        font-size: 1.1em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .modal-close {
        position: absolute;
        z-index: 1;
        top: max(8px, env(safe-area-inset-top));
        right: max(8px, env(safe-area-inset-right));
        width: 44px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.12);
        color: #fff;
        cursor: pointer;
      }
      .modal-close:hover {
        background: rgba(255, 255, 255, 0.24);
      }
      .modal-close ha-icon {
        --mdc-icon-size: 28px;
      }
      @keyframes zoom {
        from { transform: scale(0.92); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
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
    `}}customElements.get("gallery-card")||(customElements.define("gallery-card",Ce),console.groupCollapsed("%cGALLERY-CARD 2026.0.1 IS INSTALLED","color: green; font-weight: bold"),console.log("Readme:","https://github.com/fange173/gallery-card-2026"),console.groupEnd(),window.customCards=window.customCards||[],window.customCards.push({type:"gallery-card",name:"Gallery Card 2026",preview:!1,description:"Gallery Card 2026 displays images and videos from media sources, file-list sensors, and camera entities.",documentationURL:"https://github.com/fange173/gallery-card-2026"}));
