(function (f) { if (typeof exports === "object" && typeof module !== "undefined") { module.exports = f() } else if (typeof define === "function" && define.amd) { define([], f) } else { var g; if (typeof window !== "undefined") { g = window } else if (typeof global !== "undefined") { g = global } else if (typeof self !== "undefined") { g = self } else { g = this } g.latynka = f() } })(function () {
  var define, module, exports; return (function () { function r(e, n, t) { function o(i, f) { if (!n[i]) { if (!e[i]) { var c = "function" == typeof require && require; if (!f && c) return c(i, !0); if (u) return u(i, !0); var a = new Error("Cannot find module '" + i + "'"); throw a.code = "MODULE_NOT_FOUND", a } var p = n[i] = { exports: {} }; e[i][0].call(p.exports, function (r) { var n = e[i][1][r]; return o(n || r) }, p, p.exports, r, e, n, t) } return n[i].exports } for (var u = "function" == typeof require && require, i = 0; i < t.length; i++)o(t[i]); return o } return r })()({
    1: [function (require, module, exports) {
      // shim for using process in browser
      var process = module.exports = {};

      // cached from whatever global is present so that test runners that stub it
      // don't break things.  But we need to wrap it in a try catch in case it is
      // wrapped in strict mode code which doesn't define any globals.  It's inside a
      // function because try/catches deoptimize in certain engines.

      var cachedSetTimeout;
      var cachedClearTimeout;

      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      }())
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          //normal enviroments in sane situations
          return setTimeout(fun, 0);
        }
        // if setTimeout wasn't available but was latter defined
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
          }
        }


      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          //normal enviroments in sane situations
          return clearTimeout(marker);
        }
        // if clearTimeout wasn't available but was latter defined
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          // when when somebody has screwed with setTimeout but no I.E. maddness
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
          }
        }



      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;

      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }

      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;

        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }

      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };

      // v8 likes predictible objects
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = ''; // empty string to avoid regexp issues
      process.versions = {};

      function noop() { }

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;

      process.listeners = function (name) { return [] }

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      process.cwd = function () { return '/' };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () { return 0; };

    }, {}], 2: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.klatinoid = void 0;
      var _cyrToLat = require("./main/js/converters/cyrToLat.js");
      var _latToCyr = require("./main/js/converters/latToCyr.js");
      var _test = require("./test/js/test.js");
      const klatinoid = {
        cyrToLat: _cyrToLat.cyrToLat,
        latToCyr: _latToCyr.latToCyr,
        runTests: _test.runTests
      };
      exports.klatinoid = klatinoid;

    }, { "./main/js/converters/cyrToLat.js": 5, "./main/js/converters/latToCyr.js": 10, "./test/js/test.js": 11 }], 3: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.diff_match_patch = void 0;
      /**
       * Diff Match and Patch
       * Copyright 2018 The diff-match-patch Authors.
       * https://github.com/google/diff-match-patch
       *
       * Licensed under the Apache License, Version 2.0 (the "License");
       * you may not use this file except in compliance with the License.
       * You may obtain a copy of the License at
       *
       *   http://www.apache.org/licenses/LICENSE-2.0
       *
       * Unless required by applicable law or agreed to in writing, software
       * distributed under the License is distributed on an "AS IS" BASIS,
       * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
       * See the License for the specific language governing permissions and
       * limitations under the License.
       */

      /**
       * @fileoverview Computes the difference between two texts to create a patch.
       * Applies the patch onto another text, allowing for errors.
       * @author fraser@google.com (Neil Fraser)
       */

      /**
       * Class containing the diff, match and patch methods.
       * @constructor
       */
      var diff_match_patch = function () {
        // Defaults.
        // Redefine these in your program to override the defaults.

        // Number of seconds to map a diff before giving up (0 for infinity).
        this.Diff_Timeout = 1.0;
        // Cost of an empty edit operation in terms of edit characters.
        this.Diff_EditCost = 4;
        // At what point is no match declared (0.0 = perfection, 1.0 = very loose).
        this.Match_Threshold = 0.5;
        // How far to search for a match (0 = exact location, 1000+ = broad match).
        // A match this many characters away from the expected location will add
        // 1.0 to the score (0.0 is a perfect match).
        this.Match_Distance = 1000;
        // When deleting a large block of text (over ~64 characters), how close do
        // the contents have to be to match the expected contents. (0.0 = perfection,
        // 1.0 = very loose).  Note that Match_Threshold controls how closely the
        // end points of a delete need to match.
        this.Patch_DeleteThreshold = 0.5;
        // Chunk size for context length.
        this.Patch_Margin = 4;

        // The number of bits in an int.
        this.Match_MaxBits = 32;
      };

      //  DIFF FUNCTIONS

      /**
       * The data structure representing a diff is an array of tuples:
       * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
       * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
       */
      exports.diff_match_patch = diff_match_patch;
      var DIFF_DELETE = -1;
      var DIFF_INSERT = 1;
      var DIFF_EQUAL = 0;

      /**
       * Class representing one diff tuple.
       * Attempts to look like a two-element array (which is what this used to be).
       * @param {number} op Operation, one of: DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL.
       * @param {string} text Text to be deleted, inserted, or retained.
       * @constructor
       */
      diff_match_patch.Diff = function (op, text) {
        this[0] = op;
        this[1] = text;
      };
      diff_match_patch.Diff.prototype.length = 2;

      /**
       * Emulate the output of a two-element array.
       * @return {string} Diff operation as a string.
       */
      diff_match_patch.Diff.prototype.toString = function () {
        return this[0] + ',' + this[1];
      };

      /**
       * Find the differences between two texts.  Simplifies the problem by stripping
       * any common prefix or suffix off the texts before diffing.
       * @param {string} text1 Old string to be diffed.
       * @param {string} text2 New string to be diffed.
       * @param {boolean=} opt_checklines Optional speedup flag. If present and false,
       *     then don't run a line-level diff first to identify the changed areas.
       *     Defaults to true, which does a faster, slightly less optimal diff.
       * @param {number=} opt_deadline Optional time when the diff should be complete
       *     by.  Used internally for recursive calls.  Users should set DiffTimeout
       *     instead.
       * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
       */
      diff_match_patch.prototype.diff_main = function (text1, text2, opt_checklines, opt_deadline) {
        // Set a deadline by which time the diff must be complete.
        if (typeof opt_deadline == 'undefined') {
          if (this.Diff_Timeout <= 0) {
            opt_deadline = Number.MAX_VALUE;
          } else {
            opt_deadline = new Date().getTime() + this.Diff_Timeout * 1000;
          }
        }
        var deadline = opt_deadline;

        // Check for null inputs.
        if (text1 == null || text2 == null) {
          throw new Error('Null input. (diff_main)');
        }

        // Check for equality (speedup).
        if (text1 == text2) {
          if (text1) {
            return [new diff_match_patch.Diff(DIFF_EQUAL, text1)];
          }
          return [];
        }
        if (typeof opt_checklines == 'undefined') {
          opt_checklines = true;
        }
        var checklines = opt_checklines;

        // Trim off common prefix (speedup).
        var commonlength = this.diff_commonPrefix(text1, text2);
        var commonprefix = text1.substring(0, commonlength);
        text1 = text1.substring(commonlength);
        text2 = text2.substring(commonlength);

        // Trim off common suffix (speedup).
        commonlength = this.diff_commonSuffix(text1, text2);
        var commonsuffix = text1.substring(text1.length - commonlength);
        text1 = text1.substring(0, text1.length - commonlength);
        text2 = text2.substring(0, text2.length - commonlength);

        // Compute the diff on the middle block.
        var diffs = this.diff_compute_(text1, text2, checklines, deadline);

        // Restore the prefix and suffix.
        if (commonprefix) {
          diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, commonprefix));
        }
        if (commonsuffix) {
          diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, commonsuffix));
        }
        this.diff_cleanupMerge(diffs);
        return diffs;
      };

      /**
       * Find the differences between two texts.  Assumes that the texts do not
       * have any common prefix or suffix.
       * @param {string} text1 Old string to be diffed.
       * @param {string} text2 New string to be diffed.
       * @param {boolean} checklines Speedup flag.  If false, then don't run a
       *     line-level diff first to identify the changed areas.
       *     If true, then run a faster, slightly less optimal diff.
       * @param {number} deadline Time when the diff should be complete by.
       * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
       * @private
       */
      diff_match_patch.prototype.diff_compute_ = function (text1, text2, checklines, deadline) {
        var diffs;
        if (!text1) {
          // Just add some text (speedup).
          return [new diff_match_patch.Diff(DIFF_INSERT, text2)];
        }
        if (!text2) {
          // Just delete some text (speedup).
          return [new diff_match_patch.Diff(DIFF_DELETE, text1)];
        }
        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        var i = longtext.indexOf(shorttext);
        if (i != -1) {
          // Shorter text is inside the longer text (speedup).
          diffs = [new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(0, i)), new diff_match_patch.Diff(DIFF_EQUAL, shorttext), new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(i + shorttext.length))];
          // Swap insertions for deletions if diff is reversed.
          if (text1.length > text2.length) {
            diffs[0][0] = diffs[2][0] = DIFF_DELETE;
          }
          return diffs;
        }
        if (shorttext.length == 1) {
          // Single character string.
          // After the previous speedup, the character can't be an equality.
          return [new diff_match_patch.Diff(DIFF_DELETE, text1), new diff_match_patch.Diff(DIFF_INSERT, text2)];
        }

        // Check to see if the problem can be split in two.
        var hm = this.diff_halfMatch_(text1, text2);
        if (hm) {
          // A half-match was found, sort out the return data.
          var text1_a = hm[0];
          var text1_b = hm[1];
          var text2_a = hm[2];
          var text2_b = hm[3];
          var mid_common = hm[4];
          // Send both pairs off for separate processing.
          var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
          var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
          // Merge the results.
          return diffs_a.concat([new diff_match_patch.Diff(DIFF_EQUAL, mid_common)], diffs_b);
        }
        if (checklines && text1.length > 100 && text2.length > 100) {
          return this.diff_lineMode_(text1, text2, deadline);
        }
        return this.diff_bisect_(text1, text2, deadline);
      };

      /**
       * Do a quick line-level diff on both strings, then rediff the parts for
       * greater accuracy.
       * This speedup can produce non-minimal diffs.
       * @param {string} text1 Old string to be diffed.
       * @param {string} text2 New string to be diffed.
       * @param {number} deadline Time when the diff should be complete by.
       * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
       * @private
       */
      diff_match_patch.prototype.diff_lineMode_ = function (text1, text2, deadline) {
        // Scan the text on a line-by-line basis first.
        var a = this.diff_linesToChars_(text1, text2);
        text1 = a.chars1;
        text2 = a.chars2;
        var linearray = a.lineArray;
        var diffs = this.diff_main(text1, text2, false, deadline);

        // Convert the diff back to original text.
        this.diff_charsToLines_(diffs, linearray);
        // Eliminate freak matches (e.g. blank lines)
        this.diff_cleanupSemantic(diffs);

        // Rediff any replacement blocks, this time character-by-character.
        // Add a dummy entry at the end.
        diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
        var pointer = 0;
        var count_delete = 0;
        var count_insert = 0;
        var text_delete = '';
        var text_insert = '';
        while (pointer < diffs.length) {
          switch (diffs[pointer][0]) {
            case DIFF_INSERT:
              count_insert++;
              text_insert += diffs[pointer][1];
              break;
            case DIFF_DELETE:
              count_delete++;
              text_delete += diffs[pointer][1];
              break;
            case DIFF_EQUAL:
              // Upon reaching an equality, check for prior redundancies.
              if (count_delete >= 1 && count_insert >= 1) {
                // Delete the offending records and add the merged ones.
                diffs.splice(pointer - count_delete - count_insert, count_delete + count_insert);
                pointer = pointer - count_delete - count_insert;
                var subDiff = this.diff_main(text_delete, text_insert, false, deadline);
                for (var j = subDiff.length - 1; j >= 0; j--) {
                  diffs.splice(pointer, 0, subDiff[j]);
                }
                pointer = pointer + subDiff.length;
              }
              count_insert = 0;
              count_delete = 0;
              text_delete = '';
              text_insert = '';
              break;
          }
          pointer++;
        }
        diffs.pop(); // Remove the dummy entry at the end.

        return diffs;
      };

      /**
       * Find the 'middle snake' of a diff, split the problem in two
       * and return the recursively constructed diff.
       * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.
       * @param {string} text1 Old string to be diffed.
       * @param {string} text2 New string to be diffed.
       * @param {number} deadline Time at which to bail if not yet complete.
       * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
       * @private
       */
      diff_match_patch.prototype.diff_bisect_ = function (text1, text2, deadline) {
        // Cache the text lengths to prevent multiple calls.
        var text1_length = text1.length;
        var text2_length = text2.length;
        var max_d = Math.ceil((text1_length + text2_length) / 2);
        var v_offset = max_d;
        var v_length = 2 * max_d;
        var v1 = new Array(v_length);
        var v2 = new Array(v_length);
        // Setting all elements to -1 is faster in Chrome & Firefox than mixing
        // integers and undefined.
        for (var x = 0; x < v_length; x++) {
          v1[x] = -1;
          v2[x] = -1;
        }
        v1[v_offset + 1] = 0;
        v2[v_offset + 1] = 0;
        var delta = text1_length - text2_length;
        // If the total number of characters is odd, then the front path will collide
        // with the reverse path.
        var front = delta % 2 != 0;
        // Offsets for start and end of k loop.
        // Prevents mapping of space beyond the grid.
        var k1start = 0;
        var k1end = 0;
        var k2start = 0;
        var k2end = 0;
        for (var d = 0; d < max_d; d++) {
          // Bail out if deadline is reached.
          if (new Date().getTime() > deadline) {
            break;
          }

          // Walk the front path one step.
          for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
            var k1_offset = v_offset + k1;
            var x1;
            if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
              x1 = v1[k1_offset + 1];
            } else {
              x1 = v1[k1_offset - 1] + 1;
            }
            var y1 = x1 - k1;
            while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
              x1++;
              y1++;
            }
            v1[k1_offset] = x1;
            if (x1 > text1_length) {
              // Ran off the right of the graph.
              k1end += 2;
            } else if (y1 > text2_length) {
              // Ran off the bottom of the graph.
              k1start += 2;
            } else if (front) {
              var k2_offset = v_offset + delta - k1;
              if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
                // Mirror x2 onto top-left coordinate system.
                var x2 = text1_length - v2[k2_offset];
                if (x1 >= x2) {
                  // Overlap detected.
                  return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
                }
              }
            }
          }

          // Walk the reverse path one step.
          for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
            var k2_offset = v_offset + k2;
            var x2;
            if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
              x2 = v2[k2_offset + 1];
            } else {
              x2 = v2[k2_offset - 1] + 1;
            }
            var y2 = x2 - k2;
            while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) == text2.charAt(text2_length - y2 - 1)) {
              x2++;
              y2++;
            }
            v2[k2_offset] = x2;
            if (x2 > text1_length) {
              // Ran off the left of the graph.
              k2end += 2;
            } else if (y2 > text2_length) {
              // Ran off the top of the graph.
              k2start += 2;
            } else if (!front) {
              var k1_offset = v_offset + delta - k2;
              if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
                var x1 = v1[k1_offset];
                var y1 = v_offset + x1 - k1_offset;
                // Mirror x2 onto top-left coordinate system.
                x2 = text1_length - x2;
                if (x1 >= x2) {
                  // Overlap detected.
                  return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
                }
              }
            }
          }
        }
        // Diff took too long and hit the deadline or
        // number of diffs equals number of characters, no commonality at all.
        return [new diff_match_patch.Diff(DIFF_DELETE, text1), new diff_match_patch.Diff(DIFF_INSERT, text2)];
      };

      /**
       * Given the location of the 'middle snake', split the diff in two parts
       * and recurse.
       * @param {string} text1 Old string to be diffed.
       * @param {string} text2 New string to be diffed.
       * @param {number} x Index of split point in text1.
       * @param {number} y Index of split point in text2.
       * @param {number} deadline Time at which to bail if not yet complete.
       * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
       * @private
       */
      diff_match_patch.prototype.diff_bisectSplit_ = function (text1, text2, x, y, deadline) {
        var text1a = text1.substring(0, x);
        var text2a = text2.substring(0, y);
        var text1b = text1.substring(x);
        var text2b = text2.substring(y);

        // Compute both diffs serially.
        var diffs = this.diff_main(text1a, text2a, false, deadline);
        var diffsb = this.diff_main(text1b, text2b, false, deadline);
        return diffs.concat(diffsb);
      };

      /**
       * Split two texts into an array of strings.  Reduce the texts to a string of
       * hashes where each Unicode character represents one line.
       * @param {string} text1 First string.
       * @param {string} text2 Second string.
       * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}
       *     An object containing the encoded text1, the encoded text2 and
       *     the array of unique strings.
       *     The zeroth element of the array of unique strings is intentionally blank.
       * @private
       */
      diff_match_patch.prototype.diff_linesToChars_ = function (text1, text2) {
        var lineArray = []; // e.g. lineArray[4] == 'Hello\n'
        var lineHash = {}; // e.g. lineHash['Hello\n'] == 4

        // '\x00' is a valid character, but various debuggers don't like it.
        // So we'll insert a junk entry to avoid generating a null character.
        lineArray[0] = '';

        /**
         * Split a text into an array of strings.  Reduce the texts to a string of
         * hashes where each Unicode character represents one line.
         * Modifies linearray and linehash through being a closure.
         * @param {string} text String to encode.
         * @return {string} Encoded string.
         * @private
         */
        function diff_linesToCharsMunge_(text) {
          var chars = '';
          // Walk the text, pulling out a substring for each line.
          // text.split('\n') would would temporarily double our memory footprint.
          // Modifying text would create many large strings to garbage collect.
          var lineStart = 0;
          var lineEnd = -1;
          // Keeping our own length variable is faster than looking it up.
          var lineArrayLength = lineArray.length;
          while (lineEnd < text.length - 1) {
            lineEnd = text.indexOf('\n', lineStart);
            if (lineEnd == -1) {
              lineEnd = text.length - 1;
            }
            var line = text.substring(lineStart, lineEnd + 1);
            if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== undefined) {
              chars += String.fromCharCode(lineHash[line]);
            } else {
              if (lineArrayLength == maxLines) {
                // Bail out at 65535 because
                // String.fromCharCode(65536) == String.fromCharCode(0)
                line = text.substring(lineStart);
                lineEnd = text.length;
              }
              chars += String.fromCharCode(lineArrayLength);
              lineHash[line] = lineArrayLength;
              lineArray[lineArrayLength++] = line;
            }
            lineStart = lineEnd + 1;
          }
          return chars;
        }
        // Allocate 2/3rds of the space for text1, the rest for text2.
        var maxLines = 40000;
        var chars1 = diff_linesToCharsMunge_(text1);
        maxLines = 65535;
        var chars2 = diff_linesToCharsMunge_(text2);
        return {
          chars1: chars1,
          chars2: chars2,
          lineArray: lineArray
        };
      };

      /**
       * Rehydrate the text in a diff from a string of line hashes to real lines of
       * text.
       * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
       * @param {!Array.<string>} lineArray Array of unique strings.
       * @private
       */
      diff_match_patch.prototype.diff_charsToLines_ = function (diffs, lineArray) {
        for (var i = 0; i < diffs.length; i++) {
          var chars = diffs[i][1];
          var text = [];
          for (var j = 0; j < chars.length; j++) {
            text[j] = lineArray[chars.charCodeAt(j)];
          }
          diffs[i][1] = text.join('');
        }
      };

      /**
       * Determine the common prefix of two strings.
       * @param {string} text1 First string.
       * @param {string} text2 Second string.
       * @return {number} The number of characters common to the start of each
       *     string.
       */
      diff_match_patch.prototype.diff_commonPrefix = function (text1, text2) {
        // Quick check for common null cases.
        if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
          return 0;
        }
        // Binary search.
        // Performance analysis: https://neil.fraser.name/news/2007/10/09/
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerstart = 0;
        while (pointermin < pointermid) {
          if (text1.substring(pointerstart, pointermid) == text2.substring(pointerstart, pointermid)) {
            pointermin = pointermid;
            pointerstart = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        return pointermid;
      };

      /**
       * Determine the common suffix of two strings.
       * @param {string} text1 First string.
       * @param {string} text2 Second string.
       * @return {number} The number of characters common to the end of each string.
       */
      diff_match_patch.prototype.diff_commonSuffix = function (text1, text2) {
        // Quick check for common null cases.
        if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
          return 0;
        }
        // Binary search.
        // Performance analysis: https://neil.fraser.name/news/2007/10/09/
        var pointermin = 0;
        var pointermax = Math.min(text1.length, text2.length);
        var pointermid = pointermax;
        var pointerend = 0;
        while (pointermin < pointermid) {
          if (text1.substring(text1.length - pointermid, text1.length - pointerend) == text2.substring(text2.length - pointermid, text2.length - pointerend)) {
            pointermin = pointermid;
            pointerend = pointermin;
          } else {
            pointermax = pointermid;
          }
          pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
        }
        return pointermid;
      };

      /**
       * Determine if the suffix of one string is the prefix of another.
       * @param {string} text1 First string.
       * @param {string} text2 Second string.
       * @return {number} The number of characters common to the end of the first
       *     string and the start of the second string.
       * @private
       */
      diff_match_patch.prototype.diff_commonOverlap_ = function (text1, text2) {
        // Cache the text lengths to prevent multiple calls.
        var text1_length = text1.length;
        var text2_length = text2.length;
        // Eliminate the null case.
        if (text1_length == 0 || text2_length == 0) {
          return 0;
        }
        // Truncate the longer string.
        if (text1_length > text2_length) {
          text1 = text1.substring(text1_length - text2_length);
        } else if (text1_length < text2_length) {
          text2 = text2.substring(0, text1_length);
        }
        var text_length = Math.min(text1_length, text2_length);
        // Quick check for the worst case.
        if (text1 == text2) {
          return text_length;
        }

        // Start by looking for a single character match
        // and increase length until no match is found.
        // Performance analysis: https://neil.fraser.name/news/2010/11/04/
        var best = 0;
        var length = 1;
        while (true) {
          var pattern = text1.substring(text_length - length);
          var found = text2.indexOf(pattern);
          if (found == -1) {
            return best;
          }
          length += found;
          if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
            best = length;
            length++;
          }
        }
      };

      /**
       * Do the two texts share a substring which is at least half the length of the
       * longer text?
       * This speedup can produce non-minimal diffs.
       * @param {string} text1 First string.
       * @param {string} text2 Second string.
       * @return {Array.<string>} Five element Array, containing the prefix of
       *     text1, the suffix of text1, the prefix of text2, the suffix of
       *     text2 and the common middle.  Or null if there was no match.
       * @private
       */
      diff_match_patch.prototype.diff_halfMatch_ = function (text1, text2) {
        if (this.Diff_Timeout <= 0) {
          // Don't risk returning a non-optimal diff if we have unlimited time.
          return null;
        }
        var longtext = text1.length > text2.length ? text1 : text2;
        var shorttext = text1.length > text2.length ? text2 : text1;
        if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
          return null; // Pointless.
        }

        var dmp = this; // 'this' becomes 'window' in a closure.

        /**
         * Does a substring of shorttext exist within longtext such that the substring
         * is at least half the length of longtext?
         * Closure, but does not reference any external variables.
         * @param {string} longtext Longer string.
         * @param {string} shorttext Shorter string.
         * @param {number} i Start index of quarter length substring within longtext.
         * @return {Array.<string>} Five element Array, containing the prefix of
         *     longtext, the suffix of longtext, the prefix of shorttext, the suffix
         *     of shorttext and the common middle.  Or null if there was no match.
         * @private
         */
        function diff_halfMatchI_(longtext, shorttext, i) {
          // Start with a 1/4 length substring at position i as a seed.
          var seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
          var j = -1;
          var best_common = '';
          var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
          while ((j = shorttext.indexOf(seed, j + 1)) != -1) {
            var prefixLength = dmp.diff_commonPrefix(longtext.substring(i), shorttext.substring(j));
            var suffixLength = dmp.diff_commonSuffix(longtext.substring(0, i), shorttext.substring(0, j));
            if (best_common.length < suffixLength + prefixLength) {
              best_common = shorttext.substring(j - suffixLength, j) + shorttext.substring(j, j + prefixLength);
              best_longtext_a = longtext.substring(0, i - suffixLength);
              best_longtext_b = longtext.substring(i + prefixLength);
              best_shorttext_a = shorttext.substring(0, j - suffixLength);
              best_shorttext_b = shorttext.substring(j + prefixLength);
            }
          }
          if (best_common.length * 2 >= longtext.length) {
            return [best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b, best_common];
          } else {
            return null;
          }
        }

        // First check if the second quarter is the seed for a half-match.
        var hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
        // Check again based on the third quarter.
        var hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
        var hm;
        if (!hm1 && !hm2) {
          return null;
        } else if (!hm2) {
          hm = hm1;
        } else if (!hm1) {
          hm = hm2;
        } else {
          // Both matched.  Select the longest.
          hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
        }

        // A half-match was found, sort out the return data.
        var text1_a, text1_b, text2_a, text2_b;
        if (text1.length > text2.length) {
          text1_a = hm[0];
          text1_b = hm[1];
          text2_a = hm[2];
          text2_b = hm[3];
        } else {
          text2_a = hm[0];
          text2_b = hm[1];
          text1_a = hm[2];
          text1_b = hm[3];
        }
        var mid_common = hm[4];
        return [text1_a, text1_b, text2_a, text2_b, mid_common];
      };

      /**
       * Reduce the number of edits by eliminating semantically trivial equalities.
       * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
       */
      diff_match_patch.prototype.diff_cleanupSemantic = function (diffs) {
        var changes = false;
        var equalities = []; // Stack of indices where equalities are found.
        var equalitiesLength = 0; // Keeping our own length var is faster in JS.
        /** @type {?string} */
        var lastEquality = null;
        // Always equal to diffs[equalities[equalitiesLength - 1]][1]
        var pointer = 0; // Index of current position.
        // Number of characters that changed prior to the equality.
        var length_insertions1 = 0;
        var length_deletions1 = 0;
        // Number of characters that changed after the equality.
        var length_insertions2 = 0;
        var length_deletions2 = 0;
        while (pointer < diffs.length) {
          if (diffs[pointer][0] == DIFF_EQUAL) {
            // Equality found.
            equalities[equalitiesLength++] = pointer;
            length_insertions1 = length_insertions2;
            length_deletions1 = length_deletions2;
            length_insertions2 = 0;
            length_deletions2 = 0;
            lastEquality = diffs[pointer][1];
          } else {
            // An insertion or deletion.
            if (diffs[pointer][0] == DIFF_INSERT) {
              length_insertions2 += diffs[pointer][1].length;
            } else {
              length_deletions2 += diffs[pointer][1].length;
            }
            // Eliminate an equality that is smaller or equal to the edits on both
            // sides of it.
            if (lastEquality && lastEquality.length <= Math.max(length_insertions1, length_deletions1) && lastEquality.length <= Math.max(length_insertions2, length_deletions2)) {
              // Duplicate record.
              diffs.splice(equalities[equalitiesLength - 1], 0, new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
              // Change second copy to insert.
              diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
              // Throw away the equality we just deleted.
              equalitiesLength--;
              // Throw away the previous equality (it needs to be reevaluated).
              equalitiesLength--;
              pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
              length_insertions1 = 0; // Reset the counters.
              length_deletions1 = 0;
              length_insertions2 = 0;
              length_deletions2 = 0;
              lastEquality = null;
              changes = true;
            }
          }
          pointer++;
        }

        // Normalize the diff.
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
        this.diff_cleanupSemanticLossless(diffs);

        // Find any overlaps between deletions and insertions.
        // e.g: <del>abcxxx</del><ins>xxxdef</ins>
        //   -> <del>abc</del>xxx<ins>def</ins>
        // e.g: <del>xxxabc</del><ins>defxxx</ins>
        //   -> <ins>def</ins>xxx<del>abc</del>
        // Only extract an overlap if it is as big as the edit ahead or behind it.
        pointer = 1;
        while (pointer < diffs.length) {
          if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
            var deletion = diffs[pointer - 1][1];
            var insertion = diffs[pointer][1];
            var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
            var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
            if (overlap_length1 >= overlap_length2) {
              if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
                // Overlap found.  Insert an equality and trim the surrounding edits.
                diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL, insertion.substring(0, overlap_length1)));
                diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
                diffs[pointer + 1][1] = insertion.substring(overlap_length1);
                pointer++;
              }
            } else {
              if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
                // Reverse overlap found.
                // Insert an equality and swap and trim the surrounding edits.
                diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL, deletion.substring(0, overlap_length2)));
                diffs[pointer - 1][0] = DIFF_INSERT;
                diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
                diffs[pointer + 1][0] = DIFF_DELETE;
                diffs[pointer + 1][1] = deletion.substring(overlap_length2);
                pointer++;
              }
            }
            pointer++;
          }
          pointer++;
        }
      };

      /**
       * Look for single edits surrounded on both sides by equalities
       * which can be shifted sideways to align the edit to a word boundary.
       * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
       * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
       */
      diff_match_patch.prototype.diff_cleanupSemanticLossless = function (diffs) {
        /**
         * Given two strings, compute a score representing whether the internal
         * boundary falls on logical boundaries.
         * Scores range from 6 (best) to 0 (worst).
         * Closure, but does not reference any external variables.
         * @param {string} one First string.
         * @param {string} two Second string.
         * @return {number} The score.
         * @private
         */
        function diff_cleanupSemanticScore_(one, two) {
          if (!one || !two) {
            // Edges are the best.
            return 6;
          }

          // Each port of this function behaves slightly differently due to
          // subtle differences in each language's definition of things like
          // 'whitespace'.  Since this function's purpose is largely cosmetic,
          // the choice has been made to use each language's native features
          // rather than force total conformity.
          var char1 = one.charAt(one.length - 1);
          var char2 = two.charAt(0);
          var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
          var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
          var whitespace1 = nonAlphaNumeric1 && char1.match(diff_match_patch.whitespaceRegex_);
          var whitespace2 = nonAlphaNumeric2 && char2.match(diff_match_patch.whitespaceRegex_);
          var lineBreak1 = whitespace1 && char1.match(diff_match_patch.linebreakRegex_);
          var lineBreak2 = whitespace2 && char2.match(diff_match_patch.linebreakRegex_);
          var blankLine1 = lineBreak1 && one.match(diff_match_patch.blanklineEndRegex_);
          var blankLine2 = lineBreak2 && two.match(diff_match_patch.blanklineStartRegex_);
          if (blankLine1 || blankLine2) {
            // Five points for blank lines.
            return 5;
          } else if (lineBreak1 || lineBreak2) {
            // Four points for line breaks.
            return 4;
          } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
            // Three points for end of sentences.
            return 3;
          } else if (whitespace1 || whitespace2) {
            // Two points for whitespace.
            return 2;
          } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
            // One point for non-alphanumeric.
            return 1;
          }
          return 0;
        }
        var pointer = 1;
        // Intentionally ignore the first and last element (don't need checking).
        while (pointer < diffs.length - 1) {
          if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
            // This is a single edit surrounded by equalities.
            var equality1 = diffs[pointer - 1][1];
            var edit = diffs[pointer][1];
            var equality2 = diffs[pointer + 1][1];

            // First, shift the edit as far left as possible.
            var commonOffset = this.diff_commonSuffix(equality1, edit);
            if (commonOffset) {
              var commonString = edit.substring(edit.length - commonOffset);
              equality1 = equality1.substring(0, equality1.length - commonOffset);
              edit = commonString + edit.substring(0, edit.length - commonOffset);
              equality2 = commonString + equality2;
            }

            // Second, step character by character right, looking for the best fit.
            var bestEquality1 = equality1;
            var bestEdit = edit;
            var bestEquality2 = equality2;
            var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
            while (edit.charAt(0) === equality2.charAt(0)) {
              equality1 += edit.charAt(0);
              edit = edit.substring(1) + equality2.charAt(0);
              equality2 = equality2.substring(1);
              var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
              // The >= encourages trailing rather than leading whitespace on edits.
              if (score >= bestScore) {
                bestScore = score;
                bestEquality1 = equality1;
                bestEdit = edit;
                bestEquality2 = equality2;
              }
            }
            if (diffs[pointer - 1][1] != bestEquality1) {
              // We have an improvement, save it back to the diff.
              if (bestEquality1) {
                diffs[pointer - 1][1] = bestEquality1;
              } else {
                diffs.splice(pointer - 1, 1);
                pointer--;
              }
              diffs[pointer][1] = bestEdit;
              if (bestEquality2) {
                diffs[pointer + 1][1] = bestEquality2;
              } else {
                diffs.splice(pointer + 1, 1);
                pointer--;
              }
            }
          }
          pointer++;
        }
      };

      // Define some regex patterns for matching boundaries.
      diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
      diff_match_patch.whitespaceRegex_ = /\s/;
      diff_match_patch.linebreakRegex_ = /[\r\n]/;
      diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
      diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;

      /**
       * Reduce the number of edits by eliminating operationally trivial equalities.
       * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
       */
      diff_match_patch.prototype.diff_cleanupEfficiency = function (diffs) {
        var changes = false;
        var equalities = []; // Stack of indices where equalities are found.
        var equalitiesLength = 0; // Keeping our own length var is faster in JS.
        /** @type {?string} */
        var lastEquality = null;
        // Always equal to diffs[equalities[equalitiesLength - 1]][1]
        var pointer = 0; // Index of current position.
        // Is there an insertion operation before the last equality.
        var pre_ins = false;
        // Is there a deletion operation before the last equality.
        var pre_del = false;
        // Is there an insertion operation after the last equality.
        var post_ins = false;
        // Is there a deletion operation after the last equality.
        var post_del = false;
        while (pointer < diffs.length) {
          if (diffs[pointer][0] == DIFF_EQUAL) {
            // Equality found.
            if (diffs[pointer][1].length < this.Diff_EditCost && (post_ins || post_del)) {
              // Candidate found.
              equalities[equalitiesLength++] = pointer;
              pre_ins = post_ins;
              pre_del = post_del;
              lastEquality = diffs[pointer][1];
            } else {
              // Not a candidate, and can never become one.
              equalitiesLength = 0;
              lastEquality = null;
            }
            post_ins = post_del = false;
          } else {
            // An insertion or deletion.
            if (diffs[pointer][0] == DIFF_DELETE) {
              post_del = true;
            } else {
              post_ins = true;
            }
            /*
             * Five types to be split:
             * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>
             * <ins>A</ins>X<ins>C</ins><del>D</del>
             * <ins>A</ins><del>B</del>X<ins>C</ins>
             * <ins>A</del>X<ins>C</ins><del>D</del>
             * <ins>A</ins><del>B</del>X<del>C</del>
             */
            if (lastEquality && (pre_ins && pre_del && post_ins && post_del || lastEquality.length < this.Diff_EditCost / 2 && pre_ins + pre_del + post_ins + post_del == 3)) {
              // Duplicate record.
              diffs.splice(equalities[equalitiesLength - 1], 0, new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
              // Change second copy to insert.
              diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
              equalitiesLength--; // Throw away the equality we just deleted;
              lastEquality = null;
              if (pre_ins && pre_del) {
                // No changes made which could affect previous entry, keep going.
                post_ins = post_del = true;
                equalitiesLength = 0;
              } else {
                equalitiesLength--; // Throw away the previous equality.
                pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
                post_ins = post_del = false;
              }
              changes = true;
            }
          }
          pointer++;
        }
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
      };

      /**
       * Reorder and merge like edit sections.  Merge equalities.
       * Any edit section can move as long as it doesn't cross an equality.
       * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
       */
      diff_match_patch.prototype.diff_cleanupMerge = function (diffs) {
        // Add a dummy entry at the end.
        diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ''));
        var pointer = 0;
        var count_delete = 0;
        var count_insert = 0;
        var text_delete = '';
        var text_insert = '';
        var commonlength;
        while (pointer < diffs.length) {
          switch (diffs[pointer][0]) {
            case DIFF_INSERT:
              count_insert++;
              text_insert += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_DELETE:
              count_delete++;
              text_delete += diffs[pointer][1];
              pointer++;
              break;
            case DIFF_EQUAL:
              // Upon reaching an equality, check for prior redundancies.
              if (count_delete + count_insert > 1) {
                if (count_delete !== 0 && count_insert !== 0) {
                  // Factor out any common prefixies.
                  commonlength = this.diff_commonPrefix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                      diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
                    } else {
                      diffs.splice(0, 0, new diff_match_patch.Diff(DIFF_EQUAL, text_insert.substring(0, commonlength)));
                      pointer++;
                    }
                    text_insert = text_insert.substring(commonlength);
                    text_delete = text_delete.substring(commonlength);
                  }
                  // Factor out any common suffixies.
                  commonlength = this.diff_commonSuffix(text_insert, text_delete);
                  if (commonlength !== 0) {
                    diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                    text_insert = text_insert.substring(0, text_insert.length - commonlength);
                    text_delete = text_delete.substring(0, text_delete.length - commonlength);
                  }
                }
                // Delete the offending records and add the merged ones.
                pointer -= count_delete + count_insert;
                diffs.splice(pointer, count_delete + count_insert);
                if (text_delete.length) {
                  diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_DELETE, text_delete));
                  pointer++;
                }
                if (text_insert.length) {
                  diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_INSERT, text_insert));
                  pointer++;
                }
                pointer++;
              } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
                // Merge this equality with the previous one.
                diffs[pointer - 1][1] += diffs[pointer][1];
                diffs.splice(pointer, 1);
              } else {
                pointer++;
              }
              count_insert = 0;
              count_delete = 0;
              text_delete = '';
              text_insert = '';
              break;
          }
        }
        if (diffs[diffs.length - 1][1] === '') {
          diffs.pop(); // Remove the dummy entry at the end.
        }

        // Second pass: look for single edits surrounded on both sides by equalities
        // which can be shifted sideways to eliminate an equality.
        // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
        var changes = false;
        pointer = 1;
        // Intentionally ignore the first and last element (don't need checking).
        while (pointer < diffs.length - 1) {
          if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
            // This is a single edit surrounded by equalities.
            if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
              // Shift the edit over the previous equality.
              diffs[pointer][1] = diffs[pointer - 1][1] + diffs[pointer][1].substring(0, diffs[pointer][1].length - diffs[pointer - 1][1].length);
              diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
              diffs.splice(pointer - 1, 1);
              changes = true;
            } else if (diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) == diffs[pointer + 1][1]) {
              // Shift the edit over the next equality.
              diffs[pointer - 1][1] += diffs[pointer + 1][1];
              diffs[pointer][1] = diffs[pointer][1].substring(diffs[pointer + 1][1].length) + diffs[pointer + 1][1];
              diffs.splice(pointer + 1, 1);
              changes = true;
            }
          }
          pointer++;
        }
        // If shifts were made, the diff needs reordering and another shift sweep.
        if (changes) {
          this.diff_cleanupMerge(diffs);
        }
      };

      /**
       * loc is a location in text1, compute and return the equivalent location in
       * text2.
       * e.g. 'The cat' vs 'The big cat', 1->1, 5->8
       * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
       * @param {number} loc Location within text1.
       * @return {number} Location within text2.
       */
      diff_match_patch.prototype.diff_xIndex = function (diffs, loc) {
        var chars1 = 0;
        var chars2 = 0;
        var last_chars1 = 0;
        var last_chars2 = 0;
        var x;
        for (x = 0; x < diffs.length; x++) {
          if (diffs[x][0] !== DIFF_INSERT) {
            // Equality or deletion.
            chars1 += diffs[x][1].length;
          }
          if (diffs[x][0] !== DIFF_DELETE) {
            // Equality or insertion.
            chars2 += diffs[x][1].length;
          }
          if (chars1 > loc) {
            // Overshot the location.
            break;
          }
          last_chars1 = chars1;
          last_chars2 = chars2;
        }
        // Was the location was deleted?
        if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
          return last_chars2;
        }
        // Add the remaining character length.
        return last_chars2 + (loc - last_chars1);
      };

      /**
       * Convert a diff array into a pretty HTML report.
       * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
       * @return {string} HTML representation.
       */
      diff_match_patch.prototype.diff_prettyHtml = function (diffs) {
        var html = [];
        var pattern_amp = /&/g;
        var pattern_lt = /</g;
        var pattern_gt = />/g;
        var pattern_para = /\n/g;
        for (var x = 0; x < diffs.length; x++) {
          var op = diffs[x][0]; // Operation (insert, delete, equal)
          var data = diffs[x][1]; // Text of change.
          var text = data.replace(pattern_amp, '&amp;').replace(pattern_lt, '&lt;').replace(pattern_gt, '&gt;').replace(pattern_para, '<br>');
          switch (op) {
            case DIFF_INSERT:
              html[x] = '<ins style="background:#1fff1f;color:black;font-weight: bold;">' + text + '</ins>';
              break;
            case DIFF_DELETE:
              html[x] = '<del style="background:#ff1f1f;color:black;font-weight: bold;">' + text + '</del>';
              break;
            case DIFF_EQUAL:
              html[x] = '<span>' + text + '</span>';
              break;
          }
        }
        return html.join('');
      };

      /**
       * Compute and return the source text (all equalities and deletions).
       * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
       * @return {string} Source text.
       */
      diff_match_patch.prototype.diff_text1 = function (diffs) {
        var text = [];
        for (var x = 0; x < diffs.length; x++) {
          if (diffs[x][0] !== DIFF_INSERT) {
            text[x] = diffs[x][1];
          }
        }
        return text.join('');
      };

      /**
       * Compute and return the destination text (all equalities and insertions).
       * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
       * @return {string} Destination text.
       */
      diff_match_patch.prototype.diff_text2 = function (diffs) {
        var text = [];
        for (var x = 0; x < diffs.length; x++) {
          if (diffs[x][0] !== DIFF_DELETE) {
            text[x] = diffs[x][1];
          }
        }
        return text.join('');
      };

      /**
       * Compute the Levenshtein distance; the number of inserted, deleted or
       * substituted characters.
       * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
       * @return {number} Number of changes.
       */
      diff_match_patch.prototype.diff_levenshtein = function (diffs) {
        var levenshtein = 0;
        var insertions = 0;
        var deletions = 0;
        for (var x = 0; x < diffs.length; x++) {
          var op = diffs[x][0];
          var data = diffs[x][1];
          switch (op) {
            case DIFF_INSERT:
              insertions += data.length;
              break;
            case DIFF_DELETE:
              deletions += data.length;
              break;
            case DIFF_EQUAL:
              // A deletion and an insertion is one substitution.
              levenshtein += Math.max(insertions, deletions);
              insertions = 0;
              deletions = 0;
              break;
          }
        }
        levenshtein += Math.max(insertions, deletions);
        return levenshtein;
      };

      /**
       * Crush the diff into an encoded string which describes the operations
       * required to transform text1 into text2.
       * E.g. =3\t-2\t+ing  -> Keep 3 chars, delete 2 chars, insert 'ing'.
       * Operations are tab-separated.  Inserted text is escaped using %xx notation.
       * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
       * @return {string} Delta text.
       */
      diff_match_patch.prototype.diff_toDelta = function (diffs) {
        var text = [];
        for (var x = 0; x < diffs.length; x++) {
          switch (diffs[x][0]) {
            case DIFF_INSERT:
              text[x] = '+' + encodeURI(diffs[x][1]);
              break;
            case DIFF_DELETE:
              text[x] = '-' + diffs[x][1].length;
              break;
            case DIFF_EQUAL:
              text[x] = '=' + diffs[x][1].length;
              break;
          }
        }
        return text.join('\t').replace(/%20/g, ' ');
      };

      /**
       * Given the original text1, and an encoded string which describes the
       * operations required to transform text1 into text2, compute the full diff.
       * @param {string} text1 Source string for the diff.
       * @param {string} delta Delta text.
       * @return {!Array.<!diff_match_patch.Diff>} Array of diff tuples.
       * @throws {!Error} If invalid input.
       */
      diff_match_patch.prototype.diff_fromDelta = function (text1, delta) {
        var diffs = [];
        var diffsLength = 0; // Keeping our own length var is faster in JS.
        var pointer = 0; // Cursor in text1
        var tokens = delta.split(/\t/g);
        for (var x = 0; x < tokens.length; x++) {
          // Each token begins with a one character parameter which specifies the
          // operation of this token (delete, insert, equality).
          var param = tokens[x].substring(1);
          switch (tokens[x].charAt(0)) {
            case '+':
              try {
                diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_INSERT, decodeURI(param));
              } catch (ex) {
                // Malformed URI sequence.
                throw new Error('Illegal escape in diff_fromDelta: ' + param);
              }
              break;
            case '-':
            // Fall through.
            case '=':
              var n = parseInt(param, 10);
              if (isNaN(n) || n < 0) {
                throw new Error('Invalid number in diff_fromDelta: ' + param);
              }
              var text = text1.substring(pointer, pointer += n);
              if (tokens[x].charAt(0) == '=') {
                diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_EQUAL, text);
              } else {
                diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_DELETE, text);
              }
              break;
            default:
              // Blank tokens are ok (from a trailing \t).
              // Anything else is an error.
              if (tokens[x]) {
                throw new Error('Invalid diff operation in diff_fromDelta: ' + tokens[x]);
              }
          }
        }
        if (pointer != text1.length) {
          throw new Error('Delta length (' + pointer + ') does not equal source text length (' + text1.length + ').');
        }
        return diffs;
      };

      //  MATCH FUNCTIONS

      /**
       * Locate the best instance of 'pattern' in 'text' near 'loc'.
       * @param {string} text The text to search.
       * @param {string} pattern The pattern to search for.
       * @param {number} loc The location to search around.
       * @return {number} Best match index or -1.
       */
      diff_match_patch.prototype.match_main = function (text, pattern, loc) {
        // Check for null inputs.
        if (text == null || pattern == null || loc == null) {
          throw new Error('Null input. (match_main)');
        }
        loc = Math.max(0, Math.min(loc, text.length));
        if (text == pattern) {
          // Shortcut (potentially not guaranteed by the algorithm)
          return 0;
        } else if (!text.length) {
          // Nothing to match.
          return -1;
        } else if (text.substring(loc, loc + pattern.length) == pattern) {
          // Perfect match at the perfect spot!  (Includes case of null pattern)
          return loc;
        } else {
          // Do a fuzzy compare.
          return this.match_bitap_(text, pattern, loc);
        }
      };

      /**
       * Locate the best instance of 'pattern' in 'text' near 'loc' using the
       * Bitap algorithm.
       * @param {string} text The text to search.
       * @param {string} pattern The pattern to search for.
       * @param {number} loc The location to search around.
       * @return {number} Best match index or -1.
       * @private
       */
      diff_match_patch.prototype.match_bitap_ = function (text, pattern, loc) {
        if (pattern.length > this.Match_MaxBits) {
          throw new Error('Pattern too long for this browser.');
        }

        // Initialise the alphabet.
        var s = this.match_alphabet_(pattern);
        var dmp = this; // 'this' becomes 'window' in a closure.

        /**
         * Compute and return the score for a match with e errors and x location.
         * Accesses loc and pattern through being a closure.
         * @param {number} e Number of errors in match.
         * @param {number} x Location of match.
         * @return {number} Overall score for match (0.0 = good, 1.0 = bad).
         * @private
         */
        function match_bitapScore_(e, x) {
          var accuracy = e / pattern.length;
          var proximity = Math.abs(loc - x);
          if (!dmp.Match_Distance) {
            // Dodge divide by zero error.
            return proximity ? 1.0 : accuracy;
          }
          return accuracy + proximity / dmp.Match_Distance;
        }

        // Highest score beyond which we give up.
        var score_threshold = this.Match_Threshold;
        // Is there a nearby exact match? (speedup)
        var best_loc = text.indexOf(pattern, loc);
        if (best_loc != -1) {
          score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
          // What about in the other direction? (speedup)
          best_loc = text.lastIndexOf(pattern, loc + pattern.length);
          if (best_loc != -1) {
            score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
          }
        }

        // Initialise the bit arrays.
        var matchmask = 1 << pattern.length - 1;
        best_loc = -1;
        var bin_min, bin_mid;
        var bin_max = pattern.length + text.length;
        var last_rd;
        for (var d = 0; d < pattern.length; d++) {
          // Scan for the best match; each iteration allows for one more error.
          // Run a binary search to determine how far from 'loc' we can stray at this
          // error level.
          bin_min = 0;
          bin_mid = bin_max;
          while (bin_min < bin_mid) {
            if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
              bin_min = bin_mid;
            } else {
              bin_max = bin_mid;
            }
            bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
          }
          // Use the result from this iteration as the maximum for the next.
          bin_max = bin_mid;
          var start = Math.max(1, loc - bin_mid + 1);
          var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
          var rd = Array(finish + 2);
          rd[finish + 1] = (1 << d) - 1;
          for (var j = finish; j >= start; j--) {
            // The alphabet (s) is a sparse hash, so the following line generates
            // warnings.
            var charMatch = s[text.charAt(j - 1)];
            if (d === 0) {
              // First pass: exact match.
              rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
            } else {
              // Subsequent passes: fuzzy match.
              rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
            }
            if (rd[j] & matchmask) {
              var score = match_bitapScore_(d, j - 1);
              // This match will almost certainly be better than any existing match.
              // But check anyway.
              if (score <= score_threshold) {
                // Told you so.
                score_threshold = score;
                best_loc = j - 1;
                if (best_loc > loc) {
                  // When passing loc, don't exceed our current distance from loc.
                  start = Math.max(1, 2 * loc - best_loc);
                } else {
                  // Already passed loc, downhill from here on in.
                  break;
                }
              }
            }
          }
          // No hope for a (better) match at greater error levels.
          if (match_bitapScore_(d + 1, loc) > score_threshold) {
            break;
          }
          last_rd = rd;
        }
        return best_loc;
      };

      /**
       * Initialise the alphabet for the Bitap algorithm.
       * @param {string} pattern The text to encode.
       * @return {!Object} Hash of character locations.
       * @private
       */
      diff_match_patch.prototype.match_alphabet_ = function (pattern) {
        var s = {};
        for (var i = 0; i < pattern.length; i++) {
          s[pattern.charAt(i)] = 0;
        }
        for (var i = 0; i < pattern.length; i++) {
          s[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
        }
        return s;
      };

      //  PATCH FUNCTIONS

      /**
       * Increase the context until it is unique,
       * but don't let the pattern expand beyond Match_MaxBits.
       * @param {!diff_match_patch.patch_obj} patch The patch to grow.
       * @param {string} text Source text.
       * @private
       */
      diff_match_patch.prototype.patch_addContext_ = function (patch, text) {
        if (text.length == 0) {
          return;
        }
        if (patch.start2 === null) {
          throw Error('patch not initialized');
        }
        var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
        var padding = 0;

        // Look for the first and last matches of pattern in text.  If two different
        // matches are found, increase the pattern length.
        while (text.indexOf(pattern) != text.lastIndexOf(pattern) && pattern.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin) {
          padding += this.Patch_Margin;
          pattern = text.substring(patch.start2 - padding, patch.start2 + patch.length1 + padding);
        }
        // Add one chunk for good luck.
        padding += this.Patch_Margin;

        // Add the prefix.
        var prefix = text.substring(patch.start2 - padding, patch.start2);
        if (prefix) {
          patch.diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, prefix));
        }
        // Add the suffix.
        var suffix = text.substring(patch.start2 + patch.length1, patch.start2 + patch.length1 + padding);
        if (suffix) {
          patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, suffix));
        }

        // Roll back the start points.
        patch.start1 -= prefix.length;
        patch.start2 -= prefix.length;
        // Extend the lengths.
        patch.length1 += prefix.length + suffix.length;
        patch.length2 += prefix.length + suffix.length;
      };

      /**
       * Compute a list of patches to turn text1 into text2.
       * Use diffs if provided, otherwise compute it ourselves.
       * There are four ways to call this function, depending on what data is
       * available to the caller:
       * Method 1:
       * a = text1, b = text2
       * Method 2:
       * a = diffs
       * Method 3 (optimal):
       * a = text1, b = diffs
       * Method 4 (deprecated, use method 3):
       * a = text1, b = text2, c = diffs
       *
       * @param {string|!Array.<!diff_match_patch.Diff>} a text1 (methods 1,3,4) or
       * Array of diff tuples for text1 to text2 (method 2).
       * @param {string|!Array.<!diff_match_patch.Diff>=} opt_b text2 (methods 1,4) or
       * Array of diff tuples for text1 to text2 (method 3) or undefined (method 2).
       * @param {string|!Array.<!diff_match_patch.Diff>=} opt_c Array of diff tuples
       * for text1 to text2 (method 4) or undefined (methods 1,2,3).
       * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
       */
      diff_match_patch.prototype.patch_make = function (a, opt_b, opt_c) {
        var text1, diffs;
        if (typeof a == 'string' && typeof opt_b == 'string' && typeof opt_c == 'undefined') {
          // Method 1: text1, text2
          // Compute diffs from text1 and text2.
          text1 = /** @type {string} */a;
          diffs = this.diff_main(text1, /** @type {string} */opt_b, true);
          if (diffs.length > 2) {
            this.diff_cleanupSemantic(diffs);
            this.diff_cleanupEfficiency(diffs);
          }
        } else if (a && typeof a == 'object' && typeof opt_b == 'undefined' && typeof opt_c == 'undefined') {
          // Method 2: diffs
          // Compute text1 from diffs.
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */a;
          text1 = this.diff_text1(diffs);
        } else if (typeof a == 'string' && opt_b && typeof opt_b == 'object' && typeof opt_c == 'undefined') {
          // Method 3: text1, diffs
          text1 = /** @type {string} */a;
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */opt_b;
        } else if (typeof a == 'string' && typeof opt_b == 'string' && opt_c && typeof opt_c == 'object') {
          // Method 4: text1, text2, diffs
          // text2 is not used.
          text1 = /** @type {string} */a;
          diffs = /** @type {!Array.<!diff_match_patch.Diff>} */opt_c;
        } else {
          throw new Error('Unknown call format to patch_make.');
        }
        if (diffs.length === 0) {
          return []; // Get rid of the null case.
        }

        var patches = [];
        var patch = new diff_match_patch.patch_obj();
        var patchDiffLength = 0; // Keeping our own length var is faster in JS.
        var char_count1 = 0; // Number of characters into the text1 string.
        var char_count2 = 0; // Number of characters into the text2 string.
        // Start with text1 (prepatch_text) and apply the diffs until we arrive at
        // text2 (postpatch_text).  We recreate the patches one by one to determine
        // context info.
        var prepatch_text = text1;
        var postpatch_text = text1;
        for (var x = 0; x < diffs.length; x++) {
          var diff_type = diffs[x][0];
          var diff_text = diffs[x][1];
          if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
            // A new patch starts here.
            patch.start1 = char_count1;
            patch.start2 = char_count2;
          }
          switch (diff_type) {
            case DIFF_INSERT:
              patch.diffs[patchDiffLength++] = diffs[x];
              patch.length2 += diff_text.length;
              postpatch_text = postpatch_text.substring(0, char_count2) + diff_text + postpatch_text.substring(char_count2);
              break;
            case DIFF_DELETE:
              patch.length1 += diff_text.length;
              patch.diffs[patchDiffLength++] = diffs[x];
              postpatch_text = postpatch_text.substring(0, char_count2) + postpatch_text.substring(char_count2 + diff_text.length);
              break;
            case DIFF_EQUAL:
              if (diff_text.length <= 2 * this.Patch_Margin && patchDiffLength && diffs.length != x + 1) {
                // Small equality inside a patch.
                patch.diffs[patchDiffLength++] = diffs[x];
                patch.length1 += diff_text.length;
                patch.length2 += diff_text.length;
              } else if (diff_text.length >= 2 * this.Patch_Margin) {
                // Time for a new patch.
                if (patchDiffLength) {
                  this.patch_addContext_(patch, prepatch_text);
                  patches.push(patch);
                  patch = new diff_match_patch.patch_obj();
                  patchDiffLength = 0;
                  // Unlike Unidiff, our patch lists have a rolling context.
                  // https://github.com/google/diff-match-patch/wiki/Unidiff
                  // Update prepatch text & pos to reflect the application of the
                  // just completed patch.
                  prepatch_text = postpatch_text;
                  char_count1 = char_count2;
                }
              }
              break;
          }

          // Update the current character count.
          if (diff_type !== DIFF_INSERT) {
            char_count1 += diff_text.length;
          }
          if (diff_type !== DIFF_DELETE) {
            char_count2 += diff_text.length;
          }
        }
        // Pick up the leftover patch if not empty.
        if (patchDiffLength) {
          this.patch_addContext_(patch, prepatch_text);
          patches.push(patch);
        }
        return patches;
      };

      /**
       * Given an array of patches, return another array that is identical.
       * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
       * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
       */
      diff_match_patch.prototype.patch_deepCopy = function (patches) {
        // Making deep copies is hard in JavaScript.
        var patchesCopy = [];
        for (var x = 0; x < patches.length; x++) {
          var patch = patches[x];
          var patchCopy = new diff_match_patch.patch_obj();
          patchCopy.diffs = [];
          for (var y = 0; y < patch.diffs.length; y++) {
            patchCopy.diffs[y] = new diff_match_patch.Diff(patch.diffs[y][0], patch.diffs[y][1]);
          }
          patchCopy.start1 = patch.start1;
          patchCopy.start2 = patch.start2;
          patchCopy.length1 = patch.length1;
          patchCopy.length2 = patch.length2;
          patchesCopy[x] = patchCopy;
        }
        return patchesCopy;
      };

      /**
       * Merge a set of patches onto the text.  Return a patched text, as well
       * as a list of true/false values indicating which patches were applied.
       * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
       * @param {string} text Old text.
       * @return {!Array.<string|!Array.<boolean>>} Two element Array, containing the
       *      new text and an array of boolean values.
       */
      diff_match_patch.prototype.patch_apply = function (patches, text) {
        if (patches.length == 0) {
          return [text, []];
        }

        // Deep copy the patches so that no changes are made to originals.
        patches = this.patch_deepCopy(patches);
        var nullPadding = this.patch_addPadding(patches);
        text = nullPadding + text + nullPadding;
        this.patch_splitMax(patches);
        // delta keeps track of the offset between the expected and actual location
        // of the previous patch.  If there are patches expected at positions 10 and
        // 20, but the first patch was found at 12, delta is 2 and the second patch
        // has an effective expected position of 22.
        var delta = 0;
        var results = [];
        for (var x = 0; x < patches.length; x++) {
          var expected_loc = patches[x].start2 + delta;
          var text1 = this.diff_text1(patches[x].diffs);
          var start_loc;
          var end_loc = -1;
          if (text1.length > this.Match_MaxBits) {
            // patch_splitMax will only provide an oversized pattern in the case of
            // a monster delete.
            start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits), expected_loc);
            if (start_loc != -1) {
              end_loc = this.match_main(text, text1.substring(text1.length - this.Match_MaxBits), expected_loc + text1.length - this.Match_MaxBits);
              if (end_loc == -1 || start_loc >= end_loc) {
                // Can't find valid trailing context.  Drop this patch.
                start_loc = -1;
              }
            }
          } else {
            start_loc = this.match_main(text, text1, expected_loc);
          }
          if (start_loc == -1) {
            // No match found.  :(
            results[x] = false;
            // Subtract the delta for this failed patch from subsequent patches.
            delta -= patches[x].length2 - patches[x].length1;
          } else {
            // Found a match.  :)
            results[x] = true;
            delta = start_loc - expected_loc;
            var text2;
            if (end_loc == -1) {
              text2 = text.substring(start_loc, start_loc + text1.length);
            } else {
              text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
            }
            if (text1 == text2) {
              // Perfect match, just shove the replacement text in.
              text = text.substring(0, start_loc) + this.diff_text2(patches[x].diffs) + text.substring(start_loc + text1.length);
            } else {
              // Imperfect match.  Run a diff to get a framework of equivalent
              // indices.
              var diffs = this.diff_main(text1, text2, false);
              if (text1.length > this.Match_MaxBits && this.diff_levenshtein(diffs) / text1.length > this.Patch_DeleteThreshold) {
                // The end points match, but the content is unacceptably bad.
                results[x] = false;
              } else {
                this.diff_cleanupSemanticLossless(diffs);
                var index1 = 0;
                var index2;
                for (var y = 0; y < patches[x].diffs.length; y++) {
                  var mod = patches[x].diffs[y];
                  if (mod[0] !== DIFF_EQUAL) {
                    index2 = this.diff_xIndex(diffs, index1);
                  }
                  if (mod[0] === DIFF_INSERT) {
                    // Insertion
                    text = text.substring(0, start_loc + index2) + mod[1] + text.substring(start_loc + index2);
                  } else if (mod[0] === DIFF_DELETE) {
                    // Deletion
                    text = text.substring(0, start_loc + index2) + text.substring(start_loc + this.diff_xIndex(diffs, index1 + mod[1].length));
                  }
                  if (mod[0] !== DIFF_DELETE) {
                    index1 += mod[1].length;
                  }
                }
              }
            }
          }
        }
        // Strip the padding off.
        text = text.substring(nullPadding.length, text.length - nullPadding.length);
        return [text, results];
      };

      /**
       * Add some padding on text start and end so that edges can match something.
       * Intended to be called only from within patch_apply.
       * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
       * @return {string} The padding string added to each side.
       */
      diff_match_patch.prototype.patch_addPadding = function (patches) {
        var paddingLength = this.Patch_Margin;
        var nullPadding = '';
        for (var x = 1; x <= paddingLength; x++) {
          nullPadding += String.fromCharCode(x);
        }

        // Bump all the patches forward.
        for (var x = 0; x < patches.length; x++) {
          patches[x].start1 += paddingLength;
          patches[x].start2 += paddingLength;
        }

        // Add some padding on start of first diff.
        var patch = patches[0];
        var diffs = patch.diffs;
        if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
          // Add nullPadding equality.
          diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
          patch.start1 -= paddingLength; // Should be 0.
          patch.start2 -= paddingLength; // Should be 0.
          patch.length1 += paddingLength;
          patch.length2 += paddingLength;
        } else if (paddingLength > diffs[0][1].length) {
          // Grow first equality.
          var extraLength = paddingLength - diffs[0][1].length;
          diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
          patch.start1 -= extraLength;
          patch.start2 -= extraLength;
          patch.length1 += extraLength;
          patch.length2 += extraLength;
        }

        // Add some padding on end of last diff.
        patch = patches[patches.length - 1];
        diffs = patch.diffs;
        if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
          // Add nullPadding equality.
          diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
          patch.length1 += paddingLength;
          patch.length2 += paddingLength;
        } else if (paddingLength > diffs[diffs.length - 1][1].length) {
          // Grow last equality.
          var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
          diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
          patch.length1 += extraLength;
          patch.length2 += extraLength;
        }
        return nullPadding;
      };

      /**
       * Look through the patches and break up any which are longer than the maximum
       * limit of the match algorithm.
       * Intended to be called only from within patch_apply.
       * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
       */
      diff_match_patch.prototype.patch_splitMax = function (patches) {
        var patch_size = this.Match_MaxBits;
        for (var x = 0; x < patches.length; x++) {
          if (patches[x].length1 <= patch_size) {
            continue;
          }
          var bigpatch = patches[x];
          // Remove the big old patch.
          patches.splice(x--, 1);
          var start1 = bigpatch.start1;
          var start2 = bigpatch.start2;
          var precontext = '';
          while (bigpatch.diffs.length !== 0) {
            // Create one of several smaller patches.
            var patch = new diff_match_patch.patch_obj();
            var empty = true;
            patch.start1 = start1 - precontext.length;
            patch.start2 = start2 - precontext.length;
            if (precontext !== '') {
              patch.length1 = patch.length2 = precontext.length;
              patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, precontext));
            }
            while (bigpatch.diffs.length !== 0 && patch.length1 < patch_size - this.Patch_Margin) {
              var diff_type = bigpatch.diffs[0][0];
              var diff_text = bigpatch.diffs[0][1];
              if (diff_type === DIFF_INSERT) {
                // Insertions are harmless.
                patch.length2 += diff_text.length;
                start2 += diff_text.length;
                patch.diffs.push(bigpatch.diffs.shift());
                empty = false;
              } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 && patch.diffs[0][0] == DIFF_EQUAL && diff_text.length > 2 * patch_size) {
                // This is a large deletion.  Let it pass in one chunk.
                patch.length1 += diff_text.length;
                start1 += diff_text.length;
                empty = false;
                patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
                bigpatch.diffs.shift();
              } else {
                // Deletion or equality.  Only take as much as we can stomach.
                diff_text = diff_text.substring(0, patch_size - patch.length1 - this.Patch_Margin);
                patch.length1 += diff_text.length;
                start1 += diff_text.length;
                if (diff_type === DIFF_EQUAL) {
                  patch.length2 += diff_text.length;
                  start2 += diff_text.length;
                } else {
                  empty = false;
                }
                patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
                if (diff_text == bigpatch.diffs[0][1]) {
                  bigpatch.diffs.shift();
                } else {
                  bigpatch.diffs[0][1] = bigpatch.diffs[0][1].substring(diff_text.length);
                }
              }
            }
            // Compute the head context for the next patch.
            precontext = this.diff_text2(patch.diffs);
            precontext = precontext.substring(precontext.length - this.Patch_Margin);
            // Append the end context for this patch.
            var postcontext = this.diff_text1(bigpatch.diffs).substring(0, this.Patch_Margin);
            if (postcontext !== '') {
              patch.length1 += postcontext.length;
              patch.length2 += postcontext.length;
              if (patch.diffs.length !== 0 && patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
                patch.diffs[patch.diffs.length - 1][1] += postcontext;
              } else {
                patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, postcontext));
              }
            }
            if (!empty) {
              patches.splice(++x, 0, patch);
            }
          }
        }
      };

      /**
       * Take a list of patches and return a textual representation.
       * @param {!Array.<!diff_match_patch.patch_obj>} patches Array of Patch objects.
       * @return {string} Text representation of patches.
       */
      diff_match_patch.prototype.patch_toText = function (patches) {
        var text = [];
        for (var x = 0; x < patches.length; x++) {
          text[x] = patches[x];
        }
        return text.join('');
      };

      /**
       * Parse a textual representation of patches and return a list of Patch objects.
       * @param {string} textline Text representation of patches.
       * @return {!Array.<!diff_match_patch.patch_obj>} Array of Patch objects.
       * @throws {!Error} If invalid input.
       */
      diff_match_patch.prototype.patch_fromText = function (textline) {
        var patches = [];
        if (!textline) {
          return patches;
        }
        var text = textline.split('\n');
        var textPointer = 0;
        var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
        while (textPointer < text.length) {
          var m = text[textPointer].match(patchHeader);
          if (!m) {
            throw new Error('Invalid patch string: ' + text[textPointer]);
          }
          var patch = new diff_match_patch.patch_obj();
          patches.push(patch);
          patch.start1 = parseInt(m[1], 10);
          if (m[2] === '') {
            patch.start1--;
            patch.length1 = 1;
          } else if (m[2] == '0') {
            patch.length1 = 0;
          } else {
            patch.start1--;
            patch.length1 = parseInt(m[2], 10);
          }
          patch.start2 = parseInt(m[3], 10);
          if (m[4] === '') {
            patch.start2--;
            patch.length2 = 1;
          } else if (m[4] == '0') {
            patch.length2 = 0;
          } else {
            patch.start2--;
            patch.length2 = parseInt(m[4], 10);
          }
          textPointer++;
          while (textPointer < text.length) {
            var sign = text[textPointer].charAt(0);
            try {
              var line = decodeURI(text[textPointer].substring(1));
            } catch (ex) {
              // Malformed URI sequence.
              throw new Error('Illegal escape in patch_fromText: ' + line);
            }
            if (sign == '-') {
              // Deletion.
              patch.diffs.push(new diff_match_patch.Diff(DIFF_DELETE, line));
            } else if (sign == '+') {
              // Insertion.
              patch.diffs.push(new diff_match_patch.Diff(DIFF_INSERT, line));
            } else if (sign == ' ') {
              // Minor equality.
              patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, line));
            } else if (sign == '@') {
              // Start of next patch.
              break;
            } else if (sign === '') {
              // Blank line?  Whatever.
            } else {
              // WTF?
              throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
            }
            textPointer++;
          }
        }
        return patches;
      };

      /**
       * Class representing one patch operation.
       * @constructor
       */
      diff_match_patch.patch_obj = function () {
        /** @type {!Array.<!diff_match_patch.Diff>} */
        this.diffs = [];
        /** @type {?number} */
        this.start1 = null;
        /** @type {?number} */
        this.start2 = null;
        /** @type {number} */
        this.length1 = 0;
        /** @type {number} */
        this.length2 = 0;
      };

      /**
       * Emulate GNU diff's format.
       * Header: @@ -382,8 +481,9 @@
       * Indices are printed as 1-based, not 0-based.
       * @return {string} The GNU diff string.
       */
      diff_match_patch.patch_obj.prototype.toString = function () {
        var coords1, coords2;
        if (this.length1 === 0) {
          coords1 = this.start1 + ',0';
        } else if (this.length1 == 1) {
          coords1 = this.start1 + 1;
        } else {
          coords1 = this.start1 + 1 + ',' + this.length1;
        }
        if (this.length2 === 0) {
          coords2 = this.start2 + ',0';
        } else if (this.length2 == 1) {
          coords2 = this.start2 + 1;
        } else {
          coords2 = this.start2 + 1 + ',' + this.length2;
        }
        var text = ['@@ -' + coords1 + ' +' + coords2 + ' @@\n'];
        var op;
        // Escape the body of the patch with %xx notation.
        for (var x = 0; x < this.diffs.length; x++) {
          switch (this.diffs[x][0]) {
            case DIFF_INSERT:
              op = '+';
              break;
            case DIFF_DELETE:
              op = '-';
              break;
            case DIFF_EQUAL:
              op = ' ';
              break;
          }
          text[x + 1] = op + encodeURI(this.diffs[x][1]) + '\n';
        }
        return text.join('').replace(/%20/g, ' ');
      };

      // CLOSURE:begin_strip
      // Lines below here will not be included in the Closure-compatible library.

      // Export these global variables so that they survive Google's JS compiler.
      // In a browser, 'this' will be 'window'.
      // Users of node.js should 'require' the uncompressed version since Google's
      // JS compiler may break the following exports for non-browser environments.
      // /** @suppress {globalThis} */
      // this['diff_match_patch'] = diff_match_patch;
      // /** @suppress {globalThis} */
      // this['DIFF_DELETE'] = DIFF_DELETE;
      // /** @suppress {globalThis} */
      // this['DIFF_INSERT'] = DIFF_INSERT;
      // /** @suppress {globalThis} */
      // this['DIFF_EQUAL'] = DIFF_EQUAL;

    }, {}], 4: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.common = void 0;
      var _dictionary = require("./dictionary/dictionary.js");
      const latToCyrUpperCase = _dictionary.dictionary.latToCyr.upperCase;
      const cyrToLatUpperCase = _dictionary.dictionary.cyrToLat.upperCase;
      const dict = {
        upperCase: {
          ...latToCyrUpperCase,
          ...cyrToLatUpperCase
        }
      };
      const notAWordCharacterMatcher = /([^0-9a-zа-яіїєґčšžĝ\\])/;
      const skipWordsMatcher = /@@(.+?)@@/gi;
      const nonGreedyTextMatcher = /([\s\r\n\_\.\,\:\;\@\#\$\%\*\!\?\~\<\>\[\]\{\}\(\)\<\>\…\"\“\”\«\»\—\+\=\\\/\|0-9a-zа-яіїєґčšžĝ’'-]+?)/gi;
      function buildRegexWithQuotes(openindQuote, closingQuote) {
        return new RegExp(openindQuote + nonGreedyTextMatcher.source + closingQuote, nonGreedyTextMatcher.flags);
      }
      function buildRegexWithQuotesExcludeMiddleOfWord(openindQuote, closingQuote) {
        return new RegExp(notAWordCharacterMatcher.source + openindQuote + nonGreedyTextMatcher.source + closingQuote + notAWordCharacterMatcher.source, nonGreedyTextMatcher.flags);
      }
      function exactMatchSubstring(i, size, dict, text) {
        if (!dict) {
          return false;
        }
        return i + size - 1 < text.length && dict[text.substring(i, i + size)];
      }
      function matchSubstring(i, size, matcher, text) {
        if (!matcher) {
          return false;
        }
        return i + size - 1 < text.length && matcher.regex.test(text.substring(i, i + size));
      }
      function preprocessTextWithSkips(text, quotesReplacement, nestedLevels, skips) {
        // add trailing spaces to simplify regex, will be removed after
        text = ' ' + text;
        text += ' ';
        quotesReplacement.forEach(quoteReplace => {
          var hasQuotes = quoteReplace.excludeMiddle ? buildRegexWithQuotesExcludeMiddleOfWord(quoteReplace.from.opening, quoteReplace.from.closing) : buildRegexWithQuotes(quoteReplace.from.opening, quoteReplace.from.closing);

          //preprocess different types of quotes up to 5 nested levels
          for (let i = 0; i < nestedLevels; i++) {
            var replacement = quoteReplace.excludeMiddle ? `$1${quoteReplace.to.opening}$2${quoteReplace.to.closing}$3` : `${quoteReplace.to.opening}$1${quoteReplace.to.closing}`;
            var match = text.match(hasQuotes);
            text = text.replace(hasQuotes, replacement);
          }
        });
        if (!skips || skips.length == 0) {
          skips = text.match(skipWordsMatcher, '$1');
          text = text.replace(skipWordsMatcher, '@@ @@');
        }
        text = text.replace(/^ /, ''); //remove preprossesing space at the beginning
        text = text.replace(/ $/, ''); //remove preprossesing space at the end
        return {
          skips,
          text
        };
      }
      function shouldBeUpperCase(i, size, dict, text) {
        return exactMatchSubstring(i, size, dict, text) && surroundedByUpperCase(text, i);
      }
      function surroundedByUpperCase(text, i) {
        var previousIsUpperCase = i - 1 >= 0 && dict.upperCase[text[i - 1]];
        var nextIsUpperCase = i + 1 < text.length && dict.upperCase[text[i + 1]];
        var previousTwoAreUpperCase = i - 2 >= 0 && text[i - 1] == ' ' && dict.upperCase[text[i - 2]];
        var nextTwoAreUpperCase = i + 2 < text.length && text[i + 1] == ' ' && dict.upperCase[text[i + 2]];
        var singleInsideUpperCaseText = previousTwoAreUpperCase || nextTwoAreUpperCase;
        var isAcronym = previousIsUpperCase || nextIsUpperCase || singleInsideUpperCaseText;
        return isAcronym;
      }
      function fn(text) {
        return {
          surroundedByUpperCase,
          shouldBeUpperCase: (i, size, dict) => {
            return shouldBeUpperCase(i, size, dict, text);
          },
          matchSubstring: (i, size, dict) => {
            return matchSubstring(i, size, dict, text);
          },
          exactMatchSubstring: (i, size, dict) => {
            return exactMatchSubstring(i, size, dict, text);
          }
        };
      }
      const common = {
        preprocessTextWithSkips,
        fn,
        skipWordsMatcher,
        quotes: {
          single: {
            opening: `\'`,
            closing: `\'`
          },
          double: {
            opening: `\"`,
            closing: `\"`
          },
          triangle: {
            opening: `\«`,
            closing: `\»`
          },
          pretty: {
            opening: `\“`,
            closing: `\”`
          }
        }
      };
      exports.common = common;

    }, { "./dictionary/dictionary.js": 6 }], 5: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.cyrToLat = cyrToLat;
      var _dictionary = require("./dictionary/dictionary.js");
      var _common = require("./common.js");
      var dict = _dictionary.dictionary.cyrToLat;
      var exceptions = _dictionary.dictionary.exceptions.cyrToLat;
      function cyrToLat(text) {
        // -----------------------------------------------------------

        var answer = '';
        var {
          skips,
          text
        } = _common.common.preprocessTextWithSkips(text, [{
          from: _common.common.quotes.single,
          to: _common.common.quotes.double,
          excludeMiddle: true
        }, {
          from: _common.common.quotes.triangle,
          to: _common.common.quotes.double
        }, {
          from: _common.common.quotes.pretty,
          to: _common.common.quotes.double
        }], 5);
        var fn = _common.common.fn(text); //init fn functions on processed text

        processAlphabetCharacterByCharacter();
        return answer;

        // -----------------------------------------------------------

        function processAlphabetCharacterByCharacter() {
          var nextSkip = 0;
          var i = 0;
          while (i < text.length) {
            if (!dict.matchingSingleLetters[text[i]]) {
              //skip convertation for unmapped characters
              answer += text[i];
              i++;
            } else {
              //process skips
              while (fn.matchSubstring(i, 5, {
                regex: _common.common.skipWordsMatcher
              })) {
                const restoreWord = skips[nextSkip].replace(_common.common.skipWordsMatcher, '$1');
                answer += text.substring(i, i + 5).replace(_common.common.skipWordsMatcher, restoreWord);
                nextSkip++;
                i += 5;
              }

              //process exceptions
              var j = exceptions.maxLength;
              while (j > 1) {
                while (fn.exactMatchSubstring(i, j + 1, exceptions[j + 1])) {
                  answer += exceptions[j + 1][text.substring(i, i + j + 1)];
                  i += j + 1;
                }
                j--;
              }

              //process joDigraph apostrophes
              while (shouldAddApostrophe(i, 2, dict.joDigraph)) {
                answer += '\'';
                answer += dict.joDigraph[text.substring(i, i + 2)];
                i += 2;
              }

              //process digraphs
              while (fn.exactMatchSubstring(i, 2, dict.digraphs)) {
                answer += dict.digraphs[text.substring(i, i + 2)];
                i += 2;
              }

              //process uppercase reverse digraphs
              while (fn.shouldBeUpperCase(i, 1, dict.translatesToUpperCaseDigraph)) {
                answer += dict.translatesToUpperCaseDigraph[text[i]];
                i++;
              }

              //process single letters
              if (fn.exactMatchSubstring(i, 1, dict.singleLetters)) {
                answer += dict.singleLetters[text[i]];
                i++;
              }
            }
          }
        }
        function shouldAddApostrophe(i, size, machingDict) {
          if (!fn.exactMatchSubstring(i, size, machingDict)) {
            return false;
          }
          var firstLetterInText = i == 0;
          var afterConsonant = i - 1 >= 0 && dict.consonants[text[i - 1]];

          // due to specifics of cyrrilic scrypt where йо/ьо is a digraph, 
          // that leaves no ambiguity about hardness/softness of the previous 
          // consonant, there are no exceptions to this rule
          return !firstLetterInText && afterConsonant;
        }
      }

    }, { "./common.js": 4, "./dictionary/dictionary.js": 6 }], 6: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.dictionary = void 0;
      var _latToCyrDict = require("./src/latToCyrDict.js");
      var _cyrToLatDict = require("./src/cyrToLatDict.js");
      var _exceptions = require("./exceptions/exceptions.js");
      const dictionary = {
        latToCyr: _latToCyrDict.latToCyrDict,
        cyrToLat: _cyrToLatDict.cyrToLatDict,
        exceptions: _exceptions.exceptions
      };
      exports.dictionary = dictionary;

    }, { "./exceptions/exceptions.js": 7, "./src/cyrToLatDict.js": 8, "./src/latToCyrDict.js": 9 }], 7: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.exceptions = void 0;
      const exceptions = {
        cyrToLat: {
          maxLength: 4,
          4: {
            '\"ьо\"': '\"\'o\"'
          },
          '"': {
            '\"ьо\"': '\"\'o\"'
          },
          'р': {
            'русск': 'moskal\'sk',
            'російськ': 'moskal\'s\'k'
          }
        },
        latToCyr: {
          maxLength: 12,
          3: {
            'Rjo': 'Рьо'
          },
          4: {
            //todo fix ''
            '’jo’': '\'йо\''
          },
          5: {
            'ad\'je': 'адьє',
            'trjoh': 'трьох'
          },
          6: {
            'Got\'je': 'Готьє',
            'N\'jasa': 'Ньяса',
            'Ren\'je': 'Реньє'
          },
          7: {
            'atel\'je': 'ательє',
            'kon\'jak': 'коньяк',
            'N\'juton': 'Ньютон',
            'mil\'jon': 'мільйон',
            'MIL\'JON': 'МІЛЬЙОН',
            //todo fix rule 'jo
            'kan\'jon': 'каньйон'
          },
          8: {
            'pas\'jans': 'пасьянс',
            'čotyrjoh': 'чотирьох',
            'mil\'jard': 'мільярд'
          },
          9: {
            'barel\'jef': 'барельєф',
            'vin\'jetka': 'віньєтка',
            'N\'ju-Jork': 'Нью-Йорк',
            //todo fix rule 'jo
            'batal\'jon': 'батальйон'
          },
          10: {
            'monpans\'je': 'монпансьє',
            'V’jent\'jan': 'В’єнтьян',
            'V\'jent\'jan': 'В’єнтьян'
          },
          11: {
            'buton\'jerka': 'бутоньєрка'
          },
          12: {
            'konferans\'je': 'конферансьє'
          }
        }
      };
      exports.exceptions = exceptions;

    }, {}], 8: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.cyrToLatDict = void 0;
      // ------------------------------------ cyrillic to latin ------------------------------------ 

      const lowerCaseVowels = {
        'а': 'a',
        'е': 'e',
        'и': 'y',
        'і': 'i',
        'о': 'o',
        'у': 'u',
        'є': 'je',
        'ї': 'ji',
        'ю': 'ju',
        'я': 'ja'
      };
      const upperCaseVowels = {
        'А': 'A',
        'Е': 'E',
        'И': 'Y',
        'І': 'I',
        'О': 'O',
        'У': 'U',
        'Є': 'Je',
        'Ї': 'Ji',
        'Ю': 'Ju',
        'Я': 'Ja'
      };
      const vowels = {
        ...lowerCaseVowels,
        ...upperCaseVowels
      };
      const lowerCaseConsonants = {
        'б': 'b',
        'в': 'v',
        'г': 'g',
        'ґ': 'ĝ',
        'д': 'd',
        'ж': 'ž',
        'з': 'z',
        'й': 'j',
        'к': 'k',
        'л': 'l',
        'м': 'm',
        'н': 'n',
        'п': 'p',
        'р': 'r',
        'с': 's',
        'т': 't',
        'ф': 'f',
        'х': 'h',
        'ц': 'c',
        'ч': 'č',
        'ш': 'š',
        'щ': 'šč'
      };
      const upperCaseConsonants = {
        'Б': 'B',
        'В': 'V',
        'Г': 'G',
        'Ґ': 'Ĝ',
        'Д': 'D',
        'Ж': 'Ž',
        'З': 'Z',
        'Й': 'J',
        'К': 'K',
        'Л': 'L',
        'М': 'M',
        'Н': 'N',
        'П': 'P',
        'Р': 'R',
        'С': 'S',
        'Т': 'T',
        'Ф': 'F',
        'Х': 'H',
        'Ц': 'C',
        'Ч': 'Č',
        'Ш': 'Š',
        'Щ': 'Šč'
      };
      const consonants = {
        ...lowerCaseConsonants,
        ...upperCaseConsonants
      };
      const lowerCase = {
        ...lowerCaseVowels,
        ...lowerCaseConsonants,
        'ь': '\''
      };
      const upperCase = {
        ...upperCaseVowels,
        ...upperCaseConsonants,
        'Ь': '\''
      };
      const special = {
        'Ь': '\'',
        'ь': '\'',
        '@': '@',
        '"': '"'
      };
      const apostrophes = {
        '\'': '\'',
        'ʼ': '\'',
        '’': '\'',
        '`': '\'',
        '՚': '\'',
        '＇': '\'',
        '‘': '\'',
        'ʹ': '\'',
        'ꞌ': '\''
      };
      const russianAlert = {
        'ё': 'jo',
        'Ё': 'Jo',
        'э': 'e',
        'Э': 'E',
        'ы': 'y',
        'Ы': 'Y'
      };
      const matchingSingleLetters = {
        ...lowerCase,
        ...upperCase,
        ...special,
        ...apostrophes,
        ...russianAlert
      };
      const singleLetters = {
        ...lowerCase,
        ...upperCase,
        ...special,
        ...apostrophes,
        ...russianAlert
      };
      const digraphs = {
        //ё
        'йо': 'jo',
        'ЙО': 'JO',
        'йО': 'jO',
        'Йо': 'Jo',
        'ьо': 'jo',
        'ЬО': 'JO',
        'ьО': 'jO',
        'Ьо': 'Jo'
      };
      const joDigraph = {
        'йо': 'jo',
        'ЙО': 'JO',
        'йО': 'jO',
        'Йо': 'Jo'
      };
      const translatesToDigraph = {
        'є': 'je',
        'ї': 'ji',
        'щ': 'šč',
        'ю': 'ju',
        'я': 'ja',
        'Є': 'Je',
        'Ї': 'Ji',
        'Щ': 'Šč',
        'Ю': 'Ju',
        'Я': 'Ja'
      };
      const translatesToUpperCaseDigraph = {
        'Є': 'JE',
        'Ї': 'JI',
        'Щ': 'ŠČ',
        'Ю': 'JU',
        'Я': 'JA',
        //for consistency of combined or old texts
        'Ё': 'JO'
      };
      const cyrToLatDict = {
        //by size
        singleLetters,
        digraphs,
        //by type
        lowerCase,
        upperCase,
        vowels,
        consonants,
        lowerCaseVowels,
        lowerCaseConsonants,
        upperCaseVowels,
        upperCaseConsonants,
        special,
        apostrophes,
        joDigraph,
        translatesToDigraph,
        translatesToUpperCaseDigraph,
        matchingSingleLetters,
        //detect russian letters
        russianAlert,
        //match all
        all: {
          singleLetters,
          digraphs
        }
      };
      exports.cyrToLatDict = cyrToLatDict;

    }, {}], 9: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.latToCyrDict = void 0;
      var digits = {
        '0': '0',
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        '6': '6',
        '7': '7',
        '8': '8',
        '9': '9'
      };
      var lowerCase = {
        'a': 'а',
        'b': 'б',
        'v': 'в',
        'g': 'г',
        'ĝ': 'ґ',
        'd': 'д',
        'e': 'е',
        'ž': 'ж',
        'z': 'з',
        'y': 'и',
        'i': 'і',
        'j': 'й',
        'k': 'к',
        'l': 'л',
        'm': 'м',
        'n': 'н',
        'o': 'о',
        'p': 'п',
        'r': 'р',
        's': 'с',
        't': 'т',
        'u': 'у',
        'f': 'ф',
        'h': 'х',
        'c': 'ц',
        'č': 'ч',
        'š': 'ш'
      };
      var upperCase = {
        'A': 'А',
        'B': 'Б',
        'V': 'В',
        'G': 'Г',
        'Ĝ': 'Ґ',
        'D': 'Д',
        'E': 'Е',
        'Ž': 'Ж',
        'Z': 'З',
        'Y': 'И',
        'I': 'І',
        'J': 'Й',
        'K': 'К',
        'L': 'Л',
        'M': 'М',
        'N': 'Н',
        'O': 'О',
        'P': 'П',
        'R': 'Р',
        'S': 'С',
        'T': 'Т',
        'U': 'У',
        'F': 'Ф',
        'H': 'Х',
        'C': 'Ц',
        'Č': 'Ч',
        'Š': 'Ш'
      };
      var joDigraph = {
        'jo': 'йо',
        'Jo': 'Йо',
        'JO': 'ЙО',
        'jO': 'йО'
        //'jo': 'ьо',
      };

      var ioDigraph = {
        'jo': 'ьо',
        'Jo': 'Ьо',
        'JO': 'ЬО',
        'jO': 'ьО'
        //'jo': 'ьо',
      };

      var apostrophe = {
        '’ja': '\’я',
        '’JA': '\’я',
        '’Ja': '\’Я',
        '’jA': '\’Я',
        '’ji': '\’ї',
        '’JI': '\’ї',
        '’Ji': '\’Ї',
        '’jI': '\’Ї',
        '’je': '\’є',
        '’JE': '\’є',
        '’Je': '\’Є',
        '’jE': '\’Є',
        '’ju': '\’ю',
        '’JU': '\’ю',
        '’Ju': '\’Ю',
        '’jU': '\’Ю',
        '’jo': 'йо',
        '’JO': 'ЙО',
        '’Jo': 'ЙО',
        '’jO': 'ЙО',
        '\'ja': '\’я',
        '\'JA': '\’я',
        '\'Ja': '\’Я',
        '\'jA': '\’Я',
        '\'ji': '\’ї',
        '\'JI': '\’ї',
        '\'Ji': '\’Ї',
        '\'jI': '\’Ї',
        '\'je': '\’є',
        '\'JE': '\’є',
        '\'Je': '\’Є',
        '\'jE': '\’Є',
        '\'ju': '\’ю',
        '\'JU': '\’ю',
        '\'Ju': '\’Ю',
        '\'jU': '\’Ю',
        '\'jo': 'йо',
        '\'JO': 'ЙО',
        '\'Jo': 'ЙО',
        '\'jO': 'ЙО'
      };
      var digraphs = {
        ...joDigraph,
        'je': 'є',
        'Je': 'Є',
        'JE': 'Є',
        'jE': 'Є',
        'ji': 'ї',
        'Ji': 'Ї',
        'JI': 'Ї',
        'jI': 'Ї',
        'šč': 'щ',
        'Šč': 'Щ',
        'ŠČ': 'Щ',
        'šČ': 'Щ',
        'ju': 'ю',
        'Ju': 'Ю',
        'JU': 'Ю',
        'jU': 'Ю',
        'ja': 'я',
        'Ja': 'Я',
        'JA': 'Я',
        'jA': 'Я'
      };
      var special = {
        ' ': ' ',
        '’': '\'',
        '’': '\'',
        '’': '\'',
        '’': '\'',
        '’': '\'',
        '@': '@',
        '"': '"'
      };
      var lowerCaseMjakyjZnak = {
        '\'': 'ь',
        '’': 'ь'
      };
      var upperCaseMjakyjZnak = {
        '\'': 'Ь',
        '’': 'Ь'
      };
      var mjakyjZnak = {
        ...lowerCaseMjakyjZnak
      };
      var lowerCaseVowels = {
        'a': 'а',
        'e': 'е',
        'y': 'и',
        'i': 'і',
        'o': 'о',
        'u': 'у'
      };
      var upperCaseVowels = {
        'A': 'А',
        'E': 'Е',
        'Y': 'И',
        'I': 'І',
        'O': 'О',
        'U': 'У'
      };
      var vowels = {
        ...lowerCaseVowels,
        ...upperCaseVowels
      };
      var delimiters = {
        ' ': ' ',
        '.': '.',
        ',': ',',
        ';': ';',
        '\'': '\'',
        '\"': '\"',
        '\«': '\«',
        '\“': '\“',
        '\\': '\\',
        '\/': '\/',
        '\|': '\|',
        '(': '(',
        ')': ')',
        '[': '[',
        ']': ']',
        '!': '!',
        '@': '@',
        '#': '#',
        '$': '$',
        '*': '*',
        '-': '-',
        '=': '=',
        '+': '+',
        '_': '_',
        '~': '~',
        '`': '`',
        '\t': '\t',
        '\r': '\r',
        '\n': '\n'
      };
      const matchingSingleLetters = {
        ...digits,
        ...lowerCase,
        ...upperCase,
        ...special,
        ...mjakyjZnak
      };
      const singleLetters = {
        ...lowerCase,
        ...upperCase,
        ...special,
        ...mjakyjZnak
      };
      const latToCyrDict = {
        //by size
        singleLetters,
        digraphs,
        apostrophe,
        //by type
        digits,
        vowels,
        lowerCase,
        upperCase,
        mjakyjZnak,
        lowerCaseMjakyjZnak,
        upperCaseMjakyjZnak,
        special,
        delimiters,
        joDigraph,
        ioDigraph,
        matchingSingleLetters,
        //match all
        all: {
          singleLetters,
          digraphs,
          apostrophe
        }
      };
      exports.latToCyrDict = latToCyrDict;

    }, {}], 10: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.latToCyr = latToCyr;
      var _dictionary = require("./dictionary/dictionary.js");
      var _common = require("./common.js");
      var dict = _dictionary.dictionary.latToCyr;
      var exceptions = _dictionary.dictionary.exceptions.latToCyr;
      function shouldBeJo(text, i) {
        var isAlwaysHardConsonant = {
          'b': true,
          'p': true,
          'v': true,
          'm': true,
          'f': true,
          'r': true,
          'ž': true,
          'č': true,
          'š': true
        };
        var firstLetterInText = i == 0;
        var afterMjakyjZnak = i - 1 >= 0 && dict.mjakyjZnak[text[i - 1]];
        var afterDelimiter = i - 1 >= 0 && dict.delimiters[text[i - 1]];
        var afterVowel = i - 1 >= 0 && dict.vowels[text[i - 1]];
        //see exceptions
        var afterAlwaysHardConsonant = i - 1 >= 0 && isAlwaysHardConsonant[text[i - 1]];
        return firstLetterInText || afterMjakyjZnak || afterVowel || afterAlwaysHardConsonant || afterDelimiter;
      }
      function latToCyr(text) {
        // -----------------------------------------------------------

        var answer = '';
        var {
          skips,
          text
        } = _common.common.preprocessTextWithSkips(text, [{
          from: _common.common.quotes.single,
          to: _common.common.quotes.triangle,
          excludeMiddle: true
        }, {
          from: _common.common.quotes.pretty,
          to: _common.common.quotes.triangle
        }], 5);
        var {
          skips,
          text
        } = _common.common.preprocessTextWithSkips(text, [{
          from: _common.common.quotes.double,
          to: _common.common.quotes.triangle
        }], 1, skips);
        var fn = _common.common.fn(text); //init fn functions on processed text

        processAlphabetCharacterByCharacter();
        return answer;

        // -----------------------------------------------------------

        function processAlphabetCharacterByCharacter() {
          var nextSkip = 0;
          var i = 0;
          while (i < text.length) {
            if (!dict.matchingSingleLetters[text[i]]) {
              answer += text[i];
              i++;
            } else {
              //process skips
              while (fn.matchSubstring(i, 5, {
                regex: _common.common.skipWordsMatcher
              })) {
                const restoreWord = skips[nextSkip].replace(_common.common.skipWordsMatcher, '$1');
                answer += text.substring(i, i + 5).replace(_common.common.skipWordsMatcher, restoreWord);
                nextSkip++;
                i += 5;
              }

              //process fixed size skip matchers
              while (matchSkipMatcher(i, 6)) {
                answer += text.substring(i, i + 6);
                i += 6;
              }

              //process exceptions
              var j = exceptions.maxLength - 1;
              while (j > 1) {
                while (fn.exactMatchSubstring(i, j + 1, exceptions[j + 1])) {
                  answer += exceptions[j + 1][text.substring(i, i + j + 1)];
                  i += j + 1;
                }
                j--;
              }

              //process apostrophes
              while (fn.exactMatchSubstring(i, 3, dict.apostrophe)) {
                answer += dict.apostrophe[text.substring(i, i + 3)];
                i += 3;
              }

              //process jo
              while (fn.exactMatchSubstring(i, 2, dict.joDigraph)) {
                if (shouldBeJo(text, i)) {
                  answer += dict.joDigraph[text.substring(i, i + 2)];
                  i += 2;
                } else {
                  answer += dict.ioDigraph[text.substring(i, i + 2)];
                  i += 2;
                }
              }

              //process digraphs
              while (fn.exactMatchSubstring(i, 2, dict.digraphs)) {
                answer += dict.digraphs[text.substring(i, i + 2)];
                i += 2;
              }

              //process mjakyj znak
              while (fn.shouldBeUpperCase(i, 1, dict.mjakyjZnak)) {
                answer += dict.upperCaseMjakyjZnak[text[i]];
                i++;
              }

              //process single characters
              if (fn.exactMatchSubstring(i, 1, dict.singleLetters)) {
                answer += dict.singleLetters[text[i]];
                i++;
              }
            }
          }
        }
        ;
        function matchSkipMatcher(i, size) {
          var unicodeCharacterSymbols = /0x[0-9A-Z]{4}/g;
          var skipMatchers = {
            6: {
              regex: unicodeCharacterSymbols
            }
          };
          return fn.matchSubstring(i, size, skipMatchers[size]);
        }
      }

    }, { "./common.js": 4, "./dictionary/dictionary.js": 6 }], 11: [function (require, module, exports) {
      (function (process) {
        (function () {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.runTests = runTests;
          var _cyrToLatTestSuite = require("./testcases/0.9/cyrToLatTestSuite.js");
          var _latToCyrTestSuite = require("./testcases/0.9/latToCyrTestSuite.js");
          var _cyrToLatTestSuite2 = require("./testcases/1.0/cyrToLatTestSuite.js");
          var _latToCyrTestSuite2 = require("./testcases/1.0/latToCyrTestSuite.js");
          var _cyrToLatTestSuite3 = require("./testcases/1.1/cyrToLatTestSuite.js");
          var _latToCyrTestSuite3 = require("./testcases/1.1/latToCyrTestSuite.js");
          var _cyrToLatTestSuite4 = require("./testcases/future/cyrToLatTestSuite.js");
          var _latToCyrTestSuite4 = require("./testcases/future/latToCyrTestSuite.js");
          var _testUtils = require("./utils/testUtils.js");
          const supportedVersions = ['0.9', '1.0'];
          const experimentalVersion = '1.1';
          const futureVersion = 'future';
          for (let i = 0; i < supportedVersions.length; i++) {
            import(`./testcases/${supportedVersions[i]}/cyrToLatTestSuite.js`).then();
            import(`./testcases/${supportedVersions[i]}/latToCyrTestSuite.js`).then();
          }
          import(`./testcases/${experimentalVersion}/cyrToLatTestSuite.js`).then();
          import(`./testcases/${experimentalVersion}/latToCyrTestSuite.js`).then();
          import(`./testcases/${futureVersion}/cyrToLatTestSuite.js`).then();
          import(`./testcases/${futureVersion}/latToCyrTestSuite.js`).then();
          function runTests(loglevel = 'debug', experimental = false, future = false, name = "ALL TESTS") {
            process.argv.forEach(function (val, index, array) {
              console.log(index + ': ' + val);
            });
            (0, _testUtils.init)(loglevel ? loglevel : undefined);
            var tests = {
              cyrToLat0_9TestSuite: _cyrToLatTestSuite.cyrToLatTestSuite,
              latToCyr0_9TestSuite: _latToCyrTestSuite.latToCyrTestSuite,
              cyrToLat1_0TestSuite: _cyrToLatTestSuite2.cyrToLatTestSuite,
              latToCyr1_0TestSuite: _latToCyrTestSuite2.latToCyrTestSuite
            };
            var experimentalTests = {
              cyrToLatExperimentalSuite: _cyrToLatTestSuite3.cyrToLatTestSuite,
              latToCyrExperimentalSuite: _latToCyrTestSuite3.latToCyrTestSuite
            };
            var futureTests = {
              cyrToLatFutureSuite: _cyrToLatTestSuite4.cyrToLatTestSuite,
              latToCyrFutureSuite: _latToCyrTestSuite4.latToCyrTestSuite
            };
            if (experimental) {
              tests = {
                ...tests,
                ...experimentalTests
              };
            }
            if (future) {
              tests = {
                ...tests,
                ...futureTests
              };
            }
            const allTests = typeof tests === 'object' ? Object.values(tests) : tests;
            return (0, _testUtils.runAll)(true, allTests, name);
          }
          runTests();

        }).call(this)
      }).call(this, require('_process'))
    }, { "./testcases/0.9/cyrToLatTestSuite.js": 12, "./testcases/0.9/latToCyrTestSuite.js": 13, "./testcases/1.0/cyrToLatTestSuite.js": 14, "./testcases/1.0/latToCyrTestSuite.js": 15, "./testcases/1.1/cyrToLatTestSuite.js": 16, "./testcases/1.1/latToCyrTestSuite.js": 17, "./testcases/future/cyrToLatTestSuite.js": 18, "./testcases/future/latToCyrTestSuite.js": 19, "./utils/testUtils.js": 22, "_process": 1 }], 12: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.cyrToLatTestSuite = void 0;
      var _index = require("../../../../index.js");
      // for tests:
      // set optional: true if you want a test to fail with a WARNING instead of an ERROR

      // for suites:
      // set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
      const cyrToLatTestSuite = {
        name: `Versija 0.9 Kyrylycja => Latynka`,
        fn: _index.klatinoid.cyrToLat,
        optional: false,
        testPayload: [{
          name: `kontrol'nyj testovyj tekst`,
          optional: false,
          testPayload: {
            input: `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: а-фторсульфо-нилоксиалканперфторкарбонова кислота.
    В латинці правильно писати апостроф перед [йо] після приголосних: серйозно, курйоз, але район, мільйон (або міл\`йон?).
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: НЕ СПОВІЩАТИ (але [Ще]), ЮНЕСКО, СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на [йо]/(м'який знак + [о]): п’ятьох, трьох, його, йогурт, (Йоркшир), /йога/, Йоганнесбург, _Йовович_.`,
            expected: `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V'jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered [jo] pislja prygolosnyh: ser'jozno, kur'joz, ale rajon, mil'jon (abo mil'jon?).
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: NE SPOVIŠČATY (ale [Šče]), JUNESKO, SER'JOZNO, KUR'JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na [jo]/(m'jakyj znak + [o]): p'jatjoh, trjoh, jogo, jogurt, (Jorkšyr), /joga/, Jogannesburg, _Jovovyč_.`
          }
        }, {
          name: `"його" => "jogo" na počatku teksta, vsi registry`,
          optional: false,
          testPayload: {
            //this test will iterate over all possible registers of the word e.g. JOGO and Jogo will be tested as well
            allRegisters: true,
            input: `його`,
            expected: `jogo`
          }
        }, {
          name: `"jogo" => "його" na počatku rjadku, vsi registry`,
          optional: false,
          testPayload: {
            allRegisters: true,
            input: `\r\nйого`,
            expected: `\r\njogo`
          }
        }, {
          name: `"цього" => "cjogo", vsi registry`,
          optional: false,
          testPayload: {
            //this test will iterate over all possible registers of the word e.g. JOGO and Jogo will be tested as well
            allRegisters: true,
            input: `цього`,
            expected: `cjogo`
          }
        }, {
          name: `"Україна" => "Ukrajina", vsi registry`,
          optional: false,
          testPayload: {
            //this test will iterate over all possible registers of the word e.g. JOGO and Jogo will be tested as well
            allRegisters: true,
            input: `Україна`,
            expected: `Ukrajina`
          }
        }]
      };
      exports.cyrToLatTestSuite = cyrToLatTestSuite;

    }, { "../../../../index.js": 2 }], 13: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.latToCyrTestSuite = void 0;
      var _index = require("../../../../index.js");
      // for tests:
      // set optional: true if you want a test to fail with a WARNING (yellow) instead of an ERROR (red)

      // for suites:
      // by default any suite will propagate a WARNING (yellow) state if any of sub-tests/suites have WARNINGS
      // set optional: true if you want suite to be SUCCEED (green) even if there were WARNINGS in tests or sub-suites
      const latToCyrTestSuite = {
        name: `Versija 0.9 Latynka => Kyrylycja`,
        fn: _index.klatinoid.latToCyr,
        optional: false,
        testPayload: [{
          name: `kontrol'nyj testovyj tekst`,
          optional: false,
          testPayload: {
            input: `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V’jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered [jo] pislja prygolosnyh: ser’jozno, kur’joz, ale rajon, mil'jon.
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: NE SPOVIŠČATY (ale Šče), JUNESKO, SER’JOZNO, KUR’JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na [jo]/(m'jakyj znak + o): p’jatjoh, trjoh, jogo, jogurt, (Jorkšyr), /joga/, Jogannesburg, _Jovovyč_.`,
            expected: `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: а-фторсульфо-нилоксиалканперфторкарбонова кислота.
    В латинці правильно писати апостроф перед [йо] після приголосних: серйозно, курйоз, але район, мільйон.
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: НЕ СПОВІЩАТИ (але Ще), ЮНЕСКО, СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на [йо]/(м’який знак + о): п’ятьох, трьох, його, йогурт, (Йоркшир), /йога/, Йоганнесбург, _Йовович_.`
          }
        }, {
          name: `"його" => "jogo" na počatku teksta, vsi registry`,
          optional: false,
          testPayload: {
            allRegisters: true,
            input: `jogo`,
            expected: `його`
          }
        }, {
          name: `"його" => "jogo" na počatku teksta, vsi registry`,
          optional: false,
          testPayload: {
            allRegisters: true,
            input: `\r\njogo`,
            expected: `\r\nйого`
          }
        }]
      };
      exports.latToCyrTestSuite = latToCyrTestSuite;

    }, { "../../../../index.js": 2 }], 14: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.cyrToLatTestSuite = void 0;
      var _index = require("../../../../index.js");
      // for tests:
      // set optional: true if you want a test to fail with a WARNING instead of an ERROR

      // for suites:
      // set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
      const cyrToLatTestSuite = {
        name: `Versija 1.0 Kyrylycja => Latynka`,
        fn: _index.klatinoid.cyrToLat,
        optional: false,
        testPayload: [{
          name: `kontrol'nyj testovyj tekst`,
          optional: false,
          testPayload: {
            input: `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: а-фторсульфо-нилоксиалканперфторкарбонова кислота.
    В латинці правильно писати апостроф перед "йо" після приголосних: серйозно, курйоз, але район, мільйон (або міл\`йон?).
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: «НЕ СПОВІЩАТИ» (але "Ще"), "ЮНЕСКО", СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на 'йо'/'ьо' (м'який знак + "о"): п’ятьох, трьох, його, "йогурт", (Йоркшир), /йога/, [Йоганнесбург], _Йовович_.
    В іншомовних словах апостроф перед я, ю, є, ї ставиться не тільки після губних (б, п, в, м, ф) та р, а й після шиплячих та задньоротових (г, к, х, ж, ч, ш), якщо після них чується звук [й]: комп'ютер [-пю-], Дансм'юр [-мюр], бар'єр [-рєр], миш'як [-шя-], Руж'є [-жє], Х'юстон (@@Х'юстон@@) [хю-], Рейк'явік (@@Рейк'явік@@) [-кя-], Г'ята [гя-].
    Болга́рія (заст. укр. @@Болгарщина@@[5], болг. @@България@@), офіційна назва: Респу́бліка Болга́рія (болг. @@Република България@@)`,
            expected: `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V'jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered "jo" pislja prygolosnyh: ser'jozno, kur'joz, ale rajon, mil'jon (abo mil'jon?).
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: "NE SPOVIŠČATY" (ale "Šče"), "JUNESKO", SER'JOZNO, KUR'JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na "jo"/"'o" (m'jakyj znak + "o"): p'jatjoh, trjoh, jogo, "jogurt", (Jorkšyr), /joga/, [Jogannesburg], _Jovovyč_.
    V inšomovnyh slovah apostrof pered ja, ju, je, ji stavyt'sja ne til'ky pislja gubnyh (b, p, v, m, f) ta r, a j pislja šypljačyh ta zadnjorotovyh (g, k, h, ž, č, š), jakščo pislja nyh čujet'sja zvuk [j]: komp'juter [-pju-], Dansm'jur [-mjur], bar'jer [-rjer], myš'jak [-šja-], Ruž'je [-žje], H'juston (Х'юстон) [hju-], Rejk'javik (Рейк'явік) [-kja-], G'jata [gja-].
    Bolgárija (zast. ukr. Болгарщина[5], bolg. България), oficijna nazva: Respúblika Bolgárija (bolg. Република България)`
          }
        }, {
          name: `trykutni lapky «» majut' zaminjuvatysja na anglijs'ki podvijni "" do 2h vlkaden'`,
          optional: false,
          testPayload: {
            input: `    «Вам Данило ізміняє, ходить до артистки,
    Халву носить, і пряники; молочні сосиски.
    Він із нею в ресторанах + кафе буває.
    Сам коньяк п’є, а артистку винами вгощає.
    І артистка сильно любить вашого Данила.
    «Ще нікого так у жизні, каже, не любила».
    Та артистка — балерина, чоловіка має.
    Він в якомусь міністерстві важний пост займає».`,
            expected: `    "Vam Danylo izminjaje, hodyt' do artystky,
    Halvu nosyt', i prjanyky; moločni sosysky.
    Vin iz neju v restoranah + kafe buvaje.
    Sam kon'jak p'je, a artystku vynamy vgoščaje.
    I artystka syl'no ljubyt' vašogo Danyla.
    "Šče nikogo tak u žyzni, kaže, ne ljubyla".
    Ta artystka — baleryna, čolovika maje.
    Vin v jakomus' ministerstvi važnyj post zajmaje".`
          }
        }, {
          name: `slova ta frazy v podvijnomu ravlyku "@@word@@" majut' zalyšatysja nezminnymy`,
          optional: false,
          testPayload: {
            input: `    Болга́рія (заст. укр. @@Болгарщина@@[5], болг. @@България@@), офіційна назва: Респу́бліка Болга́рія (болг. @@Република България@@)`,
            expected: `    Bolgárija (zast. ukr. Болгарщина[5], bolg. България), oficijna nazva: Respúblika Bolgárija (bolg. Република България)`
          }
        }, {
          name: `apostrofy vseredeni slova majut' zaminjatysja na znak "'"`,
          optional: false,
          testPayload: {
            input: `    м'який 0x0027 APOSTROPHE
    мʼякий 0x02BC MODIFIER LETTER APOSTROPHE
    м՚який 0x055A ARMENIAN APOSTROPHE
    м＇який 0xFF07 FULLWIDTH APOSTROPHE
    м’який 0x2019 RIGHT SINGLE QUOTATION MARK
    м\`який 0x0060 GRAVE ACCENT
    м\‘який 0x2018 LEFT SINGLE QUOTATION MARK
    мʹякий 0x02B9 MODIFIER LETTER PRIME
    мꞌякий 0xA78C LATIN SMALL LETTER SALTILLO`,
            expected: `    m'jakyj 0x0027 APOSTROPHE
    m'jakyj 0x02BC MODIFIER LETTER APOSTROPHE
    m'jakyj 0x055A ARMENIAN APOSTROPHE
    m'jakyj 0xFF07 FULLWIDTH APOSTROPHE
    m'jakyj 0x2019 RIGHT SINGLE QUOTATION MARK
    m'jakyj 0x0060 GRAVE ACCENT
    m'jakyj 0x2018 LEFT SINGLE QUOTATION MARK
    m'jakyj 0x02B9 MODIFIER LETTER PRIME
    m'jakyj 0xA78C LATIN SMALL LETTER SALTILLO`
          }
        }, {
          name: `apostrofy vkinci slova majut' zaminjatysja na znak "'"`,
          optional: false,
          testPayload: {
            input: `    latyn' 0x0027 APOSTROPHE
    latynʼ 0x02BC MODIFIER LETTER APOSTROPHE
    latyn՚ 0x055A ARMENIAN APOSTROPHE
    latyn＇ 0xFF07 FULLWIDTH APOSTROPHE
    latyn’ 0x2019 RIGHT SINGLE QUOTATION MARK
    latyn\` 0x0060 GRAVE ACCENT
    latyn‘ 0x2018 LEFT SINGLE QUOTATION MARK
    latynʹ 0x02B9 MODIFIER LETTER PRIME
    latynꞌ 0xA78C LATIN SMALL LETTER SALTILLO`,
            expected: `    latyn' 0x0027 APOSTROPHE
    latyn' 0x02BC MODIFIER LETTER APOSTROPHE
    latyn' 0x055A ARMENIAN APOSTROPHE
    latyn' 0xFF07 FULLWIDTH APOSTROPHE
    latyn' 0x2019 RIGHT SINGLE QUOTATION MARK
    latyn' 0x0060 GRAVE ACCENT
    latyn' 0x2018 LEFT SINGLE QUOTATION MARK
    latyn' 0x02B9 MODIFIER LETTER PRIME
    latyn' 0xA78C LATIN SMALL LETTER SALTILLO`
          }
        }]
      };
      exports.cyrToLatTestSuite = cyrToLatTestSuite;

    }, { "../../../../index.js": 2 }], 15: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.latToCyrTestSuite = void 0;
      var _index = require("../../../../index.js");
      // for tests:
      // set optional: true if you want a test to fail with a WARNING instead of an ERROR

      // for suites:
      // set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
      const latToCyrTestSuite = {
        name: `Versija 1.0 Kyrylycja => Latynka`,
        fn: _index.klatinoid.latToCyr,
        optional: false,
        testPayload: [{
          name: `kontrol'nyj testovyj tekst`,
          optional: false,
          testPayload: {
            input: `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V’jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered [jo] pislja prygolosnyh: ser’jozno, kur’joz, ale rajon, mil'jon.
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: NE SPOVIŠČATY (ale [Šče]), JUNESKO, SER’JOZNO, KUR’JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na [jo]/(m'jakyj znak + [o]): p’jatjoh, trjoh, jogo, jogurt, (Jorkšyr), /joga/, Jogannesburg, _Jovovyč_.    
    V inšomovnyh slovah apostrof pered ja, ju, je, ji stavyt'sja ne til'ky pislja gubnyh (b, p, v, m, f) ta r, a j pislja šypljačyh ta zadnjorotovyh (g, k, h, ž, č, š), jakščo pislja nyh čujet'sja zvuk [j]: komp'juter [-pju-], Dansm'jur [-mjur], bar'jer [-rjer], myš'jak [-šja-], Ruž'je [-žje], H'juston (@@Huston@@) [hju-], Rejk'javik (@@Reykjavik@@) [-kja-], G'jata [gja-].
    @@Grand Beatbox Battle@@ (zazvyčaj skoročeno @@GBB@@) — ščorične mižnarodne zmagannja z @@beatboxing@@u, jake provodyt' @@Swissbeatbox@@. Konkurs provodyt' kil'ka turniriv dlja riznyh form i kategorij @@beatboxing@@u, zokrema: @@solo@@ (abo @@showcase@@), @@Loopstation@@, @@Tag Team@@, @@Tag Team Loopstation@@ i @@Crew@@.
    Možna šče al'ternatyvno rozgljanuty rišennja z @@iframe + third party scraper API@@.`,
            expected: `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: а-фторсульфо-нилоксиалканперфторкарбонова кислота.
    В латинці правильно писати апостроф перед [йо] після приголосних: серйозно, курйоз, але район, мільйон.
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: НЕ СПОВІЩАТИ (але [Ще]), ЮНЕСКО, СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на [йо]/(м’який знак + [о]): п’ятьох, трьох, його, йогурт, (Йоркшир), /йога/, Йоганнесбург, _Йовович_.    
    В іншомовних словах апостроф перед я, ю, є, ї ставиться не тільки після губних (б, п, в, м, ф) та р, а й після шиплячих та задньоротових (г, к, х, ж, ч, ш), якщо після них чується звук [й]: комп’ютер [-пю-], Дансм’юр [-мюр], бар’єр [-рєр], миш’як [-шя-], Руж’є [-жє], Х’юстон (Huston) [хю-], Рейк’явік (Reykjavik) [-кя-], Г’ята [гя-].
    Grand Beatbox Battle (зазвичай скорочено GBB) — щорічне міжнародне змагання з beatboxingу, яке проводить Swissbeatbox. Конкурс проводить кілька турнірів для різних форм і категорій beatboxingу, зокрема: solo (або showcase), Loopstation, Tag Team, Tag Team Loopstation і Crew.
    Можна ще альтернативно розглянути рішення з iframe + third party scraper API.`
          }
        }, {
          name: `trykutni lapky «» majut' zaminjuvatysja na anglijs'ki podvijni "" do 2h vlkaden'`,
          optional: false,
          testPayload: {
            off: 'THIS FUNCTIONALITY WAS WRONG. REMOVE THIS TEST. "" should be translated into «» in latToCyr, not the other way around. fixed in v.1.1',
            input: `    «Vam Danylo izminjaje, hodyt' do artystky,
    Halvu nosyt', i prjanyky; moločni sosysky.
    Vin iz neju v restoranah i kafe buvaje.
    Sam kon'jak p'je, a artystku vynamy vgoščaje.
    I artystka syl'no ljubyt' vašogo Danyla.
    Šče nikogo tak u žyzni, kaže, ne ljubyla.
    Ta artystka — baleryna, čolovika maje.
    Vin v jakomus' ministerstvi važnyj post zajmaje».`,
            expected: `    "Вам Данило ізміняє, ходить до артистки,
    Халву носить, і пряники; молочні сосиски.
    Він із нею в ресторанах і кафе буває.
    Сам кон'як п'є, а артистку винами вгощає.
    І артистка сильно любить вашого Данила.
    Ще нікого так у жизні, каже, не любила.
    Та артистка — балерина, чоловіка має.
    Він в якомусь міністерстві важний пост займає".`
          }
        }, {
          name: `slova ta frazy v podvijnomu ravlyku "@@word@@" majut' zalyšatysja nezminnymy`,
          optional: false,
          testPayload: {
            input: `    @@Grand Beatbox Battle@@ (zazvyčaj skoročeno @@GBB@@) — ščorične mižnarodne zmagannja z @@beatboxing@@u, jake provodyt' @@Swissbeatbox@@. Konkurs provodyt' kil'ka turniriv dlja riznyh form i kategorij @@beatboxing@@u, zokrema: @@solo@@ (abo @@showcase@@), @@Loopstation@@, @@Tag Team@@, @@Tag Team Loopstation@@ i @@Crew@@.
    Možna šče al'ternatyvno rozgljanuty rišennja z @@iframe + third party scraper API@@.`,
            expected: `    Grand Beatbox Battle (зазвичай скорочено GBB) — щорічне міжнародне змагання з beatboxingу, яке проводить Swissbeatbox. Конкурс проводить кілька турнірів для різних форм і категорій beatboxingу, зокрема: solo (або showcase), Loopstation, Tag Team, Tag Team Loopstation і Crew.
    Можна ще альтернативно розглянути рішення з iframe + third party scraper API.`
          }
        }]
      };
      exports.latToCyrTestSuite = latToCyrTestSuite;

    }, { "../../../../index.js": 2 }], 16: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.cyrToLatTestSuite = void 0;
      var _index = require("../../../../index.js");
      // for tests:
      // set optional: true if you want a test to fail with a WARNING instead of an ERROR

      // for suites:
      // set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
      const cyrToLatTestSuite = {
        name: `EXPERIMENTAL Versija 1.1 Kyrylycja => Latynka`,
        fn: _index.klatinoid.cyrToLat,
        optional: false,
        testPayload: [{
          name: `kontrol'nyj testovyj tekst`,
          optional: true,
          testPayload: {
            input: `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: а-фторсульфо-нилоксиалканперфторкарбонова кислота.
    В латинці правильно писати апостроф перед "йо" після приголосних: серйозно, курйоз, але район, мільйон (або міл\`йон?).
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: «НЕ СПОВІЩАТИ» (але "Ще"), "ЮНЕСКО", СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на 'йо'/'ьо' (м'який знак + "о"): п’ятьох, трьох, його, "йогурт", (Йоркшир), /йога/, [Йоганнесбург], _Йовович_.
    В іншомовних словах апостроф перед я, ю, є, ї ставиться не тільки після губних (б, п, в, м, ф) та р, а й після шиплячих та задньоротових (г, к, х, ж, ч, ш), якщо після них чується звук [й]: комп'ютер [-пю-], Дансм'юр [-мюр], бар'єр [-рєр], миш'як [-шя-], Руж'є [-жє], Х'юстон (@@Х'юстон@@) [хю-], Рейк'явік (@@Рейк'явік@@) [-кя-], Г'ята [гя-].
    Болга́рія (заст. укр. @@Болгарщина@@[5], болг. @@България@@), офіційна назва: Респу́бліка Болга́рія (болг. @@Република България@@)
    Булга́ри (лат. @@Bulgares@@, грец. @@Βoύλγαρoί@@, староболг. @@Блъгарє@@, дав.-рус. @@българы@@, тат. @@болгарлар@@, чув. @@Пӑлха́рсем@@, болг. @@прабългари@@) — група тюркських (огурських) кочових племен.`,
            expected: `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V'jent'jan.
    Himični spoluky: a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota.
    V latynci pravyl'no pysaty apostrof pered "jo" pislja prygolosnyh: ser'jozno, kur'joz, ale rajon, mil'jon (abo mil'jon?).
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: "NE SPOVIŠČATY" (ale "Šče"), "JUNESKO", SER'JOZNO, KUR'JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na "jo"/"'o" (m'jakyj znak + "o"): p'jatjoh, trjoh, jogo, "jogurt", (Jorkšyr), /joga/, [Jogannesburg], _Jovovyč_.
    V inšomovnyh slovah apostrof pered ja, ju, je, ji stavyt'sja ne til'ky pislja gubnyh (b, p, v, m, f) ta r, a j pislja šypljačyh ta zadnjorotovyh (g, k, h, ž, č, š), jakščo pislja nyh čujet'sja zvuk [j]: komp'juter [-pju-], Dansm'jur [-mjur], bar'jer [-rjer], myš'jak [-šja-], Ruž'je [-žje], H'juston (Х'юстон) [hju-], Rejk'javik (Рейк'явік) [-kja-], G'jata [gja-].
    Bolgárija (zast. ukr. Болгарщина[5], bolg. България), oficijna nazva: Respúblika Bolgárija (bolg. Република България)
    Bulgáry (lat. Bulgares, grec. Βoύλγαρoί, starobolg. Блъгарє, dav.-rus. българы, tat. болгарлар, čuv. Пӑлха́рсем, bolg. прабългари) — grupa tjurks'kyh (ogurs'kyh) kočovyh plemen.`
          }
        }, {
          name: `slova ta frazy v podvijnomu ravlyku "@@word@@" majut' zalyšatysja nezminnymy nezaležno vid vmistu e.g. Βoύλγαρoί`,
          optional: true,
          testPayload: {
            input: `    Болга́рія (заст. укр. @@Болгарщина@@[5], болг. @@България@@), офіційна назва: Респу́бліка Болга́рія (болг. @@Република България@@)
    Булга́ри (лат. @@Bulgares@@, грец. @@Βoύλγαρoί@@, староболг. @@Блъгарє@@, дав.-рус. @@българы@@, тат. @@болгарлар@@, чув. @@Пӑлха́рсем@@, болг. @@прабългари@@) — група тюркських (огурських) кочових племен`,
            expected: `    Bolgárija (zast. ukr. Болгарщина[5], bolg. България), oficijna nazva: Respúblika Bolgárija (bolg. Република България)
    Bulgáry (lat. Bulgares, grec. Βoύλγαρoί, starobolg. Блъгарє, dav.-rus. българы, tat. болгарлар, čuv. Пӑлха́рсем, bolg. прабългари) — grupa tjurks'kyh (ogurs'kyh) kočovyh plemen`
          }
        }, {
          name: `jotovani naprykinci slova a takož, slovo "Я" majut perekladatysja jak "JA"/"JE"/"JU"/"JI" v teksti z velykymy literamy`,
          optional: true,
          testPayload: {
            input: `Українська компанія, розташована в Києві, ВІДМОВЛЯЄ В СПІВБЕСІДІ україномовній особі через те, що вона повторила у своєму резюме українське законодавство.
    НЕ ХОЧУ СПІВПРАЦЮВАТИ З КОМПАНІЯМИ, ЯКІ НЕ ВМІЮТЬ ВЕСТИ БІЗНЕС ДЕРЖАВНОЮ МОВОЮ Я НЕ БУДУ.
    Я ВІДМОВЛЯЮ, ВОНА ВІДМОВЛЯЄ, ВІН ВІДМОВЛЯЄТЬСЯ ВІД МІЛЬЯРДУ.`,
            expected: `Ukrajins'ka kompanija, roztašovana v Kyjevi, VIDMOVLJAJE V SPIVBESIDI ukrajinomovnij osobi čerez te, ščo vona povtoryla u svojemu rezjume ukrajins'ke zakonodavstvo.
    NE HOČU SPIVPRACJUVATY Z KOMPANIJAMY, JAKI NE VMIJUT' VESTY BIZNES DERŽAVNOJU MOVOJU JA NE BUDU.
    JA VIDMOVLJAJU, VONA VIDMOVLJAJE, VIN VIDMOVLJAJET'SJA VID MIL'JARDU.`
          }
        }, {
          name: `odynarni lapky '' majut' zaminjuvatysja na anglijs'ki podvijni "" do 5ty vkladen'`,
          optional: true,
          testPayload: {
            input: `    'Вам Данило ізміняє, ходить до артистки,
    'Халву носить, і пряники; молочні сосиски.
    Він із нею в ресторанах + кафе буває.
    Сам коньяк п’є, а артистку винами вгощає.
    'І артистка сильно любить вашого Данила.
    'Ще нікого так у 'жизні', каже', не любила'.
    Та артистка — балерина, чоловіка має'.
    Він в якомусь міністерстві важний пост займає'.`,
            expected: `    "Vam Danylo izminjaje, hodyt' do artystky,
    "Halvu nosyt', i prjanyky; moločni sosysky.
    Vin iz neju v restoranah + kafe buvaje.
    Sam kon'jak p'je, a artystku vynamy vgoščaje.
    "I artystka syl'no ljubyt' vašogo Danyla.
    "Šče nikogo tak u "žyzni", kaže", ne ljubyla".
    Ta artystka — baleryna, čolovika maje".
    Vin v jakomus' ministerstvi važnyj post zajmaje".`
          }
        }, {
          name: `trykutni lapky «» majut' zaminjuvatysja na anglijs'ki podvijni "" do 5ty vkladen'`,
          optional: true,
          testPayload: {
            input: `    «Вам Данило ізміняє, ходить до артистки,
    «Халву носить, і пряники; молочні сосиски.
    Він із нею в ресторанах + кафе буває.
    Сам коньяк п’є, а артистку винами вгощає.
    «І артистка сильно любить вашого Данила.
    «Ще нікого так у «жизні», каже», не любила».
    Та артистка — балерина, чоловіка має».
    Він в якомусь міністерстві важний пост займає».`,
            expected: `    "Vam Danylo izminjaje, hodyt' do artystky,
    "Halvu nosyt', i prjanyky; moločni sosysky.
    Vin iz neju v restoranah + kafe buvaje.
    Sam kon'jak p'je, a artystku vynamy vgoščaje.
    "I artystka syl'no ljubyt' vašogo Danyla.
    "Šče nikogo tak u "žyzni", kaže", ne ljubyla".
    Ta artystka — baleryna, čolovika maje".
    Vin v jakomus' ministerstvi važnyj post zajmaje".`
          }
        }, {
          name: `podvijni figurni lapky “” majut' zaminjuvatysja na anglijs'ki podvijni "" do 5ty vkladen'`,
          optional: true,
          testPayload: {
            input: `    “Вам Данило ізміняє, ходить до артистки,
    “Халву носить, і пряники; молочні сосиски.
    Він із нею в ресторанах + кафе буває.
    Сам коньяк п’є, а артистку винами вгощає.
    “І артистка сильно любить вашого Данила.
    “Ще нікого так у “жизні”, каже”, не любила”.
    Та артистка — балерина, чоловіка має”.
    Він в якомусь міністерстві важний пост займає”.`,
            expected: `    "Vam Danylo izminjaje, hodyt' do artystky,
    "Halvu nosyt', i prjanyky; moločni sosysky.
    Vin iz neju v restoranah + kafe buvaje.
    Sam kon'jak p'je, a artystku vynamy vgoščaje.
    "I artystka syl'no ljubyt' vašogo Danyla.
    "Šče nikogo tak u "žyzni", kaže", ne ljubyla".
    Ta artystka — baleryna, čolovika maje".
    Vin v jakomus' ministerstvi važnyj post zajmaje".`
          }
        }]
      };
      exports.cyrToLatTestSuite = cyrToLatTestSuite;

    }, { "../../../../index.js": 2 }], 17: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.latToCyrTestSuite = void 0;
      var _index = require("../../../../index.js");
      // for tests:
      // set optional: true if you want a test to fail with a WARNING instead of an ERROR

      // for suites:
      // set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
      const latToCyrTestSuite = {
        name: `EXPERIMENTAL Versija 1.1 Latynka => Kyrylycja`,
        fn: _index.klatinoid.latToCyr,
        optional: false,
        testPayload: [{
          name: `kontrol'nyj testovyj tekst`,
          optional: true,
          testPayload: {
            input: `    Slova inšomovnogo pohodžennja: ad'je, konferans'je, monpans'je, pas'jans, atel'je, barel'jef, batal'jon, mil'jard, buton'jerka, vin'jetka, kan'jon, Got'je, N'ju-Jork, N'juton, N'jasa, Ren'je toščo. Ale V’jent'jan.
    Himični spoluky: "a-ftorsul'fo-nyloksyalkanperftorkarbonova kyslota".
    V latynci pravyl'no pysaty apostrof pered "jo" pislja prygolosnyh: ser’jozno, kur’joz, ale rajon, mil'jon.
    Osoblyvi vypadky na dygrafy: sjogodni, ljoh (ale major), svjaščennyk, pracjuju.
    Osoblyvi vypadky zi zmišanym registrom: "NE SPOVIŠČATY" (ale "Šče"), "JUNESKO", SER'JOZNO, KUR’JOZ, RAJON, MIL'JON, OBSJE.
    Osoblyvi vypadky na 'jo' (m'jakyj znak + "o"): p'jatjoh, trjoh, jogo, "jogurt", (Jorkšyr), /joga/, [Jogannesburg], _Jovovyč_.
    V inšomovnyh slovah apostrof pered ja, ju, je, ji stavyt'sja ne til'ky pislja gubnyh (b, p, v, m, f) ta r, a j pislja šypljačyh ta zadnjorotovyh (g, k, h, ž, č, š), jakščo pislja nyh čujet'sja zvuk [j]: komp'juter [-pju-], Dansm'jur [-mjur], bar'jer [-rjer], myš'jak [-šja-], Ruž'je [-žje], H'juston (@@Huston@@) [hju-], Rejk'javik (@@Reykjavik@@) [-kja-], G'jata [gja-].
    @@Grand Beatbox Battle@@ (zazvyčaj skoročeno @@GBB@@) — ščorične mižnarodne zmagannja z @@beatboxing@@u, jake provodyt' @@Swissbeatbox@@. Konkurs provodyt' kil'ka turniriv dlja riznyh form i kategorij @@beatboxing@@u, zokrema: @@solo@@ (abo @@showcase@@), @@Loopstation@@, @@Tag Team@@, @@Tag Team Loopstation@@ i @@Crew@@.
    Možna šče al'ternatyvno rozgljanuty rišennja z @@iframe + third party scraper API@@.`,
            expected: `    Слова іншомовного походження: адьє, конферансьє, монпансьє, пасьянс, ательє, барельєф, батальйон, мільярд, бутоньєрка, віньєтка, каньйон, Готьє, Нью-Йорк, Ньютон, Ньяса, Реньє тощо. Але В’єнтьян.
    Хімічні сполуки: «а-фторсульфо-нилоксиалканперфторкарбонова кислота».
    В латинці правильно писати апостроф перед «йо» після приголосних: серйозно, курйоз, але район, мільйон.
    Особливі випадки на диграфи: сьогодні, льох (але майор), священник, працюю.
    Особливі випадки зі змішаним регістром: «НЕ СПОВІЩАТИ» (але «Ще»), «ЮНЕСКО», СЕРЙОЗНО, КУРЙОЗ, РАЙОН, МІЛЬЙОН, ОБСЄ.
    Особливі випадки на «йо» (м’який знак + «о»): п’ятьох, трьох, його, «йогурт», (Йоркшир), /йога/, [Йоганнесбург], _Йовович_.
    В іншомовних словах апостроф перед я, ю, є, ї ставиться не тільки після губних (б, п, в, м, ф) та р, а й після шиплячих та задньоротових (г, к, х, ж, ч, ш), якщо після них чується звук [й]: комп’ютер [-пю-], Дансм’юр [-мюр], бар’єр [-рєр], миш’як [-шя-], Руж’є [-жє], Х’юстон (Huston) [хю-], Рейк’явік (Reykjavik) [-кя-], Г’ята [гя-].
    Grand Beatbox Battle (зазвичай скорочено GBB) — щорічне міжнародне змагання з beatboxingу, яке проводить Swissbeatbox. Конкурс проводить кілька турнірів для різних форм і категорій beatboxingу, зокрема: solo (або showcase), Loopstation, Tag Team, Tag Team Loopstation і Crew.
    Можна ще альтернативно розглянути рішення з iframe + third party scraper API.`
          }
        }, {
          name: `slova ta frazy v podvijnomu ravlyku "@@word@@" majut' zalyšatysja nezminnymy nezaležno vid vmistu e.g. Βoύλγαρoί`,
          optional: true,
          testPayload: {
            input: `    Bulgáry (lat. @@Bulgares@@, grec. @@Βoύλγαρoί@@, starobolg. @@Блъгарє@@, dav.-rus. @@българы@@, tat. @@болгарлар@@, čuv. @@Пӑлха́рсем@@, bolg. @@прабългари@@) — grupa tjurks'kyh (ogurs'kyh) kočovyh plemen.`,
            expected: `    Булга́ри (лат. Bulgares, грец. Βoύλγαρoί, староболг. Блъгарє, дав.-рус. българы, тат. болгарлар, чув. Пӑлха́рсем, болг. прабългари) — група тюркських (огурських) кочових племен.`
          }
        }, {
          name: `apostrof ' ne maje zaminjuvatysja na trykutni lapky`,
          optional: true,
          testPayload: {
            input: `    Vam Danylo izminjaje, hodyt' do artystky,
    Halvu nosyt', i prjanyky; moločni sosysky.
    Vin iz neju v restoranah + kafe buvaje.
    Sam kon'jak p'je, a artystku vynamy vgoščaje.
    I artystka syl'no ljubyt' vašogo Danyla.
    Šče nikogo tak u žyzni, kaže, ne ljubyla.
    Ta artystka — baleryna, čolovika maje.
    Vin v jakomus' ministerstvi važnyj post zajmaje.`,
            expected: `    Вам Данило ізміняє, ходить до артистки,
    Халву носить, і пряники; молочні сосиски.
    Він із нею в ресторанах + кафе буває.
    Сам коньяк п’є, а артистку винами вгощає.
    І артистка сильно любить вашого Данила.
    Ще нікого так у жизні, каже, не любила.
    Та артистка — балерина, чоловіка має.
    Він в якомусь міністерстві важний пост займає.`
          }
        }, {
          name: `podvijni lapky "" majut' zaminjuvatysja na ukrajins'ki trykutni «» do 1go vkladennja`,
          optional: true,
          testPayload: {
            input: `    Vam Danylo izminjaje, hodyt' do artystky,
    Halvu nosyt', i prjanyky; moločni sosysky.
    Vin iz neju v restoranah + kafe buvaje.
    Sam kon'jak p'je, a artystku vynamy vgoščaje.
    I artystka syl'no ljubyt' vašogo Danyla.
    "Šče nikogo tak u žyzni, kaže, ne ljubyla".
    Ta artystka — baleryna, čolovika maje.
    Vin v jakomus' ministerstvi važnyj post zajmaje.`,
            expected: `    Вам Данило ізміняє, ходить до артистки,
    Халву носить, і пряники; молочні сосиски.
    Він із нею в ресторанах + кафе буває.
    Сам коньяк п’є, а артистку винами вгощає.
    І артистка сильно любить вашого Данила.
    «Ще нікого так у жизні, каже, не любила».
    Та артистка — балерина, чоловіка має.
    Він в якомусь міністерстві важний пост займає.`
          }
        }, {
          name: `podvijni figurni lapky “” majut' zaminjuvatysja na ukrajins'ki trykutni «» do 5ty vkladen'`,
          optional: true,
          testPayload: {
            input: `    “Vam Danylo izminjaje, hodyt' do artystky,
    “Halvu nosyt', i prjanyky; moločni sosysky.
    Vin iz neju v restoranah + kafe buvaje.
    Sam kon'jak p'je, a artystku vynamy vgoščaje.
    “I artystka syl'no ljubyt' vašogo Danyla.
    “Šče nikogo tak u “žyzni”, kaže”, ne ljubyla”.
    Ta artystka — baleryna, čolovika maje”.
    Vin v jakomus' ministerstvi važnyj post zajmaje”.`,
            expected: `    «Вам Данило ізміняє, ходить до артистки,
    «Халву носить, і пряники; молочні сосиски.
    Він із нею в ресторанах + кафе буває.
    Сам коньяк п’є, а артистку винами вгощає.
    «І артистка сильно любить вашого Данила.
    «Ще нікого так у «жизні», каже», не любила».
    Та артистка — балерина, чоловіка має».
    Він в якомусь міністерстві важний пост займає».`
          }
        }]
      };
      exports.latToCyrTestSuite = latToCyrTestSuite;

    }, { "../../../../index.js": 2 }], 18: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.cyrToLatTestSuite = void 0;
      var _index = require("../../../../index.js");
      // for tests:
      // set optional: true if you want a test to fail with a WARNING instead of an ERROR

      // for suites:
      // set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
      const cyrToLatTestSuite = {
        name: `UNIMPLEMENTED FEATURES Kyrylycja => Latynka`,
        fn: _index.klatinoid.cyrToLat,
        optional: true,
        testPayload: [{
          name: `apostrofopodibni symvoly za mežamy sliv NE majut' zaminjatysja na znak "'"`,
          optional: true,
          testPayload: {
            // off: 'NOT IMPLEMENTED. FUTURE FEATURE',

            input: `
        ' 0x0027
        ʼ 0x02BC
        ’ 0x2019
        \` 0x0060
        ՚ 0x055A
        ＇ 0xFF07
        ‘ 0x2018
        ʹ 0x02B9
        ꞌ 0xA78C`,
            expected: `
        ' 0x0027
        ʼ 0x02BC
        ’ 0x2019
        \` 0x0060
        ՚ 0x055A
        ＇ 0xFF07
        ‘ 0x2018
        ʹ 0x02B9
        ꞌ 0xA78C`
          }
        }]
      };
      exports.cyrToLatTestSuite = cyrToLatTestSuite;

    }, { "../../../../index.js": 2 }], 19: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.latToCyrTestSuite = void 0;
      var _index = require("../../../../index.js");
      // for tests:
      // set optional: true if you want a test to fail with a WARNING instead of an ERROR

      // for suites:
      // set optional: true if you want suite to be SUCCEED even if there were WARNINGS in tests or sub-suites, otherwise it will propagate a WARNING state
      const latToCyrTestSuite = {
        name: `UNIMPLEMENTED FEATURES Latynka => Kyrylycja`,
        fn: _index.klatinoid.latToCyr,
        optional: true,
        testPayload: [{
          name: `jotovani naprykinci slova a takož, slovo "Я" majut perekladatysja jak "JA"/"JE"/"JU"/"JI" v teksti z velykymy literamy`,
          optional: true,
          testPayload: {
            input: `Ukrajins'ka kompanija, roztašovana v Kyjevi, VIDMOVLJAJE V SPIVBESIDI ukrajinomovnij osobi čerez te, ščo vona povtoryla u svojemu rezjume ukrajins'ke zakonodavstvo.
    NE HOČU SPIVPRACJUVATY Z KOMPANIJAMY, JAKI NE VMIJUT' VESTY BIZNES DERŽAVNOJU MOVOJU JA NE BUDU.
    JA VIDMOVLJAJU, VONA VIDMOVLJAJE, VIN VIDMOVLJAJET'SJA VID MIL'JARDU.`,
            expected: `Українська компанія, розташована в Києві, ВІДМОВЛЯЄ В СПІВБЕСІДІ україномовній особі через те, що вона повторила у своєму резюме українське законодавство.
    НЕ ХОЧУ СПІВПРАЦЮВАТИ З КОМПАНІЯМИ, ЯКІ НЕ ВМІЮТЬ ВЕСТИ БІЗНЕС ДЕРЖАВНОЮ МОВОЮ Я НЕ БУДУ.
    Я ВІДМОВЛЯЮ, ВОНА ВІДМОВЛЯЄ, ВІН ВІДМОВЛЯЄТЬСЯ ВІД МІЛЬЯРДУ.`
          }
        }, {
          name: `podvijni lapky "" majut' zaminjuvatysja na ukrajins'ki trykutni «» do 5ty vkladen'`,
          optional: true,
          testPayload: {
            input: `    "Vam Danylo izminjaje, hodyt' do artystky,
"Halvu nosyt', i prjanyky; moločni sosysky.
Vin iz neju v restoranah + kafe buvaje.
Sam kon'jak p'je, a artystku vynamy vgoščaje.
"I artystka syl'no ljubyt' vašogo Danyla.
"Šče nikogo tak u "žyzni", kaže", ne ljubyla".
Ta artystka — baleryna, čolovika maje".
Vin v jakomus' ministerstvi važnyj post zajmaje".`,
            expected: `    «Вам Данило ізміняє, ходить до артистки,
«Халву носить, і пряники; молочні сосиски.
Він із нею в ресторанах + кафе буває.
Сам коньяк п’є, а артистку винами вгощає.
«І артистка сильно любить вашого Данила.
«Ще нікого так у «жизні», каже», не любила».
Та артистка — балерина, чоловіка має».
Він в якомусь міністерстві важний пост займає».`
          }
        }, {
          name: `apostrofopodibni symvoly za mežamy sliv NE majut' zaminjatysja na znak "'"`,
          optional: true,
          testPayload: {
            // off: 'NOT IMPLEMENTED. FUTURE FEATURE',

            input: `
    ' 0x0027
    ʼ 0x02BC
    ’ 0x2019
    \` 0x0060
    ՚ 0x055A
    ＇ 0xFF07
    ‘ 0x2018
    ʹ 0x02B9
    ꞌ 0xA78C`,
            expected: `
    ' 0x0027
    ʼ 0x02BC
    ’ 0x2019
    \` 0x0060
    ՚ 0x055A
    ＇ 0xFF07
    ‘ 0x2018
    ʹ 0x02B9
    ꞌ 0xA78C`
          }
        }, {
          name: `apostrofy vseredeni slova majut' zaminjatysja na znak "’"`,
          optional: true,
          testPayload: {
            input: `    m'jakyj 0x0027
mʼjakyj 0x02BC
m՚jakyj 0x055A
m＇jakyj 0xFF07
m’jakyj 0x2019
m\`jakyj 0x0060
m\‘jakyj 0x2018
mʹjakyj 0x02B9
mꞌjakyj 0xA78C`,
            expected: `    м’який 0x0027
м’який 0x02BC
м’який 0x055A
м’який 0xFF07
м’який 0x2019
м’який 0x0060
м’який 0x2018
м’який 0x02B9
м’який 0xA78C`
          }
        }, {
          name: `apostrofy vkinci slova majut' zaminjatysja na znak "ь"`,
          optional: true,
          testPayload: {
            input: `    latyn' 0x0027
latynʼ 0x02BC
latyn՚ 0x055A
latyn＇ 0xFF07
latyn’ 0x2019
latyn\` 0x0060
latyn‘ 0x2018
latynʹ 0x02B9
latynꞌ 0xA78C`,
            expected: `    латинь 0x0027
латинь 0x02BC
латинь 0x055A
латинь 0xFF07
латинь 0x2019
латинь 0x0060
латинь 0x2018
латинь 0x02B9
латинь 0xA78C`
          }
        }]
      };
      exports.latToCyrTestSuite = latToCyrTestSuite;

    }, { "../../../../index.js": 2 }], 20: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.strUtils = void 0;
      const matchAllWords = /((')?)([0-9a-zа-яіїєґčšžĝ’'-]+)(\1)/gi;
      function setCharToUpperCase(str, i) {
        return setCharAt(str, i, str.charAt(i).toUpperCase());
      }
      function setCharToLowerCase(str, i) {
        return setCharAt(str, i, str.charAt(i).toLowerCase());
      }
      function setCharAt(str, i, char) {
        if (i > str.length - 1) return str;
        return str.substring(0, i) + char + str.substring(i + 1);
      }
      function addCustomCases() {
        String.prototype.toProperCase = function () {
          return this.replace(matchAllWords, function (word) {
            return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
          });
        };

        // caseArray - array of booleans or binary string '100010'
        String.prototype.toCase = function (caseArray) {
          return this.replace(matchAllWords, function (word) {
            if (!caseArray || caseArray.length != word.length) {
              return word;
            }
            if (typeof caseArray === 'string' || caseArray instanceof String) {
              caseArray = caseArray.split('');
              caseArray = caseArray.map(element => {
                if (element == '1') {
                  return true;
                }
                return false;
              });
            }
            for (let i = 0; i < caseArray.length; i++) {
              if (caseArray[i]) {
                word = setCharToUpperCase(word, i);
              } else {
                word = setCharToLowerCase(word, i);
              }
            }
            return word;
          });
        };
      }
      const strUtils = {
        addCustomCases,
        setCharToLowerCase,
        setCharToUpperCase,
        setCharAt
      };
      exports.strUtils = strUtils;

    }, {}], 21: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.assertTestCase = assertTestCase;
      exports.assertTestCaseAllRegisters = assertTestCaseAllRegisters;
      var _diff_match_patch = require("../../../lib/js/diff/diff_match_patch.js");
      var _testUtils = require("./testUtils.js");
      var _stringUtils = require("./stringUtils.js");
      _stringUtils.strUtils.addCustomCases();
      function assertTestCase(fn, testObject) {
        assertExactTranslation(fn, testObject.input, testObject.expected);
      }
      function assertTestCaseAllRegisters(fn, testObject) {
        assertForAllRegisters(fn, testObject.input, testObject.expected);
      }
      function assertExactTranslation(fn, input, expected) {
        const actual = fn(input);
        _testUtils.log.debug(`\r\n[${input}]\r\n 🡃 \r\n[${actual}]`);
        var dmp = new _diff_match_patch.diff_match_patch();
        var d = dmp.diff_main(actual, expected);
        dmp.diff_cleanupSemantic(d);
        var diff = dmp.diff_prettyHtml(d);
        (0, _testUtils.assert)(actual == expected, `Input \r\n[\r\n${input}\r\n]\r\nmaje zaminjatysja na:\r\n[\r\n${expected}\r\n]\r\na ne na:\r\n[\r\n${diff}\r\n]\r\n`);
      }
      function assertForAllRegisters(fn, input, expected) {
        assertExactTranslation(fn, input.toLowerCase(), expected.toLowerCase());
        assertExactTranslation(fn, input.toUpperCase(), expected.toUpperCase());
        assertExactTranslation(fn, input.toProperCase(), expected.toProperCase());
      }

    }, { "../../../lib/js/diff/diff_match_patch.js": 3, "./stringUtils.js": 20, "./testUtils.js": 22 }], 22: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.assert = assert;
      exports.init = init;
      exports.log = void 0;
      exports.runAll = runAll;
      var _testAssertions = require("./testAssertions.js");
      var logLevel = 'nolog';
      var successSymbol = '\u2714 ';
      var failSymbol = '\u2718 ';
      var warningSymbol = '\u26A0 ';
      var successStatus = true;
      var failStatus = false;
      var warningStatus = 'warn';
      const testRoot = '[root]';
      const logLevels = {
        'nolog': 0,
        'error': 1,
        'warning': 2,
        'important': 3,
        'info': 4,
        'debug': 5,
        'trace': 6
      };
      var outPutLog = '';
      function init(overrideLogLevel) {
        console.log(`Log level: ${overrideLogLevel}`);
        outPutLog = '';
        if (overrideLogLevel) {
          logLevel = overrideLogLevel;
        }
      }
      function testLog(text, status, color) {
        const fontColor = color ? color : status == successSymbol ? 'green' : status == failSymbol ? 'red' : '#583bb6';
        outPutLog += `\r\n<div style="color: ${fontColor}">${status ? status : ''}${text}</div>`;
      }
      var log = {
        debug: function (text) {
          const debugStatus = '--------- LOG.DEBUG --------- ';
          if (logLevels[logLevel] >= logLevels['debug']) {
            testLog(text, debugStatus, 'gray');
            console.log(` ${debugStatus} ${text}`);
          }
        },
        info: function (text) {
          const infoStatus = '--------- LOG.INFO --------- ';
          if (logLevels[logLevel] >= logLevels['info']) {
            testLog(text, infoStatus, '#583bb6');
            console.log(` ${infoStatus} ${text}`);
          }
        },
        important: function (text) {
          const infoStatus = '';
          if (logLevels[logLevel] >= logLevels['important']) {
            testLog(text, infoStatus, '#583bb6');
            console.log(` ${infoStatus} ${text}`);
          }
        },
        warn: function (text) {
          const errorStatus = '--------- LOG.WARNING --------- ';
          if (logLevels[logLevel] >= logLevels['warning']) {
            testLog(text, errorStatus, 'darkorange');
            console.log(` ${errorStatus} ${text}`);
          }
        },
        error: function (text) {
          const errorStatus = '--------- LOG.ERRROR --------- ';
          if (logLevels[logLevel] >= logLevels['error']) {
            testLog(text, errorStatus, 'red');
            console.log(` ${errorStatus} ${text}`);
          }
        }
      };
      exports.log = log;
      function it(desc, fn) {
        return test(desc, false, fn);
      }
      function warn(desc, fn) {
        return test(desc, true, fn);
      }
      function test(desc, optional, fn) {
        optional = optional ? optional : false;
        try {
          fn();
          testLog(desc, successSymbol);
          console.log('\x1b[32m%s\x1b[0m', successSymbol + desc);
          return {
            status: successStatus
          };
        } catch (error) {
          testLog(desc, optional ? warningSymbol : failSymbol, optional ? "darkorange" : "red");
          optional ? log.warn(error) : log.error(error);
          console.log('\n');
          console.log('\x1b[31m%s\x1b[0m', optional ? warningSymbol + desc : failSymbol + desc);
          console.error(error);
          return {
            status: optional ? warningStatus : failStatus
          };
        }
      }
      function assert(isTrue, desc) {
        if (!isTrue) {
          throw new Error(desc);
        }
      }
      function outputSuiteResult(desc, optional, status) {
        if (desc != testRoot) {
          testLog('_________________________________________________________');
          if (optional) {
            warn(`NABIR TESTIV '${desc}'`, () => {
              assert(status == successStatus, `Opcionalnyj nabir testiv '${desc}' provalyv perevirku'.`);
            });
          } else {
            if (status == warningStatus) {
              warn(`NABIR TESTIV '${desc}'`, () => {
                assert(false, `Nabir testiv '${desc}' provalyv perevirku.'.`);
              });
            } else {
              it(`NABIR TESTIV '${desc}'`, () => {
                assert(status == successStatus, `Nabir testiv '${desc}' provalyv perevirku.'.`);
              });
            }
          }
          testLog('\r\n');
        }
      }
      function runAll(optional, testPayload, name) {
        return testSuite(name ? name : testRoot, optional, testPayload, {});
      }
      function testSuite(desc, optional, testPayload, inherited) {
        optional = optional ? optional : false;
        if (!testPayload || testPayload.length == 0) {
          log.debug(JSON.stringify(testPayload, null, 2));
          log.warn(`Empty test payload for ${desc}`);
          return {
            status: warningStatus,
            outPutLog
          };
        }

        //if payload is suite of tests
        if (Array.isArray(testPayload)) {
          if (desc != testRoot) {
            testLog(`<h3>NABIR TESTIV '${desc}':</h3>`);
          }

          //run all subsuites/subtests
          var status = successStatus;
          for (var i = 0; i < testPayload.length; i++) {
            var testStatus = testSuite(testPayload[i].name, testPayload[i].optional, testPayload[i].testPayload, {
              fn: testPayload[i].fn ? testPayload[i].fn : testPayload.fn ? testPayload.fn : inherited.fn
            });
            if (testStatus.status == warningStatus && status != failStatus) {
              status = testStatus.status;
            }
            if (testStatus.status == failStatus) {
              status = testStatus.status;
            }
          }
          ;
          outputSuiteResult(desc, optional, status);
          return {
            status: optional ? status != failStatus : status,
            outPutLog
          };
        } else {
          if (typeof testPayload === 'object' && testPayload.input && testPayload.expected && (testPayload.fn || inherited.fn)) {
            const assertFn = testPayload.allRegisters ? _testAssertions.assertTestCaseAllRegisters : _testAssertions.assertTestCase;
            if (testPayload.off) {
              testLog(`\u26A0 ${desc}: skipped for the following reason: ${testPayload.off}`, '', 'darkorange');
              return {
                status: successStatus,
                outPutLog
              };
            }
            return test(desc, optional, testPayload.fn ? () => assertFn(testPayload.fn, testPayload) : inherited.fn ? () => assertFn(inherited.fn, testPayload) : assert(false, `No test function available`));
          } else {
            log.warn(`Malformed test payload for ${desc}`);
            log.debug(`Payload:\r\n${JSON.stringify(testPayload)}`);
            log.debug(`inherited.fn :\r\n${inherited.fn}`);
            return {
              status: warningStatus,
              outPutLog
            };
          }
        }
      }

    }, { "./testAssertions.js": 21 }]
  }, {}, [2])(2)
});
