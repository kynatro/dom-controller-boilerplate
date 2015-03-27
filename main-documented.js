/**
 * DOMController Boilerplate
 *
 * A basic boilerplate for controlling your page. This DOMController Object is intended
 * to provide structure to your event binds and basic page interaction. It is compatible
 * with dependency systems like RequireJS and CommonJS, but operates just fine
 * without them. While the DOMController Object is intended to operate as a singleton
 * Object, it is written in a manner that it could be instantiated multiple times.
 *
 * Copyright (c) 2015 Digital Telepathy (http://www.dtelepathy.com/)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

/**
 * Wrap our DOMController in an anonymous function to create a closure around our code.
 *
 * We start our file off with a semi-colon to ensure better compatibility with script
 * concatenation systems. Sometimes other JavaScript files don't close themselves off
 * properly and prevent things from concatenating right, so we force a close before
 * our code begins.
 * 
 * At the end of the file we pass in `jQuery`, `window`, and `null`, then in the actual
 * callee function in the first line of the code, we receive them as `$`, `window`, and
 * `undefined`.
 *
 * Why the conversion of `jQuery` to `$`, shouldn't it always be available as `$`?
 * -----------------------------------------------------------------------------------
 * No, not necessarily. If you're operating in an environment where jQuery is run in 
 * compatibility mode, the `$` variable won't be available to you and it'd be annoying
 * to have to type the word `jQuery` out anytime we wanted to use it, so we receive it
 * in this anonymous function as `$` to make our lives easy.
 *
 * Why `window`? 
 * -----------------------------------------------------------------------------------
 * This isn't entirely necessary, but this will give us the flexibility to specify a
 * specific window if we need to (such as in the case of an IFRAME served from the 
 * same domain that we can access)
 *
 * Why `null`?
 * -----------------------------------------------------------------------------------
 * Surprisingly enough, `undefined` in JavaScript can be re-defined, `null` however
 * cannot. We pass `null` in because `null` is always `null` and then we define it as
 * `undefined` within our closure so that any checks for `undefined` will act as the
 * language originally intends.
 */
