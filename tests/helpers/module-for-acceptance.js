import { module } from 'qunit';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      // BugFix: Can be removed after 2.1.  If resolver is set then fallback doesn't happen properly
      // for more information: https://github.com/emberjs/ember.js/commit/e3ad9e2772e066459ddb3af78be45d9a6003f5ce
      var legacyRegistry = this.application.__deprecatedInstance__.registry;
      if (legacyRegistry) {
        legacyRegistry.resolver = function noOpResolverBugFix() {};
      }

      this.register = (fullName, Factory) => {
        let instance = this.application.__deprecatedInstance__;
        let registry = instance.register ? instance : instance.registry;

        return registry.register(fullName, Factory);
      };

      if (options.beforeEach) {
        options.beforeEach.apply(this, arguments);
      }
    },

    afterEach() {
      destroyApp(this.application);

      if (options.afterEach) {
        options.afterEach.apply(this, arguments);
      }
    }
  });
}
