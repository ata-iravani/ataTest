var shetabEffect = {};

/*-----------Slide--------------*/
shetabEffect.Slide = function () {
    this.direction = 'left';
    this.speed = 1000;
};

shetabEffect.Slide.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };
        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block'});
            $(nextElement).animate({opacity:1}, this.speed, this.ease, function () {
                $(nextElement).removeClass('invisible').addClass('visible').css({opacity:'', zIndex:'', display:''});
                callback();
            });
        }
        else {
            var container = $('#container1');
            var elementHeight = container.height();
            var elementWidth = container.width();
            var speed = this.speed + 100;
            $('#shetabEffect').remove();

            if (this.direction == 'right') {
                var cssStr = '<style id="shetabEffect">.shetabEffect_SlideRight{' +
                    '-webkit-transform: translate( offset , 0);' +
                    '-webkit-transition: -webkit-transform speed linear;' +
                    '-moz-transform: translate( offset , 0);' +
                    '-moz-transition: -moz-transform speed linear;' +
                    '-ms-transform: translate( offset , 0);' +
                    '-ms-transition: -ms-transform speed linear;' +
                    '-o-transform: translate( offset , 0);' +
                    '-o-transition: -o-transform speed linear;' +
                    'transform: translate( offset , 0);' +
                    'transition: transform speed linear;}</style>';

                cssStr = cssStr.replace(/offset/g, elementWidth + 'px');
                cssStr = cssStr.replace(/speed/g, this.speed + 'ms');

                $('head').append(cssStr);

                var offset = elementWidth;

                $(currentElement).css({zIndex:12});
                $(nextElement).css({zIndex:11, opacity:1, display:'block'});
                $(currentElement).addClass('shetabEffect_SlideRight');

                setTimeout(function () {
                    $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_SlideRight').css({opacity:'', zIndex:'', display:''});
                    $(nextElement).removeClass('invisible').addClass('visible').css({opacity:'', zIndex:'', display:''});
                    callback();
                }, speed);
            }

            else if (this.direction == 'left') {
                var cssStr = '<style id="shetabEffect">.shetabEffect_SlideRight{' +
                    '-webkit-transform: translate( offset , 0);' +
                    '-webkit-transition: -webkit-transform speed linear;' +
                    '-moz-transform: translate( offset , 0);' +
                    '-moz-transition: -moz-transform speed linear;' +
                    '-ms-transform: translate( offset , 0);' +
                    '-ms-transition: -ms-transform speed linear;' +
                    '-o-transform: translate( offset , 0);' +
                    '-o-transition: -o-transform speed linear;' +
                    'transform: translate( offset , 0);' +
                    'transition: transform speed linear;}</style>';

                cssStr = cssStr.replace(/offset/g, '-' + (elementWidth) + 'px');
                cssStr = cssStr.replace(/speed/g, this.speed + 'ms');

                $('head').append(cssStr);

                var offset = elementWidth;

                $(currentElement).css({zIndex:12});
                $(nextElement).css({zIndex:11, opacity:1, display:'block'});
                $(currentElement).addClass('shetabEffect_SlideRight');

                setTimeout(function () {
                    $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_SlideRight').css({opacity:'', zIndex:'', display:''});
                    $(nextElement).removeClass('invisible').addClass('visible').css({opacity:'', zIndex:'', display:''});
                    callback();
                }, speed);

            }

            else if (this.direction == 'top') {
                var cssStr = '<style id="shetabEffect">.shetabEffect_SlideRight{' +
                    '-webkit-transform: translate( 0, offset);' +
                    '-webkit-transition: -webkit-transform speed linear;' +
                    '-moz-transform: translate( 0, offset);' +
                    '-moz-transition: -moz-transform speed linear;' +
                    '-ms-transform: translate( 0, offset);' +
                    '-ms-transition: -ms-transform speed linear;' +
                    '-o-transform: translate( 0, offset);' +
                    '-o-transition: -o-transform speed linear;' +
                    'transform: translate( 0, offset);' +
                    'transition: transform speed linear;}</style>';

                cssStr = cssStr.replace(/offset/g, '-' + (elementHeight) + 'px');
                cssStr = cssStr.replace(/speed/g, this.speed + 'ms');

                $('head').append(cssStr);

                var offset = elementWidth;

                $(currentElement).css({zIndex:12});
                $(nextElement).css({zIndex:11, opacity:1, display:'block'});
                $(currentElement).addClass('shetabEffect_SlideRight');

                setTimeout(function () {
                    $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_SlideRight').css({opacity:'', zIndex:'', display:''});
                    $(nextElement).removeClass('invisible').addClass('visible').css({opacity:'', zIndex:'', display:''});
                    callback();
                }, speed);
            }

            else if (this.direction == 'down') {
                var cssStr = '<style id="shetabEffect">.shetabEffect_SlideRight{' +
                    '-webkit-transform: translate( 0, offset);' +
                    '-webkit-transition: -webkit-transform speed linear;' +
                    '-moz-transform: translate( 0, offset);' +
                    '-moz-transition: -moz-transform speed linear;' +
                    '-ms-transform: translate( 0, offset);' +
                    '-ms-transition: -ms-transform speed linear;' +
                    '-o-transform: translate( 0, offset);' +
                    '-o-transition: -o-transform speed linear;' +
                    'transform: translate( 0, offset);' +
                    'transition: transform speed linear;}</style>';

                cssStr = cssStr.replace(/offset/g, (elementHeight) + 'px');
                cssStr = cssStr.replace(/speed/g, this.speed + 'ms');

                $('head').append(cssStr);

                var offset = elementWidth;

                $(currentElement).css({zIndex:12});
                $(nextElement).css({zIndex:11, opacity:1, display:'block'});
                $(currentElement).addClass('shetabEffect_SlideRight');

                setTimeout(function () {
                    $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_SlideRight').css({opacity:'', zIndex:'', display:''});
                    $(nextElement).removeClass('invisible').addClass('visible').css({opacity:'', zIndex:'', display:''});
                    callback();
                }, speed);

            }
        }
    }
};

/*-----------Fade--------------*/
shetabEffect.Fade = function () {
    this.speed = 1000;
    this.ease = 'linear';
};

shetabEffect.Fade.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };
        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block'});
            $(nextElement).animate({opacity:1}, this.speed, this.ease, function () {
                $(nextElement).removeClass('invisible').addClass('visible').css({opacity:'', zIndex:'', display:''});
                callback();
            });
        }
        else {
            $(currentElement).css({zIndex:12});
            $(nextElement).css({zIndex:11, opacity:1, display:'block'});
            setTimeout(function () {
                $(currentElement).animate({opacity:0}, this.speed, this.ease, function () {
                    $(currentElement).addClass('invisible').removeClass('visible').css({opacity:'', zIndex:'', display:''});
                    $(nextElement).removeClass('invisible').addClass('visible');
                    callback();
                });
            }, 0);
        }
    }
};

/*-----------Wipe--------------*/
// Webkit Based Only Last Update 11/7/2012
shetabEffect.Wipe = function () {
    this.direction = 'left';
    this.speed = 3000;
};

