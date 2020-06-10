/*
 * numbercategoryselector.js
 * Author & copyright (c) 2017: Sakri Koskimies
 *
 * MIT license
 */
(function ($) {

        $.fn.NCS = function (options) {

            $input = $(this);
            $originalPlaceholder = $input.attr("placeholder");

            var settings = $.extend({
                // Defaults.
                categoryNames: ["Adults", "Child", "Rooms"],
                categoryValues: false,
                minValue: 0,
                maxValue: 10,
                closeOnOutsideClick: true,
                showText: true,
                delimiter: ", ",
                align: "left",
                fade: true,
                useDisplay: true,
                showZero: true,
                callback: function(values){}
            }, options);

            if (!settings.categoryValues) {
                settings.categoryValues = newFilledArray(settings.categoryNames.length, 0);
            }

            $parent = createHTML();

            if (settings.closeOnOutsideClick) {
                $(document).mouseup(function (e) {
                    if (!$input.is(e.target) && !$parent.is(e.target) && $parent.has(e.target).length === 0 && !$("div.NCS.display").is(e.target) && $("div.NCS.display").has(e.target).length === 0) {
                        if (settings.fade) {
                            $parent.fadeOut(200);
                        } else {
                            $parent.hide();
                        }
                    }
                });
            }

            $(this).click(function () {
                switchSelector();
            });

            $(window).resize(function () {
                setPositions();

            });

            function doCallback() {
                if (typeof options.callback == 'function') {
                    var callbackResult = {};
                    for ($i = 0; $i < settings.categoryNames.length; $i++) {
                        callbackResult[settings.categoryNames[$i]] = settings.categoryValues[$i];
                    }
                    options.callback.call(this, callbackResult);
                }
            }

            function setPositions() {
                switch (settings.align) {
                    case "left":
                        $parent.css("top", $input.position().top + $input.outerHeight(true));
                        $parent.css("left", $input.position().left);
                        break;
                    case "right":
                        $parent.css("top", $input.position().top + $input.outerHeight(true));
                        $parent.css("left", $input.position().left + $input.outerWidth(true) - $parent.outerWidth(true));
                        break;
                    case "center":
                        $parent.css("top", $input.position().top + $input.outerHeight(true));
                        $parent.css("left", $input.position().left + $input.outerWidth(true) / 2 - $parent.outerWidth(true) / 2);
                        break;
                }
                if (settings.useDisplay) {
                    $display = $("div.NCS.display");
                    $display.css("top", $input.position().top + 1);
                    $display.css("left", $input.position().left + 1);
                    $display.css("width", $input.width() - 1);
                    $display.css("height", $input.height() - 1);
                }
            }

            $("a.NCS.button.plus").click(function () {
                $category = $(this).attr("category");
                if (settings.categoryValues[$category] < settings.maxValue) {
                    settings.categoryValues[$category]++;
                    $num = settings.categoryValues[$category];
                    $("div.NCS.value[category='" + $category + "']").text($num);
                    doCallback();
                    if(settings.categoryValues[$category] == settings.maxValue){
                        $(this).addClass("inactive");
                    }else{
                        $(this).removeClass("inactive");
                    }
                    if(settings.categoryValues[$category] > settings.minValue){
                        $("a.NCS.button.minus[category='"+$category+"']").removeClass("inactive");
                    }else{
                        $("a.NCS.button.minus[category='"+$category+"']").addClass("inactive");
                    }
                }
                if (settings.showText) {
                    if (!settings.useDisplay) {
                        updateText();
                    } else {
                        updateElement();
                    }
                }
                return false;
            });

            $("a.NCS.button.minus").click(function () {
                $category = $(this).attr("category");
                if (settings.categoryValues[$category] > settings.minValue) {
                    settings.categoryValues[$category]--;
                    $num = settings.categoryValues[$category];
                    $("div.NCS.value[category='" + $category + "']").text($num);
                    doCallback();
                    if(settings.categoryValues[$category] == settings.minValue){
                        $(this).addClass("inactive");
                    }else{
                        $(this).removeClass("inactive");
                    }
                    if(settings.categoryValues[$category] < settings.maxValue){
                        $("a.NCS.button.plus[category='"+$category+"']").removeClass("inactive");
                    }else{
                        $("a.NCS.button.plus[category='"+$category+"']").addClass("inactive");
                    }
                }
                if (settings.showText) {
                    if (!settings.useDisplay) {
                        updateText();
                    } else {
                        updateElement();
                    }
                }
                return false;
            });

            function updateElement() {
                $input.val("");
                $display = $("div.NCS.inlinedisplay");
                $display.empty();
                $displayelements = 0;
                for ($i = 0; $i < settings.categoryNames.length; $i++) {

                    if (settings.categoryValues[$i] != 0 || settings.showZero) {
                        $displayelement = $("<div class='NCS displayelement'></div>").appendTo($display);
                        $displayelement.text(settings.categoryValues[$i] + " " + settings.categoryNames[$i]);
                        $displayelements++;
                    }
                }
                if ($displayelements == 0) {
                    $input.attr("placeholder", $originalPlaceholder)
                } else {
                    $input.attr("placeholder", "")
                }
                updateText();
            }

            function updateText() {
                $text = "";
                $added = 0;
                for ($i = 0; $i < settings.categoryNames.length; $i++) {
                    if (settings.categoryValues[$i] != 0 || settings.showZero) {
                        if ($added != 0) {
                            $text += settings.delimiter;
                        }
                        $text += settings.categoryValues[$i] + " " + settings.categoryNames[$i];
                        $added++;
                    }
                }
                $input.val($text);
            }


            function createHTML() {

                $input.attr("type", "text");
                if (settings.useDisplay) {

                    $input.attr("placeholder", "");

                    $display = $("<div class='NCS display'></div>").prependTo("form.container_search");
                    $display.css("top", $input.position().top + 1);
                    $display.css("left", "56%");
                    $display.css("width", $input.width() - 1);
                    $display.css("height", $input.height() - 1);

                    $("<div class='NCS inlinedisplay'></div>").prependTo($display);

                    $display.click(function () {
                        switchSelector();
                    });
                }


                $parent = $("<div class='NCS parent'></div>").prependTo("form.container_search").hide();

                switch (settings.align) {
                    case "left":
                        $parent.css("top", $input.position().top + $input.outerHeight(true));
                        $parent.css("left", "56%");
                        break;
                    case "right":
                        $parent.css("top", $input.position().top + $input.outerHeight(true));
                        $parent.css("left", $input.position().left + $input.outerWidth(true) - $parent.outerWidth(true));
                        break;
                    case "center":
                        $parent.css("top", $input.position().top + $input.outerHeight(true));
                        $parent.css("left", $input.position().left + $input.outerWidth(true) / 2 - $parent.outerWidth(true) / 2);
                        break;
                }

                for ($i = 0; $i < settings.categoryNames.length; $i++) {
                    $category = $("<div class='NCS category'></div>").appendTo($parent);
                    $text = $("<div class='NCS text'></div>").appendTo($category);
                    $name = $("<div class='NCS name' category='" + $i + "'>&nbsp;" + settings.categoryNames[$i] + "</div>").appendTo($text);
                    $buttons = $("<div class='NCS buttons'></div>").appendTo($category);
                    $button_minus = $("<a href='' class='NCS button minus' category='" + $i + "'>&#8211;</a>").appendTo($buttons);
                    $value = $("<div class='NCS value' category='" + $i + "'>" + settings.categoryValues[$i] + "</div>").appendTo($buttons);
                                        $button_plus = $("<a href='' class='NCS button plus' category='" + $i + "'>&#43;</a>").appendTo($buttons);


                    if(settings.categoryValues[$i] == settings.maxValue){
                        $button_plus.addClass("inactive");
                    }

                    if(settings.categoryValues[$i] == settings.minValue){
                        $button_minus.addClass("inactive");
                    }
                }
                $close = $("<span class='NSC question'>How old is the child you're traveling with?</span>").appendTo($parent);
                $select = $("<select></select>").appendTo($parent);
                $($select).prepend('<option value="1">1 years old</option>');
                $($select).prepend('<option value="2">2 years old</option>');
                $($select).prepend('<option value="3">3 years old</option>');
                $($select).prepend('<option value="4">4 years old</option>');
                $($select).prepend('<option value="5">5 years old</option>');
                $($select).prepend('<option value="6">6 years old</option>');
                $($select).prepend('<option value="7">7 years old</option>');
                $($select).prepend('<option value="8">8 years old</option>');
                $($select).prepend('<option value="9">9 years old</option>');
                $($select).prepend('<option value="10">10 years old</option>');
                $($select).prepend('<option value="11">11 years old</option>');
                $($select).prepend('<option value="12">12 years old</option>');
                $($select).prepend('<option value="13">13 years old</option>');
                $($select).prepend('<option value="14">14 years old</option>');
                $($select).prepend('<option value="15">15 years old</option>');
                $($select).prepend('<option value="16">16 years old</option>');
                $($select).prepend('<option value="17">17 years old</option>');
                $('select').styler({
                    function() {
                		$(this).css('outline', '3px solid red');
                	}
                });

                if (settings.showText) {
                    if (!settings.useDisplay) {
                        updateText();
                    } else {
                        updateElement();
                    }
                }

                if (settings.useDisplay) {
                    $input.css("color", "transparent");
                }

                return $parent;
            }

            function switchSelector() {
                if (settings.fade) {
                    $parent.fadeToggle(200);
                } else {
                    $parent.toggle();
                }
            }

            function newFilledArray(len, val) {
                var rv = new Array(len);
                while (--len >= 0) {
                    rv[len] = val;
                }
                return rv;
            }

        }
        ;

    }(jQuery)
)
;
