var NewsModel = function (domElement) {
  var element = domElement;
  var ACTIVE_STATE = 'active';

  function toggleActiveClass(){
    if (element.className === ACTIVE_STATE) {
      element.className = '';
      return
    }

    element.className = ACTIVE_STATE
  }

  return {
    setOnClickAction: function (onClickAction) {
      element.onclick = (function (event) {

        toggleActiveClass();

        onClickAction(this);
      }).bind(this);
    },

    hasDetails: function () {
      return  element.getElementsByClassName('detailedText').length !== 0;
    },

    getElement: function () {
      return element;
    },

    getId: function () {
      return element.getAttribute('data-id');
    }
  }
};