;(function($, window, undefined) {
  /**
   * DOMController prototype Object
   *
   * The primary prototype Object for controlling your page. This Object is automatically
   * instantiated at the end of this file on DOMReady. It can optionally be passed a
   * "context" DOM element with which to operate in. If none is specified it just uses
   * `window.document`.
   *
   * @constructor
   * 
   * @param {Object}  context   DOM element to use as the context for binding events,
   *                            getting elements, etc.
   */
  var DOMController = function(context) {
    // If no context is defined, use `window.document` instead
    this.context = context || window.document;

    /*
     * jQuery selectors for elements on the page we're controlling. This Object is passed
     * to the _getElements() function where each selector is retrieved as jQuery extended
     * Objects and placed in the same structure in the `this.elements` Object. This allows
     * you to have access to selectors for use in binding events, or for accessing the
     * in memory jQuery object via the `this.elements` Object:
     *
     *  this.selectors.search.form   // returns "form.search"
     *  this.elements.search.form    // returns $('form.search')
     */
    this.selectors = {
      search: {
        form: 'form.search',
        submitButton: 'form.search input[type="submit"]'
      },
      modalLinks: 'a.modal'
    };

    /*
     * Get jQuery Objects for each selector and make them available in the same structure 
     * as the `this.selectors` Object
     */
    this.elements = this._getElements(this.selectors, this.context);
    
    // Bind DOM events
    this._bindEvents();
    // Setup third-party plugins
    this._bindVendors();

    // Return the Object instance for use later
    return this;
  };
  
  /**
   * Bind events to the DOM
   *
   * Bind events using the jQuery(element).on(event, selector, function) method. The primary
   * element bound here is the context of the Object instance (`window.document` by default).
   * The `this.selectors` Object is utilized to specify the specific elements to be bound to.
   * This method is used in order to accommodate binding to elements that may not yet exist
   * in the DOM (such as when they are added via an AJAX request) without having to re-bind
   * those elements after they have been added to the DOM.
   */
  DOMController.prototype._bindEvents = function() {
    /**
     * A reference to the instance of the DOMController Object is assigned to the `self` variable
     * in order to still make it accessible when the scope changes within an event callback
     * function where the `this` keyword refers to the element the event is fired from and not
     * the DOMController Object instance.
     */
    var self = this;

    /**
     * Bind events. Since jQuery.on() returns the element ($(this.context) here), subsequent
     * .on() calls can be chained to it. The result is the event callback itself bound to the
     * $(this.context) element and all the callbacks triggered on the elements which match the
     * selectors as the event bubbles up through the DOM.
     * 
     * See http://api.jquery.com/on/ for more information.
     */
    $(this.context)
    // Submit event on the form
    .on('submit', this.selectors.search.form, function(event){
      // Call to self.searchSubmit() will call the searchSubmit() method on the DOMController Object
      self.searchSubmit(event);
    })
    // Click event on a modal link
    .on('click', this.selectors.modalLinks, function(event){
      event.preventDefault();

      // Call to self.showModal() will call the showModal() method on the DOMController Object, passing
      // the element clicked - `this` - to the function.
      self.showModal(this);
    });
  };

  /**
   * Bind third-party vendor libraries and plugins.
   *
   * This function is intended to be a location to initialize third-party plugins like 
   * jQuery UI widgets instead of cluttering up the initialization function area at the
   * top of the file or confusing the contents of the _bindEvents() method (which is intended
   * only to house jQuery event binds). There may be a case where the initialization of a 
   * third-party library requires significantly additional code, at which point you should
   * abstract it to its own series of functions (or possibly file) and call its initiating
   * function from here.
   */
  DOMController.prototype._bindVendors = function() {
    // Bind other third-party libraries like jQuery UI here
  };

  /**
   * Get jQuery extended elements
   *
   * Iterates through an Object of selectors and retrieves the jQuery extended objects of 
   * those selectors. Returns an Object of jQuery extended elements in the same Object 
   * organization as the selectors passed in.
   *
   * @param {Object} selectors Object of selectors to retrieve and cache
   * @param {mixed} context jQuery extended Object, selector or DOM element to use as a context
   *
   * @return {Object} Object of jQuery extended elements
   */
  DOMController.prototype._getElements = function(selectors, context) {
    context = context || window.document;

    // Returns true if it is a DOM element    
    var isElement = function(o){
      return (
        typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
        o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
      );
    };

    // Get the element or, continue iterating over the Object
    var getElements = function(selector){
      // The `selector` is a string or DOM element, get it as a jQuery element
      if(typeof(selector) == "string" || isElement(selector)){
        return $(selector, context);
      }
      // The `selector` is an Object, build a new sub-Object and iterate over it
      else {
        var elements = {};

        for(var key in selector){
          elements[key] = getElements(selector[key]);
        }

        return elements;
      }
    };

    return getElements(selectors);
  };

  /**
   * Example callback function for the search submission bind
   *
   * This is an example callback function called by the callback function in the `submit`
   * event bind on the `this.selectors.search.form` element.
   * 
   * @param  {Object}   event   The jQuery Event object returned by the event callback
   */
  DOMController.prototype.searchSubmit = function(event) {
    // Do some stuff on the search submit
  };

  /**
   * Example callback function for the modal link click bind
   *
   * This is an example callback function called by the callback function in the `click`
   * event bind on the `this.selectors.modalLinks` elements.
   * 
   * @param  {Object}   el      The DOM element that the `click` event was triggered by
   */
  DOMController.prototype.showModal = function(el) {
    // Do some stuff with the `el` element
  };

  /**
   * Create a new instance of the DOMController to operate as a singleton (an Object 
   * which is only ever intended to be instantiated a single time). If you do not want
   * this Object to operate as a singleton (such as when using a dependency framework),
   * comment this out and rely on the prototype return of the module in the dependency
   * framework.
   */
  $(function(){
    new DOMController();
  });

  /**
   * Support for dependency injection frameworks such as CommonJS or RequireJS. Sets
   * up the contents of this file for operation as a module in those systems and then
   * returns the DOMController prototype for instantiation by other modules or manifests.
   */
  // CommonJS structure
  if(typeof module === "object" && module && typeof module.exports === "object") {
    module.exports = DOMController;
  } else {
    // AMD compatible structure (RequireJS)
    if(typeof define === "function" && define.amd) {
      define("dom_controller", [], function() { return DOMController; });
    }
  }
})(jQuery, window, null);
