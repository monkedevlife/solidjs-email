import { type CssNode, type Declaration, generate, walk } from 'css-tree';
import { getStyleProperty } from '../compatibility/get-style-property';
import type { CustomProperties } from './get-custom-properties';
import { unwrapValue } from './unwrap-value';

export function makeInlineStylesFor(
  inlinableRules: CssNode[],
  customProperties: CustomProperties,
) {
  const styles: Record<string, string> = {};

  const localVariableDeclarations = new Map<string, Declaration>();
  for (const rule of inlinableRules) {
    walk(rule, {
      visit: 'Declaration',
      enter(declaration) {
        if (declaration.property.startsWith('--')) {
          localVariableDeclarations.set(declaration.property, declaration);
        }
      },
    });
  }

  for (const rule of inlinableRules) {
    walk(rule, {
      visit: 'Function',
      enter(func, funcParentListItem) {
        if (func.name === 'var') {
          let variableName: string | undefined;
          walk(func, {
            visit: 'Identifier',
            enter(identifier) {
              variableName = identifier.name;
              return this.break;
            },
          });
          if (variableName) {
            const definition = localVariableDeclarations.get(variableName);
            if (definition) {
              funcParentListItem.data = unwrapValue(definition.value);
            } else {
              const customProperty = customProperties.get(variableName);
              if (customProperty?.initialValue) {
                funcParentListItem.data = unwrapValue(
                  customProperty.initialValue.value,
                );
              }
            }
          }
        }
      },
    });

    walk(rule, {
      visit: 'Declaration',
      enter(declaration) {
        if (declaration.property.startsWith('--')) {
          return;
        }
        styles[getStyleProperty(declaration.property)] =
          generate(declaration.value) +
          (declaration.important ? '!important' : '');
      },
    });
  }

  return styles;
}
