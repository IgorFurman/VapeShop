"use strict";(self.webpackChunkvapeshop_react=self.webpackChunkvapeshop_react||[]).push([[527],{3527:function(e,t,a){a.r(t),a.d(t,{User:function(){return j}});var s=a(4165),r=a(1413),n=a(5861),i=a(9439),c=a(2791),u=a(1087),o=a(4981),l=a(7689),d=a(6910),p=a(2481),h=a(979),f=a(4942),m=a(184),x=function(e){var t=e.onClose,a=e.userData,u=(0,d.F_)(h.I),o=(0,i.Z)(u,1)[0],l=(0,c.useState)(""),x=(0,i.Z)(l,2),j=x[0],v=x[1],N=(0,c.useState)({firstName:a.firstName||"",lastName:a.lastName||"",email:a.email||"",city:a.city||"",street:a.street||"",postalCode:a.postalCode||""}),k=(0,i.Z)(N,2),b=k[0],y=k[1],Z=function(){var e=(0,n.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!o){e.next=5;break}return e.next=4,o.updatePassword(j);case 4:alert("Has\u0142o zosta\u0142o zaktualizowane!");case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("B\u0142\u0105d podczas aktualizacji has\u0142a: ",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),g=function(){var e=(0,n.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,!o){e.next=5;break}return e.next=4,(0,p.pl)((0,p.JU)(h.db,"users",o.uid),b);case 4:alert("Profil zosta\u0142 zaktualizowany!");case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.error("B\u0142\u0105d podczas aktualizacji profilu: ",e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),w=function(e){y((0,r.Z)((0,r.Z)({},b),{},(0,f.Z)({},e.target.name,e.target.value)))};return(0,m.jsxs)("div",{className:"update-user",children:[(0,m.jsx)("h2",{className:"update-user-title",children:"Aktualizuj has\u0142o"}),(0,m.jsx)("input",{type:"password",value:j,onChange:function(e){return v(e.target.value)}}),(0,m.jsx)("button",{className:"update-user-btn",onClick:Z,children:"Aktualizuj has\u0142o"}),(0,m.jsx)("h2",{className:"update-user-title",children:"Aktualizuj profil"}),(0,m.jsx)("input",{type:"text",name:"firstName",value:b.firstName,onChange:w,placeholder:"Imi\u0119"}),(0,m.jsx)("input",{type:"text",name:"lastName",value:b.lastName,onChange:w,placeholder:"Nazwisko"}),(0,m.jsx)("input",{type:"text",name:"email",value:b.email,onChange:w,placeholder:"Email"}),(0,m.jsx)("input",{type:"text",name:"city",value:b.city,onChange:w,placeholder:"Miasto"}),(0,m.jsx)("input",{type:"text",name:"street",value:b.street,onChange:w,placeholder:"Ulica"}),(0,m.jsx)("input",{type:"text",name:"postalCode",value:b.postalCode,onChange:w,placeholder:"Kod pocztowy"}),(0,m.jsx)("button",{className:"update-user-btn",onClick:g,children:"Aktualizuj profil"}),(0,m.jsx)("button",{className:"update-user-close",onClick:t,children:"Zamknij"})]})},j=function(){var e=(0,d.F_)(h.I),t=(0,i.Z)(e,3),a=t[0],f=(t[1],t[2],(0,l.UO)().id,(0,c.useState)(null)),j=(0,i.Z)(f,2),v=j[0],N=j[1],k=(0,c.useState)(!0),b=(0,i.Z)(k,2),y=(b[0],b[1]),Z=(0,c.useState)(null),g=(0,i.Z)(Z,2),w=(g[0],g[1]),z=(0,c.useState)(!1),C=(0,i.Z)(z,2),S=C[0],U=C[1],A=(0,c.useState)(!1),I=(0,i.Z)(A,2),B=I[0],E=I[1],F=(0,c.useState)([]),_=(0,i.Z)(F,2),D=_[0],J=(_[1],(0,c.useState)([])),P=(0,i.Z)(J,2),H=P[0],K=P[1],M=(0,l.s0)();(0,c.useEffect)((function(){if(a){var e=(0,p.cf)((0,p.JU)(h.db,"users",a.uid),(function(e){N(e.data()),y(!1)}),(function(e){w(e),y(!1)}));return function(){return e()}}}),[a]),(0,c.useEffect)((function(){if(v){var e=v.favorites;if(!Array.isArray(e)){if("object"!==typeof e||null===e)return void console.error("Favorites should be an array or object, got: ",e);e=Object.keys(e).filter((function(t){return e[t]})).map(Number)}var t=e.map((function(e){return console.log("productId: ".concat(e)),(0,p.JU)(h.db,"products",String(e))}));if(Array.isArray(t)&&t.length>0){var a=function(){var e=(0,n.Z)((0,s.Z)().mark((function e(){var a,n;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Promise.all(t.map((function(e){return(0,p.QT)(e).catch((function(e){return console.log("B\u0142\u0105d odczytu dokumentu",e)}))})));case 3:a=e.sent,n=a.filter((function(e){return e.exists})).map((function(e){return(0,r.Z)({id:e.id},e.data())})),K(n),console.log(n),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error("B\u0142\u0105d podczas odczytu ulubionych produkt\xf3w",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();a()}}}),[v]);var O=function(){var e=(0,n.Z)((0,s.Z)().mark((function e(){return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,o.w7)(h.I);case 3:M("/login"),e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error("Wyst\u0105pi\u0142 b\u0142\u0105d podczas wylogowywania.",e.t0);case 9:case"end":return e.stop()}}),e,null,[[0,6]])})));return function(){return e.apply(this,arguments)}}();return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)("section",{className:"user",children:[(0,m.jsxs)("div",{className:"box user-data",children:[(0,m.jsx)("h2",{className:"user-title",children:"Dane u\u017cytkownika"}),!S&&v&&(0,m.jsxs)("div",{className:"user-info-container",children:[(0,m.jsxs)("p",{className:"user-info",children:[(0,m.jsx)("b",{children:"Imi\u0119:"})," ",v.firstName]}),(0,m.jsxs)("p",{className:"user-info",children:[(0,m.jsx)("b",{children:"Nazwisko:"})," ",v.lastName]}),(0,m.jsxs)("p",{className:"user-info",children:[(0,m.jsx)("b",{children:"Email:"})," ",v.email]}),(0,m.jsxs)("p",{className:"user-info",children:[(0,m.jsx)("b",{children:"Miasto:"})," ",v.city]}),(0,m.jsxs)("p",{className:"user-info",children:[(0,m.jsx)("b",{children:"Ulica i nr domu:"})," ",v.street]}),(0,m.jsxs)("p",{className:"user-info",children:[(0,m.jsx)("b",{children:"Kod pocztowy:"})," ",v.postalCode]}),(0,m.jsx)("button",{className:"user-edit-btn",onClick:function(){E(v),U(!0)},children:"Edytuj dane u\u017cytkownika"})]}),B&&(0,m.jsx)(x,{onClose:function(){E(!1),U(!1)},userData:B})]}),(0,m.jsxs)("div",{className:"box user-order-story",children:[(0,m.jsx)("h2",{className:" user-title",children:"Historia zam\xf3wie\u0144"}),0===D.length?(0,m.jsx)("p",{children:"Brak zam\xf3wie\u0144"}):(0,m.jsx)("div",{})]}),(0,m.jsxs)("div",{className:"box user-favourite",children:[(0,m.jsx)("h2",{className:" user-title",children:"Ulubione"}),0===H.length?(0,m.jsx)("p",{children:"Brak ulubionych produkt\xf3w"}):H.map((function(e,t){return(0,m.jsxs)("div",{className:"user-favourite-list",children:[(0,m.jsxs)("div",{className:"user-favourite-name",children:[(0,m.jsx)("h3",{children:e.productName}),(0,m.jsx)(u.rU,{className:"user-favourite-link",to:"/products/".concat(e.id),children:"Zobacz szczeg\xf3\u0142y"})]}),(0,m.jsx)("img",{className:"user-favourite-image",src:e.productImage,alt:e.productName})]},t)}))]})]}),(0,m.jsx)("div",{className:"user-logut-container",children:(0,m.jsx)("button",{className:"user-logout-btn",onClick:O,children:"Wyloguj si\u0119"})})]})}}}]);
//# sourceMappingURL=527.08bfebac.chunk.js.map