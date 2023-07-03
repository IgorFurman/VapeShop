"use strict";(self.webpackChunkvapeshop_react=self.webpackChunkvapeshop_react||[]).push([[650,236],{7312:function(e,a,s){s.d(a,{x:function(){return d}});var o=s(9439),n=s(2791),t=s(1087),r=s(7948),i=s.n(r),c=s(5561),l=s(184),d=function(e){var a=e.isModalVisible,s=e.handleCloseModal,r=e.id,d=(0,n.useContext)(c.I),u=d.products,p=d.cartItems,m=d.removeFromCart,h=d.validateCartItemCount,x=u.find((function(e){return e.id===Number(r)}))||{},j=x.productName,f=x.productImage,v=x.availability,g=(0,n.useState)(!1),b=(0,o.Z)(g,2),N=b[0],C=b[1];return(0,l.jsx)(i(),{isOpen:a,onRequestClose:s,className:"popup-container ".concat(a?"fade-in":"fade-out"),overlayClassName:"add-to-cart-modal-overlay",children:(0,l.jsxs)("div",{className:"popup-box",children:[(0,l.jsxs)("h3",{className:"popup-message",children:[j," zosta\u0142 dodany do koszyka!"]}),(0,l.jsxs)("div",{className:"popup-quantity-control",children:[(0,l.jsx)("img",{src:f,alt:j,className:"popup-image"}),N&&(0,l.jsxs)("p",{className:"popup-max-info",children:["Osi\u0105gni\u0119to maksymaln\u0105 ilo\u015b\u0107 dla produktu ",j,"."]}),(0,l.jsxs)("div",{className:"popup-add-remove-container",children:[(0,l.jsx)("button",{onClick:function(){return m(r)},children:" - "}),(0,l.jsx)("input",{value:p[r],readOnly:!0,min:"0"}),(0,l.jsx)("button",{onClick:function(){var e=(p[r]||0)+1;e<=v?(h(e,r),C(!1)):C(!0)},children:" + "})]})]}),(0,l.jsxs)("div",{className:"popup-buttons",children:[(0,l.jsx)("button",{onClick:s,className:"popup-button",children:"Kontynuuj zakupy"}),(0,l.jsx)(t.rU,{to:"/cart",className:"popup-button",children:"Przejd\u017a do koszyka"})]})]})})}},236:function(e,a,s){s.r(a),s.d(a,{LoginModal:function(){return d}});var o=s(2791),n=s(1087),t=s(7948),r=s.n(t),i=s(6355),c=s(5561),l=s(184);r().setAppElement("#root");var d=function(){var e=(0,o.useContext)(c.I),a=e.closeLoginModal,s=e.isLoginModalVisible;return(0,l.jsx)(r(),{isOpen:s,onRequestClose:a,className:"login-modal ".concat(s?"fade-in":"fade-out"),overlayClassName:"login-modal-overlay",style:{overlay:{backgroundColor:"rgba(0, 0, 0, 0.25)"}},children:(0,l.jsxs)("div",{className:"login-popup-box",children:[(0,l.jsx)("h3",{className:"login-popup-message",children:"Musisz by\u0107 zalogowany, aby doda\u0107 produkt do ulubionych!"}),(0,l.jsx)(n.rU,{to:"/login",className:"login-popup-button",onClick:a,children:"Zaloguj si\u0119"}),(0,l.jsx)(i.aHS,{onClick:a,size:28,className:"close-icon"})]})})}},2261:function(e,a,s){s.r(a),s.d(a,{SearchResults:function(){return c}});var o=s(2791),n=s(7689),t=s(5561),r=s(7505),i=(s(3505),s(184)),c=function(){var e=(0,o.useContext)(t.I).filteredProducts,a=(0,n.TH)(),s=new URLSearchParams(a.search).get("term");return 0===e.length?(0,i.jsxs)("div",{className:"search-result-empty-containter",children:[(0,i.jsxs)("h2",{children:['Przykro nam, nie znale\u017ali\u015bmy ofert dla "',s,'"']}),(0,i.jsx)("h3",{children:"Spr\xf3buj jeszcze raz:"}),(0,i.jsxs)("ul",{children:[(0,i.jsx)("li",{children:"Inaczej wpisa\u0107 nazw\u0119"}),(0,i.jsx)("li",{children:"Sprawdzi\u0107, czy nie ma b\u0142\u0119du"}),(0,i.jsx)("li",{children:"Poszuka\u0107 czego\u015b podobnego"})]})]}):(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("h2",{className:"search-result-heading",children:["Wyniki wyszukiwania: ",s]}),(0,i.jsx)("div",{className:"products",children:e.map((function(e){return(0,i.jsx)(r.x,{data:e},e.id)}))})]})}},7505:function(e,a,s){s.d(a,{x:function(){return j}});var o=s(9439),n=s(2791),t=s(2481),r=s(7087),i=(s(9713),s(7945)),c=s.n(i),l=(s(4655),s(1087)),d=s(5561),u=s(8820),p=s.p+"static/media/bestseller-icon.26c4011bfa69deab96a4.png",m=s(236),h=s(7312),x=(s(3505),s(184)),j=function(e){var a=e.data,s=a.id,i=a.productName,j=a.price,f=a.productImage,v=a.bestseller,g=a.discount,b=a.oldPrice,N=a.availability,C=(0,n.useContext)(d.I),y=C.addToCart,k=C.cartItems,z=C.removeFromCart,I=C.updateCartItemCount,w=C.addToFavorites,M=C.removeFromFavorites,L=C.showLoginModal,F=C.closeLoginModal,S=C.isLoginModalVisible,P=C.favorites,U=C.auth,O=C.db,R=C.validateCartItemCount,V=C.calculateDiscountPercentage;(0,n.useEffect)((function(){c().init({once:!0,duration:1e3})}),[]);var Z=(0,n.useState)(!1),E=(0,o.Z)(Z,2),T=E[0],q=E[1],D=(0,n.useState)(P&&P[s]),_=(0,o.Z)(D,2),H=_[0],A=_[1],J=(0,n.useState)(!1),K=(0,o.Z)(J,2),Q=K[0],W=K[1];return(0,n.useEffect)((function(){var e;return U.currentUser&&O&&(e=(0,t.cf)((0,t.JU)(O,"users",U.currentUser.uid),(function(e){var a=e.data();a&&a.hasOwnProperty("favorites")&&(console.log("userData.favorites:",a.favorites),A(!!a.favorites[s]))}),(function(e){console.error("Error while fetching user data: ",e)}))),function(){e&&e()}}),[U,O,s,P]),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("div",{className:"product","data-aos-anchor-placement":"top-bottom","data-aos":"fade-up",children:[(0,x.jsxs)(l.rU,{to:"/products/".concat(s),className:"product-link",children:[(0,x.jsx)(r.LazyLoadImage,{src:f,alt:i,effect:"blur"}),g&&(0,x.jsxs)("div",{className:"product-discount-badge",children:[V(b,j),"%"]}),v&&(0,x.jsx)("img",{src:p,alt:"ikona bestseller",className:"best-seller-icon",style:{width:"50px",height:"50px"}}),(0,x.jsx)("div",{className:"image-hover-text",children:"Szybki podgl\u0105d"})]}),(0,x.jsxs)("div",{className:"product-description",children:[(0,x.jsx)("p",{children:(0,x.jsx)("b",{children:i})}),g?(0,x.jsxs)(x.Fragment,{children:[(0,x.jsxs)("p",{className:"product-discount-old-price",children:[b," z\u0142"]}),(0,x.jsxs)("p",{className:"product-discount-new-price",children:[j," z\u0142 "]})]}):(0,x.jsxs)("p",{children:[j," z\u0142"]})]}),(0,x.jsxs)("button",{className:" add-to-cart-btn",onClick:function(){var e=(k[s]||0)+1;e>N?W(!0):(R(e,s),W(!1)),q(!0)},disabled:Q,children:["Dodaj do koszyka"," ",k&&k[s]>0&&(0,x.jsxs)(x.Fragment,{children:["(",k[s],")"]})]}),(0,x.jsx)("button",{className:"add-to-fav-btn",onClick:function(e){U.currentUser?H?(M(s),A(!1)):(w(s),A(!0)):L()},children:H?(0,x.jsx)(u.M_L,{}):(0,x.jsx)(u.lo,{})})]}),(0,x.jsx)(m.LoginModal,{isVisible:S,closeLoginModal:F}),(0,x.jsx)(h.x,{isModalVisible:T,handleCloseModal:function(){q(!1),F()},productName:i,productImage:f,cartItems:k&&k,addToCart:y,removeFromCart:z,updateCartItemCount:I,id:s,maxQuantityReached:!0})]})}},3505:function(){}}]);
//# sourceMappingURL=650.a4e2d493.chunk.js.map