shetabEffect.Wipe.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };
        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block'});
            $(nextElement).animate({opacity:1}, this.speed, this.ease, function () {
                $(nextElement).removeClass('invisible').addClass('visible').css({opacity:'', zIndex:'', display:''});
                callback();
            });
        }
        else {
            var container = $('#container1');
            var elementHeight = container.height();
            var elementWidth = container.width();
            if (this.direction == 'left') {
                {
                    $('#shetabEffect').remove();
                    var cssStr = '<style id="shetabEffect">.shetabEffect_WipeLeft{' +
                        '-webkit-mask-size: 200% 200%;' +
                        '-webkit-mask-repeat: no-repeat;' +
                        '-webkit-animation: wipe speed;' +
                        '-webkit-animation-direction: normal;' +
                        '-webkit-animation-iteration-count: 1;' +
                        '-webkit-animation-fill-mode: forwards;' +
                        '-webkit-mask-position: offsetLeftS 0;' +
                        '-webkit-mask-image: -webkit-gradient(linear, left top, right top, ' +
                        'color-stop(0%, transparent), color-stop(20%, transparent), ' +
                        'color-stop(25%, transparent), color-stop(30%, transparent), ' +
                        'color-stop(50%, rgba(0, 0, 0, 1)), color-stop(98%, rgba(0, 0, 0, 1)), ' +
                        'color-stop(100%, rgba(0, 0, 0, 1)));}' +
                        '@-webkit-keyframes wipe {' +
                        '0% { -webkit-mask-position: offsetLeftS 0; }' +
                        '100% { -webkit-mask-position: offsetLeftD 0; }' +
                        '}' +
                        '</style>';

                    cssStr = cssStr.replace(/offsetLeftS/g, '-' + (elementWidth * 1) + 'px');
                    cssStr = cssStr.replace(/offsetLeftD/g, '+' + (elementWidth * 1) + 'px');
                    cssStr = cssStr.replace(/speed/g, this.speed + 'ms');

                    $('head').append(cssStr);

                    $(currentElement).css({zIndex:12});
                    $(nextElement).css({zIndex:11, opacity:1, display:'block'});
                    $(currentElement).addClass('shetabEffect_WipeLeft');

                    setTimeout(function () {
                        $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_WipeLeft').css({opacity:'', zIndex:'', display:''});
                        $(nextElement).removeClass('invisible').addClass('visible').css({opacity:'', zIndex:'', display:''});
                        callback();
                    }, this.speed);
                }
            }
            else if (this.direction == 'right') {
                {
                    $('#shetabEffect').remove();
                    var cssStr = '<style id="shetabEffect">.shetabEffect_WipeRight{' +
                        '-webkit-mask-size: 200% 200%;' +
                        '-webkit-mask-repeat: no-repeat;' +
                        '-webkit-animation: wipe speed;' +
                        '-webkit-animation-direction: normal;' +
                        '-webkit-animation-iteration-count: 1;' +
                        '-webkit-animation-fill-mode: forwards;' +
                        '-webkit-mask-position: 0 0;' +
                        '-webkit-mask-image: -webkit-gradient(linear, right top, left top, ' +
                        'color-stop(0%, transparent), color-stop(20%, transparent), ' +
                        'color-stop(25%, transparent), color-stop(30%, transparent), ' +
                        'color-stop(50%, rgba(0, 0, 0, 1)), color-stop(98%, rgba(0, 0, 0, 1)), ' +
                        'color-stop(100%, rgba(0, 0, 0, 1)));}' +
                        '@-webkit-keyframes wipe {' +
                        '0% { -webkit-mask-position: 0 0; }' +
                        '100% { -webkit-mask-position: offsetLeftD 0; }' +
                        '}' +
                        '</style>';

                    cssStr = cssStr.replace(/offsetLeftS/g, '+' + (elementWidth * 1) + 'px');
                    cssStr = cssStr.replace(/offsetLeftD/g, '-' + (elementWidth * 2) + 'px');
                    cssStr = cssStr.replace(/speed/g, this.speed + 'ms');

                    $('head').append(cssStr);

                    $(currentElement).css({zIndex:12});
                    $(nextElement).css({zIndex:11, opacity:1, display:'block'});
                    $(currentElement).addClass('shetabEffect_WipeRight');

                    setTimeout(function () {
                        $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_WipeRight').css({opacity:'', zIndex:'', display:''});
                        $(nextElement).removeClass('invisible').addClass('visible').css({opacity:'', zIndex:'', display:''});
                        callback();
                    }, this.speed);
                }
            }
            else if (this.direction == 'top') {
                {
                    $('#shetabEffect').remove();
                    var cssStr = '<style id="shetabEffect">.shetabEffect_WipeTop{' +
                        '-webkit-mask-size: 200% 200%;' +
                        '-webkit-mask-repeat: no-repeat;' +
                        '-webkit-animation: wipe speed;' +
                        '-webkit-animation-direction: normal;' +
                        '-webkit-animation-iteration-count: 1;' +
                        '-webkit-animation-fill-mode: forwards;' +
                        '-webkit-mask-position: 0 offsetTopS;' +
                        '-webkit-mask-image: -webkit-gradient(linear, left top , left bottom, ' +
                        'color-stop(0%, transparent), color-stop(20%, transparent), ' +
                        'color-stop(25%, transparent), color-stop(30%, transparent), ' +
                        'color-stop(50%, rgba(0, 0, 0, 1)), color-stop(98%, rgba(0, 0, 0, 1)), ' +
                        'color-stop(100%, rgba(0, 0, 0, 1)));}' +
                        '@-webkit-keyframes wipe {' +
                        '0% { -webkit-mask-position: 0 offsetTopS; }' +
                        '100% { -webkit-mask-position: 0 offsetTopD; }' +
                        '}' +
                        '</style>';

                    cssStr = cssStr.replace(/offsetTopS/g, '-' + (elementHeight * 1) + 'px');
                    cssStr = cssStr.replace(/offsetTopD/g, '+' + (elementHeight * 2) + 'px');
                    cssStr = cssStr.replace(/speed/g, this.speed + 'ms');

                    $('head').append(cssStr);

                    $(currentElement).css({zIndex:12});
                    $(nextElement).css({zIndex:11, opacity:1, display:'block'});
                    $(currentElement).addClass('shetabEffect_WipeTop');

                    setTimeout(function () {
                        $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_WipeTop').css({opacity:'', zIndex:'', display:''});
                        $(nextElement).removeClass('invisible').addClass('visible').css({opacity:'', zIndex:'', display:''});
                        callback();
                    }, this.speed);
                }
            }
            else if (this.direction == 'bottom') {
                {
                    $('#shetabEffect').remove();
                    var cssStr = '<style id="shetabEffect">.shetabEffect_WipeBottom{' +
                        '-webkit-mask-size: 200% 200%;' +
                        '-webkit-mask-repeat: no-repeat;' +
                        '-webkit-animation: wipe speed;' +
                        '-webkit-animation-direction: normal;' +
                        '-webkit-animation-iteration-count: 1;' +
                        '-webkit-animation-fill-mode: forwards;' +
                        '-webkit-mask-position: 0 0;' +
                        '-webkit-mask-image: -webkit-gradient(linear, left bottom , left top, ' +
                        'color-stop(0%, transparent), color-stop(20%, transparent), ' +
                        'color-stop(25%, transparent), color-stop(30%, transparent), ' +
                        'color-stop(50%, rgba(0, 0, 0, 1)), color-stop(98%, rgba(0, 0, 0, 1)), ' +
                        'color-stop(100%, rgba(0, 0, 0, 1)));}' +
                        '@-webkit-keyframes wipe {' +
                        '0% { -webkit-mask-position: 0 0; }' +
                        '100% { -webkit-mask-position: 0 offsetTopD; }' +
                        '}' +
                        '</style>';

                    cssStr = cssStr.replace(/offsetTopS/g, '+' + (elementHeight * 1) + 'px');
                    cssStr = cssStr.replace(/offsetTopD/g, '-' + (elementHeight * 2) + 'px');
                    cssStr = cssStr.replace(/speed/g, this.speed + 'ms');

                    $('head').append(cssStr);

                    $(currentElement).css({zIndex:12});
                    $(nextElement).css({zIndex:11, opacity:1, display:'block'});
                    $(currentElement).addClass('shetabEffect_WipeBottom');

                    setTimeout(function () {
                        $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_WipeBottom').css({opacity:'', zIndex:'', display:''});
                        $(nextElement).removeClass('invisible').addClass('visible').css({opacity:'', zIndex:'', display:''});
                        callback();
                    }, this.speed);
                }
            }
        }

    }
};

/*-----------Circle--------------*/
// Webkit Based Only Last Update 11/7/2012
shetabEffect.Circle = function () {
    this.speed = 2000;
    this.ease = 'linear';
    this.direction = 'centerCenter';
};

shetabEffect.Circle.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };
        $('#shetabEffect').remove();
        var cssStr = '<style id="shetabEffect">.shetabEffect_Circle{' +
            '-webkit-mask-size: 0%;' +
            '-webkit-mask-repeat: no-repeat;' +
            '-webkit-mask-image: maskImage ' +
            '-webkit-animation: circle speed ;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: ease-in-out;' +
            '-webkit-mask-position: direction ;}' +
            '@-webkit-keyframes circle {' +
            '0% {   -webkit-mask-size: 0%;}' +
            '100% {  -webkit-mask-size: 700%;}' +
            '}</style>';
        $(nextElement).css({display:'block'});

        if (this.direction == 'centerCenter') {
            cssStr = cssStr.replace(/direction /g, 'center center');
            cssStr = cssStr.replace(/maskImage /g, '-webkit-radial-gradient(center, ellipse cover, ' +
                'rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0.5) 30%, ' +
                'rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 1) 55%, ' +
                'rgba(0, 0, 0, 0) 65%, rgba(0, 0, 0, 0) 100%);');
        }

        else if (this.direction == 'rightTop') {
            cssStr = cssStr.replace(/direction /g, 'right top');
            cssStr = cssStr.replace(/maskImage /g, '-webkit-radial-gradient(100% 0%, ellipse farthest-side, ' +
                'black 20%, rgba(0, 0, 0, 0.496094) 30%, black 40%, rgba(0, 0, 0, 0.496094) 50%,' +
                ' black 55%, transparent 65%, transparent 100%);');
        }

        else if (this.direction == 'centerTop') {
            cssStr = cssStr.replace(/direction /g, 'center top');
            cssStr = cssStr.replace(/maskImage /g, '-webkit-radial-gradient(50% 0%, ellipse farthest-side, ' +
                'black 20%, rgba(0, 0, 0, 0.496094) 30%, black 40%, rgba(0, 0, 0, 0.496094) 50%, ' +
                'black 55%, transparent 65%, transparent 100%);');
        }

        else if (this.direction == 'leftTop') {
            cssStr = cssStr.replace(/direction /g, 'left top');
            cssStr = cssStr.replace(/maskImage /g, '-webkit-radial-gradient(0% 0%, ellipse farthest-side, ' +
                'black 20%, rgba(0, 0, 0, 0.496094) 30%, black 40%, rgba(0, 0, 0, 0.496094) 50%, ' +
                'black 55%, transparent 65%, transparent 100%);');
        }

        else if (this.direction == 'leftCenter') {
            cssStr = cssStr.replace(/direction /g, 'left center');
            cssStr = cssStr.replace(/maskImage /g, '-webkit-radial-gradient(0% 50%, ellipse farthest-side, ' +
                'black 20%, rgba(0, 0, 0, 0.496094) 30%, black 40%, rgba(0, 0, 0, 0.496094) 50%, ' +
                'black 55%, transparent 65%, transparent 100%);');
        }

        else if (this.direction == 'leftBottom') {
            cssStr = cssStr.replace(/direction /g, 'left bottom');
            cssStr = cssStr.replace(/maskImage /g, '-webkit-radial-gradient(0% 100%, ellipse farthest-side, ' +
                'black 20%, rgba(0, 0, 0, 0.496094) 30%, black 40%, rgba(0, 0, 0, 0.496094) 50%, ' +
                'black 55%, transparent 65%, transparent 100%);');
        }

        else if (this.direction == 'centerBottom') {
            cssStr = cssStr.replace(/direction /g, 'center bottom');
            cssStr = cssStr.replace(/maskImage /g, '-webkit-radial-gradient(50% 100%, ellipse farthest-side, ' +
                'black 20%, rgba(0, 0, 0, 0.496094) 30%, black 40%, rgba(0, 0, 0, 0.496094) 50%, ' +
                'black 55%, transparent 65%, transparent 100%);');
        }

        else if (this.direction == 'rightBottom') {
            cssStr = cssStr.replace(/direction /g, 'right bottom');
            cssStr = cssStr.replace(/maskImage /g, '-webkit-radial-gradient(100% 100%, ellipse farthest-side, ' +
                'black 20%, rgba(0, 0, 0, 0.496094) 30%, black 40%, rgba(0, 0, 0, 0.496094) 50%, ' +
                'black 55%, transparent 65%, transparent 100%);');
        }

        else if (this.direction == 'rightCenter') {
            cssStr = cssStr.replace(/direction /g, 'right center');
            cssStr = cssStr.replace(/maskImage /g, '-webkit-radial-gradient(100% 50%, ellipse farthest-side, ' +
                'black 20%, rgba(0, 0, 0, 0.496094) 30%, black 40%, rgba(0, 0, 0, 0.496094) 50%, ' +
                'black 55%, transparent 65%, transparent 100%);');
        }

        cssStr = cssStr.replace(/speed/g, (this.speed ) + 'ms');

        $('head').append(cssStr);

        if (currentElement == null) {
            $(nextElement).css({zIndex:11, opacity:1, display:'block'}).addClass('shetabEffect_Circle');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_Circle').css({opacity:'', zIndex:'', display:''});
                callback();
            }, this.speed);
        }
        else {
            $(nextElement).css({ opacity:1, display:'block'}).addClass('shetabEffect_Circle');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_Circle').css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').css({opacity:'', zIndex:'', display:''});
                callback();
            }, this.speed);
        }
    }
};

/*-----------Rotate Fade Scale--------------*/
shetabEffect.RFS = function () {
};

