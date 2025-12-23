import type { NodePath } from '@babel/core';
import * as t from '@babel/types';

// use for static className values. className={`...`} with interpolation expressions needs runtime formatting (see @/util/tailwind:tw()).
export default function formatClassname() {
  return {
    visitor: {
      JSXAttribute(path: NodePath<t.JSXAttribute>) {
        if (path.node.name.name !== 'className') return;

        const value = path.node.value;
        if (!value) return;

        // Handle: className="..."
        if (value.type === 'StringLiteral') {
          value.value = flattenClassname(value.value);
        }

        // Handle: className={`...`}
        if (
          value.type === 'JSXExpressionContainer' &&
          value.expression.type === 'TemplateLiteral' &&
          value.expression.expressions.length === 0
        ) {
          path.node.value = {
            type: 'StringLiteral',
            value: flattenClassname(value.expression.quasis[0].value.raw),
          };
        }
      },
    },
  };
}

function flattenClassname(classname: string) {
  return classname.trim().replace(/\s+/g, ' ');
}
