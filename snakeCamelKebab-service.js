/**
 * @ngdoc service
 * @name times.snakeCamelKebab
 * @description
 * # snakeCamelKebab
 * An AngularJS service to convert strings to different cases.
 * 
 * Much of the replacement regex via {@link http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/}
 */
angular.module('times.snakeCamelKebab')
  .service('snakeCamelKebabService', function () {
    'use strict';
    
    return {
      /**
       * Detects which case a string is in
       * @param  {string} input The string to test.
       * @return {string}       Case of string or false if not snake, camel or kebab.
       */
      detectCase: function(input){
        switch(input) {
          case input.match(/(?:[A-Za-z0-9][a-z0-9]*[A-Z0-9][a-z0-9]*)*/):
            return 'camel';
          
          case input.match(/[A-Za-z0-9]+(?:\-[A-Za-z0-9]+)+/):
            return 'kebab';
          
          case input.match(/[A-Za-z0-9\_]+(?:\_[A-Za-z0-9]+)*/):
            return 'snake';
            
          default:
            return false;
        }
      },
      /**
       * Converts a string to snake_case
       * @param  {string} input Input string.
       * @return {string}       String in snake_case.
       */
      toSnake: function(input) {
        switch(this.detectCase(input)) {
          case 'camel':
            return input.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();});
            
          case 'kebab':
            return input.replace(/(\-[A-Za-z])/g, function($1){return $1.replace('-','_');});
            
          default:
            return input;
        }
      },
      /**
       * Converts a string to kebab-case
       * @param  {string} input Input string.
       * @return {string}       String in kebab-case.
       */
      toKebab: function(input) {
        switch(this.detectCase(input)) {
          case 'camel':
            return input.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
            
          case 'snake':
            return input.replace(/(\_[A-Za-z])/g, function($1){return $1.replace('_','-');});
            
          default:
            return input;
        }
      },
      /**
       * Converts a string to camelCase
       * @param  {string} input Input string.
       * @return {string}       String in camelCase.
       */
      toCamel: function(input) {
        switch(this.detectCase(input)) {
          case 'snake':
            return input.replace(/(\_[A-Za-z])/g, function($1){return $1.toUpperCase().replace('_','');});
            
          case 'kebab':
            return input.replace(/(\-[A-Za-z])/g, function($1){return $1.toUpperCase().replace('-','');});
            
          default:
            return input;
        }
      },
      /**
       * Alias for toKebab
       * @param  {string} input Input string.
       * @return {string}       String in kebab-case.
       */
      toDashed: function(input) {
        return this.toKebab(input);
      },
      /**
       * Alias for toSnake
       * @param  {string} input Input string.
       * @return {string}       String in snake_case.
       */
      toUnderscore: function(input) {
        return this.toSnake(input);
      }
    };
  });