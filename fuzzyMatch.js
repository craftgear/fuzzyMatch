var fuzzyMatch = {
  fuzzyTailMatch: function (target, search){
    if(!target || !search){
      return false;
    }
    search = search.replace(/^[\s\r\n\t　]+|[\s\n\r\t　]+$/g, '');
    //at first, try to whole matching
    if(target.indexOf(search) > -1){
      return {match_length_of_search: search.length, matched: search, start_index_in_target: target.indexOf(search) };
    }
    var len = search.length;
    var jump = parseInt(len / 2);
    var start_index_in_target = null;
    var match_length_of_search = 0;
    var loop = true;
    var _counter = 0;
    var max_loop = 10;
    while(_counter < 10){
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
      _counter++;
    }
    console.log('too many loop. gave up matching');
    return false;
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
