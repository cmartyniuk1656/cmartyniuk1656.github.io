/**
 * Created by Chris on 09/04/2016.
 * Last updated 22/06/2016.
 **/

(function (window, undefined) {

    //Set document and location to current window for jChris utility

    var document = window.document,
        location = window.location;

    //Regex for detecting an index notator inside of a string
    var indexString = /(\[(\d)+])$/i;

    //jChris system utility logic is called from the jC class object. These functions are intended for
    //internal use only.

    var jChris = function (element, callback) {

        //These constructor calls are depreciated, still utilized by a few calls,
        //they will be removed in later builds.


        //TODO: REMOVE ARTIFACT JCRHIS SYSTEM CONSTRUCTOR CALLS AND UPDATE ASSOCIATED FUNCTIONS ---------------


        //Handle single element callback execution
        if (element.length == undefined) {
            return callback(element);
        }

        //Handle executing callback on multiple elements
        else {
            var length = element.length - 1;
            var currentIndex = 0;
            for (var i = length; i >= 0; i--) {

                jChris.system.execute(element, currentIndex, callback);
                currentIndex++;
            }
        }

        //TODO END: -------------------------------------------------------------------------------------------
    };


// ----------------------------------------------- SYSTEM FUNCTIONS ----------------------------------------------//

    jChris.system = {

        //It interprets a selector substring segment returning a node set to execute on.
        interpretSelector: function (selectorString) {

            var arrayIndex;

            switch (selectorString[0]) {

                //Checking for id '#' indentifier ----------------------------------------------------------------//
                case '#':
                    return document.getElementById(selectorString.replace('#', ''));


                //Checking for class '.' indentifier -------------------------------------------------------------//
                case '.':
                    selectorString = selectorString.replace(selectorString.substring(0, 1), '');

                    //If index is specified
                    if (selectorString.match(indexString)) {
                        arrayIndex = jChris.system.getIndex(selectorString);
                        return document.getElementsByClassName(selectorString.replace(indexString, ""))[arrayIndex];
                    }

                    //No index specified
                    return document.getElementsByClassName(selectorString);

                //Checking for tag "<>" indentifier --------------------------------------------------------------//
                case '<':
                    if (selectorString.lastIndexOf('>') == selectorString.length - 1) {
                        selectorString = selectorString.replace('<', '');
                        selectorString = selectorString.replace('>', '');

                        //If index is specified
                        if (selectorString.match(indexString)) {
                            arrayIndex = jChris.system.getIndex(selectorString);
                            return document.querySelectorAll(selectorString.replace(indexString, ""))[arrayIndex];

                        }

                        //No index specified
                        return document.querySelectorAll(selectorString);


                    }

                    //Failed to interpret the selector
                    else {
                        console.info('Get tag failed: Error in declaration: ' + selectorString);
                        return document.querySelectorAll(selectorString);
                    }

                case '[':
                    return document.querySelectorAll(selectorString);
            }

            return document.querySelectorAll(selectorString);
        },

        //TODO: REMOVE REDUNDANT EXECUTE CALL AND ASSOCIATED FUNCTIONS-----------------------------------------

        execute: function (element, i, callback) {
            return callback(element[i]);
        },

        //TODO END: ADD A DOCUMENT.READY FUNCTION FOR jC(FUNCTION())-------------------------------------------

        //Execute a function on multiple selectors, passed as a single string arg into the jC object.
        executeChained: function (multiSelector, callback) {

            var element;

            //If there are multiple selectors
            if (multiSelector.length > 1) {
                [].forEach.call(multiSelector, function(currentSelector) {

                    //Interpret the selector then execute callback on it
                    element = jChris.system.interpretSelector(currentSelector);
                    callback(element);

                });
            }

            //Fail safe incase one selector is passed to executeChained() function.
            else {

                element = jChris.system.interpretSelector(multiSelector[0]);
                callback(element);

            }
        },

        //Gets an index number from a selector string or substring segment.
        getIndex: function (selector) {
            var arrayIndex;
            arrayIndex = selector.substr(selector.indexOf('['));
            arrayIndex = arrayIndex.replace("[", "");
            arrayIndex = arrayIndex.replace("]", "");
            return parseInt(arrayIndex);

        },

        //TODO: MOVE ALL AJAX AND REQUEST FUNCTIONS INTO THE jC().ajax() OBJECT-----------------------------------------

        newElementContent: function (element, url, pushBrowserState, jChrisEvents) {

            function newElement(callback) {
                var httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function () {
                    if (httpRequest.readyState === 4) { // request is done
                        if (httpRequest.status === 200) { // successfully
                            callback(httpRequest.responseText); // we're calling our method
                        }
                    }
                };
                httpRequest.open('GET', url);

                httpRequest.send();
            }

            newElement(function (result) {
                element.innerHTML = result;
                jChris.initializeWidgets.zoomable();
                jC(element).removeClass('hiddenElement');

                //document.title = response.pageTitle;
                if (pushBrowserState !== false) {
                    window.history.pushState({"html": url.html, "pageTitle": element.pageTitle}, "", url.replace('.html', ''));
                    jChris.system.setLocation();
                    //window.history.replaceState({"html": 'index.html', "pageTitle": element.pageTitle}, "", url);
                    console.info('session item is ' + sessionStorage.getItem('jC.location'));
                }

                jChris.initializeWidgets.addWidgets();

                if (jC.defined(jChrisEvents)) {
                    setTimeout(function () {
                        return jChrisEvents();
                    }, 250);
                }
                else {
                    setTimeout(function () {
                        return jC.prepare(true);
                    }, 250);
                }

            });


        },

        insertHTML: function (element, url, key, pushBrowserState, jChrisEvents) {

            function domQuery(callback) {
                var httpRequest = new XMLHttpRequest();
                httpRequest.onreadystatechange = function () {
                    if (httpRequest.readyState === 4) { // request is done
                        if (httpRequest.status === 200) { // successfully
                            callback(httpRequest.responseText); // we're calling our method
                        }
                    }
                };
                httpRequest.open('GET', url);

                httpRequest.send();
            }


            domQuery(function (result) {
                var keyChain;

                if (key.includes('|')) {
                    keyChain = key.split('|');
                }
                else {
                    keyChain = key;
                }

                var DOMString = JSON.stringify(result);
                DOMString = jC.formatAjaxResponse(DOMString);

                if (typeof keyChain != 'string') {
                    var DOMStringChain = '';

                    [].forEach.call(keyChain, function (keySegment) {
                        var thisKey = keySegment.toString();
                        if (thisKey.includes('jC[')) {
                            console.info('syntax fouond');
                            DOMStringChain += jC.ajaxKeyHandler(thisKey);
                        }
                        else {
                            var segmentString =
                                DOMString.match(new RegExp('<!--' + thisKey + '-->(.*)<!--//' + thisKey + '-->')).pop();
                            DOMStringChain += (jC.formatAjaxResponse(segmentString));
                        }
                    });

                    element.innerHTML = DOMStringChain;
                    jChris.initializeWidgets.zoomable();

                }
                else {
                    DOMString = DOMString.match(new RegExp('<!--' + key + '-->(.*)<!--//' + key + '-->')).pop();
                    element.innerHTML = DOMString;
                }

                if (element.classList.contains('hiddenElement')) {
                    element.classList.remove('hiddenElement');
                }

                var title = url.split('.');
                var titleSplit2 = title[0].split('/');
                var titleString = titleSplit2[titleSplit2.length - 1];
                titleString[0].toUpperCase();
                document.title = ( jC.title + titleString);

                if (pushBrowserState == true) {
                    window.history.pushState({"html": url, "pageTitle": element.pageTitle}, "", url);
                    jChris.system.setLocation();
                    //window.history.replaceState({"html": 'index.html', "pageTitle": element.pageTitle}, "", url);
                }

                jChris.initializeWidgets.addWidgets();

                if (jC.defined(jChrisEvents)) {
                    setTimeout(function () {
                        return jChrisEvents();
                    }, 250);
                }
                else {
                    setTimeout(function () {
                        return jC.prepare(true);
                    }, 250);
                }
            });
        },


        //TODO END: MOVE ALL AJAX AND REQUEST FUNCTIONS INTO THE jC().ajax() OBJECT-------------------------------------

        //Finds an HTML Node object inside of an ajax HTML response by ID
        getIdNodeFromResponse: function(DOMString, id, tag) {

            var idFinder = 'id=' + '\'' + id + '\'';

            //Get the index of the ID inside of the response string
            var idLocation = DOMString.indexOf(idFinder);

            //If HTML is using double quotes on the ID instead of single quotes
            if (idLocation == -1) {
                idFinder = 'id=' + '"' + id + '"';
                idLocation = DOMString.indexOf(idFinder);
            }

            //Find the tag used by the ID and its first index in the response string
            this.startIndex = getStartingIndex();
            this.tag = getTag(this.startIndex);
            var startingTag = this.tag.replace('>', ' ');
            var closingTag = this.tag.replace('<', '</') + '>';

            //Isolate the search context by removing all data before first index of the desired element
            var searchContext = DOMString.substring(idLocation - startingTag.length - 3, DOMString.length);
            var resultString = searchContext.match(new RegExp(startingTag + '(.*)' + closingTag)).pop();

            var contextString = '';
            var openCount;
            var closeCount;
            var searchIteration = 0;


            //Find indices of all closing tags matching the tag type of the node we are trying to isolate
            var closingIndices = jC.getSubstringIndices(resultString, closingTag);

            //Isolate the desired node by comparing amount of relevant opening / closing tags existing in the search
            //context, and altering the the search context on each iteration until the correct amount is found.
            (function isolateSpecifiedContext() {

                contextString = setNewContext(closingIndices[searchIteration] + closingTag.length);
                openCount = countStringOccurences(contextString, startingTag);
                closeCount = countStringOccurences(contextString, closingTag);
                searchIteration++;

                if( openCount + 1 > closeCount && searchIteration != closingIndices.length) {
                    isolateSpecifiedContext();
                }


            })();

            //Set a new search context for further attempts to isolate desired Node
            function setNewContext(contextIndex) {

                return resultString.substring(0, contextIndex);

            }

            //Returns a count of string occurences in a string
            function countStringOccurences(testString, testSubstring) {

                var testExpression = new RegExp(testSubstring, 'g');

                return testString.match((testExpression) || []).length;

            }

            //Returns index of the beginning of a tag
            function getStartingIndex() {
                var counter = idLocation;

                for (var i = idLocation; i >=0; i--) {
                    if (DOMString[counter] === '<') {
                        i = -1;
                    }
                    else {
                        counter--;
                    }
                }
                return counter;

            }

            //Finds the tag type of the desired Node
            function getTag(startIndex) {

                if (typeof tag != 'undefined') {
                    return tag;
                }
                else {
                    var counter = startIndex;

                    for (var i = startIndex; i < idLocation; i++) {
                        if (DOMString[counter] === ' ') {
                            i = idLocation;
                        }
                        else {
                            counter++;
                        }
                    }

                    return DOMString.substring(startIndex, counter);
                }
            }

            return startingTag + contextString;

        },

        //Creates a location variable in local storage, usage will be implemented later for window history manipulation.
        setLocation: function () {

            var locationFinder = window.location.href.split('/');
            sessionStorage.setItem('jC.location', locationFinder[locationFinder.length - 1]);
        },

        getLocation: function () {

            var locationFinder = window.location.href.split('/');
            return locationFinder[locationFinder.length - 1];
        },

        //For data-attribute widget functionality.
        dataAttributeEventManager: function(thisElement, eventElement, dataType) {
            switch (dataType) {
                case 'src':
                {

                    if (thisElement != eventElement) {
                        if (thisElement.hasAttribute('data-unSelected')) {
                            thisElement.setAttribute('src',
                                thisElement.getAttribute('data-unSelected'))
                        }
                        else {
                            console.log('No unSelected data attribute found on: ' +
                                thisElement.valueOf())
                        }
                    }
                    else {
                        if (thisElement.hasAttribute('data-selected')) {
                            thisElement.setAttribute('src',
                                thisElement.getAttribute('data-selected'));
                        }
                        else {
                            console.log('No unSelected data attribute found on: ' +
                                thisElement.valueOf())
                        }
                    }
                    break;
                }
                default:
                {
                    console.log('Selectable element selectType data attribute could not be ' +
                        'interpreted.');
                }
            }



        },

        //Returns Nodes with a specified class or widget data-attribute, for system use.
        getDynamicClassElements: function(thisElement, classBaseString) {

            var counter = 0;
            var i = 0;

            for (i; i < 100; i++) {

                var classDefinition = classBaseString + counter;

                if (thisElement.classList.contains(classDefinition.replace('.', ''))) {
                    return document.querySelectorAll(classDefinition);
                }
            }

            console.log('Could not get dynamic class widget base class "' + classBaseString + '" index on: ' +
                thisElement);

        }

    };

    //jC object
    window.jC = (function() {

        //Declare jChris global variables

        var initSelector = '';  //String value of the initial jC() selector call.

        var jCResponse = '';    //For storing ajax response strings.


        var jC = function(selector) {

            // jChris Constructor
            return new jC.func.init(selector);

    };



    jC.func = jC.prototype = {

        constructor: jC,

        init: function (selector) {

            var arrayIndex;

            this.isStringSelector = true;

            //Runs on first jC call, not on subsequent chained calls.
            if (this.chainedCount == 0) {
                this.initSelector = selector;
                initSelector = this.initSelector;
            }

            this.chainedCount++;

            //If jC().defined evaluated to false on chained call, do not proceed with further chained operations.
            if (this.isDefined == false) {

                this.selector = null;
                return this;
            }


            //Check for null selectors
            if (!selector) {
                return this;
            }

            // Handle non-string HTML array object selectors
            if (selector.nodeType || HTMLCollection.prototype.isPrototypeOf(selector) ||
                NodeList.prototype.isPrototypeOf(selector) || HTMLElement.prototype.isPrototypeOf(selector)) {
                this.length = 1;
                this.selector = selector;
                this.isStringSelector = false;
                return this;
            }

                //Handle string args passed into in jC()
                if (typeof selector == 'string') {

                    //Check if multiple selectors were passed, separated by ', '
                    if (selector.indexOf(", ") > -1) {

                        this.multiSelector = selector.split(', ');
                        this.singleSelector = false;

                    }

                    else {
                        this.multiSelector = [selector];
                    }

                    this.length++;

                    //Locate the selector node from the current DOM
                    switch (selector[0]) {
                        //Checking for id '#' notator ----------------------------------------------------------------//
                        case '#':
                            this.selector = document.getElementById(selector.replace('#', ''));
                            this.length = 1;
                            break;



                        //Checking for class '.' Notator -------------------------------------------------------------//
                        case '.':
                            selector = selector.replace(selector.substring(0, 1), "");
                            if (selector.match(indexString)) {
                                arrayIndex = jChris.system.getIndex(selector);
                                this.selector =
                                    document.getElementsByClassName(selector.replace(indexString, ""))[arrayIndex];
                                this.length = 1;
                                break;


                            }
                            this.selector = document.getElementsByClassName(selector);
                            break;


                        //Checking for tag "<>" Notator --------------------------------------------------------------//
                        case '<':
                            if (selector.lastIndexOf('>') == selector.length - 1) {
                                selector = selector.replace('<', '');
                                selector = selector.replace('>', "");
                                if (selector.match(indexString)) {
                                    arrayIndex = jChris.system.getIndex(selector);
                                    this.selector = document.querySelectorAll(selector.replace(indexString, ""))[arrayIndex];
                                    this.length = 1;
                                    break;

                                }
                                this.selector = document.querySelectorAll(selector);
                                break;


                            }
                            else {
                                console.info('Get tag failed: Error in declaration: ' + selector);
                                this.selector = document.querySelectorAll(selector);
                                break;
                            }
                    }


                }
            else {

                    return this;

                }
            
            return this;

            //TODO: ADD A DOCUMENT.READY FUNCTION FOR jC(FUNCTION())-----------------------------------------------


            //TODO END: ADD A DOCUMENT.READY FUNCTION FOR jC(FUNCTION())-------------------------------------------

        },

        //Default jC() object variables on instantiation
        selector: "",

        initSelector: '',

        chainedCount: 0,

        isStringSelector: true,

        singleSelector: true,

        multiSelector: [],

        isDefined: true,

        length: 0,

        callback: '',

        //Returns a node object from the selector arg.
        ret: function() {

            return this.selector;

        },

        //Check if a selector has been defined, if false, subsequent chained calls will not fire.
        defined: function() {

            if (typeof this.selector == 'undefined' || this.selector == null) {
                    console.info('Selector was not defined.');
                    return false;
                }

            return this;

        },

        //TODO: REMOVE REDUNDANT NODE / ELEMENT TYPE CHECKS, REPLACE WITH 1 REUSEABLE CALL------------------------------

        //Add event handler to a Node object
        addEvent: function(type, func) {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {
                    try {
                        element.removeEventListener(type, func);
                    }
                    finally {
                        element.addEventListener(type, func);
                    }

                }

                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element)) {

                    [].forEach.call(element, function (currentElement) {

                        try {
                            currentElement.removeEventListener(type, func);
                        }
                        finally {
                            currentElement.addEventListener(type, func);
                        }
                    });
                }
            }


            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

            return this;

        },

        //Remove event handler
        removeEvent: function(type, func) {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {
                    element.removeEventListener(type, func);
                }

                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element)) {

                    [].forEach.call(element, function (currentElement) {

                        currentElement.removeEventListener(type, func);

                    });
                }

                else {
                    element.removeEventListener(type, func);
                }
            }


            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

            return this();

        },

        //Add a click event to the selector node.
        click: function(func) {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {
                    try {
                        element.removeEventListener('click', func);
                    }
                    finally {
                        element.addEventListener('click', func);
                    }
                }

                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element)) {
                    [].forEach.call(element, function (currentElement) {

                        try {
                            currentElement.removeEventListener('click', func);
                        }
                        finally {
                            currentElement.addEventListener('click', func);
                        }
                    });
                }
            }


            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }


            return this;

        },

        //Add mouseover event to the selector
        mouseOver: function(func) {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {
                    try {
                        element.removeEventListener('mouseover', func);
                    }
                    finally {
                        element.addEventListener('mouseover', func);
                    }
                }

                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element)) {
                    [].forEach.call(element, function (currentElement) {

                        try {
                            currentElement.removeEventListener('mouseover', func);
                        }
                        finally {
                            currentElement.addEventListener('mouseover', func);
                        }
                    });
                }
            }


            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

            return this;

        },

        //Add mouseout event tot he selector
        mouseOut: function(func) {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {
                    try {
                        element.removeEventListener('mouseout', func);
                    }
                    finally {
                        element.addEventListener('mouseout', func);
                    }
                }
                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element)) {
                    [].forEach.call(element, function (currentElement) {

                        try {
                            currentElement.removeEventListener('mouseout', func);
                        }
                        finally {
                            currentElement.addEventListener('mouseout', func);
                        }
                    });
                }
            }


            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

            return this;

        },

        //Add a CSS class to the selector
        addClass: function(className) {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {

                    try { element.classList.add(className); }
                    catch(e) { console.log(e); }

                }
                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element)){
                    [].forEach.call(element, function (currentElement) {

                        try { currentElement.classList.add(className); }
                        catch(e) { console.log(e); }

                    });
                }
                else if (Array.prototype.isPrototypeOf(element)) {
                    for (var i = 0; i < element.length; i++) {
                        try { element[i].classList.add(className); }
                        catch(e) { console.log(e); }
                    }
                }

            }

            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

            return this;

        },

        //Remove a CSS class from the selector
        removeClass: function(className) {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {

                    try { element.classList.remove(className); }
                    catch(e) { console.log(e); }

                }
                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element)) {
                    [].forEach.call(element, function (currentElement) {

                        try { currentElement.classList.remove(className); }
                        catch(e) { console.log(e); }

                    });
                }

            }


            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

            return this;

        },

        //Check if the selector node / nodes has a CSS class
        hasClass: function(className) {

            var element = this.selector;

                if (!element.classList.contains(className)) {
                    console.info('Could not define element class existence : ' + element + 'className');
                    return false;
                }

            return this;

        },

        setAttribute: function (attribute, value) {

        this.selector.setAttribute(attribute, value);

    },

        //Set the cursur to change into a pointer when mousing over the selector node / nodes
        pointer: function() {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {

                    element.style.cursor = 'pointer';

                }

                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element)) {
                    [].forEach.call(element, function (currentElement) {

                        currentElement.style.cursor = 'pointer';

                    });
                }
            }

            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

            return this;

        },

        //Fade in the selector node / nodes using jChris Animation CSS
        fadeIn: function () {

            var multiSelector;

            function chainedFunc(element) {

                element.classList.remove('noOpacity');
                element.classList.remove('fadeHalf');
                element.classList.add('fullOpacity');
                element.style.transition = 'all 2s';
            }

            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

            return this;
        },

        //Fade out the selector node / nodes using jChris Animaition CSS
        fadeOut: function () {

            var multiSelector;

            function chainedFunc(element) {

                element.classList.add('transFade');
                element.style.transition = 'all 2s';

            }

            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

            return this;

        },

        //Fade out the selector node / nodes to 50% visibility using jChris transition CSS
        halfFadeTransisiton: function() {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {

                    element.classList.remove('fullOpacity');
                    element.classList.add('fadeHalf');
                    element.style.transition = 'all 2s';

                }

                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element)) {
                    [].forEach.call(element, function (currentElement) {

                        currentElement.classList.remove('fullOpacity');
                        currentElement.classList.add('fadeHalf');
                        currentElement.style.transition = 'all 2s';

                    });
                }

            }

            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

        },

        //Fade in selector using jChris transition CSS
        fadeInTrans: function() {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {

                    element.classList.remove('noOpacity');
                    element.classList.remove('fadeHalf');
                    element.classList.add('fullOpacity');
                    element.style.transition = 'all 2s';

                }

                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element)) {
                    [].forEach.call(element, function (currentElement) {

                        currentElement.classList.remove('noOpacity');
                        currentElement.classList.remove('fadeHalf');
                        currentElement.classList.add('fullOpacity');
                        currentElement.style.transition = 'all 2s';

                    });
                }

            }

            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }


        },

        //Hide nodes / a node from the DOM view
        hide: function() {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {
                    element.style.display = 'none';
                }

                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element) ||
                    Array.prototype.isPrototypeOf(element)) {
                    [].forEach.call(element, function (currentElement) {
                        currentElement.style.display = 'none';
                    });
                }

            }

            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

            return this;

        },

        //Show a hidden element / elements that were hidden with jC().hide()
        showElement: function() {

            var multiSelector;

            function chainedFunc(element) {

                if (HTMLElement.prototype.isPrototypeOf(element)) {
                    element.style.display = 'none';
                }

                else if (NodeList.prototype.isPrototypeOf(element) || HTMLCollection.prototype.isPrototypeOf(element)) {
                    [].forEach.call(element, function (currentElement) {
                        currentElement.style.display = 'none';
                    });
                }
                element.style.display = 'block';

            }

            if (this.isStringSelector && !this.singleSelector) {
                multiSelector = this.multiSelector;
                jChris.system.executeChained(multiSelector, chainedFunc);
            }
            else {
                chainedFunc(this.selector);
            }

            return this;

        },

        //Set the background of a selector
        backgroundImg: function (url) {
            var selectedElement = this.selector;

            selectedElement.style.backgroundImage = url;
            selectedElement.style.mozBackgroundImage = url;
            selectedElement.style.webkitBackgroundImage = url;
            selectedElement.style.webkitBackgroundImage = url;

        },

        //TODO END: REMOVE REDUNDANT NODE / ELEMENT TYPE CHECKS, REPLACE WITH 1 REUSEABLE CALL--------------------------

        //TODO: MOVE ALL AJAX AND REQUEST FUNCTIONS INTO THE jC().ajax() OBJECT-----------------------------------------
