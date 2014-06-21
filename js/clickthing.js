	function clickthing(thiz,goUp) {
	  if( !!thiz ) {
	    var parent = thiz.parentElement;
	     if( !!parent ) {
	       var nxtSib = parent.nextElementSibling;
	       if( !!nxtSib ) {
		 var sibId = nxtSib.id;
		 if( !!sibId ) {
		   if( sibId.indexOf("margin") === 0 ) {
		     thiz.setAttribute("HREF",goUp); // Belt and braces, window.location doesn't work very well because thiz is usually an anchor
		   }
		 }
	       }
	     }
	  }
	}