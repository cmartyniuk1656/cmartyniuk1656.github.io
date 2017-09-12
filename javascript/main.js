/* Coded by Chris Martyniuk */

/* global animation, storageManager */



window.onload = function () {

    console.info('WINDOW ONLOAD.');



    //Populate the backrgound array for later use
    if ( typeof jC.bgs == 'undefined' || jC.bgs.length == 0) {
        console.info('FIRED BG POPULATE.');
        jC.bgs.push("url('images/cityViewBg.jpg')");
        jC.bgs.push("url('images/planetSpace1.jpg')");
        jC.bgs.push("url('images/bluePlanet.jpg')");
        jC.bgs.push("url('images/skyFuture.jpg')");
        jC.bgs.push("url('images/space1.jpg')");
        jC.bgs.push("url('images/space2.jpg')");
        jC.bgs.push("url('images/space3.jpg')");
        //jC.bgs.push("url('images/mario_bg.jpg')");
        //jC.bgs.push("url('images/tree_clouds_planets.jpg')");
        jC.bgs.push("url('images/blueOceanAndSky_withPalmTree.jpg')");
        //jC.bgs.push("url('images/goldenGate_Twilight.jpg')");
        //jC.bgs.push("url('images/greenMountainView.jpg')");
        jC.bgs.push("url('images/jungleValleySpeakers.jpg')");
        jC.bgs.push("url('images/waterHuts.jpg')");
        jC.bgs.push("url('images/islandHorizon.jpg')");
        //jC.bgs.push("url('images/lakeSunset.jpg')");
        //jC.bgs.push("url('images/lakeSunset2.jpg')");
    }

    if (sessionStorage.getItem('jC.zoom') == null) {
        sessionStorage.setItem('jC.zoom', '1');
    }

    //This is called when you are ready to initialize the jChris Object
    jC.prepared = true;
    prepareEventHandlers(jC.location, true);

};

