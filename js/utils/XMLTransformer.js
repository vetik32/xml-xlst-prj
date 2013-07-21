var XMLTransformer = function (xmlSource) {

  var xml = xmlSource;

  // This gets executed later, once both xml files have been loaded.
  function render(xsl) {
    var result, x, ser, s;

    // IE method
    if (window.ActiveXObject) {
      result = new ActiveXObject("MSXML2.DOMDocument");
      xml.transformNodeToObject(xsl, result);

      // Other browsers
    } else {
      result = new XSLTProcessor();
      result.importStylesheet(xsl);
      result = result.transformToDocument(xml);
    }

    //return result;
    s = '';

    // IE method.
    if (result.xml) {
      for (x = 0; x < result.childNodes.length; x += 1) {
        s += result.childNodes[x].xml;
      }

      // Other browsers
    } else {
      ser = new XMLSerializer();
      for (x = 0; x < result.childNodes.length; x += 1) {
        s += ser.serializeToString(result.childNodes[x]);
      }
    }

    return s;
  }

  return {
    applyXSL: render
  }
};
