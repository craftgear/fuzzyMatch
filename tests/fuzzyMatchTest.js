if (typeof exports === 'object') {
  var expect = require('expect.js');
  var fuzzyMatch = require('../fuzzyMatch.js');
}

describe('fuzzyMatch', function() {
  describe('fuzzyMatch.fuzzyTailMatch', function() {
    it('should match aaabbb with dddaaaccc only by aaa', function(done) {
      var search = 'aaabbb';
      var target = 'dddaaaccc';
      var result = fuzzyMatch.fuzzyTailMatch(search, target);
      expect(result).eql({
        matched_length_of_search: 3,
        matched: 'aaa',
        start_index_in_target: 3
      });
      done();
    });

    it('should match あいうえお:かきくけこ with かきくけこあいうえおさしすせそ, only by あいうえお', function(done) {
      var search = 'あいうえお:かきくけこ';
      var target = 'かきくけこあいうえおさしすせそ';
      var result = fuzzyMatch.fuzzyTailMatch(search, target);
      expect(result).eql({
        matched_length_of_search: 5,
        matched: 'あいうえお',
        start_index_in_target: 5
      });
      done();
    });

    it('should not match aaa with bbb', function(done) {
      var search = 'aaa';
      var target = 'bbb';
      var result = fuzzyMatch.fuzzyTailMatch(target, search);
      expect(result).to.be(false);
      done();
    });

    it('should not match less than minimum_char_length', function(done) {
      var search = 'Aaaabbbbcc';
      var target = 'Abcdefghij';
      var result = fuzzyMatch.fuzzyTailMatch(search, target, 3);
      expect(result).to.be(false);
      done();
    });

    it('should ignore difference between a space and an underscore', function(done) {
      var search = 'Aaaabbbbcc_dddeeefff';
      var target = 'Aaaabbbbcc dddeeefff';
      var result = fuzzyMatch.fuzzyTailMatch(search, target);
      expect(result).eql({
        matched_length_of_search: 20,
        matched: 'Aaaabbbbcc dddeeefff',
        start_index_in_target: 0
      });
      done();
    });

    it('should not ignore difference between characters other than a space and an underscore', function(done) {
      var search = 'Aaaabbbbcc_dddeeefff';
      var target = 'Aaaabbbbccあdddeeefff';
      var result = fuzzyMatch.fuzzyTailMatch(search, target);
      expect(result).eql({
        matched_length_of_search: 10,
        matched: 'Aaaabbbbcc',
        start_index_in_target: 0
      });
      done();
    });


    it('should not cause an infinite loop', function(done) {
      var search = '私たちの想い ||対話しませんか  木下電子工業株式会社';
      var target = '私たちの想い || 木下電子工業株式会社';
      var result = fuzzyMatch.fuzzyTailMatch(search, target);
      expect(result).eql({
        matched_length_of_search: 9,
        matched: '私たちの想い ||',
        start_index_in_target: 0
      });
      done();
    });
  });

  describe('fuzzyMatch.fuzzyTailReplace', function() {
    it('should replace aaabbb with aaaccc and ddd return dddbbb', function(done) {
      var result = fuzzyMatch.fuzzyTailReplace('aaaccc', 'cccaaabbb', 'ddd');
      expect(result).eql('cccdddbbb');
      done();
    });
  });
});
