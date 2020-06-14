
(function ($) {

        $.fn.counter = function (options) {

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
                    if (!$input.is(e.target) && !$parent.is(e.target) && $parent.has(e.target).length === 0 && !$("div.counter.display").is(e.target) && $("div.counter.display").has(e.target).length === 0) {
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

                if (settings.useDisplay) {
                    $display = $("div.counter.display");

                }
            }

            $("div.counter.button.plus").click(function () {
                $category = $(this).attr("category");
                if (settings.categoryValues[$category] < settings.maxValue) {
                    settings.categoryValues[$category]++;
                    $num = settings.categoryValues[$category];
                    $("div.counter.value[category='" + $category + "']").text($num);
                    doCallback();
                    if(settings.categoryValues[$category] == settings.maxValue){
                        $(this).addClass("inactive");
                    }else{
                        $(this).removeClass("inactive");
                    }
                    if(settings.categoryValues[$category] > settings.minValue){
                        $("div.counter.button.minus[category='"+$category+"']").removeClass("inactive");
                    }else{
                        $("div.counter.button.minus[category='"+$category+"']").addClass("inactive");
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

            $("div.counter.button.minus").click(function () {
                $category = $(this).attr("category");
                if (settings.categoryValues[$category] > settings.minValue) {
                    settings.categoryValues[$category]--;
                    $num = settings.categoryValues[$category];
                    $("div.counter.value[category='" + $category + "']").text($num);
                    doCallback();
                    if(settings.categoryValues[$category] == settings.minValue){
                        $(this).addClass("inactive");
                    }else{
                        $(this).removeClass("inactive");
                    }
                    if(settings.categoryValues[$category] < settings.maxValue){
                        $("div.counter.button.plus[category='"+$category+"']").removeClass("inactive");
                    }else{
                        $("div.counter.button.plus[category='"+$category+"']").addClass("inactive");
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
                $display = $("div.counter.inlinedisplay");
                $display.empty();
                $displayelements = 0;
                $("<i class='fal fa-user'></i>").prependTo($display);
                for ($i = 0; $i < settings.categoryNames.length; $i++) {

                    if (settings.categoryValues[$i] != 0 || settings.showZero) {
                        $displayelement = $("<div class='counter displayelement'></div>").appendTo($display);
                        $displayelement.html('<span class="displayelementnumber">'+settings.categoryValues[$i]+'</span> <span>'+settings.categoryNames[$i]+'</span>')
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

                    $display = $("<div class='counter display'></div>").prependTo("div.spinner_form");



                    $("<div class='counter inlinedisplay'></div>").prependTo($display);

                    $display.click(function () {
                        switchSelector();
                    });
                }


                $parent = $("<div class='counter parent'></div>").prependTo("div.spinner_form").hide();



                for ($i = 0; $i < settings.categoryNames.length; $i++) {
                    $category = $("<div class='counter category'></div>").appendTo($parent);
                    $text = $("<div class='counter text'></div>").appendTo($category);
                    $name = $("<div class='counter name' category='" + $i + "'>&nbsp;" + settings.categoryNames[$i] + "</div>").appendTo($text);
                    $buttons = $("<div class='counter buttons'></div>").appendTo($category);
                    $button_minus = $("<div href='' class='counter button minus' category='" + $i + "'>&#8211;</div>").appendTo($buttons);
                    $value = $("<div class='counter value' category='" + $i + "'>" + settings.categoryValues[$i] + "</div>").appendTo($buttons);
                                        $button_plus = $("<div href='' class='counter button plus' category='" + $i + "'>&#43;</div>").appendTo($buttons);


                    if(settings.categoryValues[$i] == settings.maxValue){
                        $button_plus.addClass("inactive");
                    }

                    if(settings.categoryValues[$i] == settings.minValue){
                        $button_minus.addClass("inactive");
                    }
                }
                $close = $("<span class='counter question'>How old is the child you're traveling with?</span>").appendTo($parent);
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
