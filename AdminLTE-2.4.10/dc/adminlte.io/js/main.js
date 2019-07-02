/**
 * Created by Abdullah Almsaeed on 3/8/15.
 */

'use strict';

$(function(){
    _fix();
    $(window).resize(function(){
        _fix();
    });
    function _fix() {
        $('#main-content').css(
            'min-height', $(window).height() - ($('.navbar').outerHeight() + $('.footer').outerHeight()) + "px"
        );
    }
});