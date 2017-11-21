var serverLogic = {
  search: function(str, obj) {
    var arr = [];
    for (var i = 0; i < obj.length; i++) {
      if (obj[i].name.toLowerCase().startsWith(str.toLowerCase())) {
        arr.push(obj[i].name)
      }
    }
    return arr.slice(0, 7);
  },
  searchedMeaning: function(str, obj) {
    var found = obj.find(function(each) {
      return each.name.toLowerCase() === str.toLowerCase()
    });
    return found;
  }
}

module.exports = serverLogic;
