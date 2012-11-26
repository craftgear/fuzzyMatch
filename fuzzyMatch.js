var fuzzyMatch = {
  fuzzyTailMatch: function (target, search){
    var len = search.length;
    var jump = parseInt(len / 2);
    var start_index_in_target = null;
    var match_length_of_search = 0;
    var loop = true;
    var i = 0;
    while(loop){
      var is_matched = target.indexOf(search.substr(0, match_length_of_search + jump))
      if(is_matched > -1){
        match_length_of_search = match_length_of_search + jump;
        start_index_in_target = is_matched;
      }
      jump = parseInt(jump / 2);

      if(jump === 0){
        if(match_length_of_search === 0){
          return false;
        }
        if(target.indexOf(search.substr(0, match_length_of_search)) > -1 && target.indexOf(search.substr(0, match_length_of_search + 1)) === -1){
          return {match_length_of_search: match_length_of_search, matched: search.substr(0, match_length_of_search),start_index_in_target: start_index_in_target };
        }
        jump = 1;
      }
    }
  },
  fuzzyTailReplace: function (target, search, replace){
    var result = this.fuzzyTailMatch(target, search);
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
