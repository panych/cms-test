function vkRequestCallback(result) {
  app.handleResult(result);
} 


var app = {
  items: [],
  elButton: null,
  elList: null,
  elRequests: null,
  elLive: null,
  elDead: null,
  // 1 - loading
  state: 0,

  init: function() {
    _this = this;

    this.elButton = document.getElementById('next');
    this.elList = document.getElementById('people');
    this.elRequests = document.getElementById('requests');
    this.elLive = document.getElementById('live');
    this.elDead = document.getElementById('dead');
    
    this.elButton.addEventListener('click', 
      function() { _this.onButtonClick() }, false);

    this.getNewUsers();
  },


  onButtonClick: function() {
    if (this.state !== 1) {
      this.getNewUsers();
    }
  },


  getNewUsers: function () {
    this.state = 1;
    this.elButton.innerHTML = this.elButton.getAttribute('data-loading-text');
    this.elList.setAttribute('data-loading', 'loading');
    this.items = [];
    this.getUser();
  },


  getUser: function() {
    this.requestFromVk(this.randomId());
  },


  requestFromVk: function(id) {
    var script = document.createElement('SCRIPT');
    script.src = "https://api.vk.com/method/users.get?user_id=" + id +
      "&fields=photo_50&v=5.8&callback=vkRequestCallback";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.remove();
    this.elRequests.innerHTML = parseInt(this.elRequests.innerHTML) + 1;
  },


  handleResult: function(result) {
    if ('error' in result) {
      alert('При загрузке произошла ошибка :( Попробуйте снова');
      this.state = 0;
      return;
    }

    var userData = result.response[0];

    // check if user wasn't delete
    if ('deactivated' in userData) {
      this.elDead.innerHTML = parseInt(this.elDead.innerHTML) + 1;
      // if was get a new one
      this.getUser();

    } else {
      // if not add new one to collection
      this.items.push(userData);
      this.elLive.innerHTML = parseInt(this.elLive.innerHTML) + 1;

      if (this.items.length > 4) {
        this.finish();
      } else {
        this.getUser();
      }
    }
  },

  randomId: function() {
    return Math.floor(Math.random()*(9999999)+1);
  },


  finish: function() {
    this.state = 0;
    this.show();
    this.elButton.innerHTML = this.elButton.getAttribute('data-default-text');
    this.elList.setAttribute('data-loading', '');
  },


  show: function() {
    var itemsHTML = '';
    for (var i = 0; i < this.items.length; i++) {
      var user = this.items[i];
      itemsHTML += '<li><a href="http://vk.com/id' + user.id + '">' +
        '<img src="' + user.photo_50 + '">' +
        '' + user.last_name + ' ' + user.first_name + '</a></li>';
    }

    this.elList.innerHTML = itemsHTML;
  }
};

