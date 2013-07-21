var NewsDetailsTemplateBuilder = function (detailedNewsXSLTemplate) {
  var template = detailedNewsXSLTemplate;

  return {
    buildTemplate: function (selectAttrValue) {
      var forEachTag = template.getElementsByTagName('for-each')[0];
      forEachTag.setAttribute('select', selectAttrValue);

      return template;
    },
    defaultTemplate: function () {
      return this.buildTemplate('*');
    },
    buildTemplateById: function (id) {
      return this.buildTemplate('key("newsById", "' + id + '")');
    }
  }
};
