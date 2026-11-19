const e=window,t=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;class o{constructor(e,t,r){if(this._$cssResult$=!0,r!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const i=this.t;if(t&&void 0===e){const t=void 0!==i&&1===i.length;t&&(e=r.get(i)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),t&&r.set(i,e))}return e}toString(){return this.cssText}}const s=(e,...t)=>{const r=1===e.length?e[0]:t.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new o(r,e,i)},a=t?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new o("string"==typeof e?e:e+"",void 0,i))(t)})(e):e;var n;const l=window,d=l.trustedTypes,c=d?d.emptyScript:"",h=l.reactiveElementPolyfillSupport,u={toAttribute(e,t){switch(t){case Boolean:e=e?c:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},p=(e,t)=>t!==e&&(t==t||e==e),m={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p},g="finalized";class f extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Ep(i,t);void 0!==r&&(this._$Ev.set(r,i),e.push(r))})),e}static createProperty(e,t=m){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const o=this[e];this[t]=r,this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||m}static finalize(){if(this.hasOwnProperty(g))return!1;this[g]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var i;const r=null!==(i=this.shadowRoot)&&void 0!==i?i:this.attachShadow(this.constructor.shadowRootOptions);return((i,r)=>{t?i.adoptedStyleSheets=r.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):r.forEach((t=>{const r=document.createElement("style"),o=e.litNonce;void 0!==o&&r.setAttribute("nonce",o),r.textContent=t.cssText,i.appendChild(r)}))})(r,this.constructor.elementStyles),r}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=m){var r;const o=this.constructor._$Ep(e,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==(null===(r=i.converter)||void 0===r?void 0:r.toAttribute)?i.converter:u).toAttribute(t,i.type);this._$El=e,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$El=null}}_$AK(e,t){var i;const r=this.constructor,o=r._$Ev.get(e);if(void 0!==o&&this._$El!==o){const e=r.getPropertyOptions(o),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:u;this._$El=o,this[o]=s.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||p)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((e,t)=>this[t]=e)),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}var _;f[g]=!0,f.elementProperties=new Map,f.elementStyles=[],f.shadowRootOptions={mode:"open"},null==h||h({ReactiveElement:f}),(null!==(n=l.reactiveElementVersions)&&void 0!==n?n:l.reactiveElementVersions=[]).push("1.6.3");const v=window,y=v.trustedTypes,b=y?y.createPolicy("lit-html",{createHTML:e=>e}):void 0,w="$lit$",x=`lit$${(Math.random()+"").slice(9)}$`,$="?"+x,S=`<${$}>`,M=document,D=()=>M.createComment(""),R=e=>null===e||"object"!=typeof e&&"function"!=typeof e,A=Array.isArray,k=e=>A(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]),C="[ \t\n\f\r]",I=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,E=/>/g,Y=RegExp(`>|${C}(?:([^\\s"'>=/]+)(${C}*=${C}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),O=/'/g,z=/"/g,P=/^(?:script|style|textarea|title)$/i,N=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),L=Symbol.for("lit-noChange"),U=Symbol.for("lit-nothing"),H=new WeakMap,B=M.createTreeWalker(M,129,null,!1);function F(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(t):t}const V=(e,t)=>{const i=e.length-1,r=[];let o,s=2===t?"<svg>":"",a=I;for(let n=0;n<i;n++){const t=e[n];let i,l,d=-1,c=0;for(;c<t.length&&(a.lastIndex=c,l=a.exec(t),null!==l);)c=a.lastIndex,a===I?"!--"===l[1]?a=T:void 0!==l[1]?a=E:void 0!==l[2]?(P.test(l[2])&&(o=RegExp("</"+l[2],"g")),a=Y):void 0!==l[3]&&(a=Y):a===Y?">"===l[0]?(a=null!=o?o:I,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,i=l[1],a=void 0===l[3]?Y:'"'===l[3]?z:O):a===z||a===O?a=Y:a===T||a===E?a=I:(a=Y,o=void 0);const h=a===Y&&e[n+1].startsWith("/>")?" ":"";s+=a===I?t+S:d>=0?(r.push(i),t.slice(0,d)+w+t.slice(d)+x+h):t+x+(-2===d?(r.push(void 0),n):h)}return[F(e,s+(e[i]||"<?>")+(2===t?"</svg>":"")),r]};class j{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let o=0,s=0;const a=e.length-1,n=this.parts,[l,d]=V(e,t);if(this.el=j.createElement(l,i),B.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=B.nextNode())&&n.length<a;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith(w)||t.startsWith(x)){const i=d[s++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+w).split(x),t=/([.?@])?(.*)/.exec(i);n.push({type:1,index:o,name:t[2],strings:e,ctor:"."===t[1]?X:"?"===t[1]?J:"@"===t[1]?Q:G})}else n.push({type:6,index:o})}for(const t of e)r.removeAttribute(t)}if(P.test(r.tagName)){const e=r.textContent.split(x),t=e.length-1;if(t>0){r.textContent=y?y.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],D()),B.nextNode(),n.push({type:2,index:++o});r.append(e[t],D())}}}else if(8===r.nodeType)if(r.data===$)n.push({type:2,index:o});else{let e=-1;for(;-1!==(e=r.data.indexOf(x,e+1));)n.push({type:7,index:o}),e+=x.length-1}o++}}static createElement(e,t){const i=M.createElement("template");return i.innerHTML=e,i}}function W(e,t,i=e,r){var o,s,a,n;if(t===L)return t;let l=void 0!==r?null===(o=i._$Co)||void 0===o?void 0:o[r]:i._$Cl;const d=R(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,r)),void 0!==r?(null!==(a=(n=i)._$Co)&&void 0!==a?a:n._$Co=[])[r]=l:i._$Cl=l),void 0!==l&&(t=W(e,l._$AS(e,t.values),l,r)),t}class K{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:r}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:M).importNode(i,!0);B.currentNode=o;let s=B.nextNode(),a=0,n=0,l=r[0];for(;void 0!==l;){if(a===l.index){let t;2===l.type?t=new q(s,s.nextSibling,this,e):1===l.type?t=new l.ctor(s,l.name,l.strings,this,e):6===l.type&&(t=new ee(s,this,e)),this._$AV.push(t),l=r[++n]}a!==(null==l?void 0:l.index)&&(s=B.nextNode(),a++)}return B.currentNode=M,o}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class q{constructor(e,t,i,r){var o;this.type=2,this._$AH=U,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cp=null===(o=null==r?void 0:r.isConnected)||void 0===o||o}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),R(e)?e===U||null==e||""===e?(this._$AH!==U&&this._$AR(),this._$AH=U):e!==this._$AH&&e!==L&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):k(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==U&&R(this._$AH)?this._$AA.nextSibling.data=e:this.$(M.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:r}=e,o="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=j.createElement(F(r.h,r.h[0]),this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.v(i);else{const e=new K(o,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=H.get(e.strings);return void 0===t&&H.set(e.strings,t=new j(e)),t}T(e){A(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const o of e)r===t.length?t.push(i=new q(this.k(D()),this.k(D()),this,this.options)):i=t[r],i._$AI(o),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class G{constructor(e,t,i,r,o){this.type=1,this._$AH=U,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=U}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const o=this.strings;let s=!1;if(void 0===o)e=W(this,e,t,0),s=!R(e)||e!==this._$AH&&e!==L,s&&(this._$AH=e);else{const r=e;let a,n;for(e=o[0],a=0;a<o.length-1;a++)n=W(this,r[i+a],t,a),n===L&&(n=this._$AH[a]),s||(s=!R(n)||n!==this._$AH[a]),n===U?e=U:e!==U&&(e+=(null!=n?n:"")+o[a+1]),this._$AH[a]=n}s&&!r&&this.j(e)}j(e){e===U?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class X extends G{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===U?void 0:e}}const Z=y?y.emptyScript:"";class J extends G{constructor(){super(...arguments),this.type=4}j(e){e&&e!==U?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class Q extends G{constructor(e,t,i,r,o){super(e,t,i,r,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=W(this,e,t,0))&&void 0!==i?i:U)===L)return;const r=this._$AH,o=e===U&&r!==U||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==U&&(r===U||o);o&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ee{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}}const te={O:w,P:x,A:$,C:1,M:V,L:K,R:k,D:W,I:q,V:G,H:J,N:Q,U:X,F:ee},ie=v.litHtmlPolyfillSupport;null==ie||ie(j,q),(null!==(_=v.litHtmlVersions)&&void 0!==_?_:v.litHtmlVersions=[]).push("2.8.0");var re,oe;class se extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var r,o;const s=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let a=s._$litPart$;if(void 0===a){const e=null!==(o=null==i?void 0:i.renderBefore)&&void 0!==o?o:null;s._$litPart$=a=new q(t.insertBefore(D(),e),e,void 0,null!=i?i:{})}return a._$AI(e),a})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return L}}se.finalized=!0,se._$litElement$=!0,null===(re=globalThis.litElementHydrateSupport)||void 0===re||re.call(globalThis,{LitElement:se});const ae=globalThis.litElementPolyfillSupport;var ne;null==ae||ae({LitElement:se}),(null!==(oe=globalThis.litElementVersions)&&void 0!==oe?oe:globalThis.litElementVersions=[]).push("3.3.3"),null===(ne=window.HTMLSlotElement)||void 0===ne||ne.prototype.assignedElements,console.warn("The main 'lit-element' module entrypoint is deprecated. Please update your imports to use the 'lit' package: 'lit' and 'lit/decorators.ts' or import from 'lit-element/lit-element.ts'. See https://lit.dev/msg/deprecated-import-path for more information.");const le=2;class de{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:ce}=te,he=()=>document.createComment(""),ue=(e,t,i)=>{var r;const o=e._$AA.parentNode,s=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=o.insertBefore(he(),s),r=o.insertBefore(he(),s);i=new ce(t,r,e,e.options)}else{const t=i._$AB.nextSibling,a=i._$AM,n=a!==e;if(n){let t;null===(r=i._$AQ)||void 0===r||r.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==a._$AU&&i._$AP(t)}if(t!==s||n){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;o.insertBefore(e,s),e=t}}}return i},pe=(e,t,i=e)=>(e._$AI(t,i),e),me={},ge=(e,t=me)=>e._$AH=t,fe=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const r=e._$AB.nextSibling;for(;i!==r;){const e=i.nextSibling;i.remove(),i=e}},_e=(e,t,i)=>{const r=new Map;for(let o=t;o<=i;o++)r.set(e[o],o);return r},ve=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends de{constructor(e){if(super(e),e.type!==le)throw Error("repeat() can only be used in text expressions")}ct(e,t,i){let r;void 0===i?i=t:void 0!==t&&(r=t);const o=[],s=[];let a=0;for(const n of e)o[a]=r?r(n,a):a,s[a]=i(n,a),a++;return{values:s,keys:o}}render(e,t,i){return this.ct(e,t,i).values}update(e,[t,i,r]){var o;const s=(e=>e._$AH)(e),{values:a,keys:n}=this.ct(t,i,r);if(!Array.isArray(s))return this.ut=n,a;const l=null!==(o=this.ut)&&void 0!==o?o:this.ut=[],d=[];let c,h,u=0,p=s.length-1,m=0,g=a.length-1;for(;u<=p&&m<=g;)if(null===s[u])u++;else if(null===s[p])p--;else if(l[u]===n[m])d[m]=pe(s[u],a[m]),u++,m++;else if(l[p]===n[g])d[g]=pe(s[p],a[g]),p--,g--;else if(l[u]===n[g])d[g]=pe(s[u],a[g]),ue(e,d[g+1],s[u]),u++,g--;else if(l[p]===n[m])d[m]=pe(s[p],a[m]),ue(e,s[u],s[p]),p--,m++;else if(void 0===c&&(c=_e(n,m,g),h=_e(l,u,p)),c.has(l[u]))if(c.has(l[p])){const t=h.get(n[m]),i=void 0!==t?s[t]:null;if(null===i){const t=ue(e,s[u]);pe(t,a[m]),d[m]=t}else d[m]=pe(i,a[m]),ue(e,s[u],i),s[t]=null;m++}else fe(s[p]),p--;else fe(s[u]),u++;for(;m<=g;){const t=ue(e,d[g+1]);pe(t,a[m]),d[m++]=t}for(;u<=p;){const e=s[u++];null!==e&&fe(e)}return this.ut=n,ge(e,d),L}});"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;function ye(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var be={exports:{}};be.exports=function(){var e=1e3,t=6e4,i=36e5,r="millisecond",o="second",s="minute",a="hour",n="day",l="week",d="month",c="quarter",h="year",u="date",p="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,g=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,f={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},_=function(e,t,i){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(i)+e},v={s:_,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),r=Math.floor(i/60),o=i%60;return(t<=0?"+":"-")+_(r,2,"0")+":"+_(o,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var r=12*(i.year()-t.year())+(i.month()-t.month()),o=t.clone().add(r,d),s=i-o<0,a=t.clone().add(r+(s?-1:1),d);return+(-(r+(i-o)/(s?o-a:a-o))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:d,y:h,w:l,d:n,D:u,h:a,m:s,s:o,ms:r,Q:c}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},y="en",b={};b[y]=f;var w="$isDayjsObject",x=function(e){return e instanceof D||!(!e||!e[w])},$=function e(t,i,r){var o;if(!t)return y;if("string"==typeof t){var s=t.toLowerCase();b[s]&&(o=s),i&&(b[s]=i,o=s);var a=t.split("-");if(!o&&a.length>1)return e(a[0])}else{var n=t.name;b[n]=t,o=n}return!r&&o&&(y=o),o||!r&&y},S=function(e,t){if(x(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new D(i)},M=v;M.l=$,M.i=x,M.w=function(e,t){return S(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var D=function(){function f(e){this.$L=$(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[w]=!0}var _=f.prototype;return _.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(M.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(m);if(r){var o=r[2]-1||0,s=(r[7]||"0").substring(0,3);return i?new Date(Date.UTC(r[1],o,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],o,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(t)}(e),this.init()},_.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},_.$utils=function(){return M},_.isValid=function(){return!(this.$d.toString()===p)},_.isSame=function(e,t){var i=S(e);return this.startOf(t)<=i&&i<=this.endOf(t)},_.isAfter=function(e,t){return S(e)<this.startOf(t)},_.isBefore=function(e,t){return this.endOf(t)<S(e)},_.$g=function(e,t,i){return M.u(e)?this[t]:this.set(i,e)},_.unix=function(){return Math.floor(this.valueOf()/1e3)},_.valueOf=function(){return this.$d.getTime()},_.startOf=function(e,t){var i=this,r=!!M.u(t)||t,c=M.p(e),p=function(e,t){var o=M.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return r?o:o.endOf(n)},m=function(e,t){return M.w(i.toDate()[e].apply(i.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},g=this.$W,f=this.$M,_=this.$D,v="set"+(this.$u?"UTC":"");switch(c){case h:return r?p(1,0):p(31,11);case d:return r?p(1,f):p(0,f+1);case l:var y=this.$locale().weekStart||0,b=(g<y?g+7:g)-y;return p(r?_-b:_+(6-b),f);case n:case u:return m(v+"Hours",0);case a:return m(v+"Minutes",1);case s:return m(v+"Seconds",2);case o:return m(v+"Milliseconds",3);default:return this.clone()}},_.endOf=function(e){return this.startOf(e,!1)},_.$set=function(e,t){var i,l=M.p(e),c="set"+(this.$u?"UTC":""),p=(i={},i[n]=c+"Date",i[u]=c+"Date",i[d]=c+"Month",i[h]=c+"FullYear",i[a]=c+"Hours",i[s]=c+"Minutes",i[o]=c+"Seconds",i[r]=c+"Milliseconds",i)[l],m=l===n?this.$D+(t-this.$W):t;if(l===d||l===h){var g=this.clone().set(u,1);g.$d[p](m),g.init(),this.$d=g.set(u,Math.min(this.$D,g.daysInMonth())).$d}else p&&this.$d[p](m);return this.init(),this},_.set=function(e,t){return this.clone().$set(e,t)},_.get=function(e){return this[M.p(e)]()},_.add=function(r,c){var u,p=this;r=Number(r);var m=M.p(c),g=function(e){var t=S(p);return M.w(t.date(t.date()+Math.round(e*r)),p)};if(m===d)return this.set(d,this.$M+r);if(m===h)return this.set(h,this.$y+r);if(m===n)return g(1);if(m===l)return g(7);var f=(u={},u[s]=t,u[a]=i,u[o]=e,u)[m]||1,_=this.$d.getTime()+r*f;return M.w(_,this)},_.subtract=function(e,t){return this.add(-1*e,t)},_.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||p;var r=e||"YYYY-MM-DDTHH:mm:ssZ",o=M.z(this),s=this.$H,a=this.$m,n=this.$M,l=i.weekdays,d=i.months,c=i.meridiem,h=function(e,i,o,s){return e&&(e[i]||e(t,r))||o[i].slice(0,s)},u=function(e){return M.s(s%12||12,e,"0")},m=c||function(e,t,i){var r=e<12?"AM":"PM";return i?r.toLowerCase():r};return r.replace(g,(function(e,r){return r||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return M.s(t.$y,4,"0");case"M":return n+1;case"MM":return M.s(n+1,2,"0");case"MMM":return h(i.monthsShort,n,d,3);case"MMMM":return h(d,n);case"D":return t.$D;case"DD":return M.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return h(i.weekdaysMin,t.$W,l,2);case"ddd":return h(i.weekdaysShort,t.$W,l,3);case"dddd":return l[t.$W];case"H":return String(s);case"HH":return M.s(s,2,"0");case"h":return u(1);case"hh":return u(2);case"a":return m(s,a,!0);case"A":return m(s,a,!1);case"m":return String(a);case"mm":return M.s(a,2,"0");case"s":return String(t.$s);case"ss":return M.s(t.$s,2,"0");case"SSS":return M.s(t.$ms,3,"0");case"Z":return o}return null}(e)||o.replace(":","")}))},_.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},_.diff=function(r,u,p){var m,g=this,f=M.p(u),_=S(r),v=(_.utcOffset()-this.utcOffset())*t,y=this-_,b=function(){return M.m(g,_)};switch(f){case h:m=b()/12;break;case d:m=b();break;case c:m=b()/3;break;case l:m=(y-v)/6048e5;break;case n:m=(y-v)/864e5;break;case a:m=y/i;break;case s:m=y/t;break;case o:m=y/e;break;default:m=y}return p?m:M.a(m)},_.daysInMonth=function(){return this.endOf(d).$D},_.$locale=function(){return b[this.$L]},_.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),r=$(e,t,!0);return r&&(i.$L=r),i},_.clone=function(){return M.w(this.$d,this)},_.toDate=function(){return new Date(this.valueOf())},_.toJSON=function(){return this.isValid()?this.toISOString():null},_.toISOString=function(){return this.$d.toISOString()},_.toString=function(){return this.$d.toUTCString()},f}(),R=D.prototype;return S.prototype=R,[["$ms",r],["$s",o],["$m",s],["$H",a],["$W",n],["$M",d],["$y",h],["$D",u]].forEach((function(e){R[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),S.extend=function(e,t){return e.$i||(e(t,D,S),e.$i=!0),S},S.locale=$,S.isDayjs=x,S.unix=function(e){return S(1e3*e)},S.en=b[y],S.Ls=b,S.p={},S}();var we=be.exports,xe=ye(we),$e={exports:{}};$e.exports=function(e){function t(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var i=t(e),r={name:"zh-cn",weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),ordinal:function(e,t){return"W"===t?e+"周":e+"日"},weekStart:1,yearStart:4,formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日Ah点mm分",LLLL:"YYYY年M月D日ddddAh点mm分",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},relativeTime:{future:"%s内",past:"%s前",s:"几秒",m:"1 分钟",mm:"%d 分钟",h:"1 小时",hh:"%d 小时",d:"1 天",dd:"%d 天",M:"1 个月",MM:"%d 个月",y:"1 年",yy:"%d 年"},meridiem:function(e,t){var i=100*e+t;return i<600?"凌晨":i<900?"早上":i<1100?"上午":i<1300?"中午":i<1800?"下午":"晚上"}};return i.default.locale(r,null,!0),r}(we);var Se={exports:{}};Se.exports=function(){var e={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},t=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,i=/\d\d/,r=/\d\d?/,o=/\d*[^-_:/,()\s\d]+/,s={},a=function(e){return(e=+e)+(e>68?1900:2e3)},n=function(e){return function(t){this[e]=+t}},l=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),i=60*t[1]+(+t[2]||0);return 0===i?0:"+"===t[0]?-i:i}(e)}],d=function(e){var t=s[e];return t&&(t.indexOf?t:t.s.concat(t.f))},c=function(e,t){var i,r=s.meridiem;if(r){for(var o=1;o<=24;o+=1)if(e.indexOf(r(o,0,t))>-1){i=o>12;break}}else i=e===(t?"pm":"PM");return i},h={A:[o,function(e){this.afternoon=c(e,!1)}],a:[o,function(e){this.afternoon=c(e,!0)}],S:[/\d/,function(e){this.milliseconds=100*+e}],SS:[i,function(e){this.milliseconds=10*+e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[r,n("seconds")],ss:[r,n("seconds")],m:[r,n("minutes")],mm:[r,n("minutes")],H:[r,n("hours")],h:[r,n("hours")],HH:[r,n("hours")],hh:[r,n("hours")],D:[r,n("day")],DD:[i,n("day")],Do:[o,function(e){var t=s.ordinal,i=e.match(/\d+/);if(this.day=i[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r)}],M:[r,n("month")],MM:[i,n("month")],MMM:[o,function(e){var t=d("months"),i=(d("monthsShort")||t.map((function(e){return e.slice(0,3)}))).indexOf(e)+1;if(i<1)throw new Error;this.month=i%12||i}],MMMM:[o,function(e){var t=d("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[/[+-]?\d+/,n("year")],YY:[i,function(e){this.year=a(e)}],YYYY:[/\d{4}/,n("year")],Z:l,ZZ:l};function u(i){var r,o;r=i,o=s&&s.formats;for(var a=(i=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(t,i,r){var s=r&&r.toUpperCase();return i||o[r]||e[r]||o[s].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,i){return t||i.slice(1)}))}))).match(t),n=a.length,l=0;l<n;l+=1){var d=a[l],c=h[d],u=c&&c[0],p=c&&c[1];a[l]=p?{regex:u,parser:p}:d.replace(/^\[|\]$/g,"")}return function(e){for(var t={},i=0,r=0;i<n;i+=1){var o=a[i];if("string"==typeof o)r+=o.length;else{var s=o.regex,l=o.parser,d=e.slice(r),c=s.exec(d)[0];l.call(t,c),e=e.replace(c,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var i=e.hours;t?i<12&&(e.hours+=12):12===i&&(e.hours=0),delete e.afternoon}}(t),t}}return function(e,t,i){i.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(a=e.parseTwoDigitYear);var r=t.prototype,o=r.parse;r.parse=function(e){var t=e.date,r=e.utc,a=e.args;this.$u=r;var n=a[1];if("string"==typeof n){var l=!0===a[2],d=!0===a[3],c=l||d,h=a[2];d&&(h=a[2]),s=this.$locale(),!l&&h&&(s=i.Ls[h]),this.$d=function(e,t,i){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var r=u(t)(e),o=r.year,s=r.month,a=r.day,n=r.hours,l=r.minutes,d=r.seconds,c=r.milliseconds,h=r.zone,p=new Date,m=a||(o||s?1:p.getDate()),g=o||p.getFullYear(),f=0;o&&!s||(f=s>0?s-1:p.getMonth());var _=n||0,v=l||0,y=d||0,b=c||0;return h?new Date(Date.UTC(g,f,m,_,v,y,b+60*h.offset*1e3)):i?new Date(Date.UTC(g,f,m,_,v,y,b)):new Date(g,f,m,_,v,y,b)}catch(e){return new Date("")}}(t,n,r),this.init(),h&&!0!==h&&(this.$L=this.locale(h).$L),c&&t!=this.format(n)&&(this.$d=new Date("")),s={}}else if(n instanceof Array)for(var p=n.length,m=1;m<=p;m+=1){a[1]=n[m-1];var g=i.apply(this,a);if(g.isValid()){this.$d=g.$d,this.$L=g.$L,this.init();break}m===p&&(this.$d=new Date(""))}else o.call(this,e)}}}();var Me=ye(Se.exports),De={exports:{}};De.exports=function(e,t,i){e=e||{};var r=t.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function s(e,t,i,o){return r.fromToBase(e,t,i,o)}i.en.relativeTime=o,r.fromToBase=function(t,r,s,a,n){for(var l,d,c,h=s.$locale().relativeTime||o,u=e.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],p=u.length,m=0;m<p;m+=1){var g=u[m];g.d&&(l=a?i(t).diff(s,g.d,!0):s.diff(t,g.d,!0));var f=(e.rounding||Math.round)(Math.abs(l));if(c=l>0,f<=g.r||!g.r){f<=1&&m>0&&(g=u[m-1]);var _=h[g.l];n&&(f=n(""+f)),d="string"==typeof _?_.replace("%d",f):_(f,r,g.l,c);break}}if(r)return d;var v=c?h.future:h.past;return"function"==typeof v?v(d):v.replace("%s",d)},r.to=function(e,t){return s(e,t,this,!0)},r.from=function(e,t){return s(e,t,this)};var a=function(e){return e.$u?i.utc():i()};r.toNow=function(e){return this.to(a(this),e)},r.fromNow=function(e){return this.from(a(this),e)}};var Re=ye(De.exports);const Ae=/[/\\:*?"<>|]/g;function ke(e,t,i,r,o,s){const a=String(r||"").lastIndexOf("."),n=a>0?r.slice(a).toLowerCase():"",l=i||"YYYYMMDDHHmmss",d=function(e){return String(e||"").replace(Ae,"_").trim()}(o),c=d?`_${d}`:"";let h=xe(`${e} ${t}`,["YYYY-MM-DD HH:mm:ss","YYYY-MM-DD HH:mm"],!1);h.isValid()||(h=xe());const u=h.format(l);let p=`${u}${c}${n}`;if(s&&s.has(p)){let e=!1;if(h.add(1,"second").format(l)!==u)for(let t=0;t<60;t++)if(h=h.add(1,"second"),p=`${h.format(l)}${c}${n}`,!s.has(p)){e=!0;break}if(!e){let e=1;do{p=`${u}${c}_${e}${n}`,e++}while(s.has(p))}}return s&&s.add(p),{fileName:p,dateObj:h}}function Ce(e,t){const i=new Set,r=String(t?.target_path||"media-source://media_source/local").replace(/\/+$/,""),o=r.replace(/^media-source:\/\/media_source\//,"")||"local",s=t?.folder_format||"",a=t?.file_name_format||"YYYYMMDDHHmmss";return e.map((e=>{const{fileName:t,dateObj:n}=ke(e.dateStr,e.timeStr,a,e.file.name,e.note,i),l=s?n.format(s):"",d=l?`${r}/${l}`:r,c=l?`${o} / ${l} / ${t}`:`${o} / ${t}`;return{...e,targetFileName:t,folderName:l,targetDir:d,displayPath:c}}))}async function Ie(e,t,i,r,o){const s=t.replace(/\/+$/,"");if(!i||o)return s;const a=`${s}/${i}`;try{const t=await e.callWS({type:"media_source/browse_media",media_content_id:s});if((t?.children||[]).some((e=>"directory"===e.media_class&&String(e.title||"").replace(/\/$/,"")===i)))return a}catch{}if(!r||!r.includes(".")){const e=new Error(`目标日期目录「${i}」不存在，且未配置 upload.mkdir_service。请先在 HA 配置 shell_command，或点击下方「上传到根目录」。`);throw e.canFallbackToRoot=!0,e}const[n,l]=r.split(".",2);try{return await e.callService(n,l,{folder:i}),a}catch(d){const e=new Error(`创建目录「${i}」失败（${d?.message||"未知错误"}），可检查 shell_command 配置或改用根目录上传。`);throw e.canFallbackToRoot=!0,e}}async function Te(e,t,i){try{const r=await e.callWS({type:"media_source/browse_media",media_content_id:t}),o=new Set((r?.children||[]).filter((e=>"directory"!==e.media_class)).map((e=>String(e.title||"").toLowerCase())));if(!o.has(i.toLowerCase()))return i;const s=i.lastIndexOf("."),a=s>0?i.slice(0,s):i,n=s>0?i.slice(s):"";let l=1,d=`${a}_${l}${n}`;for(;o.has(d.toLowerCase());)l++,d=`${a}_${l}${n}`;return d}catch{return i}}async function Ee({hass:e,file:t,targetFileName:i,mediaContentId:r,onProgress:o,registerXhr:s}){e?.auth?.expired&&"function"==typeof e.auth.refreshAccessToken&&await e.auth.refreshAccessToken();const a=e?.auth?.data?.access_token;if(!a)throw new Error("未获取到有效的 Home Assistant 登录凭据，请刷新页面重试。");const n=new File([t],i,{type:t.type||"application/octet-stream"}),l=new FormData;return l.append("media_content_id",r),l.append("file",n),new Promise(((e,t)=>{const i=new XMLHttpRequest;s&&s(i),i.open("POST","/api/media_source/local_source/upload",!0),i.setRequestHeader("Authorization",`Bearer ${a}`),i.upload.onprogress=e=>{e.lengthComputable&&o&&o(Math.round(e.loaded/e.total*100))},i.onload=()=>{if(i.status>=200&&i.status<300)return void e(i.responseText);if(413===i.status)return void t(new Error("文件体积超出限制（HTTP 413）：Home Assistant 本地上传上限（20 MiB）或反向代理（Nginx client_max_body_size / Caddy request_body max_size）限制了上传大小。"));let r=i.statusText||`HTTP ${i.status}`;try{const e=JSON.parse(i.responseText);e?.message&&(r=e.message)}catch{}t(new Error(`上传失败（HTTP ${i.status}）：${r}`))},i.onerror=()=>t(new Error("网络异常，上传中断，请检查连接后重试。")),i.onabort=()=>t(new Error("UPLOAD_ABORTED")),i.send(l)}))}function Ye(e){const t=e._uploadState,i=e.config?.upload||{},r=t.open?Ce(t.items,i):[],o=i.accept||"video/*,image/*",s=xe().format("YYYY-MM-DD");return N`
    <dialog class="upload-dialog" @close="${e._handleUploadDialogClosed}" @cancel="${e._handleUploadDialogCancel}">
      ${t.open?N`
        <div class="dialog-header">
          <div class="dialog-title">
            <ha-icon icon="mdi:cloud-upload-outline"></ha-icon>
            <span>补传漏录视频 / 图片</span>
          </div>
          <button type="button" class="icon-button" @click="${e._closeUploadDialog}" ?disabled=${t.uploading} aria-label="关闭" title="关闭">
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
        </div>

        <div class="dialog-body">
          <div class="dropzone ${t.dragOver?"drag-over":""}"
            @click="${()=>e.shadowRoot?.querySelector(".upload-file-input")?.click()}"
            @dragover="${e._handleUploadDragOver}"
            @dragleave="${e._handleUploadDragLeave}"
            @drop="${e._handleUploadDrop}">
            <ha-icon icon="mdi:file-video-outline"></ha-icon>
            <div class="dropzone-text">点击选择或拖拽视频 / 图片到此处</div>
            <div class="dropzone-hint">支持批量选择，自动按规则命名并检测同名冲突</div>
            <input type="file" class="upload-file-input" multiple accept="${o}" @change="${e._handleUploadFileSelect}" hidden>
          </div>

          ${r.length>0?N`
            <div class="upload-queue">
              ${r.map(((i,r)=>{return N`
                <div class="upload-item">
                  <div class="upload-item-head">
                    <ha-icon icon="${i.file.type?.startsWith("image/")?"mdi:image-outline":"mdi:video-outline"}"></ha-icon>
                    <span class="upload-item-name" title="${i.file.name}">${i.file.name}</span>
                    <span class="upload-item-size">${o=i.file.size,!Number.isFinite(o)||o<0?"":o<1024?`${o} B`:o<1048576?`${(o/1024).toFixed(1)} KB`:`${(o/1048576).toFixed(1)} MB`}</span>
                    ${t.uploading?N``:N`
                      <button type="button" class="icon-button small" @click="${()=>e._removeUploadItem(r)}" aria-label="移除" title="移除">
                        <ha-icon icon="mdi:close"></ha-icon>
                      </button>
                    `}
                  </div>
                  <div class="upload-item-fields">
                    <label class="field-group">
                      <span>日期</span>
                      <input type="date" max="${s}" .value="${i.dateStr}" ?disabled=${t.uploading}
                        @change="${t=>e._updateUploadItem(r,{dateStr:t.target.value})}">
                    </label>
                    <label class="field-group">
                      <span>时间</span>
                      <input type="time" step="1" .value="${i.timeStr}" ?disabled=${t.uploading}
                        @change="${t=>e._updateUploadItem(r,{timeStr:t.target.value})}">
                    </label>
                    <label class="field-group field-note">
                      <span>备注（选填）</span>
                      <input type="text" placeholder="如：快递" maxlength="24" .value="${i.note}" ?disabled=${t.uploading}
                        @input="${t=>e._updateUploadItem(r,{note:t.target.value})}">
                    </label>
                  </div>
                  <div class="upload-item-preview">
                    <ha-icon icon="mdi:folder-arrow-right-outline"></ha-icon>
                    <span>${t.forceRoot?i.displayPath.replace(` / ${i.folderName} / `," / "):i.displayPath}</span>
                  </div>
                </div>
              `;var o}))}
            </div>
          `:N``}

          ${t.uploading?N`
            <div class="upload-progress-box">
              <div class="upload-progress-label">正在上传 (${t.completedCount+1}/${r.length})：${t.currentProgress}%</div>
              <div class="upload-progress-track">
                <div class="upload-progress-fill" style="width: ${t.currentProgress}%"></div>
              </div>
            </div>
          `:N``}

          ${t.error?N`
            <div class="upload-error" role="alert">
              <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
              <div class="upload-error-content">
                <div>${t.error}</div>
                ${t.canFallbackToRoot&&!t.forceRoot?N`
                  <button type="button" class="btn-secondary small" @click="${e._retryUploadToRoot}">改用根目录上传</button>
                `:N``}
              </div>
            </div>
          `:N``}
        </div>

        <div class="dialog-footer">
          ${t.uploading?N`
            <button type="button" class="btn-secondary" @click="${e._cancelActiveUpload}">取消上传</button>
          `:N`
            <button type="button" class="btn-secondary" @click="${e._closeUploadDialog}">取消</button>
            <button type="button" class="btn-primary" ?disabled=${0===r.length} @click="${e._startUpload}">
              开始上传${r.length>0?` (${r.length})`:""}
            </button>
          `}
        </div>
      `:N``}
    </dialog>
  `}const Oe=new Set(["responsive","right","left","bottom","top","hidden"]),ze=["周日","周一","周二","周三","周四","周五","周六"];xe.extend(Me),xe.extend(Re),xe.locale("zh-cn");class Pe extends se{static get properties(){return{config:{},resources:{type:Array},currentResourceIndex:{type:Number},selectedDate:{type:Object},_itemsToShow:{type:Number},_isDateFiltered:{type:Boolean},_isLoading:{type:Boolean},_isModalOpen:{type:Boolean},_slideshowRunning:{type:Boolean},_mediaAspect:{type:Number},_previewErrorIndex:{type:Number},_uploadState:{type:Object},_deleteTarget:{type:Object},_isDeleting:{type:Boolean},_deleteError:{type:String},_watchdogDismissedKey:{type:String},errors:{type:Array}}}constructor(){super(),this.resources=void 0,this.currentResourceIndex=0,this._itemsToShow=10,this.selectedDate=null,this._isDateFiltered=!1,this._isLoading=!1,this._isModalOpen=!1,this._slideshowRunning=!1,this._previewErrorIndex=void 0,this.errors=[],this._hasKeyNavigationListener=!1,this._keyNavigationHandler=e=>this._keyNavigation(e),this._touchStartListener={handleEvent:e=>this._handleTouchStart(e),passive:!0},this._touchMoveListener=e=>this._handleTouchMove(e),this._mediaResolveCache=new Map,this._mediaResolveInflight=new Map,this._queuedResolveIds=new Map,this._mediaResolveCacheMs=9e6,this._mediaBrowseCache=new Map,this._mediaBrowseInflight=new Map,this._browseCacheGeneration=0,this._loadToken=0,this._slideshowTimer=void 0,this._cameraEntityIds=[],this._videoDurations=new Map,this._uploadState={open:!1,items:[],dragOver:!1,uploading:!1,currentProgress:0,completedCount:0,error:"",canFallbackToRoot:!1,forceRoot:!1,lockedDate:null},this._activeUploadXhr=null,this._deleteTarget=null,this._isDeleting=!1,this._deleteError="",this._watchdogDismissedKey="",this._viewerPointers=new Map,this._viewerGesture=void 0,this._zoom={scale:1,x:0,y:0},this._lastViewerTap=0,this._suppressViewerClickUntil=0}render(){if(!this.config)return N``;const e=this.resources||[],t=e.length>0?this._currentResource():void 0,i="auto"===this.config.height?"height-auto":"height-fill",r="number"==typeof this.config.aspect_ratio?this.config.aspect_ratio:this._mediaAspect,o=["auto"===this.config.height||"viewport"===this.config.height?"":`--gallery-card-height: ${this.config.height};`,r?`--gallery-media-aspect: ${r};`:""].join(" "),s="hidden"===this.config.menu_alignment;return N`
      <ha-card class="menu-${this.config.menu_alignment} ${i}" style="${o}">
        <section class="stage">
          ${this._renderStage(t)}
          ${s?this._renderInfoBar(t):N``}
          ${s?this._renderWatchdogBanner():N``}
        </section>
        <aside class="timeline">
          ${s?N``:this._renderInfoBar(t)}
          ${s?N``:this._renderWatchdogBanner()}
          ${this._renderDateChips()}
          ${this.errors.length>0?N`<div class="error-list" role="status">
            ${this.errors.map((e=>N`<hui-warning>${e}</hui-warning>`))}
          </div>`:N``}
          <div class="resource-menu ${this._isTimelineGrouped(e)?"grouped":""}">
            ${this._isLoading?this._renderMenuLoadingState():0===e.length?N`<div class="menu-empty">${this._isDateFiltered?"这一天没有记录":"暂无媒体"}</div>`:this._renderTimelineItems(e)}
            ${!this._isLoading&&this._itemsToShow<e.length?N`<button type="button" class="load-more" @click="${this._loadMore}">加载更多（还有 ${e.length-this._itemsToShow} 项）</button>`:N``}
          </div>
        </aside>
        ${this._renderViewer(t)}
        ${Ye(this)}
        ${this._renderConfirmDialog()}
      </ha-card>
    `}_renderStage(e){const t=this.resources||[],i=this.config.show_reload?"媒体加载失败，请点击刷新后重试":"媒体加载失败，请检查媒体来源";let r;if(this._isLoading)r=this._renderLoadingState("正在加载媒体...");else if(e)r=e.resolveError||this._previewErrorIndex===this.currentResourceIndex?this._renderErrorState(i):e.pendingAuth?this._renderLoadingState("正在加载预览..."):e.isHass?N`<hui-image @click="${()=>this._popupCamera()}"
        .hass=${this._hass}
        .cameraImage=${e.name}
        .cameraView=${"live"}
        .fitMode=${"contain"}
      ></hui-image>`:this._isImageResource(e)?N`<img class="preview-image" @click="${()=>this._openViewer()}" @load="${e=>this._updateMediaAspect(e.target.naturalWidth,e.target.naturalHeight)}" @error="${()=>this._handlePreviewError()}" src="${e.url}" alt="${e.caption||e.name}"/>`:N`<video controls ?loop=${this.config.video_loop} ?autoplay=${this.config.video_autoplay&&!this._isModalOpen} .muted=${Boolean(this.config.video_muted)} data-resource-key="${this._getResourceKey(e)}" src="${e.url}#t=0.1" @error="${()=>this._handlePreviewError()}" @loadedmetadata="${e=>this._videoMetadataLoaded(e)}" @canplay="${e=>this._startVideo(e)}"
        @ended="${()=>this._videoHasEnded()}" preload="metadata" playsinline webkit-playsinline></video>`;else{const e=N`<div class="empty-actions">
        <button type="button" class="empty-action" @click="${()=>this._setDateFilter(null)}">查看全部</button>
        ${this._canUpload()?N`<button type="button" class="empty-action primary" @click="${()=>this._openUploadDialog(this.selectedDate)}">补传这一天的录像</button>`:N``}
      </div>`;r=this.errors.length>0?this._renderEmptyState(i):this._isDateFiltered?this._renderEmptyState("这一天没有记录",e):this._renderEmptyState("还没有图片或视频",this._canUpload()?N`<button type="button" class="empty-action primary" @click="${()=>this._openUploadDialog()}">补传录像</button>`:void 0)}return N`
      <div class="resource-viewer" @touchstart=${this._touchStartListener} @touchmove=${this._touchMoveListener}>
        <figure>${r}</figure>
        ${!this._isLoading&&t.length>1?N`<div class="viewer-nav">
          <button type="button" class="nav-icon-btn nav-left" @click="${()=>this._selectResource(this.currentResourceIndex-1)}" aria-label="上一个" title="上一个">
            <ha-icon icon="mdi:chevron-left"></ha-icon>
          </button>
          <button type="button" class="nav-icon-btn nav-right" @click="${()=>this._selectResource(this.currentResourceIndex+1)}" aria-label="下一个" title="下一个">
            <ha-icon icon="mdi:chevron-right"></ha-icon>
          </button>
        </div>`:N``}
      </div>
    `}_renderInfoBar(e){const t=(this.resources||[]).length,i=!this._isLoading&&Boolean(e),r=i?this._getResourceTitle(e):"",o=i&&e.date?this._formatRelativeTime(e.date):"";return N`
      <div class="info-bar">
        <div class="info-text ${r?"has-caption":""}">
          ${this.config.title?N`<span class="info-title">${this.config.title}</span>`:N``}
          ${r?N`<span class="info-caption">${r}</span>`:N``}
          ${o?N`<span class="info-relative">${o}</span>`:N``}
        </div>
        <div class="info-actions">
          ${i&&t>1?N`<span class="info-counter">${this.currentResourceIndex+1} / ${t}</span>`:N``}
          ${i&&t>1&&this._hasSlideshowTimer()?N`<button type="button" class="icon-button" @click="${this._toggleSlideshow}" aria-pressed="${this._slideshowRunning?"true":"false"}" aria-label="${this._slideshowRunning?"暂停幻灯片":"继续幻灯片"}" title="${this._slideshowRunning?"暂停幻灯片":"继续幻灯片"}">
            <ha-icon icon="${this._slideshowRunning?"mdi:pause-box-outline":"mdi:play-box-multiple-outline"}"></ha-icon>
          </button>`:N``}
          ${i?this._renderDownloadButton(e):N``}
          ${i&&this._canDelete(e)?N`<button type="button" class="icon-button danger" @click="${()=>this._openDeleteConfirm(e)}" aria-label="删除录像" title="删除录像">
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>`:N``}
          ${this._canUpload()?N`<button type="button" class="icon-button" @click="${()=>this._openUploadDialog()}" aria-label="补传录像" title="补传录像">
            <ha-icon icon="mdi:upload"></ha-icon>
          </button>`:N``}
          ${i?N`<button type="button" class="icon-button" @click="${()=>this._openViewer()}" aria-label="全屏查看" title="全屏查看">
            <ha-icon icon="mdi:fullscreen"></ha-icon>
          </button>`:N``}
          ${this.config.show_reload?N`<button type="button" class="icon-button btn-reload" @click="${this._reloadResources}" ?disabled=${this._isLoading} aria-label="刷新媒体" title="刷新媒体">
            <ha-icon class="${this._isLoading?"spinning":""}" icon="mdi:refresh"></ha-icon>
          </button>`:N``}
        </div>
      </div>
    `}_renderDownloadButton(e){if(e.isHass||e.pendingAuth||!e.url)return N``;const t=e.extension?`${e.name}.${e.extension}`:e.name;return N`<a class="icon-button" href="${e.url}" download="${t}" target="_blank" rel="noopener" aria-label="下载" title="下载">
      <ha-icon icon="mdi:download"></ha-icon>
    </a>`}_renderDateChips(){if(!this.config.enable_date_search)return N``;const e=xe().startOf("day"),t=this._isDateFiltered&&this.selectedDate?xe(this.selectedDate):void 0,i=Boolean(t?.isSame(e,"day")),r=Boolean(t?.isSame(e.subtract(1,"day"),"day")),o=Boolean(t)&&!i&&!r,s=(e,t,i)=>N`<button type="button" class="chip ${t?"active":""}" aria-pressed="${t?"true":"false"}" @click="${()=>this._setDateFilter(i)}">${e}</button>`,a=xe().format("YYYY-MM-DD"),n=this._formatDateForInput(this.selectedDate);return N`
      <div class="date-chips" role="toolbar" aria-label="按日期筛选">
        ${s("全部",!t,null)}
        ${s("今天",i,e)}
        ${s("昨天",r,e.subtract(1,"day"))}
        <label class="chip chip-date ${o?"active":""}">
          <ha-icon icon="mdi:calendar-month-outline"></ha-icon>
          <span>${o?this._formatMonthDay(t):"日期"}</span>
          <input type="date" class="date-picker" aria-label="选择日期" max="${a}" .value="${n}" @click="${this._openDatePicker}" @change="${this._handleDateChange}">
        </label>
        <input type="date" class="date-picker-anchor" aria-hidden="true" tabindex="-1" max="${a}" .value="${n}" @change="${this._handleDateChange}">
      </div>
    `}_isTimelineGrouped(e){return!this._isLoading&&!this.config.random_sort&&e.slice(0,this._itemsToShow).some((e=>e.date))}_renderTimelineItems(e){const t=e.slice(0,this._itemsToShow),i=this._isTimelineGrouped(e),r=i?this._countResourcesByDay(e):void 0,o=[];let s;return t.forEach(((e,t)=>{if(i){const i=this._getDayGroupKey(e);i!==s&&(o.push({key:`day:${t}:${i}`,group:i,resource:e}),s=i)}o.push({key:`${t}:${this._getResourceKey(e)}`,resource:e,index:t})})),ve(o,(e=>e.key),(e=>e.group?this._renderDayHeader(e.group,e.resource,r):this._renderThumbnail(e.resource,e.index,i)))}_renderDayHeader(e,t,i){const[r,o]="camera"===e?["摄像头",""]:"other"===e?["其他",""]:this._getDayLabelParts(t.date);return N`
      <div class="day-header">
        <span class="day-label"><span class="day-name">${r}</span>${o?N`<span class="day-date">${o}</span>`:N``}</span>
        <span class="day-count">${i.get(e)}</span>
      </div>
    `}_renderThumbnail(e,t,i){const r=e.caption||e.name||`媒体 ${t+1}`,o=this._getResourceTooltip(e)||r,s=t===this.currentResourceIndex,a=!e.isHass&&!this._isImageResource(e),n=a&&(this.config.show_duration??!0),l=n?this._videoDurations.get(this._getResourceKey(e)):void 0,d=e.date?xe().diff(e.date,"minute"):-1,c=" "===this.config.caption_format?"":i&&e.date&&!e.isHass?e.date.format("HH:mm"):e.caption;return N`
      <figure id="resource${t}" class="thumb ${s?"selected":""}" @click="${()=>this._selectResource(t)}" @keydown="${e=>this._handleResourceKeydown(e,t)}" tabindex="0" role="button" aria-current="${s?"true":"false"}" aria-label="${r}" title="${o}">
        <div class="thumb-media">
          ${this._renderThumbnailMedia(e,t)}
          ${a?N`<span class="video-badge"><ha-icon icon="mdi:play"></ha-icon>${n?N`<span class="duration">${l||""}</span>`:N``}</span>`:N``}
          ${d>=0&&d<60?N`<span class="new-dot" title="一小时内的新记录"></span>`:N``}
        </div>
        ${c?N`<figcaption>${c}</figcaption>`:N``}
      </figure>
    `}_renderThumbnailMedia(e,t){const i=!e.isHass&&!this._isImageResource(e);return e.pendingAuth?N`<div class="thumbnail-loading" data-resource-index="${t}">
        <div class="skeleton-media"></div>
      </div>`:e.resolveError||e.thumbnailError?N`<div class="thumbnail-error">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <span>加载失败</span>
      </div>`:e.isHass?N`<hui-image
        .hass=${this._hass}
        .cameraImage=${e.name}
        .cameraView=${"auto"}
        .fitMode=${"cover"}
      ></hui-image>`:i?this.config.video_preload??1?N`<video class="lzy_video" preload="metadata" data-resource-key="${this._getResourceKey(e)}" data-src="${e.url}#t=${void 0===this.config.preview_video_at?.1:this.config.preview_video_at}" @error="${()=>this._handleThumbnailError(e)}" @loadedmetadata="${e=>this._videoMetadataLoaded(e)}" muted playsinline></video>`:N`<div class="video-placeholder"><ha-icon icon="mdi:movie-play-outline"></ha-icon></div>`:N`<img class="lzy_img" data-src="${e.url}" @error="${()=>this._handleThumbnailError(e)}" alt="" decoding="async" draggable="false"/>`}_renderViewer(e){const t=this.resources||[],i=this._isModalOpen&&e,r=i&&e.date?this._formatRelativeTime(e.date):"";return N`
      <dialog class="viewer" @close="${this._handleModalClosed}" @cancel="${this._handleModalClosed}">
        ${i?N`
          <div class="viewer-top">
            <button type="button" class="icon-button" @click="${this._closeViewer}" aria-label="关闭" title="关闭"><ha-icon icon="mdi:close"></ha-icon></button>
            <div class="viewer-title">
              <span class="info-caption">${this._getResourceTitle(e)}</span>
              ${r?N`<span class="info-relative">${r}</span>`:N``}
            </div>
            ${t.length>1?N`<span class="info-counter">${this.currentResourceIndex+1} / ${t.length}</span>`:N``}
            ${this._canDelete(e)?N`<button type="button" class="icon-button danger" @click="${()=>this._openDeleteConfirm(e)}" aria-label="删除录像" title="删除录像"><ha-icon icon="mdi:delete-outline"></ha-icon></button>`:N``}
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
            ${t.length>1?N`<div class="viewer-nav">
              <button type="button" class="nav-icon-btn" @click="${()=>this._selectResource(this.currentResourceIndex-1)}" aria-label="上一个" title="上一个"><ha-icon icon="mdi:chevron-left"></ha-icon></button>
              <button type="button" class="nav-icon-btn" @click="${()=>this._selectResource(this.currentResourceIndex+1)}" aria-label="下一个" title="下一个"><ha-icon icon="mdi:chevron-right"></ha-icon></button>
            </div>`:N``}
          </div>
          ${t.length>1?N`<div class="viewer-strip">${this._renderViewerStrip()}</div>
            <div class="strip-tooltip" role="tooltip" hidden></div>`:N``}
        `:N``}
      </dialog>
    `}_renderViewerMedia(e){return e.pendingAuth?this._renderLoadingState("正在加载..."):e.resolveError?this._renderErrorState("媒体加载失败"):e.isHass?N`<hui-image class="viewer-media" .hass=${this._hass} .cameraImage=${e.name} .cameraView=${"auto"} .fitMode=${"contain"}></hui-image>`:this._isImageResource(e)?N`<img class="viewer-media" src="${e.url}" alt="${e.caption||e.name}" draggable="false">`:N`<video class="viewer-media" controls autoplay .muted=${Boolean(this.config.video_muted)} ?loop=${this.config.video_loop} src="${e.url}" playsinline webkit-playsinline></video>`}_renderViewerStrip(){const e=this.resources||[],t=this.currentResourceIndex,i=!this.config.random_sort&&e.some((e=>e.date)),r=[];let o;for(let s=Math.max(0,t-15);s<Math.min(e.length,t+16);s++){const t=i?this._getDayGroupKey(e[s]):void 0;i&&t!==o&&(r.push({key:`day:${s}:${t}`,group:t,resource:e[s]}),o=t),r.push({key:`${s}:${this._getResourceKey(e[s])}`,index:s})}return ve(r,(e=>e.key),(e=>e.group?this._renderStripDay(e.group,e.resource):this._renderStripItem(e.index)))}_renderStripDay(e,t){const[i,r]="camera"===e?["摄像头",""]:"other"===e?["其他",""]:[this._getDayLabelParts(t.date)[0],t.date.format("M/D")];return N`
      <div class="strip-day" aria-hidden="true">
        <span>${i}</span>
        ${r?N`<span class="strip-day-date">${r}</span>`:N``}
      </div>
    `}_renderStripItem(e){const t=this.resources,i=this.currentResourceIndex;return N`
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
    `}_renderLoadingState(e){return N`
      <div class="loading-state" role="status" aria-live="polite">
        <div class="loading-spinner"></div>
        <div class="loading-label">${e}</div>
      </div>
    `}_renderEmptyState(e,t){return N`
      <div class="empty-state">
        <ha-icon icon="mdi:image-off-outline"></ha-icon>
        <div class="empty-label">${e}</div>
        ${t||N``}
      </div>
    `}_renderErrorState(e){return N`
      <div class="empty-state error-state" role="alert">
        <ha-icon icon="mdi:alert-circle-outline"></ha-icon>
        <div class="empty-label">${e}</div>
      </div>
    `}_renderMenuLoadingState(){const e=Math.min(this._itemsToShow||10,10);return Array.from({length:e},(()=>N`
      <figure class="thumb resource-skeleton" aria-hidden="true">
        <div class="thumb-media"><div class="skeleton-media"></div></div>
        <div class="skeleton-caption"></div>
      </figure>
    `))}_getResourceTooltip(e){if(!e?.date)return e?.caption||"";const t=this._formatRelativeTime(e.date);return`${this._formatMonthDay(e.date)} ${e.date.format("HH:mm:ss")}${t?` · ${t}`:""}`}_getResourceTitle(e){return e.caption?e.caption:e.date?e.date.format("M月D日 HH:mm:ss"):e.name}_getDayGroupKey(e){return e.isHass?"camera":e.date?e.date.format("YYYY-MM-DD"):"other"}_countResourcesByDay(e){const t=new Map;for(const i of e){const e=this._getDayGroupKey(i);t.set(e,(t.get(e)||0)+1)}return t}_formatMonthDay(e){const t=xe(e);return t.year()===xe().year()?t.format("M月D日"):t.format("YYYY年M月D日")}_getDayLabelParts(e){const t=xe(e).startOf("day"),i=xe().startOf("day").diff(t,"day");return[0===i?"今天":1===i?"昨天":ze[t.day()],this._formatMonthDay(t)]}_formatRelativeTime(e){const t=xe(),i=t.diff(e,"minute");if(i<0)return"";if(i<1)return"刚刚";if(i<60)return`${i} 分钟前`;if(i<1440)return`${Math.floor(i/60)} 小时前`;const r=t.startOf("day").diff(xe(e).startOf("day"),"day");return 1===r?"昨天":r<7?`${r} 天前`:""}connectedCallback(){super.connectedCallback(),this._createImageObserver(),void 0!==this.resources&&this._addKeyNavigationListener(),this.config&&this._doSlideShow(!0),this._clockTimer??=setInterval((()=>{document.hidden||this.requestUpdate()}),6e4),this.requestUpdate()}updated(){this._createImageObserver();const e=this.shadowRoot.querySelectorAll("img.lzy_img[data-src], video.lzy_video[data-src], .thumbnail-loading[data-resource-index]");for(const i of e)this.imageObserver.observe(i);this._loadMoreObserver??=new IntersectionObserver((e=>{e.some((e=>e.isIntersecting))&&this._loadMore()})),this._loadMoreObserver.disconnect();const t=this.shadowRoot.querySelector(".load-more");t&&this._loadMoreObserver.observe(t)}_createImageObserver(){this.imageObserver||(this.imageObserver=new IntersectionObserver((e=>{const t=[];for(const i of e)if(i.isIntersecting){const e=i.target;if(void 0!==e.dataset.resourceIndex){const i=Number.parseInt(e.dataset.resourceIndex),r=this.resources?.[i];r?.pendingAuth&&r.mediaContentId&&t.push(r)}else e.dataset.src&&(e.src=e.dataset.src,"VIDEO"===e.tagName&&e.load(),delete e.dataset.src);this.imageObserver.unobserve(e)}if(t.length>0){const e=new Map(t.map((e=>[e.mediaContentId,e])));this._resolvePendingResourceBatch([...e.values()],this._hass,this._loadToken)}})))}setConfig(e){if(!e||!e.entity&&!e.entities)throw new Error("Required configuration for entities is missing");const t=(Array.isArray(e.entities)?e.entities:e.entities?[e.entities]:[]).map((e=>"object"==typeof e?{...e}:e));if(e.entity&&t.push(e.entity),0===t.length)throw new Error("At least one entity or media source is required");const i=String(e.menu_alignment||"responsive").toLowerCase(),r=Number.parseInt(e.items_per_page),o=Number(e.browse_cache_seconds),s=Number.parseInt(e.media_cache_size),a=Number.parseInt(e.resolve_concurrency),n=Number.parseInt(e.date_search_adjacent_days),l=Number.parseInt(e.slideshow_timer),d=JSON.stringify(this.config?.entities||[]),c={...e};delete c.entity;const h=t.map((e=>"object"==typeof e?e.path:e)).find((e=>"string"==typeof e&&e.startsWith("media-source://media_source/local")))||"media-source://media_source/local",u=e.upload?{enabled:Boolean(e.upload.enabled),allow_delete:!1!==e.upload.allow_delete,target_path:String(e.upload.target_path||h).replace(/\/+$/,""),folder_format:void 0!==e.upload.folder_format?this._convertOldFormat(e.upload.folder_format):this._convertOldFormat(e.folder_format)||this._convertOldFormat(e.search_date_folder_format)||"",file_name_format:this._convertOldFormat(e.upload.file_name_format||e.file_name_format)||"YYYYMMDDHHmmss",mkdir_service:String(e.upload.mkdir_service||"").trim(),accept:String(e.upload.accept||"video/*,image/*").trim()}:{enabled:!1},p=Number(e.watchdog?.timeout_hours),m=e.watchdog?{enabled:Boolean(e.watchdog.enabled),timeout_hours:Number.isFinite(p)&&p>0?p:24,stale_entity:String(e.watchdog.stale_entity||"").trim(),error_entity:String(e.watchdog.error_entity||"").trim(),toggle_entity:String(e.watchdog.toggle_entity||"").trim()}:{enabled:!1};this.config={...c,entities:t,upload:u,watchdog:m,menu_alignment:Oe.has(i)?i:"responsive",items_per_page:Number.isFinite(r)&&r>0?r:10,browse_cache_seconds:Number.isFinite(o)&&o>=0?o:20,media_cache_size:Number.isFinite(s)&&s>0?s:500,resolve_concurrency:Number.isFinite(a)&&a>0?Math.min(a,8):4,date_search_adjacent_days:Number.isFinite(n)&&n>=0?Math.min(n,7):1,height:this._normalizeHeight(e.height),aspect_ratio:this._normalizeAspectRatio(e.aspect_ratio)},this._slideshowRunning=Number.isFinite(l)&&l>0,this._mediaAspect=this._readStoredMediaAspect(),this._mediaAspectMeasured=!1,d!==JSON.stringify(t)&&this._clearBrowseCache(),this._itemsToShow=this.config.items_per_page,this._previewErrorIndex=void 0,void 0!==this._hass&&this._loadResources(this._hass),this._doSlideShow(!0)}_normalizeHeight(e){if("number"==typeof e&&e>0)return`${e}px`;const t=String(e??"").trim();return t&&"viewport"!==t.toLowerCase()?"auto"===t.toLowerCase()?"auto":/^\d+(\.\d+)?$/.test(t)?`${t}px`:/^[\w\s().%+*/-]+$/.test(t)?t:"viewport":"viewport"}_normalizeAspectRatio(e){const t=String(e??"").trim().match(/^(\d+(?:\.\d+)?)\s*(?:[:/]\s*(\d+(?:\.\d+)?))?$/),i=t?Number(t[1])/Number(t[2]||1):Number.NaN;return Number.isFinite(i)&&i>0?Math.min(Math.max(i,.5),2.4):"auto"}set hass(e){const t=this._hass;this._hass=e,this.config&&(void 0===this.resources?this._loadResources(e):this._haveWatchedEntitiesChanged(t,e)&&this.requestUpdate())}get hass(){return this._hass}_haveWatchedEntitiesChanged(e,t){if(this._cameraEntityIds.some((i=>e?.states[i]!==t?.states[i])))return!0;const i=this.config?.watchdog;if(!i?.enabled)return!1;return[i.stale_entity,i.error_entity,i.toggle_entity].filter(Boolean).some((i=>e?.states[i]!==t?.states[i]))}disconnectedCallback(){super.disconnectedCallback(),this.shadowRoot?.querySelector(".resource-viewer video")?.pause(),this._activeUploadXhr?.abort(),this._activeUploadXhr=null,this._removeKeyNavigationListener(),this._clearSlideshowTimer(),this._closeViewer(),clearInterval(this._clockTimer),this._clockTimer=void 0,this.imageObserver?.disconnect(),this._loadMoreObserver?.disconnect()}getCardSize(){return 12}getGridOptions(){return{columns:"full",min_columns:6}}static getStubConfig(){return{entities:[{path:"media-source://media_source/local",recursive:!0}],menu_alignment:"responsive"}}_isImageExtension(e){return"string"==typeof e&&/^(?:jpeg|jpg|gif|png|tiff|bmp|webp|avif)$/i.test(e)}_isImageResource(e){return e?.mediaType?"image"===e.mediaType:this._isImageExtension(e?.extension)}_getResourceKey(e){return e?.mediaContentId||e?.url||""}_patchResource(e,t){const i=this._getResourceKey(e);i&&this.resources&&(this.resources=this.resources.map((e=>this._getResourceKey(e)===i?{...e,...t}:e)))}_doSlideShow(e){this._clearSlideshowTimer(),this._slideshowRunning&&(e||this._isPreviewVideoPlaying()||this._selectResource(this.currentResourceIndex+1,!0),this.isConnected&&this._hasSlideshowTimer()&&(this._slideshowTimer=setTimeout((()=>{this._doSlideShow()}),1e3*Number.parseInt(this.config.slideshow_timer))))}_hasSlideshowTimer(){const e=Number.parseInt(this.config?.slideshow_timer);return Number.isFinite(e)&&e>0}_toggleSlideshow(){this._slideshowRunning=!this._slideshowRunning,this._doSlideShow(!0)}_isPreviewVideoPlaying(){if(!this.config.slideshow_video_end)return!1;const e=this.shadowRoot?.querySelector(".resource-viewer video");return Boolean(e&&!e.paused&&!e.ended)}_clearSlideshowTimer(){this._slideshowTimer&&(clearTimeout(this._slideshowTimer),this._slideshowTimer=void 0)}_loadMore(){const e=this.config.items_per_page;this._itemsToShow=Math.min(this._itemsToShow+e,this.resources.length)}_selectResource(e,t){if(!this.resources||0===this.resources.length)return;let i=Number.isFinite(e)?e:0;i<0?i=this.resources.length-1:i>=this.resources.length&&(i=0),i>=this._itemsToShow&&(this._itemsToShow=Math.min(i+this.config.items_per_page,this.resources.length)),this.currentResourceIndex=i,this._previewErrorIndex=void 0;const r=this.resources[this.currentResourceIndex];this._pendingAutoplayKey=this.config.video_autoplay?this._getResourceKey(r):void 0,(r.resolveError||r.thumbnailError)&&r.mediaContentId?(this._mediaResolveCache.delete(r.mediaContentId),this._patchResource(r,{pendingAuth:!0,resolveError:!1,thumbnailError:!1})):r.thumbnailError&&this._patchResource(r,{thumbnailError:!1}),this._resolveResourceUrl(this.resources[this.currentResourceIndex]),this._resolveResourceUrl(this.resources[(i+1)%this.resources.length]),this._resolveResourceUrl(this.resources[(i-1+this.resources.length)%this.resources.length]),!t&&this._slideshowTimer&&this._doSlideShow(!0);const o=this.currentResourceIndex;this._resetZoom(),this.updateComplete.then((()=>{this._scrollThumbnailIntoView(o),this._scrollStripItemIntoView(o)}))}_scrollThumbnailIntoView(e){e===this.currentResourceIndex&&this._scrollWithin(this.shadowRoot?.querySelector(".resource-menu"),this.shadowRoot?.querySelector(`#resource${e}`))}_scrollStripItemIntoView(e){const t=this.shadowRoot?.querySelector(".viewer-strip"),i=this.shadowRoot?.querySelector(`#strip${e}`);if(e!==this.currentResourceIndex||!this._isModalOpen||!t||!i)return;const r=t.getBoundingClientRect(),o=i.getBoundingClientRect(),s=o.left+o.width/2-(r.left+r.width/2);Math.abs(s)>1&&t.scrollTo({left:t.scrollLeft+s,behavior:"smooth"})}_scrollWithin(e,t){if(!e||!t)return;const i=e.getBoundingClientRect(),r=t.getBoundingClientRect(),o=e.querySelector(".day-header"),s=(o?.offsetHeight??0)+12,a=(o?.offsetWidth??0)+12;let n=e.scrollTop,l=e.scrollLeft;e.scrollHeight>e.clientHeight&&(r.top<i.top+s?n+=r.top-i.top-s:r.bottom>i.bottom&&(n+=r.bottom-i.bottom+12)),e.scrollWidth>e.clientWidth&&(r.left<i.left+a?l+=r.left-i.left-a:r.right>i.right&&(l+=r.right-i.right+12)),n===e.scrollTop&&l===e.scrollLeft||e.scrollTo({top:n,left:l,behavior:"smooth"})}_currentResource(){return this.resources?.[this.currentResourceIndex]}_updateMediaAspect(e,t){if(this._mediaAspectMeasured||!e||!t)return;const i=Math.round(1e3*Math.min(Math.max(e/t,1),2.4))/1e3;if(this._mediaAspectMeasured=!0,!(this._mediaAspect&&Math.abs(this._mediaAspect-i)<=.01)){this._mediaAspect=i;try{localStorage.setItem(this._getAspectStorageKey(),String(i))}catch{}}}_getAspectStorageKey(){return`gallery-card-aspect:${JSON.stringify(this.config.entities)}`}_readStoredMediaAspect(){try{const e=Number(localStorage.getItem(this._getAspectStorageKey()));return e>=1&&e<=2.4?e:void 0}catch{return}}_startVideo(e){if(!this.config.video_autoplay||this._isModalOpen)return;const t=e.target,i=t.dataset?.resourceKey||"";if(!this._pendingAutoplayKey||i!==this._pendingAutoplayKey)return;this._pendingAutoplayKey=void 0,t.muted=Boolean(this.config.video_muted);const r=t.play();r&&"function"==typeof r.catch&&r.catch((()=>{if(!t.muted){t.muted=!0;const e=t.play();e&&"function"==typeof e.catch&&e.catch((()=>{}))}}))}_videoMetadataLoaded(e){const t=e.target,i=t.dataset?.resourceKey||this._getResourceKey(this._currentResource());if(t.closest(".resource-viewer")&&this._updateMediaAspect(t.videoWidth,t.videoHeight),Number.isFinite(t.duration)&&i){const e=this._getFormattedVideoDuration(t.duration);this._videoDurations.get(i)!==e&&(this._videoDurations.set(i,e),this.requestUpdate())}this.config.video_muted&&(t.muted=!0)}_videoHasEnded(){this.config.slideshow_video_end&&(this._selectResource(this.currentResourceIndex+1,!0),this._doSlideShow(!0))}_popupCamera(){const e=new Event("hass-more-info",{bubbles:!0,composed:!0});e.detail={entityId:this._currentResource()?.name},this.dispatchEvent(e)}_openViewer(){const e=this.shadowRoot.querySelector("dialog.viewer");e&&!e.open&&(this.shadowRoot.querySelector(".resource-viewer video")?.pause(),this._resetZoom(),this._isModalOpen=!0,e.showModal(),this.updateComplete.then((()=>this._scrollStripItemIntoView(this.currentResourceIndex))))}_closeViewer(){this._hideStripTooltip();const e=this.shadowRoot?.querySelector("dialog.viewer");e?.open&&e.close(),this._isModalOpen=!1}_handleModalClosed(){this._isModalOpen=!1}_handleStripPointerEnter(e,t){"mouse"===e.pointerType&&this._showStripTooltip(e.currentTarget,t)}_handleStripPointerDown(e,t){if(this._stripLongPressed=!1,"mouse"===e.pointerType)return;const i=e.currentTarget;clearTimeout(this._stripPressTimer),this._stripPressTimer=setTimeout((()=>{this._stripLongPressed=!0,this._showStripTooltip(i,t)}),400)}_handleStripPointerUp(e){clearTimeout(this._stripPressTimer),"mouse"!==e.pointerType&&this._hideStripTooltip()}_handleStripClick(e){this._stripLongPressed?this._stripLongPressed=!1:this._selectResource(e)}_showStripTooltip(e,t){const i=this.shadowRoot.querySelector(".strip-tooltip"),r=this.shadowRoot.querySelector("dialog.viewer"),o=this._getResourceTooltip(this.resources?.[t]);if(!i||!r||!o)return;i.textContent=o,i.hidden=!1;const s=e.getBoundingClientRect(),a=r.getBoundingClientRect(),n=i.offsetWidth/2,l=s.left+s.width/2-a.left;i.style.left=`${Math.min(Math.max(l,n+8),a.width-n-8)}px`,i.style.top=s.top-a.top-8+"px"}_hideStripTooltip(){clearTimeout(this._stripPressTimer);const e=this.shadowRoot?.querySelector(".strip-tooltip");e&&(e.hidden=!0)}_handleViewerStageClick(e){Date.now()<this._suppressViewerClickUntil||(e.target===e.currentTarget||e.target.classList.contains("zoom-layer"))&&this._closeViewer()}_handleViewerPointerDown(e){if(!("mouse"===e.pointerType&&0!==e.button||e.target.closest("button, video"))){this._viewerPointers.set(e.pointerId,{x:e.clientX,y:e.clientY});try{e.currentTarget.setPointerCapture(e.pointerId)}catch{}if(e.currentTarget.classList.add("gesturing"),1===this._viewerPointers.size)this._viewerGesture={startX:e.clientX,startY:e.clientY,originX:this._zoom.x,originY:this._zoom.y,moved:!1};else if(2===this._viewerPointers.size){const[e,t]=[...this._viewerPointers.values()];this._viewerGesture={pinch:!0,startDistance:Math.hypot(e.x-t.x,e.y-t.y)||1,startScale:this._zoom.scale,moved:!0}}}}_handleViewerPointerMove(e){if(!this._viewerPointers.has(e.pointerId)||!this._viewerGesture)return;this._viewerPointers.set(e.pointerId,{x:e.clientX,y:e.clientY});const t=this._viewerGesture;if(t.pinch){if(this._viewerPointers.size<2)return;const[e,i]=[...this._viewerPointers.values()],r=Math.hypot(e.x-i.x,e.y-i.y);return void this._setZoom(t.startScale*r/t.startDistance)}const i=e.clientX-t.startX,r=e.clientY-t.startY;(Math.abs(i)>6||Math.abs(r)>6)&&(t.moved=!0),this._zoom.scale>1&&(this._zoom.x=t.originX+i,this._zoom.y=t.originY+r,this._applyZoom())}_handleViewerPointerUp(e){if(!this._viewerPointers.has(e.pointerId))return;this._viewerPointers.delete(e.pointerId);const t=this._viewerGesture;if(this._viewerPointers.size>0){const[e]=[...this._viewerPointers.values()];return void(this._viewerGesture={startX:e.x,startY:e.y,originX:this._zoom.x,originY:this._zoom.y,moved:!0})}if(e.currentTarget.classList.remove("gesturing"),this._viewerGesture=void 0,!t)return;if(t.moved&&(this._suppressViewerClickUntil=Date.now()+400),t.pinch)return;const i=e.clientX-t.startX,r=e.clientY-t.startY;if(t.moved)this._zoom.scale>1||(Math.abs(i)>50&&Math.abs(i)>Math.abs(r)?this._selectResource(this.currentResourceIndex+(i<0?1:-1)):r>80&&r>Math.abs(i)&&this._closeViewer());else{const t=Date.now();t-this._lastViewerTap<300?(this._lastViewerTap=0,this._suppressViewerClickUntil=Date.now()+400,this._toggleZoomAt(e.clientX,e.clientY,e.currentTarget)):this._lastViewerTap=t}}_handleViewerWheel(e){this._isImageResource(this._currentResource())&&(e.preventDefault(),this._setZoom(this._zoom.scale*Math.exp(.0015*-e.deltaY)))}_toggleZoomAt(e,t,i){if(!this._isImageResource(this._currentResource()))return;if(this._zoom.scale>1)return void this._resetZoom();const r=i.getBoundingClientRect();this._zoom={scale:2.5,x:1.5*(r.left+r.width/2-e),y:1.5*(r.top+r.height/2-t)},this._applyZoom()}_setZoom(e){const t=Math.min(Math.max(e,1),5);if(!this._isImageResource(this._currentResource()))return;const i=t/this._zoom.scale;this._zoom={scale:t,x:this._zoom.x*i,y:this._zoom.y*i},this._applyZoom()}_resetZoom(){this._zoom={scale:1,x:0,y:0},this._applyZoom()}_applyZoom(){const e=this.shadowRoot?.querySelector(".viewer .zoom-layer");if(!e)return;const t=(this._zoom.scale-1)*e.offsetWidth/2,i=(this._zoom.scale-1)*e.offsetHeight/2;this._zoom.x=Math.min(Math.max(this._zoom.x,-t),t),this._zoom.y=Math.min(Math.max(this._zoom.y,-i),i),e.style.transform=1===this._zoom.scale?"":`translate(${this._zoom.x}px, ${this._zoom.y}px) scale(${this._zoom.scale})`}_reloadResources(){this._mediaResolveCache.clear(),this._clearBrowseCache(),this._previewErrorIndex=void 0,this._loadResources(this._hass)}_clearBrowseCache(){this._browseCacheGeneration++,this._mediaBrowseCache.clear(),this._mediaBrowseInflight.clear()}_handlePreviewError(){const e=this._currentResource();if(e)return e.mediaContentId&&!e.resolveRetried?(this._mediaResolveCache.delete(e.mediaContentId),this._patchResource(e,{pendingAuth:!0,resolveError:!1,resolveRetried:!0}),void this._resolveResourceUrl(this._currentResource())):void(this._previewErrorIndex=this.currentResourceIndex)}_handleThumbnailError(e){if(e.mediaContentId&&!e.thumbnailRetried)return this._mediaResolveCache.delete(e.mediaContentId),this._patchResource(e,{pendingAuth:!0,thumbnailRetried:!0}),void this._resolveResourceUrl({...e,pendingAuth:!0});this._patchResource(e,{thumbnailError:!0})}_handleResourceKeydown(e,t){"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._selectResource(t))}_getFormattedVideoDuration(e){const t=Math.floor(e),i=Math.floor(t/3600),r=Math.floor(t%3600/60),o=String(t%60).padStart(2,"0");return i>0?`${i}:${String(r).padStart(2,"0")}:${o}`:`${r}:${o}`}_keyNavigation(e){if(this._uploadState?.open||this._deleteTarget)return;const t=e.composedPath()[0],i=t?.isContentEditable||["INPUT","TEXTAREA","SELECT","VIDEO"].includes(t?.tagName);if(!e.defaultPrevented&&!i&&(this._isModalOpen||this.matches(":hover")||this.shadowRoot.activeElement))switch(e.code){case"ArrowDown":case"ArrowRight":e.preventDefault(),this._selectResource(this.currentResourceIndex+1);break;case"ArrowUp":case"ArrowLeft":e.preventDefault(),this._selectResource(this.currentResourceIndex-1)}}_handleTouchStart(e){this.xDown=e.touches[0].clientX,this.yDown=e.touches[0].clientY}_handleTouchMove(e){if(void 0===this.xDown||void 0===this.yDown)return;const t=e.touches[0].clientX,i=e.touches[0].clientY,r=this.xDown-t,o=this.yDown-i;let s=!1;Math.abs(r)>=40&&Math.abs(r)>Math.abs(o)?(r>0?(this._selectResource(this.currentResourceIndex+1),e.preventDefault()):(this._selectResource(this.currentResourceIndex-1),e.preventDefault()),s=!0):Math.abs(o)>=40&&(s=!0),s&&(this.xDown=void 0,this.yDown=void 0)}_handleDateChange(e){this._setDateFilter(e.target.value?xe(e.target.value):null)}_openDatePicker(e){const t=this.shadowRoot?.querySelector(".date-chips"),i=e.currentTarget.closest(".chip-date"),r=t?.querySelector(".date-picker-anchor");if(r&&"function"==typeof r.showPicker&&t&&i){const o=t.getBoundingClientRect(),s=i.getBoundingClientRect(),a=300,n=12,l=s.left+a-(window.innerWidth-n),d=l>0?Math.max(n,s.left-l):s.left,c=Math.max(0,d-o.left+t.scrollLeft);r.style.left=`${c}px`;try{return e.preventDefault(),void r.showPicker()}catch{}}}_setDateFilter(e){this.selectedDate=e?xe(e).startOf("day").toDate():null,this._isDateFiltered=null!==this.selectedDate,this._loadResources(this._hass)}_convertOldFormat(e){return e&&"string"==typeof e?e.replace(/%YYY/g,"YYYY").replace(/%Y/g,"YYYY").replace(/%m/g,"MM").replace(/%d/g,"DD").replace(/%H/g,"HH").replace(/%M/g,"mm").replace(/%S/g,"ss"):e}async _loadResources(e){if(!e||!this.config)return;const t=++this._loadToken;this._isLoading=!0,this.currentResourceIndex=void 0,this.resources=[],this.errors=[],this._previewErrorIndex=void 0,this._itemsToShow=this.config.items_per_page,this._cameraEntityIds=[];const i=(this.config.enable_date_search??!1)&&this._isDateFiltered,r=Number(this.config.maximum_files),o=Number.isFinite(r)&&r>0?Math.floor(r):void 0,s=this.config.maximum_files_per_entity??!0,a=s?void 0:o,n=this._convertOldFormat(this.config.folder_format),l=this._convertOldFormat(this.config.file_name_format),d=this.config.file_name_date_begins,c=this._convertOldFormat(this.config.caption_format),h=this.config.parsed_date_sort??!1,u=this.config.reverse_sort??!0,p=this.config.random_sort??!1,m=s||!h&&!p?o:void 0,g=()=>{const t=[];for(const r of this.config.entities){let o,s=!1,a=!0,h=!0,p=n,g=l,f=d,_=c;if(r&&"object"==typeof r?(o=r.path,r.recursive&&(s=r.recursive),void 0!==r.include_video&&(a=r.include_video),void 0!==r.include_images&&(h=r.include_images),r.folder_format&&(p=this._convertOldFormat(r.folder_format)),r.file_name_format&&(g=this._convertOldFormat(r.file_name_format)),r.file_name_date_begins&&(f=r.file_name_date_begins),r.caption_format&&(_=this._convertOldFormat(r.caption_format))):o=r,"string"==typeof o&&o.trim())if("media-source://"===o.substring(0,15).toLowerCase())t.push(this._loadMediaResource(e,o,m,p,g,f,_,s,u,a,h,i));else{const r=e.states[o];void 0===r?t.push(Promise.resolve({error:!0,entity:o,message:"Invalid Entity ID"})):(void 0!==r.attributes.entity_picture&&t.push(this._loadCameraResource(o,r)),void 0!==r.attributes.fileList&&t.push(this._loadFilesResources(r.attributes.fileList,m,g,f,_,u,i)),void 0!==r.attributes.file_list&&t.push(this._loadFilesResources(r.attributes.file_list,m,g,f,_,u,i)))}else t.push(Promise.resolve({error:!0,entity:String(o||"未配置来源"),message:"Invalid media source"}))}return t};try{const r=await Promise.all(g());if(t!==this._loadToken)return;let o=r.filter((e=>!e.error)).flat(Number.POSITIVE_INFINITY);if(i&&(o=this._filterResourcesForSelectedDate(o)),h){const e=e=>e.date?e.date.valueOf():0,t=u?-1:1;o.sort(((i,r)=>(e(i)-e(r))*t))}if(p)for(let e=o.length-1;e>0;e--){const t=Math.floor(Math.random()*(e+1));e!==t&&([o[e],o[t]]=[o[t],o[e]])}if(void 0!==a&&a<o.length){let e=o.filter((e=>e.isHass)).length;o=o.filter((t=>t.isHass||e++<a))}this.resources=o,this._cameraEntityIds=o.filter((e=>e.isHass)).map((e=>e.name)),this.currentResourceIndex=0,this._pendingAutoplayKey=this.config.video_autoplay&&this.resources.length>0?this._getResourceKey(this.resources[0]):void 0,this._resolveResourceUrl(this.resources[0]),this._addKeyNavigationListener(),this.updateComplete.then((()=>this._scrollThumbnailIntoView(0)));const s=r.filter((e=>e.error)).flat(Number.POSITIVE_INFINITY);this.errors=s.map((e=>e.message+" "+e.entity));for(const t of s)Promise.resolve(e.callService("system_log","write",{message:"Gallery Card Error:  "+t.message+"   "+t.entity})).catch((()=>{}))}catch(f){t===this._loadToken&&(this.resources=[],this.currentResourceIndex=0,this.errors=[f?.message||"Unknown gallery loading error"]),console.error("Gallery Card failed to load resources",f)}finally{t===this._loadToken&&(this._isLoading=!1)}}_addKeyNavigationListener(){this._hasKeyNavigationListener||!this.isConnected||this.parentNode&&this.parentNode.tagName&&"hui-card-preview"===this.parentNode.tagName.toLowerCase()||(document.addEventListener("keydown",this._keyNavigationHandler),this._hasKeyNavigationListener=!0)}_removeKeyNavigationListener(){this._hasKeyNavigationListener&&(document.removeEventListener("keydown",this._keyNavigationHandler),this._hasKeyNavigationListener=!1)}async _loadMediaResource(e,t,i,r,o,s,a,n,l,d,c,h){let u=t;try{let p=[];const m=h&&Boolean(o),g=m&&this.config.date_search_adjacent_days>0,f=m?void 0:i;if(!h&&r&&l&&void 0!==i&&!Number.isNaN(i)){const o=t.replace(/\/+$/,""),s=await this._fetchMediaContents(e,o),a=s?.children||[],n=a.filter((e=>this._shouldIncludeMediaItem(this,e,!1,d,c,!1,!1))).map((e=>({...e,pending_authentication:!0}))),h=a.filter((e=>"directory"===e.media_class)).map((e=>{const t=String(e.title||"").replace(/\/$/,""),i=xe(t,r,!0);return i.isValid()&&i.format(r)===t?{child:e,timestamp:i.valueOf()}:null})).filter(Boolean).sort(((e,t)=>t.timestamp-e.timestamp||this._compareTitles(t.child,e.child)));p.push(...n);for(const{child:t}of h){if(p.length>=i)break;u=t.media_content_id;const r=i-p.length,o=await this._loadMedia(this,e,u,r,!1,l,d,c,!1,!1);p.push(...o)}p.sort(((e,t)=>this._compareTitles(t,e))),p.length>i&&(p.length=i)}else p=await this._loadMedia(this,e,u,f,n,l,d,c,h,g);let _=[];for(const e of p){const t=e.pending_authentication?this._createPendingMediaResource(e,o,s,a):this._createFileResource(e.authenticated_path,o,s,a);void 0!==t&&(t.mediaContentId=e.media_content_id,_.push(t))}return m&&(_=this._filterResourcesForSelectedDate(_)),void 0!==i&&i<_.length&&(_.length=i),_}catch(p){return console.error("Gallery Card failed to load media source",p),{error:!0,entity:u,message:p.message}}}async _loadMedia(e,t,i,r,o,s,a,n,l,d){const c={media_class:"directory",media_content_id:i};"/"!==i.substring(i.length-1,i.length)&&"media-source://media_source"!==i&&(c.media_content_id+="/");const h=Number.isFinite(r)&&r>0,u=(o&&h?await this._fetchMediaLimited(e,t,c,r,s,a,n,l,d):await Promise.all(this._fetchMedia(e,t,c,o,a,n,l,d))).flat(Number.POSITIVE_INFINITY).filter((e=>void 0!==e)).sort(((e,t)=>this._compareTitles(e,t)));return s&&u.reverse(),void 0!==r&&!Number.isNaN(r)&&r<u.length&&(u.length=r),u.map((e=>({...e,pending_authentication:!0})))}_fetchMedia(e,t,i,r,o,s,a,n){const l=[];return"directory"===i.media_class&&(i.children?l.push(...i.children.filter((t=>this._shouldIncludeMediaItem(e,t,r,o,s,a,n))).map((i=>Promise.all(e._fetchMedia(e,t,i,r,o,s,a,n))))):l.push(e._fetchMediaContents(t,i.media_content_id).then((i=>Promise.all(e._fetchMedia(e,t,i,r,o,s,a,n)))))),"directory"!==i.media_class&&l.push(Promise.resolve(i)),l}async _fetchMediaLimited(e,t,i,r,o,s,a,n,l){const d=[],c=o?-1:1,h=async i=>{if(d.length>=r)return;if("directory"!==i.media_class)return void d.push(i);const o=[...(i.children?i:await this._fetchMediaContents(t,i.media_content_id)).children||[]].filter((t=>this._shouldIncludeMediaItem(e,t,!0,s,a,n,l))).sort(((e,t)=>this._compareTitles(e,t)*c));for(const e of o){if(d.length>=r)break;"directory"===e.media_class?await h(e):d.push(e)}};return await h(i),d}_shouldIncludeMediaItem(e,t,i,r,o,s,a){if(!t||"@eaDir"===String(t.title||"").replace(/\/$/,""))return!1;if("video"===t.media_class)return r;if("image"===t.media_class)return o;if(!i||"directory"!==t.media_class)return!1;if(!s)return!0;const n=e.config.search_date_folder_format||"DD_MM_YYYY",l=String(t.title||"").replace(/\/$/,""),d=xe(l,n,!0);if(!d.isValid()||d.format(n)!==l)return!0;return e._getDateSearchFolderNames(n,a).has(l)}_fetchMediaContents(e,t){const i=1e3*this.config.browse_cache_seconds,r=this._mediaBrowseCache.get(t);if(i>0&&r?.expiresAt>Date.now())return this._refreshCacheEntry(this._mediaBrowseCache,t,r),Promise.resolve(r.value);if(r&&this._mediaBrowseCache.delete(t),this._mediaBrowseInflight.has(t))return this._mediaBrowseInflight.get(t);const o=this._browseCacheGeneration,s=e.callWS({type:"media_source/browse_media",media_content_id:t}).then((e=>(i>0&&o===this._browseCacheGeneration&&this._setLimitedCacheEntry(this._mediaBrowseCache,t,{value:e,expiresAt:Date.now()+i},100),e))).finally((()=>{this._mediaBrowseInflight.get(t)===s&&this._mediaBrowseInflight.delete(t)}));return this._mediaBrowseInflight.set(t,s),s}_fetchMediaItem(e,t){return e.callWS({type:"media_source/resolve_media",media_content_id:t,expires:10800})}_fetchMediaItemWithCache(e,t){const i=this._mediaResolveCache.get(t);if(i&&i.expiresAt>Date.now())return this._refreshCacheEntry(this._mediaResolveCache,t,i),Promise.resolve({url:i.url});if(i&&this._mediaResolveCache.delete(t),this._mediaResolveInflight.has(t))return this._mediaResolveInflight.get(t);const r=this._fetchMediaItem(e,t).then((e=>(this._setLimitedCacheEntry(this._mediaResolveCache,t,{url:e.url,expiresAt:Date.now()+this._mediaResolveCacheMs},this.config.media_cache_size),e))).finally((()=>{this._mediaResolveInflight.delete(t)}));return this._mediaResolveInflight.set(t,r),r}_refreshCacheEntry(e,t,i){e.delete(t),e.set(t,i)}_setLimitedCacheEntry(e,t,i,r){for(this._refreshCacheEntry(e,t,i);e.size>r;){const t=e.keys().next().value;e.delete(t)}}_loadCameraResource(e,t){const i={url:t.attributes.entity_picture,name:e,extension:"jpg",caption:t.attributes.friendly_name??e,isHass:!0};return Promise.resolve(i)}_loadFilesResources(e,t,i,r,o,s,a){let n=[];if(Array.isArray(e)){e=[...e].filter((e=>"string"==typeof e&&!e.includes("@eaDir"))),s&&e.reverse(),!a&&void 0!==t&&!Number.isNaN(t)&&t<e.length&&(e.length=t);for(const t of e){const e=t;let s;if(e.startsWith("/local/")||e.startsWith("http://")||e.startsWith("https://"))s=e;else if(e.includes("/config/www/"))s=e.replace("/config/www/","/local/");else if(e.includes("/www/"))s="/local/"+e.slice(e.indexOf("/www/")+5);else{if(e.startsWith("/"))continue;s="/local/"+e}const a=this._createFileResource(s,i,r,o);void 0!==a&&n.push(a)}a&&i&&(n=this._filterResourcesForSelectedDate(n)),void 0!==t&&t<n.length&&(n.length=t)}return Promise.resolve(n)}_createFileResource(e,t,i,r){if(!e)return;let o;const s=e.split("?")[0];let a=s.split("/").at(-1),n="",l="";if("@eaDir"!==a){const d=a.lastIndexOf("."),c=d>0?a.slice(d+1).toLowerCase():"";d>0&&(a=a.slice(0,d));try{a=decodeURIComponent(a)}catch{}" "!==r&&(l=a);let h=a;if(i&&!Number.isNaN(Number.parseInt(i))&&(h=h.slice(Math.max(0,Number.parseInt(i)-1))),t){const e=xe(h,t);e.isValid()&&(n=e)}n&&r&&("AGO"===r.toUpperCase().trim()?l=n.fromNow():(l=n.format(r),l=l.replaceAll(/ago/gi,n.fromNow()))),o={url:e,base_url:s,name:a,extension:c,caption:l,index:-1,date:n,dateFilterable:Boolean(t)}}return o}_createPendingMediaResource(e,t,i,r){const o=this._createFileResource(e.title||e.media_content_id,t,i,r);if(!o)return;const s=String(e.media_content_type||""),a=["image","video"].includes(e.media_class)?e.media_class:s.startsWith("image/")?"image":s.startsWith("video/")?"video":void 0;return{...o,url:"",mediaContentId:e.media_content_id,mediaType:a,pendingAuth:!0}}async _resolvePendingResourceBatch(e,t,i){const r=this.config.resolve_concurrency,o=e.filter((e=>this._queuedResolveIds.get(e.mediaContentId)!==i&&(this._queuedResolveIds.set(e.mediaContentId,i),!0)));try{for(let e=0;e<o.length;e+=r){if(i!==this._loadToken)return;const s=o.slice(e,e+r),a=await Promise.all(s.map((async e=>{try{const i=await this._fetchMediaItemWithCache(t,e.mediaContentId);return{mediaContentId:e.mediaContentId,url:i.url}}catch(i){return console.error("Gallery Card failed to resolve media URL",i),{mediaContentId:e.mediaContentId,error:!0}}})));this._applyResourceResolutionResults(a,i)}}finally{for(const e of o)this._queuedResolveIds.get(e.mediaContentId)===i&&this._queuedResolveIds.delete(e.mediaContentId)}}_resolveResourceUrl(e,t=this._hass,i=this._loadToken){return e&&e.pendingAuth&&e.mediaContentId?this._fetchMediaItemWithCache(t,e.mediaContentId).then((t=>{const r={mediaContentId:e.mediaContentId,url:t.url};return this._applyResourceResolutionResults([r],i),r})).catch((t=>{this._applyResourceResolutionResults([{mediaContentId:e.mediaContentId,error:!0}],i),console.error("Gallery Card failed to resolve media URL",t)})):Promise.resolve()}_applyResourceResolutionResults(e,t){if(t!==this._loadToken||0===e.length)return;const i=new Map(e.map((e=>[e.mediaContentId,e])));this.resources=(this.resources||[]).map((e=>{const t=i.get(e.mediaContentId);return t?t.error?{...e,pendingAuth:!1,resolveError:!0}:{...e,url:t.url,pendingAuth:!1,resolveError:!1,thumbnailError:!1}:e}))}_getDateSearchFolderNames(e,t){const i=t?this.config.date_search_adjacent_days:0,r=xe(this.selectedDate),o=new Set;for(let s=-i;s<=i;s++)o.add(r.add(s,"day").format(e));return o}_filterResourcesForSelectedDate(e){const t=xe(this.selectedDate).format("YYYY-MM-DD");return e.filter((e=>!e.dateFilterable||!(!e.date||!xe(e.date).isValid())&&xe(e.date).format("YYYY-MM-DD")===t))}_formatDateForInput(e){return e?xe(e).format("YYYY-MM-DD"):""}_compareTitles(e,t){return String(e?.title||"").localeCompare(String(t?.title||""))}_canUpload(){return Boolean(this.config?.upload?.enabled&&this._hass?.user?.is_admin)}_canDelete(e){return Boolean(this._canUpload()&&!1!==this.config?.upload?.allow_delete&&e&&!e.isHass&&"string"==typeof e.mediaContentId&&e.mediaContentId.startsWith("media-source://media_source/local"))}_getWatchdogAlert(){const e=this.config?.watchdog;if(!e?.enabled)return null;if(e.toggle_entity&&"off"===this._hass?.states?.[e.toggle_entity]?.state)return null;const t=e.timeout_hours||24;if(Boolean(e.mount_error_entity&&"on"===this._hass?.states?.[e.mount_error_entity]?.state)){const e={key:"mount:error",severity:"error",message:"录像目录无法访问，请检查 NAS 挂载或路径配置",hasErrorEntity:!1};return e.key===this._watchdogDismissedKey?null:e}const i=e.error_entity?String(this._hass?.states?.[e.error_entity]?.state||"").trim():"";if(i&&"unknown"!==i&&"unavailable"!==i){const e={key:`err:${i}`,severity:"error",message:`自动化异常：${i}`,hasErrorEntity:!0};return e.key===this._watchdogDismissedKey?null:e}let r=null;if(!this._isLoading&&!this._isDateFiltered&&Array.isArray(this.resources))for(const a of this.resources)a.date&&(!r||a.date.valueOf()>r.valueOf())&&(r=a.date);const o=r?xe().diff(r,"hour",!0):null,s=Boolean(e.stale_entity&&"on"===this._hass?.states?.[e.stale_entity]?.state);if(s||null!==o&&o>=t){const e=null!==o&&o>=1?Math.floor(o):t,i={key:s?`stale:entity:${e}`:`stale:local:${r.valueOf()}`,severity:"warning",message:`已 ${e} 小时未检测到新录像`,hasErrorEntity:!1};return i.key===this._watchdogDismissedKey?null:i}return null}_renderWatchdogBanner(){const e=this._getWatchdogAlert();return e?N`
      <div class="watchdog-banner ${e.severity}" role="status">
        <div class="watchdog-info">
          <ha-icon icon="${"error"===e.severity?"mdi:alert-octagon-outline":"mdi:clock-alert-outline"}"></ha-icon>
          <span class="watchdog-text">${e.message}</span>
        </div>
        <div class="watchdog-actions">
          ${this._canUpload()?N`<button type="button" class="watchdog-btn primary" @click="${()=>this._openUploadDialog()}">补传录像</button>`:N``}
          <button type="button" class="watchdog-btn" @click="${()=>this._dismissWatchdogAlert(e)}">${e.hasErrorEntity&&this._hass?.user?.is_admin?"清除":"忽略"}</button>
        </div>
      </div>
    `:N``}_dismissWatchdogAlert(e){this._watchdogDismissedKey=e.key,e.hasErrorEntity&&this.config?.watchdog?.error_entity&&this._hass?.user?.is_admin&&(Promise.resolve(this._hass.callService("input_text","set_value",{entity_id:this.config.watchdog.error_entity,value:""})).catch((()=>{})),Promise.resolve(this._hass.callService("persistent_notification","dismiss",{notification_id:"door_lock_watchdog_error"})).catch((()=>{})))}_openUploadDialog(e=null){this._canUpload()&&(this._uploadState={open:!0,items:[],dragOver:!1,uploading:!1,currentProgress:0,completedCount:0,error:"",canFallbackToRoot:!1,forceRoot:!1,lockedDate:e?xe(e).startOf("day").toDate():null},this.updateComplete.then((()=>{const e=this.shadowRoot?.querySelector("dialog.upload-dialog");e&&!e.open&&e.showModal()})))}_closeUploadDialog(){if(this._uploadState?.uploading)return;const e=this.shadowRoot?.querySelector("dialog.upload-dialog");e?.open&&e.close(),this._uploadState={...this._uploadState,open:!1,items:[],error:""}}_handleUploadDialogClosed(){this._uploadState?.open&&(this._uploadState={...this._uploadState,open:!1,uploading:!1})}_handleUploadDialogCancel(e){this._uploadState?.uploading&&e.preventDefault()}_handleUploadDragOver(e){e.preventDefault(),this._uploadState.dragOver||(this._uploadState={...this._uploadState,dragOver:!0})}_handleUploadDragLeave(){this._uploadState.dragOver&&(this._uploadState={...this._uploadState,dragOver:!1})}_handleUploadDrop(e){e.preventDefault(),this._uploadState={...this._uploadState,dragOver:!1},e.dataTransfer?.files?.length&&this._addUploadFiles(e.dataTransfer.files)}_handleUploadFileSelect(e){e.target?.files?.length&&(this._addUploadFiles(e.target.files),e.target.value="")}_addUploadFiles(e){const t=this.config?.upload?.file_name_format||"YYYYMMDDHHmmss",i=this._uploadState.lockedDate,r=Array.from(e).map((e=>{const r=function(e,t,i){const r=String(e?.name||""),o=r.lastIndexOf("."),s=o>0?r.slice(0,o):r;let a;if(t){const e=xe(s,t,!0);e.isValid()&&(a=e)}if(!a){const e=s.match(/(\d{4})[-_]?(\d{2})[-_]?(\d{2})[-_ T]?(\d{2})[-_:]?(\d{2})[-_:]?(\d{2})/);if(e){const[,t,i,r,o,s,n]=e,l=xe(`${t}-${i}-${r} ${o}:${s}:${n}`,"YYYY-MM-DD HH:mm:ss",!0);l.isValid()&&(a=l)}}if(!a){const t=s.match(/(\d{4})[-_]?(\d{2})[-_]?(\d{2})/);if(t){const[,i,r,o]=t,s=e?.lastModified?xe(e.lastModified):xe(),n=xe(`${i}-${r}-${o} ${s.format("HH:mm:ss")}`,"YYYY-MM-DD HH:mm:ss",!0);n.isValid()&&(a=n)}}if(a||(a=e?.lastModified?xe(e.lastModified):xe()),i){const e=xe(i);e.isValid()&&(a=e.hour(a.hour()).minute(a.minute()).second(a.second()))}return a}(e,t,i);return{file:e,dateStr:r.format("YYYY-MM-DD"),timeStr:r.format("HH:mm:ss"),note:""}}));this._uploadState={...this._uploadState,items:[...this._uploadState.items,...r],error:"",canFallbackToRoot:!1}}_removeUploadItem(e){const t=this._uploadState.items.filter(((t,i)=>i!==e));this._uploadState={...this._uploadState,items:t,error:"",canFallbackToRoot:!1}}_updateUploadItem(e,t){const i=this._uploadState.items.map(((i,r)=>r===e?{...i,...t}:i));this._uploadState={...this._uploadState,items:i,error:"",canFallbackToRoot:!1}}_retryUploadToRoot(){this._uploadState={...this._uploadState,forceRoot:!0,error:"",canFallbackToRoot:!1},this._startUpload()}_cancelActiveUpload(){this._activeUploadXhr?.abort(),this._activeUploadXhr=null}async _startUpload(){const e=this.config?.upload||{},t=Ce(this._uploadState.items,e);if(0===t.length||this._uploadState.uploading)return;this._uploadState={...this._uploadState,uploading:!0,completedCount:0,currentProgress:0,error:"",canFallbackToRoot:!1};let i="";try{for(let r=0;r<t.length;r++){const o=t[r],s=await Ie(this._hass,e.target_path||"media-source://media_source/local",o.folderName,e.mkdir_service,this._uploadState.forceRoot),a=await Te(this._hass,s,o.targetFileName);await Ee({hass:this._hass,file:o.file,targetFileName:a,mediaContentId:s,registerXhr:e=>{this._activeUploadXhr=e},onProgress:e=>{this._uploadState={...this._uploadState,currentProgress:e}}});const n=a.lastIndexOf(".");i=n>0?a.slice(0,n):a,this._uploadState={...this._uploadState,completedCount:r+1,currentProgress:0}}if(this._activeUploadXhr=null,this._mediaResolveCache.clear(),this._clearBrowseCache(),this._uploadState={...this._uploadState,uploading:!1},this._closeUploadDialog(),await this._loadResources(this._hass),i&&Array.isArray(this.resources)){const e=this.resources.findIndex((e=>e.name===i));e>=0&&this._selectResource(e)}}catch(r){this._activeUploadXhr=null;const e="UPLOAD_ABORTED"===r?.message;this._uploadState={...this._uploadState,uploading:!1,currentProgress:0,error:e?"上传已取消":r?.message||"上传失败，请重试",canFallbackToRoot:Boolean(r?.canFallbackToRoot)}}}_openDeleteConfirm(e){this._canDelete(e)&&(this._deleteTarget=e,this._deleteError="",this._isDeleting=!1,this.updateComplete.then((()=>{const e=this.shadowRoot?.querySelector("dialog.confirm-dialog");e&&!e.open&&e.showModal(),this.shadowRoot?.querySelector("dialog.confirm-dialog .btn-cancel")?.focus()})))}_closeDeleteConfirm(){if(this._isDeleting)return;const e=this.shadowRoot?.querySelector("dialog.confirm-dialog");e?.open&&e.close(),this._deleteTarget=null,this._deleteError=""}async _confirmDelete(){const e=this._deleteTarget;if(e?.mediaContentId&&!this._isDeleting){this._isDeleting=!0,this._deleteError="";try{await this._hass.callWS({type:"media_source/local_source/remove",media_content_id:e.mediaContentId}),this._clearBrowseCache(),this._mediaResolveCache.delete(e.mediaContentId);const t=this._getResourceKey(e);if(this.resources=(this.resources||[]).filter((e=>this._getResourceKey(e)!==t)),this._isDeleting=!1,this._closeDeleteConfirm(),0===this.resources.length)this.currentResourceIndex=0,this._closeViewer();else{const e=Math.min(this.currentResourceIndex,this.resources.length-1);this._selectResource(e)}}catch(t){this._isDeleting=!1,this._deleteError=t?.message||"删除失败，请检查权限或文件状态后重试"}}}_renderConfirmDialog(){const e=this._deleteTarget,t=e?e.extension?`${e.name}.${e.extension}`:e.name:"",i=e?.date?e.date.format("YYYY-MM-DD HH:mm:ss"):"未知";return N`
      <dialog class="confirm-dialog" @close="${()=>{this._isDeleting||(this._deleteTarget=null)}}" @cancel="${e=>{this._isDeleting&&e.preventDefault()}}">
        ${e?N`
          <div class="dialog-header">
            <div class="dialog-title danger">
              <ha-icon icon="mdi:alert-outline"></ha-icon>
              <span>确认删除录像</span>
            </div>
          </div>
          <div class="dialog-body">
            <p class="confirm-warning">此操作将永久删除本地文件，<strong>删除后不可恢复</strong>：</p>
            <div class="confirm-meta">
              <div><span>文件名：</span><code>${t}</code></div>
              <div><span>拍摄时间：</span><span>${i}</span></div>
              <div><span>路径：</span><code>${e.mediaContentId}</code></div>
            </div>
            ${this._deleteError?N`<div class="upload-error" role="alert"><ha-icon icon="mdi:alert-circle-outline"></ha-icon><div>${this._deleteError}</div></div>`:N``}
          </div>
          <div class="dialog-footer">
            <button type="button" class="btn-secondary btn-cancel" ?disabled=${this._isDeleting} @click="${this._closeDeleteConfirm}">取消</button>
            <button type="button" class="btn-danger" ?disabled=${this._isDeleting} @click="${this._confirmDelete}">
              ${this._isDeleting?"正在删除...":"确认删除"}
            </button>
          </div>
        `:N``}
      </dialog>
    `}static get styles(){return s`
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
        position: relative;
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
      .date-picker-anchor {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 1px;
        height: 1px;
        margin: 0;
        padding: 0;
        border: 0;
        opacity: 0;
        pointer-events: none;
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
      @container gallery-card (max-width: 419px) {
        ha-card[class] .info-relative {
          display: none;
        }
        ha-card[class] .icon-button {
          width: 34px;
          height: 34px;
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

      .empty-actions {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 10px;
        margin-top: 8px;
      }
      .empty-action.primary {
        border-color: var(--gallery-accent);
        background: var(--gallery-accent);
        color: #fff;
      }
      .icon-button.danger:hover {
        color: var(--error-color, #db4437);
      }

      /* Watchdog alert banner */
      .watchdog-banner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 8px 12px;
        font-size: 13px;
        line-height: 1.4;
        border-bottom: 1px solid var(--gallery-divider);
        background: rgba(255, 152, 0, 0.14);
        color: var(--gallery-text);
        grid-column: 1 / -1;
      }
      .watchdog-banner.error {
        background: rgba(219, 68, 55, 0.14);
      }
      .watchdog-info {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        flex: 1 1 auto;
      }
      .watchdog-banner.warning .watchdog-info ha-icon {
        color: var(--warning-color, #ffa600);
        flex: none;
      }
      .watchdog-banner.error .watchdog-info ha-icon {
        color: var(--error-color, #db4437);
        flex: none;
      }
      .watchdog-text {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .watchdog-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        flex: none;
      }
      .watchdog-btn {
        border: 1px solid var(--gallery-divider);
        background: var(--gallery-surface);
        color: var(--gallery-text);
        border-radius: 999px;
        padding: 4px 10px;
        font-size: 12px;
        cursor: pointer;
        white-space: nowrap;
      }
      .watchdog-btn.primary {
        border-color: var(--gallery-accent);
        background: var(--gallery-accent);
        color: #fff;
      }

      /* Upload & Delete confirmation dialogs */
      dialog.upload-dialog,
      dialog.confirm-dialog {
        width: min(560px, calc(100vw - 24px));
        max-height: calc(100dvh - 32px);
        padding: 0;
        border: 1px solid var(--gallery-divider);
        border-radius: 16px;
        background: var(--gallery-surface);
        color: var(--gallery-text);
        box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
        overflow: hidden;
      }
      dialog.confirm-dialog {
        width: min(440px, calc(100vw - 24px));
      }
      dialog.upload-dialog[open],
      dialog.confirm-dialog[open] {
        display: flex;
        flex-direction: column;
      }
      dialog.upload-dialog::backdrop,
      dialog.confirm-dialog::backdrop {
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(2px);
      }
      .dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 14px 16px;
        border-bottom: 1px solid var(--gallery-divider);
      }
      .dialog-title {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 16px;
        font-weight: 600;
      }
      .dialog-title.danger ha-icon {
        color: var(--error-color, #db4437);
      }
      .dialog-body {
        flex: 1 1 auto;
        overflow-y: auto;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .dialog-footer {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding: 12px 16px;
        border-top: 1px solid var(--gallery-divider);
      }
      .dropzone {
        border: 2px dashed var(--gallery-divider);
        border-radius: 12px;
        padding: 22px 16px;
        text-align: center;
        cursor: pointer;
        transition: border-color 0.2s, background 0.2s;
      }
      .dropzone:hover,
      .dropzone.drag-over {
        border-color: var(--gallery-accent);
        background: rgba(var(--gallery-accent-rgb), 0.08);
      }
      .dropzone ha-icon {
        --mdc-icon-size: 36px;
        color: var(--gallery-accent);
      }
      .dropzone-text {
        margin-top: 8px;
        font-size: 14px;
        font-weight: 500;
      }
      .dropzone-hint {
        margin-top: 4px;
        font-size: 12px;
        color: var(--gallery-text-secondary);
      }
      .upload-queue {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .upload-item {
        border: 1px solid var(--gallery-divider);
        border-radius: 10px;
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .upload-item-head {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .upload-item-name {
        flex: 1 1 auto;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        font-weight: 500;
      }
      .upload-item-size {
        font-size: 12px;
        color: var(--gallery-text-secondary);
        flex: none;
      }
      .icon-button.small {
        width: 28px;
        height: 28px;
      }
      .upload-item-fields {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
      }
      @media (max-width: 520px) {
        .upload-item-fields {
          grid-template-columns: 1fr 1fr;
        }
        .upload-item-fields .field-note {
          grid-column: 1 / -1;
        }
      }
      .field-group {
        display: flex;
        flex-direction: column;
        gap: 4px;
        font-size: 12px;
        color: var(--gallery-text-secondary);
      }
      .field-group input {
        box-sizing: border-box;
        width: 100%;
        padding: 6px 8px;
        border: 1px solid var(--gallery-divider);
        border-radius: 8px;
        background: var(--gallery-surface);
        color: var(--gallery-text);
        font: inherit;
        font-size: 13px;
      }
      .upload-item-preview {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        color: var(--gallery-text-secondary);
        word-break: break-all;
      }
      .upload-item-preview ha-icon {
        --mdc-icon-size: 16px;
        flex: none;
        color: var(--gallery-accent);
      }
      .upload-progress-box {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .upload-progress-label {
        font-size: 13px;
      }
      .upload-progress-track {
        height: 8px;
        border-radius: 999px;
        background: var(--gallery-placeholder);
        overflow: hidden;
      }
      .upload-progress-fill {
        height: 100%;
        background: var(--gallery-accent);
        transition: width 0.15s linear;
      }
      .upload-error {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        padding: 10px 12px;
        border-radius: 10px;
        background: rgba(219, 68, 55, 0.12);
        color: var(--error-color, #db4437);
        font-size: 13px;
      }
      .upload-error-content {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .confirm-warning {
        margin: 0;
        font-size: 14px;
      }
      .confirm-meta {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 10px 12px;
        border-radius: 10px;
        background: var(--gallery-placeholder);
        font-size: 13px;
        word-break: break-all;
      }
      .confirm-meta code {
        font-family: monospace;
      }
      .btn-primary,
      .btn-secondary,
      .btn-danger {
        border-radius: 999px;
        padding: 8px 16px;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        border: 1px solid transparent;
      }
      .btn-secondary {
        border-color: var(--gallery-divider);
        background: transparent;
        color: var(--gallery-text);
      }
      .btn-secondary.small {
        padding: 4px 10px;
        font-size: 12px;
        align-self: flex-start;
      }
      .btn-primary {
        background: var(--gallery-accent);
        color: #fff;
      }
      .btn-danger {
        background: var(--error-color, #db4437);
        color: #fff;
      }
      .btn-primary:disabled,
      .btn-secondary:disabled,
      .btn-danger:disabled {
        opacity: 0.5;
        cursor: not-allowed;
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
    `}}customElements.get("gallery-card")||(customElements.define("gallery-card",Pe),console.groupCollapsed("%cGALLERY-CARD 2026.0.1 IS INSTALLED","color: green; font-weight: bold"),console.log("Readme:","https://github.com/fange173/gallery-card-2026"),console.groupEnd(),window.customCards=window.customCards||[],window.customCards.push({type:"gallery-card",name:"Gallery Card 2026",preview:!1,description:"Gallery Card 2026 displays images and videos from media sources, file-list sensors, and camera entities.",documentationURL:"https://github.com/fange173/gallery-card-2026"}));
