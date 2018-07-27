/*
 * Spec file for all the Jasmine tests for the application.
 */

/* All tests are placed within the $() function.
 * This way that DOM elements in tests don't run until the DOM is ready.
 */

$(function() {

    /* Test suite for RSS feeds (allFeeds variable) */
    describe('RSS Feeds', function() {

        it('Feed defined', function() {
            // Make sure allFeeds variable has been defined
            expect(allFeeds).toBeDefined();
            // and it is not empty
            expect(allFeeds.length).not.toBe(0);
        });

        it('URL defined', function() {
            // Loop through each feed in the allFeeds array
            allFeeds.forEach(function(feed) {
                // ensure each feed has an URL
                expect(feed.url).toBeDefined();
                // ensure URL is not empty
                expect(feed.url.length).not.toBe(0);
            });
        });

        it('Name defined', function() {
            // Loop through each feed in the allFeeds array
            allFeeds.forEach(function(feed) {
                // ensure each feed has a name
                expect(feed.name).toBeDefined();
                // ensure name is not empty
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /* Test suite for the sliding menu */
    describe('The Menu', function() {

        // Ensure menu is initially hidden
        it('Menu is hidden', function() {
            // Check the body element has a menu-hidden class
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Ensure menu's visibility changes
        it('Visiblilty changes', function() {
            // Fist click on the menu icon should result in
            // menu-hidden class to be removed form the body element
            $(".menu-icon-link").click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            // Second click function should result in
            // menu-hidden class to be added to the body element
            $(".menu-icon-link").click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* Test suite for loading feed entries */
    describe('Initial Entries', function() {
        // Feeds are loaded asynchronous
        // load all feeds before testing
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('Feed not empty', function() {
            // Ensure there is at least one feed entry
            // check feed div's article length is more than 0
            expect($('.feed .entry').length).not.toBe(0);
        });
    });

    /* Test suite for changing feeds */
    describe('New Feed Selection', function() {
        var firstFeed = '';
        var secondFeed = '';

        // load first feed before testing
        beforeEach(function(done) {
            loadFeed(0, function() {
                // Assign a value to firstFeed variable (it's inner HTML)
                firstFeed = $('.feed').text();
                // load second feed before testing
                loadFeed(1, function() {
                    // Assign a value to secondFeed variable (it's inner HTML)
                    secondFeed = $('.feed').text();
                    done();
                });
            });
        });

        it('Content changes', function() {
            // Compare the feeds and check they are not identical
            expect(firstFeed).not.toEqual(secondFeed);
        });
    });

}());