shetabEffect.RFS.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };

        var cssStr = '<style id="shetabEffect">' +
            '.shetabEffect_RFS{' +

            // Webkit Based
            '-webkit-transform: scale(0);' +
            '-webkit-transform-origin: 50% 50%;' +
            '-webkit-animation: entranceRotate 0.7s forwards ease-out, appear 2s forwards;' +

            // Mozilla FireFox
            '-moz-transform: scale(0);' +
            '-moz-transform-origin: 50% 50%;' +
            '-moz-animation: entranceRotate 0.7s forwards ease-out, appear 2s forwards;' +

            // IE
            '-ms-transform: scale(0);' +
            '-ms-transform-origin: 50% 50%;' +
            '-ms-animation: entranceRotate 0.7s forwards ease-out, appear 2s forwards;' +

            'opacity: 0;' +
            '}' +

            // Webkit Based
            '@-webkit-keyframes entranceRotate {' +
            '0% {-webkit-transform:scale(0) rotate(0deg); }' +
            '100% {-webkit-transform:scale(1.0) rotate(360deg); }' +
            '}' +
            '@-webkit-keyframes appear {' +
            '0% { opacity:0;}' +
            '100% {opacity:1}' +
            '}' +

            // Mozilla FireFox
            '@-moz-keyframes entranceRotate {' +
            '0% {-moz-transform:scale(0) rotate(0deg); }' +
            '100% {-moz-transform:scale(1.0) rotate(360deg); }' +
            '}' +
            '@-moz-keyframes appear {' +
            '0% { opacity:0;}' +
            '100% {opacity:1}' +
            '}' +

            // IE
            '@-ms-keyframes entranceRotate {' +
            '0% {-ms-transform:scale(0) rotate(0deg); }' +
            '100% {-ms-transform:scale(1.0) rotate(360deg); }' +
            '}' +
            '@-ms-keyframes appear {' +
            '0% { opacity:0;}' +
            '100% {opacity:1}' +
            '}' +

            '</style>';

        $('head').append(cssStr);
        $('body').css({overflow:'hidden'});
        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block'}).addClass('shetabEffect_RFS');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_RFS')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                $('#shetabEffect').remove();
                callback();
            }, 2500);
        }
        else {
            $(nextElement).css({ zIndex:11, display:'block'}).addClass('shetabEffect_RFS');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_RFS').css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                $('#shetabEffect').remove();
                callback();
            }, 2500);
        }
    }
};

/*-----------Split--------------*/
// Webkit Based Only Last Update 11/7/2012
shetabEffect.Split = function () {
    this.speed = 1000;
    this.direction = 'horizontal';
};

shetabEffect.Split.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };

        $('#shetabEffect').remove();

        var cssStr = '<style id="shetabEffect">.shetabEffect_Split{' +
            'opacity:1;' +
            '-webkit-mask-repeat: no-repeat;' +
            '-webkit-mask-image: -webkit-linear-gradient( maskImageDirection , ' +
            'transparent 0%, black 30%,black 36%,black 50%,black 64%,black 75%, transparent 100%); ' +
            '-webkit-mask-size: firstFrameMaskSize ;' +
            '-webkit-animation: split speed ;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: ease-in-out;' +
            '-webkit-mask-position: center center;}' +
            '@-webkit-keyframes split {' +
            '0% {   -webkit-mask-size: firstFrameMaskSize ;}' +
            '100% {  -webkit-mask-size: lastFrameMaskSize ;}' +
            '}</style>';

        if (this.direction == 'horizontal') {
            cssStr = cssStr.replace(/maskImageDirection/, 'left');
            cssStr = cssStr.replace(/firstFrameMaskSize/, '0% 100%');
            cssStr = cssStr.replace(/lastFrameMaskSize/, '200% 100%');
        }
        else if (this.direction == 'vertical') {
            cssStr = cssStr.replace(/maskImageDirection/, 'top');
            cssStr = cssStr.replace(/firstFrameMaskSize/, '100% 0%');
            cssStr = cssStr.replace(/lastFrameMaskSize/, '100% 200%');
        }

        cssStr = cssStr.replace(/speed/, (this.speed - 20) + 'ms');
        $('head').append(cssStr);

        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block'}).addClass('shetabEffect_Split');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_Split')
                    .css({opacity:'', zIndex:'', display:''});
                callback();
            }, this.speed);
        }
        else {
            $(nextElement).css({ zIndex:11, display:'block'}).addClass('shetabEffect_Split');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_Split').css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').css({opacity:'', zIndex:'', display:''});
                callback();
            }, this.speed);
        }
    }
};


/*-----------Push--------------*/
shetabEffect.Push = function () {
    this.speed = 2000;
    this.direction = 'right';
};

shetabEffect.Push.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };

        $('#shetabEffect').remove();

        var cssStr = '<style id="shetabEffect">' +
            '.shetabEffect_PushEntrance{' +

            // Webkit Based
            '-webkit-transform: translate3d( firstEntranceFrameTranslate );' +
            '-webkit-animation: pushEntrance speed ;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +

            // Mozilla FireFox
            '-moz-transform: mozTranslateFirstEntranceFrameTranslate ;' +
            '-moz-animation: pushEntrance speed ;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +

            // IE
            '-ms-transform: mozTranslateFirstEntranceFrameTranslate ;' +
            '-ms-animation: pushEntrance speed ;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +

            '}' +

            // Webkit Based
            '@-webkit-keyframes pushEntrance {' +
            '0% { -webkit-transform: translate3d ( firstEntranceFrameTranslate ); }' +
            '100% { -webkit-transform: translate3d( lastEntranceFrameTranslate );}' +
            '}' +

            // Mozilla FireFox
            '@-moz-keyframes pushEntrance {' +
            '0% { -moz-transform: mozTranslateFirstEntranceFrameTranslate ; }' +
            '100% { -moz-transform: mozTranslateLastEntranceFrameTranslate ;}' +
            '}' +

            // IE
            '@-ms-keyframes pushEntrance {' +
            '0% { -ms-transform: mozTranslateFirstEntranceFrameTranslate ; }' +
            '100% { -ms-transform: mozTranslateLastEntranceFrameTranslate ;}' +
            '}' +

            '.shetabEffect_PushExit{' +

            // Webkit Based
            '-webkit-transform: translate3d( firstEntranceFrameTranslate );' +
            '-webkit-animation: pushExit speed ;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +

            // Mozilla FireFox
            '-moz-transform: mozTranslateFirstEntranceFrameTranslate  ;' +
            '-moz-animation: pushExit speed ;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +

            // IE
            '-ms-transform: mozTranslateFirstEntranceFrameTranslate  ;' +
            '-ms-animation: pushExit speed ;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '}' +

            // Webkit Based
            '@-webkit-keyframes pushExit {' +
            '0% { -webkit-transform: translate3d( firstExitFrameTranslate ); }' +
            '100% { -webkit-transform: translate3d( lastExitFrameTranslate );}' +
            '}' +

            // Mozilla FireFox
            '@-moz-keyframes pushExit {' +
            '0% { -moz-transform: mozTranslateFirstExitFrameTranslate ; }' +
            '100% { -moz-transform: mozTranslateLastExitFrameTranslate ;}' +
            '}' +

            // IE
            '@-ms-keyframes pushExit {' +
            '0% { -ms-transform: mozTranslateFirstExitFrameTranslate ; }' +
            '100% { -ms-transform: mozTranslateLastExitFrameTranslate ;}' +
            '}' +
            '</style>';

        var container = $('#container1');
        var elementHeight = container.height();
        var elementWidth = container.width();

        if (this.direction == 'up') {
            // Webkit Based
            cssStr = cssStr.replace(/firstEntranceFrameTranslate/g, '0, -' + elementHeight + 'px ,0');
            cssStr = cssStr.replace(/lastEntranceFrameTranslate/g, '0, 0 ,0');
            cssStr = cssStr.replace(/firstExitFrameTranslate/g, '0, 0 ,0');
            cssStr = cssStr.replace(/lastExitFrameTranslate/g, '0, ' + (elementHeight + 10) + 'px ,0');

            // Mozilla FireFox & IE
            cssStr = cssStr.replace(/mozTranslateFirstEntranceFrameTranslate/gi, 'translateY(-' + elementHeight + 'px)');
            cssStr = cssStr.replace(/mozTranslateLastEntranceFrameTranslate/gi, 'translateY(0)');
            cssStr = cssStr.replace(/mozTranslateFirstExitFrameTranslate/gi, 'translateY(0)');
            cssStr = cssStr.replace(/mozTranslateLastExitFrameTranslate/gi, 'translateY(' + (elementHeight + 10) + 'px)');
        }

        else if (this.direction == 'bottom') {
            // Webkit Based
            cssStr = cssStr.replace(/firstEntranceFrameTranslate/, '0,' + elementHeight + 'px ,0');
            cssStr = cssStr.replace(/lastEntranceFrameTranslate /, '0, 0 ,0');
            cssStr = cssStr.replace(/firstExitFrameTranslate/, '0, 0 ,0');
            cssStr = cssStr.replace(/lastExitFrameTranslate /, '0, -' + (elementHeight + 10) + 'px ,0');

            // Mozilla FireFox & IE
            cssStr = cssStr.replace(/mozTranslateFirstEntranceFrameTranslate/gi, 'translateY(' + elementHeight + 'px)');
            cssStr = cssStr.replace(/mozTranslateLastEntranceFrameTranslate/gi, 'translateY(0)');
            cssStr = cssStr.replace(/mozTranslateFirstExitFrameTranslate/gi, 'translateY(0)');
            cssStr = cssStr.replace(/mozTranslateLastExitFrameTranslate/gi, 'translateY(-' + (elementHeight + 10) + 'px)');
        }
        else if (this.direction == 'left') {
            // Webkit Based
            cssStr = cssStr.replace(/firstEntranceFrameTranslate/, '-' + elementWidth + 'px ,0 ,0');
            cssStr = cssStr.replace(/lastEntranceFrameTranslate /, '0, 0 ,0');
            cssStr = cssStr.replace(/firstExitFrameTranslate/, '0, 0 ,0');
            cssStr = cssStr.replace(/lastExitFrameTranslate /, '' + (elementWidth + 10) + 'px ,0 ,0');

            // Mozilla FireFox & IE
            cssStr = cssStr.replace(/mozTranslateFirstEntranceFrameTranslate/gi, 'translateX(-' + elementHeight + 'px)');
            cssStr = cssStr.replace(/mozTranslateLastEntranceFrameTranslate/gi, 'translateX(0)');
            cssStr = cssStr.replace(/mozTranslateFirstExitFrameTranslate/gi, 'translateX(0)');
            cssStr = cssStr.replace(/mozTranslateLastExitFrameTranslate/gi, 'translateX(' + (elementHeight + 10) + 'px)');


        }
        else if (this.direction == 'right') {
            // Webkit Based
            cssStr = cssStr.replace(/firstEntranceFrameTranslate/, '' + elementWidth + 'px ,0 ,0');
            cssStr = cssStr.replace(/lastEntranceFrameTranslate /, '0, 0 ,0');
            cssStr = cssStr.replace(/firstExitFrameTranslate/, '0, 0 ,0');
            cssStr = cssStr.replace(/lastExitFrameTranslate /, '-' + (elementWidth + 10) + 'px ,0 ,0');

            // Mozilla FireFox & IE
            cssStr = cssStr.replace(/mozTranslateFirstEntranceFrameTranslate/gi, 'translateX(' + elementHeight + 'px)');
            cssStr = cssStr.replace(/mozTranslateLastEntranceFrameTranslate/gi, 'translateX(0)');
            cssStr = cssStr.replace(/mozTranslateFirstExitFrameTranslate/gi, 'translateX(0)');
            cssStr = cssStr.replace(/mozTranslateLastExitFrameTranslate/gi, 'translateX(-' + (elementHeight + 10) + 'px)');
        }

        cssStr = cssStr.replace(/speed/g, (this.speed - 20) + 'ms');
        $('head').append(cssStr);

        $('body').css({overflow:'hidden'});

        if (currentElement == null) {
            $(nextElement).css({opacity:1, display:'block'}).addClass('shetabEffect_PushEntrance');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_PushEntrance')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();
            }, this.speed);
        }
        else {
            $(currentElement).css({ zIndex:11, display:'block'}).addClass('shetabEffect_PushExit');
            $(nextElement).css({opacity:1, zIndex:11, display:'block'}).addClass('shetabEffect_PushEntrance');
            setTimeout(function () {
                $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_PushExit')
                    .css({opacity:'', zIndex:'', display:''});
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_PushEntrance')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();
            }, this.speed);
        }

    }
};

