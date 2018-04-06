/**
 *  @impact-storage.js
 *  @version: 1.01
 *  @author: Jordan Santell
 *  @date: October 2011
 *  @copyright (c) 2011 Jordan Santell, under The MIT License (see LICENSE)
 *
 *  ImpactStorage is a plugin for HTML5/js game framework ImpactJS, giving
 *  developers an easy-to-use interface to localStorage for their projects.
 */

ig.module(
    'plugins.impact-storage'
)
.requires(
    'impact.game'
)
.defines(function(){

ig.Storage = ig.Class.extend({

    staticInstantiate: function(i)  {
        return !ig.Storage.instance ? null : ig.Storage.instance;
    },

    init: function()    {
        ig.Storage.instance = this;
    },

    isCapable: function()   {
        return !(typeof(window.localStorage) === 'undefined');
    },

    isSet: function(key)   {
        return !(this.get(key) === null);
    },

    initUnset: function(key, value) {
        if (this.get(key) === null) this.set(key, value);
    },

    get: function(key)  {
        if (!this.isCapable()) return null;
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch(e)  {
            return window.localStorage.getItem(key);
        }
    },

    getInt: function(key)   {
        return ~~this.get(key);
    },

    getFloat: function(key) {
        return parseFloat(this.get(key));
    },

    getBool: function(key)  {
        return !!this.get(key);
    },

    key: function(n)    {
        return this.isCapable() ? window.localStorage.key(n) : null;
    },

    set: function(key, value)    {
        if (!this.isCapable()) return null;
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch(e)  {
            if(e == QUOTA_EXCEEDED_ERR)
                console.log('localStorage quota exceeded');
        }
    },

    setHighest: function(key, value)    {
        if(value > this.getFloat(key)) this.set(key, value);
    },

    remove: function(key)   {
        if (!this.isCapable()) return null;
        window.localStorage.removeItem(key);
    },

    clear: function()   {
        if (!this.isCapable()) return null;
        window.localStorage.clear();
    }

});

});