// ----------------------------------------------- AJAX MODIFY DOM ---------------------------------------------------//

        ajaxHtml: function (url, key, pushBrowserState, jChrisEvents) {

            var element = this.selector;
            jChrisEvents = jC.eventKeyHandler(jChrisEvents);
            jChris.system.insertHTML(element, url, key, pushBrowserState, jChrisEvents);

        },

        requestHTML:  function (url, pushBrowserState, jChrisEvents) {
            jChrisEvents = jC.eventKeyHandler(jChrisEvents);
            var element = this.selector;
            jChris.system.newElementContent(element, url, pushBrowserState, jChrisEvents);
        },
// ----------------------------------------------- jCHRIS TRANSITIONS ------------------------------------------------//

        /*
         *  --------- FADE OUT TRANSITION TEMPLATE ----------
         *
         *  Fade Transition interacts with transition classes.
         *  To define transition elements give them class transitionX where
         *  X is any number beteen 1 - 1000. The transition function will execute
         *  the transition effects in ascending order to the transition classes.
         *
         *  //(REQUIRED ELEMENT) - a transoverlay element is required for
         *                         fadeout(should cover content you wish to change).
         *
         *  //(OPTIONAL PARAM) BackgroundImage - Changes the background on #background element
         *  //(OPTIONAL PARAM) newEventHandlerFunction -  Will add new event handlers to new content
         *
         */
        fadeTransition: function (urlKey, fadeInTimer, backgroundImage, newEventHandlerFunction) {

            var containerElement = this.selector;
            var transOverlay = jC('#transOverlay');
            var counter = 1;
            var key = null;
            var url = urlKey;

            if (!jC(newEventHandlerFunction).defined()) {
                newEventHandlerFunction = function() {
                    jC.prepare(true);
                }
            }


            if (urlKey.toString().includes(', ')) {
                var urlInfo = urlKey.split(', ');
                url = urlInfo[0];
                key = urlInfo[1];
            }
            else {
                console.log('No jC transition Node identifier key found.');
            }

            if(jC('#transOverlay').defined()) {
                jC('#transOverlay').addClass('transOverlay-On');
            }
            else {

            }

            setTimeout(function () {
                var currentElement = containerElement;

                jC(currentElement).addClass('hiddenElement');
                if (key == null) {
                    jC(currentElement).requestHTML(url, true, newEventHandlerFunction);
                }
                else {
                    jC(currentElement).ajaxHtml(url, key, true, newEventHandlerFunction);
                }
            }, fadeInTimer - 250);

            //If 'random' was passed, it will select a random background from the jC.bgs global array.
            if (backgroundImage === 'random') {
                setTimeout(function () {
                    jC('#background').backgroundImg(jC.randomBg());
                }, fadeInTimer);
            }
            else if (document.getElementById('background').style.length == 0) {
                jC('#background').backgroundImg(jC.randomBg());
            }


            var callTransitions = function () {

                var transitionLength = getTransitionLength();
                jChris.initializeWidgets.zoomable();

                function getTransitionLength() {
                    for (var i = 0; i < 1000; i++) {
                        var elements = document.querySelectorAll('.transition' + counter);
                        if (elements.length == 0) {
                            i = 1000;
                        }
                        else {
                            counter++;
                        }
                    }
                    return counter;
                }

                function transitionLoop() {
                    var elements = document.querySelectorAll('.transition' + counter);
                    var newTrans = function () {
                        [].forEach.call(elements, function (element) {
                            element.style.transition = 'all 1s';
                            if (element.classList.contains('not-visible')) {
                                element.classList.remove('not-visible');
                            }
                        });
                        return this;
                    };
                    setTimeout(function () {
                        newTrans();
                        counter++;
                        if (counter < transitionLength) {
                            transitionLoop();
                        }
                    }, 300)
                }

                counter = 1;
                transitionLoop();
            };


            var executionFunction = function () {
                setTimeout(function () {
                    callTransitions()
                }, 250);
                return this;
            };
            setTimeout(function () {
                jC('#transOverlay').removeClass('transOverlay-On');
            }, fadeInTimer);
            setTimeout(function () {
                executionFunction();
            }, fadeInTimer + 400);
        }

    };

        //TODO END: MOVE ALL AJAX AND REQUEST FUNCTIONS INTO THE jC().ajax() OBJECT-------------------------------------

        jC.func.init.prototype = jC.func;

        jC.ajax = jC.func.ajax = function(requestData) {
            return new jC.ajax.func.init(requestData);
        };

        jC.ajax.func = jC.ajax.prototype = {

            //Default request object parameters
            requestData: {

                url: '',

                customEvents: undefined,

                requestCall: {},

                instanciated: false,

                targetSelector: '',

                // Default works on IE7+, Firefox, Chrome, Opera, Safari
                requestType: function() {
                    return new XMLHttpRequest();
                }

            },

            init: function(selector) {

                //Handle requestData object on first call
                if (!this.requestData.instanciated) {

                    this.requestData.instanciated = true;

                    // Should work for IE6, IE5 if XMLHttpRequest function doesn't exist
                    if (!window.XMLHttpRequest) {
                        this.requestData.requestType = function () {
                            return new ActiveXObject("Microsoft.XMLHTTP");
                        };

                    }

                    //If only a string was passed, assume it is the URL
                    if(typeof selector === 'string') {
                        this.requestData.url = selector;
                    }

                    //Optional parameters were passed
                    else if(typeof selector === 'object') {

                        //Set defaults and custom settings for request object
                        if (selector.customEvents) {
                            this.requestData.customEvents = selector.customEvents;
                        }

                        //Store the url
                        if (selector.url) {
                            this.requestData.url = selector.url;
                        }

                        //Check for custom request call
                        if (selector.requestCall) {
                            this.requestData.requestCall = selector.requestCall;
                        }

                    }

                    //Set target placement selector from initial jC chained call
                    this.selector = jC(initSelector).ret();
                    this.requestData.targetSelector = this.selector;

                    this.requestCall = function(requestData, callback) {

                        var httpRequest = requestData.requestType();
                        httpRequest.onreadystatechange = function () {
                            if (httpRequest.readyState === 4) { // request is complete
                                if (httpRequest.status === 200) { // response received
                                    callback(httpRequest.responseText); // call the callback function
                                }
                            }
                        };
                        httpRequest.open('GET', requestData.url);

                        httpRequest.send();
                    };

                }

                return this;

            },

            replaceById: function(selector) {

                this.ajaxSelector = selector;

                this.requestCall(this.requestData, function(result) {
                    var target = jC(initSelector).ret();
                    var responseString = JSON.stringify(result);
                    var DOMString = jC.formatAjaxResponse(responseString);

                    jCResponse = jChris.system.getIdNodeFromResponse(DOMString, 'qaProjects');
                    target.innerHTML = jCResponse;
                    jChris.initializeWidgets.zoomable();
                });

                return this;

            },

            insertById: function(selector) {

                this.ajaxSelector = selector;

                this.requestCall(this.requestData, function (result) {
                    var target = jC(initSelector).ret();
                    var responseString = JSON.stringify(result);
                    var DOMString = jC.formatAjaxResponse(responseString);

                    jCResponse = jChris.system.getIdNodeFromResponse(DOMString, 'qaProjects');
                    target.innerHTML += jCResponse;
                    jChris.initializeWidgets.zoomable();
                });

                return this;

            },

            //Default ajax params on initialization
            selector: '',
            ajaxSelector: '',
            customEvents: [],
            requestCall: null


        };

        jC.ajax.func.init.prototype = jC.ajax.func;

        jC.ajax.prototype = jC.func;


        return jC;

    })();