/*-----------Cube--------------*/
// Does not work in IE 10 due to ie 10 lacks
// last update fo this effect nov/11/2012
shetabEffect.Cube = function () {
    this.direction = 'up';
    this.speed = 1500;
};

shetabEffect.Cube.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };

        $('#shetabEffect').remove();

        var cssStr = '<style id="shetabEffect">' +
            '#container0 {' +
            '-webkit-perspective: 3000px;' +
            '-moz-transform: perspective(3000px);' +
            '-moz-transform-style: preserve-3d;' +
            'width: 100%;' +
            '}' +

            '#container1 {' +
            'height: 100%;' +
            'width: 100%;' +

            // Webkit Based
            '-webkit-transform-style: preserve-3d;' +
            '-webkit-transform: translateZ(translateValueN);' +
            '-webkit-transform-origin:50% 50%;' +

            // Mozilla FireFox
            '-moz-transform: translateZ(translateValueN);' +
            '-moz-transform-style: preserve-3d;' +
            '-moz-transform-origin:50% 50%;' +
            '}' +

            '#container1 iframe {' +
            '-webkit-backface-visibility: hidden;' +
            '-moz-backface-visibility: hidden;' +
            '}' +

            ' #container1.animate {' +

            // Webkit Based
            '-webkit-animation: keyfarmeName speed;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +

            // Mozilla FireFox
            '-moz-animation: keyfarmeName speed;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '}' +

            '#container1 .current {' +
            '-webkit-transform: translateZ(translateValueP);' +
            '-moz-transform: translateZ(translateValueP);' +
            '}' +

            '#container1 .next {' +
            '-webkit-transform: nextElementInitialTransform translateZ(translateValueP) ;' +
            '-moz-transform: nextElementInitialTransform translateZ(translateValueP) ;' +
            '}' +

            // Webkit Based
            '@-webkit-keyframes rotateUp {' +
            '0% { -webkit-transform:  translateZ(translateValueN) rotateX(0); -webkit-animation-timing-function: linear; }' +
            '50% { -webkit-transform: translateZ(translateValueN) rotateX(-92deg); -webkit-animation-timing-function: ease-in; }' +
            '70% { -webkit-transform: translateZ(translateValueN) rotateX(-84deg); -webkit-animation-timing-function: ease-in; }' +
            '80% { -webkit-transform: translateZ(translateValueN) rotateX(-90deg); -webkit-animation-timing-function: ease-in; }' +
            '95% { -webkit-transform: translateZ(translateValueN) rotateX(-88deg); -webkit-animation-timing-function: ease-in; }' +
            '100% { -webkit-transform:  translateZ(translateValueN) rotateX(-90deg); }' +
            '}' +

            '@-webkit-keyframes rotateDown {' +
            '0% { -webkit-transform: translateZ(translateValueN) rotateX(0); -webkit-animation-timing-function: linear; }' +
            '50% { -webkit-transform: translateZ(translateValueN) rotateX(92deg); -webkit-animation-timing-function: ease-in; }' +
            '70% { -webkit-transform: translateZ(translateValueN) rotateX(84deg); -webkit-animation-timing-function: ease-in; }' +
            '80% { -webkit-transform: translateZ(translateValueN) rotateX(90deg); -webkit-animation-timing-function: ease-in; }' +
            '95% { -webkit-transform: translateZ(translateValueN) rotateX(88deg); -webkit-animation-timing-function: ease-in; }' +
            '100% { -webkit-transform:  translateZ(translateValueN) rotateX(90deg); }' +
            '}' +

            '@-webkit-keyframes rotateLeft {' +
            '0% { -webkit-transform: translateZ(translateValueN) rotateY(0deg); -webkit-animation-timing-function: linear; }' +
            '50% { -webkit-transform: translateZ(translateValueN) rotateY(92deg); -webkit-animation-timing-function: ease-in; }' +
            '70% { -webkit-transform: translateZ(translateValueN) rotateY(84deg); -webkit-animation-timing-function: ease-in; }' +
            '80% { -webkit-transform: translateZ(translateValueN) rotateY(90deg); -webkit-animation-timing-function: ease-in; }' +
            '95% { -webkit-transform: translateZ(translateValueN) rotateY(88deg); -webkit-animation-timing-function: ease-in; }' +
            '100% { -webkit-transform:  translateZ(translateValueN) rotateY(90deg); }' +
            '}' +

            '@-webkit-keyframes rotateRight {' +
            '0% { -webkit-transform: translateZ(translateValueN) rotateY(0deg); -webkit-animation-timing-function: linear; }' +
            '50% { -webkit-transform: translateZ(translateValueN) rotateY(-92deg); -webkit-animation-timing-function: ease-in; }' +
            '70% { -webkit-transform: translateZ(translateValueN) rotateY(-84deg); -webkit-animation-timing-function: ease-in; }' +
            '80% { -webkit-transform: translateZ(translateValueN) rotateY(-90deg); -webkit-animation-timing-function: ease-in; }' +
            '95% { -webkit-transform: translateZ(translateValueN) rotateY(-88deg); -webkit-animation-timing-function: ease-in; }' +
            '100% { -webkit-transform:  translateZ(translateValueN) rotateY(-90deg); }' +
            '}' +

            // Mozilla FireFox
            '@-moz-keyframes rotateUp {' +
            '0% { -moz-transform: translateZ(translateValueN) rotateX(0); -moz-animation-timing-function: linear; }' +
            '50% { -moz-transform: translateZ(translateValueN) rotateX(-92deg); -moz-animation-timing-function: ease-in; }' +
            '70% { -moz-transform: translateZ(translateValueN) rotateX(-84deg); -moz-animation-timing-function: ease-in; }' +
            '80% { -moz-transform: translateZ(translateValueN) rotateX(-90deg); -moz-animation-timing-function: ease-in; }' +
            '95% { -moz-transform: translateZ(translateValueN) rotateX(-88deg); -moz-animation-timing-function: ease-in; }' +
            '100% { -moz-transform:  translateZ(translateValueN) rotateX(-90deg); }' +
            '}' +

            '@-moz-keyframes rotateDown {' +
            '0% { -moz-transform: translateZ(translateValueN) rotateX(0); -moz-animation-timing-function: linear; }' +
            '50% { -moz-transform: translateZ(translateValueN) rotateX(92deg); -moz-animation-timing-function: ease-in; }' +
            '70% { -moz-transform: translateZ(translateValueN) rotateX(84deg); -moz-animation-timing-function: ease-in; }' +
            '80% { -moz-transform: translateZ(translateValueN) rotateX(90deg); -moz-animation-timing-function: ease-in; }' +
            '95% { -moz-transform: translateZ(translateValueN) rotateX(88deg); -moz-animation-timing-function: ease-in; }' +
            '100% { -moz-transform:  translateZ(translateValueN) rotateX(90deg); }' +
            '}' +

            '@-moz-keyframes rotateLeft {' +
            '0% { -moz-transform: translateZ(translateValueN) rotateY(0deg); -moz-animation-timing-function: linear; }' +
            '50% { -moz-transform: translateZ(translateValueN) rotateY(92deg); -moz-animation-timing-function: ease-in; }' +
            '70% { -moz-transform: translateZ(translateValueN) rotateY(84deg); -moz-animation-timing-function: ease-in; }' +
            '80% { -moz-transform: translateZ(translateValueN) rotateY(90deg); -moz-animation-timing-function: ease-in; }' +
            '95% { -moz-transform: translateZ(translateValueN) rotateY(88deg); -moz-animation-timing-function: ease-in; }' +
            '100% { -moz-transform:  translateZ(translateValueN) rotateY(90deg); }' +
            '}' +

            '@-moz-keyframes rotateRight {' +
            '0% { -moz-transform: translateZ(translateValueN) rotateY(0deg); -moz-animation-timing-function: linear; }' +
            '50% { -moz-transform: translateZ(translateValueN) rotateY(-92deg); -moz-animation-timing-function: ease-in; }' +
            '70% { -moz-transform: translateZ(translateValueN) rotateY(-84deg); -moz-animation-timing-function: ease-in; }' +
            '80% { -moz-transform: translateZ(translateValueN) rotateY(-90deg); -moz-animation-timing-function: ease-in; }' +
            '95% { -moz-transform: translateZ(translateValueN) rotateY(-88deg); -moz-animation-timing-function: ease-in; }' +
            '100% { -moz-transform:  translateZ(translateValueN) rotateY(-90deg); }' +
            '}' +

            '</style>';

        var container = $('#container1');
        var elementHeight = container.height();
        var elementWidth = container.width();


        if (this.direction == 'up') {
            cssStr = cssStr.replace(/keyfarmeName/g, 'rotateUp');
            cssStr = cssStr.replace(/nextElementInitialTransform/g, 'rotateX(90deg)');
            cssStr = cssStr.replace(/translateValueN/g, '-' + (elementHeight / 2) + 'px');
            cssStr = cssStr.replace(/translateValueP/g, '+' + (elementHeight / 2) + 'px');
        }

        else if (this.direction == 'down') {
            cssStr = cssStr.replace(/keyfarmeName/g, 'rotateDown');
            cssStr = cssStr.replace(/nextElementInitialTransform/g, 'rotateX(-90deg)');
            cssStr = cssStr.replace(/translateValueN/g, '-' + (elementHeight / 2) + 'px');
            cssStr = cssStr.replace(/translateValueP/g, '+' + (elementHeight / 2) + 'px');
        }
        else if (this.direction == 'left') {
            cssStr = cssStr.replace(/keyfarmeName/g, 'rotateLeft');
            cssStr = cssStr.replace(/nextElementInitialTransform/g, 'rotateY(-90deg)');
            cssStr = cssStr.replace(/translateValueN/g, '-' + (elementWidth / 2) + 'px');
            cssStr = cssStr.replace(/translateValueP/g, '+' + (elementWidth / 2) + 'px');

        }
        else if (this.direction == 'right') {
            cssStr = cssStr.replace(/keyfarmeName/g, 'rotateRight');
            cssStr = cssStr.replace(/nextElementInitialTransform/g, 'rotateY(90deg)');
            cssStr = cssStr.replace(/translateValueN/g, '-' + (elementWidth / 2) + 'px');
            cssStr = cssStr.replace(/translateValueP/g, '+' + (elementWidth / 2) + 'px');
        }

        cssStr = cssStr.replace(/speed/g, this.speed + 'ms');
        $('body').css({overflow:'hidden'});
        $('head').append(cssStr);

        if (currentElement == null) {
            $(nextElement).addClass('next').css({opacity:1, zIndex:11, display:'block'});
            container.addClass('animate');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible');
                $('body').css({overflow:''});
                $('#shetabEffect').remove();
                $(nextElement).removeClass('next').css({opacity:'', zIndex:'', display:''});
                callback();
            }, (this.speed + 500));
        }
        else {
            $(currentElement).addClass('current').css({ zIndex:11, display:'block'});
            $(nextElement).addClass('next').css({opacity:1, zIndex:11, display:'block'});
            container.addClass('animate');
            setTimeout(function () {
                $(currentElement).animate({opacity:0}, 200, 'linear', function () {
                    $(currentElement).addClass('invisible').removeClass('visible');
                    $(nextElement).removeClass('invisible').addClass('visible');
                    $('body').css({overflow:''});
                    $('#shetabEffect').remove();
                    $(currentElement).removeClass('current').css({opacity:'', zIndex:'', display:''});
                    $(nextElement).removeClass('next').css({opacity:'', zIndex:'', display:''});
                    callback();
                });

            }, (this.speed + 500));
        }
    }
};