function prepareEventHandlers(url, isTrue) {

    createAjaxEvents();

    if (isTrue) {


        var overlay = jC('.overlay[0]');
        var transOverlay = jC('#transOverlay');
        jC('.overlay[0]').fadeIn().hide();

        if ((url.indexOf("projects.html") > -1)) {
            jC('#pageContent').fadeTransition( jC.rootPath() + '/projects.html, '+
                'heading|projectSelect|jC[id=projects]|webProjects|jC[/projects]',
                1000,
                'random',
                setUpProjectPage);

        }

        else if ((url.indexOf("home.html") > -1)) {
            jC('#pageContent').fadeTransition(
                jC.rootPath() + '/home.html, ' +
                'heading|jC[id=homePage]|main|jC[/homePage]',
                1000,
                'random',
                setUpHomePage);

        }


        else if ((url.indexOf("resume.html")  > -1)) {
            resetProjectEvents();
            jC('#pageContent').fadeTransition(
                jC.rootPath() + '/resume.html, main',
                1000,
                'random',
                resumeSelected);

            function resumeSelected() {
                jC('#resumeBtn').addClass('selected');
                jC('#projectsBtn').removeClass('selected');
                jC('#contactBtn').removeClass('selected');
                jC('#homepageBtn').removeClass('selected');
            }

        }

        else if ((url.indexOf("contact.html")  > -1)) {
            resetProjectEvents();
            jC('#pageContent').fadeTransition(
                jC.rootPath() + '/contact.html, main',
                1000,
                'random',
                contactSelected);

            function contactSelected() {
                jC('#contactBtn').addClass('selected');
                jC('#projectsBtn').removeClass('selected');
                jC('#resumeBtn').removeClass('selected');
                jC('#homepageBtn').removeClass('selected');
            }

        }

        else if ((url.indexOf("jchris.html")  > -1)) {

            jC('#background').backgroundImg("url('images/space1.jpg')");
            resetProjectEvents();
            setUpJchrisPage();
        }

        else {
            resetProjectEvents();
            jC('#homepageBtn').addClass('selected');
            jC('#projectsBtn').removeClass('selected');
            jC('#contactBtn').removeClass('selected');
            jC('#resumeBtn').removeClass('selected');
            setupEnterScreen();

        }


        jC('#projectsBtn').click(function () {
            jC('#pageContent').fadeTransition( jC.rootPath() + '/projects.html, ' +
                'heading|projectSelect|jC[id=projects]|webProjects|jC[/projects]',
                1000,
                'random',
                setUpProjectPage);

            jC('#homepageBtn').removeClass('selected');
            jC('#projectsBtn').addClass('selected');

        });


        jC('#homepageBtn').addEvent('click', function () {

            jC('#pageContent').fadeTransition(
                jC.rootPath() + '/home.html, ' +
                'heading|jC[id=homePage]|main|jC[/homePage]',
                1000,
                'random',
                setUpHomePage);

            jC('#homepageBtn').addClass('selected');
            jC('#projectsBtn').removeClass('selected');
        });

        jC('#resumeBtn').addEvent('click', function () {

            jC('#pageContent').fadeTransition(
                jC.rootPath() + '/resume.html, ' +
                'main',
                1000,
                'random');

            jC('#homepageBtn').addClass('selected');
            jC('#projectsBtn').removeClass('selected');
        });

        jC('#contactBtn').addEvent('click', function () {

            jC('#pageContent').fadeTransition(
                jC.rootPath() + '/contact.html, ' +
                'main',
                1000,
                'random',
                setUpHomePage);

            jC('#homepageBtn').addClass('selected');
            jC('#projectsBtn').removeClass('selected');
        });

        jC('#zoomBtn').click(function() {
            var mainContent = jC('#mainContent').ret();
            var currentZoom = parseFloat(sessionStorage.getItem('jC.zoom'));
            console.info(currentZoom);
            var newZoom = currentZoom + 0.1;
            sessionStorage.setItem('jC.zoom', newZoom);

            console.info(mainContent.style.zoom);
            document.getElementById('mainContent').style.zoom = newZoom;

        });

        jC('#zoomOutBtn').click(function() {
            var mainContent = jC('#mainContent').ret();
            var currentZoom = parseFloat(sessionStorage.getItem('jC.zoom'));
            console.info(currentZoom);
            var newZoom = currentZoom - 0.1;
            sessionStorage.setItem('jC.zoom', newZoom);

            console.info(mainContent.style.zoom);
            document.getElementById('mainContent').style.zoom = newZoom;
            document.getElementById('mainContent').style.msZoom = newZoom;
            document.getElementById('mainContent').style.moz = newZoom;

        })
    }

    else {
        //do nothing
    }

    if (url.indexOf("home.html") > -1) {
        console.info('fired home events');
        jC('#homepageBtn').addClass('selected');
        setUpHomePage();

        }
    else if ((url.indexOf("projects.html") > -1)) {
        console.info('fired project events');
        resetProjectEvents();
        jC('#projectsBtn').addClass('selected');
        jC('#homepageBtn').removeClass('selected');
        setUpProjectPage();
    }
    else if ((url.indexOf("preplist.html") > -1)) {
        jC('#background').backgroundImg("url('images/space2.jpg')");
    }
    else if ((url.indexOf("index.html") > -1)) {
        console.info('fired enteryPage events');
        resetProjectEvents();
        jC('#homepageBtn').addClass('selected');
        jC('#projectsBtn').removeClass('selected');
        setupEnterScreen();
    }
    else if ((url.indexOf("jchris.html") > -1)) {
        console.info('fired enteryPage events');
        resetProjectEvents();
        jC('#background').backgroundImg("url('images/space1.jpg')");
    }

    else if ((url.indexOf("chrismartyniuk.info")  > -1)) {
        console.info('fired enteryPage events');
        resetProjectEvents();
        jC('#homepageBtn').addClass('selected');
        jC('#projectsBtn').removeClass('selected');
        setupEnterScreen();

    }

    var mainContent = jC('#mainContent').ret();
    mainContent.style.zoom = parseFloat(sessionStorage.getItem('jC.zoom'));
    console.info(sessionStorage.getItem('jC.zoom'));

}



    function setupEnterScreen() {

        jC('#bgOverlay').fadeInTrans('0', '2s');
        jC('.overlay[0]').hide();

        jC('#enterBtn').click(function () {
            jC('#pageContent').fadeTransition(
                jC.rootPath() +'/home.html, ' +
                'heading|jC[id=homePage]|main|jC[/homePage]',
                1000,
                'random',
                setUpHomePage);
        });

        jC('#enterBtnDiv').mouseOver(function () {
            jC('#enterBtn').pointer().fadeOut('0', '500ms');
            jC('#bgOverlay').halfFadeTransisiton('0', '500ms');
        });

        jC('#enterBtn').mouseOut(function () {
            jC('#bgOverlay').fadeInTrans();
            jC('#enterSiteText').fadeOut('0', '2s');
        });
        jC('#pageContent').showElement();
        jC('#background').backgroundImg("url('images/greenYellowEnergy.jpg')");



}
function setUpHomePage() {

    var skillEventIdStrings = ['#webDevSkill', '#mobileDevSkill', '#softwareDevSkill', '#uxDevSkill'];

    [].forEach.call(skillEventIdStrings, function (element) {

        jC(element)
            .mouseOver(function () {

            if(!this.classList.contains('selected')) {
                jC(this).setAttribute('src', "images/icons/" + this.getAttribute('id').replace('Skill', "") +
                    "Hover.png")
                }
            })
            .mouseOut(function() {

                if(!this.classList.contains('selected')) {
                    jC(this).setAttribute('src', "images/icons/" + this.getAttribute('id').replace('Skill', "") +
                        ".png")
                }
            })
            .click(function() {

                var relativeId = '#' + this.getAttribute('id') + 'Desc';
                var relativeNodes = ['#webDevSkillDesc',
                    '#mobileDevSkillDesc',
                    '#softwareDevSkillDesc',
                    '#uxDevSkillDesc'];

                var index = relativeNodes.indexOf(relativeId);

                relativeNodes.splice(index, 1);

                setTimeout(function () {
                    jC(relativeId)
                        .removeClass('jC-collapse')
                        .addClass('jC-expanded');
                }, 1000);


                [].forEach.call(relativeNodes, function (node) {
                    jC(node)
                        .removeClass('jC-expanded')
                        .addClass('jC-collapse');
                })
            });
    });

    jC('.jChrisLink').
        click(function() {

        jC('#pageContent').fadeTransition( jC.rootPath() + '/projects.html, '+
            'heading|projectSelect|jC[id=projects]|webProjects|jC[/projects]',
            1000,
            'random',
            setUpProjectPage);

    })
        .mouseOver(function() {
            this.classList.add('selected');
    })
        .mouseOut(function() {
            this.classList.remove('selected');
        })
        .pointer();

    jC.selectionGroup(
        ['#webDevSkill',
        '#softwareDevSkill',
        '#mobileDevSkill',
        '#uxDevSkill']
    );

}

