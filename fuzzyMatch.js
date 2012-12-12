var fuzzyMatch = {
  fuzzyTailMatch: function (search, target, minimum_char_length){
    if (!minimum_char_length) {
      minimum_char_length = 3;
    }
    if(search < minimum_char_length){
      return false;
    }
    if(target.indexOf(search) > -1){
      return {
        matched_length_of_search: search.length,
        matched: search,
        start_index_in_target: target.indexOf(search)
      };
    }
    var len = search.length;
    var jump = parseInt(len / 2, 10);
    var start_index_in_target = null;
    var matched_length_of_search = 0;

    while(true){
      var is_matched = target.indexOf(search.substr(0, matched_length_of_search + jump));
      if(is_matched > -1){
        matched_length_of_search = matched_length_of_search + jump;
        start_index_in_target = is_matched;
      }
      jump = parseInt(jump / 2, 10);

      if(jump === 0){
        if(matched_length_of_search === 0 || matched_length_of_search < minimum_char_length){
          return false;
        }
        if(target.indexOf(search.substr(0, matched_length_of_search)) > -1 && target.indexOf(search.substr(0, matched_length_of_search + 1)) === -1){
          return {matched_length_of_search: matched_length_of_search, matched: search.substr(0, matched_length_of_search),start_index_in_target: start_index_in_target };
        }
        jump = 1;
      }
    }
  },

  fuzzyTailReplace: function (search, target, replace){
    var result = this.fuzzyTailMatch(search, target);
    if(result === false){
      return target;
    }
    else {
      return target.replace(result.matched, replace);
    }
  }
};

if(typeof exports === 'object'){
  module.exports = fuzzyMatch;
}