/*-----------Steps--------------*/
// Webkit Based Only Last Update 11/5/2012
shetabEffect.Steps = function () {
    this.speed = 2500;
    this.direction = 'down';
};

shetabEffect.Steps.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };
        $('#shetabEffect').remove();
        var cssStr = '<style id="shetabEffect">.shetabEffect_Steps{' +
            'maskData ' +
            '-webkit-animation: steps speed ;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;}' +

            '@-webkit-keyframes steps {keyframeData}' +
            '</style>';
        $(nextElement).css({display:'block'});

        if (this.direction == 'up') {
            cssStr = cssStr.replace(/maskData/gi, '-webkit-mask-image: ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 0.5)), color-stop(54.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(54.5%, rgba(0, 0, 0, 0.5)), color-stop(59%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(59%, rgba(0, 0, 0, 0.5)), color-stop(63.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(63.5%, rgba(0, 0, 0, 0.5)), color-stop(68%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(68%, rgba(0, 0, 0, 0.5)), color-stop(72.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(72.5%, rgba(0, 0, 0, 0.5)), color-stop(77%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(77%, rgba(0, 0, 0, 0.5)), color-stop(81.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(81.5%, rgba(0, 0, 0, 0.5)), color-stop(86%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(86%, rgba(0, 0, 0, 0.5)), color-stop(90.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(90.5%, rgba(0, 0, 0, 0.5)), color-stop(95%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(95%, rgba(0, 0, 0, 0.5)), color-stop(99.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0)));' +
                '-webkit-mask-size: 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%;' +
                '-webkit-mask-position: 0% 200%, 11% 200%, 22% 200%, 33% 200%, 44% 200%, 55% 200%, 66% 200%, 77% 200%, 88% 200%, 99% 200%, 110% 200%;' +
                '-webkit-mask-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;');
            cssStr = cssStr.replace(/keyframeData/gi, ' ' +
                '0% {' +
                '-webkit-mask-position: 0% 200%, 11% 200%, 22% 200%, 33% 200%, 44% 200%, 55% 200%, 66% 200%, 77% 200%, 88% 200%, 99% 200%, 110% 200%;' +
                '}' +
                '100% {' +
                '-webkit-mask-position: 0% 0%, 11% 0%, 22% 0%, 33% 0%, 44% 0%, 55% 0%, 66% 0%, 77% 0%, 88% 0%, 99% 0%, 110% 0%' +
                '}' +
                '}');
        }

        else if (this.direction == 'down') {
            cssStr = cssStr.replace(/maskData/gi, '-webkit-mask-image: ' +
                '-webkit-gradient(linear, left bottom, left top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 0.5)), color-stop(54.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left bottom, left top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(54.5%, rgba(0, 0, 0, 0.5)), color-stop(59%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left bottom, left top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(59%, rgba(0, 0, 0, 0.5)), color-stop(63.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left bottom, left top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(63.5%, rgba(0, 0, 0, 0.5)), color-stop(68%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left bottom, left top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(68%, rgba(0, 0, 0, 0.5)), color-stop(72.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left bottom, left top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(72.5%, rgba(0, 0, 0, 0.5)), color-stop(77%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left bottom, left top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(77%, rgba(0, 0, 0, 0.5)), color-stop(81.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left bottom, left top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(81.5%, rgba(0, 0, 0, 0.5)), color-stop(86%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left bottom, left top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(86%, rgba(0, 0, 0, 0.5)), color-stop(90.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left bottom, left top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(90.5%, rgba(0, 0, 0, 0.5)), color-stop(95%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0))), ' +
                '-webkit-gradient(linear, left bottom, left top, color-stop(0%, rgba(0, 0, 0, 1)), color-stop(50%, rgba(0, 0, 0, 1)), color-stop(95%, rgba(0, 0, 0, 0.5)), color-stop(99.5%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(0, 0, 0, 0)));' +
                '-webkit-mask-size: 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%, 10% 200%;' +
                '-webkit-mask-position: 0% -100%, 11% -100%, 22% -100%, 33% -100%, 44% -100%, 55% -100%, 66% -100%, 77% -100%, 88% -100%, 99% -100%, 110% -100%;' +
                '-webkit-mask-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;');
            cssStr = cssStr.replace(/keyframeData/gi, ' ' +
                '0% {' +
                ' -webkit-mask-position: 0% -100%, 11% -100%, 22% -100%, 33% -100%, 44% -100%, 55% -100%, 66% -100%, 77% -100%, 88% -100%, 99% -100%, 110% -100%;' +
                '}' +
                '100% {' +
                '-webkit-mask-position: 0% 100%, 11% 100%, 22% 100%, 33% 100%, 44% 100%, 55% 100%, 66% 100%, 77% 100%, 88% 100%, 99% 100%, 110% 100%;' +
                '}' +
                '}');
        }


        cssStr = cssStr.replace(/speed/g, (this.speed ) + 'ms');

        $('head').append(cssStr);

        if (currentElement == null) {
            $(nextElement).css({zIndex:11, opacity:1, display:'block'}).addClass('shetabEffect_Steps');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_Steps').css({opacity:'', zIndex:'', display:''});
                callback();
            }, this.speed);
        }
        else {
            $(nextElement).css({ opacity:1, display:'block'}).addClass('shetabEffect_Steps');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_Steps').css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').css({opacity:'', zIndex:'', display:''});
                callback();
            }, this.speed);
        }
    }
};

/*-----------Bars--------------*/
// Webkit Based Only Last Update 11/5/2012
shetabEffect.Bars = function () {
    this.speed = 2000;
    this.direction = 'horizontal';
};

shetabEffect.Bars.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };
        $('#shetabEffect').remove();
        var cssStr = '<style id="shetabEffect">.shetabEffect_Bars{' +
            'maskData ' +
            '-webkit-animation: steps speed ;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;}' +

            '@-webkit-keyframes steps {keyframeData}' +
            '</style>';
        $(nextElement).css({display:'block'});

        if (this.direction == 'vertical') {
            cssStr = cssStr.replace(/maskData/gi, '-webkit-mask-image: ' +
                '-webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, right top, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0)));' +
                '-webkit-mask-size: 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%, 0% 100%,0% 100%;' +
                '-webkit-mask-position: 0% 0%, 11% 0%, 22% 0%, 33% 0%, 44% 0%, 55% 0%, 66% 0%, 77% 0%, 88% 0%, 99% 0%, 110% 0%;' +
                '-webkit-mask-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;');
            cssStr = cssStr.replace(/keyframeData/gi, ' ' +
                '0% {' +
                '-webkit-mask-position: 0% 0%, 11% 0%, 22% 0%, 33% 0%, 44% 0%, 55% 0%, 66% 0%, 77% 0%, 88% 0%, 99% 0%, 110% 0%;' +
                '-webkit-mask-position: 0% 0%, 11% 0%, 22% 0%, 33% 0%, 44% 0%, 55% 0%, 66% 0%, 77% 0%, 88% 0%, 99% 0%, 110% 0%;' +
                '}' +
                '100% {' +
                '-webkit-mask-size: 25% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 100%, 20% 100%,20% 100%;' +
                '-webkit-mask-position: -10% 0%, 11% 0%, 22% 0%, 33% 0%, 44% 0%, 55% 0%, 66% 0%, 77% 0%, 88% 0%, 99% 0%, 110% 0%;' +
                '}' +
                '}');
        }

        else if (this.direction == 'horizontal') {
            cssStr = cssStr.replace(/maskData/gi, '-webkit-mask-image: ' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0))),' +
                '-webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(0,0,0,0)), color-stop(10%,rgba(0,0,0,0.8)), color-stop(30%,rgba(0,0,0,1)), color-stop(50%,rgba(0,0,0,1)), color-stop(70%,rgba(0,0,0,1)), color-stop(90%,rgba(0,0,0,0.8)), color-stop(100%,rgba(0,0,0,0)));' +
                '-webkit-mask-size: 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%,100% 0%;' +
                '-webkit-mask-position: 0% 0%, 0% 11% , 0% 22%, 0% 33%, 0% 44%, 0% 55%, 0% 66%, 0% 77%, 0% 88%, 0% 99%, 0% 110%;' +
                '-webkit-mask-repeat: no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat, no-repeat;');
            cssStr = cssStr.replace(/keyframeData/gi, ' ' +
                '0% {' +
                '-webkit-mask-size: 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%,100% 0%;' +
                '-webkit-mask-position: 0% 0%, 0% 11% , 0% 22%, 0% 33%, 0% 44%, 0% 55%, 0% 66%, 0% 77%, 0% 88%, 0% 99%, 0% 110%;' +
                '}' +
                '100% {' +
                '-webkit-mask-size: 100% 25%, 100% 20%, 100% 20%,100% 20% ,100% 20% ,100% 20% ,100% 20% ,100% 20% ,100% 20% ,100% 20%, 100% 20%;' +
                '-webkit-mask-position: 0% -10%, 0% 11%, 0% 22%, 0% 33%, 0% 44%, 0% 55%, 0% 66%, 0% 77%, 0% 88%, 0% 99%, 0% 110%;' +
                '}' +
                '}');
        }

        cssStr = cssStr.replace(/speed/g, (this.speed ) + 'ms');

        $('head').append(cssStr);

        if (currentElement == null) {
            $(nextElement).css({zIndex:11, opacity:1, display:'block'}).addClass('shetabEffect_Bars');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_Bars').css({opacity:'', zIndex:'', display:''});
                callback();
            }, this.speed);
        }
        else {
            $(nextElement).css({ opacity:1, display:'block'}).addClass('shetabEffect_Bars');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_Bars').css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').css({opacity:'', zIndex:'', display:''});
                callback();
            }, this.speed);
        }
    }
};

/*-----------Spiral Right--------------*/
shetabEffect.SpiralRight = function () {
    this.speed = 2500;
};