function setUpProjectPage() {

    resetProjectEvents();
    jC('#homepageBtn').removeClass('selected');
    jC('#projectsBtn').addClass('selected');

        jC('#projWebDev').addClass('selected');

    jC('#projSoftware').click(function () {

        if(!document.querySelector('#projSoftware').classList.contains('selected')) {

            jC('#projWebDev').removeClass('selected');
            jC('#projQA').removeClass('selected');
            jC('#projSoftware').addClass('selected');

            jC('#projects').ajaxHtml(
                jC.rootPath() + '/projects.html',
                'softwareProjects',
                false);
        }
    });

    jC('#projQA').click(function () {

        if (!jC('#projQA').hasClass('selected')) {

            jC('#projWebDev').removeClass('selected');
            jC('#projQA').addClass('selected');
            jC('#projSoftware').removeClass('selected');

            jC('#projects').ajaxHtml(
                jC.rootPath() + '/projects.html',
                'qaProjects',
                false);
        }
    });

    jC('#projWebDev').click(function () {
        if(!jC('#projWebDev').hasClass('selected')) {

            jC('#projWebDev').addClass('selected');
            jC('#projQA').removeClass('selected');
            jC('#projSoftware').removeClass('selected');

            jC('#projects').ajaxHtml(
                jC.rootPath() + '/projects.html',
                'webProjects',
                false,
                'jChrisImg');
        }
    });

    jC('#enlargedJchrisImg').click(function () {

        jC('#smallJchrisImg').removeClass('jC-collapse');
        jC('#enlargedJchrisImg').removeClass('jC-expanded')
            .addClass('jC-collapse');

    });

    jC('#smallJchrisImg').click(function () {

        jC('#smallJchrisImg').addClass('jC-collapse');

        jC('#enlargedJchrisImg')
            .addClass('jC-expanded')
            .removeClass('jC-collapse');

    });

}

function setUpJchrisPage() {
    jC('#flowChartTrigger').click(function () {

        jC('#flowChartLarge').removeClass('jC-collapse');

        jC('#flowChartTrigger')
            .removeClass('jC-expanded')
            .addClass('jC-collapse');

        jC('#mainContent').hide();
        jC('#background').backgroundImg("");

    }).pointer();

    jC('#flowChartLarge').click(function () {

        jC('#flowChartLarge').addClass('jC-collapse');

        jC('#flowChartTrigger')
            .addClass('jC-expanded')
            .removeClass('jC-collapse');
        jC('#mainContent').showElement();
        jC('#background').backgroundImg("url('images/space1.jpg')");


    }).pointer();
}

function resetProjectEvents() {
    jC.eventWatch['swapScanner'] = true;

    jC.eventWatch['#enlargedJchrisImg.click'] = false;
    jC.eventWatch['#smallJchrisImg.click'] = false;
    jC.eventWatch['#enlargedJchrisImg.click'] = false;
    jC.eventWatch['#projWebDev.click'] = false;
    jC.eventWatch['#projSoftware.click'] = false;
    jC.eventWatch['#projQA.click'] = false;
}



function createAjaxEvents() {

    jC.ajaxEventHandler('jChrisImg', fixImages);

    function fixImages() {

        jC('#enlargedJchrisImg').click(function () {

            jC('#smallJchrisImg').removeClass('jC-collapse');

            jC('#enlargedJchrisImg')
                .removeClass('jC-expanded')
                .addClass('jC-collapse');

        });

        jC('#smallJchrisImg').click(function () {

            jC('#smallJchrisImg').addClass('jC-collapse');

            jC('#enlargedJchrisImg')
                .addClass('jC-expanded')
                .removeClass('jC-collapse');

        });

    }

}


onReady = function(callback) {
    if (document.readyState === "complete")
        window.setTimeout(callback, 0);
    else
        window.addEventListener("load", callback, false);
};