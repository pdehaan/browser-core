import Ember from "ember";

export default Ember.Route.extend({
  cliqz: Ember.inject.service(),
  i18n: Ember.inject.service(),

  beforeModel() {
    return this.get('cliqz').getConfig().then( config => {
      this.set('config', config);
      var locale = config.locale,
          defaultLocale = this.get('i18n.locale');

      const isLocaleAvailable = this.get('i18n.locales').some(function(elem) {
        //locale is in en-US form
        //i18n.locale is in en form
        return locale.split('-').indexOf(elem) > -1
      });
      isLocaleAvailable ? this.set('i18n.locale', locale) : this.set('i18n.locale', defaultLocale);
    });
  },

  model: function() {
    return Ember.Object.create({
      miniOnboarding: this.get('config').miniOnboarding,
      isBrowser: this.get('config').isBrowser
    });
  },

  afterModel() {
    if(this.get('config').showOnboarding) {
      //TEMP - it should be configurable via installer
      if(this.get('config').distribution.indexOf("C00") == 0){
        //show different onboarding for CHIP distributions
        window.location = "https://cliqz.com/lp/chip-landingpage";
      } else {
        Ember.run.later(this.send.bind(this, 'openModal', 'onboarding'), 1000);
      }
    }
  },

  actions: {

    toggleBackground() {
      const $background = $('.optinBackground');

      if($background.hasClass('transparent')) {
        return;
      }

      $background.fadeOut(700)
        .fadeIn(400)
        .delay(100)
        .toggleClass('transparent')
        .removeClass('bgImage');
    },

    openLink(url, telemetry) {
      this.get('cliqz').sendTelemetry({
        "type": "onboarding",
        "product": "cliqz",
        "action": "click",
        "action_target": telemetry,
        "version": "2.0",
      });
      window.open(url,'_blank');
    },

    openModal(modalName) {
      if (modalName === "onboarding") {
        //this.get('cliqz').setCliqzOnboarding();
        this.get('cliqz').sendTelemetry({
          type: "onboarding",
          product: "cliqz",
          action: "show",
          version: "2.0"
        });
      }

      return this.render(modalName, {
        into: "freshtab",
        outlet: "modal"
      });
    },

    closeModal() {
      this.get('cliqz').sendTelemetry({
        type: "onboarding",
        product: "cliqz",
        action: "click",
        action_target: "confirm",
        version: "2.0"
      });

      return this.disconnectOutlet({
        outlet: "modal",
        parentView: "freshtab"
      });
    },

    fullTour() {
      this.get('cliqz').takeFullTour();
    },

    freshTabLearnMore(url) {
      this.get('cliqz').sendTelemetry({
        type: 'home',
        action: 'click',
        target_type: 'onboarding_more'
      });
      window.open(url,'_blank');
    },

    revertBack() {
      this.get('cliqz').sendTelemetry({
        type: 'home',
        action: 'click',
        target_type: 'onboarding_revert'
      });

      this.get('cliqz').revertBack();

      try{
        window.location = 'about:home';
      } catch(e){
        window.location = 'about:blank';
      }
    }
  },
});