shetabEffect.SpiralRight.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };

        $('#shetabEffect').remove();
        var cssStr = '<style id="shetabEffect">' +
            '.shetabEffect_SpiralRightIn{' +

            // Webkit Based
            '-webkit-animation: SpiralRightIn speed;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +

            // IE
            '-ms-animation: SpiralRightIn speed;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +

            // Mozilla FireFox
            '-moz-animation: SpiralRightIn speed;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +

            '}' +
            '.shetabEffect_SpiralRightOut{' +

            // Webkit Based
            '-webkit-animation: SpiralRightOut speed;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +

            // IE
            '-ms-animation: SpiralRightOut speed;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +

            // Mozilla FireFox
            '-moz-animation: SpiralRightOut speed;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +
            '}' +

            // Webkit Based
            '@-webkit-keyframes SpiralRightOut {' +
            '0% {' +
            '-webkit-transform: scale(1) rotate(0deg) translate(-150px) rotate(0deg);' +
            '-webkit-transform-origin: 100% 100%;' +
            '}' +
            '100% {' +
            '-webkit-transform: scale(0) rotate(990deg) translate(-150px) rotate(-990deg);' +
            '-webkit-transform-origin: 200% 200%;' +
            '}' +
            '}' +
            '@-webkit-keyframes SpiralRightIn {' +
            '0% {' +
            '-webkit-transform: scale(0) rotate(990deg) translate(-150px) rotate(-990deg);' +
            '-webkit-transform-origin: 200% 200%;' +
            '}' +
            '80% {' +
            '-webkit-transform: scale(1) rotate(25deg) translate(-25px) rotate(-25deg);' +
            '-webkit-transform-origin: 100% 100%;' +
            '}' +
            '100%{' +
            '-webkit-transform: scale(1) rotate(0deg) translate(0) rotate(0deg);' +
            '-webkit-transform-origin: 100% 100%;' +
            '}' +
            '}' +

            // IE
            '@-ms-keyframes SpiralRightOut {' +
            '0% {' +
            '-ms-transform: scale(1) rotate(0deg) translate(-150px) rotate(0deg);' +
            '-ms-transform-origin: 100% 100%;' +
            '}' +
            '100% {' +
            '-ms-transform: scale(0) rotate(990deg) translate(-150px) rotate(-990deg);' +
            '-ms-transform-origin: 200% 200%;' +
            '}' +
            '}' +
            '@-ms-keyframes SpiralRightIn {' +
            '0% {' +
            '-ms-transform: scale(0) rotate(990deg) translate(-150px) rotate(-990deg);' +
            '-ms-transform-origin: 200% 200%;' +
            '}' +
            '80% {' +
            '-ms-transform: scale(1) rotate(25deg) translate(-25px) rotate(-25deg);' +
            '-ms-transform-origin: 100% 100%;' +
            '}' +
            '100%{' +
            '-ms-transform: scale(1) rotate(0deg) translate(0) rotate(0deg);' +
            '-ms-transform-origin: 100% 100%;' +
            '}' +
            '}' +

            // Mozilla FireFox
            '@-moz-keyframes SpiralRightOut {' +
            '0% {' +
            '-moz-transform: scale(1) rotate(0deg) translate(-150px) rotate(0deg);' +
            '-moz-transform-origin: 100% 100%;' +
            '}' +
            '100% {' +
            '-moz-transform: scale(0) rotate(990deg) translate(-150px) rotate(-990deg);' +
            '-moz-transform-origin: 200% 200%;' +
            '}' +
            '}' +
            '@-moz-keyframes SpiralRightIn {' +
            '0% {' +
            '-moz-transform: scale(0) rotate(990deg) translate(-150px) rotate(-990deg);' +
            '-moz-transform-origin: 200% 200%;' +
            '}' +
            '80% {' +
            '-moz-transform: scale(1) rotate(25deg) translate(-25px) rotate(-25deg);' +
            '-moz-transform-origin: 100% 100%;' +
            '}' +
            '100%{' +
            '-moz-transform: scale(1) rotate(0deg) translate(0) rotate(0deg);' +
            '-moz-transform-origin: 100% 100%;' +
            '}' +
            '}' +
            '</style>';
        cssStr = cssStr.replace(/speed/gi, this.speed + 'ms');

        $('head').append(cssStr);

        $('body').css({overflow:'hidden'});
        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_SpiralRightIn');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_SpiralRightIn')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();
            }, this.speed + 500);
        }
        else {
            $(nextElement).css({ zIndex:10, display:'block', opacity:'1'}).addClass('shetabEffect_SpiralRightIn');
            $(currentElement).css({ zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_SpiralRightOut');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_SpiralRightIn')
                    .css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_SpiralRightOut')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();

            }, this.speed + 500);
        }

    }
};

/*-----------Spiral Left--------------*/
shetabEffect.SpiralLeft = function () {
    this.speed = 2500;
};

shetabEffect.SpiralLeft.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };

        $('#shetabEffect').remove();
        var cssStr = '<style id="shetabEffect">' +
            '.shetabEffect_SpiralLeftIn{' +

            // Webkit Based
            '-webkit-animation: SpiralLeftIn speed;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +

            // IE
            '-ms-animation: SpiralLeftIn speed;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +

            // Mozilla FireFox
            '-moz-animation: SpiralLeftIn speed;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +

            '}' +
            '.shetabEffect_SpiralLeftOut{' +

            // Webkit Based
            '-webkit-animation: SpiralLeftOut speed;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +

            // IE
            '-ms-animation: SpiralLeftOut speed;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +

            // Mozilla FireFox
            '-moz-animation: SpiralLeftOut speed;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +
            '}' +

            // Webkit Based
            '@-webkit-keyframes SpiralLeftOut {' +
            '0% {' +
            '-webkit-transform: scale(1) rotate(0deg) translate(150px) rotate(0deg);' +
            '-webkit-transform-origin: 0% 0%;' +
            '}' +
            '100% {' +
            '-webkit-transform: scale(0) rotate(990deg) translate(150px) rotate(-990deg);' +
            '-webkit-transform-origin: -100% -100%;' +
            '}' +
            '}' +
            '@-webkit-keyframes SpiralLeftIn {' +
            '0% {' +
            '-webkit-transform: scale(0) rotate(990deg) translate(150px) rotate(-990deg);' +
            '-webkit-transform-origin: -100% -100%;' +
            '}' +
            '80% {' +
            '-webkit-transform: scale(1) rotate(25deg) translate(25px) rotate(-25deg);' +
            '-webkit-transform-origin: -100% -100%;' +
            '}' +
            '100%{' +
            '-webkit-transform: scale(1) rotate(0deg) translate(0) rotate(0deg);' +
            '-webkit-transform-origin: 0% 0%;' +
            '}' +
            '}' +

            // IE
            '@-ms-keyframes SpiralLeftOut {' +
            '0% {' +
            '-ms-transform: scale(1) rotate(0deg) translate(150px) rotate(0deg);' +
            '-ms-transform-origin: 0% 0%;' +
            '}' +
            '100% {' +
            '-ms-transform: scale(0) rotate(990deg) translate(150px) rotate(-990deg);' +
            '-ms-transform-origin: -100% -100%;' +
            '}' +
            '}' +
            '@-ms-keyframes SpiralLeftIn {' +
            '0% {' +
            '-ms-transform: scale(0) rotate(990deg) translate(150px) rotate(-990deg);' +
            '-ms-transform-origin: -100% -100%;' +
            '}' +
            '80% {' +
            '-ms-transform: scale(1) rotate(25deg) translate(25px) rotate(-25deg);' +
            '-ms-transform-origin: -100% -100%;' +
            '}' +
            '100%{' +
            '-ms-transform: scale(1) rotate(0deg) translate(0) rotate(0deg);' +
            '-ms-transform-origin: 0% 0%;' +
            '}' +
            '}' +

            // Mozilla FireFox
            '@-moz-keyframes SpiralLeftOut {' +
            '0% {' +
            '-moz-transform: scale(1) rotate(0deg) translate(150px) rotate(0deg);' +
            '-moz-transform-origin: 0% 0%;' +
            '}' +
            '100% {' +
            '-moz-transform: scale(0) rotate(990deg) translate(150px) rotate(-990deg);' +
            '-moz-transform-origin: -100% -100%;' +
            '}' +
            '}' +
            '@-moz-keyframes SpiralLeftIn {' +
            '0% {' +
            '-moz-transform: scale(0) rotate(990deg) translate(150px) rotate(-990deg);' +
            '-moz-transform-origin: -100% -100%;' +
            '}' +
            '80% {' +
            '-moz-transform: scale(1) rotate(25deg) translate(25px) rotate(-25deg);' +
            '-moz-transform-origin: -100% -100%;' +
            '}' +
            '100%{' +
            '-moz-transform: scale(1) rotate(0deg) translate(0) rotate(0deg);' +
            '-moz-transform-origin: 0% 0%;' +
            '}' +
            '}' +
            '</style>';
        cssStr = cssStr.replace(/speed/gi, this.speed + 'ms');

        $('head').append(cssStr);

        $('body').css({overflow:'hidden'});
        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_SpiralLeftIn');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_SpiralLeftIn')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();
            }, this.speed + 500);
        }
        else {
            $(nextElement).css({ zIndex:10, display:'block', opacity:'1'}).addClass('shetabEffect_SpiralLeftIn');
            $(currentElement).css({ zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_SpiralLeftOut');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_SpiralLeftIn')
                    .css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_SpiralLeftOut')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();

            }, this.speed + 500);
        }

    }
};

/*-----------Rotate Same Origin--------------*/
shetabEffect.RotateSameOrigin = function () {
    this.speed = 2500;
    this.origin = 'topCenter';
};