// ------------------------------------------------ jChris AJAX UTILITY ----------------------------------------------//

        //Format response string into valid HTML
        jC.formatAjaxResponse = function (input) {
            return input.replace(/\\'/g, "'")
                .replace(/\\r/g, "")
                .replace(/\\n/g, "")
                .replace(/\\"/g, "'");

        };

        //Depreciated, will be removed
        jC.ajaxKeyHandler = function (inputString) {
            var syntaxKey = inputString.replace('jC[', '').replace(']', '');
            var output;

            if (syntaxKey.includes('id=')) {
                syntaxKey = syntaxKey.replace('id=', '');
                output = "<div id='" + syntaxKey + "'>";
            }
            else if (syntaxKey.includes('/')) {
                output = "</div>";
            }

            return output;
        };

        //Global event handler storage for when previously dynamicly generated events when they are added to the DOM
        //more than once.
        jC.ajaxEventHandler = function(id, func) {

            jC.ajaxEvents[id] = func;

        };

        //Return the callback event handler stored in the jC.ajaxEvetnts object using the associative array key value
        jC.eventKeyHandler = function(key) {

            var eventCallback = key;

            if (typeof eventCallback == 'string') {
                eventCallback = jC.ajaxEvents[key];
            }
            return eventCallback;

        };





// ------------------------------------------------ jChris MISC UTILITY ----------------------------------------------//

    //Checks if a value is defined
    jC.defined = function (testObject) {

        var result = false;

        if (typeof testObject != 'undefined' && testObject != null) {
            result = true;
        }

        return result;

    };

    //For use with media viewing widgets
    jC.setVideoSrc = function (videoElement, type, src) {

        videoElement.setAttribute('type', type);
        videoElement.setAttribute('src', src);
    };

    //For use with selection group widgets
    jC.changeSelected = function (element, selectedNodes) {

        jC.removeClass(selectedNodes, 'selected');
        element.classList.add('selected');
    };

    jC.indexedSelectionToggle = function (element, selectedNodes, classIndexId) {

        jC((selectedNodes + classIndexId)).removeClass('selected');
        jC(element).addClass('selected');
    };

    //Create a hash key value form a string
    jC.createHashKey = function(elementObject, functionObject) {

        var concatString = elementObject + functionObject;


        var hash = 0, i, chr, len;

        if (concatString.length === 0) {
            return hash;
        }

        else {
            for (i = 0, len = concatString.length; i < len; i++) {
                chr   = concatString.charCodeAt(i);
                hash  = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
        }

        return hash;
    };

    //Retun a root path variable
    jC.rootPath = function() {

        var path = document.location.pathname.split('/');
        var rootPath = [];

        [].forEach.call(path, function(segment) {
            if (!segment.includes('.html') && segment != '') {
                rootPath += '/' + segment;
            }
        });
        return rootPath;

    };

    //Find all indices of a substring
    jC.getSubstringIndices = function(newContextString, substring) {
        var indexes = [], i = -1;
        while ((i = newContextString.indexOf(substring, i+1)) != -1){
            indexes.push(i);
        }
        return indexes;
    };

    //Remove all transition effects from the DOM
    jC.removeTransitionEffects = function () {
        var transitionLength = getTransitionLength();
        var counter = 1;

        function getTransitionLength() {
            for (var i = 0; i < 1000; i++) {
                var elements = document.querySelectorAll('.transition' + counter);
                if (elements.length == 0) {
                    i = 1000;
                }
                else {
                    counter++;
                }
            }
            return counter;
        }

        function transitionLoop() {
            var elements = document.querySelectorAll('.transition' + counter);
            var newTrans = function () {
                [].forEach.call(elements, function (element) {
                    element.style.transition = 'all 1s';
                    if (element.classList.contains('not-visible')) {
                        element.classList.remove('not-visible');
                    }
                });
                return this;
            };
            setTimeout(function () {
                newTrans();
                counter++;
                if (counter < transitionLength) {
                    transitionLoop();
                }
                else if ((counter === transitionLength)) {
                    //prepareEventHandlers(window.location.href);
                }
            }, 300)
        }

        counter = 1;
        transitionLoop();

    };


// ---------------------------------------------- jChris GLOBAL VARIABLES --------------------------------------------//

    jC.prepared = false;
    jC.bgs = [];
    jC.eventWatch = [];
    jC.ajaxEvents = [];
    jC.location = window.location.href;
    jC.activeWidgets = [];

    jC.resetEventWatch = function() {

    };

    //Define in custom Java script
    if (!jC.defined(jC.title)) {
        jC.title = '';
    }

// ---------------------------------------------- EVENT HANDLER FUNCTIONS --------------------------------------------//

    jC.randomBg = function () {
        var arrayLength = jC.bgs.length;
        return jC.bgs[Math.floor((Math.random() * arrayLength))];

    };

// ------------------------------------ CSS CLASS & NODE ATTRIBUTE MOD FUNCTIONS -------------------------------------//

    jC.hasClass = function (element, className) {

        return (' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1;

    };

    //Create a selection group in javaScript
    jC.selectionGroup = function(elements) {

        var counter = 0;
        var i = 0;
        var selectorIteration;

        for (i; i < 500; i++) {

            var checkVar = document.querySelectorAll('.jC-selectable' + counter);

            if (checkVar.length == 0) {
                selectorIteration = counter;
                i = 500;
            }
            else {
                counter++;
            }
        }

        [].forEach.call(elements, function (element) {

            jC(element).addClass('jC-selectable' + selectorIteration);

        });

        [].forEach.call(elements, function (element) {

            jC(element).addClass('jC-selectable' + selectorIteration);

            jC(element).click(function() {

                var elementClicked = this;

                if (!this.classList.contains('selected'))
                {

                    var checkVars = jChris.system.getDynamicClassElements(this, '.jC-selectable');

                    [].forEach.call(checkVars, function (currentElement) {

                        if(currentElement != elementClicked) {
                            if(currentElement.classList.contains("selected"))
                                currentElement.classList.remove('selected');
                        }
                        else {
                            currentElement.classList.add('selected');
                        }

                        if(currentElement.hasAttribute('data-selectType')) {
                            var dataType = currentElement.getAttribute('data-selectType');

                            jChris.system.dataAttributeEventManager(currentElement, elementClicked, dataType);
                        }
                    });
                }
            })
            .pointer();
        });

    };


// ---------------------------------------------- CSS STYLE MOD FUNCTIONS --------------------------------------------//

// Dedicated functions for commonly changed styles.


    jC.hasBgImage = function(element) {

        var hasBg = true;

        element = jC(element);
        if  (typeof element.style.backgroundImage == 'undefined') {
            hasBg =  false;
        }
        return hasBg;

    };

    jC.addPointer = function (element) {
        element = jC(element);
        element.style.cursor = "pointer";
    };

//Changes image when moused over, Starting image optional
    jC.mouseOverImg = function (element, imageChangeUrl, startingImageUrl) {

        function changeImage(element) {
            element.src = imageChangeUrl;
        }

        function changeBack(element) {
            element.src = startingImageUrl;
        }

        jC(element).addEvent('mouseOver', changeImage);

        if (typeof startingImageUrl != 'undefined') {
            element.addEventListener('mouseover', changeBack);
        }

    };


// -------------------------------------------------------- WIDGETS --------------------------------------------------//

    //TODO: CHANGE ALL WIDGETS THAT USE CLASS ATTRIBUTES TO DATA-ATTRIBUTES---------------------------------------------

    //Handles jC widget data-attribute classes
    jChris.widgetHandler = {

        update: function(widgetAttributeName)   {

            var widgetTypeSelector = 'data-jc-' + widgetAttributeName;

            console.info('Scanning for ' + widgetTypeSelector + ' WIDGETS.');
            var widgetGroups = document.querySelectorAll('[' + widgetTypeSelector + ']');

            if (widgetGroups.length > 0) {

                var groupNames = [];
                var newWidgets = [];
                console.info(widgetGroups);
                [].forEach.call(widgetGroups, function (group) {

                    groupNames.push(group.getAttribute(widgetTypeSelector));

                });

                console.info(groupNames);


                [].forEach.call(groupNames, function (groupName) {

                    if (jC.activeWidgets.indexOf(groupName) == -1)

                        jC.activeWidgets.push(groupName);
                    newWidgets.push(groupName);

                });

                [].forEach.call(jC.activeWidgets, function (activeWidgetGroup) {

                    if (groupNames.indexOf(activeWidgetGroup) == -1)

                        jC.activeWidgets.splice(activeWidgetGroup, 1);

                });
            }
            console.info('Active widgets: ' + jC.activeWidgets);
            return newWidgets;
        }


    };

    jChris.widget = function(name, type) {

        return new jChris.widget.builder.init(name, type);

    };

    jChris.widget.builder = jChris.widget.prototype = {

        init: function(name, type) {
            this.name = name;
            this.type = type;
            this.elementSelector = '[data-jc-' + this.type + '="' + this.name + '"]';
            this.element = document.querySelector(this.elementSelector);

            return this;

        },

        selectGroup: function() {

            var selectorNodes = this.element.querySelectorAll('[data-jc-selector]');
            var selectType = this.element.getAttribute('data-jc-selectType');
            var clickEvent;

            switch (selectType) {

                case 'expandable': {
                    clickEvent = function(e) {
                        var selectors = this.querySelectorAll('[data-jc-selector]');
                        var maxSelectors = selectors.length;
                        var counter = 0;


                        console.info(e.target);
                        for (var i = 0; i < maxSelectors; i++) {
                            console.info(e.target);
                            if (e.target == selectors[counter]) {

                                var element = selectors[counter];

                                if (!element.classList.contains('selected')) {

                                    [].forEach.call(selectors, function(selector) {
                                        selector.classList.remove('selected');
                                        selector.setAttribute('src', selector.getAttribute('data-jc-unselected'));
                                        jC(selector.getAttribute('data-jc-selector'))
                                            .removeClass('jC-expanded')
                                            .addClass('jC-collapse');
                                    });
                                    element.classList.add('selected');
                                    setTimeout(function () {
                                        jC(element.getAttribute('data-jc-selector'))
                                            .removeClass('jC-collapse')
                                            .addClass('jC-expanded');
                                    }, 1000);
                                    element.setAttribute('src', element.getAttribute('data-jc-selected'));
                                    counter = maxSelectors;
                                }
                            }
                            counter++;
                        }
                        e.stopPropagation();
                    };

                    break;
                }

            }

            this.element.addEventListener('click', clickEvent, false);
            jC(selectorNodes)
                .mouseOver(function() {
                  if (!this.classList.contains('selected')) {
                      this.setAttribute('src', this.getAttribute('data-jc-selected'));
                  }
                })
                .mouseOut(function() {
                    if (!this.classList.contains('selected')) {
                        this.setAttribute('src', this.getAttribute('data-jc-unselected'));
                    }
                })
                .pointer();

            return this;

        },

        //navbar: function() {
        //
        //    var navbarNodes = this.element.querySelectorAll('[data-jc-navbar]');
        //
        //},


        name: '',
        type: '',
        elementSelector: ''


    };

    jChris.widget.builder.init.prototype = jChris.widget.builder;

    jChris.initializeWidgets = {

        addWidgets: function() {
            this.selectGroupWidget();
            //this.navbarWidget();
        },

        selectGroupWidget: function() {

            var widgetType = 'selectGroup';

            var newSelectGroups = jChris.widgetHandler.update(widgetType);

            if(typeof newSelectGroups != 'undefined') {

                [].forEach.call(newSelectGroups, function(currentGroup) {

                    jChris.widget(currentGroup, widgetType).selectGroup();

                });
            }
        },

        navbarWidget: function() {

            var widgetType = 'navbar';

            var newNavbars = jChris.widgetHandler.update(widgetType);

            if(typeof newNavbars != 'undefined') {

                [].forEach.call(newNavbars, function(currentGroup) {

                    //jChris.widget(currentGroup, widgetType).navbar();

                });

            }




        },

        navSelectionManager: function (element) {

            var navElements = document.querySelectorAll('.jC-navtop a');
            var selected = document.querySelectorAll('.jC-navtop .selected');

            //If no element is passed (should run on jC.prepare), set first link to selected
            if (!jC.defined(element) && navElements.length > 0) {
                if (selected.length === 0) {
                    navElements[0].classList.add('selected');
                }
                addListeners();
            }
            else {
                addListeners();
            }

            function addListeners() {
                [].forEach.call(navElements, function (link) {
                    link.addEventListener('click', function () {
                        changeSelection(this);
                    })
                });
            }

            function changeSelection(element) {
                [].forEach.call(navElements, function (navElement) {
                    navElement.classList.remove('selected');
                });
                element.classList.add('selected');
            }


        },

        zoomable: function() {

            var selectorNodes = document.querySelectorAll('[data-jc-zoomable]');


            if(selectorNodes.length != 0) {
                if (sessionStorage.getItem('jC.zoom') != null) {
                    [].forEach.call(selectorNodes, function(selector) {
                        selector.style.zoom = sessionStorage.getItem('jC.zoom');
                    });
                }
            }

        },

        mediaSwapperWidget: function (auto) {

            var selectDefault = false;

            if (jC.defined(auto)) {
                selectDefault = true;
            }


            var mediaSwapperElements = document.querySelectorAll('.jC-mediaSwapper');
            var swapperDivs = mediaSwapperElements.length;

            if (swapperDivs > 0) {

                var counter = 0;
                var linkCounter = 0;
                var vidLinks = document.querySelectorAll('.jC-vidLink');
                var imgLinks = document.querySelectorAll('.jC-imgLink');
                var videoPlayers = document.querySelectorAll('.jC-mediaSwapper .jC-media-display video');
                var imageViewers = document.querySelectorAll('.jC-mediaSwapper .jC-media-display img');

                [].forEach.call(mediaSwapperElements, function (mediaSwapper) {        //Run on each mediaSwapper Founnd

                    var defaultSet = false;
                    var defaultType;
                    var thisPlayer;
                    var defaultMedia;

                    jC(mediaSwapper).addClass('jC-swapper' + counter);                //Add indexed classes to serialize
                                                                                      //swapper elements

                    [].forEach.call(videoPlayers, function (player) {
                        if (mediaSwapper.contains(player)) {
                            jC(player).addClass('jC-swapperPlayer' + counter)
                        }
                    });

                    [].forEach.call(imageViewers, function (viewer) {
                        if (mediaSwapper.contains(viewer)) {
                            jC(viewer).addClass( 'jC-swapperViewer' + counter)
                        }
                    });

                    if (imgLinks.length > 0) {

                        [].forEach.call(imgLinks, function (img) {

                            if (vidLinks.length == 0) {
                                if (selectDefault && !defaultSet) {
                                    jC(img).addClass('selected');      //Select first element default if ran on load
                                    defaultMedia = img;
                                    defaultSet = true;
                                    defaultType = 'image';
                                }
                            }


                            if (mediaSwapper.contains(img)) {



                                jC(img).addClass('jC-swapperImg' + counter);

                                img.addEventListener('click', function () {

                                    var swapCounter = 0;
                                    for (var i = 0; i < 1000; i++) {

                                        var thisClass = 'jC-swapperImg' + swapCounter;
                                        var swapImgList = document.querySelectorAll(('.jC-swapperImg' + swapCounter));
                                        var swapVidList = document.querySelectorAll(('.jC-swapperVid' + swapCounter) + ' img');
                                        var player = document.querySelector('.jC-swapperPlayer' + swapCounter);
                                        var viewer = document.querySelector('.jC-swapperViewer' + swapCounter);

                                        if (swapImgList.length != 0) {

                                            if (this.classList.contains(thisClass)) {

                                                if (jC.defined(player)) {
                                                    jC(player).addClass('hiddenElement');
                                                }
                                                if (jC.defined(viewer)) {
                                                    jC(viewer).removeClass('hiddenElement');
                                                }
                                                jC(viewer).setAttribute('src', this.getAttribute('src'));
                                                jC(swapImgList).removeClass('selected');
                                                jC(swapVidList).removeClass('selected');
                                                this.classList.add('selected');
                                            }
                                        }
                                        else {
                                            i = 1000;
                                        }
                                        swapCounter++;
                                    }
                                })
                            }
                        })
                    }
                    if (vidLinks.length > 0) {                    //Only run if there are video links in the swapper
                        [].forEach.call(vidLinks, function (link) {

                            if (mediaSwapper.contains(link)) {           //If this link belongs to this mediaSwapper Div

                                if (selectDefault && !defaultSet) {
                                    jC(link).addClass('selected');         //Select first element default if ran on load
                                    defaultMedia = link;
                                    defaultSet = true;
                                    defaultType = 'video';
                                }

                                jC(link).addClass('jC-swapperVid' + counter);

                                link.addEventListener('click', function () {

                                    var src;
                                    var type;
                                    var swapCounter = 0;
                                    var error = '';

                                    for (var i = 0; i < 1000; i++) {

                                        var swapVidList = document.querySelectorAll('.jC-swapperVid' + swapCounter);
                                        var swapVidThumbList = document.querySelectorAll(('.jC-swapperVid' +
                                            swapCounter) + ' img');
                                        var swapImgList = document.querySelectorAll(('.jC-swapperImg' + swapCounter));
                                        var player = document.querySelector('.jC-swapperPlayer' + swapCounter);
                                        var viewer = document.querySelector('.jC-swapperViewer' + swapCounter);

                                        if (swapVidList.length != 0) {


                                            if (this.classList.contains('jC-swapperVid' + swapCounter)) {

                                                if (jC.defined(player)) {
                                                    jC(player).removeClass('hiddenElement');
                                                }
                                                if (jC.defined(viewer)) {
                                                    jC(viewer).addClass( 'hiddenElement');
                                                }

                                                if (!jC.defined(this.getAttribute('data-mp4'))) {
                                                    error += 'jC-mediaSwapper video link' + this + '\n is' +
                                                        'missing "data-mp4" dataset property. \n';
                                                }
                                                if (!jC.defined(this.getAttribute('data-webm'))) {
                                                    error += 'jC-mediaSwapper video link' + this + '\n is' +
                                                        'missing "data-webm" dataset property. \n';
                                                }

                                                if (jC.defined(player)) {
                                                    if (player.canPlayType('video/webm')) {
                                                        type = 'video/webm';
                                                        src = this.getAttribute('data-webm');
                                                    }
                                                    else if (player.canPlayType('video/mp4')) {
                                                        type = 'video/mp4';
                                                        src = this.getAttribute('data-mp4');
                                                    }
                                                    else {
                                                        error += 'Browser could not play any jChris supported ' +
                                                            'video types. \n';
                                                    }
                                                }
                                                if (error === '') {
                                                    jC.setVideoSrc(player, type, src);
                                                    jC(swapImgList).removeClass('selected');
                                                    jC(swapVidThumbList).removeClass('selected');
                                                    this.children[0].classList.add("selected");

                                                }
                                                else {
                                                    console.log('Could not add video source file to player source attribute.');
                                                }
                                            }
                                            else {
                                                console.info('didnt contain class: ' + 'jC-swapperVid' + swapCounter);
                                            }
                                        }
                                        else {                    //Should be no other mediaSwapper Elements, break loop
                                            i = 1000;
                                        }

                                        swapCounter++;
                                    }

                                });

                                [].forEach.call(videoPlayers, function (player) {

                                    if (mediaSwapper.contains(player)) {           //If this link belongs to this mediaSwapper Div

                                        thisPlayer = player;

                                        if (selectDefault) {

                                            var defaultType;
                                            var defaultSrc;

                                            if (thisPlayer.canPlayType('video/webm')) {
                                                defaultType = 'video/webm';
                                                defaultSrc = defaultMedia.getAttribute('data-webm');
                                            }
                                            else if (thisPlayer.canPlayType('video/mp4')) {
                                                defaultType = 'video/mp4';
                                                defaultSrc = defaultMedia.getAttribute('data-mp4');
                                            }
                                            else {
                                                console.log('Browser could not play any jChris supported ' +
                                                    'video types while setting default mediaSwapper attributes. \n')
                                            }

                                            jC.setVideoSrc(thisPlayer, defaultType, defaultSrc);
                                        }
                                    }
                                });
                            }
                            linkCounter++;
                        });
                        linkCounter = 0;
                    }
                    counter++;
                },
                jC.eventWatch['swapScanner'] == false);
            }


        },

        //TODO END: CHANGE ALL WIDGETS THAT USE CLASS ATTRIBUTES TO DATA-ATTRIBUTES-------------------------------------

        browserPolyfills: function () {

            if (!String.prototype.includes) {
                String.prototype.includes = function (search, start) {
                    'use strict';
                    if (typeof start !== 'number') {
                        start = 0;
                    }

                    if (start + search.length > this.length) {
                        return false;
                    } else {
                        return this.indexOf(search, start) !== -1;
                    }
                };
            }

            if (!Array.prototype.indexOf) {
                Array.prototype.indexOf || (Array.prototype.indexOf = function(d, e) {
                    var a;
                    if (null == this) throw new TypeError('"this" is null or not defined');
                    var c = Object(this),
                        b = c.length >>> 0;
                    if (0 === b) return -1;
                    a = +e || 0;
                    Infinity === Math.abs(a) && (a = 0);
                    if (a >= b) return -1;
                    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
                        if (a in c && c[a] === d) return a;
                        a++
                    }
                    return -1
                });
            }

            if (!String.prototype.contains) {
                String.prototype.contains = function(it) { return this.indexOf(it) != -1; };
            }
        }
    };

    jC.prepare = function (initialized) {

        document.addEventListener('DOMContentLoaded', function() {
            jChris.initializeWidgets.selectGroupWidget();
        });
        console.info('PREPARE FIRED');
        if (initialized != true) {
            if(jC.prepared) {
                console.info('AUTO PREPARE');
                jChris.initializeWidgets.browserPolyfills();
                jChris.initializeWidgets.navSelectionManager();
                if (jChris.system.getLocation() != 'index.html') {

                    setTimeout(function () {
                        jC('#overLayer').addClass('hiddenElement');
                    }, 200);
                }
            }
            else {
                setTimeout(function () {
                    console.info('returning prepare, prepared not true;.');
                    return jC.prepare();
                }, 250);
            }
        }

        if (initialized) {
            jChris.initializeWidgets.mediaSwapperWidget(true);
        }
        else {
            window.onpopstate = function() {

                console.info('popstate fired');

                if (jC.location.href !== document.documentURI) {
                    console.info(document.location.href);
                    console.info(document.documentURI);
                    window.href = document.documentURI;
                    window.history.pushState({"html": document.location.href}, "", url);
                    jChris.system.setLocation();
                    prepareEventHandlers(jC.location, true);
                }

            };
            if (jC.eventWatch['swapScanner'] == true) {
                jChris.initializeWidgets.mediaSwapperWidget();

            }
        }

        console.info('Test zoomable');
        jChris.initializeWidgets.zoomable();
        jChris.initializeWidgets.selectGroupWidget();

    };

    window.addEventListener('DOMContentLoaded', function() {
        jChris.system.setLocation();
        jC.prepare();
    }, false);
    window.jC = jC;
    window.jC = jC;


})(window);


