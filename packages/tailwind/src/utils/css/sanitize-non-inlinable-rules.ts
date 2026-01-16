import { type CssNode, string, walk } from 'css-tree';
import { sanitizeClassName } from '../compatibility/sanitize-class-name';
import { isRuleInlinable } from './is-rule-inlinable';

export function sanitizeNonInlinableRules(node: CssNode) {
  walk(node, {
    visit: 'Rule',
    enter(rule) {
      if (!isRuleInlinable(rule)) {
        walk(rule.prelude, (node) => {
          if (node.type === 'ClassSelector') {
            const unescapedClassName = string.decode(node.name);
            node.name = sanitizeClassName(unescapedClassName);
          }
        });

        walk(rule, {
          visit: 'Declaration',
          enter(declaration) {
            declaration.important = true;
          },
        });
      }
    },
  });
}