shetabEffect.RotateSameOrigin.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };

        $('#shetabEffect').remove();
        var cssStr = '<style id="shetabEffect">' +
            '.shetabEffect_RotateIn{' +

            // Webkit Based
            '-webkit-animation: RotateIn speed;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +

            // IE Based
            '-ms-animation: RotateIn speed;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +

            // Mozilla FireFox
            '-moz-animation: RotateIn speed;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +

            '}' +
            '.shetabEffect_RotateOut{' +

            // Webkit Based
            '-webkit-animation: RotateOut speed;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +

            // IE
            '-ms-animation: RotateOut speed;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +

            // Mozilla FireFox
            '-moz-animation: RotateOut speed;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +

            '}' +

            // Webkit Based
            '@-webkit-keyframes RotateOut {' +
            '0% {' +
            '-webkit-transform: rotate(0deg);' +
            '-webkit-transform-origin: transformOrigin ;' +
            '}' +
            '100% {' +
            '-webkit-transform: rotate(180deg);' +
            '-webkit-transform-origin: transformOrigin ;' +
            '}' +
            '}' +
            '@-webkit-keyframes RotateIn {' +
            '0% {' +
            '-webkit-transform: rotate(180deg);' +
            '-webkit-transform-origin: transformOrigin ;' +
            '}' +
            '100%{' +
            '-webkit-transform: rotate(360deg);' +
            '-webkit-transform-origin: transformOrigin ;' +
            '}' +
            '}' +

            // IE
            '@-ms-keyframes RotateOut {' +
            '0% {' +
            '-ms-transform: rotate(0deg);' +
            '-ms-transform-origin: transformOrigin ;' +
            '}' +
            '100% {' +
            '-ms-transform: rotate(180deg);' +
            '-ms-transform-origin: transformOrigin ;' +
            '}' +
            '}' +
            '@-ms-keyframes RotateIn {' +
            '0% {' +
            '-ms-transform: rotate(180deg);' +
            '-ms-transform-origin: transformOrigin ;' +
            '}' +
            '100%{' +
            '-ms-transform: rotate(360deg);' +
            '-ms-transform-origin: transformOrigin ;' +
            '}' +
            '}' +

            // Mozilla FireFox
            '@-moz-keyframes RotateOut {' +
            '0% {' +
            '-moz-transform: rotate(0deg);' +
            '-moz-transform-origin: transformOrigin ;' +
            '}' +
            '100% {' +
            '-moz-transform: rotate(180deg);' +
            '-moz-transform-origin: transformOrigin ;' +
            '}' +
            '}' +
            '@-moz-keyframes RotateIn {' +
            '0% {' +
            '-moz-transform: rotate(180deg);' +
            '-moz-transform-origin: transformOrigin ;' +
            '}' +
            '100%{' +
            '-moz-transform: rotate(360deg);' +
            '-moz-transform-origin: transformOrigin ;' +
            '}' +
            '}' +
            '</style>';


        if (this.origin == 'bottomCenter') {
            cssStr = cssStr.replace(/transformOrigin/gi, '50% 100%');
        }

        else if (this.origin == 'topCenter') {
            cssStr = cssStr.replace(/transformOrigin/gi, '50% 0%');
        }

        cssStr = cssStr.replace(/speed/gi, this.speed + 'ms');

        $('head').append(cssStr);

        $('body').css({overflow:'hidden'});
        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_RotateIn');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_RotateIn')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();
            }, this.speed + 500);
        }
        else {
            $(nextElement).css({ zIndex:10, display:'block', opacity:'1'}).addClass('shetabEffect_RotateIn');
            $(currentElement).css({ zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_RotateOut');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_RotateIn')
                    .css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_RotateOut')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();

            }, this.speed + 500);
        }

    }
};

/*-----------RotateOppositeOrigin--------------*/
shetabEffect.RotateOppositeDirection = function () {
    this.speed = 2500;
    this.origin = 'topCenter';
};

shetabEffect.RotateOppositeDirection.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };

        $('#shetabEffect').remove();
        var cssStr = '<style id="shetabEffect">' +
            '.shetabEffect_RotateIn{' +

            // Webkit Based
            '-webkit-animation: RotateIn speed;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +

            // IE
            '-ms-animation: RotateIn speed;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +

            // Mozilla FireFox
            '-moz-animation: RotateIn speed;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +


            '}' +

            '.shetabEffect_RotateOut{' +

            //Webkit Based
            '-webkit-animation: RotateOut speed;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +

            // IE
            '-ms-animation: RotateOut speed;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +

            // Mozilla FireFox
            '-moz-animation: RotateOut speed;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +

            '}' +

            // Webkit Based
            '@-webkit-keyframes RotateOut {' +
            '0% {' +
            '-webkit-transform: rotate(0deg);' +
            '-webkit-transform-origin: transformOriginOut ;' +
            '}' +
            '100% {' +
            '-webkit-transform: rotate(180deg);' +
            '-webkit-transform-origin: transformOriginOut ;' +
            '}' +
            '}' +
            '@-webkit-keyframes RotateIn {' +
            '0% {' +
            '-webkit-transform: rotate(180deg);' +
            '-webkit-transform-origin: transformOriginIn ;' +
            '}' +
            '100%{' +
            '-webkit-transform: rotate(0deg);' +
            '-webkit-transform-origin: transformOriginIn ;' +
            '}' +
            '}' +


            // IE
            '@-ms-keyframes RotateOut {' +
            '0% {' +
            '-ms-transform: rotate(0deg);' +
            '-ms-transform-origin: transformOriginOut ;' +
            '}' +
            '100% {' +
            '-ms-transform: rotate(180deg);' +
            '-ms-transform-origin: transformOriginOut ;' +
            '}' +
            '}' +
            '@-ms-keyframes RotateIn {' +
            '0% {' +
            '-ms-transform: rotate(180deg);' +
            '-ms-transform-origin: transformOriginIn ;' +
            '}' +
            '100%{' +
            '-ms-transform: rotate(0deg);' +
            '-ms-transform-origin: transformOriginIn ;' +
            '}' +
            '}' +


            // Mozilla FireFox
            '@-moz-keyframes RotateOut {' +
            '0% {' +
            '-moz-transform: rotate(0deg);' +
            '-moz-transform-origin: transformOriginOut ;' +
            '}' +
            '100% {' +
            '-moz-transform: rotate(180deg);' +
            '-moz-transform-origin: transformOriginOut ;' +
            '}' +
            '}' +
            '@-moz-keyframes RotateIn {' +
            '0% {' +
            '-moz-transform: rotate(180deg);' +
            '-moz-transform-origin: transformOriginIn ;' +
            '}' +
            '100%{' +
            '-moz-transform: rotate(0deg);' +
            '-moz-transform-origin: transformOriginIn ;' +
            '}' +
            '}' +
            '</style>';


        if (this.origin == 'bottomCenter') {
            cssStr = cssStr.replace(/transformOriginOut/gi, '50% 100%');
            cssStr = cssStr.replace(/transformOriginIn/gi, '50% 0%');
        }

        else if (this.origin == 'topCenter') {
            cssStr = cssStr.replace(/transformOriginOut/gi, '50% 0%');
            cssStr = cssStr.replace(/transformOriginIn/gi, '50% 100%');
        }

        cssStr = cssStr.replace(/speed/gi, this.speed + 'ms');

        $('head').append(cssStr);

        $('body').css({overflow:'hidden'});
        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_RotateIn');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_RotateIn')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();
            }, this.speed + 500);
        }
        else {
            $(nextElement).css({ zIndex:10, display:'block', opacity:'1'}).addClass('shetabEffect_RotateIn');
            $(currentElement).css({ zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_RotateOut');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_RotateIn')
                    .css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_RotateOut')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();

            }, this.speed + 500);
        }

    }
};

/*-----------Flip Vertical--------------*/
shetabEffect.FlipVertical = function () {
    this.speed = 1500;
    this.direction = 'up';
};

shetabEffect.FlipVertical.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };

        $('#shetabEffect').remove();
        var cssStr = '<style id="shetabEffect">' +
            '#container1{' +
            '-webkit-perspective: halfBodyHeight ;' +
            'perspective: halfBodyHeight px;' +
            '}' +
            '.shetabEffect_FlipVerticalIn{' +


            // Webkit based
            '-webkit-animation: FlipVerticalIn speed ' + ((currentElement == null) ? '' : 'delay') + ';' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +
            '-webkit-transform:rotate3d(1,0,0, - 90deg);' +
            '-webkit-transform-origin: 0% 50%;' +

            // IE
            '-ms-backface-visibility: hidden;' +
            '-ms-animation: FlipVerticalIn speed ' + ((currentElement == null) ? '' : 'delay') + ';' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +
            '-ms-transform:perspective( halfBodyHeight px) rotateX(- 90deg);' +
            '-ms-transform-origin: 0% 50%;' +

            // Mozilla FireFox
            '-moz-animation: FlipVerticalIn speed ' + ((currentElement == null) ? '' : 'delay') + ';' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +
            '-moz-transform:rotateX(- 90deg);' +
            '-moz-transform-origin: 0% 50%;' +

            '}' +
            '.shetabEffect_FlipVerticalOut{' +

            // Webkit Based
            '-webkit-animation: FlipVerticalOut speed ;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +

            // IE
            '-ms-animation: FlipVerticalOut speed ;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +

            // Mozilla FireFox
            '-moz-animation: FlipVerticalOut speed ;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +

            '}' +

            // Webkit Based
            '@-webkit-keyframes FlipVerticalOut {' +
            '0% {' +
            '-webkit-transform:rotate3d(1,0,0,0deg);' +
            '-webkit-transform-origin: 0% 50%;' +
            '}' +
            '100% {' +
            '-webkit-transform:rotate3d(1,0,0, - 90deg);' +
            '-webkit-transform-origin: 0% 50%;' +
            '}' +
            '}' +
            '@-webkit-keyframes FlipVerticalIn {' +
            '0% {' +
            '-webkit-transform:rotate3d(1,0,0, - 90deg) scaleY(-1);' +
            '-webkit-transform-origin: 0% 50%;' +
            '}' +
            '100%{' +
            '-webkit-transform:rotate3d(1,0,0, - 180deg) scaleY(-1);' +
            '-webkit-transform-origin: 0% 50%;' +
            '}' +
            '}' +

            // IE
            '@-ms-keyframes FlipVerticalOut {' +
            '0% {' +
            '-ms-transform:perspective( halfBodyHeight px) rotateX(0deg);' +
            '-ms-transform-origin: 0% 50%;' +
            '}' +
            '100% {' +
            '-ms-transform:perspective( halfBodyHeight px) rotateX(- 90deg);' +
            '-ms-transform-origin: 0% 50%;' +
            '}' +
            '}' +
            '@-ms-keyframes FlipVerticalIn {' +
            '0% {' +
            '-ms-transform:perspective( halfBodyHeight px) rotateX(- 90deg) scaleY(-1);' +
            '-ms-transform-origin: 0% 50%;' +
            '}' +
            '100%{' +
            '-ms-transform:perspective( halfBodyHeight px) rotateX(- 180deg) scaleY(-1);' +
            '-ms-transform-origin: 0% 50%;' +
            '}' +
            '}' +

            // Mozilla FireFox
            '@-moz-keyframes FlipVerticalOut {' +
            '0% {' +
            '-moz-transform:rotateX(0deg);' +
            '-moz-transform-origin: 0% 50%;' +
            '}' +
            '100% {' +
            '-moz-transform:rotateX(- 90deg);' +
            '-moz-transform-origin: 0% 50%;' +
            '}' +
            '}' +
            '@-moz-keyframes FlipVerticalIn {' +
            '0% {' +
            '-moz-transform:rotateX(- 90deg) scaleY(-1);' +
            '-moz-transform-origin: 0% 50%;' +
            '}' +
            '100%{' +
            '-moz-transform:rotateX(- 180deg) scaleY(-1);' +
            '-moz-transform-origin: 0% 50%;' +
            '}' +
            '}' +
            '</style>';


        if (this.direction == 'down') {
            cssStr = cssStr.replace(/- /gi, '');
        }

        else if (this.direction == 'up') {
            cssStr = cssStr.replace(/- /gi, '-');
        }

        cssStr = cssStr.replace(/speed/gi, this.speed + 'ms');
        cssStr = cssStr.replace(/delay/gi, (this.speed ) + 'ms');
        cssStr = cssStr.replace(/halfBodyHeight /gi, $('body').height());


        $('head').append(cssStr);

        $('body').css({overflow:'hidden'});
        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_FlipVerticalIn');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_FlipVerticalIn')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();
            }, (this.speed * 2 ) + 500);
        }
        else {
            $(nextElement).css({ zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_FlipVerticalIn');
            $(currentElement).css({ zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_FlipVerticalOut');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_FlipVerticalIn')
                    .css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_FlipVerticalOut')
                    .css({opacity:'', zIndex:'', display:''});
                $('body').css({overflow:''});
                callback();

            }, (this.speed * 2 ) + 500);
        }

    }
};

