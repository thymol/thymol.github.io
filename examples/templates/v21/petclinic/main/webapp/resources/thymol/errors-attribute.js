function errorsAttrProcessor(element, attr, thAttr) {
        var text = "(no errors)", newTextNode;
        try {
            while (element.firstChild != null) {
                element.removeChild(element.firstChild);
                if (element.firstChild == null) {
                    break;
                }
            }
	    newTextNode = document.createTextNode(text);
	    element.appendChild(newTextNode);
	    element.removeAttribute(attr.name);
        } catch (err) {
            if (thymol.debug) {
                window.alert("text replace error");
            }
        }	
	return true;
}
