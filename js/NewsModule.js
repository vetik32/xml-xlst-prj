(function (ajax, XMLTransformer, NewsDetailsTemplateBuilder, NewsModel) {

  var detailTemplateBuilder = null;
  var detailsDataTransformer = null;


  function DetailsLazyLoad(callBack) {
    if (!detailTemplateBuilder) {
      // Load the XSL.
      ajax.get('/tpl/newsDetails.xsl', function (xslTemplate) {
        detailTemplateBuilder = NewsDetailsTemplateBuilder(xslTemplate);
        if (detailsDataTransformer) {
          DetailsLazyLoad(callBack);
        }
      });
    }

    if (!detailsDataTransformer) {
      ajax.get('/api/newsDetails.xml', function (newsDetailsDataXML) {
        detailsDataTransformer = XMLTransformer(newsDetailsDataXML);
        if (detailTemplateBuilder) {
          DetailsLazyLoad(callBack);
        }
      });
    }

    if (detailTemplateBuilder && detailsDataTransformer) {
      callBack();
    }
  }

  var NewsListModule = (function () {
    return  {
      start: function () {
        var that = this;
        ajax.get('/api/news.xml', function (xmlShortNews) {
          ajax.get('/tpl/news.xsl', function (xslShortNewsTemplate) {
            that.render(xmlShortNews, xslShortNewsTemplate);
          });
        });
      },
      render: function (xmlData, xslTemplate) {

        var transformer = new XMLTransformer(xmlData);
        var markup = transformer.applyXSL(xslTemplate);

        var newsListPlaceHolder = document.getElementById('newslist');
        newsListPlaceHolder.innerHTML = markup;

        var newsListDOMElement = newsListPlaceHolder.getElementsByTagName('ul')[0];

        var newsDOMElements = newsListDOMElement.getElementsByTagName('li');

        for (var i = 0; i < newsDOMElements.length; i += 1) {
          new NewsModel(newsDOMElements[i])
            .setOnClickAction(function (it) {
              if (it.hasDetails()) {
                return;
              }

              DetailsLazyLoad(function () {
                var detailsXSLTemplate = detailTemplateBuilder.buildTemplateById(it.getId());
                var newsDetailMarkup = detailsDataTransformer.applyXSL(detailsXSLTemplate);
                var detailsPlaceHolder = document.createElement('div');
                detailsPlaceHolder.innerHTML = newsDetailMarkup;
                it.getElement().appendChild(detailsPlaceHolder.childNodes[0]);
              });
            });
        }
      }
    }
  })();

  NewsListModule.start();

}(Ajax, XMLTransformer, NewsDetailsTemplateBuilder, NewsModel));