/*-----------Flip Horizontal--------------*/
shetabEffect.FlipHorizontal = function () {
    this.speed = 1500;
    this.direction = 'left';
};

shetabEffect.FlipHorizontal.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };

        $('#shetabEffect').remove();
        var cssStr = '<style id="shetabEffect">' +
            '#container1{' +
            '-webkit-perspective: halfBodyWidth ;' +
            'perspective: halfBodyWidth px;' +
            '}' +

            '.shetabEffect_FlipVerticalIn{' +

            // Webkit based
            '-webkit-animation: FlipVerticalIn speed ' + ((currentElement == null) ? '' : 'delay') + ';' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +
            '-webkit-transform:rotate3d(0,1,0, - 90deg);' +
            '-webkit-transform-origin: 50% 0%;' +

            // IE
            '-ms-backface-visibility: hidden;' +
            '-ms-animation: FlipVerticalIn speed ' + ((currentElement == null) ? '' : 'delay') + ';' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +
            '-ms-transform: perspective(halfBodyWidth px) rotateY(- 90deg) scaleX(-1);' +
            '-ms-transform-origin: 50% 0%;' +

            // Mozilla FireFox
            '-moz-animation: FlipVerticalIn speed ' + ((currentElement == null) ? '' : 'delay') + ';' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +
            '-moz-transform:rotateY(- 90deg) scaleX(-1);' +
            '-moz-transform-origin: 50% 0%;' +

            '}' +
            '.shetabEffect_FlipVerticalOut{' +

            // Webkit based
            '-webkit-animation: FlipVerticalOut speed ;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +
            '-webkit-animation-timing-function: linear;' +

            // Mozilla FireFox
            '-moz-animation: FlipVerticalOut speed ;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '-moz-animation-timing-function: linear;' +

            // IE
            '-ms-animation: FlipVerticalOut speed ;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +
            '-ms-animation-timing-function: linear;' +
            '}' +

            // Webkit based
            '@-webkit-keyframes FlipVerticalOut {' +
            '0% {' +
            '-webkit-transform:rotate3d(0,1,0, 0deg);' +
            '-webkit-transform-origin: 50% 0%;' +
            '}' +
            '100% {' +
            '-webkit-transform:rotate3d(0,1,0, - 90deg);' +
            '-webkit-transform-origin: 50% 0%;' +
            '}' +
            '}' +
            '@-webkit-keyframes FlipVerticalIn {' +
            '0% {' +
            '-webkit-transform:rotate3d(0,1,0, - 90deg) scaleX(-1);' +
            '-webkit-transform-origin: 50% 0%;' +
            '}' +
            '100%{' +
            '-webkit-transform:rotate3d(0,1,0, - 180deg) scaleX(-1);' +
            '-webkit-transform-origin: 50% 0%;' +
            '}' +
            '}' +

            // IE
            '@-ms-keyframes FlipVerticalOut {' +
            '0% {' +
            '-ms-transform:perspective(halfBodyWidth px) rotateY(0deg);' +
            '-ms-transform-origin: 50% 0%;' +
            '}' +
            '100% {' +
            '-ms-transform:perspective(halfBodyWidth px) rotateY(- 90deg);' +
            '-ms-transform-origin: 50% 0%;' +
            '}' +
            '}' +
            '@-ms-keyframes FlipVerticalIn {' +
            '0% {' +
            '-ms-transform:perspective(halfBodyWidth px) rotateY(- 90deg) scaleX(-1);' +
            '-ms-transform-origin: 50% 0%;' +
            '}' +
            '100%{' +
            '-ms-transform:perspective(halfBodyWidth px) rotateY(- 180deg) scaleX(-1);' +
            '-ms-transform-origin: 50% 0%;' +
            '}' +
            '}' +

            // Mozilla FireFox
            '@-moz-keyframes FlipVerticalOut {' +
            '0% {' +
            '-moz-transform:rotateY(0deg);' +
            '-moz-transform-origin: 50% 0%;' +
            '}' +
            '100% {' +
            '-moz-transform:rotateY(- 90deg);' +
            '-moz-transform-origin: 50% 0%;' +
            '}' +
            '}' +
            '@-moz-keyframes FlipVerticalIn {' +
            '0% {' +
            '-moz-transform:rotateY(- 90deg) scaleX(-1);' +
            '-moz-transform-origin: 50% 0%;' +
            '}' +
            '100%{' +
            '-moz-transform:rotateY(- 180deg) scaleX(-1);' +
            '-moz-transform-origin: 50% 0%;' +
            '}' +
            '}' +

            '</style>';


        if (this.direction == 'left') {
            cssStr = cssStr.replace(/- /gi, '-');
        }

        else if (this.direction == 'right') {
            cssStr = cssStr.replace(/- /gi, '');
        }

        var body = $('body');

        cssStr = cssStr.replace(/speed/gi, this.speed + 'ms');
        cssStr = cssStr.replace(/delay/gi, (this.speed  ) + 'ms');
        cssStr = cssStr.replace(/halfBodyWidth /gi, body.width());

        $('head').append(cssStr);

        body.css({overflow:'hidden'});
        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_FlipVerticalIn');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_FlipVerticalIn')
                    .css({opacity:'', zIndex:'', display:''});
                body.css({overflow:''});
                callback();
            }, (this.speed ) + 500);
        }
        else {
            $(nextElement).css({ zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_FlipVerticalIn');
            $(currentElement).css({ zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_FlipVerticalOut');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_FlipVerticalIn')
                    .css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_FlipVerticalOut')
                    .css({opacity:'', zIndex:'', display:''});
                body.css({overflow:''});
                callback();

            }, (this.speed * 2 ) + 500);
        }

    }
};

/*-----------Zoom And Rotate--------------*/
shetabEffect.ZoomAndRotate = function () {
    this.speed = 1500;
};

shetabEffect.ZoomAndRotate.prototype =
{
    /**
     * @param currentElement is a jQuery object
     * @param nextElement is a jQuery object
     * @param [callback]
     */
    applyEffect:function (currentElement, nextElement, callback) {
        if (typeof(callback) == 'undefined') callback = function () {
        };

        $('#shetabEffect').remove();
        var cssStr = '<style id="shetabEffect">' +
            '.shetabEffect_ZoomAndRotateIn{' +

            // Webkit Based
            '-webkit-transform: rotate3d(0,0,1,90deg) scale(3);' +
            '-webkit-animation: ZoomAndRotateIn speed;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +

            // IE
            '-ms-transform: rotateZ(90deg) scale(3);' +
            '-ms-animation: ZoomAndRotateIn speed;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +

            // Mozilla FireFox
            '-moz-transform: rotateZ(90deg) scale(3);' +
            '-moz-animation: ZoomAndRotateIn speed;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            '}' +

            '.shetabEffect_ZoomAndRotateOut{ ' +
            // Webkit Based
            '-webkit-transform: rotate3d(0,0,0,0deg) scale(1);' +
            '-webkit-animation: ZoomAndRotateOut speed;' +
            '-webkit-animation-direction: normal;' +
            '-webkit-animation-iteration-count: 1;' +
            '-webkit-animation-fill-mode: forwards;' +

            // IE
            '-ms-transform: rotateZ(0deg) scale(1);' +
            '-ms-animation: ZoomAndRotateOut speed;' +
            '-ms-animation-direction: normal;' +
            '-ms-animation-iteration-count: 1;' +
            '-ms-animation-fill-mode: forwards;' +

            // Mozilla FireFox
            '-moz-transform: rotateZ(0deg) scale(1);' +
            '-moz-animation: ZoomAndRotateOut speed;' +
            '-moz-animation-direction: normal;' +
            '-moz-animation-iteration-count: 1;' +
            '-moz-animation-fill-mode: forwards;' +
            
            '}' +

            // Webkit Based
            '@-webkit-keyframes ZoomAndRotateOut {' +
            '0% {' +
            'opacity: 1;' +
            '-webkit-transform: rotate3d(0,0,0,0deg) scale(1);' +
            '}' +

            '100% {' +
            'opacity: 0;' +
            '-webkit-transform: rotate3d(0,0,1,90deg) scale(3);' +
            '}' +
            '}' +

            '@-webkit-keyframes ZoomAndRotateIn {' +
            '0% {' +
            'opacity: 0;' +
            '-webkit-transform: rotate3d(0,0,1,90deg) scale(3);' +
            '}' +

            '100% {' +
            'opacity: 1;' +
            '-webkit-transform: rotate3d(0,0,0,0deg) scale(1);' +
            '}' +
            '}' +

            // IE
            '@-ms-keyframes ZoomAndRotateOut {' +
            '0% {' +
            'opacity: 1;' +
            '-ms-transform: rotateZ(0deg) scale(1);' +
            '}' +

            '100% {' +
            'opacity: 0;' +
            '-ms-transform: rotateZ(90deg) scale(3);' +
            '}' +
            '}' +

            '@-ms-keyframes ZoomAndRotateIn {' +
            '0% {' +
            'opacity: 0;' +
            '-ms-transform: rotateZ(90deg) scale(3);' +
            '}' +

            '100% {' +
            'opacity: 1;' +
            '-ms-transform: rotateZ(0deg) scale(1);' +
            '}' +
            '}' +

            // Mozilla FireFox
            '@-moz-keyframes ZoomAndRotateOut {' +
            '0% {' +
            'opacity: 1;' +
            '-moz-transform: rotateZ(0deg) scale(1);' +
            '}' +

            '100% {' +
            'opacity: 0;' +
            '-moz-transform: rotateZ(90deg) scale(3);' +
            '}' +
            '}' +

            '@-moz-keyframes ZoomAndRotateIn {' +
            '0% {' +
            'opacity: 0;' +
            '-moz-transform: rotateZ(90deg) scale(3);' +
            '}' +

            '100% {' +
            'opacity: 1;' +
            '-moz-transform: rotateZ(0deg) scale(1);' +
            '}' +
            '}' +
            '</style>';

        var body = $('body');

        cssStr = cssStr.replace(/speed/gi, this.speed + 'ms');

        $('head').append(cssStr);

        body.css({overflow:'hidden'});
        if (currentElement == null) {
            $(nextElement).css({zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_ZoomAndRotateIn');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_ZoomAndRotateIn')
                    .css({opacity:'', zIndex:'', display:''});
                body.css({overflow:''});
                callback();
            }, (this.speed ) + 500);
        }
        else {
            $(nextElement).css({ zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_ZoomAndRotateIn');
            $(currentElement).css({ zIndex:11, display:'block', opacity:'1'}).addClass('shetabEffect_ZoomAndRotateOut');
            setTimeout(function () {
                $(nextElement).removeClass('invisible').addClass('visible').removeClass('shetabEffect_ZoomAndRotateIn')
                    .css({opacity:'', zIndex:'', display:''});
                $(currentElement).addClass('invisible').removeClass('visible').removeClass('shetabEffect_ZoomAndRotateOut')
                    .css({opacity:'', zIndex:'', display:''});
                body.css({overflow:''});
                callback();

            }, (this.speed ) + 500);
        }
    }
};