if(typeof exports === 'object'){
  var expect = require('expect.js');
  var fuzzyMatch = require('../fuzzyMatch.js');
}

describe('fuzzyMatch', function(){
  describe('fuzzyMatch.fuzzyTailMatch', function () {
    it('should match aaa with dddaaaccc only by aaa', function(done){
      var search = 'aaa';
      var target = 'dddaaaccc';
      var result = fuzzyMatch.fuzzyTailMatch(target, search);
      expect(result).eql({match_length_of_search:3, matched:'aaa', start_index_in_target:3});
      done();
    });

    it('should match aaabbb with dddaaaccc only by aaa', function(done){
      var search = 'aaabbb';
      var target = 'dddaaaccc';
      var result = fuzzyMatch.fuzzyTailMatch(target, search);
      expect(result).eql({match_length_of_search:3, matched:'aaa', start_index_in_target:3});
      done();
    });

    it('should match あいうえお:かきくけこ with かきくけこあいうえおさしすせそ, only by あいうえお', function(done){
      var search = 'あいうえお:かきくけこ';
      var target = 'かきくけこあいうえおさしすせそ';
      var result = fuzzyMatch.fuzzyTailMatch(target, search);
      expect(result).eql({match_length_of_search:5, matched:'あいうえお', start_index_in_target:5});
      done();
    });

    it('should not match aaa with bbb', function(done){
      var search = 'aaa';
      var target = 'bbb';
      var result = fuzzyMatch.fuzzyTailMatch(target, search);
      expect(result).to.be(false);
      done();
    });
  });

  describe('fuzzyMatch.fuzzyTailReplace', function () {
    it('should replace aaabbb with aaaccc and ddd return dddbbb', function (done) {
      var result = fuzzyMatch.fuzzyTailReplace('cccaaabbb', 'aaaccc', 'ddd');
      expect(result).eql('cccdddbbb');
      done();
    });
  });
});
